# Tadabbur

**Bring your questions to the Qur'an.**

Tadabbur is a Qur'an chat and reading app. You ask a question in plain language,
and you read the answer in the text itself. The name means *tadabbur*, the
reflective pondering of the Qur'an that the text asks of every believer. It is
deliberately not *tafsir*, the scholarly discipline. The app points you toward the
text; it never claims to interpret it for you.

Built with Expo (React Native), NativeWind, and TypeScript.

## Design Journey

### Onboarding

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

### Today

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

*This covers onboarding and the Today screen. The journey for the remaining parts of
the app will be added here as they are built.*
