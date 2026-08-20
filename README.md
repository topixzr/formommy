# Formommy

A mobile-first Russian course for an English-speaking adult learning Russian for everyday life with a Russian-speaking spouse.

## Current course

The course is intentionally **A1 → early A2**, not generic textbook A2. It contains:

- 20 sequential lessons
- 120 lesson exercises
- 82 review items
- 16 open-recall “Russian with your husband” scenarios
- Russian speech synthesis
- sentence anatomy in every exercise
- smart review intervals
- local progress, XP, and study streaks
- mobile-first PWA behavior

The sequence starts with zero-verb present-tense sentences and everyday couple language, then adds present actions, feminine past tense, future plans, wants/needs, location vs destination, dog routines, short messages, likes, physical states, connectors, and practical café/store language. Lessons 15 and 20 are conversational checkpoints rather than grammar dumps; Lessons 16–19 add communication repair, household requests, natural check-ins, and morning/night language.

## Learning design

Each lesson keeps one primary communicative goal and uses a repeated cycle:

1. **Understand** a useful sentence.
2. **Recognize** the same pattern in multiple choice.
3. **Hear** it in Russian.
4. **Build** it from sentence parts.
5. **Recall** it by typing.
6. **Review** vocabulary later with expanding intervals.

Grammar cards label sentence roles such as SUBJECT, PREDICATE, OBJECT, PLACE, TIME, or CONNECTOR, then explain why the neutral beginner word order works.

The content favors language that can be used immediately at home, in messages, with dogs, in a car, around Eugene, or while ordering and shopping.

## Structure

- `index.html` — shell and navigation
- `course-data.js` — curriculum/content only
- `app.js` — learning engine, progress, SRS review, speech, and interactions
- `styles.css` — mobile-first interface and readable Cyrillic typography
- `manifest.webmanifest` — installable PWA metadata
- `scripts/validate-course.js` — content/schema regression check
- `scripts/smoke-app.js` — headless logic smoke test with mocked browser primitives

Legacy experimental `stage2*`, `stage3.js`, and `trial.css` files are not loaded by the current app.

## Validation

Run:

```bash
node --check course-data.js
node --check app.js
node scripts/validate-course.js
node scripts/smoke-app.js
```

`validate-course.js` verifies lesson ids, metadata, exercise-type coverage, grammar explanations, answer integrity, sentence-building parts, review content, and practice scenarios. `smoke-app.js` verifies startup, legacy-state migration, the immediate mistake-retry queue, and review seeding.

## Development rule

Keep curriculum content in `course-data.js` and UI/learning behavior in `app.js`. New lessons should follow the existing data schema rather than adding lesson-specific DOM code.
