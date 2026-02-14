# Pronoia Code Review

**Date:** 2026-02-03  
**Reviewer:** Subagent  
**Scope:** Full codebase audit of `/opt/projects/pronoia/pronoia-site`

---

## Executive Summary

Pronoia is a well-structured, minimal Next.js 16 blog with clean architecture and good separation of concerns. The codebase is small (~10 source files) and focused, making it easy to maintain. Overall quality is good with some areas for improvement.

**Grade: B+** — Solid foundation with minor issues to address.

---

## Architecture Review

### ✅ Strengths

1. **Clean App Router Structure**  
   Uses Next.js 15+ app router correctly with proper page/layout separation.

2. **Server-Side Content Loading**  
   Posts load at build time via `getAllPosts()` — good for static generation.

3. **TypeScript Throughout**  
   Full type safety on components and utilities.

4. **Separation of Concerns**  
   - Data logic isolated in `lib/posts.ts`
   - UI components in `components/`
   - Content in `content/`

5. **Minimal Dependencies**  
   Only essential packages — no bloat.

### ⚠️ Concerns

1. **Hybrid Rendering Approach**  
   Blog posts use `generateStaticParams()` but the Next.js config doesn't specify `output: 'export'`. If Vercel is configured for SSR, this works fine, but static export would be safer for a blog.

2. **No API Routes**  
   Admin page is client-side only with hardcoded password. No actual content management API.

---

## Component Review

### `app/layout.tsx` ✅
**Status:** Good

- Proper font loading with `next/font/google`
- Metadata configured for SEO
- Clean structure

**Suggestion:** Add `metadataBase` for proper OG image URLs:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://pronoia.dev'),
  // ... rest
}
```

### `app/page.tsx` ✅
**Status:** Good

- Clean, readable homepage
- Good use of semantic HTML
- Projects array is inline — acceptable for static data

### `app/blog/page.tsx` ✅
**Status:** Good

- Simple, effective listing
- Good empty state handling

### `app/blog/[slug]/page.tsx` ⚠️
**Status:** Needs attention

**Issues:**
1. `params` is typed as `Promise<{ slug: string }>` — this is correct for Next.js 15+, but verify build isn't breaking
2. No error handling if MDX parsing fails
3. No loading state

**Code snippet concern:**
```typescript
interface PageProps {
    params: Promise<{ slug: string }>;  // ✅ Correct for Next.js 15
}
```

### `app/manifesto/page.tsx` ✅
**Status:** Good

- Static content rendered efficiently
- Uses Next.js Image for optimization

### `app/projects/page.tsx` ✅
**Status:** Good

- Clean project cards
- Good external link handling with `target="_blank" rel="noopener noreferrer"`

### `app/admin/page.tsx` ❌
**Status:** Security concern

**Critical Issues:**

1. **Hardcoded Password**
   ```typescript
   if (password === "123") {  // ❌ CHANGE IMMEDIATELY
   ```
   This is visible in client-side bundle. Anyone can see it.

2. **Mock Data Only**
   ```typescript
   const mockPosts = [  // ❌ Not connected to real posts
   ```
   Admin shows hardcoded sample data, not actual posts.

3. **No Real Edit Functionality**
   Edit button shows an alert instead of opening an editor.

**Recommendations:**
- Move auth to middleware or API route
- Connect to actual filesystem or CMS
- Or remove admin entirely until properly built

### `components/navigation.tsx` ✅
**Status:** Good with fun easter egg

- Mobile menu works well
- Triple-click easter egg to admin is clever
- Good accessibility with `aria-label`

### `components/footer.tsx` ✅
**Status:** Good

- Clean, semantic footer
- Dynamic year: `{new Date().getFullYear()}`

---

## Utilities Review

### `lib/posts.ts` ✅
**Status:** Good

**Strengths:**
- Clean TypeScript interfaces
- Proper error handling with `try/catch`
- Draft filtering works correctly
- Reading time calculation

**Suggestions:**

1. **Add cache for development**
   ```typescript
   let postsCache: Post[] | null = null;
   
   export function getAllPosts(): Post[] {
     if (postsCache) return postsCache;
     // ... build logic
     postsCache = allPosts;
     return postsCache;
   }
   ```

2. **Validate frontmatter**
   Currently no validation — a malformed MDX file could break the build.

3. **Add excerpt fallback**
   ```typescript
   excerpt: data.excerpt || content.slice(0, 200) + '...'
   ```

---

## Styling Review

### `app/globals.css` ✅
**Status:** Good

- Tailwind v4 syntax used correctly
- CSS custom properties for theming
- Clean, minimal color palette (black/white only)

**Observations:**
- `prose` class referenced but no `@tailwindcss/typography` plugin in package.json — verify this works
- Selection styling is nice touch

---

## Content Structure

### MDX Posts ✅
**Status:** Good

All posts follow consistent frontmatter:
```yaml
---
title: "..."
date: "YYYY-MM-DD"
excerpt: "..."
featured: boolean
draft: boolean  # optional
---
```

**Sample posts reviewed:**
- `you-dont-need-more-time.mdx` — Well-written, proper formatting
- `does-your-ai-have-a-soul.mdx` — Good structure

---

## Configuration Review

### `next.config.ts` ⚠️
**Status:** Minimal

**Current:**
```typescript
const nextConfig: NextConfig = {
  // Empty
};
```

**Recommendations:**

1. **Add image domains if using external images:**
   ```typescript
   images: {
     remotePatterns: [
       { hostname: '**.githubusercontent.com' }
     ]
   }
   ```

2. **Consider static export:**
   ```typescript
   output: 'export',
   distDir: 'dist'
   ```

### `tsconfig.json` ✅
**Status:** Good

- Path alias `@/*` configured correctly
- Strict mode enabled

### `biome.json` ✅
**Status:** Good

- Appropriate rules for Next.js + React
- Organize imports enabled
- Proper ignore patterns

---

## Security Audit

| Issue | Severity | Location |
|-------|----------|----------|
| Hardcoded admin password | 🔴 High | `app/admin/page.tsx:28` |
| Password visible in client bundle | 🔴 High | `app/admin/page.tsx` |
| No rate limiting on admin | 🟡 Medium | `app/admin/page.tsx` |
| No CSRF protection | 🟡 Medium | Entire app |

**Recommendation:** Remove admin page until properly secured with server-side auth.

---

## Performance Observations

### ✅ Good

1. **Static Generation** — Posts rendered at build time
2. **Image Optimization** — Using Next.js Image component
3. **Font Optimization** — Using `next/font/google`

### ⚠️ Could Improve

1. **No ISR** — Content changes require full rebuild
2. **No pagination** — Blog listing loads all posts (fine for now with ~10 posts)
3. **No sitemap** — Add `app/sitemap.ts` for SEO

---

## Recommendations (Prioritized)

### 🔴 Critical (Do Now)

1. **Fix admin password**
   ```typescript
   // Use environment variable
   const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
   // Or better yet, implement proper auth
   ```

2. **Add sitemap for SEO**
   ```typescript
   // app/sitemap.ts
   export default async function sitemap() {
     const posts = getAllPosts();
     return [
       { url: 'https://pronoia.dev', lastModified: new Date() },
       ...posts.map(post => ({
         url: `https://pronoia.dev/blog/${post.slug}`,
         lastModified: new Date(post.date)
       }))
     ];
   }
   ```

### 🟡 Important (Do Soon)

3. **Add RSS feed** — `app/rss.xml/route.ts`
4. **Add 404 page customization** — `app/not-found.tsx`
5. **Add error boundary** — `app/error.tsx`
6. **Validate MDX frontmatter** — Use zod or similar

### 🟢 Nice to Have

7. **Add reading progress indicator**
8. **Add copy-to-clipboard for code blocks**
9. **Add dark mode toggle**
10. **Add table of contents for long posts**

---

## Summary

Pronoia is a clean, well-architected blog that does its job well. The codebase is maintainable and follows Next.js best practices. 

**Immediate action needed:** Secure or remove the admin page.

**Overall:** A solid B+ — would be A- with admin fixed and sitemap added.
