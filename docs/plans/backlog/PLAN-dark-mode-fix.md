# Fix: Dark Mode Text Readability on Non-Sovereignsky Pages

## Status: Backlog

**Goal**: Fix dark mode text contrast on pages like /about/ and /totalforsvarsaret/ where body text is hard to read.

**Last Updated**: 2026-03-23

**Priority**: Medium

---

## Problem

On pages like /about/ and /totalforsvarsaret/, dark mode text is barely readable — dark gray text on dark background. The `dark:prose-invert` class should handle this but something is overriding it. Likely a conflict between DaisyUI CSS (loaded globally via extend-head.html) and Blowfish's Tailwind dark mode.

This is a pre-existing issue, not caused by the section-design work.

## Investigation Needed

- [ ] Check if DaisyUI overrides Tailwind's `prose-invert` dark mode styles
- [ ] Check if scoping DaisyUI to specific components fixes the conflict
- [ ] Test with DaisyUI removed to confirm it's the cause

## Acceptance Criteria

- [ ] Body text readable in dark mode on /about/
- [ ] Body text readable in dark mode on /totalforsvarsaret/
- [ ] No regressions on other pages
- [ ] Sovereignsky pages unaffected
