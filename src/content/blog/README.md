# How to Write a New Blog Post

Each blog post is one Markdown (`.md`) file in this folder. The **filename becomes the URL**:
`my-post-title.md` → `outsourcevaphilippines.com/blog/my-post-title`

Use lowercase words separated by hyphens, and put your main keyword in the filename.

## The template

Copy this into a new `.md` file and fill it in:

```markdown
---
title: "Your Keyword-Rich Post Title Here"
description: "A 150–160 character summary with your main keyword. This is what shows in Google search results."
date: "2026-08-01"
author: "Lara"
excerpt: "A one- or two-sentence hook shown on blog cards and at the top of the post."
tags: ["Hiring", "GoHighLevel"]
keywords:
  - "main keyword phrase"
  - "secondary keyword"
  - "another related phrase"
---

Your intro paragraph — hook the reader and include your main keyword naturally.

## A Section Heading (use these for structure)

Body text. Write naturally for humans first.

### A Sub-heading

- Bullet points
- Work well

## Another Section

Wrap up with a conclusion and a nudge to book a consultation.
```

- `title` and `date` are **required**. Everything else has sensible fallbacks.
- `date` format is `YYYY-MM-DD`. Add `updated: "YYYY-MM-DD"` if you revise a post later.
- `coverImage: "/blog/my-image.webp"` is optional — put the image in `public/blog/` first. Without one, a branded placeholder shows.

## Two ways to publish

**A) In your browser (easiest):**
1. Go to your repo on github.com → open the `src/content/blog` folder.
2. Click **Add file → Create new file**.
3. Name it `your-post-slug.md`, paste your content, then **Commit**.
4. Vercel auto-deploys in ~1 minute. Done.

**B) On your computer:**
1. Create the `.md` file in `src/content/blog/`.
2. Commit + push with GitHub Desktop.
3. Vercel auto-deploys.

## SEO tips for each post

- **One main keyword per post.** Put it in the title, the filename, the first paragraph, and one `##` heading.
- **Write for humans.** Google rewards genuinely helpful content; keyword-stuffing hurts you.
- **Use headings** (`##`, `###`) to structure the post — they help readers and search engines.
- **Aim for depth** (800+ words) on topics your ideal clients actually search for.
- **Write a compelling `description`** — it's your ad copy in Google results.
- **Link to your services/pages** where relevant, and end with a consultation CTA.
- **Post consistently.** A steady cadence beats occasional bursts.

## Keyword ideas to target

Topics your ideal clients search for:
- "how to hire a virtual assistant", "virtual assistant for [industry]"
- "gohighlevel virtual assistant", "gohighlevel setup help"
- "what can a virtual assistant do", "tasks to delegate to a VA"
- "executive assistant vs virtual assistant"
- "social media virtual assistant", "virtual assistant for coaches / agencies / real estate"

Use free tools like Google's "People also ask" and autocomplete to find real phrasing.
