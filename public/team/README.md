# Team Profile Photos

This folder holds the profile photos for each virtual professional.

## Current state

No real photos are present yet. The website renders an **elegant temporary
initials avatar** (name initial on a brand gradient) for each person. These are
clearly temporary and are never presented as real photographs.

## How to add real, approved photos

1. Export each photo as **WebP**, cropped square-ish, ~800×1000px, consistent
   lighting and framing across all five.
2. Save them here using these exact filenames:

   - `lara-profile.webp`
   - `cassie-profile.webp`
   - `wayne-profile.webp`
   - `joshua-profile.webp`
   - `cath-profile.webp`

3. In `src/content/team.ts`, set `imageIsPlaceholder: false` for each person
   whose real photo you've added. That switches the UI from the initials
   avatar to the actual image automatically — no other code changes needed.

## Notes

- Do not present AI-generated or stock images as real photos of the named team
  members.
- Keep filenames and dimensions consistent so the layout stays uniform.
- Only add photos you have permission to use.
