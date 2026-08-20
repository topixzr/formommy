const FORMOMMY_MODULES = [
  {
    id: 1,
    title: 'Everyday Russian',
    subtitle: 'Build the first phrases you can actually use together at home.',
    lessonIds: [1, 2, 3, 4, 5],
    outcome: 'Handle simple home conversations without translating every word.',
    canDo: ['Ask and answer basic questions', 'Talk about what is happening now', 'Say a few things about yesterday', 'Make a simple plan together'],
    phrases: ['Хочешь кофе?', 'Что ты делаешь?', 'Я уже дома.']
  },
  {
    id: 2,
    title: 'Plans, Needs & Places',
    subtitle: 'Move from isolated phrases to useful decisions and everyday movement.',
    lessonIds: [6, 7, 8, 9, 10],
    outcome: 'Say what you want, need, like, and where you are going.',
    canDo: ['Talk about future plans', 'Say what you want and need', 'Distinguish home vs going home', 'Use Russian around dogs and routines'],
    phrases: ['Я хочу есть.', 'Мне нужно домой.', 'Пойдём гулять?']
  },
  {
    id: 3,
    title: 'Real Conversation',
    subtitle: 'Connect short ideas and become less dependent on English word order.',
    lessonIds: [11, 12, 13, 14, 15],
    outcome: 'Keep a short back-and-forth conversation going instead of answering with one word.',
    canDo: ['Describe how you feel', 'Say what you like', 'Connect two thoughts', 'Get through a short conversational checkpoint'],
    phrases: ['Мне холодно.', 'Мне нравится.', 'Я устала, но всё нормально.']
  },
  {
    id: 4,
    title: 'Russian for Us',
    subtitle: 'Practice the language that makes everyday couple life easier.',
    lessonIds: [16, 17, 18, 19, 20],
    outcome: 'Use Russian for check-ins, requests, mornings, evenings, and communication repair.',
    canDo: ['Ask for clarification', 'Make household requests', 'Check in naturally', 'Handle a practical couple conversation'],
    phrases: ['Повтори, пожалуйста.', 'Ты скоро будешь дома?', 'Спокойной ночи.']
  }
];

let modulePreviewOpen = false;

function moduleLessons(module) {
  return module.lessonIds.map(lessonById).filter(Boolean);
}

function currentModule() {
  const target = firstIncompleteLesson();
  return FORMOMMY_MODULES.find(module => module.lessonIds.includes(target.id)) || FORMOMMY_MODULES[FORMOMMY_MODULES.length - 1];
}

function moduleCompletedCount(module) {
  return module.lessonIds.filter(id => state.completedLessons.includes(id)).length;
}

function modulePercent(module) {
  return Math.round((moduleCompletedCount(module) / module.lessonIds.length) * 100);
}

function moduleStatus(module) {
  const done = moduleCompletedCount(module);
  if (done === module.lessonIds.length) return 'Complete';
  if (done > 0 || module.lessonIds.some(isUnlocked)) return 'In progress';
  return 'Locked';
}

function renderModuleLessonRows(module, compact = false) {
  return moduleLessons(module).map(lesson => {
    const done = state.completedLessons.includes(lesson.id);
    const unlocked = isUnlocked(lesson.id);
    const current = !done && lesson.id === firstIncompleteLesson().id;
    const icon = done ? '✓' : current ? '▶' : unlocked ? lesson.id : '🔒';
    return `
      <button class="module-lesson-row ${done ? 'done' : ''} ${current ? 'current' : ''} ${!unlocked ? 'locked' : ''}"
        data-module-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
        <span class="module-lesson-state">${icon}</span>
        <span class="module-lesson-copy">
          <strong>${escapeHtml(lesson.title)}</strong>
          ${compact ? '' : `<small>${escapeHtml(lesson.subtitle)}</small>`}
        </span>
        <span class="module-lesson-time">${lesson.minutes} min</span>
      </button>`;
  }).join('');
}

function renderModulePreview(module) {
  const done = moduleCompletedCount(module);
  const percent = modulePercent(module);
  return `
    <section class="card module-preview-card" id="modulePreview">
      <div class="module-kicker">MODULE ${module.id} · ${done}/${module.lessonIds.length} LESSONS</div>
      <div class="module-preview-head">
        <div>
          <h2>${escapeHtml(module.title)}</h2>
          <p>${escapeHtml(module.subtitle)}</p>
        </div>
        <strong class="module-percent">${percent}%</strong>
      </div>
      <div class="progress-bar" aria-label="Module progress"><div class="progress-fill" style="width:${percent}%"></div></div>
      <div class="module-lesson-stack">${renderModuleLessonRows(module)}</div>
      <div class="module-outcome">
        <div class="eyebrow">BY THE END OF THIS MODULE</div>
        <strong>${escapeHtml(module.outcome)}</strong>
        <ul>${module.canDo.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
      <div class="module-phrases">
        <div class="eyebrow">YOU'LL BE ABLE TO SAY</div>
        ${module.phrases.map(phrase => `<span>${escapeHtml(phrase)}</span>`).join('')}
      </div>
    </section>`;
}

function bindModuleLessonButtons(root = app) {
  root.querySelectorAll('[data-module-lesson]:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => startLesson(Number(btn.dataset.moduleLesson)));
  });
}

function renderHome() {
  const done = completedCount();
  const target = firstIncompleteLesson();
  const phrase = dailyPhrase();
  const due = dueReviewCards().length;
  const finished = done === lessons.length;
  const module = currentModule();
  const moduleDone = moduleCompletedCount(module);
  const moduleProgress = modulePercent(module);

  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">${finished ? 'COURSE COMPLETE' : `Module ${module.id} · Lesson ${target.id} of ${lessons.length}`}</div>
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
      ${finished ? '' : `<button id="exploreModuleButton" class="secondary module-explore-button" aria-expanded="${modulePreviewOpen}">
        <span>Explore Module ${module.id}</span><span>${moduleDone}/${module.lessonIds.length} · ${moduleProgress}%</span>
      </button>`}
    </section>

    ${!finished && modulePreviewOpen ? renderModulePreview(module) : ''}

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

    <div class="section-title"><div><h3>Your path</h3><p>See what you are building toward, not just the next exercise.</p></div></div>
    <section class="card module-mini-roadmap">
      ${FORMOMMY_MODULES.map(item => {
        const status = moduleStatus(item);
        return `<button data-open-module="${item.id}" class="module-mini ${item.id === module.id ? 'active' : ''}">
          <span>Module ${item.id}</span><strong>${escapeHtml(item.title)}</strong><small>${moduleCompletedCount(item)}/${item.lessonIds.length} · ${status}</small>
        </button>`;
      }).join('')}
    </section>

    <button id="toggleTranslit" class="display-toggle" aria-pressed="${state.settings.transliteration}">
      <span>Pronunciation guide</span><strong>${state.settings.transliteration ? 'ON' : 'OFF'}</strong>
    </button>`;

  document.getElementById('continueButton').addEventListener('click', () => finished ? navigate('review') : startLesson(target.id));
  app.querySelector('[data-home-action="review"]').addEventListener('click', () => navigate('review'));
  document.getElementById('exploreModuleButton')?.addEventListener('click', () => {
    modulePreviewOpen = !modulePreviewOpen;
    renderHome();
    if (modulePreviewOpen) requestAnimationFrame(() => document.getElementById('modulePreview')?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  });
  app.querySelectorAll('[data-open-module]').forEach(btn => btn.addEventListener('click', () => {
    navigate('course');
    requestAnimationFrame(() => document.getElementById(`course-module-${btn.dataset.openModule}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }));
  document.getElementById('toggleTranslit').addEventListener('click', () => {
    state.settings.transliteration = !state.settings.transliteration;
    saveState();
    renderHome();
  });
  bindModuleLessonButtons();
  bindSpeechButtons();
}

function renderCourse() {
  const targetModule = currentModule();
  const modulesHtml = FORMOMMY_MODULES.map(module => {
    const done = moduleCompletedCount(module);
    const percent = modulePercent(module);
    const status = moduleStatus(module);
    return `
      <section class="course-module-card ${module.id === targetModule.id ? 'active' : ''}" id="course-module-${module.id}">
        <div class="course-module-head">
          <div>
            <div class="module-kicker">MODULE ${module.id} · ${escapeHtml(status.toUpperCase())}</div>
            <h2>${escapeHtml(module.title)}</h2>
            <p>${escapeHtml(module.subtitle)}</p>
          </div>
          <div class="module-score"><strong>${percent}%</strong><small>${done}/${module.lessonIds.length}</small></div>
        </div>
        <div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div>
        <div class="course-module-goal"><span>Goal</span>${escapeHtml(module.outcome)}</div>
        <div class="module-lesson-stack">${renderModuleLessonRows(module, true)}</div>
        <details class="module-details">
          <summary>What you'll unlock</summary>
          <ul>${module.canDo.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
          <div class="module-phrases compact">${module.phrases.map(phrase => `<span>${escapeHtml(phrase)}</span>`).join('')}</div>
        </details>
      </section>`;
  }).join('');

  app.innerHTML = `
    <section class="hero compact-hero">
      <div class="eyebrow">Course map</div>
      <h1>Your Russian path</h1>
      <p>Four clear milestones. Every module shows what you are learning now and what you will be able to do next.</p>
    </section>
    <section class="course-overview card">
      <div><strong>${completedCount()}</strong><small>lessons complete</small></div>
      <div><strong>${coursePercent()}%</strong><small>course progress</small></div>
      <div><strong>${FORMOMMY_MODULES.filter(module => moduleCompletedCount(module) === module.lessonIds.length).length}</strong><small>modules complete</small></div>
    </section>
    <div class="module-course-list">${modulesHtml}</div>`;

  bindModuleLessonButtons();
}

if (state.onboarded && (currentView === 'home' || currentView === 'course')) {
  currentView === 'course' ? renderCourse() : renderHome();
}
