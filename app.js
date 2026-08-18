const app = document.getElementById('app');
const bottomNav = document.getElementById('bottomNav');
const backButton = document.getElementById('backButton');
const streakCount = document.getElementById('streakCount');
const brandButton = document.getElementById('brandButton');

const STORAGE_KEY = 'formommy-state-a1a2-v1';

const defaultState = {
  onboarded: false,
  completedLessons: [],
  xp: 0,
  streak: 1,
  lastVisit: null,
};

const lessons = [
  {
    id: 1,
    title: 'Вчера',
    subtitle: 'Simple past tense for everyday speech',
    minutes: 11,
    xp: 70,
    level: 'A1 → A2',
    vocab: [
      { russian: 'вчера', translit: 'vchera', english: 'yesterday' },
      { russian: 'Я работала.', translit: 'Ya rabotala.', english: 'I worked. (female speaker)' },
      { russian: 'Я была дома.', translit: 'Ya byla doma.', english: 'I was at home. (female speaker)' },
    ],
    steps: [
      {
        type: 'learn',
        prompt: 'Start with one clear past-tense sentence',
        russian: 'Вчера я работала.',
        translit: 'Vchera ya rabotala.',
        translation: 'Yesterday I worked.',
        note: 'For a female speaker, many Russian past-tense verbs end in -ла. Here: работать → работала.',
        grammar: {
          rule: 'Past tense, female speaker: many verbs use -ла.',
          parts: [
            ['TIME', 'Вчера', 'when?'],
            ['SUBJECT', 'я', 'who?'],
            ['PREDICATE', 'работала', 'what did she do?'],
          ],
          order: 'Russian often puts time first: «Вчера я работала». «Я работала вчера» is also correct, but the first version sounds very natural when answering “What did you do yesterday?”',
        },
      },
      {
        type: 'choice',
        prompt: 'Which sentence means “Yesterday I worked”?',
        answers: ['Вчера я работала.', 'Завтра я работала.', 'Вчера я работаю.'],
        correct: 'Вчера я работала.',
        grammar: {
          rule: 'Use a past-tense verb with «вчера».',
          parts: [
            ['TIME', 'вчера', 'past-time signal'],
            ['SUBJECT', 'я', 'the person'],
            ['PREDICATE', 'работала', 'past action'],
          ],
          order: 'The easiest pattern is TIME + SUBJECT + PREDICATE.',
        },
      },
      {
        type: 'learn',
        prompt: 'A very common past-tense sentence',
        russian: 'Я была дома.',
        translit: 'Ya byla doma.',
        translation: 'I was at home.',
        note: '«Была» is the feminine past form of «быть» — “to be.” A male speaker would say «Я был дома».',
        grammar: {
          rule: 'Past tense of “to be”: была for a female speaker, был for a male speaker.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE', 'была', 'was'],
            ['PLACE', 'дома', 'where?'],
          ],
          order: 'SUBJECT + PREDICATE + PLACE is the simplest neutral order here.',
        },
      },
      {
        type: 'listen',
        prompt: 'Listen and choose the sentence you hear',
        speech: 'Вчера я была дома.',
        answers: ['Вчера я была дома.', 'Завтра я буду дома.', 'Я работала утром.'],
        correct: 'Вчера я была дома.',
        translation: 'Yesterday I was at home.',
        grammar: {
          rule: 'Listen for both the time word «вчера» and the feminine past form «была».',
          parts: [
            ['TIME', 'Вчера', 'yesterday'],
            ['SUBJECT', 'я', 'I'],
            ['PREDICATE', 'была', 'was'],
            ['PLACE', 'дома', 'at home'],
          ],
          order: 'TIME + SUBJECT + PREDICATE + PLACE.',
        },
      },
      {
        type: 'build',
        prompt: 'Build: “Yesterday I worked.”',
        chips: ['работала', 'Вчера', 'я'],
        correct: ['Вчера', 'я', 'работала'],
        answerText: 'Вчера я работала.',
        grammar: {
          rule: 'Put the time first, then who, then the action.',
          parts: [
            ['TIME', 'Вчера', 'when?'],
            ['SUBJECT', 'я', 'who?'],
            ['PREDICATE', 'работала', 'what happened?'],
          ],
          order: 'TIME → SUBJECT → PREDICATE.',
        },
      },
      {
        type: 'type',
        prompt: 'Type “yesterday” in Russian',
        placeholder: 'в…',
        answers: ['вчера'],
        hint: 'в-ч-е-р-а',
        answerText: 'вчера',
        grammar: {
          rule: '«Вчера» is an adverb of time. It does not change form.',
          parts: [['TIME WORD', 'вчера', 'yesterday']],
          order: 'It can go at the beginning or end of a sentence. Beginning position is especially common when setting the time context.',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Завтра',
    subtitle: 'Simple future with буду + infinitive',
    minutes: 12,
    xp: 80,
    level: 'A1 → A2',
    vocab: [
      { russian: 'завтра', translit: 'zavtra', english: 'tomorrow' },
      { russian: 'Я буду работать.', translit: 'Ya budu rabotat.', english: 'I will work.' },
      { russian: 'Я буду готовить.', translit: 'Ya budu gotovit.', english: 'I will cook.' },
    ],
    steps: [
      {
        type: 'learn',
        prompt: 'Use the easiest future pattern',
        russian: 'Завтра я буду работать.',
        translit: 'Zavtra ya budu rabotat.',
        translation: 'Tomorrow I will work.',
        note: 'A very useful future pattern is «буду + infinitive». The infinitive is the dictionary form: работать, готовить, отдыхать.',
        grammar: {
          rule: 'Future: буду + infinitive.',
          parts: [
            ['TIME', 'Завтра', 'when?'],
            ['SUBJECT', 'я', 'who?'],
            ['PREDICATE', 'буду работать', 'will work'],
          ],
          order: 'TIME + SUBJECT + PREDICATE is a clear beginner pattern.',
        },
      },
      {
        type: 'choice',
        prompt: 'Which sentence means “Tomorrow I will cook”?',
        answers: ['Завтра я буду готовить.', 'Вчера я готовила.', 'Сейчас я готовлю.'],
        correct: 'Завтра я буду готовить.',
        grammar: {
          rule: 'For this future pattern, look for «буду + infinitive».',
          parts: [
            ['TIME', 'Завтра', 'tomorrow'],
            ['SUBJECT', 'я', 'I'],
            ['PREDICATE', 'буду готовить', 'will cook'],
          ],
          order: 'The words «буду готовить» stay together as one predicate phrase.',
        },
      },
      {
        type: 'learn',
        prompt: 'Change only the main verb',
        russian: 'Я буду отдыхать.',
        translit: 'Ya budu otdykhat.',
        translation: 'I will rest.',
        note: 'Keep «я буду» and replace the infinitive: работать → готовить → отдыхать.',
        grammar: {
          rule: 'Subject + буду + infinitive.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['AUXILIARY', 'буду', 'marks future'],
            ['INFINITIVE', 'отдыхать', 'main action'],
          ],
          order: '«Буду» comes before the infinitive: «буду отдыхать», not «отдыхать буду» for the neutral beginner pattern.',
        },
      },
      {
        type: 'listen',
        prompt: 'Listen and choose the future sentence',
        speech: 'Завтра я буду работать.',
        answers: ['Завтра я буду работать.', 'Вчера я работала.', 'Я работаю сейчас.'],
        correct: 'Завтра я буду работать.',
        translation: 'Tomorrow I will work.',
        grammar: {
          rule: 'Future signals: «завтра» + «буду».',
          parts: [
            ['TIME', 'Завтра', 'tomorrow'],
            ['SUBJECT', 'я', 'I'],
            ['PREDICATE', 'буду работать', 'will work'],
          ],
          order: 'Hear the future marker «буду» before the infinitive.',
        },
      },
      {
        type: 'build',
        prompt: 'Build: “Tomorrow I will rest.”',
        chips: ['я', 'Завтра', 'буду отдыхать'],
        correct: ['Завтра', 'я', 'буду отдыхать'],
        answerText: 'Завтра я буду отдыхать.',
        grammar: {
          rule: 'TIME → SUBJECT → FUTURE PREDICATE.',
          parts: [
            ['TIME', 'Завтра', 'when?'],
            ['SUBJECT', 'я', 'who?'],
            ['PREDICATE', 'буду отдыхать', 'what will happen?'],
          ],
          order: 'Keep «буду отдыхать» together.',
        },
      },
      {
        type: 'type',
        prompt: 'Type “tomorrow” in Russian',
        placeholder: 'з…',
        answers: ['завтра'],
        hint: 'з-а-в-т-р-а',
        answerText: 'завтра',
        grammar: {
          rule: '«Завтра» is an adverb of time and does not change form.',
          parts: [['TIME WORD', 'завтра', 'tomorrow']],
          order: 'Putting it first immediately tells the listener that the sentence is about the future.',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Куда? Где?',
    subtitle: 'Going somewhere vs already being there',
    minutes: 13,
    xp: 90,
    level: 'A1 → A2',
    vocab: [
      { russian: 'Я иду в магазин.', translit: 'Ya idu v magazin.', english: 'I am going to the store.' },
      { russian: 'Я в магазине.', translit: 'Ya v magazine.', english: 'I am in the store.' },
      { russian: 'куда?', translit: 'kuda?', english: 'where to?' },
      { russian: 'где?', translit: 'gde?', english: 'where?' },
    ],
    steps: [
      {
        type: 'learn',
        prompt: 'First: movement to a place',
        russian: 'Я иду в магазин.',
        translit: 'Ya idu v magazin.',
        translation: 'I am going to the store.',
        note: 'Use «в магазин» when there is movement toward the store. The question is «Куда?» — “Where to?”',
        grammar: {
          rule: 'Movement: идти + в + destination.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE', 'иду', 'am going'],
            ['DIRECTION', 'в магазин', 'where to?'],
          ],
          order: 'SUBJECT + PREDICATE + DIRECTION.',
        },
      },
      {
        type: 'learn',
        prompt: 'Now: already inside the place',
        russian: 'Я в магазине.',
        translit: 'Ya v magazine.',
        translation: 'I am in the store.',
        note: 'When you are already there, Russian changes the noun ending: магазин → магазине.',
        grammar: {
          rule: 'Location: в + place ending in -е in this example.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PLACE', 'в магазине', 'where?'],
          ],
          order: 'Russian normally omits “am/is/are” in the present tense. So «Я в магазине» literally has no spoken verb “am.”',
        },
      },
      {
        type: 'choice',
        prompt: 'You are already inside the store. Which sentence is correct?',
        answers: ['Я в магазине.', 'Я иду в магазин.', 'Я магазин.'],
        correct: 'Я в магазине.',
        grammar: {
          rule: 'Ask yourself: movement or location? Here it is location.',
          parts: [
            ['SUBJECT', 'Я', 'I'],
            ['PLACE', 'в магазине', 'in the store'],
          ],
          order: 'For location, use «Я + в + place». No present-tense “am” is needed.',
        },
      },
      {
        type: 'listen',
        prompt: 'Listen: is the person going there or already there?',
        speech: 'Я иду в магазин.',
        answers: ['Going to the store', 'Already in the store', 'Leaving the store'],
        correct: 'Going to the store',
        translation: 'Я иду в магазин.',
        grammar: {
          rule: 'The verb «иду» tells you there is movement.',
          parts: [
            ['SUBJECT', 'Я', 'I'],
            ['PREDICATE', 'иду', 'am going'],
            ['DIRECTION', 'в магазин', 'to the store'],
          ],
          order: 'Verb of movement + destination means “where to?”',
        },
      },
      {
        type: 'build',
        prompt: 'Build: “I am going to the store.”',
        chips: ['в магазин', 'Я', 'иду'],
        correct: ['Я', 'иду', 'в магазин'],
        answerText: 'Я иду в магазин.',
        grammar: {
          rule: 'SUBJECT → PREDICATE → DIRECTION.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE', 'иду', 'what am I doing?'],
            ['DIRECTION', 'в магазин', 'where to?'],
          ],
          order: 'This is the neutral, easiest word order to learn first.',
        },
      },
      {
        type: 'choice',
        prompt: 'Which pair is correct?',
        answers: ['в магазин → в магазине', 'в магазине → в магазином', 'в магазин → на магазине'],
        correct: 'в магазин → в магазине',
        grammar: {
          rule: 'Remember the pair as a chunk: «в магазин» = to the store, «в магазине» = in the store.',
          parts: [
            ['DIRECTION', 'в магазин', 'where to?'],
            ['LOCATION', 'в магазине', 'where?'],
          ],
          order: 'Do not memorize a full case table yet; memorize this useful contrast first.',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Мне нравится',
    subtitle: 'Two easy ways to say what you like',
    minutes: 13,
    xp: 90,
    level: 'A1 → A2',
    vocab: [
      { russian: 'Мне нравится кофе.', translit: 'Mne nravitsya kofe.', english: 'I like coffee.' },
      { russian: 'Я люблю кофе.', translit: 'Ya lyublyu kofe.', english: 'I love / really like coffee.' },
      { russian: 'Мне нравится этот город.', translit: 'Mne nravitsya etot gorod.', english: 'I like this city.' },
    ],
    steps: [
      {
        type: 'learn',
        prompt: 'The common Russian pattern for “I like…”',
        russian: 'Мне нравится кофе.',
        translit: 'Mne nravitsya kofe.',
        translation: 'I like coffee.',
        note: 'Russian structures this differently from English. «Мне» means “to me,” and «нравится» is closer to “is pleasing.”',
        grammar: {
          rule: 'Мне + нравится + thing.',
          parts: [
            ['EXPERIENCER', 'Мне', 'to me'],
            ['PREDICATE', 'нравится', 'is pleasing / is liked'],
            ['SUBJECT', 'кофе', 'the thing that is liked'],
          ],
          order: 'The natural beginner pattern is «Мне нравится + thing». The grammatical subject comes after the verb here.',
        },
      },
      {
        type: 'choice',
        prompt: 'Which sentence means “I like coffee”?',
        answers: ['Мне нравится кофе.', 'Я нравится кофе.', 'Мне кофе нравится я.'],
        correct: 'Мне нравится кофе.',
        grammar: {
          rule: 'Do not translate English “I like” word-for-word. Use the Russian pattern «Мне нравится…».',
          parts: [
            ['EXPERIENCER', 'Мне', 'to me'],
            ['PREDICATE', 'нравится', 'is pleasing'],
            ['SUBJECT', 'кофе', 'coffee'],
          ],
          order: 'Мне → нравится → thing.',
        },
      },
      {
        type: 'learn',
        prompt: 'A second useful pattern',
        russian: 'Я люблю кофе.',
        translit: 'Ya lyublyu kofe.',
        translation: 'I love / really like coffee.',
        note: '«Я люблю…» is structurally closer to English: subject + verb + object. It often sounds stronger than «мне нравится».',
        grammar: {
          rule: 'Я + люблю + object.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE', 'люблю', 'love / really like'],
            ['OBJECT', 'кофе', 'what?'],
          ],
          order: 'SUBJECT + PREDICATE + OBJECT.',
        },
      },
      {
        type: 'listen',
        prompt: 'Listen and choose the meaning',
        speech: 'Мне нравится этот город.',
        answers: ['I like this city.', 'I live in this city.', 'This city likes me.'],
        correct: 'I like this city.',
        translation: 'Мне нравится этот город.',
        grammar: {
          rule: '«Мне нравится…» describes what is pleasing to the speaker.',
          parts: [
            ['EXPERIENCER', 'Мне', 'to me'],
            ['PREDICATE', 'нравится', 'is pleasing'],
            ['SUBJECT', 'этот город', 'this city'],
          ],
          order: 'The liked thing can come after «нравится».',
        },
      },
      {
        type: 'build',
        prompt: 'Build: “I like this city.”',
        chips: ['этот город', 'Мне', 'нравится'],
        correct: ['Мне', 'нравится', 'этот город'],
        answerText: 'Мне нравится этот город.',
        grammar: {
          rule: 'Use the fixed frame «Мне нравится + thing».',
          parts: [
            ['EXPERIENCER', 'Мне', 'to me'],
            ['PREDICATE', 'нравится', 'is pleasing'],
            ['SUBJECT', 'этот город', 'this city'],
          ],
          order: 'Мне → нравится → этот город.',
        },
      },
      {
        type: 'type',
        prompt: 'Type the verb “нравится”',
        placeholder: 'н…',
        answers: ['нравится'],
        hint: 'н-р-а-в-и-т-с-я',
        answerText: 'нравится',
        grammar: {
          rule: 'Learn «нравится» as one whole form first.',
          parts: [['PREDICATE', 'нравится', 'is pleasing / is liked']],
          order: 'At this stage, use it in the frame «Мне нравится…».',
        },
      },
    ],
  },
  {
    id: 5,
    title: 'И, но, потому что',
    subtitle: 'Connect two simple thoughts',
    minutes: 14,
    xp: 100,
    level: 'A1 → A2',
    vocab: [
      { russian: 'и', translit: 'i', english: 'and' },
      { russian: 'но', translit: 'no', english: 'but' },
      { russian: 'потому что', translit: 'potomu chto', english: 'because' },
      { russian: 'Я устала.', translit: 'Ya ustala.', english: 'I am tired. (female speaker)' },
    ],
    steps: [
      {
        type: 'learn',
        prompt: 'Connect two actions with “and”',
        russian: 'Я работаю и учу русский.',
        translit: 'Ya rabotayu i uchu russkiy.',
        translation: 'I work and I study Russian.',
        note: 'When the same person does both actions, Russian usually does not repeat «я».',
        grammar: {
          rule: 'One subject can control two predicates connected by «и».',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE 1', 'работаю', 'first action'],
            ['CONNECTOR', 'и', 'and'],
            ['PREDICATE 2', 'учу', 'second action'],
            ['OBJECT', 'русский', 'what?'],
          ],
          order: 'SUBJECT + ACTION 1 + и + ACTION 2 + OBJECT.',
        },
      },
      {
        type: 'learn',
        prompt: 'Show contrast with “but”',
        russian: 'Я люблю кофе, но сейчас пью чай.',
        translit: 'Ya lyublyu kofe, no seychas pyu chay.',
        translation: 'I like coffee, but right now I am drinking tea.',
        note: '«Но» connects two ideas that contrast with each other.',
        grammar: {
          rule: 'Use «но» between two contrasting parts.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PREDICATE 1', 'люблю', 'like'],
            ['OBJECT', 'кофе', 'coffee'],
            ['CONNECTOR', 'но', 'but'],
            ['TIME', 'сейчас', 'now'],
            ['PREDICATE 2', 'пью', 'am drinking'],
            ['OBJECT', 'чай', 'tea'],
          ],
          order: 'The subject «я» is understood in the second half and does not need to be repeated.',
        },
      },
      {
        type: 'learn',
        prompt: 'Give a reason with “because”',
        russian: 'Я дома, потому что я устала.',
        translit: 'Ya doma, potomu chto ya ustala.',
        translation: 'I am at home because I am tired.',
        note: '«Потому что» introduces the reason. «Устала» is the feminine form; a male speaker says «устал».',
        grammar: {
          rule: 'Main idea + потому что + reason.',
          parts: [
            ['SUBJECT', 'Я', 'who?'],
            ['PLACE', 'дома', 'where?'],
            ['CONNECTOR', 'потому что', 'because'],
            ['SUBJECT', 'я', 'who?'],
            ['PREDICATE', 'устала', 'am tired'],
          ],
          order: 'First say what is true, then explain why after «потому что».',
        },
      },
      {
        type: 'choice',
        prompt: 'Which sentence means “I am at home because I am tired”?',
        answers: ['Я дома, потому что я устала.', 'Я дома, но я устала вчера.', 'Потому я дома устала что.'],
        correct: 'Я дома, потому что я устала.',
        grammar: {
          rule: 'The connector «потому что» stays together as one phrase.',
          parts: [
            ['MAIN IDEA', 'Я дома', 'I am at home'],
            ['CONNECTOR', 'потому что', 'because'],
            ['REASON', 'я устала', 'I am tired'],
          ],
          order: 'MAIN IDEA → потому что → REASON.',
        },
      },
      {
        type: 'listen',
        prompt: 'Listen and choose the connected thought',
        speech: 'Я люблю кофе, но сейчас пью чай.',
        answers: ['I like coffee, but right now I am drinking tea.', 'I drink coffee because I am tired.', 'I do not like tea.'],
        correct: 'I like coffee, but right now I am drinking tea.',
        translation: 'Я люблю кофе, но сейчас пью чай.',
        grammar: {
          rule: 'Listen for «но» — it signals contrast.',
          parts: [
            ['IDEA 1', 'Я люблю кофе', 'I like coffee'],
            ['CONNECTOR', 'но', 'but'],
            ['IDEA 2', 'сейчас пью чай', 'right now I drink tea'],
          ],
          order: 'Idea 1 + но + contrasting idea 2.',
        },
      },
      {
        type: 'build',
        prompt: 'Build: “I am at home because I am tired.”',
        chips: ['я устала', 'Я дома', 'потому что'],
        correct: ['Я дома', 'потому что', 'я устала'],
        answerText: 'Я дома, потому что я устала.',
        grammar: {
          rule: 'Place the reason after «потому что».',
          parts: [
            ['MAIN IDEA', 'Я дома', 'I am at home'],
            ['CONNECTOR', 'потому что', 'because'],
            ['REASON', 'я устала', 'I am tired'],
          ],
          order: 'MAIN IDEA → CONNECTOR → REASON.',
        },
      },
      {
        type: 'type',
        prompt: 'Type “because” in Russian',
        placeholder: 'п…',
        answers: ['потому что'],
        hint: 'потому + что',
        answerText: 'потому что',
        grammar: {
          rule: '«Потому что» is two words, but it works as one connector: “because.”',
          parts: [['CONNECTOR', 'потому что', 'because']],
          order: 'It normally comes before the reason.',
        },
      },
    ],
  },
];

let state = loadState();
let currentView = state.onboarded ? 'home' : 'onboarding';
let lessonSession = null;
let reviewSession = null;

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  state.lastVisit = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  streakCount.textContent = state.streak;
}

function setNav(active) {
  bottomNav.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.nav === active);
  });
}

function navigate(view) {
  currentView = view;
  backButton.classList.toggle('hidden', view !== 'lesson');
  bottomNav.classList.toggle('hidden', !state.onboarded || view === 'lesson');
  setNav(view);
  if (view === 'onboarding') renderOnboarding();
  if (view === 'home') renderHome();
  if (view === 'course') renderCourse();
  if (view === 'review') renderReview();
  if (view === 'tutor') renderPractice();
  if (view === 'lesson') renderLesson();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderOnboarding() {
  app.innerHTML = `
    <section class="onboarding">
      <div class="onboarding-art">A1→A2</div>
      <div class="eyebrow">Russian A1 → A2</div>
      <h1>Understand the sentence, not just the answer.</h1>
      <p>Five slower lessons with readable Russian, simple vocabulary, and a grammar explanation inside every exercise: subject, predicate, other sentence parts, and why the word order works.</p>
      <div class="feature-pills">
        <span>🇷🇺 A1 → A2</span><span>🔊 Listening</span><span>🧩 Sentence structure</span><span>📘 Grammar notes</span>
      </div>
      <button id="startButton" class="primary">Start trial course</button>
    </section>`;
  document.getElementById('startButton').addEventListener('click', () => {
    state.onboarded = true;
    saveState();
    navigate('home');
  });
}

function renderHome() {
  const done = state.completedLessons.length;
  const coursePercent = Math.round((done / lessons.length) * 100);
  const firstIncomplete = lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
  const targetLesson = firstIncomplete || lessons[lessons.length - 1];
  app.innerHTML = `
    <section class="hero">
      <div class="eyebrow">Russian A1 → A2</div>
      <h1>${done === lessons.length ? 'Пять уроков готовы.' : 'Спокойно и понятно.'}</h1>
      <p>${done === lessons.length ? 'The five trial lessons are complete. Review the patterns and decide what should come next.' : 'Each exercise now explains the grammar before you move on.'}</p>
    </section>
    <section class="card glow-card">
      <div class="eyebrow">${done === lessons.length ? 'Trial complete' : 'Continue learning'}</div>
      <h2 class="russian">${done === lessons.length ? 'A1 → A2 foundation' : targetLesson.title}</h2>
      <p>${done === lessons.length ? '5 lessons · grammar-first practice' : targetLesson.subtitle}</p>
      <div class="progress-bar"><div class="progress-fill" style="width:${coursePercent}%"></div></div>
      <div class="progress-meta"><span>${done} of ${lessons.length} lessons</span><span>${coursePercent}%</span></div>
      <div style="height:16px"></div>
      <button id="continueButton" class="primary">${done === lessons.length ? 'Review vocabulary' : `${done === 0 ? 'Start Lesson 1' : 'Continue'} · ${targetLesson.minutes} min`}</button>
    </section>
    <div class="stats">
      <div class="stat"><strong>${state.xp}</strong><small>XP</small></div>
      <div class="stat"><strong>${state.streak}</strong><small>day streak</small></div>
      <div class="stat"><strong>${done}</strong><small>lessons</small></div>
    </div>
    <div class="section-title"><div><h3>Today’s Russian</h3><p>Read the structure, then say it aloud.</p></div></div>
    <section class="card">
      <div class="prompt">TRY THIS TODAY</div>
      <h2 class="russian russian-display">Вчера я была дома.</h2>
      <div class="translit">Vchera ya byla doma.</div>
      <p class="translation">Yesterday I was at home.</p>
      <button class="secondary speak" data-speech="Вчера я была дома.">🔊 Hear it</button>
    </section>`;
  document.getElementById('continueButton').addEventListener('click', () => {
    if (done === lessons.length) navigate('review');
    else startLesson(targetLesson.id);
  });
  bindSpeechButtons();
}

function renderCourse() {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Trial course</div><h1>Russian A1 → A2</h1><p>Five slower lessons with grammar explanations in every exercise.</p></section>
    <div class="lesson-list">
      ${lessons.map((lesson) => {
        const done = state.completedLessons.includes(lesson.id);
        const unlocked = lesson.id === 1 || state.completedLessons.includes(lesson.id - 1);
        return `<button class="lesson-card ${done ? 'done' : ''} ${!unlocked ? 'locked' : ''}" data-lesson="${lesson.id}" ${!unlocked ? 'disabled' : ''}>
          <div class="lesson-number">${done ? '✓' : lesson.id}</div>
          <div><div class="lesson-title russian">${lesson.title}</div><div class="lesson-subtitle">${lesson.level} · ${lesson.subtitle} · ${lesson.minutes} min</div></div>
          <div>${!unlocked ? '🔒' : '›'}</div>
        </button>`;
      }).join('')}
    </div>`;
  app.querySelectorAll('[data-lesson]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => startLesson(Number(button.dataset.lesson)));
  });
}

function learnedVocabulary() {
  return lessons
    .filter((lesson) => state.completedLessons.includes(lesson.id))
    .flatMap((lesson) => lesson.vocab.map((word) => ({ ...word, lessonId: lesson.id })));
}

function renderReview() {
  const words = learnedVocabulary();
  if (!words.length) {
    app.innerHTML = `<section class="hero"><div class="eyebrow">Review</div><h1>Nothing to review yet.</h1><p>Finish Lesson 1 first.</p></section><section class="card empty-state"><div class="empty-icon">🧠</div><button id="reviewLessonButton" class="primary">Open Lesson 1</button></section>`;
    document.getElementById('reviewLessonButton').addEventListener('click', () => startLesson(1));
    return;
  }
  if (!reviewSession || reviewSession.baseLength !== words.length) {
    reviewSession = { words: [...words].sort(() => Math.random() - 0.5), index: 0, revealed: false, baseLength: words.length };
  }
  renderReviewCard();
}

function renderReviewCard() {
  const word = reviewSession.words[reviewSession.index];
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Review</div><h1>Read it first.</h1><p>Try to understand the Russian before revealing English.</p></section>
    <section class="card word-card">
      <div class="big-russian russian">${word.russian}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(word.russian)}">🔊</button>
      ${reviewSession.revealed ? `<div class="translit">${word.translit}</div><div class="translation">${word.english}</div>` : ''}
    </section>
    <div style="height:14px"></div>
    ${reviewSession.revealed ? `<div class="button-row"><button class="secondary" data-review="again">Again</button><button class="primary" data-review="good">Good</button></div>` : '<button id="revealButton" class="primary">Show answer</button>'}`;
  bindSpeechButtons();
  if (!reviewSession.revealed) {
    document.getElementById('revealButton').addEventListener('click', () => { reviewSession.revealed = true; renderReviewCard(); });
  } else {
    app.querySelectorAll('[data-review]').forEach((button) => button.addEventListener('click', () => advanceReview(button.dataset.review)));
  }
}

function advanceReview(rating) {
  if (rating === 'again') reviewSession.words.push(reviewSession.words[reviewSession.index]);
  reviewSession.index += 1;
  reviewSession.revealed = false;
  if (reviewSession.index >= reviewSession.words.length) {
    app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:52px">✓</div><div class="eyebrow">Review complete</div><h1>Готово.</h1><button id="finishReviewButton" class="primary">Back to home</button></section>`;
    document.getElementById('finishReviewButton').addEventListener('click', () => { reviewSession = null; navigate('home'); });
    return;
  }
  renderReviewCard();
}

function renderPractice() {
  app.innerHTML = `
    <section class="hero"><div class="eyebrow">Practice</div><h1>Grammar-first mode.</h1><p>For this trial version, the focus is the five lessons and their sentence explanations. Conversation practice will be redesigned after you test these lessons.</p></section>
    <section class="card"><div class="prompt">CURRENT TEST GOAL</div><h2>Do the explanations make each sentence easier to understand?</h2><p>Test Lessons 1–5 and note which grammar cards feel useful, too detailed, or still confusing.</p></section>`;
}

function startLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  if (!lesson) return;
  const unlocked = id === 1 || state.completedLessons.includes(id - 1) || state.completedLessons.includes(id);
  if (!unlocked) return alert('Complete the previous lesson first.');
  lessonSession = { lessonId: id, step: 0, selected: [], locked: false };
  navigate('lesson');
}

function currentLesson() {
  return lessons.find((lesson) => lesson.id === lessonSession.lessonId);
}

function renderLesson() {
  if (!lessonSession) return navigate('course');
  const lesson = currentLesson();
  const step = lesson.steps[lessonSession.step];
  const percent = Math.round(((lessonSession.step + 1) / lesson.steps.length) * 100);
  app.innerHTML = `<section class="lesson-stage"><div class="lesson-progress"><div class="progress-bar"><div class="progress-fill" style="width:${percent}%"></div></div><div class="progress-meta"><span>Lesson ${lesson.id} · ${lesson.level}</span><span>${lessonSession.step + 1}/${lesson.steps.length}</span></div></div><div id="lessonContent"></div></section>`;
  const container = document.getElementById('lessonContent');
  if (step.type === 'learn') renderLearnStep(container, step);
  if (step.type === 'choice') renderChoiceStep(container, step);
  if (step.type === 'listen') renderListenStep(container, step);
  if (step.type === 'build') renderBuildStep(container, step);
  if (step.type === 'type') renderTypeStep(container, step);
}

function grammarBox(grammar) {
  if (!grammar) return '';
  return `
    <section class="grammar-box">
      <div class="grammar-title">Grammar note</div>
      <div class="grammar-rule">${grammar.rule}</div>
      <div class="grammar-parts">
        ${grammar.parts.map(([label, text, meaning]) => `
          <div class="grammar-part">
            <span class="grammar-label">${label}</span>
            <strong class="russian">${text}</strong>
            <span>${meaning}</span>
          </div>`).join('')}
      </div>
      <div class="grammar-order"><strong>Why this order:</strong> ${grammar.order}</div>
    </section>`;
}

function renderLearnStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <section class="card word-card">
      <div class="big-russian russian">${step.russian}</div>
      <div class="translit">${step.translit}</div>
      <div class="translation">${step.translation}</div>
      <button class="audio-button speak" data-speech="${escapeAttribute(step.russian)}">🔊</button>
      <div class="note">${step.note}</div>
    </section>
    ${grammarBox(step.grammar)}
    <div style="height:14px"></div>
    <button id="nextButton" class="primary">Continue</button>`;
  bindSpeechButtons();
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderChoiceStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    ${grammarBox(step.grammar)}
    <div class="answers">${step.answers.map((answer) => `<button class="answer ${containsCyrillic(answer) ? 'russian' : ''}" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div>
    <div id="feedback"></div>`;
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function renderListenStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    <section class="card word-card"><button id="listenButton" class="audio-button audio-large">🔊</button><p style="margin:12px 0 0">Tap to hear the Russian sentence.</p></section>
    ${grammarBox(step.grammar)}
    <div class="answers">${step.answers.map((answer) => `<button class="answer ${containsCyrillic(answer) ? 'russian' : ''}" data-answer="${escapeAttribute(answer)}">${answer}</button>`).join('')}</div>
    <div id="feedback"></div>`;
  document.getElementById('listenButton').addEventListener('click', () => speakRussian(step.speech));
  setTimeout(() => speakRussian(step.speech), 250);
  container.querySelectorAll('[data-answer]').forEach((button) => button.addEventListener('click', () => handleChoice(button, step)));
}

function handleChoice(button, step) {
  if (lessonSession.locked) return;
  if (button.dataset.answer !== step.correct) {
    button.classList.add('wrong');
    navigator.vibrate?.(35);
    return;
  }
  lessonSession.locked = true;
  button.classList.add('correct');
  document.getElementById('feedback').innerHTML = `<div class="feedback"><strong>Correct.</strong>${step.translation ? `<span>${step.translation}</span>` : '<span>Good.</span>'}</div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
  document.getElementById('nextButton').addEventListener('click', nextLessonStep);
}

function renderBuildStep(container, step) {
  lessonSession.selected = [];
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    ${grammarBox(step.grammar)}
    <div id="sentenceZone" class="sentence-zone"><span style="color:var(--muted)">Tap the parts in order</span></div>
    <div class="word-bank">${step.chips.map((chip) => `<button class="chip russian" data-chip="${escapeAttribute(chip)}">${chip}</button>`).join('')}</div>
    <div style="height:18px"></div>
    <button id="checkSentence" class="primary">Check answer</button><div id="feedback"></div>`;
  const zone = document.getElementById('sentenceZone');
  container.querySelectorAll('[data-chip]').forEach((button) => {
    button.addEventListener('click', () => {
      if (button.classList.contains('used')) return;
      lessonSession.selected.push(button.dataset.chip);
      button.classList.add('used');
      zone.innerHTML = lessonSession.selected.map((word) => `<span class="chip russian selected-chip">${word}</span>`).join('');
    });
  });
  document.getElementById('checkSentence').addEventListener('click', () => {
    const correct = JSON.stringify(lessonSession.selected) === JSON.stringify(step.correct);
    const feedback = document.getElementById('feedback');
    if (!correct) {
      feedback.innerHTML = '<div class="feedback"><strong>Not quite.</strong><span>Look at the grammar note above, then try again.</span></div>';
      setTimeout(() => renderLesson(), 900);
      return;
    }
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  });
}

function renderTypeStep(container, step) {
  container.innerHTML = `
    <div class="prompt">${step.prompt}</div>
    ${grammarBox(step.grammar)}
    <section class="card"><input id="typeAnswer" class="type-answer" autocomplete="off" autocapitalize="none" spellcheck="false" placeholder="${step.placeholder || ''}" /><div class="note">Hint: ${step.hint}</div></section>
    <div style="height:14px"></div><button id="checkType" class="primary">Check answer</button><div id="feedback"></div>`;
  const input = document.getElementById('typeAnswer');
  const check = () => {
    const normalized = input.value.trim().toLowerCase().replace(/[.!?,]/g, '');
    const correct = step.answers.some((answer) => answer.toLowerCase().replace(/[.!?,]/g, '') === normalized);
    const feedback = document.getElementById('feedback');
    if (!correct) {
      feedback.innerHTML = `<div class="feedback"><strong>Try again.</strong><span>${step.hint}</span></div>`;
      return;
    }
    input.disabled = true;
    feedback.innerHTML = `<div class="feedback"><strong>Correct.</strong><span class="russian">${step.answerText}</span></div><div style="height:12px"></div><button id="nextButton" class="primary">Continue</button>`;
    document.getElementById('nextButton').addEventListener('click', nextLessonStep);
  };
  document.getElementById('checkType').addEventListener('click', check);
  input.addEventListener('keydown', (event) => { if (event.key === 'Enter') check(); });
}

function nextLessonStep() {
  const lesson = currentLesson();
  lessonSession.locked = false;
  if (lessonSession.step < lesson.steps.length - 1) {
    lessonSession.step += 1;
    renderLesson();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  completeLesson();
}

function completeLesson() {
  const lesson = currentLesson();
  const firstCompletion = !state.completedLessons.includes(lesson.id);
  if (firstCompletion) {
    state.completedLessons.push(lesson.id);
    state.completedLessons.sort((a, b) => a - b);
    state.xp += lesson.xp;
  }
  saveState();
  lessonSession = null;
  const nextLesson = lessons.find((item) => item.id === lesson.id + 1);
  app.innerHTML = `<section class="onboarding" style="text-align:center"><div class="onboarding-art" style="font-size:54px">✓</div><div class="eyebrow">Lesson ${lesson.id} complete</div><h1>Отлично.</h1><p>${firstCompletion ? `You earned <strong style="color:var(--text)">${lesson.xp} XP</strong>.` : 'Lesson reviewed.'}</p><section class="card" style="margin-bottom:14px"><div class="prompt">CORE PATTERNS</div><h2 class="russian">${lesson.vocab.slice(0, 2).map((word) => word.russian).join(' · ')}</h2><p>${lesson.vocab.slice(0, 2).map((word) => word.english).join(' · ')}</p></section>${nextLesson ? `<div class="button-row"><button id="homeAfterLesson" class="secondary">Home</button><button id="nextLessonButton" class="primary">Lesson ${nextLesson.id}</button></div>` : '<button id="homeAfterLesson" class="primary">Finish trial</button>'}</section>`;
  backButton.classList.add('hidden');
  document.getElementById('homeAfterLesson').addEventListener('click', () => navigate('home'));
  if (nextLesson) document.getElementById('nextLessonButton').addEventListener('click', () => startLesson(nextLesson.id));
}

function speakRussian(text) {
  if (!('speechSynthesis' in window)) return alert('Audio is not supported by this browser.');
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU';
  utterance.rate = 0.72;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function bindSpeechButtons() {
  document.querySelectorAll('.speak').forEach((button) => {
    button.addEventListener('click', () => speakRussian(button.dataset.speech));
  });
}

function containsCyrillic(text) {
  return /[А-Яа-яЁё]/.test(text);
}

function escapeAttribute(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

bottomNav.addEventListener('click', (event) => {
  const button = event.target.closest('[data-nav]');
  if (button) navigate(button.dataset.nav);
});

backButton.addEventListener('click', () => {
  lessonSession = null;
  navigate('course');
});

brandButton.addEventListener('click', () => {
  if (state.onboarded && currentView !== 'lesson') navigate('home');
});

streakCount.textContent = state.streak;
navigate(currentView);
