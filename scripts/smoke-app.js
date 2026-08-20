const fs = require('fs');
const vm = require('vm');
const path = require('path');

const root = path.resolve(__dirname, '..');
const courseSource = fs.readFileSync(path.join(root, 'course-data.js'), 'utf8');
const packSource = fs.readFileSync(path.join(root, 'course-pack-2.js'), 'utf8');
const migrationSource = fs.readFileSync(path.join(root, 'preflight-migration.js'), 'utf8');
const appSource = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

class FakeClassList { toggle() {} add() {} remove() {} contains() { return false; } }
function fakeElement() {
  return { innerHTML:'', textContent:'', dataset:{}, disabled:false, classList:new FakeClassList(), addEventListener(){}, querySelectorAll(){return[];}, querySelector(){return fakeElement();}, focus(){}, select(){} };
}
function makeSandbox(initialStorage = {}) {
  const storage = new Map(Object.entries(initialStorage));
  const elements = new Map();
  const document = { getElementById(id){ if(!elements.has(id)) elements.set(id,fakeElement()); return elements.get(id); } };
  const localStorage = { getItem(k){return storage.has(k)?storage.get(k):null;}, setItem(k,v){storage.set(k,String(v));}, removeItem(k){storage.delete(k);} };
  const sandbox = { window:{scrollTo(){},speechSynthesis:undefined}, document, localStorage, navigator:{}, alert(){}, setTimeout(){return 0;}, clearTimeout(){}, console };
  sandbox.window.window = sandbox.window;
  sandbox.window.localStorage = localStorage;
  vm.createContext(sandbox);
  vm.runInContext(courseSource,sandbox,{filename:'course-data.js'});
  vm.runInContext(packSource,sandbox,{filename:'course-pack-2.js'});
  vm.runInContext(migrationSource,sandbox,{filename:'preflight-migration.js'});
  vm.runInContext(appSource,sandbox,{filename:'app.js'});
  return { sandbox, storage };
}
function evaluate(sandbox, expression){ return vm.runInContext(expression,sandbox); }
function assert(condition,message){ if(!condition) throw new Error(message); }

{
  const { sandbox } = makeSandbox();
  assert(evaluate(sandbox,'currentView') === 'onboarding','Fresh user should see onboarding');
  assert(evaluate(sandbox,'lessons.length') === 30,'App should load 30 lessons');
  assert(evaluate(sandbox,'lessonById(30).steps.length') === 6,'Final checkpoint missing');
}
{
  const current = JSON.stringify({ onboarded:true, completedLessons:[1,2,3,4,5], xp:420, streak:3, review:{'1:0':{level:2,due:0}}, curriculumVersion:2 });
  const { sandbox } = makeSandbox({ 'formommy-state-v2': current });
  assert(evaluate(sandbox,'state.completedLessons.length') === 5,'Curriculum expansion should preserve current progress');
  assert(evaluate(sandbox,'state.xp') === 420,'XP should be preserved');
  assert(evaluate(sandbox,'state.curriculumVersion') === 3,'Curriculum version should migrate to pack 2');
}
{
  const legacy = JSON.stringify({ onboarded:true, completedLessons:[1,2,3,4,5], xp:420, streak:9 });
  const { sandbox } = makeSandbox({ 'formommy-state-a1a2-v1': legacy });
  assert(evaluate(sandbox,'state.completedLessons.length') === 0,'Legacy lesson completion must reset');
  assert(evaluate(sandbox,'state.xp') === 420,'Legacy XP should be preserved');
}
{
  const { sandbox } = makeSandbox();
  evaluate(sandbox,'state.onboarded=true; startLesson(1)');
  assert(evaluate(sandbox,'lessonSession.lessonId') === 1,'Lesson 1 did not start');
  evaluate(sandbox,'recordMistake()');
  assert(evaluate(sandbox,'lessonSession.retrySteps.length') === 1,'Mistake was not queued');
}
{
  const { sandbox } = makeSandbox();
  evaluate(sandbox,'state.completedLessons=[1]; seedLessonReview(lessonById(1))');
  assert(evaluate(sandbox,'allReviewCards().length') === 5,'Lesson 1 should seed five review cards');
}
console.log('OK: 30-lesson boot, safe curriculum migration, retry queue, and review seeding passed.');