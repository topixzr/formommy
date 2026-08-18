const app = document.getElementById('app');
const bottomNav = document.getElementById('bottomNav');
const backButton = document.getElementById('backButton');
const streakCount = document.getElementById('streakCount');
const brandButton = document.getElementById('brandButton');

const STORAGE_KEY = 'formommy-state-a2-v1';

const defaultState = {
  onboarded: false,
  completedLessons: [],
  xp: 0,
  streak: 1,
  lastVisit: null,
  practiceCompleted: false,
};

const lessons = [
  {
    id: 1,
    title: 'Что ты делала вчера?',
    subtitle: 'Past tense, sequence words & talking about yesterday',
    minutes: 12,
    xp: 90,
    level: 'A2',
    vocab: [
      { russian: 'вчера', translit: 'vchera', english: 'yesterday' },
      { russian: 'сначала', translit: 'snachala', english: 'at first / first' },
      { russian: 'потом', translit: 'potom', english: 'then / afterwards' },
      { russian: 'вечером', translit: 'vecherom', english: 'in the evening' },
      { russian: 'Я работала.', translit: 'Ya rabotala.', english: 'I worked. (female speaker)' },
      { russian: 'Я ходила в магазин.', translit: 'Ya khodila v magazin.', english: 'I went to the store. (female speaker)' },
    ],
    steps: [
      { type: 'learn', prompt: 'A2 starts with real stories', russian: 'Что ты делала вчера?', translit: 'Chto ty delala vchera?', translation: 'What did you do yesterday?', note: 'For a female speaker, many past-tense verbs end in -ла: делала, работала, ходила. For a male speaker, they usually end in -л: делал, работал, ходил.' },
      { type: 'learn', prompt: 'Build a simple timeline', russian: 'Сначала я работала, потом ходила в магазин.', translit: 'Snachala ya rabotala, potom khodila v magazin.', translation: 'First I worked, then I went to the store.', note: 'At A2, the goal is not isolated sentences. Use connectors like «сначала» and «потом» to make a short story.' },
      { type: 'choice', prompt: 'A woman says “I worked yesterday.” Which sentence is correct?', answers: ['Вчера я работала.', 'Вчера я работаю.', 'Завтра я работала.'], correct: 'Вчера я работала.' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'Вечером я была дома.', answers: ['Вечером я была дома.', 'Утром я буду дома.', 'Вчера я была на работе.'], correct: 'Вечером я была дома.', translation: 'In the evening I was at home.' },
      { type: 'build', prompt: 'Build: “Then I went to the store.”', chips: ['в магазин', 'Потом', 'я ходила'], correct: ['Потом', 'я ходила', 'в магазин'], answerText: 'Потом я ходила в магазин.' },
      { type: 'type', prompt: 'Type the Russian word for “yesterday”', placeholder: 'в…', answers: ['вчера'], hint: 'в + ч + е + р + а', answerText: 'вчера' },
      { type: 'choice', prompt: 'Which sentence sounds like a connected A2 story?', answers: ['Сначала я работала, потом отдыхала.', 'Я работа. Я отдых.', 'Работала? Да.'], correct: 'Сначала я работала, потом отдыхала.' },
    ],
  },
  {
    id: 2,
    title: 'Что будешь делать завтра?',
    subtitle: 'Future plans, intentions & reasons',
    minutes: 13,
    xp: 100,
    level: 'A2',
    vocab: [
      { russian: 'завтра', translit: 'zavtra', english: 'tomorrow' },
      { russian: 'Я буду работать.', translit: 'Ya budu rabotat.', english: 'I will work.' },
      { russian: 'Я хочу отдохнуть.', translit: 'Ya khochu otdokhnut.', english: 'I want to rest.' },
      { russian: 'Я собираюсь…', translit: 'Ya sobirayus…', english: 'I am planning / going to…' },
      { russian: 'потому что', translit: 'potomu chto', english: 'because' },
    ],
    steps: [
      { type: 'learn', prompt: 'Talk about tomorrow', russian: 'Завтра я буду работать.', translit: 'Zavtra ya budu rabotat.', translation: 'Tomorrow I will work.', note: 'A very useful future pattern is «буду + infinitive»: буду работать, буду готовить, буду отдыхать.' },
      { type: 'learn', prompt: 'Add intention', russian: 'Я собираюсь встретиться с друзьями.', translit: 'Ya sobirayus vstretitsya s druzyami.', translation: 'I am going to meet friends.', note: '«Я собираюсь…» is useful for plans and intentions. It is close to English “I’m going to…” in many everyday situations.' },
      { type: 'learn', prompt: 'Explain why', russian: 'Я хочу отдохнуть, потому что я устала.', translit: 'Ya khochu otdokhnut, potomu chto ya ustala.', translation: 'I want to rest because I am tired.', note: '«Потому что» lets you move beyond short A1 answers and explain a reason — a core A2 skill.' },
      { type: 'choice', prompt: 'Which sentence means “Tomorrow I will cook”?', answers: ['Завтра я буду готовить.', 'Вчера я готовила.', 'Сейчас я готовила.'], correct: 'Завтра я буду готовить.' },
      { type: 'listen', prompt: 'Listen and choose the plan', speech: 'Завтра я хочу встретиться с друзьями.', answers: ['Завтра я хочу встретиться с друзьями.', 'Вчера я встретилась с друзьями.', 'Я не знаю этих людей.'], correct: 'Завтра я хочу встретиться с друзьями.', translation: 'Tomorrow I want to meet friends.' },
      { type: 'build', prompt: 'Build: “I want to rest because I am tired.”', chips: ['потому что я устала', 'Я хочу отдохнуть'], correct: ['Я хочу отдохнуть', 'потому что я устала'], answerText: 'Я хочу отдохнуть, потому что я устала.' },
      { type: 'type', prompt: 'Type “because” in Russian', placeholder: 'п…', answers: ['потому что'], hint: 'потому + что', answerText: 'потому что' },
    ],
  },
  {
    id: 3,
    title: 'Куда? Где? С кем?',
    subtitle: 'Movement, location & everyday case patterns',
    minutes: 14,
    xp: 110,
    level: 'A2',
    vocab: [
      { russian: 'Я иду в магазин.', translit: 'Ya idu v magazin.', english: 'I am going to the store.' },
      { russian: 'Я в магазине.', translit: 'Ya v magazine.', english: 'I am in the store.' },
      { russian: 'Я еду к другу.', translit: 'Ya edu k drugu.', english: 'I am going to a friend’s place.' },
      { russian: 'Я гуляю с друзьями.', translit: 'Ya gulyayu s druzyami.', english: 'I am walking / hanging out with friends.' },
      { russian: 'после работы', translit: 'posle raboty', english: 'after work' },
    ],
    steps: [
      { type: 'learn', prompt: 'Destination vs location', russian: 'Я иду в магазин. → Я в магазине.', translit: 'Ya idu v magazin. → Ya v magazine.', translation: 'I’m going to the store. → I’m in the store.', note: 'Russian changes the noun ending depending on meaning. For now, notice the useful pair: «в магазин» = to the store, «в магазине» = in the store.' },
      { type: 'learn', prompt: 'Going to a person', russian: 'После работы я еду к другу.', translit: 'Posle raboty ya edu k drugu.', translation: 'After work I’m going to a friend’s place.', note: 'With people, «к + dative» often expresses movement toward someone: к другу, к маме, к врачу.' },
      { type: 'learn', prompt: 'Doing something with people', russian: 'Я гуляю с друзьями.', translit: 'Ya gulyayu s druzyami.', translation: 'I’m hanging out with friends.', note: '«С + instrumental» expresses “with”: с мужем, с женой, с друзьями.' },
      { type: 'choice', prompt: 'You are already inside the store. Which phrase fits?', answers: ['Я в магазине.', 'Я иду в магазин.', 'Я из магазина.'], correct: 'Я в магазине.' },
      { type: 'listen', prompt: 'Listen and choose the meaning', speech: 'После работы я еду к маме.', answers: ['After work I’m going to my mom.', 'Before work I’m calling my mom.', 'I work with my mom.'], correct: 'After work I’m going to my mom.', translation: 'После работы я еду к маме.' },
      { type: 'build', prompt: 'Build: “I’m hanging out with friends.”', chips: ['с друзьями', 'Я гуляю'], correct: ['Я гуляю', 'с друзьями'], answerText: 'Я гуляю с друзьями.' },
      { type: 'choice', prompt: 'Which pair correctly contrasts destination and location?', answers: ['в магазин → в магазине', 'в магазине → в магазином', 'к магазин → с магазине'], correct: 'в магазин → в магазине' },
    ],
  },
  {
    id: 4,
    title: 'Мне нравится, но…',
    subtitle: 'Opinions, comparisons & longer answers',
    minutes: 14,
    xp: 120,
    level: 'A2+',
    vocab: [
      { russian: 'Мне нравится…', translit: 'Mne nravitsya…', english: 'I like…' },
      { russian: 'Я думаю, что…', translit: 'Ya dumayu, chto…', english: 'I think that…' },
      { russian: 'лучше, чем', translit: 'luchshe, chem', english: 'better than' },
      { russian: 'но', translit: 'no', english: 'but' },
      { russian: 'поэтому', translit: 'poetomu', english: 'therefore / so' },
    ],
    steps: [
      { type: 'learn', prompt: 'Give an opinion', russian: 'Мне нравится этот город.', translit: 'Mne nravitsya etot gorod.', translation: 'I like this city.', note: '«Мне нравится…» literally works more like “this is pleasing to me.” It is one of the most useful opinion patterns in Russian.' },
      { type: 'learn', prompt: 'Compare two things', russian: 'Лето лучше, чем зима.', translit: 'Leto luchshe, chem zima.', translation: 'Summer is better than winter.', note: 'Use «лучше, чем…» for “better than.” You can also use «хуже, чем…» for “worse than.”' },
      { type: 'learn', prompt: 'Make the answer longer', russian: 'Я думаю, что здесь красиво, но дорого.', translit: 'Ya dumayu, chto zdes krasivo, no dorogo.', translation: 'I think it is beautiful here, but expensive.', note: 'This is the bridge toward B1: opinion + «что» + contrast. Instead of one sentence, give a connected thought.' },
      { type: 'choice', prompt: 'Which phrase means “I think that…”?', answers: ['Я думаю, что…', 'Мне нужно…', 'Я была…'], correct: 'Я думаю, что…' },
      { type: 'listen', prompt: 'Listen and choose the correct meaning', speech: 'Мне нравится эта машина, но она дорогая.', answers: ['I like this car, but it is expensive.', 'I bought this car because it is cheap.', 'This car is better than mine.'], correct: 'I like this car, but it is expensive.', translation: 'Мне нравится эта машина, но она дорогая.' },
      { type: 'build', prompt: 'Build: “Summer is better than winter.”', chips: ['чем зима', 'Лето лучше'], correct: ['Лето лучше', 'чем зима'], answerText: 'Лето лучше, чем зима.' },
      { type: 'type', prompt: 'Type the Russian connector meaning “therefore / so”', placeholder: 'п…', answers: ['поэтому'], hint: 'поэтому', answerText: 'поэтому' },
    ],
  },
  {
    id: 5,
    title: 'Расскажи подробнее',
    subtitle: 'Storytelling connectors — A2 to B1 bridge',
    minutes: 16,
    xp: 140,
    level: 'A2 → B1',
    vocab: [
      { russian: 'когда', translit: 'kogda', english: 'when' },
      { russian: 'если', translit: 'yesli', english: 'if' },
      { russian: 'поэтому', translit: 'poetomu', english: 'so / therefore' },
      { russian: 'хотя', translit: 'khotya', english: 'although' },
      { russian: 'Сначала…, потом…, поэтому…', translit: 'Snachala…, potom…, poetomu…', english: 'First…, then…, so…' },
    ],
    steps: [
      { type: 'learn', prompt: 'Move from sentences to a story', russian: 'Сначала мы были дома, потом поехали в центр.', translit: 'Snachala my byli doma, potom poekhali v tsentr.', translation: 'First we were at home, then we went downtown.', note: 'At the upper end of A2, you should be able to connect events in sequence and tell a short story about familiar topics.' },
      { type: 'learn', prompt: 'Add cause and result', russian: 'Было холодно, поэтому мы вернулись домой.', translit: 'Bylo kholodno, poetomu my vernulis domoy.', translation: 'It was cold, so we returned home.', note: '«Поэтому» introduces a result. Compare: «потому что» = because; «поэтому» = so / therefore.' },
      { type: 'learn', prompt: 'Start a B1-style thought', russian: 'Когда у меня есть время, я люблю гулять.', translit: 'Kogda u menya est vremya, ya lyublyu gulyat.', translation: 'When I have time, I like to go for walks.', note: 'Clauses with «когда», «если», «потому что», «хотя» are the bridge from simple A2 speech toward connected B1 speech.' },
      { type: 'choice', prompt: 'Which connector expresses a result?', answers: ['поэтому', 'потому что', 'когда'], correct: 'поэтому' },
      { type: 'listen', prompt: 'Listen and choose what happened', speech: 'Сначала мы выпили кофе, потом пошли гулять.', answers: ['First we had coffee, then went for a walk.', 'We went home because the coffee was bad.', 'Before coffee we went to work.'], correct: 'First we had coffee, then went for a walk.', translation: 'Сначала мы выпили кофе, потом пошли гулять.' },
      { type: 'build', prompt: 'Build: “It was cold, so we went home.”', chips: ['мы пошли домой', 'Было холодно', 'поэтому'], correct: ['Было холодно', 'поэтому', 'мы пошли домой'], answerText: 'Было холодно, поэтому мы пошли домой.' },
      { type: 'type', prompt: 'Type “when” in Russian', placeholder: 'к…', answers: ['когда'], hint: 'когда', answerText: 'когда' },
      { type: 'choice', prompt: 'Which answer is closest to a B1-style connected response?', answers: ['Я люблю Орегон, потому что здесь красиво, но зимой часто идёт дождь.', 'Орегон хороший. Дождь.', 'Да, нравится.'], correct: 'Я люблю Орегон, потому что здесь красиво, но зимой часто идёт дождь.' },
    ],
  },
];

let state = loadState();
let currentView = state.onboarded ? 'home' : 'onboarding';
let lessonSession = null;
let reviewSession = null;
let practiceSession = null;

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  state.lastVisit = new Date().toISOString();
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
  if (view === 'tutor') renderPractice();
  if (view === 'lesson') renderLesson();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOnboarding() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="onboarding-art russian">A2</div>
      <div class="eyebrow">Russian A2 · toward B1</div>
      <h1>Speak in connected thoughts.</h1>
      <p>This course starts at A2: past and future, everyday case patterns, opinions, reasons, comparisons and short stories. English explanations stay concise; Russian becomes progressively more important.</p>
      <div class="feature-pills">
        <span>🇷🇺 A2 core</span><span>🔊 Russian listening</span><span>⌨️ Active recall</span><span>↗ B1 bridge</span>
      </div>
      <button id="startButton" class="primary">Start A2</button>
    </section>`;
  document.getElementById('startButton').addEventListener('click', () => {
    state.onboarded = true;
    saveState();
    navigate('home');
  });
}

function renderHome() {
  const done = state.completedLessons.length;
  const coursePercent = Math.round((done / lessons.length) * 100);
  const firstIncomplete = lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
  const targetLesson = firstIncomplete || lessons[lessons.length - 1];
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Russian A2 · B1 bridge</div>
      <h1>${done === lessons.length ? 'Готова к следующему уровню.' : 'Продолжаем.'}</h1>
      <p>${done === lessons.length ? 'The first A2 module is complete. Review, practice connected speech, then continue toward B1.' : 'Build longer answers, connect ideas and use Russian in real situations.'}</p>
    </section>
    <section class="card glow-card">
      <div class="eyebrow">${done === lessons.length ? 'A2 module complete' : 'Continue learning'}</div>
      <h2 class="russian">${done === lessons.length ? 'От A2 к B1' : targetLesson.title}</h2>
      <p>${done === lessons.length ? '5 lessons · connected speech foundation' : targetLesson.subtitle}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${coursePercent}%"></div></div>
      <div class="progress-meta"><span>${done} of ${lessons.length} lessons</span><span>${coursePercent}%</span></div>
      <div style="height:16px"></div>
      <button id="continueButton" class="primary">${done === lessons.length ? 'Open speaking practice' : `${done === 0 ? 'Start Lesson 1' : 'Continue'} · ${targetLesson.minutes} min`}</button>
    </section>
    <div class="stats">
      <div class="stat"><strong>${state.xp}</strong><small>XP</small></div>
      <div class="stat"><strong>${state.streak}</strong><small>day streak</small></div>
      <div class="stat"><strong>${done}</strong><small>A2 lessons</small></div>
    </div>
    <div class="section-title"><div><h3>Today’s Russian</h3><p>Answer with a reason, not one word.</p></div></div>
    <section class="card">
      <div class="prompt">TRY THIS TODAY</div>
      <h2 class="russian" style="font-size:31px">Что ты будешь делать вечером?</h2>
      <div class="translit">Chto ty budesh delat vecherom?</div>
      <p class="translation">What will you do this evening?</p>
      <button class="secondary speak" data-speech="Что ты будешь делать вечером?">🔊 Hear it</button>
    </section>`;
  document.getElementById('continueButton').addEventListener('click', () => {
    if (done === lessons.length) navigate('tutor');
    else startLesson(targetLesson.id);
  });
  bindSpeechButtons();
}

function renderCourse() {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Course path</div><h1>Russian A2</h1><p>Module 1 · Connected everyday Russian · bridge toward B1</p></section>
    <section class="card" style="margin-bottom:14px"><div class="eyebrow">A2 progression</div><p style="margin:8px 0 0">Past → future → case patterns → opinions → connected storytelling.</p></section>
    <div class="lesson-list">
      ${lessons.map((lesson) => {
        const done = state.completedLessons.includes(lesson.id);
        const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1);
        return `<button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
          <div class="lesson-number">${done ? '✓' : lesson.id}</div>
          <div><div class="lesson-title russian">${lesson.title}</div><div class="lesson-subtitle">${lesson.level} · ${lesson.subtitle} · ${lesson.minutes} min</div></div>
          <div>${!unlocked ? '🔒' : '›'}</div>
        </button>`;
      }).join('')}
    </div>`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => startLesson(Number(button.dataset.lesson)));
  });
}

function learnedVocabulary() {
  return lessons
    .filter((lesson) => state.completedLessons.includes(lesson.id))
    .flatMap((lesson) => lesson.vocab.map((word) => ({ ...word, lessonId: lesson.id })));
}

function renderReview() {
  const words = learnedVocabulary();
  if (!words.length) {
    app.innerHTML = `<section class="hero"><div class="eyebrow">A2 review</div><h1>Active recall.</h1><p>Finish Lesson 1 to start building the review deck.</p></section><section class="card empty-state"><div class="empty-icon">🧠</div><h2>No A2 cards yet</h2><p>Words and sentence patterns appear here after each completed lesson.</p><button id="reviewLessonButton" class="primary">Open Lesson 1</button></section>`;
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
    <section class="hero"><div class="eyebrow">A2 review</div><h1>Recall before revealing.</h1><p>${reviewSession.baseLength} learned words and patterns are in the deck.</p></section>
    <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
    <div class="progress-meta"><span>Card ${reviewSession.index + 1}/${total}</span><span>${percent}%</span></div>
    <div style="height:18px"></div>
    <section class="card word-card">
      <div class="prompt">WHAT DOES THIS MEAN?</div>
      <div class="big-russian russian" style="font-size:clamp(34px,10vw,58px)">${word.russian}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(word.russian)}">🔊</button>
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
    app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:58px">✓</div><div class="eyebrow">Review complete</div><h1 class="russian">Готово.</h1><p>You reviewed the current A2 deck.</p><button id="finishReviewButton" class="primary">Back to home</button></section>`;
    document.getElementById('finishReviewButton').addEventListener('click', () => { reviewSession = null; navigate('home'); });
    return;
  }
  renderReviewCard();
}

const practiceTurns = [
  {
    ai: 'Привет! Расскажи, что ты делала вчера вечером?',
    translation: 'Hi! Tell me what you did yesterday evening.',
    answers: [
      'Вчера вечером я была дома и смотрела фильм.',
      'Завтра вечером я дома.',
      'Да, вечером.'
    ],
    correct: 'Вчера вечером я была дома и смотрела фильм.',
  },
  {
    ai: 'Понятно. А что ты будешь делать завтра?',
    translation: 'I see. And what will you do tomorrow?',
    answers: [
      'Завтра я буду работать, а вечером хочу отдохнуть.',
      'Вчера я работала.',
      'Работа хороший.'
    ],
    correct: 'Завтра я буду работать, а вечером хочу отдохнуть.',
  },
  {
    ai: 'Тебе нравится жить здесь? Почему?',
    translation: 'Do you like living here? Why?',
    answers: [
      'Да, мне нравится, потому что здесь красиво и спокойно.',
      'Да.',
      'Здесь нравится я.'
    ],
    correct: 'Да, мне нравится, потому что здесь красиво и спокойно.',
  },
];

function renderPractice() {
  const unlocked = state.completedLessons.length >= 3;
  if (!unlocked) {
    app.innerHTML = `<section class="hero"><div class="eyebrow">Speaking practice</div><h1>Connected answers.</h1><p>Finish the first three A2 lessons to unlock the conversation lab.</p></section><section class="card empty-state"><div class="empty-icon">💬</div><h2>Practice unlocks after Lesson 3</h2><p>The dialogue uses past, future and everyday case patterns.</p></section>`;
    return;
  }
  practiceSession = practiceSession || { index: 0, score: 0 };
  const turn = practiceTurns[practiceSession.index];
  if (!turn) return finishPractice();
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">A2 conversation lab</div><h1>Give the fuller answer.</h1><p>Choose the response that sounds natural and carries enough information.</p></section>
    <section class="card">
      <div class="prompt">YOUR CONVERSATION PARTNER</div>
      <h2 class="russian">${turn.ai}</h2>
      <p>${turn.translation}</p>
      <button class="secondary speak" data-speech="${escapeAttribute(turn.ai)}">🔊 Hear question</button>
    </section>
    <div style="height:14px"></div>
    <div class="answers">${turn.answers.map((answer) => `<button class="answer russian" data-practice="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div>
    <div id="practiceFeedback"></div>`;
  bindSpeechButtons();
  app.querySelectorAll('[data-practice]').forEach((button) => {
    button.addEventListener('click', () => {
      const correct = button.dataset.practice === turn.correct;
      if (!correct) {
        button.classList.add('wrong');
        document.getElementById('practiceFeedback').innerHTML = '<div class="feedback"><strong>Too short or unnatural.</strong><span>Try the answer that connects a complete thought.</span></div>';
        return;
      }
      button.classList.add('correct');
      practiceSession.score += 1;
      document.getElementById('practiceFeedback').innerHTML = `<div class="feedback"><strong>Good A2 answer.</strong><span>It gives context instead of a one-word response.</span></div><div style="height:12px"></div><button id="nextPractice" class="primary">Continue</button>`;
      app.querySelectorAll('[data-practice]').forEach((b) => { b.disabled = true; });
      document.getElementById('nextPractice').addEventListener('click', () => { practiceSession.index += 1; renderPractice(); });
    });
  });
}

function finishPractice() {
  if (!state.practiceCompleted) {
    state.practiceCompleted = true;
    state.xp += 40;
    saveState();
  }
  app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:56px">💬</div><div class="eyebrow">Conversation complete</div><h1 class="russian">Хороший разговор.</h1><p>You completed the A2 conversation lab. The next step will move toward freer B1-style answers.</p><button id="finishPracticeButton" class="primary">Back to home</button></section>`;
  document.getElementById('finishPracticeButton').addEventListener('click', () => { practiceSession = null; navigate('home'); });
}

function startLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;
  const unlocked = id === 1 || state.completedLessons.includes(id - 1) || state.completedLessons.includes(id);
  if (!unlocked) {
    alert('Complete the previous lesson first.');
    return;
  }
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
  app.innerHTML = `<section class="lesson-stage"><div class="lesson-progress"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><div class="progress-meta"><span>Lesson ${lesson.id} · ${lesson.level}</span><span>${lessonSession.step + 1}/${lesson.steps.length}</span></div></div><div id="lessonContent"></div></section>`;
  const container = document.getElementById('lessonContent');
  if (step.type === 'learn') renderLearnStep(container, step);
  if (step.type === 'choice') renderChoiceStep(container, step);
  if (step.type === 'listen') renderListenStep(container, step);
  if (step.type === 'build') renderBuildStep(container, step);
  if (step.type === 'type') renderTypeStep(container, step);
}

function renderLearnStep(container, step) {
  const speech = step.speech || step.russian;
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card word-card"><div class="big-russian russian">${step.russian}</div>${step.translit ? `<div class="translit">${step.translit}</div>` : ''}<div class="translation">${step.translation}</div><button class="audio-button speak" data-speech="${escapeAttribute(speech)}">🔊</button><div class="note">${step.note}</div></section><div style="height:14px"></div><button id="nextButton" class="primary">Continue</button>`;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderChoiceStep(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><div class="answers">${step.answers.map((answer) => `<button class="answer ${containsCyrillic(answer) ? 'russian' : ''}" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="feedback"></div>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function renderListenStep(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card word-card"><button id="listenButton" class="audio-button" style="width:76px;height:76px;font-size:28px">🔊</button><p style="margin:12px 0 0">Tap to hear the Russian phrase.</p></section><div style="height:14px"></div><div class="answers">${step.answers.map((answer) => `<button class="answer ${containsCyrillic(answer) ? 'russian' : ''}" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="feedback"></div>`;
  document.getElementById('listenButton').addEventListener('click', () => speakRussian(step.speech));
  setTimeout(() => speakRussian(step.speech), 250);
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function handleChoice(button, step) {
  if (lessonSession.locked) return;
  if (button.dataset.answer !== step.correct) {
    button.classList.add('wrong');
    navigator.vibrate?.(35);
    return;
  }
  lessonSession.locked = true;
  button.classList.add('correct');
  document.getElementById('feedback').innerHTML = `<div class="feedback"><strong>Correct.</strong>${step.translation ? `<span>${step.translation}</span>` : '<span>Good.</span>'}</div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderBuildStep(container, step) {
  lessonSession.selected = [];
  container.innerHTML = `<div class="prompt">${step.prompt}</div><div id="sentenceZone" class="sentence-zone"><span style="color:var(--muted)">Tap the parts in order</span></div><div class="word-bank">${step.chips.map((chip, index) => `<button class="chip russian" data-chip="${escapeAttribute(chip)}" data-index="${index}">${chip}</button>`).join('')}</div><div style="height:18px"></div><button id="checkSentence" class="primary">Check answer</button><div id="feedback"></div>`;
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
      feedback.innerHTML = '<div class="feedback"><strong>Not quite.</strong><span>Try the sequence again.</span></div>';
      setTimeout(() => renderLesson(), 850);
      return;
    }
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  });
}

function renderTypeStep(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card"><input id="typeAnswer" class="type-answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${step.placeholder || ''}" /><div class="note" style="margin-top:12px">Hint: ${step.hint}</div></section><div style="height:14px"></div><button id="checkType" class="primary">Check answer</button><div id="feedback"></div>`;
  const input = document.getElementById('typeAnswer');
  input.focus();
  const check = () => {
    const normalized = input.value.trim().toLowerCase().replace(/[.!?,]/g, '');
    const correct = step.answers.some((answer) => answer.toLowerCase().replace(/[.!?,]/g, '') === normalized);
    const feedback = document.getElementById('feedback');
    if (!correct) {
      feedback.innerHTML = `<div class="feedback"><strong>Try again.</strong><span>${step.hint}</span></div>`;
      return;
    }
    input.disabled = true;
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  };
  document.getElementById('checkType').addEventListener('click', check);
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter') check(); });
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
  app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:58px">✓</div><div class="eyebrow">Lesson ${lesson.id} complete · ${lesson.level}</div><h1 class="russian">${lesson.id === 5 ? 'Отличная работа.' : 'Отлично.'}</h1><p>${firstCompletion ? `You earned <strong style="color:var(--text)">${lesson.xp} XP</strong>.` : 'Lesson reviewed.'}</p><section class="card" style="margin-bottom:14px"><div class="prompt">CORE PATTERNS</div><h2 class="russian">${lesson.vocab.slice(0, 2).map((word) => word.russian).join(' · ')}</h2><p>${lesson.vocab.slice(0, 2).map((word) => word.english).join(' · ')}</p></section>${nextLesson ? `<div class="button-row"><button id="homeAfterLesson" class="secondary">Home</button><button id="nextLessonButton" class="primary">Lesson ${nextLesson.id}</button></div>` : '<button id="practiceAfterLesson" class="primary">Open speaking practice</button>'}</section>`;
  backButton.classList.add('hidden');
  if (nextLesson) {
    document.getElementById('homeAfterLesson').addEventListener('click', () => navigate('home'));
    document.getElementById('nextLessonButton').addEventListener('click', () => startLesson(nextLesson.id));
  } else {
    document.getElementById('practiceAfterLesson').addEventListener('click', () => navigate('tutor'));
  }
}

function speakRussian(text) {
  if (!('speechSynthesis' in window)) {
    alert('Audio is not supported by this browser.');
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.76;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function bindSpeechButtons() {
  document.querySelectorAll('.speak').forEach((button) => {
    button.addEventListener('click', () => speakRussian(button.dataset.speech));
  });
}

function containsCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

function escapeAttribute(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
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
