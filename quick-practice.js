(() => {
  function quickPracticePool() {
    const adaptive = window.FormommyLearning?.adaptivePracticeItems?.(5);
    if (adaptive?.length) return adaptive;
    const completed = lessons.filter(l => state.completedLessons.includes(l.id));
    if (!completed.length) return [];
    return completed.flatMap(lesson => lesson.steps
      .filter(step => ['choice','listen','build','type'].includes(step.type))
      .map(step => ({ ...step, lessonId: lesson.id, lessonTitle: lesson.title })))
      .sort(() => Math.random() - 0.5).slice(0, 5);
  }

  let quickSession = null;

  function startQuickPractice() {
    const items = quickPracticePool();
    if (!items.length) return startLesson(1);
    quickSession = { items, index: 0, correct: 0 };
    renderQuickPractice();
  }

  function renderQuickPractice() {
    const item = quickSession.items[quickSession.index];
    if (!item) return renderQuickComplete();
    const answer = item.answerText || item.correct || (item.answers && item.answers[0]) || '';
    const weak = window.FormommyLearning?.weakSkills?.(1)?.[0];
    const weakLabel = weak ? window.FormommyLearning.labels[weak.skill] || weak.skill : '';
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Adaptive practice · ${quickSession.index + 1}/${quickSession.items.length}</div><h1>Five useful minutes.</h1><p>${weakLabel ? `More weight is being given to your current weak spot: ${escapeHtml(weakLabel)}.` : 'This set mixes completed material and active recall.'}</p></section>
      <section class="card quick-card"><div class="prompt">${escapeHtml(item.prompt || 'Recall the Russian')}</div>
        ${item.speech ? `<button class="secondary speak" data-speech="${escapeAttribute(item.speech)}">🔊 Hear Russian</button>` : ''}
        <div class="quick-answer hidden" id="quickAnswer"><div class="phrase-russian">${escapeHtml(answer)}</div>${item.translation ? `<div class="translation">${escapeHtml(item.translation)}</div>` : ''}</div>
        <button class="primary" id="quickReveal">Show answer</button></section>`;
    document.getElementById('quickReveal').addEventListener('click', () => {
      document.getElementById('quickAnswer').classList.remove('hidden');
      document.getElementById('quickReveal').outerHTML = `<div class="quick-ratings"><button class="secondary" id="quickAgain">Need practice</button><button class="primary" id="quickGotIt">Got it</button></div>`;
      document.getElementById('quickAgain').addEventListener('click', () => advanceQuick(false));
      document.getElementById('quickGotIt').addEventListener('click', () => advanceQuick(true));
    });
    bindSpeechButtons();
  }

  function advanceQuick(correct) {
    const item = quickSession.items[quickSession.index];
    const lesson = lessonById(item.lessonId);
    if (correct) {
      quickSession.correct += 1;
      window.FormommyLearning?.recordSuccess?.(item, lesson);
    } else {
      window.FormommyLearning?.recordMistake?.(item, lesson);
    }
    quickSession.index += 1;
    renderQuickPractice();
  }

  function renderQuickComplete() {
    const score = quickSession.correct;
    state.xp += score * 5;
    window.FormommyLearning?.logSession?.('adaptive', quickSession.items.length, 5);
    saveState({ study: true });
    app.innerHTML = `<section class="hero"><div class="eyebrow">Practice complete</div><h1>${score}/${quickSession.items.length} felt solid.</h1><p>The next set will rebalance itself from these results.</p></section>
      <section class="card"><button class="primary" id="quickHome">Back home</button><button class="secondary" id="quickAgainSet">Another 5</button></section>`;
    document.getElementById('quickHome').addEventListener('click', () => navigate('home'));
    document.getElementById('quickAgainSet').addEventListener('click', startQuickPractice);
  }

  const originalHome = window.renderHome;
  window.renderHome = function () {
    originalHome();
    const stats = document.querySelector('.stats');
    if (!stats) return;
    const section = document.createElement('section');
    section.className = 'card quick-practice-entry';
    section.innerHTML = `<div><div class="eyebrow">ADAPTIVE PRACTICE</div><h3>Have five minutes?</h3><p>Completed material is mixed with extra weight on patterns you miss most.</p></div><button class="secondary" id="quickPracticeButton">Practice 5 →</button>`;
    stats.insertAdjacentElement('afterend', section);
    document.getElementById('quickPracticeButton').addEventListener('click', startQuickPractice);
  };

  window.startQuickPractice = startQuickPractice;
})();