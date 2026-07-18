import { TITLE_COLORS } from "@config";

export function getTitleColor(text: string): string {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const index = Math.abs(hash) % TITLE_COLORS.length;
  return TITLE_COLORS[index];
}
