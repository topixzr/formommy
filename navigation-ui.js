(() => {
  const baseNavigate = window.navigate;

  const FAMILY = {
    lucy: { name: 'Lucy', icon: '🐶', title: 'Lucy stories', copy: 'A future section built around calm everyday language, home routines, care, and life with our senior girl.' },
    eva: { name: 'Eva', icon: '🐕', title: 'Eva adventures', copy: 'A future section for active vocabulary: walks, training, play, parks, commands, and the chaos of a young border collie.' },
    alexey: { name: 'Alexey', icon: '👨', title: 'Talk with Alexey', copy: 'This section will focus on real couple conversations, texting, planning, jokes, small talk, and the Russian you actually hear at home.' },
    lexus: { name: 'Lexus', icon: '♡', title: 'Your Russian', copy: 'A future personal section for your phrases, weak spots, progress, favorite expressions, and the Russian you use most often.' }
  };

  function navState(active) {
    currentView = active;
    backButton.classList.add('hidden');
    bottomNav.classList.remove('hidden');
    setNav(active);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function familyButtons() {
    return Object.entries(FAMILY).map(([key, member]) => `
      <button class="family-person" data-family="${key}" aria-label="Open ${member.name} preview">
        <span class="family-person-icon">${member.icon}</span>
        <span>${member.name}</span>
      </button>`).join('');
  }

  function renderFamilyPreview(key) {
    const member = FAMILY[key];
    if (!member) return renderMinimalHome();
    navState('home');
    app.innerHTML = `
      <section class="family-preview-page">
        <button class="plain-back" id="familyPreviewBack">← Home</button>
        <div class="family-preview-hero">
          <div class="family-preview-icon">${member.icon}</div>
          <div class="home-kicker">COMING LATER</div>
          <h1>${escapeHtml(member.title)}</h1>
          <p>${escapeHtml(member.copy)}</p>
        </div>
        <section class="family-preview-note">
          <strong>This will become its own learning path.</strong>
          <p>For now, the main course stays focused and uncluttered. This preview shows where family-specific material will live without mixing unfinished features into the home screen.</p>
        </section>
        <button class="home-primary-3d" id="familyPreviewCourse">Continue the main course <span>→</span></button>
      </section>`;
    document.getElementById('familyPreviewBack').addEventListener('click', renderMinimalHome);
    document.getElementById('familyPreviewCourse').addEventListener('click', () => window.navigate('course'));
  }

  function renderMinimalHome() {
    navState('home');
    const target = firstIncompleteLesson();
    const module = typeof currentModule === 'function' ? currentModule() : null;
    const done = completedCount();
    const percent = coursePercent();
    app.innerHTML = `
      <section class="new-home">
        <div class="home-welcome">
          <div class="home-welcome-copy">
            <div class="home-kicker">RUSSIAN FOR OUR REAL LIFE</div>
            <h1>Ready for a little Russian?</h1>
            <p>One short lesson at a time. Clear English first, Russian when you are ready to learn it.</p>
          </div>
          <div class="home-dog-art" aria-hidden="true">
            <span class="dog-ear left"></span><span class="dog-ear right"></span>
            <span class="dog-face">•ᴥ•</span>
          </div>
        </div>

        <section class="next-card-3d">
          <div class="next-card-top">
            <span>${module ? `Module ${module.id}` : 'Next lesson'}</span>
            <span>${percent}% complete</span>
          </div>
          <h2>${escapeHtml(target.title)}</h2>
          <p>${escapeHtml(target.goals?.[0] || target.subtitle)}</p>
          <div class="progress-bar" aria-label="Course progress"><div class="progress-fill" style="width:${percent}%"></div></div>
          <button class="home-primary-3d" id="homeStartLesson">${done ? 'Continue lesson' : 'Start first lesson'} <span>→</span></button>
        </section>

        <section class="family-home-section">
          <div class="family-section-copy">
            <div class="home-kicker">LEARN WITH YOUR FAMILY</div>
            <h2>Four familiar faces.</h2>
            <p>Tap a person to see what their future learning section will focus on.</p>
          </div>
          <div class="family-people-row">${familyButtons()}</div>
        </section>

        <div class="home-mini-row">
          <button class="home-mini-card" id="homeLearn"><span>📚</span><strong>Explore course</strong><small>${lessons.length} lessons</small></button>
          <button class="home-mini-card" id="homePractice"><span>🐾</span><strong>Quick practice</strong><small>5 minutes</small></button>
        </div>
      </section>`;

    document.getElementById('homeStartLesson').addEventListener('click', () => startLesson(target.id));
    document.getElementById('homeLearn').addEventListener('click', () => window.navigate('course'));
    document.getElementById('homePractice').addEventListener('click', () => window.navigate('practice'));
    app.querySelectorAll('[data-family]').forEach(btn => btn.addEventListener('click', () => renderFamilyPreview(btn.dataset.family)));
  }

  function renderPracticePage() {
    navState('practice');
    app.innerHTML = `
      <section class="page-intro"><div class="page-icon">🐾</div><div><div class="home-kicker">PRACTICE</div><h1>Choose how to practice.</h1><p>Pick one mode. Nothing else gets in the way.</p></div></section>
      <div class="hub-grid">
        <button class="hub-card peach" id="practiceQuick"><span>⚡</span><strong>5-minute practice</strong><small>Adaptive review from lessons you already know</small></button>
        <button class="hub-card lilac" id="practiceTalk"><span>💬</span><strong>Talk to Alexey</strong><small>Short everyday conversations</small></button>
        <button class="hub-card blue" id="practiceListen"><span>🎧</span><strong>Listening</strong><small>Slow, normal and faster Russian</small></button>
        <button class="hub-card mint" id="practiceNatural"><span>✨</span><strong>Natural Russian</strong><small>Standard, casual and very casual speech</small></button>
      </div>`;
    document.getElementById('practiceQuick').addEventListener('click', () => window.startQuickPractice?.());
    document.getElementById('practiceTalk').addEventListener('click', () => window.FormommyPracticeLab?.renderDialogue?.());
    document.getElementById('practiceListen').addEventListener('click', () => window.FormommyPracticeLab?.renderListening?.());
    document.getElementById('practiceNatural').addEventListener('click', () => window.FormommyPracticeLab?.renderNatural?.());
  }

  function renderProfilePage() {
    navState('profile');
    const stats = window.FormommyLearning?.weeklyStats?.() || { sessions: 0, exercises: 0, minutes: 0 };
    const weak = window.FormommyLearning?.weakSkills?.(1)?.[0];
    const weakLabel = weak ? (window.FormommyLearning?.labels?.[weak.skill] || weak.skill) : 'No weak spot yet';
    app.innerHTML = `
      <section class="page-intro"><div class="page-icon">♡</div><div><div class="home-kicker">PROFILE</div><h1>Your progress.</h1><p>A simple view of what you have done and what needs another pass.</p></div></section>
      <section class="profile-score-card">
        <div><strong>${coursePercent()}%</strong><span>course complete</span></div>
        <div><strong>${completedCount()}</strong><span>lessons</span></div>
        <div><strong>${state.streak}</strong><span>day streak</span></div>
      </section>
      <section class="profile-panel"><div class="panel-row"><span>This week</span><strong>${stats.sessions} sessions · ${stats.minutes} min</strong></div><div class="panel-row"><span>Current focus</span><strong>${escapeHtml(weakLabel)}</strong></div><div class="panel-row"><span>Total XP</span><strong>${state.xp}</strong></div></section>
      <button class="profile-action" id="profileMistakes"><span>◎</span><div><strong>Mistake notebook</strong><small>See patterns that need more practice</small></div><b>›</b></button>
      <button class="profile-action" id="profileReview"><span>↻</span><div><strong>Smart review</strong><small>Review due vocabulary</small></div><b>›</b></button>`;
    document.getElementById('profileMistakes').addEventListener('click', () => window.FormommyLearning?.renderNotebook?.());
    document.getElementById('profileReview').addEventListener('click', () => baseNavigate('review'));
  }

  window.renderHome = renderMinimalHome;
  window.navigate = function(view) {
    if (view === 'home') return renderMinimalHome();
    if (view === 'practice') return renderPracticePage();
    if (view === 'profile') return renderProfilePage();
    if (view === 'course') {
      baseNavigate('course');
      setNav('course');
      return;
    }
    return baseNavigate(view);
  };

  window.FormommyNavigation = { renderMinimalHome, renderPracticePage, renderProfilePage, renderFamilyPreview };
})();