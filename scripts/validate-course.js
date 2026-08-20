const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'course-data.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox, { filename: 'course-data.js' });

const course = sandbox.window.FORMOMMY_COURSE;
const failures = [];
const warn = msg => failures.push(msg);
const assert = (condition, msg) => { if (!condition) warn(msg); };
const multiset = arr => [...arr].sort().join('\u0000');

assert(course && Array.isArray(course.lessons), 'Course or lessons array missing');
if (course && Array.isArray(course.lessons)) {
  assert(course.lessons.length >= 15, 'Expected at least 15 lessons');
  course.lessons.forEach((lesson, li) => {
    const tag = `Lesson ${lesson.id ?? li + 1}`;
    assert(lesson.id === li + 1, `${tag}: ids must be contiguous from 1`);
    assert(lesson.title && lesson.subtitle && lesson.unit && lesson.level, `${tag}: metadata incomplete`);
    assert(Array.isArray(lesson.goals) && lesson.goals.length >= 2, `${tag}: goals missing`);
    assert(Array.isArray(lesson.vocab) && lesson.vocab.length >= 3, `${tag}: vocabulary too small`);
    assert(Array.isArray(lesson.steps) && lesson.steps.length >= 6, `${tag}: expected at least 6 exercises`);
    const localWords = new Set();
    lesson.vocab.forEach((word, wi) => {
      assert(word.russian && word.english, `${tag} vocab ${wi + 1}: russian/english missing`);
      const key = String(word.russian).toLowerCase();
      assert(!localWords.has(key), `${tag}: duplicate vocabulary “${word.russian}”`);
      localWords.add(key);
    });
    lesson.steps.forEach((step, si) => {
      const s = `${tag} step ${si + 1} (${step.type})`;
      assert(['learn','choice','listen','build','type'].includes(step.type), `${s}: unsupported type`);
      assert(step.prompt, `${s}: prompt missing`);
      assert(step.grammar && step.grammar.rule && step.grammar.order, `${s}: grammar explanation incomplete`);
      assert(Array.isArray(step.grammar?.parts) && step.grammar.parts.length >= 1, `${s}: grammar parts missing`);
      if (step.type === 'learn') {
        assert(step.russian && step.translation && step.note, `${s}: learn content incomplete`);
      }
      if (step.type === 'choice' || step.type === 'listen') {
        assert(Array.isArray(step.answers) && step.answers.length >= 3, `${s}: needs 3+ answer choices`);
        assert(step.answers?.includes(step.correct), `${s}: correct answer not present`);
        assert(new Set(step.answers || []).size === (step.answers || []).length, `${s}: duplicate answer choices`);
      }
      if (step.type === 'listen') assert(step.speech, `${s}: speech missing`);
      if (step.type === 'build') {
        assert(Array.isArray(step.chips) && Array.isArray(step.correct), `${s}: build arrays missing`);
        assert(multiset(step.chips || []) === multiset(step.correct || []), `${s}: chips and correct answer do not contain the same parts`);
      }
      if (step.type === 'type') assert(Array.isArray(step.answers) && step.answers.length >= 1, `${s}: typed answers missing`);
    });
  });
}
assert(Array.isArray(course?.dailyPhrases) && course.dailyPhrases.length >= 7, 'Need at least 7 daily phrases');
assert(Array.isArray(course?.couplePractice) && course.couplePractice.length >= 8, 'Need at least 8 couple-practice scenarios');

if (failures.length) {
  console.error(`Course validation failed (${failures.length}):`);
  failures.forEach(item => console.error(`- ${item}`));
  process.exit(1);
}
const exerciseCount = course.lessons.reduce((n, lesson) => n + lesson.steps.length, 0);
const vocabCount = course.lessons.reduce((n, lesson) => n + lesson.vocab.length, 0);
console.log(`OK: ${course.lessons.length} lessons, ${exerciseCount} exercises, ${vocabCount} review items, ${course.couplePractice.length} couple scenarios.`);
