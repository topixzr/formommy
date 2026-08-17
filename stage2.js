/* Formommy Stage 2: Cyrillic + Conversation Lab */
const stage2Lessons = [
  {
    id: 6, title: 'А К М О Т', subtitle: 'Five easy Cyrillic letters', minutes: 8, xp: 70,
    vocab: [
      { russian: 'мама', translit: 'mama', english: 'mom' },
      { russian: 'кот', translit: 'kot', english: 'cat' },
      { russian: 'там', translit: 'tam', english: 'there' },
    ],
    steps: [
      { type: 'learn', prompt: 'Stage 2 · Read Russian', russian: 'А К М О Т', translit: 'A K M O T', translation: 'Five friendly letters.', note: 'These Cyrillic letters look familiar and make roughly the sounds you expect. Start recognizing the shapes directly instead of translating every letter into English.' },
      { type: 'choice', prompt: 'Which Cyrillic letter makes the M sound?', answers: ['М', 'Н', 'Р'], correct: 'М', bigAnswers: true },
      { type: 'learn', prompt: 'Read your first Russian word', russian: 'мама', translit: 'mama', translation: 'mom', note: 'Read it from Cyrillic first: м-а-м-а. Use the transliteration only to check yourself.' },
      { type: 'choice', prompt: 'Which word says “cat”?', answers: ['кот', 'там', 'мама'], correct: 'кот', bigAnswers: true },
      { type: 'listen', prompt: 'Listen, then choose the word you hear', speech: 'кот', answers: ['там', 'кот', 'мама'], correct: 'кот', translation: 'cat' },
      { type: 'type', prompt: 'Type “мама” in Cyrillic', placeholder: 'Use the Russian keyboard', answers: ['мама'], hint: 'м + а + м + а', answerText: 'мама' },
    ],
  },
  {
    id: 7, title: 'В Н Р С У Х', subtitle: 'Letters that trick English eyes', minutes: 10, xp: 80,
    vocab: [
      { russian: 'сок', translit: 'sok', english: 'juice' },
      { russian: 'нос', translit: 'nos', english: 'nose' },
      { russian: 'рука', translit: 'ruka', english: 'hand / arm' },
    ],
    steps: [
      { type: 'learn', prompt: 'Same shapes, different sounds', russian: 'В Н Р С У Х', translit: 'V N R S U KH', translation: 'Do not trust the English-looking shapes.', note: 'The key traps: В = V, Н = N, Р = R, С = S, У = U/oo, Х = a rough H/kh sound. Repetition makes them automatic.' },
      { type: 'choice', prompt: 'What sound does «Р» make?', answers: ['R', 'P', 'N'], correct: 'R', bigAnswers: true },
      { type: 'choice', prompt: 'What sound does «С» make?', answers: ['S', 'K', 'V'], correct: 'S', bigAnswers: true },
      { type: 'learn', prompt: 'Read it without transliteration first', russian: 'сок', translation: 'juice', note: 'С = s, О = o, К = k. Together: сок.' },
      { type: 'listen', prompt: 'Which written word do you hear?', speech: 'нос', answers: ['сок', 'нос', 'кот'], correct: 'нос', translation: 'nose' },
      { type: 'type', prompt: 'Type the Russian word for “juice”', placeholder: 'с…', answers: ['сок'], hint: 'с + о + к', answerText: 'сок' },
    ],
  },
  {
    id: 8, title: 'Б Г Д Л П Ф', subtitle: 'New shapes, useful sounds', minutes: 10, xp: 80,
    vocab: [
      { russian: 'дом', translit: 'dom', english: 'house / home' },
      { russian: 'папа', translit: 'papa', english: 'dad' },
      { russian: 'фото', translit: 'foto', english: 'photo' },
    ],
    steps: [
      { type: 'learn', prompt: 'Six new letters', russian: 'Б Г Д Л П Ф', translit: 'B G D L P F', translation: 'A new visual alphabet is taking shape.', note: 'Do not memorize all 33 letters at once. These six appear constantly and let you read many useful words.' },
      { type: 'choice', prompt: 'Which letter makes the P sound?', answers: ['П', 'Р', 'Б'], correct: 'П', bigAnswers: true },
      { type: 'learn', prompt: 'A real Russian word', russian: 'дом', translation: 'house / home', note: 'Д = d, О = o, М = m. You can now read «дом» directly.' },
      { type: 'choice', prompt: 'Which word says “dad”?', answers: ['папа', 'мама', 'фото'], correct: 'папа', bigAnswers: true },
      { type: 'listen', prompt: 'Listen and choose the word', speech: 'фото', answers: ['дом', 'фото', 'папа'], correct: 'фото', translation: 'photo' },
      { type: 'type', prompt: 'Type “дом” in Cyrillic', placeholder: 'д…', answers: ['дом'], hint: 'д + о + м', answerText: 'дом' },
    ],
  },
  {
    id: 9, title: 'Й Ё Ж Ч Ш Ю Я', subtitle: 'Distinctively Russian letters', minutes: 12, xp: 90,
    vocab: [
      { russian: 'я', translit: 'ya', english: 'I' },
      { russian: 'чай', translit: 'chai', english: 'tea' },
      { russian: 'шум', translit: 'shum', english: 'noise' },
      { russian: 'юг', translit: 'yug', english: 'south' },
    ],
    steps: [
      { type: 'learn', prompt: 'Letters that look unmistakably Cyrillic', russian: 'Й Ё Ж Ч Ш Ю Я', translit: 'Y / YO / ZH / CH / SH / YU / YA', translation: 'These unlock very Russian-looking words.', note: 'Focus on recognition, not perfect pronunciation. Я often begins with “ya,” Ю with “yu,” Ё with “yo,” Ч = ch, Ш = sh, Ж = zh.' },
      { type: 'choice', prompt: 'Which letter usually begins with a “ya” sound?', answers: ['Я', 'Ю', 'Ж'], correct: 'Я', bigAnswers: true },
      { type: 'learn', prompt: 'Read a drink you already know', russian: 'чай', translit: 'chai', translation: 'tea', note: 'Ч = ch, А = a, Й gives a short y-like ending. «чай» is a very useful everyday word.' },
      { type: 'choice', prompt: 'Which word says “tea”?', answers: ['чай', 'юг', 'шум'], correct: 'чай', bigAnswers: true },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'чай', answers: ['чай', 'я', 'юг'], correct: 'чай', translation: 'tea' },
      { type: 'type', prompt: 'Type the single Russian word for “I”', placeholder: 'One letter', answers: ['я'], hint: 'Я / я', answerText: 'я' },
    ],
  },
  {
    id: 10, title: 'Читаем!', subtitle: 'Read real Russian without transliteration', minutes: 12, xp: 100,
    vocab: [
      { russian: 'метро', translit: 'metro', english: 'metro / subway' },
      { russian: 'такси', translit: 'taksi', english: 'taxi' },
      { russian: 'кофе', translit: 'kofe', english: 'coffee' },
      { russian: 'машина', translit: 'mashina', english: 'car' },
      { russian: 'спасибо', translit: 'spasibo', english: 'thank you' },
    ],
    steps: [
      { type: 'learn', prompt: 'No transliteration now', russian: 'метро · такси · кофе', translation: 'metro · taxi · coffee', note: 'These are international words. Read the Cyrillic first. Your brain already knows the meaning, so this is ideal reading practice.' },
      { type: 'choice', prompt: 'Which word says “coffee”?', answers: ['метро', 'кофе', 'такси'], correct: 'кофе', bigAnswers: true },
      { type: 'choice', prompt: 'Which word says “taxi”?', answers: ['такси', 'машина', 'спасибо'], correct: 'такси', bigAnswers: true },
      { type: 'listen', prompt: 'Listen and choose the written word', speech: 'машина', answers: ['кофе', 'машина', 'метро'], correct: 'машина', translation: 'car' },
      { type: 'type', prompt: 'Type “coffee” in Russian', placeholder: 'к…', answers: ['кофе'], hint: 'к + о + ф + е', answerText: 'кофе' },
      { type: 'choice', prompt: 'Read this without transliteration: «спасибо»', answers: ['thank you', 'goodbye', 'please'], correct: 'thank you' },
      { type: 'learn', prompt: 'Stage complete', russian: 'Я читаю по-русски.', translit: 'Ya chitayu po-russki.', translation: 'I read in Russian.', note: 'You do not know every Cyrillic letter yet, but Russian text is no longer just a wall of unfamiliar symbols.' },
    ],
  },
];

lessons.push(...stage2Lessons);
if (typeof state.conversationCompleted !== 'boolean') state.conversationCompleted = false;

const stage2Conversation = [
  { russian: 'Привет! Как тебя зовут?', english: 'Hi! What is your name?', options: ['Меня зовут Sarah.', 'Пока!', 'Спасибо!'], correct: 'Меня зовут Sarah.', feedback: 'Natural answer to «Как тебя зовут?».' },
  { russian: 'Очень приятно! У тебя есть собака?', english: 'Nice to meet you! Do you have a dog?', note: 'New pattern: «у тебя есть…?» = “do you have…?”', options: ['Да, у меня есть собака.', 'Это кто?', 'Пожалуйста!'], correct: 'Да, у меня есть собака.', feedback: 'You reused «у меня есть…» correctly.' },
  { russian: 'Отлично! Пока!', english: 'Great! Bye!', options: ['Пока!', 'Здравствуйте!', 'Нет!'], correct: 'Пока!', feedback: 'Conversation complete.' },
];
let stage2Practice = null;

renderHome = function () {
  const done = state.completedLessons.length;
  const total = lessons.length;
  const percent = Math.round((done / total) * 100);
  const target = lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
  const firstStageDone = state.completedLessons.includes(5);
  const secondStageDone = state.completedLessons.includes(10);
  const headline = secondStageDone ? 'Ты читаешь!' : firstStageDone ? 'Новый этап.' : 'Добрый день.';
  const copy = secondStageDone ? 'You completed the first two stages. Review vocabulary and use Conversation Lab.' : firstStageDone ? 'Stage 2 is open: learn Cyrillic and start reading Russian directly.' : 'One short lesson today is enough. Keep Russian practical and repeat what matters.';
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Russian A1</div><h1>${headline}</h1><p>${copy}</p></section>
    <section class="card glow-card">
      <div class="eyebrow">${secondStageDone ? 'Two stages complete' : target && target.id >= 6 ? 'Stage 2 · Cyrillic' : 'Continue learning'}</div>
      <h2 class="russian">${secondStageDone ? 'Первые разговоры + Читаем по-русски' : target.title}</h2>
      <p>${secondStageDone ? '10 lessons completed' : target.subtitle}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
      <div class="progress-meta"><span>${done} of ${total} lessons</span><span>${percent}%</span></div>
      <div style="height:16px"></div>
      <button id="continueButton" class="primary">${secondStageDone ? 'Open Conversation Lab' : `Continue · ${target.minutes} min`}</button>
    </section>
    ${firstStageDone && !secondStageDone ? `<section class="card stage-banner"><div class="stage-icon">АБВ</div><div><div class="eyebrow">NEW STAGE UNLOCKED</div><h3>Read Russian</h3><p>Five new lessons teach Cyrillic through useful words instead of a giant alphabet chart.</p></div></section>` : ''}
    <div class="stats"><div class="stat"><strong>${state.xp}</strong><small>XP</small></div><div class="stat"><strong>${state.streak}</strong><small>day streak</small></div><div class="stat"><strong>${done}</strong><small>lessons</small></div></div>
    <div class="section-title"><div><h3>Today’s Russian</h3><p>Say one phrase in real life.</p></div></div>
    <section class="card"><div class="prompt">TRY THIS TODAY</div><h2 class="russian" style="font-size:34px">Ты хочешь кофе?</h2><div class="translit">Ty khochesh kofe?</div><p class="translation">Do you want coffee?</p><button class="secondary speak" data-speech="Ты хочешь кофе?">🔊 Hear it</button></section>`;
  document.getElementById('continueButton').addEventListener('click', () => secondStageDone ? navigate('tutor') : startLesson(target.id));
  bindSpeechButtons();
};

renderCourse = function () {
  const stage1 = lessons.filter((lesson) => lesson.id <= 5);
  const stage2 = lessons.filter((lesson) => lesson.id >= 6);
  app.innerHTML = `<section class="hero"><div class="eyebrow">Course path</div><h1>Russian A1</h1><p>Two stages · 10 short lessons</p></section>${stageBlock(1, 'Первые разговоры', 'First conversations', stage1)}${stageBlock(2, 'Читаем по-русски', 'Read Russian', stage2)}`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => button.addEventListener('click', () => startLesson(Number(button.dataset.lesson))));
};

function stageBlock(number, title, english, items) {
  const completed = items.filter((lesson) => state.completedLessons.includes(lesson.id)).length;
  const locked = number === 2 && !state.completedLessons.includes(5);
  return `<section class="module-block ${locked ? 'module-locked' : ''}"><div class="module-heading"><div><div class="eyebrow">Stage ${number}</div><h2 class="russian">${title}</h2><p>${english} · ${number === 1 ? 'Useful phrases for real life.' : 'Learn Cyrillic through words you can actually read.'}</p></div><div class="module-score">${completed}/${items.length}</div></div>${locked ? '<div class="module-lock-note">🔒 Complete Lesson 5 to unlock Cyrillic.</div>' : ''}<div class="lesson-list">${items.map((lesson) => {
    const done = state.completedLessons.includes(lesson.id);
    const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1) || done;
    return `<button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}><div class="lesson-number">${done ? '✓' : lesson.id}</div><div><div class="lesson-title russian">${lesson.title}</div><div class="lesson-subtitle">${lesson.subtitle} · ${lesson.minutes} min · ${lesson.xp} XP</div></div><div>${unlocked ? '›' : '🔒'}</div></button>`;
  }).join('')}</div></section>`;
}

renderLesson = function () {
  if (!lessonSession) return navigate('course');
  const lesson = currentLesson();
  const step = lesson.steps[lessonSession.step];
  const percent = Math.round(((lessonSession.step + 1) / lesson.steps.length) * 100);
  app.innerHTML = `<section class="lesson-stage"><div class="lesson-progress"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><div class="progress-meta"><span>${lesson.id >= 6 ? 'Stage 2' : `Lesson ${lesson.id}`} · ${lesson.title}</span><span>${lessonSession.step + 1}/${lesson.steps.length}</span></div></div><div id="lessonContent"></div></section>`;
  const container = document.getElementById('lessonContent');
  if (step.type === 'learn') renderLearnStep(container, step);
  if (step.type === 'choice') renderChoiceStep(container, step);
  if (step.type === 'listen') renderListenStep(container, step);
  if (step.type === 'build') renderBuildStep(container, step);
  if (step.type === 'type') renderStage2Type(container, step);
};

renderLearnStep = function (container, step) {
  const speech = step.speech || step.russian;
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card word-card"><div class="big-russian russian">${step.russian}</div>${step.translit ? `<div class="translit">${step.translit}</div>` : ''}${step.translation ? `<div class="translation">${step.translation}</div>` : ''}<button class="audio-button speak" data-speech="${escapeAttribute(speech)}" aria-label="Hear Russian">🔊</button><div class="note">${step.note}</div></section><div style="height:14px"></div><button id="nextButton" class="primary">Continue</button>`;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
};

renderChoiceStep = function (container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><div class="answers ${step.bigAnswers ? 'big-answer-grid' : ''}">${step.answers.map((answer) => `<button class="answer ${/[А-Яа-яЁё]/.test(answer) ? 'russian' : ''}" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="feedback"></div>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
};

function renderStage2Type(container, step) {
  container.innerHTML = `<div class="prompt">${step.prompt}</div><section class="card"><input id="typeAnswer" class="type-answer russian" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="${escapeAttribute(step.placeholder || '')}" /><div class="typing-hint">Hint: ${step.hint}</div></section><div style="height:14px"></div><button id="checkTypeButton" class="primary">Check answer</button><div id="feedback"></div>`;
  const input = document.getElementById('typeAnswer');
  input.focus();
  const check = () => {
    const normalize = (text) => String(text).trim().toLowerCase().replace(/[.!?,]/g, '').replace(/ё/g, 'е');
    const correct = step.answers.some((answer) => normalize(answer) === normalize(input.value));
    const feedback = document.getElementById('feedback');
    if (!correct) {
      input.classList.add('input-wrong');
      feedback.innerHTML = '<div class="feedback"><strong>Not yet.</strong><span>Check the Cyrillic letters and try again.</span></div>';
      navigator.vibrate?.(35);
      return;
    }
    input.disabled = true;
    document.getElementById('checkTypeButton').disabled = true;
    input.classList.remove('input-wrong');
    input.classList.add('input-correct');
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  };
  document.getElementById('checkTypeButton').addEventListener('click', check);
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter') check(); });
}

renderTutor = function () {
  if (stage2Practice) return renderStage2Practice();
  const unlocked = state.completedLessons.includes(5);
  app.innerHTML = `<section class="hero"><div class="eyebrow">Practice</div><h1>Use Russian.</h1><p>Conversation Lab turns phrases from the course into a short dialogue. It works now without exposing any API key.</p></section><section class="card glow-card"><div class="eyebrow">Conversation Lab · Beta</div><h2>Meet Anna</h2><p>Practice introductions, «у меня есть…», and saying goodbye.</p><div class="feature-pills"><span>💬 3 turns</span><span>🔊 Russian audio</span><span>+25 XP first time</span></div><button id="startPracticeButton" class="primary" ${unlocked ? '' : 'disabled'}>${unlocked ? (state.conversationCompleted ? 'Practice again' : 'Start conversation') : 'Complete Lesson 5 to unlock'}</button></section><section class="card"><div class="prompt">AI TUTOR</div><h3>Open questions need a secure backend.</h3><p>The future generative tutor will answer arbitrary questions in simple English. The API key will not be placed in this public GitHub Pages code.</p></section>`;
  if (unlocked) document.getElementById('startPracticeButton').addEventListener('click', () => { stage2Practice = { step: 0, locked: false }; renderTutor(); });
};

function renderStage2Practice() {
  const turn = stage2Conversation[stage2Practice.step];
  const percent = Math.round(((stage2Practice.step + 1) / stage2Conversation.length) * 100);
  app.innerHTML = `<section class="hero"><div class="eyebrow">Conversation Lab</div><h1>Meet Anna</h1><p>Choose the most natural A1 reply.</p></section><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><div class="progress-meta"><span>Turn ${stage2Practice.step + 1}/${stage2Conversation.length}</span><span>${percent}%</span></div><div style="height:16px"></div><div class="chat-bubble"><div class="chat-avatar">А</div><div><div class="prompt">АННА</div><div class="chat-russian russian">${turn.russian}</div><div class="chat-english">${turn.english}</div>${turn.note ? `<div class="note">${turn.note}</div>` : ''}<button class="secondary speak" data-speech="${escapeAttribute(turn.russian)}">🔊 Hear Anna</button></div></div><div class="prompt" style="margin-top:18px">CHOOSE YOUR REPLY</div><div class="answers">${turn.options.map((answer) => `<button class="answer russian" data-practice="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div><div id="practiceFeedback"></div><div style="height:12px"></div><button id="exitPractice" class="secondary">Exit conversation</button>`;
  bindSpeechButtons();
  app.querySelectorAll('[data-practice]').forEach((button) => button.addEventListener('click', () => {
    if (stage2Practice.locked) return;
    if (button.dataset.practice !== turn.correct) { button.classList.add('wrong'); navigator.vibrate?.(35); return; }
    stage2Practice.locked = true;
    button.classList.add('correct');
    document.getElementById('practiceFeedback').innerHTML = `<div class="feedback"><strong>Natural reply.</strong><span>${turn.feedback}</span></div><div style="height:12px"></div><button id="practiceNext" class="primary">${stage2Practice.step === stage2Conversation.length - 1 ? 'Finish conversation' : 'Continue'}</button>`;
    document.getElementById('practiceNext').addEventListener('click', () => {
      if (stage2Practice.step < stage2Conversation.length - 1) { stage2Practice.step += 1; stage2Practice.locked = false; renderTutor(); return; }
      const first = !state.conversationCompleted;
      if (first) { state.conversationCompleted = true; state.xp += 25; saveState(); }
      stage2Practice = null;
      app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:64px">💬</div><div class="eyebrow">Conversation complete</div><h1 class="russian">Отлично!</h1><p>${first ? 'You earned 25 XP.' : 'Conversation practiced again.'}</p><button id="practiceDone" class="primary">Back to Practice</button></section>`;
      document.getElementById('practiceDone').addEventListener('click', () => renderTutor());
    });
  }));
  document.getElementById('exitPractice').addEventListener('click', () => { stage2Practice = null; renderTutor(); });
}

navigate(currentView);
