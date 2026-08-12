export const SITE = {
  website: "https://varlotta.xyz",
  author: "Angelo Varlotta",
  desc: "Applied ML, responsible AI, and sustainability researcher. Volunteer at Neuromatch.",
  title: "Angelo Varlotta",
  ogImage: "og-image.png",
  lightAndDarkMode: true,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
};

export const LOCALE = {
  lang: "en",
  langTag: ["en-EN"],
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const TITLE_COLORS = [
  "#1e40af", // Deep Blue
  "#7c3aed", // Deep Purple
  "#0f766e", // Deep Teal
  "#ea580c", // Deep Orange
  "#15803d", // Deep Green
  "#be185d", // Deep Rose
  "#334155", // Slate
];

export const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/varlotta/",
    linkTitle: "Angelo Varlotta on LinkedIn",
    color: "#0077B5",
    darkBg: false,
    active: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/varlottaang",
    linkTitle: "Angelo Varlotta on GitHub",
    color: "black",
    darkBg: true,
    active: true,
  },
  {
    name: "Substack",
    href: "https://substack.com/@drawanowl",
    linkTitle: "Angelo Varlotta on Substack",
    color: "#FF6D00",
    darkBg: false,
    active: true,
  },
  {
    name: "ko-fi ☕",
    href: "https://ko-fi.com/varlotta",
    linkTitle: "Support Angelo on Ko-fi",
    color: "#FF5E78",
    darkBg: false,
    active: true,
  },
];
