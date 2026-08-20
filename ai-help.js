(() => {
  let drawerOpen = false;

  function currentContext() {
    const lesson = typeof currentLesson === 'function' ? currentLesson() : null;
    const step = typeof currentStep === 'function' ? currentStep() : null;
    return { lesson, step };
  }

  function correctAnswer(step) {
    if (!step) return '';
    return step.answerText || step.correct || step.russian || (Array.isArray(step.answers) ? step.answers[0] : '') || '';
  }

  function localExplanation(step) {
    if (!step) return 'No exercise context is available yet.';
    const g = step.grammar || {};
    const parts = (g.parts || []).map(([label, text, meaning]) => `${label}: ${text}${meaning ? ` — ${meaning}` : ''}`).join('\n');
    return [
      g.rule || 'This exercise is testing a useful Russian pattern.',
      g.order ? `Word order: ${g.order}` : '',
      g.tip ? `Remember: ${g.tip}` : '',
      parts,
      correctAnswer(step) ? `Model answer: ${correctAnswer(step)}` : ''
    ].filter(Boolean).join('\n\n');
  }

  function injectHelpButton() {
    if (currentView !== 'lesson' || document.getElementById('askAiButton')) return;
    const stage = document.querySelector('.lesson-stage');
    if (!stage) return;
    const button = document.createElement('button');
    button.id = 'askAiButton';
    button.className = 'ask-ai-fab';
    button.type = 'button';
    button.setAttribute('aria-label', 'Ask AI why this works');
    button.innerHTML = '<span>✦</span><strong>Why?</strong>';
    button.addEventListener('click', openDrawer);
    stage.appendChild(button);
  }

  function openDrawer() {
    drawerOpen = true;
    const { lesson, step } = currentContext();
    document.getElementById('aiHelpBackdrop')?.remove();
    const backdrop = document.createElement('div');
    backdrop.id = 'aiHelpBackdrop';
    backdrop.className = 'ai-help-backdrop';
    backdrop.innerHTML = `
      <section class="ai-help-drawer" role="dialog" aria-modal="true" aria-label="AI explanation">
        <div class="ai-help-handle"></div>
        <div class="ai-help-head">
          <div><div class="eyebrow">AI TUTOR · LESSON ${lesson?.id || ''}</div><h2>Why does this work?</h2></div>
          <button class="ai-help-close" id="closeAiHelp" aria-label="Close">×</button>
        </div>
        <div class="ai-context-card">
          <small>CURRENT EXERCISE</small>
          <strong>${escapeHtml(step?.prompt || lesson?.title || 'Russian practice')}</strong>
          ${correctAnswer(step) ? `<span>${escapeHtml(correctAnswer(step))}</span>` : ''}
        </div>
        <div class="ai-message ai-message-tutor" id="aiTutorMessage">${escapeHtml(localExplanation(step)).replaceAll('\n','<br>')}</div>
        <div class="ai-help-actions">
          <button class="secondary ai-prompt-chip" data-ai-prompt="simple">Explain simpler</button>
          <button class="secondary ai-prompt-chip" data-ai-prompt="examples">More examples</button>
          <button class="secondary ai-prompt-chip" data-ai-prompt="russian">Explain in Russian</button>
        </div>
        <label class="ai-question-box" for="aiQuestion">
          <span>Ask about this exercise</span>
          <div><input id="aiQuestion" placeholder="Why is it домой, not дома?" autocomplete="off" /><button id="sendAiQuestion">Ask</button></div>
        </label>
        <p class="ai-offline-note">Context help is available now. Free-form AI answers will use the same panel when the secure AI connection is enabled.</p>
      </section>`;
    document.body.appendChild(backdrop);
    document.getElementById('closeAiHelp').addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeDrawer(); });
    document.querySelectorAll('.ai-prompt-chip').forEach(btn => btn.addEventListener('click', () => showPreset(btn.dataset.aiPrompt)));
    document.getElementById('sendAiQuestion').addEventListener('click', handleQuestion);
    document.getElementById('aiQuestion').addEventListener('keydown', e => { if (e.key === 'Enter') handleQuestion(); });
    setTimeout(() => document.getElementById('aiQuestion')?.focus(), 80);
  }

  function closeDrawer() {
    drawerOpen = false;
    document.getElementById('aiHelpBackdrop')?.remove();
  }

  function showPreset(type) {
    const { step } = currentContext();
    const g = step?.grammar || {};
    const answer = correctAnswer(step);
    const messages = {
      simple: `${g.rule || 'This is the pattern to remember.'}${answer ? `\n\nThink of “${answer}” as one useful chunk first. You can learn the full grammar rule later.` : ''}`,
      examples: `${g.rule || 'Same pattern, new sentence.'}\n\nTry to notice the structure rather than memorize only one sentence. Look for the same word role and ending in the next examples from this lesson.`,
      russian: `${g.rule ? `Правило: ${g.rule}` : 'Это полезная конструкция русского языка.'}${g.order ? `\n\nПорядок слов: ${g.order}` : ''}${answer ? `\n\nПравильный вариант: ${answer}` : ''}`
    };
    const target = document.getElementById('aiTutorMessage');
    if (target) target.innerHTML = escapeHtml(messages[type] || localExplanation(step)).replaceAll('\n','<br>');
  }

  function handleQuestion() {
    const input = document.getElementById('aiQuestion');
    const question = input?.value.trim();
    if (!question) return;
    const { step } = currentContext();
    const target = document.getElementById('aiTutorMessage');
    if (target) {
      target.innerHTML = `<div class="ai-user-question">${escapeHtml(question)}</div><div class="ai-local-answer">${escapeHtml(localExplanation(step)).replaceAll('\n','<br>')}</div><div class="ai-coming-soon">Free-form follow-up reasoning will appear here after the secure AI endpoint is connected.</div>`;
    }
    input.value = '';
  }

  const originalRenderLesson = window.renderLesson;
  if (typeof originalRenderLesson === 'function') {
    window.renderLesson = function (...args) {
      if (drawerOpen) closeDrawer();
      const result = originalRenderLesson.apply(this, args);
      requestAnimationFrame(injectHelpButton);
      return result;
    };
  }

  const originalNavigate = window.navigate;
  if (typeof originalNavigate === 'function') {
    window.navigate = function (...args) {
      if (drawerOpen) closeDrawer();
      const result = originalNavigate.apply(this, args);
      if (args[0] === 'lesson') requestAnimationFrame(injectHelpButton);
      return result;
    };
  }

  if (currentView === 'lesson') requestAnimationFrame(injectHelpButton);
})();