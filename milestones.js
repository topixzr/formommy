(() => {
  const milestoneIds = new Set([5,10,15,20,25,30]);
  const observer = new MutationObserver(() => {
    if (!lessonSession && app.querySelector('.goal-summary') && !app.querySelector('.module-milestone')) {
      const eyebrow = app.querySelector('.eyebrow')?.textContent || '';
      const match = eyebrow.match(/Lesson\s+(\d+)\s+complete/i);
      if (!match) return;
      const lessonId = Number(match[1]);
      if (!milestoneIds.has(lessonId)) return;
      const module = typeof FORMOMMY_MODULES !== 'undefined' ? FORMOMMY_MODULES.find(m => m.lessonIds.includes(lessonId)) : null;
      if (!module) return;
      const card = document.createElement('section');
      card.className = 'card module-milestone';
      card.innerHTML = `<div class="prompt">MODULE ${module.id} COMPLETE</div><h2>${escapeHtml(module.title)}</h2><p>${escapeHtml(module.outcome)}</p><div class="milestone-can-do">${module.canDo.map(x => `<div>✓ <span>${escapeHtml(x)}</span></div>`).join('')}</div><div class="milestone-phrases">${module.phrases.slice(0,3).map(p => `<span>${escapeHtml(p)}</span>`).join('')}</div>`;
      app.querySelector('.goal-summary').insertAdjacentElement('afterend', card);
      window.FormommyLearning?.logSession?.('module-complete', module.lessonIds.length, module.lessonIds.reduce((n,id) => n + (lessonById(id)?.minutes || 0),0));
    }
  });
  observer.observe(app, { childList: true, subtree: true });
})();