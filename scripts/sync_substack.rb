# frozen_string_literal: true

# Imports new public posts from the Substack RSS feed into _posts/.
#
#   bundle exec ruby scripts/sync_substack.rb            # uses substack.feed from _config.yml
#   bundle exec ruby scripts/sync_substack.rb FILE_OR_URL # e.g. a saved feed.xml for testing
#
# A post is skipped when a file in _posts/ or _drafts/ already has the same slug
# or title, so existing posts (and any edits you made to them) are never touched.
# Delete a post's file to have it re-imported on the next run.

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

require "net/http"
require "uri"
require "yaml"
require "time"
require "nokogiri"

ROOT = File.expand_path("..", __dir__)
POSTS_DIR = File.join(ROOT, "_posts")
DRAFTS_DIR = File.join(ROOT, "_drafts")

# Substack page furniture that makes no sense outside Substack.
STRIP_SELECTORS = [
  ".subscription-widget-wrap", ".subscription-widget-wrap-editor", ".subscription-widget",
  ".button-wrapper", ".captioned-button-wrap", ".share-dialog", ".post-ufi",
  ".image-link-expand", ".restack-image", "form", "script", "style", "iframe[src*='substack.com/embed']"
].freeze

# Markers Substack puts in the feed for paid-only posts (only a teaser is public).
PAYWALL_MARKERS = [/class="[^"]*paywall/i, /This post is for paid subscribers/i,
                   /Keep reading with a 7-day free trial/i].freeze

def fetch(source)
  return File.read(source, encoding: "UTF-8") if File.exist?(source)

  uri = URI(source)
  5.times do
    res = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https",
                                              open_timeout: 20, read_timeout: 30) do |http|
      http.request(Net::HTTP::Get.new(uri, "User-Agent" => "varlotta.xyz-substack-sync",
                                           "Accept" => "application/rss+xml, application/xml"))
    end
    case res
    when Net::HTTPSuccess then return res.body.force_encoding("UTF-8")
    when Net::HTTPRedirection then uri = URI.join(uri.to_s, res["location"])
    else abort "Feed request failed: HTTP #{res.code} for #{uri}"
    end
  end
  abort "Too many redirects fetching #{source}"
end

def slugify(text)
  text.to_s.unicode_normalize(:nfkd).encode("ASCII", invalid: :replace, undef: :replace, replace: "")
      .downcase.gsub(/[^a-z0-9]+/, "-").gsub(/\A-|-\z/, "")[0, 80]
end

def norm_title(t) = t.to_s.downcase.gsub(/\s+/, " ").strip

def existing_posts
  slugs = {}
  titles = {}
  Dir[File.join(POSTS_DIR, "*"), File.join(DRAFTS_DIR, "*")].each do |f|
    slugs[File.basename(f, ".*").sub(/\A\d{4}-\d{2}-\d{2}-/, "")] = true
    fm = File.read(f, encoding: "UTF-8")[/\A---\s*\n(.*?)\n---\s*\n/m, 1]
    data = fm ? (YAML.safe_load(fm, permitted_classes: [Time, Date]) rescue {}) : {}
    titles[norm_title(data["title"])] = true if data.is_a?(Hash) && data["title"]
    slugs[data["slug"]] = true if data.is_a?(Hash) && data["slug"]
  end
  [slugs, titles]
end

def clean_html(html)
  frag = Nokogiri::HTML5.fragment(html)
  STRIP_SELECTORS.each { |sel| frag.css(sel).each(&:remove) }
  frag.css("a.image-link").each { |a| a.replace(a.children) } # unwrap image lightbox links
  frag.css("img").each do |img|
    %w[srcset sizes data-attrs width height].each { |attr| img.remove_attribute(attr) }
    img["loading"] = "lazy"
    img["alt"] ||= ""
  end
  frag.css("picture source").each(&:remove)
  frag.css("[data-attrs], [data-component-name]").each do |el|
    el.remove_attribute("data-attrs")
    el.remove_attribute("data-component-name")
  end
  frag.css("a[href]").each do |a|
    next unless a["href"].start_with?("http")

    a["target"] = "_blank"
    a["rel"] = "noopener noreferrer"
  end
  frag.to_html.strip
end

def main
  config = YAML.safe_load(File.read(File.join(ROOT, "_config.yml"), encoding: "UTF-8"))
  source = ARGV[0] || ENV["SUBSTACK_FEED"] || config.dig("substack", "feed")
  abort "No feed configured (substack.feed in _config.yml)" unless source

  doc = Nokogiri::XML(fetch(source))
  doc.remove_namespaces!
  items = doc.xpath("//item")
  abort "No <item> elements found in feed #{source}" if items.empty?

  slugs, titles = existing_posts
  added = 0

  items.each do |item|
    title = item.at_xpath("title")&.text&.strip
    link = item.at_xpath("link")&.text&.strip
    html = item.at_xpath("encoded")&.text.to_s
    next if title.to_s.empty? || html.empty?

    slug = link.to_s[%r{/p/([^/?#]+)}, 1] || slugify(title)
    if slugs[slug] || titles[norm_title(title)]
      next
    end
    if PAYWALL_MARKERS.any? { |re| html.match?(re) }
      puts "skip (paid): #{title}"
      next
    end

    date = Time.parse(item.at_xpath("pubDate").text).utc
    front = {
      "title" => title,
      "description" => item.at_xpath("description")&.text&.strip,
      "date" => date.strftime("%Y-%m-%d %H:%M:%S %z"),
      "image" => item.at_xpath("enclosure[starts-with(@type, 'image')]")&.[]("url"),
      "substack_url" => link,
      "source" => "substack"
    }.reject { |_, v| v.nil? || v.to_s.empty? }

    path = File.join(POSTS_DIR, "#{date.strftime('%Y-%m-%d')}-#{slug}.html")
    File.write(path, "#{front.to_yaml}---\n#{clean_html(html)}\n", encoding: "UTF-8")
    slugs[slug] = true
    titles[norm_title(title)] = true
    added += 1
    puts "added: #{File.basename(path)}"
  end

  puts "#{added} new post(s) imported from #{items.size} feed item(s)."
end

main
