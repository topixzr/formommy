(() => {
  const DB_NAME = 'formommy-backup';
  const STORE = 'snapshots';
  const SNAPSHOT_KEY = 'latest';
  const LAST_BACKUP_KEY = 'formommy-last-export';
  let lastSerialized = '';

  function collectLocalState() {
    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('formommy-')) storage[key] = localStorage.getItem(key);
    }
    return {
      format: 'formommy-backup-v1',
      createdAt: new Date().toISOString(),
      storage,
    };
  }

  function openDb() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB unavailable'));
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open backup database'));
    });
  }

  async function putSnapshot(snapshot = collectLocalState()) {
    const serialized = JSON.stringify(snapshot.storage);
    if (serialized === lastSerialized) return;
    lastSerialized = serialized;
    try {
      const db = await openDb();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readwrite');
        tx.objectStore(STORE).put(snapshot, SNAPSHOT_KEY);
        tx.oncomplete = resolve;
        tx.onerror = () => reject(tx.error);
      });
      db.close();
    } catch {}
  }

  async function getSnapshot() {
    try {
      const db = await openDb();
      const value = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE, 'readonly');
        const request = tx.objectStore(STORE).get(SNAPSHOT_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
      db.close();
      return value;
    } catch { return null; }
  }

  function restoreSnapshot(snapshot) {
    if (!snapshot || snapshot.format !== 'formommy-backup-v1' || !snapshot.storage) throw new Error('This is not a valid Formommy backup.');
    Object.entries(snapshot.storage).forEach(([key, value]) => {
      if (key.startsWith('formommy-') && typeof value === 'string') localStorage.setItem(key, value);
    });
  }

  async function recoverIfNeeded() {
    const hasMainState = Boolean(localStorage.getItem('formommy-state-v2'));
    if (hasMainState) return;
    const snapshot = await getSnapshot();
    if (!snapshot?.storage?.['formommy-state-v2']) return;
    restoreSnapshot(snapshot);
    sessionStorage.setItem('formommy-recovered', '1');
    location.reload();
  }

  function buildBackupFile() {
    const snapshot = collectLocalState();
    const text = JSON.stringify(snapshot, null, 2);
    const date = new Date().toISOString().slice(0, 10);
    return new File([text], `formommy-progress-${date}.json`, { type: 'application/json' });
  }

  async function exportBackup() {
    const file = buildBackupFile();
    let shared = false;
    try {
      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ title: 'Formommy progress backup', text: 'Save this file somewhere safe, such as Files or iCloud Drive.', files: [file] });
        shared = true;
      }
    } catch (error) {
      if (error?.name === 'AbortError') return { ok: false, cancelled: true };
    }
    if (!shared) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url; a.download = file.name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    localStorage.setItem(LAST_BACKUP_KEY, new Date().toISOString());
    await putSnapshot();
    return { ok: true, shared };
  }

  function importBackupFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const snapshot = JSON.parse(String(reader.result || ''));
          restoreSnapshot(snapshot);
          await putSnapshot(snapshot);
          resolve(snapshot);
        } catch (error) { reject(error); }
      };
      reader.onerror = () => reject(reader.error || new Error('Could not read backup file.'));
      reader.readAsText(file);
    });
  }

  function backupAgeLabel() {
    const raw = localStorage.getItem(LAST_BACKUP_KEY);
    if (!raw) return 'No external backup yet';
    const days = Math.floor((Date.now() - new Date(raw).getTime()) / 86400000);
    if (days <= 0) return 'Backed up today';
    if (days === 1) return 'Backed up yesterday';
    return `Backed up ${days} days ago`;
  }

  function augmentProfile() {
    if (document.getElementById('profileBackup')) return;
    const actions = app.querySelectorAll('.profile-action');
    const anchor = actions[actions.length - 1];
    if (!anchor) return;
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <section class="profile-panel" style="margin-top:18px">
        <div class="panel-row"><span>Progress safety</span><strong>Local mirror active</strong></div>
        <div class="panel-row"><span>External backup</span><strong id="backupAgeLabel">${backupAgeLabel()}</strong></div>
      </section>
      <button class="profile-action" id="profileBackup"><span>☁︎</span><div><strong>Save progress backup</strong><small>Share or save a recovery file to Files / iCloud</small></div><b>›</b></button>
      <button class="profile-action" id="profileRestore"><span>↥</span><div><strong>Restore progress</strong><small>Recover from a Formommy backup file</small></div><b>›</b></button>
      <input id="profileRestoreInput" type="file" accept="application/json,.json" hidden />`;
    anchor.insertAdjacentElement('afterend', wrap);
    document.getElementById('profileBackup').addEventListener('click', async () => {
      const result = await exportBackup();
      if (result?.ok) document.getElementById('backupAgeLabel').textContent = backupAgeLabel();
    });
    const input = document.getElementById('profileRestoreInput');
    document.getElementById('profileRestore').addEventListener('click', () => input.click());
    input.addEventListener('change', async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        await importBackupFile(file);
        alert('Progress restored. Formommy will reload now.');
        location.reload();
      } catch (error) {
        alert(error?.message || 'Could not restore this backup.');
      }
    });
  }

  const previousNavigate = window.navigate;
  window.navigate = function(view) {
    const result = previousNavigate(view);
    if (view === 'profile') requestAnimationFrame(augmentProfile);
    return result;
  };

  window.FormommyPersistence = { collectLocalState, putSnapshot, getSnapshot, exportBackup, importBackupFile, backupAgeLabel, augmentProfile };

  if (navigator.storage?.persist) navigator.storage.persist().catch(() => {});
  recoverIfNeeded().finally(() => {
    putSnapshot();
    setInterval(putSnapshot, 4000);
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') putSnapshot(); });
    window.addEventListener('pagehide', () => putSnapshot());
  });
})();