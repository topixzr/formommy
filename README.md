# Formommy

A mobile-first adaptive Russian course for an English-speaking adult learning Russian for everyday life with a Russian-speaking spouse.

## Current course

The course is intentionally **A1 → early A2**, not generic textbook A2. It now contains:

- 30 sequential lessons in 6 five-lesson modules
- 180 lesson exercises
- 122 review items
- 24+ husband-focused open-recall scenarios
- Russian speech synthesis and listening speed controls
- sentence anatomy in every lesson exercise
- immediate retry of missed lesson patterns
- adaptive 5-minute practice weighted toward weak skills
- a personal Mistake Notebook built from repeated misses
- skill-level weakness tracking for listening, recall, word order, past/future, movement, possession, questions, and more
- Talk to Alex mini-dialogues
- browser speech-recognition practice where supported
- Standard / Casual / Very Casual Russian comparisons
- module-completion capability summaries
- weekly practice stats
- local progress, XP, study streaks, and safe curriculum migration
- installable mobile PWA behavior with versioned offline core caching

The sequence starts with zero-verb present-tense sentences and everyday couple language, then adds present actions, feminine past tense, future plans, wants/needs, location vs destination, dog routines, messages, likes, physical states, connectors, cafés/stores, time, weekend plans, food objects, possession, ability, phone language, driving, weather, and a Eugene weekend checkpoint.

## Learning design

Each lesson uses a repeated cycle:

1. **Understand** a useful sentence.
2. **Recognize** the pattern.
3. **Hear** it in Russian.
4. **Build** it from sentence parts.
5. **Recall** it by typing.
6. **Correct** missed patterns before completion.
7. **Review** vocabulary with expanding intervals.
8. **Adapt** future short practice toward patterns the learner actually misses.

The app favors language that can be used immediately at home, in messages, with dogs, in a car, around Eugene, while ordering food, or planning normal couple life.

## Product layers

- `course-data.js` — lessons 1–20
- `course-pack-2.js` — lessons 21–30 and additional daily/couple practice content
- `app.js` — canonical lesson, review, progress, SRS, speech, and interaction engine
- `module-ui.js` / `module-pack-2.js` — six-module roadmap and previews
- `learning-intelligence.js` — weak-skill model, adaptive weighting, mistake notebook, weekly stats
- `quick-practice.js` — adaptive 5-item practice sessions
- `practice-lab.js` — Talk to Alex, speaking, listening levels, natural Russian
- `milestones.js` — module-completion outcomes
- `preflight-migration.js` — preserves existing learner state when the curriculum version expands
- `styles.css`, `module-ui.css`, `advanced-ui.css` — mobile-first interface
- `sw.js` — versioned offline core cache

## Validation

Run:

```bash
npm test
```

The test suite checks syntax across all shipped JavaScript, validates all 30 lessons and their exercise schemas, smoke-tests app startup/retry/review behavior, verifies safe version-2 → version-3 progress migration, and checks local shell/PWA asset consistency.

GitHub Actions runs the same zero-dependency validation on pushes to `main` and `ai/**` branches and on pull requests.

## Design rule

Keep the canonical lesson engine stable. New product behavior should be added as small composable layers unless it genuinely belongs in the core engine. New curriculum should follow the existing lesson schema so content growth does not create lesson-specific UI code.
