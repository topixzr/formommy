# Formommy course architecture

## Product target

The learner is an English-speaking adult at beginner level. The immediate goal is useful spoken Russian with a spouse, not completion of a grammar syllabus. The course therefore uses communicative frequency first and delays large case/conjugation tables until concrete examples exist.

## Lesson contract

Every lesson object contains:

- `id`, `unit`, `title`, `subtitle`, `minutes`, `xp`, `level`
- `goals`: what the learner should be able to do
- `vocab`: items that enter smart review after lesson completion
- `steps`: six or more exercises

Supported step types:

- `learn`
- `choice`
- `listen`
- `build`
- `type`

Every step must include a `grammar` object with:

- `rule`: one plain-English rule
- `parts`: labeled sentence components
- `order`: why the presented neutral word order works
- optional `tip`: a high-value warning or memory cue

## Difficulty rules

1. Introduce no more than one major new structure per lesson.
2. Reuse known vocabulary when introducing new grammar.
3. Prefer high-frequency couple/home language over classroom nouns.
4. Use feminine self-reference where the learner speaks about herself.
5. Teach chunks before full paradigms when a paradigm is not yet useful.
6. Show neutral word order first; mention alternatives only when they solve a real comprehension issue.
7. Do not use slang as the primary model. Colloquial forms can be added later with an explicit “spoken” label.
8. Keep English explanations short enough to read on one phone screen.
9. Every listening item must be answerable from material already taught.
10. Checkpoints should recombine old material rather than introduce a new grammar load.

## Review model

Vocabulary is seeded into review on first lesson completion. Current intervals are approximately:

- Again: repeat in the current session
- Hard: 1 day
- Good progression: 1 → 3 → 7 → 14 → 30 days

This is intentionally simple. If review volume grows substantially, migrate to a proper FSRS implementation while preserving stored card ids (`lessonId:index`).

## State compatibility

State is versioned separately from curriculum. A major curriculum rewrite should not mark new lessons complete merely because older lessons used the same numeric ids. Preserve durable metrics only when their semantics remain valid.
