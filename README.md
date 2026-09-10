# Mehdi Bayat — Portfolio

Personal engineering portfolio built with Next.js 16 (App Router), TypeScript, and Tailwind CSS 4.

## Structure

All content lives in `data/` as plain TypeScript objects — update these files rather than
editing page components to change what the site shows:

- `data/links.ts` — GitHub, LinkedIn, CV, and LivePulse/Architecture Lab/Scaling Demo URLs
- `data/technologies.ts` — the categorized tech stack
- `data/experience.ts` — CV-sourced work history, education, languages
- `data/projects.ts` — project cards and the Engineering Evidence table
- `data/livepulse.ts` — the LivePulse case study content (highlights, incidents, ADR summaries,
  scaling stages, the Scaling Demo's measured results)

To add a new project, add an entry to the `projects` array in `data/projects.ts` — the homepage
and `/projects` page pick it up automatically. Set `featured: true` only for something with the
depth of LivePulse.

Pages live under `app/` (App Router): `/`, `/engineering/livepulse`, `/projects`,
`/projects/jobify`, `/experience`, `/about`, `/contact`, plus `sitemap.ts` and `robots.ts`.

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Quality gates

```bash
npx tsc --noEmit   # typecheck
npm run lint       # eslint (next/core-web-vitals + a11y rules)
npm run build      # production build
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Import it in Vercel — no environment variables are required for the site to work.
3. Set `NEXT_PUBLIC_SITE_URL=https://mehdi-bayat.online` as a Vercel project environment
   variable once that domain is registered and attached to the project. Until then, SEO
   metadata, `sitemap.xml`, and `robots.txt` fall back to Vercel's own deployment URL —
   nothing is invented in the meantime.

No backend, database, or paid service is required.

## Content policy

Every claim on this site (technologies, metrics, incidents, ADRs, measured vs. projected scaling
numbers) is sourced from the actual LivePulse, Architecture Lab, Scaling Demo, and TalentMatch
repositories, or from the CV. Nothing here is a placeholder statistic — see the "Measured" vs.
"Architectural projection" labels on `/engineering/livepulse` for how that distinction is kept
honest.
