# Tadabbur

**Bring your questions to the Qur'an.**

Tadabbur is a Qur'an chat and reading app for Android. You ask a question in plain
language and read the answer in the text itself. The app points you toward the
Qur'an; it never claims to interpret it for you.

## Contents

- [About the Application](#about-the-application)
  - [The Surfaces](#the-surfaces)
  - [Design Journey](#design-journey) — [Onboarding](#onboarding) · [Today](#today) · [Sakina](#sakina) · [Ask](#ask) · [Read](#read) · [Profile](#profile)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started) — [Prerequisites](#prerequisites) · [Installation](#installation) · [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Backend](#backend)

---

## About the Application

The name means *tadabbur*, the reflective pondering of the Qur'an that the text asks
of every believer. It is deliberately not *tafsir*, the scholarly discipline. That
one idea governs everything: every surface either hands you the text or points to it,
and the one surface that speaks with a machine's voice always says, plainly, that it
is a reflection and not a ruling.

### The Surfaces

| Surface | What it is | Talks to the model? |
| --- | --- | --- |
| **Today** | A calm home: the verse of the day, a name of Allah, a door to Sakina | No — curated, offline |
| **Sakina** | A short guided session to sit with a feeling, built on a verse | No — curated, offline |
| **Ask** | A question in plain language, answered by a reflection that points to verses | **Yes** — always, and always discloses |
| **Read** | The full mushaf, searchable, verse by verse | No — bundled offline |
| **Profile** | Who you are, Arabic size, theme, and the text's attribution | No |

Everything except Ask works with no network at all. The whole Qur'an ships inside the
app.

### Design Journey

#### Onboarding

The onboarding sets the tone for the whole app: quiet and reflective, never loud.
Early on we faced a clear choice about the visuals. Many faith apps lean on
photographs, like a mosque at sunset or an image of the Kaaba, to feel spiritual and
to hold your attention. We chose not to. Using a sacred place as background
decoration, just to keep someone's eyes on a screen, felt wrong, and those images
have become a cliché that makes every app look the same. So we followed the older
tradition of Islamic art, which reaches for geometry and pattern instead of pictures.

That led us to the eight-pointed *khatim* star, a classic motif from Islamic
geometry. It rests very faintly behind the opening screens. It is present enough to
feel considered and unmistakably Islamic, yet quiet enough that it never competes
with the words. It carries the same sense of place a photograph would, without
borrowing anything sacred to do it.

The rest of the flow keeps the same restraint. We ask a few gentle questions before
sign-in, so a person arrives with intent rather than meeting a login wall first. The
"preparing your plan" moment shows honest progress instead of the fake loading bars
and growth charts you often see elsewhere. The app opens with the Bismillah, and it
follows your phone's own light or dark setting so it feels at home either way. The
guiding rule throughout is simple: point to the text, never perform.

#### Today

Today is the first thing a person sees each time they open the app, so it sets the
mood. We wanted it calm above all else, closer to a quiet moment than a busy home
page. The heart of the screen is a single verse of the day, with room to breathe
around it. Early on we let go of the usual home-screen habits. There are no streaks
to keep, no numbers, no daily goals. The small week strip at the top only marks the
days you have opened the app, as a gentle record of returning rather than a target
you can fail.

The hardest question was the empty space below the verse. Our first instinct was to
fill it, and we tried a faint background pattern. It did not work. On a dark screen
it pulled the eye away from the verse, and decoration was never really the point. So
we changed the approach. Instead of filling the space with decoration, we filled it
with meaning: a name of Allah for the day, drawn from the ninety-nine, and a soft
invitation to take a moment and open the Sakina session. One gives you something to
reflect on, the other opens a door to calm. Neither is a statistic or a feature card.

Through all of this we kept the verse as the clear center of the screen. The name of
Allah sits in a lighter, quieter card so it never competes with the verse above it.
And like the rest of the app, everything here is hand chosen and works offline.
Nothing on this screen talks to the AI, so there is never anything to disclaim. The
result is a home that feels full and warm without ever becoming a dashboard.

#### Sakina

Sakina is for the harder moments, the ones that often come late at night when a
person may not even have the words. It has two parts. First a quiet screen that
simply asks how you are feeling and offers a small set of plain words to choose from.
We kept it to words alone, with no emoji, no colours, no sliders. Those things make
real feeling look small or clinical, and this is the one screen where that would
matter most. Under each word we added a short line of recognition, like "when the
mind won't settle", so a person feels seen rather than sorted. Naming a hard feeling
honestly, even shame or fear, is part of the point, so we did not soften the words.

Choosing a feeling opens a short guided session. It moves slowly through a few steps:
a moment to breathe, a verse chosen for that feeling, and then time to repeat the
verse gently while it settles. This is the heart of it. The way the tradition calms
the heart is through repetition, so the session lets you recite the verse a few
times, counting each one softly, the way you would with prayer beads. We were careful
about one thing especially: the repetition is always from the Qur'an itself, the
verse's own words, never something borrowed from outside it. The whole app points to
the Qur'an, and this screen keeps that promise even in its quietest moment.

Above all, Sakina had to be safe. There is a way to leave on every step, always in
view, because a screen that holds someone in place when they are struggling has
failed them. Nothing is saved and nothing accumulates, so there is no pressure to
return and nothing to break. Each feeling carries its own verse, and because these
are sacred words, every one is checked against a trusted source before it is shown.
The goal was never to fix a feeling, only to sit beside it for a moment and point, as
gently as it can, back to the text.

#### Ask

Ask is the one place in the app that answers in a machine's voice, and everything
about it is arranged so that voice can never be mistaken for the text. The reflection
is set in a plain sans typeface, the Qur'an in its own script, and the translation in
a serif between them, three voices kept apart on purpose. The answer only ever
points. It gathers a verse or two that bear on your question and hands them back, and
it never explains the Arabic or hands down a ruling. Beneath every answer sits a
short, permanent note, saying plainly that this is a reflection and not tafsir and
that the verses themselves are the source, and it is never allowed below the fold.
Tap any verse and it opens in the reader at that exact ayah, so every reflection has
a floor you can walk to.

We were careful with the smaller moments too. The answer arrives slowly, a pause and
then the words settling in before the verses appear one by one, so it feels
considered rather than vended. And when it cannot reach the model, the message stays
plain. A timeout is not a spiritual event, and we would never dress a failure in
scripture, so you get a quiet line and a way to try again.

#### Read

Read is the mushaf, and the whole of it lives inside the app. It never waits on a
network, because the text a person came for should always be there. The index lists
all 114 surahs, searchable by name, number, or meaning, and opening one gives the
Arabic first and the translation a step beneath it, with the traditional end-of-verse
mark carrying each ayah number rather than a badge of our own. The Bismillah rests as
a quiet header above each surah, except where the mushaf itself differs. It is the
first ayah of Al-Fatihah, and At-Tawbah has none. We followed the text, not a rule we
preferred.

This screen is also the floor beneath everything else. Every verse the app points to,
whether in Ask or in Sakina or on Today, leads here, scrolled to the exact ayah with
a soft highlight that fades as you arrive. That one link is what keeps the app honest.
The reflection can only ever point, and this is where it points to. The Arabic is
bundled and waited for, never a stand-in face, because the wrong letters in the
Qur'an are a defect and not a loading state.

#### Profile

Profile is deliberately not a dashboard. It holds only what a person needs: who they
are, the size of the Arabic, whether the app follows the phone or holds to light or
dark, and, quietly at the bottom, where the text comes from. That last part carries
more weight than it looks. A translation belongs to someone, so the app names it, and
it names the source of the Arabic too, and the words are never presented as if they
came from nowhere.

The one real control here is Arabic size, and it does the thing most apps get wrong.
As the letters grow, the space between the lines grows with them, so the vowel marks
never collide. It reads as a design choice, but it is really a small act of care for
the text. Everything else stays out of the way. You can use the whole app as a guest,
and signing in is only there for those who want their reflections to follow them.

*The same thread runs through every screen: point to the text, never perform.*

---

## Tech Stack

- **Framework:** Expo SDK 57, React Native 0.86, React 19
- **Routing:** Expo Router — file-based, typed routes
- **Styling:** NativeWind 4 (Tailwind 3) with semantic color tokens and light/dark themes
- **Language:** TypeScript
- **Animation:** React Native Reanimated 4, Gesture Handler
- **Auth & data:** Supabase (`@supabase/supabase-js`), consumed through a Next.js backend-for-frontend
- **Icons:** Tabler icons + `react-native-svg`
- **Fonts (bundled):** KFGQPC Uthmanic Hafs (Qur'an), Source Serif 4 (translation), Inter (UI and AI prose)
- **Local storage:** AsyncStorage (settings, session), NetInfo (offline detection)

---

## Project Structure

```
src/
  app/            Expo Router routes — onboarding, (tabs), thread, session, surah reader, auth callback
  components/     UI — verse card, session beats, ask, today, ui primitives
  data/curated/   Bundled offline content — full Qur'an (114 surahs), Sakina sessions, Asma ul Husna
  lib/            Supabase client, auth context, BFF client, hooks (theme, arabic scale, online)
  types/          Shared types — verse, thread, surah, onboarding
assets/fonts/     Bundled Uthmanic Hafs
scripts/          generateQuran.mjs — regenerates the bundled Qur'an from the source editions
```

The curated content in `data/curated/` never touches the network, which is why Today,
Sakina, and Read can never hard-fail.

---

## Getting Started

### Prerequisites

- **Node 20+** — Expo SDK 57 requires it; Node 18 will not build. With nvm: `nvm use 20`.
- **To build the native app:** the Android SDK (platform 36, build-tools 36) plus a
  connected device or an emulator. Alternatively, run in **Expo Go** with no native build.
- **The backend running** — the app fetches profile data from the Next.js server (see
  [Backend](#backend)). Google sign-in also needs the Supabase project configured.

### Installation

```bash
cd Tadabbur
nvm use 20
npm install
```

Then create a `.env` file (see [Environment Variables](#environment-variables)).

### Running the App

```bash
# Native build onto a connected device / emulator (needed for Google sign-in deep links)
npm run android

# Or a quick run in Expo Go — scan the QR with the Expo Go app
npx expo start
```

Other scripts:

| Command | Does |
| --- | --- |
| `npm start` | Start the Metro bundler |
| `npm run android` | Build and install the Android dev client |
| `npm run ios` | Build and install on iOS (not the primary target) |
| `npm run web` | Run the web build |
| `npm run lint` | Lint with Expo's config |
| `npm test` | Type-check and run the Arabic-metrics test |

---

## Environment Variables

Create `Tadabbur/.env`:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
EXPO_PUBLIC_API_URL=http://192.168.x.x:3000
```

| Variable | Purpose |
| --- | --- |
| `EXPO_PUBLIC_SUPABASE_URL` | Supabase project URL (Dashboard → Project Settings → API) |
| `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key — used for auth only; public by design and gated by RLS |
| `EXPO_PUBLIC_API_URL` | Base URL of the Next.js backend. The phone must reach it, so use your machine's **LAN IP**, not `localhost` |

`EXPO_PUBLIC_` variables are inlined into the app bundle, so only public values belong
here. The Supabase **secret** key lives on the server, never in the app. Env changes
require restarting the bundler.

---

## Backend

The app is a client to a Next.js **backend-for-frontend** in `../tadabbur-web`, which
is the only thing that talks to Supabase (Postgres + Auth + row-level security). The
app signs in with Supabase directly (Google OAuth), then sends its token to the Next.js
API, which verifies it and returns data. Curated surfaces work fully offline; only Ask
calls a model, and that is currently mocked.

```bash
cd ../tadabbur-web
npm install
npm run dev   # serves on http://localhost:3000
```

Server environment (`tadabbur-web/.env.local`) holds `SUPABASE_URL` and the
server-only `SUPABASE_SERVICE_ROLE_KEY` (the `sb_secret_…` key). See
[`BACKEND.md`](./BACKEND.md) for the full backend build specification.
