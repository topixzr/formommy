(() => {
  const FAMILY = [
    { name: 'Lucy', role: 'senior pup', icon: '🐕' },
    { name: 'Eva', role: 'border collie', icon: '🐶' },
    { name: 'Alexey', role: 'your husband', icon: 'A' },
    { name: 'Lexus', role: 'you', icon: 'L' }
  ];

  function familyChips() {
    return FAMILY.map(member => `
      <div class="family-chip">
        <span class="family-avatar ${member.icon.length === 1 && /[A-Z]/.test(member.icon) ? 'letter-avatar' : ''}">${member.icon}</span>
        <span><strong>${member.name}</strong><small>${member.role}</small></span>
      </div>`).join('');
  }

  function currentModuleSafe() {
    try { return currentModule(); } catch { return null; }
  }

  function renderFamilyHome() {
    const done = completedCount();
    const target = firstIncompleteLesson();
    const finished = done === lessons.length;
    const due = dueReviewCards().length;
    const phrase = dailyPhrase();
    const module = currentModuleSafe();
    const moduleDone = module ? moduleCompletedCount(module) : 0;
    const moduleProgress = module ? modulePercent(module) : coursePercent();
    const weak = window.FormommyLearning?.weakSkills?.(1)?.[0];
    const weakLabel = weak ? (window.FormommyLearning.labels?.[weak.skill] || weak.skill) : null;

    app.innerHTML = `
      <section class="family-home">
        <header class="family-welcome">
          <div>
            <div class="home-kicker">OUR RUSSIAN 🐾</div>
            <h1>Hi, Lexus!</h1>
            <p>${finished ? 'Keep familiar Russian active with a little practice each day.' : 'One small step at a time.'}</p>
          </div>
          <div class="paw-bubble" aria-hidden="true">🐾</div>
        </header>

        <section class="family-strip" aria-label="Our family">${familyChips()}</section>

        <section class="next-lesson-3d">
          <div class="lesson-card-top"><div><span class="soft-label">${finished ? 'COURSE COMPLETE' : `NEXT · LESSON ${target.id}`}</span><h2>${finished ? 'Keep it active' : escapeHtml(target.title)}</h2><p>${finished ? 'A quick review keeps familiar Russian easy to reach.' : escapeHtml(target.goals?.[0] || target.subtitle)}</p></div><span class="lesson-time-pill">${finished ? '↻' : `${target.minutes} min`}</span></div>
          <div class="soft-progress"><span style="width:${coursePercent()}%"></span></div>
          <div class="lesson-progress-copy"><span>${done}/${lessons.length} lessons</span><strong>${coursePercent()}%</strong></div>
          <button id="familyContinue" class="fluffy-button primary-fluffy">${finished ? 'Review together' : `${done ? 'Continue' : 'Start'} lesson`} <span>→</span></button>
          ${!finished && module ? `<button id="familyModule" class="fluffy-button secondary-fluffy">See Module ${module.id}<small>${moduleDone}/${module.lessonIds.length} · ${moduleProgress}%</small></button>` : ''}
        </section>

        <section class="quick-grid">
          <button class="home-action-card peach" id="familyQuick"><span class="action-icon">⚡</span><span><strong>5-minute practice</strong><small>Quick mixed review</small></span></button>
          <button class="home-action-card lavender" id="familyTalk"><span class="action-icon">💬</span><span><strong>Talk to Alexey</strong><small>Real family phrases</small></span></button>
          <button class="home-action-card mint" id="familyReview"><span class="action-icon">↻</span><span><strong>Review</strong><small>${due} due now</small></span></button>
          <button class="home-action-card sky" id="familyProgress"><span class="action-icon">✦</span><span><strong>My progress</strong><small>${weakLabel ? `Focus: ${escapeHtml(weakLabel)}` : `${state.xp} XP · ${state.streak} day streak`}</small></span></button>
        </section>

        <section class="tiny-phrase-card"><div><span class="soft-label">SAY THIS TODAY</span><div class="tiny-russian">${escapeHtml(phrase.russian)}</div><small>${escapeHtml(phrase.english)}</small></div><button class="round-sound speak" data-speech="${escapeAttribute(phrase.russian)}" aria-label="Hear Russian">🔊</button></section>

        <section class="family-note"><span class="dog-face">🐶</span><div><strong>Russian built around your real life.</strong><small>Lucy, Eva, Alexey and Lexus will appear throughout examples and conversations.</small></div></section>
      </section>`;

    document.getElementById('familyContinue').addEventListener('click', () => finished ? navigate('review') : startLesson(target.id));
    document.getElementById('familyModule')?.addEventListener('click', () => navigate('course'));
    document.getElementById('familyQuick').addEventListener('click', () => window.startQuickPractice ? window.startQuickPractice() : navigate('review'));
    document.getElementById('familyTalk').addEventListener('click', () => navigate('tutor'));
    document.getElementById('familyReview').addEventListener('click', () => navigate('review'));
    document.getElementById('familyProgress').addEventListener('click', () => window.FormommyLearning?.renderNotebook ? window.FormommyLearning.renderNotebook() : navigate('course'));
    bindSpeechButtons();
  }

  window.renderHome = renderFamilyHome;
  if (state.onboarded && currentView === 'home') renderFamilyHome();
})();