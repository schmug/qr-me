# qr-me
Local QR Code generator PWA for contact card sharing because Google and Apple don't get along

## Live Demo

**[https://contact-4od.pages.dev](https://contact-4od.pages.dev)**

## How It Works

QR Me is a single-page PWA that generates vCard QR codes entirely in your browser — no server, no data collection, no tracking.

### The Problem

Sharing contact info between iPhone and Android users is painful. AirDrop doesn't cross platforms, and texting a contact card is clunky. QR codes are universal, but most generators either require an internet connection or harvest your data.

### The Solution

1. **Fill in your info** — Enter your name, phone, email, company, and any other contact fields in the form
2. **Pick what to share** — Toggle which fields to include (maybe you want to share your work number but not your personal one)
3. **Generate** — The app builds a standard [vCard 3.0](https://datatracker.ietf.org/doc/html/rfc6350) string and encodes it as a QR code using [qrcode.js](https://github.com/davidshimjs/qrcodejs)
4. **Scan & save** — The other person scans the QR code with their phone camera and gets a native "Add Contact" prompt

Everything runs client-side. Your contact data is saved to `localStorage` so you don't have to re-enter it each visit, but it never leaves your device.

### Tech Stack

- **Zero build step** — Single `index.html` with inline CSS and JS
- **PWA** — Installable on mobile with offline support via service worker
- **qrcode.js** — QR code generation (loaded from CDN)
- **vCard 3.0** — Industry-standard contact card format that all phones understand

## Deployment

Hosted on [Cloudflare Pages](https://pages.cloudflare.com). Since there's no build step, just point the output directory to `/` and deploy.

## License

[MIT](LICENSE)
