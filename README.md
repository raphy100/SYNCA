# SYNCA — Security Your Network Care Alert

SYNCA is a Progressive Web App (PWA) built to provide a discreet, real-time emergency alert system for women in public office. It connects users with security teams and law enforcement via location sharing, live audio/video, and wearable integration while prioritizing privacy and survivability under duress.

## Problem Statement

Women in public office face unique safety risks during public engagements, rallies, town halls, and official duties. Current tools often fail to provide:

- Fast, discreet emergency signalling in stressful situations
- Real-time location and contextual data for security teams
- Survivability when a user is forced to disable or hide safety apps
- Seamless wearable integration for one-button activation

SYNCA addresses these gaps with an app designed for speed, discretion, and secure real-time coordination.

## Approach

SYNCA combines a mobile-first PWA interface with real-time backend services to deliver low-latency alerts and situational awareness. Key pillars:

- Simplicity: One-tap panic activation with tiered alert levels
- Survivability: Decoy interfaces, duress passwords, and silent alerts
- Integration: Wearables, WebRTC, and mapping APIs for rich context
- Security & Privacy: End-to-end encryption for sensitive channels and strict access control for incident data

## Features

Core features include:

- Emergency Alert System
  - One-tap panic button with customizable alert levels (Low → Critical)
  - Automatic GPS sharing and live location tracking
  - Background audio recording and real-time streaming
  - Pre-configured and quick-send emergency messages
  - Silent alert mode for discreet signaling

- Wearable Integration
  - Apple Watch and Wear OS compatibility
  - Discrete wearable tags with one-button activation
  - Heart-rate monitoring for automatic stress detection
  - Gesture-based activation (double-tap, shake, etc.)

- Decoy & Duress Protections
  - Fake home screen and hidden app behavior
  - Duress password triggers silent alerts while appearing to disable the app
  - Auto-activation if user fails check-in

- Security Team Dashboard
  - Real-time alert feed and map visualization
  - Live audio stream access and multi-channel notifications (push, SMS, email, voice)
  - Response coordination and dispatch tools

- Communications & Event Management
  - Direct messaging, group chat, push-to-talk, and video calls
  - Pre-event setup, schedule integration, and incident logging

## Screenshots

Add screenshots to `docs/screenshots/` and reference them here. Example markdown for a screenshot:

```markdown
![Dashboard](docs/screenshots/dashboard.png)
```

If you want, provide images and I can embed them into this README.

## Tech Stack

- Front-end: React 18+, TypeScript, Tailwind CSS, Vite / Next.js PWA (mobile-first)
- Back-end: Supabase (Postgres, realtime, auth, storage)
- Realtime & Media: WebRTC, Web Push, MediaDevices API
- Integrations: Google Maps, Twilio (SMS/voice), Web Bluetooth for wearables

### Technical Requirements

- PWA manifest and service worker for offline capability
- End-to-end encryption for sensitive comms
- Battery-optimized background location tracking
- Cross-platform support (iOS Safari, Android Chrome)

## Setup Instructions

Prerequisites

- Node.js (v18+ recommended)
- npm or pnpm
- A Supabase project and credentials (or other backend)

Install

```powershell
npm install
```

Run development server (project scripts use port 9002):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
npm start
```

Notes: Development and build scripts are defined in `package.json`. The `dev` script starts Next.js on port 9002.

## Environment Configuration

Create a `.env.local` in the project root and add required variables. Example variables used by SYNCA (adjust names to your implementation):

```text
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Server-side Supabase (if used)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Twilio
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Optional: GenKit / AI keys
GENKIT_API_KEY=your_genkit_key

# PWA / Other
NEXT_PUBLIC_APP_NAME=SYNCA
```

Security note: Never commit `.env.local` to source control. Use your hosting provider's environment variable settings for production.

If you need a sample `.env.local` template, tell me and I'll generate one based on your deployed integrations.

## Usage Guide

Quick flows:

- Activate emergency: Tap the panic button (or use wearable/gesture) → alert level set → location + audio streaming begins → notifications to security team.
- Silent/duress mode: Enter duress password or use decoy unlock → app shows fake UI while sending silent alert.
- Security team: Use the Security Dashboard to monitor live locations, access audio/video, and coordinate dispatch.

Refer to the `src/app` pages for UI behavior and `src/firebase` or `src/lib` for backend wiring.

## Future Improvements

- Full end-to-end encrypted media channels
- Native companion apps for deeper wearable integrations
- Offline-first incident storage with opportunistic sync
- ML-based threat detection from audio/biometrics
- Enhanced reporting and analytics dashboards

## Testing

Local checks:

```powershell
# Type checks
npm run typecheck

# Lint
npm run lint
```

Manual testing:

- Test wearable pairing and gesture activation
- Simulate alert activation and validate notifications reach test security accounts
- Verify decoy mode and duress password behaviors

Add automated tests (unit / integration) as the app matures. I can scaffold tests if you want.

## Team Roles

- Egbune Raphael — Frontend Developer & AI Engineer
- Gloria Ngwu — Backend Developer & AI Engineer

If you'd like, add contact info or GitHub handles here.

## Documentation

- Product blueprint: `docs/blueprint.md`
- Frontend: `src/app` and `src/components`
- Backend & integrations: `src/firebase`, `src/lib`

Keep feature and API docs in `docs/` and link them here for quick access.

## Deployment

Recommended hosts: Vercel (Next.js), Netlify, or any Docker-compatible host.

Typical deploy steps (Vercel):

1. Connect repo to Vercel.
2. Set environment variables in the Vercel dashboard.
3. Build command: `npm run build`, Output directory: (Next.js handles routing)

For self-hosted servers:

```powershell
npm run build
npm start
```

Make sure server environment variables are set, and ports are open as per your infrastructure.

## License

This repository is published under the MIT License. If you prefer a different license, update this section accordingly.

_Assumption_: License was not provided in the Product Requirements Document; I selected MIT as a permissive default. Change it if you have a different preference.

---
