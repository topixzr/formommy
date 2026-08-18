/* Formommy A2 expansion: Lessons 6–9 */

// Keep the whole course explicitly at A2.
lessons[3].level = 'A2';
lessons[3].steps[2].note = 'At A2, start connecting an opinion with «что» and a contrast with «но». Instead of one isolated phrase, give a short connected thought.';

lessons[4].level = 'A2';
lessons[4].subtitle = 'Storytelling connectors & connected A2 answers';
lessons[4].steps[2].prompt = 'Connect two parts of a thought';
lessons[4].steps[2].note = 'At A2, clauses with «когда», «если», «потому что» and «хотя» help you explain familiar situations in a more complete way.';
lessons[4].steps[7].prompt = 'Which answer is the strongest connected A2 response?';

lessons.push(
  {
    id: 6,
    title: 'Обычно или сейчас?',
    subtitle: 'Daily routines, frequency & what is happening now',
    minutes: 14,
    xp: 120,
    level: 'A2',
    vocab: [
      { russian: 'обычно', translit: 'obychno', english: 'usually' },
      { russian: 'иногда', translit: 'inogda', english: 'sometimes' },
      { russian: 'каждый день', translit: 'kazhdyy den', english: 'every day' },
      { russian: 'сейчас', translit: 'seychas', english: 'now' },
      { russian: 'по выходным', translit: 'po vykhodnym', english: 'on weekends' },
      { russian: 'Я обычно готовлю дома.', translit: 'Ya obychno gotovlyu doma.', english: 'I usually cook at home.' },
    ],
    steps: [
      { type: 'learn', prompt: 'Talk about habits', russian: 'Я обычно готовлю дома.', translit: 'Ya obychno gotovlyu doma.', translation: 'I usually cook at home.', note: 'Words such as «обычно», «часто», «иногда» and «редко» make everyday descriptions much more natural.' },
      { type: 'learn', prompt: 'Contrast habit and now', russian: 'Обычно я работаю дома, но сейчас я в офисе.', translit: 'Obychno ya rabotayu doma, no seychas ya v ofise.', translation: 'I usually work at home, but now I am at the office.', note: 'Use «обычно» for a routine and «сейчас» for what is happening at the present moment.' },
      { type: 'choice', prompt: 'Which sentence describes a regular habit?', answers: ['Я обычно пью кофе утром.', 'Вчера я выпила кофе.', 'Сейчас я выпью кофе.'], correct: 'Я обычно пью кофе утром.' },
      { type: 'listen', prompt: 'Listen and choose what you hear', speech: 'По выходным мы часто гуляем в парке.', answers: ['По выходным мы часто гуляем в парке.', 'Вчера мы были в магазине.', 'Сейчас мы работаем дома.'], correct: 'По выходным мы часто гуляем в парке.', translation: 'On weekends we often walk in the park.' },
      { type: 'build', prompt: 'Build: “Sometimes I work in the evening.”', chips: ['я работаю вечером', 'Иногда'], correct: ['Иногда', 'я работаю вечером'], answerText: 'Иногда я работаю вечером.' },
      { type: 'type', prompt: 'Type the Russian word for “usually”', placeholder: 'о…', answers: ['обычно'], hint: 'обычно', answerText: 'обычно' },
      { type: 'choice', prompt: 'Choose the natural contrast', answers: ['Обычно я езжу на машине, но сегодня иду пешком.', 'Обычно вчера машина.', 'Сейчас каждый день вчера.'], correct: 'Обычно я езжу на машине, но сегодня иду пешком.' },
    ],
  },
  {
    id: 7,
    title: 'В кафе и магазине',
    subtitle: 'Ordering, quantities, prices & polite requests',
    minutes: 15,
    xp: 130,
    level: 'A2',
    vocab: [
      { russian: 'Мне, пожалуйста…', translit: 'Mne, pozhaluysta…', english: 'I’ll have…, please.' },
      { russian: 'Сколько стоит?', translit: 'Skolko stoit?', english: 'How much does it cost?' },
      { russian: 'ещё один', translit: 'yeshchyo odin', english: 'one more' },
      { russian: 'без сахара', translit: 'bez sakhara', english: 'without sugar' },
      { russian: 'с собой', translit: 's soboy', english: 'to go / takeaway' },
      { russian: 'Можно оплатить картой?', translit: 'Mozhno oplatit kartoy?', english: 'Can I pay by card?' },
    ],
    steps: [
      { type: 'learn', prompt: 'Order naturally', russian: 'Мне, пожалуйста, кофе без сахара.', translit: 'Mne, pozhaluysta, kofe bez sakhara.', translation: 'I’ll have a coffee without sugar, please.', note: '«Мне, пожалуйста…» is a compact and natural way to order food or drinks.' },
      { type: 'learn', prompt: 'Ask the price', russian: 'Сколько это стоит?', translit: 'Skolko eto stoit?', translation: 'How much does this cost?', note: 'Use «сколько стоит?» for one item and «сколько стоят?» for plural items.' },
      { type: 'learn', prompt: 'Useful takeaway phrase', russian: 'Можно кофе с собой?', translit: 'Mozhno kofe s soboy?', translation: 'Can I get a coffee to go?', note: '«С собой» literally means “with oneself” and is the standard phrase for takeaway.' },
      { type: 'choice', prompt: 'You want coffee without sugar. What do you say?', answers: ['Мне кофе без сахара, пожалуйста.', 'Мне сахар без кофе.', 'Сколько сахар домой?'], correct: 'Мне кофе без сахара, пожалуйста.' },
      { type: 'listen', prompt: 'Listen and choose the request', speech: 'Можно оплатить картой?', answers: ['Can I pay by card?', 'Where is the nearest bank?', 'Can I have one more coffee?'], correct: 'Can I pay by card?', translation: 'Можно оплатить картой?' },
      { type: 'build', prompt: 'Build: “One more coffee, please.”', chips: ['кофе, пожалуйста', 'Ещё один'], correct: ['Ещё один', 'кофе, пожалуйста'], answerText: 'Ещё один кофе, пожалуйста.' },
      { type: 'type', prompt: 'Type the Russian phrase meaning “to go / takeaway”', placeholder: 'с…', answers: ['с собой'], hint: 'с + собой', answerText: 'с собой' },
      { type: 'choice', prompt: 'Which is the most natural store question?', answers: ['Сколько это стоит?', 'Что цена есть?', 'Сколько деньги это?'], correct: 'Сколько это стоит?' },
    ],
  },
  {
    id: 8,
    title: 'Мне нужно, можно, нельзя',
    subtitle: 'Needs, permission, rules & practical modal phrases',
    minutes: 15,
    xp: 130,
    level: 'A2',
    vocab: [
      { russian: 'Мне нужно…', translit: 'Mne nuzhno…', english: 'I need to… / I need…' },
      { russian: 'Мне надо…', translit: 'Mne nado…', english: 'I need to…' },
      { russian: 'Можно…?', translit: 'Mozhno…?', english: 'May I…? / Is it possible…?' },
      { russian: 'Нельзя.', translit: 'Nelzya.', english: 'It is not allowed / You cannot.' },
      { russian: 'Мне можно…', translit: 'Mne mozhno…', english: 'I am allowed to…' },
      { russian: 'Мне нельзя…', translit: 'Mne nelzya…', english: 'I am not allowed to… / I must not…' },
    ],
    steps: [
      { type: 'learn', prompt: 'Say what you need', russian: 'Мне нужно купить продукты.', translit: 'Mne nuzhno kupit produkty.', translation: 'I need to buy groceries.', note: '«Мне нужно + infinitive» is one of the most useful A2 patterns: мне нужно позвонить, купить, поехать, работать.' },
      { type: 'learn', prompt: 'Ask for permission', russian: 'Можно здесь парковаться?', translit: 'Mozhno zdes parkovatsya?', translation: 'Can I park here?', note: '«Можно?» is an extremely common way to ask whether something is allowed or possible.' },
      { type: 'learn', prompt: 'Understand a rule', russian: 'Здесь нельзя курить.', translit: 'Zdes nelzya kurit.', translation: 'You cannot smoke here.', note: '«Нельзя + infinitive» expresses prohibition. It is common on signs, at work and in public places.' },
      { type: 'choice', prompt: 'Which phrase means “I need to call my mom”?', answers: ['Мне нужно позвонить маме.', 'Мне можно мама звонит.', 'Я нельзя маме.'], correct: 'Мне нужно позвонить маме.' },
      { type: 'listen', prompt: 'Listen and choose the rule', speech: 'Здесь нельзя парковаться.', answers: ['Parking is not allowed here.', 'You need to park here.', 'You can pay for parking here.'], correct: 'Parking is not allowed here.', translation: 'Здесь нельзя парковаться.' },
      { type: 'build', prompt: 'Build: “Can I sit here?”', chips: ['здесь сесть?', 'Можно'], correct: ['Можно', 'здесь сесть?'], answerText: 'Можно здесь сесть?' },
      { type: 'type', prompt: 'Type “not allowed / cannot” in Russian', placeholder: 'н…', answers: ['нельзя'], hint: 'нельзя', answerText: 'нельзя' },
      { type: 'choice', prompt: 'You have an appointment soon. Which sentence fits?', answers: ['Мне надо идти.', 'Мне нельзя вчера.', 'Можно я работа была.'], correct: 'Мне надо идти.' },
    ],
  },
  {
    id: 9,
    title: 'Как туда добраться?',
    subtitle: 'Directions, transport & asking for help in the city',
    minutes: 16,
    xp: 140,
    level: 'A2',
    vocab: [
      { russian: 'Как туда добраться?', translit: 'Kak tuda dobratsya?', english: 'How do I get there?' },
      { russian: 'идите прямо', translit: 'idite pryamo', english: 'go straight' },
      { russian: 'поверните направо', translit: 'povernite napravo', english: 'turn right' },
      { russian: 'поверните налево', translit: 'povernite nalevo', english: 'turn left' },
      { russian: 'рядом с', translit: 'ryadom s', english: 'next to' },
      { russian: 'на автобусе', translit: 'na avtobuse', english: 'by bus' },
    ],
    steps: [
      { type: 'learn', prompt: 'Ask for directions', russian: 'Как туда добраться?', translit: 'Kak tuda dobratsya?', translation: 'How do I get there?', note: 'Use this when you know the destination but need instructions for reaching it.' },
      { type: 'learn', prompt: 'Understand basic directions', russian: 'Идите прямо, потом поверните направо.', translit: 'Idite pryamo, potom povernite napravo.', translation: 'Go straight, then turn right.', note: 'Polite direction forms often use «идите» and «поверните». Learn them as practical chunks.' },
      { type: 'learn', prompt: 'Describe a location', russian: 'Аптека рядом с банком.', translit: 'Apteka ryadom s bankom.', translation: 'The pharmacy is next to the bank.', note: '«Рядом с…» means “next to…”. The following noun changes form: с банком, с магазином, с парком.' },
      { type: 'choice', prompt: 'Which phrase means “turn left”?', answers: ['Поверните налево.', 'Идите прямо.', 'Поверните направо.'], correct: 'Поверните налево.' },
      { type: 'listen', prompt: 'Listen and choose the direction', speech: 'Идите прямо, потом поверните налево.', answers: ['Go straight, then turn left.', 'Turn right immediately.', 'Take the bus downtown.'], correct: 'Go straight, then turn left.', translation: 'Идите прямо, потом поверните налево.' },
      { type: 'build', prompt: 'Build: “The pharmacy is next to the bank.”', chips: ['рядом с банком', 'Аптека'], correct: ['Аптека', 'рядом с банком'], answerText: 'Аптека рядом с банком.' },
      { type: 'type', prompt: 'Type the Russian word for “straight”', placeholder: 'п…', answers: ['прямо'], hint: 'прямо', answerText: 'прямо' },
      { type: 'choice', prompt: 'Which is a natural A2 travel question?', answers: ['Как туда добраться на автобусе?', 'Куда автобус быть?', 'Я добраться сколько?'], correct: 'Как туда добраться на автобусе?' },
    ],
  }
);

renderOnboarding = function () {
  app.innerHTML = `
    <section class="onboarding">
      <div class="onboarding-art russian">A2</div>
      <div class="eyebrow">Russian A2</div>
      <h1>Build practical everyday Russian.</h1>
      <p>Nine A2 lessons covering past and future, movement, opinions, connected stories, routines, shopping, modal phrases and city directions. English explanations stay concise while Russian becomes progressively more important.</p>
      <div class="feature-pills">
        <span>🇷🇺 A2 course</span><span>🔊 Russian listening</span><span>⌨️ Active recall</span><span>💬 Everyday speech</span>
      </div>
      <button id="startButton" class="primary">Start A2</button>
    </section>`;
  document.getElementById('startButton').addEventListener('click', () => {
    state.onboarded = true;
    saveState();
    navigate('home');
  });
};

renderHome = function () {
  const done = state.completedLessons.length;
  const coursePercent = Math.round((done / lessons.length) * 100);
  const firstIncomplete = lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
  const targetLesson = firstIncomplete || lessons[lessons.length - 1];
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Russian A2</div>
      <h1>${done === lessons.length ? 'A2 пройден.' : 'Продолжаем.'}</h1>
      <p>${done === lessons.length ? 'All nine A2 lessons are complete. Review vocabulary and use the speaking practice to keep the patterns active.' : 'Build longer answers and use Russian in familiar everyday situations.'}</p>
    </section>
    <section class="card glow-card">
      <div class="eyebrow">${done === lessons.length ? 'A2 course complete' : 'Continue learning'}</div>
      <h2 class="russian">${done === lessons.length ? 'Практический русский A2' : targetLesson.title}</h2>
      <p>${done === lessons.length ? '9 lessons · everyday A2 foundation' : targetLesson.subtitle}</p>
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
    <div class="section-title"><div><h3>Today’s Russian</h3><p>Use a complete everyday answer.</p></div></div>
    <section class="card">
      <div class="prompt">TRY THIS TODAY</div>
      <h2 class="russian" style="font-size:31px">Что ты обычно делаешь по выходным?</h2>
      <div class="translit">Chto ty obychno delayesh po vykhodnym?</div>
      <p class="translation">What do you usually do on weekends?</p>
      <button class="secondary speak" data-speech="Что ты обычно делаешь по выходным?">🔊 Hear it</button>
    </section>`;
  document.getElementById('continueButton').addEventListener('click', () => {
    if (done === lessons.length) navigate('tutor');
    else startLesson(targetLesson.id);
  });
  bindSpeechButtons();
};

renderCourse = function () {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Course path</div><h1>Russian A2</h1><p>9 practical A2 lessons for everyday communication</p></section>
    <section class="card" style="margin-bottom:14px"><div class="eyebrow">A2 progression</div><p style="margin:8px 0 0">Past → future → movement → opinions → storytelling → routines → shopping → modal phrases → directions.</p></section>
    <div class="lesson-list">
      ${lessons.map((lesson) => {
        const done = state.completedLessons.includes(lesson.id);
        const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1);
        return `<button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
          <div class="lesson-number">${done ? '✓' : lesson.id}</div>
          <div><div class="lesson-title russian">${lesson.title}</div><div class="lesson-subtitle">A2 · ${lesson.subtitle} · ${lesson.minutes} min</div></div>
          <div>${!unlocked ? '🔒' : '›'}</div>
        </button>`;
      }).join('')}
    </div>`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => startLesson(Number(button.dataset.lesson)));
  });
};

finishPractice = function () {
  if (!state.practiceCompleted) {
    state.practiceCompleted = true;
    state.xp += 40;
    saveState();
  }
  app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:56px">💬</div><div class="eyebrow">Conversation complete</div><h1 class="russian">Хороший разговор.</h1><p>You completed the A2 conversation lab. Review the course and repeat the dialogue whenever you want more speaking practice.</p><button id="finishPracticeButton" class="primary">Back to home</button></section>`;
  document.getElementById('finishPracticeButton').addEventListener('click', () => { practiceSession = null; navigate('home'); });
};

// Re-render after extending the lesson array.
navigate(currentView);
