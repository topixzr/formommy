const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const courseSource = fs.readFileSync(path.join(root, 'course-data.js'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

class FakeClassList {
  toggle() {}
  add() {}
  remove() {}
  contains() { return false; }
}
function fakeElement() {
  return {
    innerHTML: '', textContent: '', dataset: {}, disabled: false,
    classList: new FakeClassList(), addEventListener() {},
    querySelectorAll() { return []; }, querySelector() { return fakeElement(); },
    focus() {}, select() {},
  };
}
function makeSandbox(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));
  const elements = new Map();
  const document = { getElementById(id) { if (!elements.has(id)) elements.set(id, fakeElement()); return elements.get(id); } };
  const sandbox = {
    window: { scrollTo() {}, speechSynthesis: undefined }, document,
    localStorage: { getItem(k) { return storage.has(k) ? storage.get(k) : null; }, setItem(k,v) { storage.set(k, String(v)); }, removeItem(k) { storage.delete(k); } },
    navigator: {}, alert() {}, setTimeout() { return 0; }, clearTimeout() {}, console,
  };
  sandbox.window.window = sandbox.window;
  vm.createContext(sandbox);
  vm.runInContext(courseSource, sandbox, { filename: 'course-data.js' });
  vm.runInContext(appSource, sandbox, { filename: 'app.js' });
  return { sandbox, storage };
}
function evaluate(sandbox, expression) { return vm.runInContext(expression, sandbox); }
function assert(condition, message) { if (!condition) throw new Error(message); }

{
  const { sandbox } = makeSandbox();
  assert(evaluate(sandbox, 'currentView') === 'onboarding', 'Fresh user should see onboarding');
  assert(evaluate(sandbox, 'lessons.length') === 20, 'App should load 20 lessons');
  assert(evaluate(sandbox, 'lessonById(20).steps.length') === 6, 'Final checkpoint missing');
}
{
  const legacy = JSON.stringify({ onboarded: true, completedLessons: [1,2,3,4,5], xp: 420, streak: 9 });
  const { sandbox } = makeSandbox({ 'formommy-state-a1a2-v1': legacy });
  assert(evaluate(sandbox, 'state.completedLessons.length') === 0, 'Legacy lesson completion must reset');
  assert(evaluate(sandbox, 'state.xp') === 420, 'Legacy XP should be preserved');
  assert(evaluate(sandbox, 'state.streak') === 1, 'Legacy streak should not be treated as current study streak');
}
{
  const { sandbox } = makeSandbox();
  evaluate(sandbox, 'state.onboarded=true; startLesson(1)');
  assert(evaluate(sandbox, 'lessonSession.lessonId') === 1, 'Lesson 1 did not start');
  assert(evaluate(sandbox, 'currentStep().type') === 'learn', 'Unexpected first exercise type');
  evaluate(sandbox, 'recordMistake()');
  assert(evaluate(sandbox, 'lessonSession.retrySteps.length') === 1, 'Mistake was not queued');
  assert(evaluate(sandbox, 'lessonSession.retrySteps[0]') === 0, 'Wrong retry step queued');
}
{
  const { sandbox } = makeSandbox();
  evaluate(sandbox, 'state.completedLessons=[1]; seedLessonReview(lessonById(1))');
  assert(evaluate(sandbox, 'allReviewCards().length') === 5, 'Lesson 1 should seed five review cards');
  assert(evaluate(sandbox, 'dueReviewCards().length') === 5, 'New review cards should be due immediately');
}

console.log('OK: app boot, curriculum migration, retry queue, and review seeding passed.');
