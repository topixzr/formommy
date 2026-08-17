const app = document.getElementById('app');
const bottomNav = document.getElementById('bottomNav');
const backButton = document.getElementById('backButton');
const streakCount = document.getElementById('streakCount');
const brandButton = document.getElementById('brandButton');

const STORAGE_KEY = 'formommy-state-v1';

const defaultState = {
  onboarded: false,
  completedLessons: [],
  xp: 0,
  streak: 1,
  lastVisit: null,
  lessonStep: 0,
};

let state = loadState();
let currentView = state.onboarded ? 'home' : 'onboarding';
let lessonSession = null;

const lessons = [
  { id: 1, title: 'Привет!', subtitle: 'Hello, goodbye & your first Russian phrases', minutes: 8 },
  { id: 2, title: 'Меня зовут…', subtitle: 'Introduce yourself', minutes: 9 },
  { id: 3, title: 'Да или нет?', subtitle: 'Yes, no, please & thank you', minutes: 8 },
  { id: 4, title: 'Это кто?', subtitle: 'People, family & simple questions', minutes: 10 },
  { id: 5, title: 'У меня есть…', subtitle: 'Talk about what you have', minutes: 11 },
];

const lessonOne = [
  {
    type: 'learn',
    prompt: 'Your first Russian word',
    russian: 'Привет!',
    translit: 'Privet!',
    translation: 'Hi! / Hello!',
    note: 'Use «Привет!» with friends, family, and people you know. It is informal, like “Hi!” in English.',
  },
  {
    type: 'learn',
    prompt: 'A polite greeting',
    russian: 'Здравствуйте!',
    translit: 'Zdravstvuyte!',
    translation: 'Hello!',
    note: 'This is the polite or formal greeting. Russian spelling looks intimidating here — that is normal. You do not need to master every sound today.',
  },
  {
    type: 'choice',
    prompt: 'Choose the Russian word for “Hi!”',
    answers: ['Спасибо', 'Привет', 'Пока'],
    correct: 'Привет',
  },
  {
    type: 'listen',
    prompt: 'Listen and choose what you hear',
    speech: 'Пока',
    answers: ['Привет', 'Пока', 'Спасибо'],
    correct: 'Пока',
    translation: 'Bye! / See you!',
  },
  {
    type: 'build',
    prompt: 'Build: “Hello, Anna!”',
    chips: ['Анна', 'Привет'],
    correct: ['Привет', 'Анна'],
  },
  {
    type: 'choice',
    prompt: 'You are leaving a friend’s house. What do you say?',
    answers: ['Пока!', 'Здравствуйте!', 'Привет!'],
    correct: 'Пока!',
  },
];

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  streakCount.textContent = state.streak;
}

function setNav(active) {
  bottomNav.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === active);
  });
}

function navigate(view) {
  currentView = view;
  backButton.classList.toggle('hidden', view !== 'lesson');
  bottomNav.classList.toggle('hidden', !state.onboarded || view === 'lesson');
  setNav(view);

  if (view === 'onboarding') renderOnboarding();
  if (view === 'home') renderHome();
  if (view === 'course') renderCourse();
  if (view === 'review') renderReview();
  if (view === 'tutor') renderTutor();
  if (view === 'lesson') renderLesson();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOnboarding() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="onboarding-art russian">Я</div>
      <div class="eyebrow">Russian from zero</div>
      <h1>Learn Russian for real life.</h1>
      <p>Short beginner lessons designed for an English speaker. Start with useful Russian, learn Cyrillic gradually, and build confidence one phrase at a time.</p>
      <div class="feature-pills">
        <span>🇷🇺 A1 beginner</span>
        <span>🔊 Russian audio</span>
        <span>🧠 Smart review</span>
        <span>💬 Real-life phrases</span>
      </div>
      <button id="startButton" class="primary">Start learning Russian</button>
    </section>
  `;

  document.getElementById('startButton').addEventListener('click', () => {
    state.onboarded = true;
    state.lastVisit = new Date().toISOString();
    saveState();
    navigate('home');
  });
}

function renderHome() {
  const done = state.completedLessons.length;
  const coursePercent = Math.round((done / lessons.length) * 100);
  const firstIncomplete = lessons.find((lesson) => !state.completedLessons.includes(lesson.id)) || lessons[lessons.length - 1];

  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Russian A1</div>
      <h1>Добрый день.</h1>
      <p>One short lesson today is enough. Keep Russian practical and repeat what matters.</p>
    </section>

    <section class="card glow-card">
      <div class="eyebrow">Continue learning</div>
      <h2 class="russian">${firstIncomplete.title}</h2>
      <p>${firstIncomplete.subtitle}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${coursePercent}%"></div></div>
      <div class="progress-meta"><span>${done} of ${lessons.length} lessons</span><span>${coursePercent}%</span></div>
      <div style="height:16px"></div>
      <button id="continueButton" class="primary">${done === 0 ? 'Start Lesson 1' : 'Continue course'} · ${firstIncomplete.minutes} min</button>
    </section>

    <div class="stats">
      <div class="stat"><strong>${state.xp}</strong><small>XP</small></div>
      <div class="stat"><strong>${state.streak}</strong><small>day streak</small></div>
      <div class="stat"><strong>${done}</strong><small>lessons</small></div>
    </div>

    <div class="section-title"><div><h3>Today’s Russian</h3><p>Say one phrase in real life.</p></div></div>
    <section class="card">
      <div class="prompt">TRY THIS TODAY</div>
      <h2 class="russian" style="font-size:34px">Ты хочешь кофе?</h2>
      <div class="translit">Ty khochesh kofe?</div>
      <p class="translation">Do you want coffee?</p>
      <button class="secondary speak" data-speech="Ты хочешь кофе?">🔊 Hear it</button>
    </section>
  `;

  document.getElementById('continueButton').addEventListener('click', () => startLesson(firstIncomplete.id));
  bindSpeechButtons();
}

function renderCourse() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Course path</div>
      <h1>Russian A1</h1>
      <p>Module 1 · First conversations</p>
    </section>
    <div class="lesson-list">
      ${lessons.map((lesson, index) => {
        const done = state.completedLessons.includes(lesson.id);
        const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1);
        return `
          <button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
            <div class="lesson-number">${done ? '✓' : lesson.id}</div>
            <div>
              <div class="lesson-title russian">${lesson.title}</div>
              <div class="lesson-subtitle">${lesson.subtitle} · ${lesson.minutes} min</div>
            </div>
            <div>${!unlocked ? '🔒' : '›'}</div>
          </button>
        `;
      }).join('')}
    </div>
  `;

  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => startLesson(Number(button.dataset.lesson)));
  });
}

function renderReview() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Vocabulary</div>
      <h1>Daily review</h1>
      <p>Spaced repetition will live here as the vocabulary library grows.</p>
    </section>
    <section class="card empty-state">
      <div class="empty-icon">🧠</div>
      <h2>Learn a few words first</h2>
      <p>Complete Lesson 1 and your first review cards will appear here.</p>
      <button id="reviewLessonButton" class="primary">Open Lesson 1</button>
    </section>
  `;
  document.getElementById('reviewLessonButton').addEventListener('click', () => startLesson(1));
}

function renderTutor() {
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">AI Tutor · coming next</div>
      <h1>Ask about Russian.</h1>
      <p>The tutor will explain Russian in simple English, stay at A1 level, and give examples using vocabulary already learned.</p>
    </section>
    <section class="card">
      <div class="prompt">EXAMPLE QUESTION</div>
      <h3>Why does Russian use «у меня» for “I have”?</h3>
      <p>Future version: the tutor answers in beginner-friendly English and can simplify the explanation or generate three examples.</p>
      <button class="secondary" disabled>✦ AI Tutor will be connected later</button>
    </section>
  `;
}

function startLesson(id) {
  if (id !== 1) {
    alert('Lesson content is being built. Lesson 1 is ready now.');
    return;
  }
  lessonSession = { lessonId: id, step: 0, selected: [], locked: false };
  navigate('lesson');
}

function renderLesson() {
  if (!lessonSession) return navigate('course');
  const step = lessonOne[lessonSession.step];
  const percent = Math.round(((lessonSession.step + 1) / lessonOne.length) * 100);

  app.innerHTML = `
    <section class="lesson-stage">
      <div class="lesson-progress">
        <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="progress-meta"><span>Lesson 1 · Привет!</span><span>${lessonSession.step + 1}/${lessonOne.length}</span></div>
      </div>
      <div id="lessonContent"></div>
    </section>
  `;

  const container = document.getElementById('lessonContent');
  if (step.type === 'learn') renderLearnStep(container, step);
  if (step.type === 'choice') renderChoiceStep(container, step);
  if (step.type === 'listen') renderListenStep(container, step);
  if (step.type === 'build') renderBuildStep(container, step);
}

function renderLearnStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <section class="card word-card">
      <div class="big-russian russian">${step.russian}</div>
      <div class="translit">${step.translit}</div>
      <div class="translation">${step.translation}</div>
      <button class="audio-button speak" data-speech="${step.russian}" aria-label="Hear Russian">🔊</button>
      <div class="note">${step.note}</div>
    </section>
    <div style="height:14px"></div>
    <button id="nextButton" class="primary">Continue</button>
  `;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderChoiceStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <div class="answers">
      ${step.answers.map((answer) => `<button class="answer russian" data-answer="${answer}">${answer}</button>`).join('')}
    </div>
    <div id="feedback"></div>
  `;

  container.querySelectorAll('[data-answer]').forEach((button) => {
    button.addEventListener('click', () => handleChoice(button, step));
  });
}

function renderListenStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <section class="card word-card">
      <button id="listenButton" class="audio-button" style="width:76px;height:76px;font-size:28px" aria-label="Play audio">🔊</button>
      <p style="margin:12px 0 0">Tap to hear the Russian phrase.</p>
    </section>
    <div style="height:14px"></div>
    <div class="answers">
      ${step.answers.map((answer) => `<button class="answer russian" data-answer="${answer}">${answer}</button>`).join('')}
    </div>
    <div id="feedback"></div>
  `;
  document.getElementById('listenButton').addEventListener('click', () => speakRussian(step.speech));
  setTimeout(() => speakRussian(step.speech), 300);
  container.querySelectorAll('[data-answer]').forEach((button) => {
    button.addEventListener('click', () => handleChoice(button, step));
  });
}

function handleChoice(button, step) {
  if (lessonSession.locked) return;
  const selected = button.dataset.answer;
  const correct = selected === step.correct;
  if (!correct) {
    button.classList.add('wrong');
    navigator.vibrate?.(35);
    return;
  }

  lessonSession.locked = true;
  button.classList.add('correct');
  const feedback = document.getElementById('feedback');
  feedback.innerHTML = `
    <div class="feedback">
      <strong>Correct.</strong>
      ${step.translation ? `<span>${step.translation}</span>` : '<span>Nice work.</span>'}
    </div>
    <div style="height:12px"></div>
    <button id="nextButton" class="primary">Continue</button>
  `;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderBuildStep(container, step) {
  lessonSession.selected = [];
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <div id="sentenceZone" class="sentence-zone"><span style="color:var(--muted)">Tap the words below</span></div>
    <div id="wordBank" class="word-bank">
      ${step.chips.map((chip, index) => `<button class="chip russian" data-chip="${chip}" data-index="${index}">${chip}</button>`).join('')}
    </div>
    <div style="height:18px"></div>
    <button id="checkSentence" class="primary">Check answer</button>
    <div id="feedback"></div>
  `;

  const zone = document.getElementById('sentenceZone');
  container.querySelectorAll('[data-chip]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('used')) return;
      lessonSession.selected.push(button.dataset.chip);
      button.classList.add('used');
      zone.innerHTML = lessonSession.selected.map((word) => `<button class="chip russian" disabled>${word}</button>`).join('');
    });
  });

  document.getElementById('checkSentence').addEventListener('click', () => {
    const correct = JSON.stringify(lessonSession.selected) === JSON.stringify(step.correct);
    const feedback = document.getElementById('feedback');
    if (!correct) {
      feedback.innerHTML = `<div class="feedback"><strong>Not quite.</strong><span>Try: «Привет Анна».</span></div>`;
      setTimeout(() => {
        lessonSession.selected = [];
        renderLesson();
      }, 900);
      return;
    }
    feedback.innerHTML = `
      <div class="feedback"><strong>Correct.</strong><span class="russian">Привет, Анна!</span></div>
      <div style="height:12px"></div>
      <button id="nextButton" class="primary">Continue</button>
    `;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  });
}

function nextLessonStep() {
  lessonSession.locked = false;
  if (lessonSession.step < lessonOne.length - 1) {
    lessonSession.step += 1;
    renderLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  completeLesson();
}

function completeLesson() {
  if (!state.completedLessons.includes(1)) {
    state.completedLessons.push(1);
    state.xp += 50;
  }
  saveState();
  lessonSession = null;
  app.innerHTML = `
    <section class="onboarding" style="text-align:center">
      <div class="onboarding-art" style="font-size:64px">✓</div>
      <div class="eyebrow">Lesson complete</div>
      <h1 class="russian">Отлично!</h1>
      <p>You finished your first Russian lesson and earned <strong style="color:var(--text)">50 XP</strong>.</p>
      <section class="card" style="margin-bottom:14px">
        <div class="prompt">YOU CAN NOW SAY</div>
        <h2 class="russian">Привет! · Пока!</h2>
        <p>Hi! · Bye!</p>
      </section>
      <button id="finishButton" class="primary">Back to home</button>
    </section>
  `;
  backButton.classList.add('hidden');
  document.getElementById('finishButton').addEventListener('click', () => navigate('home'));
}

function speakRussian(text) {
  if (!('speechSynthesis' in window)) {
    alert('Audio is not supported by this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.78;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function bindSpeechButtons() {
  document.querySelectorAll('.speak').forEach((button) => {
    button.addEventListener('click', () => speakRussian(button.dataset.speech));
  });
}

bottomNav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-nav]');
  if (button) navigate(button.dataset.nav);
});

backButton.addEventListener('click', () => {
  lessonSession = null;
  navigate('course');
});

brandButton.addEventListener('click', () => {
  if (state.onboarded && currentView !== 'lesson') navigate('home');
});

streakCount.textContent = state.streak;
navigate(currentView);
