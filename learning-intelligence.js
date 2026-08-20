(() => {
  const SKILL_LABELS = {
    listening: 'Listening', recall: 'Active recall', 'word-order': 'Word order', 'past-tense': 'Past tense',
    future: 'Future plans', 'home-direction': 'дома vs домой', possession: 'У меня есть / нет',
    'feminine-object': 'Feminine objects', 'physical-state': 'Мне + state', questions: 'Questions',
    movement: 'Movement & places', 'couple-language': 'Couple language', weather: 'Weather', time: 'Time', default: 'General Russian'
  };

  function ensureLearningState() {
    if (!state.learning) state.learning = { skills: {}, mistakes: [], sessions: [] };
    state.learning.skills ||= {};
    state.learning.mistakes ||= [];
    state.learning.sessions ||= [];
    return state.learning;
  }

  function inferSkills(step, lesson = currentLesson?.()) {
    const text = [step?.prompt, step?.russian, step?.speech, step?.translation, step?.answerText, step?.grammar?.rule, step?.grammar?.order, lesson?.title, lesson?.unit]
      .filter(Boolean).join(' ').toLocaleLowerCase('ru-RU');
    const tags = new Set();
    if (step?.type === 'listen') tags.add('listening');
    if (step?.type === 'type') tags.add('recall');
    if (step?.type === 'build') tags.add('word-order');
    if (/вчера|прошл|past|была|был|делала|ездил|сделал/.test(text)) tags.add('past-tense');
    if (/буду|будешь|будем|завтра|future|план/.test(text)) tags.add('future');
    if (/дома|домой/.test(text)) tags.add('home-direction');
    if (/у меня|у тебя|у нас|есть|нет/.test(text)) tags.add('possession');
    if (/пицц|пасту|еду|\-а → \-у|direct object|object/.test(text)) tags.add('feminine-object');
    if (/мне холодно|мне жарко|мне плохо|мне хорошо|physical state|state word/.test(text)) tags.add('physical-state');
    if (/\?|question|вопрос|где|куда|когда|что |какие|который час/.test(text)) tags.add('questions');
    if (/идти|ехать|поед|пойд|гулять|мест|place|movement/.test(text)) tags.add('movement');
    if (/муж|husband|home|дом|кофе|соба|вечер|утро|спокойной ночи/.test(text)) tags.add('couple-language');
    if (/погод|дожд|солнеч|weather/.test(text)) tags.add('weather');
    if (/час|время|во сколько|time/.test(text)) tags.add('time');
    if (!tags.size) tags.add('default');
    return [...tags];
  }

  function scoreFor(skill) {
    const s = ensureLearningState().skills[skill];
    if (!s) return 0;
    const attempts = s.correct + s.wrong;
    if (!attempts) return 0;
    const errorRate = s.wrong / attempts;
    const recencyBoost = s.lastWrong && Date.now() - s.lastWrong < 7 * DAY ? 0.2 : 0;
    return Math.min(1, errorRate + recencyBoost + Math.min(0.25, s.wrong * 0.03));
  }

  function updateSkill(skill, correct) {
    const learning = ensureLearningState();
    const current = learning.skills[skill] || { correct: 0, wrong: 0, lastWrong: null, lastSeen: null };
    current[correct ? 'correct' : 'wrong'] += 1;
    current.lastSeen = Date.now();
    if (!correct) current.lastWrong = Date.now();
    learning.skills[skill] = current;
  }

  function recordMistake(step, lesson) {
    const learning = ensureLearningState();
    const skills = inferSkills(step, lesson);
    skills.forEach(skill => updateSkill(skill, false));
    const answer = step?.answerText || step?.correct || step?.russian || (step?.answers && step.answers[0]) || '';
    const key = `${lesson?.id || 0}:${normalizeAnswer(answer)}:${skills.join(',')}`;
    const existing = learning.mistakes.find(m => m.key === key);
    if (existing) { existing.count += 1; existing.lastSeen = Date.now(); }
    else learning.mistakes.push({ key, lessonId: lesson?.id || 0, prompt: step?.prompt || '', answer, skills, count: 1, lastSeen: Date.now() });
    learning.mistakes.sort((a,b) => b.count - a.count || b.lastSeen - a.lastSeen);
    learning.mistakes = learning.mistakes.slice(0, 60);
    saveState();
  }

  function recordSuccess(step, lesson) {
    inferSkills(step, lesson).forEach(skill => updateSkill(skill, true));
    saveState();
  }

  function weakSkills(limit = 3) {
    return Object.keys(ensureLearningState().skills)
      .map(skill => ({ skill, score: scoreFor(skill), ...ensureLearningState().skills[skill] }))
      .filter(item => item.wrong > 0).sort((a,b) => b.score - a.score).slice(0, limit);
  }

  function stepWeight(step, lesson) {
    const weakness = Math.max(0, ...inferSkills(step, lesson).map(scoreFor));
    let weight = 1 + weakness * 5;
    if (step.type === 'type') weight += 1.2;
    if (step.type === 'listen') weight += 0.8;
    return weight;
  }

  function weightedSample(items, count) {
    const pool = [...items], result = [];
    while (pool.length && result.length < count) {
      const total = pool.reduce((sum, item) => sum + item.weight, 0);
      let pick = Math.random() * total, index = 0;
      for (; index < pool.length; index++) { pick -= pool[index].weight; if (pick <= 0) break; }
      result.push(pool.splice(Math.min(index, pool.length - 1), 1)[0]);
    }
    return result;
  }

  function adaptivePracticeItems(count = 5) {
    const completed = lessons.filter(l => state.completedLessons.includes(l.id));
    const candidates = completed.flatMap(lesson => lesson.steps
      .filter(step => ['choice','listen','build','type'].includes(step.type))
      .map(step => ({ ...step, lessonId: lesson.id, lessonTitle: lesson.title, weight: stepWeight(step, lesson) })));
    return weightedSample(candidates, count);
  }

  function renderNotebook() {
    const learning = ensureLearningState(), mistakes = learning.mistakes.slice(0, 12), weak = weakSkills(5);
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Personal learning profile</div><h1>What needs another pass.</h1><p>This page is built from actual mistakes, not a generic curriculum estimate.</p></section>
      <section class="card intelligence-card"><div class="prompt">WEAKEST SKILLS</div>
      ${weak.length ? weak.map(item => `<div class="skill-row"><div><strong>${escapeHtml(SKILL_LABELS[item.skill] || item.skill)}</strong><small>${item.wrong} misses · ${item.correct} correct</small></div><span>${Math.round(item.score * 100)}%</span></div>`).join('') : '<p>No weak pattern yet. Complete exercises first.</p>'}</section>
      <div class="section-title"><div><h3>Mistake notebook</h3><p>Repeated misses rise to the top automatically.</p></div></div>
      <section class="mistake-list">${mistakes.length ? mistakes.map(m => `<article class="card mistake-card"><div class="mistake-count">×${m.count}</div><div><small>Lesson ${m.lessonId}</small><strong>${escapeHtml(m.answer || m.prompt)}</strong><span>${escapeHtml(m.skills.map(s => SKILL_LABELS[s] || s).join(' · '))}</span></div></article>`).join('') : '<section class="card"><p>Your repeated mistakes will appear here.</p></section>'}</section>
      <button class="primary" id="adaptivePracticeNow">Practice weak spots</button><button class="text-button" id="notebookHome">Back home</button>`;
    document.getElementById('adaptivePracticeNow').addEventListener('click', () => window.startQuickPractice?.());
    document.getElementById('notebookHome').addEventListener('click', () => navigate('home'));
  }

  function weeklyStats() {
    const sessions = ensureLearningState().sessions.filter(s => Date.now() - s.time < 7 * DAY);
    return { sessions: sessions.length, exercises: sessions.reduce((n,s) => n + (s.exercises || 0), 0), minutes: sessions.reduce((n,s) => n + (s.minutes || 0), 0), weak: weakSkills(1)[0] };
  }

  function logSession(type, exercises, minutes = 5) {
    const learning = ensureLearningState();
    learning.sessions.push({ type, exercises, minutes, time: Date.now() });
    learning.sessions = learning.sessions.filter(s => Date.now() - s.time < 35 * DAY).slice(-120);
    saveState();
  }

  function captureResult(target) {
    if (!lessonSession) return;
    const step = currentStep(), lesson = currentLesson();
    if (!step || !lesson) return;
    queueMicrotask(() => {
      let result = null;
      if (target.matches('[data-answer]')) result = target.classList.contains('correct') ? true : target.classList.contains('wrong') ? false : null;
      if (target.id === 'checkSentence' || target.id === 'checkTyped') {
        const feedback = document.getElementById('feedback');
        result = feedback?.querySelector('.correct-feedback') ? true : feedback?.querySelector('.wrong-feedback') ? false : null;
      }
      if (result === true) recordSuccess(step, lesson);
      if (result === false) recordMistake(step, lesson);
    });
  }

  document.addEventListener('click', e => {
    const target = e.target.closest('[data-answer], #checkSentence, #checkTyped');
    if (target) captureResult(target);
  });
  document.addEventListener('keyup', e => {
    if (e.key === 'Enter' && e.target?.id === 'typedAnswer') captureResult(document.getElementById('checkTyped') || e.target);
  });

  const previousHome = window.renderHome;
  window.renderHome = function () {
    previousHome();
    const weak = weakSkills(1)[0], week = weeklyStats();
    const target = document.querySelector('.quick-practice-entry') || document.querySelector('.stats');
    if (!target) return;
    const panel = document.createElement('section');
    panel.className = 'card learning-profile-entry';
    panel.innerHTML = `<div class="card-head"><div><div class="eyebrow">YOUR PROGRESS</div><h3>${weak ? `Focus: ${escapeHtml(SKILL_LABELS[weak.skill] || weak.skill)}` : 'Your learning profile'}</h3></div><button class="mini-link" id="openMistakes">Details →</button></div><div class="weekly-mini"><span><strong>${week.sessions}</strong> sessions</span><span><strong>${week.exercises}</strong> exercises</span><span><strong>${week.minutes}</strong> min</span></div>`;
    target.insertAdjacentElement('afterend', panel);
    document.getElementById('openMistakes').addEventListener('click', renderNotebook);
  };

  window.FormommyLearning = { inferSkills, recordMistake, recordSuccess, weakSkills, adaptivePracticeItems, renderNotebook, logSession, weeklyStats, labels: SKILL_LABELS };
})();