---
name: Tailwind <alpha-value> requires space-separated channel CSS vars
description: Why dark-mode/theme colors silently fail to render with Tailwind rgb(var() / <alpha-value>) patterns
---

When Tailwind colors are defined as `rgb(var(--color-x) / <alpha-value>)`, the CSS
variable MUST hold **space-separated** channels (e.g. `--color-x: 33 39 55`), NOT
comma-separated (`33, 39, 55`).

**Why:** Tailwind expands the utility to `rgb(var(--color-x) / 1)`. If the var is
comma-separated, the result is `rgb(33, 39, 55 / 1)` — mixing legacy commas with the
modern `/` alpha slash. That is invalid CSS; browsers silently drop the declaration
and fall back (transparent/inherited). Light themes often *look* fine by coincidence
(fallback ≈ white), while dark themes appear "broken" because the dark value never
applies. jsdom does NOT parse color values, so JS-level tests pass and hide this.

**How to apply:** For any theme/dark-mode toggle that "doesn't change colors" even
though the `.dark` class is correctly toggled on `<html>`, check the channel var
format first. Isolate by force-adding the class and screenshotting: if colors still
don't change, it's CSS (this bug), not the JS toggle. Fix = space-separate every
channel value in both `:root` and `.dark` (here: tailwind.config.mjs addBase block).
