const app = document.getElementById('app');
const bottomNav = document.getElementById('bottomNav');
const backButton = document.getElementById('backButton');
const streakCount = document.getElementById('streakCount');
const brandButton = document.getElementById('brandButton');

const course = window.FORMOMMY_COURSE;
if (!course || !Array.isArray(course.lessons)) {
  throw new Error('Course data failed to load.');
}
const lessons = course.lessons;
const STORAGE_KEY = 'formommy-state-v2';
const LEGACY_KEY = 'formommy-state-a1a2-v1';
const DAY = 86400000;
const SRS_INTERVALS = [0, 1, 3, 7, 14, 30];

const defaultState = {
  onboarded: false,
  completedLessons: [],
  xp: 0,
  streak: 1,
  lastVisit: null,
  lastStudyDate: null,
  review: {},
  settings: { transliteration: true },
};

let state = loadState();
let currentView = state.onboarded ? 'home' : 'onboarding';
let lessonSession = null;
let reviewSession = null;
let practiceIndex = 0;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (stored) return normalizeState(stored);
    const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null');
    if (legacy) {
      return normalizeState({
        ...defaultState,
        onboarded: legacy.onboarded,
        completedLessons: legacy.completedLessons || [],
        xp: legacy.xp || 0,
        streak: legacy.streak || 1,
        lastVisit: legacy.lastVisit || null,
      });
    }
  } catch {}
  return structuredCloneSafe(defaultState);
}

function normalizeState(raw) {
  const merged = {
    ...structuredCloneSafe(defaultState),
    ...raw,
    settings: { ...defaultState.settings, ...(raw.settings || {}) },
    review: raw.review || {},
  };
  merged.completedLessons = [...new Set((merged.completedLessons || []).filter(id => lessons.some(l => l.id === id)))];
  return merged;
}

function structuredCloneSafe(value) {
  return JSON.parse(JSON.stringify(value));
}

function localDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function updateStreak() {
  const today = localDateKey();
  if (!state.lastStudyDate) return;
  if (state.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (state.lastStudyDate !== localDateKey(yesterday)) {
    state.streak = 1;
  }
}

function markStudyDay() {
  const today = localDateKey();
  if (state.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.streak = state.lastStudyDate === localDateKey(yesterday) ? state.streak + 1 : 1;
  state.lastStudyDate = today;
}

function saveState({ study = false } = {}) {
  if (study) markStudyDay();
  state.lastVisit = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  streakCount.textContent = state.streak;
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}
function escapeAttribute(value = '') { return escapeHtml(value).replaceAll('\n', '&#10;'); }
function containsCyrillic(value = '') { return /[А-Яа-яЁё]/.test(value); }
function normalizeAnswer(value = '') {
  return value.toLocaleLowerCase('ru-RU').trim().replace(/[.,!?;:—–-]/g, '').replace(/\s+/g, ' ');
}
function isCorrectTyped(value, answers) {
  const v = normalizeAnswer(value);
  return answers.some(answer => normalizeAnswer(answer) === v);
}
function lessonById(id) { return lessons.find(l => l.id === id); }
function completedCount() { return state.completedLessons.length; }
function isUnlocked(id) {
  if (id === 1) return true;
  return state.completedLessons.includes(id) || state.completedLessons.includes(id - 1);
}
function firstIncompleteLesson() {
  return lessons.find(l => !state.completedLessons.includes(l.id)) || lessons[lessons.length - 1];
}
function coursePercent() { return Math.round((completedCount() / lessons.length) * 100); }

function setNav(active) {
  bottomNav.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', btn.dataset.nav === active));
}
function navigate(view) {
  currentView = view;
  const inLesson = view === 'lesson';
  backButton.classList.toggle('hidden', !inLesson);
  bottomNav.classList.toggle('hidden', !state.onboarded || inLesson);
  setNav(view);
  const renderers = {
    onboarding: renderOnboarding, home: renderHome, course: renderCourse,
    review: renderReview, tutor: renderPractice, lesson: renderLesson
  };
  renderers[view]?.();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOnboarding() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="onboarding-art">Я</div>
      <div class="eyebrow">Russian for real life · A1 → A2</div>
      <h1>Russian you can use at home tonight.</h1>
      <p>Short lessons for an English-speaking adult: readable Russian, simple English explanations, listening, sentence building, and grammar that shows exactly what each word is doing.</p>
      <div class="feature-pills">
        <span>15 lessons</span><span>90 exercises</span><span>🔊 Listening</span><span>🧩 Sentence anatomy</span><span>↻ Smart review</span>
      </div>
      <section class="card onboarding-example">
        <div class="prompt">FIRST USEFUL PHRASE</div>
        <div class="phrase-russian">Хочешь кофе?</div>
        <div class="translation">Do you want coffee?</div>
      </section>
      <button id="startButton" class="primary">Start with Lesson 1</button>
    </section>`;
  document.getElementById('startButton').addEventListener('click', () => {
    state.onboarded = true;
    saveState();
    navigate('home');
  });
}

function dailyPhrase() {
  const i = Math.abs(Math.floor(Date.now() / DAY)) % course.dailyPhrases.length;
  return course.dailyPhrases[i];
}

function renderHome() {
  const done = completedCount();
  const target = firstIncompleteLesson();
  const phrase = dailyPhrase();
  const due = dueReviewCards().length;
  const finished = done === lessons.length;
  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">${finished ? 'COURSE COMPLETE' : `Lesson ${target.id} of ${lessons.length}`}</div>
      <h1>${finished ? 'You built the foundation.' : escapeHtml(target.title)}</h1>
      <p>${finished ? 'Keep the Russian active with review and couple practice.' : escapeHtml(target.subtitle)}</p>
    </section>

    <section class="card glow-card">
      <div class="card-head">
        <div>
          <div class="eyebrow">${finished ? 'Next step' : escapeHtml(target.unit)}</div>
          <h2>${finished ? 'Review what matters' : escapeHtml(target.goals[0])}</h2>
        </div>
        <span class="level-pill">${escapeHtml(target.level)}</span>
      </div>
      <div class="progress-bar" aria-label="Course progress"><div class="progress-fill" style="width:${coursePercent()}%"></div></div>
      <div class="progress-meta"><span>${done}/${lessons.length} lessons</span><span>${coursePercent()}%</span></div>
      <div class="spacer"></div>
      <button id="continueButton" class="primary">${finished ? 'Start review' : `${done ? 'Continue' : 'Start'} · ${target.minutes} min`}</button>
    </section>

    <div class="stats">
      <button class="stat interactive-stat" data-home-action="review"><strong>${due}</strong><small>due review</small></button>
      <div class="stat"><strong>${state.xp}</strong><small>XP</small></div>
      <div class="stat"><strong>${state.streak}</strong><small>day streak</small></div>
    </div>

    <div class="section-title"><div><h3>Use this today</h3><p>${escapeHtml(phrase.context)}</p></div></div>
    <section class="card daily-phrase">
      <div class="phrase-russian">${escapeHtml(phrase.russian)}</div>
      <div class="translation">${escapeHtml(phrase.english)}</div>
      <button class="secondary speak" data-speech="${escapeAttribute(phrase.russian)}">🔊 Hear Russian</button>
    </section>

    <div class="section-title"><div><h3>Your course</h3><p>${lessons.length * 6} focused exercises, one pattern at a time.</p></div></div>
    <section class="card roadmap">
      <div><strong>A1</strong><span>home · questions · present</span></div>
      <div><strong>A1+</strong><span>past · future · needs · places</span></div>
      <div><strong>A2 bridge</strong><span>connected thoughts · real situations</span></div>
    </section>`;
  document.getElementById('continueButton').addEventListener('click', () => finished ? navigate('review') : startLesson(target.id));
  app.querySelector('[data-home-action="review"]').addEventListener('click', () => navigate('review'));
  bindSpeechButtons();
}

function renderCourse() {
  let currentUnit = '';
  const cards = lessons.map(lesson => {
    const unitHeading = lesson.unit !== currentUnit ? `<div class="unit-heading"><span>${escapeHtml(lesson.unit)}</span></div>` : '';
    currentUnit = lesson.unit;
    const done = state.completedLessons.includes(lesson.id);
    const unlocked = isUnlocked(lesson.id);
    return `${unitHeading}
      <button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
        <div class="lesson-number">${done ? '✓' : lesson.id}</div>
        <div>
          <div class="lesson-title">${escapeHtml(lesson.title)}</div>
          <div class="lesson-subtitle">${escapeHtml(lesson.subtitle)}</div>
          <div class="lesson-tags"><span>${escapeHtml(lesson.level)}</span><span>${lesson.minutes} min</span><span>${lesson.steps.length} exercises</span></div>
        </div>
        <div class="lesson-arrow">${unlocked ? '›' : '🔒'}</div>
      </button>`;
  }).join('');
  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">Course map</div><h1>A1 → early A2</h1>
      <p>Each lesson introduces one practical pattern, then makes you recognize, hear, build, and recall it.</p>
    </section>
    <div class="lesson-list">${cards}</div>`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach(btn => btn.addEventListener('click', () => startLesson(Number(btn.dataset.lesson))));
}

function vocabKey(lessonId, index) { return `${lessonId}:${index}`; }
function seedLessonReview(lesson) {
  lesson.vocab.forEach((_, index) => {
    const key = vocabKey(lesson.id, index);
    if (!state.review[key]) state.review[key] = { level: 0, due: Date.now() };
  });
}
function allReviewCards() {
  const result = [];
  lessons.forEach(lesson => lesson.vocab.forEach((word, index) => {
    if (!state.completedLessons.includes(lesson.id)) return;
    const key = vocabKey(lesson.id, index);
    const meta = state.review[key] || { level: 0, due: 0 };
    result.push({ key, lessonId: lesson.id, ...word, ...meta });
  }));
  return result;
}
function dueReviewCards() {
  const now = Date.now();
  return allReviewCards().filter(card => !card.due || card.due <= now).sort((a,b) => (a.due || 0) - (b.due || 0));
}
function startReviewSession() {
  const due = dueReviewCards();
  const pool = due.length ? due : allReviewCards().sort((a,b) => (a.due || 0) - (b.due || 0)).slice(0, 8);
  reviewSession = { cards: pool, index: 0, revealed: false };
}
function renderReview() {
  const all = allReviewCards();
  if (!all.length) {
    app.innerHTML = `
      <section class="hero"><div class="eyebrow">Smart review</div><h1>Finish Lesson 1 first.</h1>
      <p>Vocabulary enters review only after you encounter it in a lesson.</p></section>
      <section class="card empty-state"><div class="empty-icon">↻</div><button id="reviewLessonButton" class="primary">Open Lesson 1</button></section>`;
    document.getElementById('reviewLessonButton').addEventListener('click', () => startLesson(1));
    return;
  }
  if (!reviewSession || !reviewSession.cards.length) startReviewSession();
  renderReviewCard();
}
function renderReviewCard() {
  if (!reviewSession || reviewSession.index >= reviewSession.cards.length) return renderReviewComplete();
  const card = reviewSession.cards[reviewSession.index];
  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">Smart review · ${reviewSession.index + 1}/${reviewSession.cards.length}</div>
      <h1>Recall before reveal.</h1>
      <p>Try to understand or say the English meaning before tapping the answer.</p>
    </section>
    <section class="card word-card">
      <div class="phrase-russian">${escapeHtml(card.russian)}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(card.russian)}" aria-label="Hear Russian">🔊</button>
      ${reviewSession.revealed ? `
        ${state.settings.transliteration && card.translit ? `<div class="translit">${escapeHtml(card.translit)}</div>` : ''}
        <div class="translation">${escapeHtml(card.english)}</div>` : ''}
    </section>
    <div class="spacer small"></div>
    ${reviewSession.revealed ? `
      <div class="review-ratings">
        <button class="secondary" data-rating="again">Again<span>today</span></button>
        <button class="secondary" data-rating="hard">Hard<span>1 day</span></button>
        <button class="primary" data-rating="good">Good<span>longer</span></button>
      </div>` :
      `<button id="revealButton" class="primary">Show meaning</button>`}
    <p class="review-footnote">Lesson ${card.lessonId} · review level ${card.level || 0}</p>`;
  bindSpeechButtons();
  if (!reviewSession.revealed) {
    document.getElementById('revealButton').addEventListener('click', () => { reviewSession.revealed = true; renderReviewCard(); });
  } else {
    app.querySelectorAll('[data-rating]').forEach(btn => btn.addEventListener('click', () => rateReview(btn.dataset.rating)));
  }
}
function rateReview(rating) {
  const card = reviewSession.cards[reviewSession.index];
  const current = state.review[card.key] || { level: 0, due: 0 };
  let nextLevel = current.level || 0;
  if (rating === 'again') nextLevel = 0;
  if (rating === 'hard') nextLevel = Math.max(1, nextLevel);
  if (rating === 'good') nextLevel = Math.min(SRS_INTERVALS.length - 1, nextLevel + 1);
  const days = rating === 'again' ? 0 : rating === 'hard' ? 1 : SRS_INTERVALS[nextLevel];
  state.review[card.key] = { level: nextLevel, due: Date.now() + days * DAY };
  if (rating === 'again') reviewSession.cards.push({ ...card, level: nextLevel, due: Date.now() });
  reviewSession.index += 1;
  reviewSession.revealed = false;
  state.xp += rating === 'good' ? 2 : 1;
  saveState({ study: true });
  renderReviewCard();
}
function renderReviewComplete() {
  const due = dueReviewCards().length;
  app.innerHTML = `
    <section class="onboarding centered">
      <div class="onboarding-art small-art">✓</div>
      <div class="eyebrow">Review complete</div>
      <h1>Готово.</h1>
      <p>${due ? `${due} cards are still due.` : 'No cards are due right now. They will return over time.'}</p>
      <button id="finishReviewButton" class="primary">Back home</button>
    </section>`;
  document.getElementById('finishReviewButton').addEventListener('click', () => { reviewSession = null; navigate('home'); });
}

function renderPractice() {
  const items = course.couplePractice;
  practiceIndex = Math.min(practiceIndex, items.length - 1);
  const item = items[practiceIndex];
  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">Russian with your husband</div>
      <h1>Use a sentence, not a quiz.</h1>
      <p>Read the situation, try to say it in Russian, then reveal the model answer. These are phrases designed for everyday couple life.</p>
    </section>
    <section class="card practice-card">
      <div class="practice-count">${practiceIndex + 1} / ${items.length}</div>
      <div class="prompt">SITUATION</div>
      <h2>${escapeHtml(item.scene)}</h2>
      <div id="practiceAnswer" class="practice-answer hidden">
        <div class="phrase-russian">${escapeHtml(item.target)}</div>
        <div class="translation">${escapeHtml(item.help)}</div>
        <button class="secondary speak" data-speech="${escapeAttribute(item.target)}">🔊 Hear Russian</button>
      </div>
      <button id="revealPractice" class="primary">Show Russian</button>
    </section>
    <div class="button-row practice-nav">
      <button id="prevPractice" class="secondary" ${practiceIndex === 0 ? 'disabled' : ''}>← Previous</button>
      <button id="nextPractice" class="secondary">${practiceIndex === items.length - 1 ? 'Start over' : 'Next →'}</button>
    </div>`;
  document.getElementById('revealPractice').addEventListener('click', () => {
    document.getElementById('practiceAnswer').classList.remove('hidden');
    document.getElementById('revealPractice').classList.add('hidden');
    bindSpeechButtons();
  });
  document.getElementById('prevPractice').addEventListener('click', () => { if (practiceIndex > 0) { practiceIndex--; renderPractice(); }});
  document.getElementById('nextPractice').addEventListener('click', () => {
    practiceIndex = practiceIndex === items.length - 1 ? 0 : practiceIndex + 1;
    renderPractice();
  });
}

function startLesson(id) {
  const lesson = lessonById(id);
  if (!lesson || !isUnlocked(id)) return;
  lessonSession = { lessonId: id, step: 0, selected: [], locked: false, wrongAttempts: 0 };
  navigate('lesson');
}
function currentLesson() { return lessonById(lessonSession?.lessonId); }
function currentStep() { return currentLesson()?.steps[lessonSession?.step]; }

function renderLesson() {
  if (!lessonSession) return navigate('course');
  const lesson = currentLesson();
  const step = currentStep();
  if (!step) return finishLesson();
  const percent = Math.round(((lessonSession.step + 1) / lesson.steps.length) * 100);
  app.innerHTML = `
    <section class="lesson-stage">
      <div class="lesson-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="progress-meta"><span>Lesson ${lesson.id} · ${escapeHtml(lesson.title)}</span><span>${lessonSession.step + 1}/${lesson.steps.length}</span></div>
      </div>
      <div id="lessonContent"></div>
    </section>`;
  const container = document.getElementById('lessonContent');
  const render = { learn: renderLearnStep, choice: renderChoiceStep, listen: renderListenStep, build: renderBuildStep, type: renderTypeStep }[step.type];
  render?.(container, step);
}

function grammarBox(grammar) {
  if (!grammar) return '';
  return `
    <section class="grammar-box">
      <div class="grammar-title">WHY THIS SENTENCE WORKS</div>
      <div class="grammar-rule">${escapeHtml(grammar.rule)}</div>
      <div class="grammar-parts">
        ${(grammar.parts || []).map(([label,text,meaning]) => `
          <div class="grammar-part">
            <span class="grammar-label">${escapeHtml(label)}</span>
            <strong>${escapeHtml(text)}</strong>
            <span>${escapeHtml(meaning)}</span>
          </div>`).join('')}
      </div>
      <div class="grammar-order"><strong>Order:</strong> ${escapeHtml(grammar.order)}</div>
      ${grammar.tip ? `<div class="grammar-tip"><strong>Remember:</strong> ${escapeHtml(grammar.tip)}</div>` : ''}
    </section>`;
}
function transliteration(step) {
  return state.settings.transliteration && step.translit ? `<div class="translit">${escapeHtml(step.translit)}</div>` : '';
}
function renderLearnStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${escapeHtml(step.prompt)}</div>
    <section class="card word-card">
      <div class="phrase-russian multiline">${escapeHtml(step.russian).replaceAll('\n','<br>')}</div>
      ${transliteration(step)}
      <div class="translation multiline">${escapeHtml(step.translation).replaceAll('\n','<br>')}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(step.russian)}">🔊</button>
      <div class="note">${escapeHtml(step.note)}</div>
    </section>
    ${grammarBox(step.grammar)}
    <div class="spacer small"></div>
    <button id="nextButton" class="primary">Continue</button>`;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}
function renderChoiceStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${escapeHtml(step.prompt)}</div>
    ${grammarBox(step.grammar)}
    <div class="answers">
      ${step.answers.map(answer => `<button class="answer ${containsCyrillic(answer) ? 'russian-text' : ''}" data-answer="${escapeAttribute(answer)}">${escapeHtml(answer)}</button>`).join('')}
    </div><div id="feedback"></div>`;
  container.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => handleChoice(btn, step)));
}
function renderListenStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${escapeHtml(step.prompt)}</div>
    <section class="card listening-card">
      <button id="listenButton" class="audio-button audio-large" aria-label="Play Russian">🔊</button>
      <p>Tap to hear the Russian sentence again.</p>
    </section>
    ${grammarBox(step.grammar)}
    <div class="answers">
      ${step.answers.map(answer => `<button class="answer ${containsCyrillic(answer) ? 'russian-text' : ''}" data-answer="${escapeAttribute(answer)}">${escapeHtml(answer)}</button>`).join('')}
    </div><div id="feedback"></div>`;
  document.getElementById('listenButton').addEventListener('click', () => speakRussian(step.speech));
  setTimeout(() => speakRussian(step.speech), 300);
  container.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => handleChoice(btn, step)));
}
function handleChoice(button, step) {
  if (lessonSession.locked) return;
  const correct = button.dataset.answer === step.correct;
  if (!correct) {
    button.classList.add('wrong');
    button.disabled = true;
    lessonSession.wrongAttempts++;
    navigator.vibrate?.(30);
    const feedback = document.getElementById('feedback');
    feedback.innerHTML = `<div class="feedback wrong-feedback"><strong>Not this one.</strong><span>${escapeHtml(step.grammar?.rule || 'Try again.')}</span></div>`;
    return;
  }
  lessonSession.locked = true;
  button.classList.add('correct');
  document.getElementById('feedback').innerHTML = `
    <div class="feedback correct-feedback"><strong>Correct.</strong><span>${escapeHtml(step.translation || step.correct)}</span></div>
    <div class="spacer tiny"></div><button id="nextButton" class="primary">Continue</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}
function renderBuildStep(container, step) {
  lessonSession.selected = [];
  container.innerHTML = `
    <div class="prompt">${escapeHtml(step.prompt)}</div>
    ${grammarBox(step.grammar)}
    <div id="sentenceZone" class="sentence-zone"><span class="zone-placeholder">Tap the parts in order</span></div>
    <div class="word-bank">
      ${step.chips.map((chip, i) => `<button class="chip russian-text" data-chip-index="${i}">${escapeHtml(chip)}</button>`).join('')}
    </div>
    <div class="spacer small"></div>
    <button id="checkSentence" class="primary">Check sentence</button>
    <button id="resetSentence" class="text-button">Reset</button>
    <div id="feedback"></div>`;
  const zone = document.getElementById('sentenceZone');
  container.querySelectorAll('[data-chip-index]').forEach(btn => btn.addEventListener('click', () => {
    if (lessonSession.locked || btn.classList.contains('used')) return;
    const chip = step.chips[Number(btn.dataset.chipIndex)];
    lessonSession.selected.push(chip);
    btn.classList.add('used');
    zone.innerHTML = lessonSession.selected.map((word, i) => `<button class="selected-chip russian-text" data-selected-index="${i}">${escapeHtml(word)}</button>`).join('');
    bindSelectedRemoval(container, step);
  }));
  document.getElementById('resetSentence').addEventListener('click', () => { lessonSession.selected = []; renderBuildStep(container, step); });
  document.getElementById('checkSentence').addEventListener('click', () => checkBuiltSentence(step));
}
function bindSelectedRemoval(container, step) {
  container.querySelectorAll('[data-selected-index]').forEach(btn => btn.addEventListener('click', () => {
    if (lessonSession.locked) return;
    lessonSession.selected.splice(Number(btn.dataset.selectedIndex), 1);
    renderBuildStep(container, step);
  }));
}
function checkBuiltSentence(step) {
  const isCorrect = lessonSession.selected.length === step.correct.length && lessonSession.selected.every((v,i) => v === step.correct[i]);
  const feedback = document.getElementById('feedback');
  if (!isCorrect) {
    lessonSession.wrongAttempts++;
    feedback.innerHTML = `<div class="feedback wrong-feedback"><strong>Check the order.</strong><span>${escapeHtml(step.grammar?.order || 'Try again.')}</span></div>`;
    navigator.vibrate?.(30);
    return;
  }
  lessonSession.locked = true;
  feedback.innerHTML = `
    <div class="feedback correct-feedback"><strong>${escapeHtml(step.answerText)}</strong><span>Good structure.</span></div>
    <div class="spacer tiny"></div><button id="nextButton" class="primary">Continue</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}
function renderTypeStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${escapeHtml(step.prompt)}</div>
    ${grammarBox(step.grammar)}
    <section class="card typing-card">
      <label for="typedAnswer">Type in Russian</label>
      <input id="typedAnswer" class="type-input" lang="ru" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${escapeAttribute(step.hint || '')}" />
      <button id="checkTyped" class="primary">Check answer</button>
    </section><div id="feedback"></div>`;
  const input = document.getElementById('typedAnswer');
  input.focus();
  input.addEventListener('keydown', e => { if (e.key === 'Enter') checkTyped(step); });
  document.getElementById('checkTyped').addEventListener('click', () => checkTyped(step));
}
function checkTyped(step) {
  if (lessonSession.locked) return;
  const input = document.getElementById('typedAnswer');
  const feedback = document.getElementById('feedback');
  if (!isCorrectTyped(input.value, step.answers)) {
    lessonSession.wrongAttempts++;
    feedback.innerHTML = `<div class="feedback wrong-feedback"><strong>Try once more.</strong><span>Hint: ${escapeHtml(step.hint || step.grammar?.rule || '')}</span></div>`;
    navigator.vibrate?.(30);
    input.select();
    return;
  }
  lessonSession.locked = true;
  input.disabled = true;
  feedback.innerHTML = `
    <div class="feedback correct-feedback"><strong>${escapeHtml(step.answerText)}</strong><span>Correct.</span></div>
    <div class="spacer tiny"></div><button id="nextButton" class="primary">Finish exercise</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}
function nextLessonStep() {
  lessonSession.step++;
  lessonSession.selected = [];
  lessonSession.locked = false;
  saveState({ study: true });
  renderLesson();
}
function finishLesson() {
  const lesson = currentLesson();
  const firstCompletion = !state.completedLessons.includes(lesson.id);
  if (firstCompletion) {
    state.completedLessons.push(lesson.id);
    state.xp += lesson.xp;
    seedLessonReview(lesson);
  } else {
    state.xp += Math.round(lesson.xp * 0.2);
  }
  saveState({ study: true });
  const next = lessonById(lesson.id + 1);
  app.innerHTML = `
    <section class="onboarding centered">
      <div class="onboarding-art small-art">✓</div>
      <div class="eyebrow">Lesson ${lesson.id} complete</div>
      <h1>${escapeHtml(lesson.title)}</h1>
      <p>${firstCompletion ? `+${lesson.xp} XP · ${lesson.vocab.length} review cards added` : `Practice complete · +${Math.round(lesson.xp * .2)} XP`}</p>
      <section class="card goal-summary">
        <div class="prompt">YOU CAN NOW</div>
        ${lesson.goals.map(goal => `<div class="goal-row">✓ <span>${escapeHtml(goal)}</span></div>`).join('')}
      </section>
      ${next ? `<button id="nextLessonButton" class="primary">Next · ${escapeHtml(next.title)}</button>` : `<button id="nextLessonButton" class="primary">Start smart review</button>`}
      <button id="homeButton" class="text-button">Back home</button>
    </section>`;
  document.getElementById('nextLessonButton').addEventListener('click', () => next ? startLesson(next.id) : navigate('review'));
  document.getElementById('homeButton').addEventListener('click', () => navigate('home'));
  lessonSession = null;
}

function speakRussian(text) {
  if (!('speechSynthesis' in window)) return alert('Speech is not available in this browser.');
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text.replaceAll('\n',' '));
  utterance.lang = 'ru-RU';
  utterance.rate = 0.82;
  const voices = speechSynthesis.getVoices();
  const russianVoice = voices.find(v => v.lang?.toLowerCase().startsWith('ru'));
  if (russianVoice) utterance.voice = russianVoice;
  speechSynthesis.speak(utterance);
}
function bindSpeechButtons() {
  app.querySelectorAll('.speak').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = '1';
    btn.addEventListener('click', () => speakRussian(btn.dataset.speech || ''));
  });
}

bottomNav.addEventListener('click', e => {
  const button = e.target.closest('[data-nav]');
  if (button) navigate(button.dataset.nav);
});
backButton.addEventListener('click', () => {
  if (currentView === 'lesson') {
    lessonSession = null;
    navigate('course');
  }
});
brandButton.addEventListener('click', () => {
  if (state.onboarded && currentView !== 'lesson') navigate('home');
});
brandButton.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && state.onboarded && currentView !== 'lesson') navigate('home');
});

updateStreak();
saveState();
navigate(currentView);