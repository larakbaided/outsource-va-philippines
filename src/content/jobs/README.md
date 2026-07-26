# How to post a job

Every open role is one Markdown file in this folder. The filename becomes the
URL, so `gohighlevel-crm-specialist.md` is published at
`careers.outsourcevaphilippines.com/jobs/gohighlevel-crm-specialist`.

Use lowercase words separated by hyphens. No spaces, no capitals.

## Posting a role

1. Copy the template below into a new `.md` file in this folder.
2. Fill in the frontmatter (everything between the `---` lines) and the body.
3. Commit and push. Vercel redeploys automatically, usually within a minute.

## Closing a role

Any of these work:

- **Set a closing date.** Add `closing: "2026-08-31"` to the frontmatter. The
  role drops off the list by itself the day after.
- **Delete the file.** Gone immediately.
- **Rename it with a leading underscore** (`_executive-assistant.md`). Keeps the
  file for next time without publishing it. That's what a draft is.

## Template

```markdown
---
title: "Executive Assistant"
department: "Executive Support"
type: "Full-time"
location: "Remote — Philippines"
hours: "Overlap with US business hours"
posted: "2026-07-26"
closing: "2026-08-31"
summary: "One or two sentences. This is what people read on the listing card."
skills:
  - "Calendar management"
  - "Inbox management"
tools:
  - "Google Workspace"
  - "Slack"
featured: false
---

## About the role

...

## What you'll do

- ...

## What we're looking for

- ...

## Nice to have

- ...

## How this works

This is an independent contractor engagement, not employment. You'd be placed
with a client business that directs your day-to-day work, while we handle the
matching, onboarding, invoicing and ongoing support. We pay you; you don't
chase the client for payment.
```

## Field reference

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | Shown as the page heading and in search results |
| `posted` | yes | `YYYY-MM-DD`. Sorts the list, newest first |
| `department` | no | Groups the role in the filter. Defaults to "General" |
| `type` | no | "Full-time", "Part-time", "Project-based". Defaults to "Full-time" |
| `location` | no | Defaults to "Remote — Philippines" |
| `hours` | no | Working-hours expectation |
| `closing` | no | `YYYY-MM-DD`. Role delists the day after |
| `summary` | no | One or two sentences for the listing card |
| `skills` | no | Shown as badges |
| `tools` | no | Shown as badges |
| `compensation` | no | Leave blank unless the figure is approved — see below |
| `featured` | no | `true` pins the role to the top of the list |

## A note on pay

`compensation` is optional and blank by default. Don't put a number there
unless it's been approved, and **don't reuse the client rate card** — that's
what clients pay the agency, not what a contractor earns. If there's no
approved figure, leave the field out entirely and the section won't render.

## Departments currently in use

Keep these consistent so the filter stays tidy:

- `GoHighLevel & CRM`
- `Executive Support`
- `Marketing`
- `Administrative`
