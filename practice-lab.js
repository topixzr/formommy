(() => {
  const DIALOGUES = [
    {
      title: 'Dinner at home', context: 'A normal evening decision.',
      turns: [
        ['Alex','Что будем есть?','What are we going to eat?'],
        ['You','Не знаю. Давай закажем пиццу.','I don’t know. Let’s order pizza.'],
        ['Alex','Хорошо. Какую?','Okay. Which one?'],
        ['You','Давай пепперони.','Let’s get pepperoni.']
      ]
    },
    {
      title: 'Coming home', context: 'A quick text-style check-in.',
      turns: [
        ['Alex','Ты скоро будешь дома?','Will you be home soon?'],
        ['You','Да, я уже еду.','Yes, I’m already on my way.'],
        ['Alex','Хочешь кофе?','Do you want coffee?'],
        ['You','Да, пожалуйста.','Yes, please.']
      ]
    },
    {
      title: 'Dogs and plans', context: 'Coordinate a normal dog walk.',
      turns: [
        ['Alex','Пойдём гулять с собаками?','Shall we walk the dogs?'],
        ['You','Давай. Только через десять минут.','Sure. Just in ten minutes.'],
        ['Alex','Хорошо.','Okay.'],
        ['You','Я буду готова.','I’ll be ready.']
      ]
    },
    {
      title: 'Weekend in Eugene', context: 'Make a simple Saturday plan.',
      turns: [
        ['Alex','Какие планы на сегодня?','What are the plans for today?'],
        ['You','Давай сначала выпьем кофе.','Let’s have coffee first.'],
        ['Alex','А потом?','And then?'],
        ['You','Потом поедем гулять с собаками.','Then we’ll go walk the dogs.']
      ]
    }
  ];

  const NATURAL = [
    ['Что ты делаешь?','Ты что делаешь?','Ты чё делаешь?','What are you doing?'],
    ['Сейчас приду.','Щас приду.','Щас буду.','I’ll be there in a moment.'],
    ['Что будем делать?','Ну что, что будем делать?','Ну чё, что делаем?','What are we going to do?'],
    ['Я не знаю.','Не знаю.','Без понятия.','I don’t know.'],
    ['Хорошо.','Ладно.','Окей.','Okay.']
  ];

  const LISTENING = [
    ['Ты скоро будешь дома?','Will you be home soon?'],
    ['Я уже еду.','I’m already on my way.'],
    ['Что будем есть?','What are we going to eat?'],
    ['Пойдём гулять с собаками?','Shall we walk the dogs?'],
    ['Какие планы на выходные?','What are the plans for the weekend?'],
    ['Мне нужно заправиться.','I need to get gas.']
  ];

  let dialogueIndex = 0, turnIndex = 0, listeningIndex = 0, listeningRate = 0.82;

  function speakAt(text, rate = 0.82) {
    if (!('speechSynthesis' in window)) return alert('Speech is not available in this browser.');
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ru-RU'; u.rate = rate;
    const voice = speechSynthesis.getVoices().find(v => v.lang?.toLowerCase().startsWith('ru'));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  }

  function renderPracticeHub() {
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Practice lab</div><h1>Turn lessons into usable Russian.</h1><p>Choose a mode based on the skill you want to train right now.</p></section>
      <div class="practice-grid">
        <button class="card practice-mode" data-mode="dialogue"><span>💬</span><div><strong>Talk to Alex</strong><small>Short real-life dialogues</small></div></button>
        <button class="card practice-mode" data-mode="speaking"><span>🎙</span><div><strong>Speaking</strong><small>Say a phrase and see if the browser understands it</small></div></button>
        <button class="card practice-mode" data-mode="listening"><span>🎧</span><div><strong>Listening levels</strong><small>Slow → normal → no text</small></div></button>
        <button class="card practice-mode" data-mode="natural"><span>⚡</span><div><strong>Natural Russian</strong><small>Standard vs casual vs very casual</small></div></button>
        <button class="card practice-mode" data-mode="recall"><span>✦</span><div><strong>Open recall</strong><small>Existing husband-focused phrase practice</small></div></button>
      </div>`;
    app.querySelectorAll('[data-mode]').forEach(btn => btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      if (mode === 'dialogue') renderDialogue();
      if (mode === 'speaking') renderSpeaking();
      if (mode === 'listening') renderListening();
      if (mode === 'natural') renderNatural();
      if (mode === 'recall') originalPractice();
    }));
  }

  function renderDialogue() {
    const d = DIALOGUES[dialogueIndex], shown = d.turns.slice(0, turnIndex + 1);
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Talk to Alex · ${dialogueIndex + 1}/${DIALOGUES.length}</div><h1>${escapeHtml(d.title)}</h1><p>${escapeHtml(d.context)}</p></section>
      <section class="card dialogue-card">${shown.map(([who,ru,en],i) => `<div class="dialogue-turn ${who === 'You' ? 'you' : 'alex'}"><small>${escapeHtml(who)}</small><strong>${escapeHtml(ru)}</strong><span>${i === turnIndex ? escapeHtml(en) : ''}</span><button class="mini-link dialogue-speak" data-speech="${escapeAttribute(ru)}">🔊</button></div>`).join('')}</section>
      <div class="button-row">${turnIndex < d.turns.length - 1 ? '<button class="primary" id="nextTurn">Next line</button>' : '<button class="primary" id="nextDialogue">Next dialogue</button>'}<button class="secondary" id="practiceHub">Modes</button></div>`;
    app.querySelectorAll('.dialogue-speak').forEach(b => b.addEventListener('click', () => speakAt(b.dataset.speech)));
    document.getElementById('nextTurn')?.addEventListener('click', () => { turnIndex++; renderDialogue(); });
    document.getElementById('nextDialogue')?.addEventListener('click', () => { dialogueIndex = (dialogueIndex + 1) % DIALOGUES.length; turnIndex = 0; window.FormommyLearning?.logSession?.('dialogue', d.turns.length, 4); renderDialogue(); });
    document.getElementById('practiceHub').addEventListener('click', renderPracticeHub);
  }

  function availableRecognition() { return window.SpeechRecognition || window.webkitSpeechRecognition; }

  function renderSpeaking() {
    const phrases = course.couplePractice.filter(x => x.target).slice(0, 12);
    const item = phrases[Math.floor(Math.random() * phrases.length)] || { target:'Хочешь кофе?', help:'Do you want coffee?' };
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Speaking practice</div><h1>Say it out loud.</h1><p>The goal is intelligibility, not a fake pronunciation score.</p></section>
      <section class="card speaking-card"><div class="translation">${escapeHtml(item.help)}</div><div class="phrase-russian">${escapeHtml(item.target)}</div><button class="secondary" id="hearTarget">🔊 Hear model</button><button class="primary" id="recordSpeech">🎙 Say this phrase</button><div id="speechResult" class="speech-result"></div></section>
      <button class="text-button" id="practiceHub">Back to modes</button>`;
    document.getElementById('hearTarget').addEventListener('click', () => speakAt(item.target));
    document.getElementById('practiceHub').addEventListener('click', renderPracticeHub);
    document.getElementById('recordSpeech').addEventListener('click', () => {
      const Recognition = availableRecognition();
      if (!Recognition) {
        document.getElementById('speechResult').innerHTML = '<div class="feedback wrong-feedback"><strong>Speech recognition is unavailable here.</strong><span>You can still use the model audio and repeat aloud.</span></div>';
        return;
      }
      const rec = new Recognition(); rec.lang = 'ru-RU'; rec.interimResults = false; rec.maxAlternatives = 3;
      document.getElementById('speechResult').innerHTML = '<p>Listening…</p>';
      rec.onresult = e => {
        const heard = [...e.results[0]].map(x => x.transcript);
        const target = normalizeAnswer(item.target);
        const matched = heard.some(t => {
          const words = normalizeAnswer(t).split(' '), wanted = target.split(' ');
          return wanted.filter(w => words.includes(w)).length >= Math.max(1, Math.ceil(wanted.length * .65));
        });
        document.getElementById('speechResult').innerHTML = `<div class="feedback ${matched ? 'correct-feedback' : 'wrong-feedback'}"><strong>${matched ? 'Recognized.' : 'Try once more.'}</strong><span>${escapeHtml(heard[0] || '')}</span></div>`;
        window.FormommyLearning?.logSession?.('speaking', 1, 2);
      };
      rec.onerror = () => { document.getElementById('speechResult').innerHTML = '<p>Could not capture speech. Try again or use model audio.</p>'; };
      rec.start();
    });
  }

  function renderListening() {
    const [ru,en] = LISTENING[listeningIndex];
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Listening lab</div><h1>Train the ear separately.</h1><p>Slow is for decoding; normal is the target.</p></section>
      <section class="card listening-lab"><div class="listening-levels"><button data-rate="0.62" class="secondary ${listeningRate===0.62?'active':''}">Slow</button><button data-rate="0.82" class="secondary ${listeningRate===0.82?'active':''}">Normal</button><button data-rate="0.98" class="secondary ${listeningRate===0.98?'active':''}">Fast</button></div><button class="audio-button audio-large" id="playListening">🔊</button><div id="listenReveal" class="hidden"><div class="phrase-russian">${escapeHtml(ru)}</div><div class="translation">${escapeHtml(en)}</div></div><button class="primary" id="revealListening">Show text</button></section>
      <div class="button-row"><button class="secondary" id="nextListening">Next →</button><button class="secondary" id="practiceHub">Modes</button></div>`;
    document.getElementById('playListening').addEventListener('click', () => speakAt(ru,listeningRate));
    app.querySelectorAll('[data-rate]').forEach(b => b.addEventListener('click', () => { listeningRate = Number(b.dataset.rate); renderListening(); }));
    document.getElementById('revealListening').addEventListener('click', () => { document.getElementById('listenReveal').classList.remove('hidden'); document.getElementById('revealListening').classList.add('hidden'); });
    document.getElementById('nextListening').addEventListener('click', () => { listeningIndex=(listeningIndex+1)%LISTENING.length; window.FormommyLearning?.logSession?.('listening',1,2); renderListening(); });
    document.getElementById('practiceHub').addEventListener('click', renderPracticeHub);
  }

  function renderNatural() {
    app.innerHTML = `<section class="hero compact-hero"><div class="eyebrow">Natural Russian</div><h1>Know what sounds normal.</h1><p>Learn the standard form first. Casual speech is context, not a replacement for grammar.</p></section>
      <div class="natural-list">${NATURAL.map(([standard,casual,veryCasual,en]) => `<section class="card natural-card"><div class="translation">${escapeHtml(en)}</div><div><small>STANDARD</small><strong>${escapeHtml(standard)}</strong></div><div><small>CASUAL</small><strong>${escapeHtml(casual)}</strong></div><div><small>VERY CASUAL</small><strong>${escapeHtml(veryCasual)}</strong></div><button class="secondary natural-speak" data-speech="${escapeAttribute(casual)}">🔊 Hear casual</button></section>`).join('')}</div><button class="text-button" id="practiceHub">Back to modes</button>`;
    app.querySelectorAll('.natural-speak').forEach(b => b.addEventListener('click', () => speakAt(b.dataset.speech,.9)));
    document.getElementById('practiceHub').addEventListener('click', renderPracticeHub);
  }

  const originalPractice = window.renderPractice;
  window.renderPractice = renderPracticeHub;
  window.FormommyPracticeLab = { renderPracticeHub, renderDialogue, renderSpeaking, renderListening, renderNatural };
})();