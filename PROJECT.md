# Pronoia - Project Documentation

> Engineered Happiness — Personal blog and philosophy site at [pronoia.dev](https://pronoia.dev)

---

## Project Overview

Pronoia is a personal blog and philosophy site exploring attention, engineering, and the practice of building coherent lives. The name comes from the concept of "pronoia" — the opposite of paranoia — the belief that the world is conspiring in your favor when you invest your attention wisely.

**Live Site:** https://pronoia.dev  
**Repository:** https://github.com/kkeeland/pronoia

---

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.1.4 |
| React | React | 19.2.3 |
| Language | TypeScript | 5.9.3 |
| Styling | Tailwind CSS | 4.x |
| Linting | Biome | 2.2.0 |
| Content | MDX | via next-mdx-remote |
| Hosting | Vercel | (inferred) |

### Key Dependencies
- `next-mdx-remote` — Renders MDX content server-side
- `gray-matter` — Parses frontmatter from MDX files
- `reading-time` — Estimates reading time for posts

---

## Project Structure

```
/opt/projects/pronoia/pronoia-site/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with fonts
│   ├── globals.css               # Global styles + Tailwind
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/page.tsx       # Individual blog post
│   ├── manifesto/
│   │   └── page.tsx              # Manifesto page (static)
│   ├── projects/
│   │   └── page.tsx              # Projects showcase
│   └── admin/
│       └── page.tsx              # Simple admin UI
├── components/
│   ├── navigation.tsx            # Site navigation (client component)
│   └── footer.tsx                # Site footer
├── lib/
│   └── posts.ts                  # Post utilities (getAllPosts, etc.)
├── content/
│   └── posts/                    # MDX blog posts
│       ├── you-dont-need-more-time.mdx
│       ├── does-your-ai-have-a-soul.mdx
│       └── ... (10+ posts)
├── public/
│   ├── screenshots/              # Project screenshots
│   └── pronoia-manifesto-diagram.jpg
├── next.config.ts                # Next.js config (minimal)
├── biome.json                    # Linting/formatting config
└── tsconfig.json                 # TypeScript config
```

---

## Key File Locations

| Purpose | Path |
|---------|------|
| **Homepage** | `app/page.tsx` |
| **Blog listing** | `app/blog/page.tsx` |
| **Blog post template** | `app/blog/[slug]/page.tsx` |
| **Manifesto** | `app/manifesto/page.tsx` |
| **Projects** | `app/projects/page.tsx` |
| **Navigation** | `components/navigation.tsx` |
| **Post utilities** | `lib/posts.ts` |
| **MDX posts** | `content/posts/*.mdx` |
| **Global styles** | `app/globals.css` |

---

## Build/Test Commands

```bash
# Development server
cd /opt/projects/pronoia/pronoia-site
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint (Biome)
npm run lint

# Format code
npm run format
```

---

## Content Management

### Creating a New Blog Post

1. Create a new `.mdx` file in `content/posts/`
2. Use kebab-case for filename (e.g., `my-new-post.mdx`)
3. Include required frontmatter:

```yaml
---
title: "Your Post Title"
date: "2026-02-03"
excerpt: "Brief description shown in listings"
featured: false  # Set true for homepage feature
draft: false     # Set true to hide from listings
---
```

4. Write content in Markdown/MDX below the frontmatter

### Post Utility Functions (`lib/posts.ts`)

| Function | Purpose |
|----------|---------|
| `getAllPosts()` | Returns all non-draft posts, sorted by date (newest first) |
| `getPostBySlug(slug)` | Returns single post by slug, or null if not found/draft |
| `getFeaturedPost()` | Returns first featured post, or first post if none featured |

### MDX Support

The blog uses `next-mdx-remote` for rendering MDX content. Currently uses default MDX components (no custom component overrides defined).

---

## Deployment Notes

### Current Setup
- **Platform:** Likely Vercel (standard for Next.js)
- **Domain:** pronoia.dev
- **Git:** Pushes to `https://github.com/kkeeland/pronoia`
- **Git Email:** kkeeland@gmail.com (must match for Vercel team access)

### Deployment Workflow
```bash
cd /opt/projects/pronoia/pronoia-site
git pull --rebase        # Always pull first (Kevin may push from Mac)
npm run build            # Verify build locally
git add -A && git commit -m "message"
git push                 # Triggers Vercel deployment
```

### Static Export Considerations
The current `next.config.ts` is minimal (no `output: 'export'`). If Vercel uses static export:
- Ensure `generateStaticParams()` is working in `[slug]/page.tsx`
- Images use standard `next/image` (not unoptimized)

---

## Warnings & Gotchas

### ⚠️ Critical

1. **Admin Password in Plain Text**  
   `app/admin/page.tsx` has hardcoded password `"123"` — change before any real use!

2. **Git Email Mismatch**  
   Must use `kkeeland@gmail.com` for Git commits — this matches Vercel team configuration. Do NOT use `kevin@pronoia.dev`.

### ⚠️ Code Quality

3. **Mock Data in Admin**  
   Admin page uses `mockPosts` array instead of reading actual posts from filesystem. The edit/view buttons show alerts rather than functioning.

4. **No Error Boundaries**  
   No global error handling or 404 customization beyond Next.js defaults.

### ⚠️ Content

5. **Date Format**  
   Post dates must be in `"YYYY-MM-DD"` format in frontmatter for proper sorting.

6. **Featured Posts**  
   Only one post should have `featured: true` — the `getFeaturedPost()` function returns the first match.

### ⚠️ Styling

7. **Tailwind v4**  
   Uses new Tailwind v4 syntax (`@import "tailwindcss"` instead of `@tailwind` directives).

8. **CSS Variables**  
   Custom theme uses CSS variables in `globals.css` — editing these affects the entire site.

---

## Development Notes

### Navigation Easter Egg
The logo in navigation has a triple-click handler that navigates to `/admin` — this is how admin access is hidden.

### Fonts
- **Inter** — Primary body font
- **Caveat** — Handwritten accent font (used for "at scale" on homepage)

### Color Scheme
Strict black-and-white design:
- Primary: `#1a1a1a` (near-black)
- Secondary: `#666666` (gray)
- Surface: `#f9fafb` (light gray background)
- Border: `#e5e7eb`

---

## Future Improvements

See `code-review.md` in this directory for detailed audit and recommendations.
