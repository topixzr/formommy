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
};

const lessons = [
  {
    id: 1,
    title: 'Привет!',
    subtitle: 'Hello, goodbye & your first Russian phrases',
    minutes: 8,
    xp: 50,
    vocab: [
      { russian: 'Привет!', translit: 'Privet!', english: 'Hi! / Hello!' },
      { russian: 'Здравствуйте!', translit: 'Zdravstvuyte!', english: 'Hello! (polite/formal)' },
      { russian: 'Пока!', translit: 'Poka!', english: 'Bye! / See you!' },
    ],
    steps: [
      { type: 'learn', prompt: 'Your first Russian word', russian: 'Привет!', translit: 'Privet!', translation: 'Hi! / Hello!', note: 'Use «Привет!» with friends, family, and people you know. It is informal, like “Hi!” in English.' },
      { type: 'learn', prompt: 'A polite greeting', russian: 'Здравствуйте!', translit: 'Zdravstvuyte!', translation: 'Hello!', note: 'Use this with strangers, older people, or in formal situations. The spelling looks intimidating; for now, focus on recognizing it and hearing it.' },
      { type: 'choice', prompt: 'Choose the Russian word for “Hi!”', answers: ['Спасибо', 'Привет', 'Пока'], correct: 'Привет' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'Пока', answers: ['Привет', 'Пока', 'Спасибо'], correct: 'Пока', translation: 'Bye! / See you!' },
      { type: 'build', prompt: 'Build: “Hello, Anna!”', chips: ['Анна', 'Привет'], correct: ['Привет', 'Анна'], answerText: 'Привет, Анна!' },
      { type: 'choice', prompt: 'You are leaving a friend’s house. What do you say?', answers: ['Пока!', 'Здравствуйте!', 'Привет!'], correct: 'Пока!' },
    ],
  },
  {
    id: 2,
    title: 'Меня зовут…',
    subtitle: 'Introduce yourself',
    minutes: 9,
    xp: 60,
    vocab: [
      { russian: 'Меня зовут…', translit: 'Menya zovut…', english: 'My name is…' },
      { russian: 'Как тебя зовут?', translit: 'Kak tebya zovut?', english: 'What is your name? (informal)' },
      { russian: 'Очень приятно!', translit: 'Ochen priyatno!', english: 'Nice to meet you!' },
    ],
    steps: [
      { type: 'learn', prompt: 'Say your name', russian: 'Меня зовут Сара.', translit: 'Menya zovut Sara.', translation: 'My name is Sarah.', note: 'Russian does not literally say “my name is.” «Меня зовут…» is closer to “They call me…”. Learn it as one useful phrase.' },
      { type: 'learn', prompt: 'Ask someone their name', russian: 'Как тебя зовут?', translit: 'Kak tebya zovut?', translation: 'What is your name?', note: 'This version is informal and works well with friends and people around your age. Later we will add the polite form.' },
      { type: 'choice', prompt: 'Which phrase means “My name is Sarah”?', answers: ['Меня зовут Сара.', 'Как тебя зовут?', 'Пока, Сара!'], correct: 'Меня зовут Сара.' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'Как тебя зовут?', answers: ['Как тебя зовут?', 'Меня зовут Сара.', 'Очень приятно!'], correct: 'Как тебя зовут?', translation: 'What is your name?' },
      { type: 'build', prompt: 'Build: “My name is Sarah.”', chips: ['Сара', 'зовут', 'Меня'], correct: ['Меня', 'зовут', 'Сара'], answerText: 'Меня зовут Сара.' },
      { type: 'learn', prompt: 'After introductions', russian: 'Очень приятно!', translit: 'Ochen priyatno!', translation: 'Nice to meet you!', note: 'A common phrase after someone introduces themselves. You can use it exactly like “Nice to meet you.”' },
      { type: 'choice', prompt: 'Someone says: «Меня зовут Анна». What is a natural response?', answers: ['Очень приятно!', 'Пока!', 'Нет!'], correct: 'Очень приятно!' },
    ],
  },
  {
    id: 3,
    title: 'Да или нет?',
    subtitle: 'Yes, no, please & thank you',
    minutes: 8,
    xp: 60,
    vocab: [
      { russian: 'Да', translit: 'Da', english: 'Yes' },
      { russian: 'Нет', translit: 'Net', english: 'No' },
      { russian: 'Спасибо', translit: 'Spasibo', english: 'Thank you' },
      { russian: 'Пожалуйста', translit: 'Pozhaluysta', english: 'Please / You’re welcome' },
    ],
    steps: [
      { type: 'learn', prompt: 'Two essential answers', russian: 'Да · Нет', translit: 'Da · Net', translation: 'Yes · No', note: 'These are high-frequency words. Notice that «нет» sounds close to “nyet,” but the Russian vowel is shorter and cleaner.', speech: 'Да. Нет.' },
      { type: 'learn', prompt: 'Say thank you', russian: 'Спасибо!', translit: 'Spasibo!', translation: 'Thank you!', note: '«Спасибо» works in almost any everyday situation, from a coffee shop to talking with family.' },
      { type: 'learn', prompt: 'One word, two jobs', russian: 'Пожалуйста.', translit: 'Pozhaluysta.', translation: 'Please. / You’re welcome.', note: 'Russian uses «пожалуйста» both when asking politely and when replying to «спасибо». Context tells you which meaning is intended.' },
      { type: 'choice', prompt: 'Someone gives you coffee. What do you say?', answers: ['Спасибо!', 'Нет!', 'Пока!'], correct: 'Спасибо!' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'Пожалуйста', answers: ['Спасибо', 'Пожалуйста', 'Здравствуйте'], correct: 'Пожалуйста', translation: 'Please / You’re welcome' },
      { type: 'build', prompt: 'Build: “Yes, please.”', chips: ['пожалуйста', 'Да'], correct: ['Да', 'пожалуйста'], answerText: 'Да, пожалуйста.' },
      { type: 'choice', prompt: 'Someone says «Спасибо!». Which reply fits?', answers: ['Пожалуйста!', 'Привет!', 'Нет!'], correct: 'Пожалуйста!' },
    ],
  },
  {
    id: 4,
    title: 'Это кто?',
    subtitle: 'People, family & simple questions',
    minutes: 10,
    xp: 70,
    vocab: [
      { russian: 'Это кто?', translit: 'Eto kto?', english: 'Who is this?' },
      { russian: 'Это мама.', translit: 'Eto mama.', english: 'This is mom.' },
      { russian: 'Это папа.', translit: 'Eto papa.', english: 'This is dad.' },
      { russian: 'Это собака.', translit: 'Eto sobaka.', english: 'This is a dog.' },
    ],
    steps: [
      { type: 'learn', prompt: 'Ask who someone is', russian: 'Это кто?', translit: 'Eto kto?', translation: 'Who is this?', note: '«Это» is a very useful word meaning “this is / that is.” «Кто?» means “who?”. Together: «Это кто?»' },
      { type: 'learn', prompt: 'Answer simply', russian: 'Это мама.', translit: 'Eto mama.', translation: 'This is mom.', note: 'Russian does not need a separate word for “is” here. «Это мама» literally works as “This — mom.”' },
      { type: 'choice', prompt: 'Which phrase means “This is dad”?', answers: ['Это папа.', 'Это кто?', 'Это мама.'], correct: 'Это папа.' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'Это собака.', answers: ['Это мама.', 'Это папа.', 'Это собака.'], correct: 'Это собака.', translation: 'This is a dog.' },
      { type: 'build', prompt: 'Build: “Who is this?”', chips: ['кто', 'Это'], correct: ['Это', 'кто'], answerText: 'Это кто?' },
      { type: 'learn', prompt: 'A useful home phrase', russian: 'Это моя семья.', translit: 'Eto moya semya.', translation: 'This is my family.', note: 'You do not need to learn all gender rules yet. For now, remember «моя семья» as a chunk meaning “my family.”' },
      { type: 'choice', prompt: 'You show someone a family photo. What can you say?', answers: ['Это моя семья.', 'Пожалуйста.', 'Как тебя зовут?'], correct: 'Это моя семья.' },
    ],
  },
  {
    id: 5,
    title: 'У меня есть…',
    subtitle: 'Talk about what you have',
    minutes: 11,
    xp: 80,
    vocab: [
      { russian: 'У меня есть…', translit: 'U menya est…', english: 'I have…' },
      { russian: 'У меня есть собака.', translit: 'U menya est sobaka.', english: 'I have a dog.' },
      { russian: 'У меня есть машина.', translit: 'U menya est mashina.', english: 'I have a car.' },
      { russian: 'У меня нет…', translit: 'U menya net…', english: 'I don’t have…' },
    ],
    steps: [
      { type: 'learn', prompt: 'Say “I have…”', russian: 'У меня есть…', translit: 'U menya est…', translation: 'I have…', note: 'Russian usually expresses possession with «у меня есть». Literally it is closer to “at me there is.” Treat the whole phrase as one pattern.' },
      { type: 'learn', prompt: 'Use the pattern', russian: 'У меня есть собака.', translit: 'U menya est sobaka.', translation: 'I have a dog.', note: 'Keep the beginning «У меня есть…» and swap in the thing you have.' },
      { type: 'choice', prompt: 'Which sentence means “I have a car”?', answers: ['У меня есть машина.', 'Это машина?', 'У меня нет машины.'], correct: 'У меня есть машина.' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'У меня есть собака.', answers: ['У меня есть собака.', 'Это собака.', 'У меня есть машина.'], correct: 'У меня есть собака.', translation: 'I have a dog.' },
      { type: 'build', prompt: 'Build: “I have a dog.”', chips: ['собака', 'есть', 'У меня'], correct: ['У меня', 'есть', 'собака'], answerText: 'У меня есть собака.' },
      { type: 'learn', prompt: 'Say you do not have something', russian: 'У меня нет…', translit: 'U menya net…', translation: 'I don’t have…', note: 'For now, learn «У меня нет…» as the negative partner of «У меня есть…». The noun form after «нет» changes; we will teach that grammar gradually.' },
      { type: 'choice', prompt: 'Which beginning means “I don’t have…”?', answers: ['У меня нет…', 'У меня есть…', 'Это кто?'], correct: 'У меня нет…' },
    ],
  },
];

let state = loadState();
let currentView = state.onboarded ? 'home' : 'onboarding';
let lessonSession = null;
let reviewSession = null;

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return { ...defaultState, ...stored };
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
        <span>🇷🇺 A1 beginner</span><span>🔊 Russian audio</span><span>🧠 Vocabulary review</span><span>💬 Real-life phrases</span>
      </div>
      <button id="startButton" class="primary">Start learning Russian</button>
    </section>`;
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
  const firstIncomplete = lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
  const targetLesson = firstIncomplete || lessons[0];
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Russian A1</div>
      <h1>${done === lessons.length ? 'Молодец!' : 'Добрый день.'}</h1>
      <p>${done === lessons.length ? 'You completed the first five lessons. Review them and keep using Russian in real life.' : 'One short lesson today is enough. Keep Russian practical and repeat what matters.'}</p>
    </section>
    <section class="card glow-card">
      <div class="eyebrow">${done === lessons.length ? 'Module complete' : 'Continue learning'}</div>
      <h2 class="russian">${done === lessons.length ? 'Первые разговоры' : targetLesson.title}</h2>
      <p>${done === lessons.length ? '5 lessons finished · your first practical Russian foundation' : targetLesson.subtitle}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${coursePercent}%"></div></div>
      <div class="progress-meta"><span>${done} of ${lessons.length} lessons</span><span>${coursePercent}%</span></div>
      <div style="height:16px"></div>
      <button id="continueButton" class="primary">${done === lessons.length ? 'Review vocabulary' : `${done === 0 ? 'Start Lesson 1' : 'Continue course'} · ${targetLesson.minutes} min`}</button>
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
    </section>`;
  document.getElementById('continueButton').addEventListener('click', () => {
    if (done === lessons.length) navigate('review');
    else startLesson(targetLesson.id);
  });
  bindSpeechButtons();
}

function renderCourse() {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Course path</div><h1>Russian A1</h1><p>Module 1 · First conversations · 5 lessons</p></section>
    <div class="lesson-list">
      ${lessons.map((lesson) => {
        const done = state.completedLessons.includes(lesson.id);
        const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1);
        return `<button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
          <div class="lesson-number">${done ? '✓' : lesson.id}</div>
          <div><div class="lesson-title russian">${lesson.title}</div><div class="lesson-subtitle">${lesson.subtitle} · ${lesson.minutes} min · ${lesson.xp} XP</div></div>
          <div>${!unlocked ? '🔒' : '›'}</div>
        </button>`;
      }).join('')}
    </div>`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => startLesson(Number(button.dataset.lesson)));
  });
}

function learnedVocabulary() {
  return lessons.filter((lesson) => state.completedLessons.includes(lesson.id)).flatMap((lesson) => lesson.vocab.map((word) => ({ ...word, lessonId: lesson.id })));
}

function renderReview() {
  const words = learnedVocabulary();
  if (words.length === 0) {
    app.innerHTML = `
      <section class="hero"><div class="eyebrow">Vocabulary</div><h1>Daily review</h1><p>Complete Lesson 1 and your first review cards will appear here.</p></section>
      <section class="card empty-state"><div class="empty-icon">🧠</div><h2>Learn a few words first</h2><p>Your review deck grows automatically as you finish lessons.</p><button id="reviewLessonButton" class="primary">Open Lesson 1</button></section>`;
    document.getElementById('reviewLessonButton').addEventListener('click', () => startLesson(1));
    return;
  }
  if (!reviewSession || reviewSession.baseLength !== words.length) {
    reviewSession = { words: [...words].sort(() => Math.random() - 0.5), index: 0, revealed: false, baseLength: words.length };
  }
  renderReviewCard();
}

function renderReviewCard() {
  const word = reviewSession.words[reviewSession.index];
  const total = reviewSession.words.length;
  const percent = Math.round(((reviewSession.index + 1) / total) * 100);
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Vocabulary review</div><h1>Remember it.</h1><p>${reviewSession.baseLength} learned words and phrases are currently in your deck.</p></section>
    <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
    <div class="progress-meta"><span>Card ${reviewSession.index + 1}/${total}</span><span>${percent}%</span></div>
    <div style="height:18px"></div>
    <section class="card word-card">
      <div class="prompt">WHAT DOES THIS MEAN?</div>
      <div class="big-russian russian" style="font-size:clamp(38px,11vw,62px)">${word.russian}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(word.russian)}" aria-label="Hear Russian">🔊</button>
      ${reviewSession.revealed ? `<div class="translit">${word.translit}</div><div class="translation">${word.english}</div>` : ''}
    </section>
    <div style="height:14px"></div>
    ${reviewSession.revealed ? `<div class="button-row"><button class="secondary" data-review="again">Again</button><button class="primary" data-review="good">Good</button></div>` : '<button id="revealButton" class="primary">Show answer</button>'}`;
  bindSpeechButtons();
  if (!reviewSession.revealed) {
    document.getElementById('revealButton').addEventListener('click', () => { reviewSession.revealed = true; renderReviewCard(); });
  } else {
    app.querySelectorAll('[data-review]').forEach((button) => button.addEventListener('click', () => advanceReview(button.dataset.review)));
  }
}

function advanceReview(rating) {
  if (rating === 'again') reviewSession.words.push(reviewSession.words[reviewSession.index]);
  reviewSession.index += 1;
  reviewSession.revealed = false;
  if (reviewSession.index >= reviewSession.words.length) {
    app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:64px">✓</div><div class="eyebrow">Review complete</div><h1 class="russian">Хорошо!</h1><p>You reviewed your current Russian vocabulary.</p><button id="finishReviewButton" class="primary">Back to home</button></section>`;
    document.getElementById('finishReviewButton').addEventListener('click', () => { reviewSession = null; navigate('home'); });
    return;
  }
  renderReviewCard();
}

function renderTutor() {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">AI Tutor · next stage</div><h1>Ask about Russian.</h1><p>The five-lesson course is live. The AI tutor will be connected later through a secure backend so no API key is exposed in this public site.</p></section>
    <section class="card"><div class="prompt">EXAMPLE QUESTION</div><h3>Why does Russian use «у меня» for “I have”?</h3><p>The future tutor will answer in simple English, stay at A1 level, and use words already learned in the course.</p><button class="secondary" disabled>✦ AI Tutor coming next</button></section>`;
}

function startLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;
  const unlocked = id === 1 || state.completedLessons.includes(id - 1) || state.completedLessons.includes(id);
  if (!unlocked) { alert('Complete the previous lesson first.'); return; }
  lessonSession = { lessonId: id, step: 0, selected: [], locked: false };
  navigate('lesson');
}

function currentLesson() {
  return lessons.find((lesson) => lesson.id === lessonSession.lessonId);
}

function renderLesson() {
  if (!lessonSession) return navigate('course');
  const lesson = currentLesson();
  const step = lesson.steps[lessonSession.step];
  const percent = Math.round(((lessonSession.step + 1) / lesson.steps.length) * 100);
  app.innerHTML = `<section class="lesson-stage"><div class="lesson-progress"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><div class="progress-meta"><span>Lesson ${lesson.id} · ${lesson.title}</span><span>${lessonSession.step + 1}/${lesson.steps.length}</span></div></div><div id="lessonContent"></div></section>`;
  const container = document.getElementById('lessonContent');
  if (step.type === 'learn') renderLearnStep(container, step);
  if (step.type === 'choice') renderChoiceStep(container, step);
  if (step.type === 'listen') renderListenStep(container, step);
  if (step.type === 'build') renderBuildStep(container, step);
}

function renderLearnStep(container, step) {
  const speech = step.speech || step.russian;
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card word-card"><div class="big-russian russian">${step.russian}</div><div class="translit">${step.translit}</div><div class="translation">${step.translation}</div><button class="audio-button speak" data-speech="${escapeAttribute(speech)}" aria-label="Hear Russian">🔊</button><div class="note">${step.note}</div></section><div style="height:14px"></div><button id="nextButton" class="primary">Continue</button>`;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderChoiceStep(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><div class="answers">${step.answers.map((answer) => `<button class="answer russian" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="feedback"></div>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function renderListenStep(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card word-card"><button id="listenButton" class="audio-button" style="width:76px;height:76px;font-size:28px" aria-label="Play audio">🔊</button><p style="margin:12px 0 0">Tap to hear the Russian phrase.</p></section><div style="height:14px"></div><div class="answers">${step.answers.map((answer) => `<button class="answer russian" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="feedback"></div>`;
  document.getElementById('listenButton').addEventListener('click', () => speakRussian(step.speech));
  setTimeout(() => speakRussian(step.speech), 300);
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function handleChoice(button, step) {
  if (lessonSession.locked) return;
  const correct = button.dataset.answer === step.correct;
  if (!correct) { button.classList.add('wrong'); navigator.vibrate?.(35); return; }
  lessonSession.locked = true;
  button.classList.add('correct');
  document.getElementById('feedback').innerHTML = `<div class="feedback"><strong>Correct.</strong>${step.translation ? `<span>${step.translation}</span>` : '<span>Good.</span>'}</div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderBuildStep(container, step) {
  lessonSession.selected = [];
  container.innerHTML = `<div class="prompt">${step.prompt}</div><div id="sentenceZone" class="sentence-zone"><span style="color:var(--muted)">Tap the words below</span></div><div id="wordBank" class="word-bank">${step.chips.map((chip, index) => `<button class="chip russian" data-chip="${escapeAttribute(chip)}" data-index="${index}">${chip}</button>`).join('')}</div><div style="height:18px"></div><button id="checkSentence" class="primary">Check answer</button><div id="feedback"></div>`;
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
      feedback.innerHTML = '<div class="feedback"><strong>Not quite.</strong><span>Try again.</span></div>';
      setTimeout(() => { lessonSession.selected = []; renderLesson(); }, 800);
      return;
    }
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  });
}

function nextLessonStep() {
  const lesson = currentLesson();
  lessonSession.locked = false;
  if (lessonSession.step < lesson.steps.length - 1) {
    lessonSession.step += 1;
    renderLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  completeLesson();
}

function completeLesson() {
  const lesson = currentLesson();
  const firstCompletion = !state.completedLessons.includes(lesson.id);
  if (firstCompletion) {
    state.completedLessons.push(lesson.id);
    state.completedLessons.sort((a, b) => a - b);
    state.xp += lesson.xp;
  }
  saveState();
  lessonSession = null;
  const nextLesson = lessons.find((item) => item.id === lesson.id + 1);
  app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:64px">✓</div><div class="eyebrow">Lesson ${lesson.id} complete</div><h1 class="russian">${lesson.id === 5 ? 'Молодец!' : 'Отлично!'}</h1><p>${firstCompletion ? `You earned <strong style="color:var(--text)">${lesson.xp} XP</strong>.` : 'Lesson reviewed.'}</p><section class="card" style="margin-bottom:14px"><div class="prompt">YOU LEARNED</div><h2 class="russian">${lesson.vocab.slice(0, 2).map((word) => word.russian).join(' · ')}</h2><p>${lesson.vocab.slice(0, 2).map((word) => word.english).join(' · ')}</p></section>${nextLesson ? `<div class="button-row"><button id="homeAfterLesson" class="secondary">Home</button><button id="nextLessonButton" class="primary">Lesson ${nextLesson.id}</button></div>` : '<button id="homeAfterLesson" class="primary">Finish module</button>'}</section>`;
  backButton.classList.add('hidden');
  document.getElementById('homeAfterLesson').addEventListener('click', () => navigate('home'));
  if (nextLesson) document.getElementById('nextLessonButton').addEventListener('click', () => startLesson(nextLesson.id));
}

function speakRussian(text) {
  if (!('speechSynthesis' in window)) { alert('Audio is not supported by this browser.'); return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.78;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function bindSpeechButtons() {
  document.querySelectorAll('.speak').forEach((button) => button.addEventListener('click', () => speakRussian(button.dataset.speech)));
}

function escapeAttribute(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

bottomNav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-nav]');
  if (button) navigate(button.dataset.nav);
});
backButton.addEventListener('click', () => { lessonSession = null; navigate('course'); });
brandButton.addEventListener('click', () => { if (state.onboarded && currentView !== 'lesson') navigate('home'); });
streakCount.textContent = state.streak;
navigate(currentView);
