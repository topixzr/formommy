(() => {
  const KEY = 'formommy-state-v2';
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw || !window.FORMOMMY_COURSE) return;
    const saved = JSON.parse(raw);
    if (!saved || saved.curriculumVersion === window.FORMOMMY_COURSE.version) return;
    saved.curriculumVersion = window.FORMOMMY_COURSE.version;
    localStorage.setItem(KEY, JSON.stringify(saved));
  } catch {}
})();