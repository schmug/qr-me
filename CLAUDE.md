# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**qr-me** is a privacy-first PWA for generating vCard QR codes entirely in the browser. Zero server processing, no data collection — all client-side.

Live at: https://contact-4od.pages.dev

## Development

**No build system.** This is a zero-dependency, single-file application. No package.json, no npm, no bundler, no transpiler.

To develop: open `index.html` in a browser or serve it locally (e.g., `python3 -m http.server`).

## Deployment

Cloudflare Pages via GitHub Actions on push to `main`. The workflow (`deploy.yml`) runs `pages deploy . --project-name=contact --commit-dirty=true` — no build step, deploys the repo root directly.

Required secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## Architecture

Everything lives in **`index.html`** (~770 lines) — HTML, CSS, and JavaScript are all inline.

### Three-Panel Tab UI
- **Panel 0 (Enter Info):** 15-field contact form with auto-save (300ms debounce)
- **Panel 1 (Select Fields):** Checkbox UI to choose which fields appear in the QR code
- **Panel 2 (Generate QR):** Renders QR code, shows vCard preview, offers download/copy

### Storage Layer
- **Primary:** IndexedDB (db: `qrme`, store: `formdata`, key: `vcard-data`)
- **Fallback:** localStorage
- Automatic migration from localStorage → IndexedDB on first load
- Key functions: `idbOpen()`, `idbGet()`, `idbSet()`

### External Dependencies (CDN only)
- **qrcode.js** v1.0.0 — QR code generation
- **Google Fonts** — DM Sans + JetBrains Mono

### Core Functions
- `switchTab(idx)` — panel navigation
- `buildShareList()` — builds field selection checkboxes from form data
- `buildVCard(sel)` — converts selected fields to vCard 3.0 format (RFC 6350)
- `generateQR()` — renders QR code (200x200, medium error correction)
- `downloadQR()` — exports QR as PNG with white padding
- `copyVCard()` — copies vCard text to clipboard

### PWA
- Service worker (`sw.js`) uses cache-first strategy, cache name `vcard-qr-v4`
- Manifest configured for standalone display, portrait orientation
- Offline-capable after first load

### Design System
Dark theme with CSS variables: `--bg`, `--surface`, `--accent` (#5b8aff), `--text`, `--radius` (10px). Max container width 520px, mobile-first responsive.
