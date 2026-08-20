(() => {
  const FAMILY = [
    { name: 'Люся', role: 'senior pup', icon: '🐕' },
    { name: 'Ева', role: 'border collie', icon: '🐶' },
    { name: 'Алексей', role: 'your husband', icon: 'А' },
    { name: 'Лексус', role: 'you', icon: 'Л' }
  ];

  function familyChips() {
    return FAMILY.map(member => `
      <div class="family-chip">
        <span class="family-avatar ${member.icon.length === 1 && /[А-Я]/.test(member.icon) ? 'letter-avatar' : ''}">${member.icon}</span>
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
            <div class="home-kicker">НАШ РУССКИЙ 🐾</div>
            <h1>Привет, Лексус!</h1>
            <p>${finished ? 'Русский уже живёт дома. Теперь поддерживаем его каждый день.' : 'Один маленький шаг — и ещё больше русского дома.'}</p>
          </div>
          <div class="paw-bubble" aria-hidden="true">🐾</div>
        </header>

        <section class="family-strip" aria-label="Our family">
          ${familyChips()}
        </section>

        <section class="next-lesson-3d">
          <div class="lesson-card-top">
            <div>
              <span class="soft-label">${finished ? 'COURSE COMPLETE' : `NEXT · LESSON ${target.id}`}</span>
              <h2>${finished ? 'Keep it active' : escapeHtml(target.title)}</h2>
              <p>${finished ? 'A quick review keeps familiar Russian easy to reach.' : escapeHtml(target.goals?.[0] || target.subtitle)}</p>
            </div>
            <span class="lesson-time-pill">${finished ? '↻' : `${target.minutes} min`}</span>
          </div>
          <div class="soft-progress"><span style="width:${coursePercent()}%"></span></div>
          <div class="lesson-progress-copy"><span>${done}/${lessons.length} lessons</span><strong>${coursePercent()}%</strong></div>
          <button id="familyContinue" class="fluffy-button primary-fluffy">${finished ? 'Review together' : `${done ? 'Continue' : 'Start'} lesson`} <span>→</span></button>
          ${!finished && module ? `<button id="familyModule" class="fluffy-button secondary-fluffy">See Module ${module.id}<small>${moduleDone}/${module.lessonIds.length} · ${moduleProgress}%</small></button>` : ''}
        </section>

        <section class="quick-grid">
          <button class="home-action-card peach" id="familyQuick">
            <span class="action-icon">⚡</span><span><strong>5-minute practice</strong><small>Quick mixed review</small></span>
          </button>
          <button class="home-action-card lavender" id="familyTalk">
            <span class="action-icon">💬</span><span><strong>Talk to Алексей</strong><small>Real family phrases</small></span>
          </button>
          <button class="home-action-card mint" id="familyReview">
            <span class="action-icon">↻</span><span><strong>Review</strong><small>${due} due now</small></span>
          </button>
          <button class="home-action-card sky" id="familyProgress">
            <span class="action-icon">✦</span><span><strong>My progress</strong><small>${weakLabel ? `Focus: ${escapeHtml(weakLabel)}` : `${state.xp} XP · ${state.streak} day streak`}</small></span>
          </button>
        </section>

        <section class="tiny-phrase-card">
          <div>
            <span class="soft-label">SAY THIS TODAY</span>
            <div class="tiny-russian">${escapeHtml(phrase.russian)}</div>
            <small>${escapeHtml(phrase.english)}</small>
          </div>
          <button class="round-sound speak" data-speech="${escapeAttribute(phrase.russian)}" aria-label="Hear Russian">🔊</button>
        </section>

        <section class="family-note">
          <span class="dog-face">🐶</span>
          <div><strong>Русский — это про нас.</strong><small>Люся, Ева, Алексей и Лексус будут встречаться в примерах и диалогах курса.</small></div>
        </section>
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