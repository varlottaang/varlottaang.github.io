# Liquid filter: {{ "Some heading" | title_color }} -> one of site.title_colors,
# chosen from a hash of the text so a given heading always gets the same color.
module TitleColorFilter
  def title_color(text)
    colors = @context.registers[:site].config["title_colors"] || ["#1e40af"]
    hash = 0
    text.to_s.each_char do |c|
      hash = ((hash << 5) - hash + c.ord) & 0xFFFFFFFF
    end
    hash -= 0x1_0000_0000 if hash >= 0x8000_0000 # match JS 32-bit signed math
    colors[hash.abs % colors.length]
  end
end

Liquid::Template.register_filter(TitleColorFilter)
