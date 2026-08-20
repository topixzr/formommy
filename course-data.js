(() => {
  const G = (rule, parts, order, tip = '') => ({ rule, parts, order, tip });
  const L = (prompt, russian, english, note, grammar, translit='') => ({type:'learn',prompt,russian,translation:english,note,grammar,translit});
  const C = (prompt, answers, correct, grammar, translation='') => ({type:'choice',prompt,answers,correct,grammar,translation});
  const S = (prompt, speech, answers, correct, grammar, translation='') => ({type:'listen',prompt,speech,answers,correct,grammar,translation});
  const B = (prompt, chips, correct, grammar, answerText='') => ({type:'build',prompt,chips,correct,grammar,answerText:answerText || correct.join(' ')});
  const T = (prompt, answers, hint, grammar, answerText='') => ({type:'type',prompt,answers,hint,grammar,answerText:answerText || answers[0]});

  const lessons = [
    {
      id:1, unit:'Foundation', title:'Я, ты, мы', subtitle:'Build your first real sentences', minutes:10, xp:70, level:'A1',
      goals:['Say who is here','Understand that Russian often drops “am / is / are”','Use я, ты, мы naturally'],
      vocab:[
        {russian:'я',english:'I',translit:'ya'}, {russian:'ты',english:'you (informal, singular)',translit:'ty'},
        {russian:'мы',english:'we',translit:'my'}, {russian:'дома',english:'at home',translit:'doma'},
        {russian:'здесь',english:'here',translit:'zdes'}
      ],
      steps:[
        L('Start with the most useful zero-verb sentence','Я дома.','I am at home.','In present-tense Russian, “am” is normally not spoken.',
          G('Present “to be” is usually omitted.',[['SUBJECT','Я','I'],['PLACE','дома','at home']],'SUBJECT → PLACE. English needs “am”; Russian does not.','Do not add «есть» here.')),
        C('Which sentence means “I am at home”?',['Я дома.','Я домой.','Ты дома.'],'Я дома.',
          G('Use «дома» for “at home.”',[['SUBJECT','Я','I'],['PLACE','дома','at home']],'Я + дома.')),
        L('Now speak directly to your husband','Ты здесь.','You are here.','«Ты» is the normal informal “you” for a spouse.',
          G('The same no-“are” pattern works with «ты».',[['SUBJECT','Ты','you'],['PLACE','здесь','here']],'SUBJECT → PLACE.')),
        S('Listen and identify who is being described','Мы дома.',['We are at home.','You are at home.','I am at work.'],'We are at home.',
          G('«Мы» means “we.”',[['SUBJECT','Мы','we'],['PLACE','дома','at home']],'Мы + дома.'),'We are at home.'),
        B('Build: “We are at home.”',['дома','Мы'],['Мы','дома'],
          G('Put the subject first in the neutral beginner pattern.',[['SUBJECT','Мы','we'],['PLACE','дома','at home']],'SUBJECT → PLACE.'),'Мы дома.'),
        T('Type “we” in Russian',['мы'],'м-ы',
          G('«Мы» is the subject pronoun “we.”',[['SUBJECT','мы','we']],'It normally comes before the rest of a neutral sentence.'))
      ]
    },
    {
      id:2, unit:'Home', title:'Это наш дом', subtitle:'Home, things, and simple possession', minutes:11, xp:75, level:'A1',
      goals:['Use это','Say “our” with familiar nouns','Name everyday things at home'],
      vocab:[
        {russian:'это',english:'this / it is',translit:'eto'}, {russian:'наш дом',english:'our home',translit:'nash dom'},
        {russian:'наша кухня',english:'our kitchen',translit:'nasha kukhnya'}, {russian:'собака',english:'dog',translit:'sobaka'},
        {russian:'машина',english:'car',translit:'mashina'}
      ],
      steps:[
        L('Point to something and name it','Это наш дом.','This is our home.','«Это» is one of the highest-value beginner words: this / this is / it is.',
          G('Use «это + noun phrase» to identify something.',[['POINTER','Это','this / this is'],['NOUN PHRASE','наш дом','our home']],'Это → noun phrase.')),
        C('Which means “This is our kitchen”?',['Это наша кухня.','Это наш кухня.','Наша это кухню.'],'Это наша кухня.',
          G('«Кухня» is feminine, so “our” is «наша».',[['POINTER','Это','this is'],['POSSESSIVE','наша','our, feminine'],['NOUN','кухня','kitchen']],'Это → наша → кухня.')),
        L('Use the same pattern with a dog','Это наша собака.','This is our dog.','«Собака» is grammatically feminine, regardless of the dog’s sex in this basic pattern.',
          G('Possessive words agree with the noun’s grammatical gender.',[['POINTER','Это','this is'],['POSSESSIVE','наша','our'],['NOUN','собака','dog']],'Это → наша → собака.')),
        S('Listen for the object','Это наша машина.',['This is our car.','This is our dog.','We are in the car.'],'This is our car.',
          G('«Машина» is feminine, so use «наша».',[['POINTER','Это','this is'],['POSSESSIVE','наша','our'],['NOUN','машина','car']],'Это + наша машина.'),'This is our car.'),
        B('Build: “This is our home.”',['дом','Это','наш'],['Это','наш','дом'],
          G('«Дом» is masculine, so “our” is «наш».',[['POINTER','Это','this is'],['POSSESSIVE','наш','our, masculine'],['NOUN','дом','home']],'Это → наш → дом.'),'Это наш дом.'),
        T('Type “this / this is”',['это'],'э-т-о',
          G('Learn «это» as a complete chunk.',[['POINTER','это','this / this is']],'It often starts an identifying sentence.'))
      ]
    },
    {
      id:3, unit:'Couple talk', title:'Хочешь кофе?', subtitle:'Offers, yes/no questions, and useful replies', minutes:12, xp:80, level:'A1',
      goals:['Offer something','Answer naturally','Use intonation to make a question'],
      vocab:[
        {russian:'Хочешь кофе?',english:'Do you want coffee?',translit:'Khochesh kofe?'},
        {russian:'Да, хочу.',english:'Yes, I do / Yes, I want some.',translit:'Da, khochu.'},
        {russian:'Нет, спасибо.',english:'No, thanks.',translit:'Net, spasibo.'},
        {russian:'Конечно.',english:'Of course.',translit:'Konechno.'}
      ],
      steps:[
        L('Ask a question you can use every day','Хочешь кофе?','Do you want coffee?','Russian can make a yes/no question with the same word order as a statement; your voice rises to mark the question.',
          G('«Хочешь» already contains the idea “you want.”',[['PREDICATE','Хочешь','do you want'],['OBJECT','кофе','coffee']],'PREDICATE → OBJECT; «ты» is optional because the verb ending already points to “you.”')),
        C('Best natural reply to “Хочешь кофе?”',['Да, хочу.','Да, хочешь.','Да, кофе ты.'],'Да, хочу.',
          G('Change the verb from “you want” to “I want”: хочешь → хочу.',[['ANSWER','Да','yes'],['PREDICATE','хочу','I want']],'Да → хочу.')),
        L('A polite refusal','Нет, спасибо.','No, thank you.','This short phrase is complete and natural.',
          G('No verb is needed in this reply.',[['ANSWER','Нет','no'],['POLITENESS','спасибо','thank you']],'Нет → спасибо.')),
        S('Listen and choose the meaning','Хочешь чай?',['Do you want tea?','I want tea.','Where is the tea?'],'Do you want tea?',
          G('The -ешь ending in «хочешь» points to informal “you.”',[['PREDICATE','Хочешь','do you want'],['OBJECT','чай','tea']],'PREDICATE → OBJECT.'),'Do you want tea?'),
        B('Build: “Do you want coffee?”',['кофе','Хочешь'],['Хочешь','кофе'],
          G('Keep the simplest question frame.',[['PREDICATE','Хочешь','do you want'],['OBJECT','кофе','coffee']],'PREDICATE → OBJECT; use question intonation.'),'Хочешь кофе?'),
        T('Type “thank you”',['спасибо'],'с-п-а-с-и-б-о',
          G('«Спасибо» is a fixed politeness word.',[['POLITENESS','спасибо','thank you']],'It can stand alone or follow «нет».'))
      ]
    },
    {
      id:4, unit:'Right now', title:'Что ты делаешь?', subtitle:'Present tense for what is happening now', minutes:13, xp:90, level:'A1',
      goals:['Ask what someone is doing','Use common present-tense verbs','Notice verb endings'],
      vocab:[
        {russian:'Что ты делаешь?',english:'What are you doing?',translit:'Chto ty delayesh?'},
        {russian:'Я работаю.',english:'I am working.',translit:'Ya rabotayu.'},
        {russian:'Я готовлю.',english:'I am cooking.',translit:'Ya gotovlyu.'},
        {russian:'Я еду домой.',english:'I am driving / going home.',translit:'Ya yedu domoy.'}
      ],
      steps:[
        L('Ask what your partner is doing','Что ты делаешь?','What are you doing?','This is a normal everyday question, not textbook-only Russian.',
          G('Question word + subject + predicate.',[['QUESTION','Что','what'],['SUBJECT','ты','you'],['PREDICATE','делаешь','are doing']],'Что → ты → делаешь?')),
        C('Which means “I am working”?',['Я работаю.','Я работаешь.','Ты работаю.'],'Я работаю.',
          G('With «я», this verb uses «работаю».',[['SUBJECT','Я','I'],['PREDICATE','работаю','work / am working']],'SUBJECT → PREDICATE.')),
        L('Another high-frequency answer','Я готовлю.','I am cooking.','Russian present tense can mean both “I cook” and “I am cooking”; context decides.',
          G('Russian has no separate “am + -ing” construction.',[['SUBJECT','Я','I'],['PREDICATE','готовлю','cook / am cooking']],'Я → готовлю.')),
        S('Listen for a real text-message style answer','Я еду домой.',['I am on my way home.','I am already at home.','I worked at home.'],'I am on my way home.',
          G('«Еду» describes movement by transport; «домой» means “homeward / to home.”',[['SUBJECT','Я','I'],['PREDICATE','еду','am going by vehicle'],['DIRECTION','домой','home']],'SUBJECT → MOVEMENT → DIRECTION.'),'I am on my way home.'),
        B('Build: “What are you doing?”',['делаешь','Что','ты'],['Что','ты','делаешь'],
          G('Question word first is the clearest beginner order.',[['QUESTION','Что','what'],['SUBJECT','ты','you'],['PREDICATE','делаешь','are doing']],'QUESTION → SUBJECT → PREDICATE.'),'Что ты делаешь?'),
        T('Type “I am cooking”',['я готовлю','Я готовлю'],'я + г...',
          G('Use «я» + first-person verb.',[['SUBJECT','я','I'],['PREDICATE','готовлю','am cooking']],'SUBJECT → PREDICATE.'),'Я готовлю.')
      ]
    },
    {
      id:5, unit:'Yesterday', title:'Вчера', subtitle:'Past tense for a female speaker', minutes:13, xp:90, level:'A1+',
      goals:['Talk about yesterday','Use feminine past forms','Recognize -ла'],
      vocab:[
        {russian:'вчера',english:'yesterday',translit:'vchera'},
        {russian:'Я работала.',english:'I worked. (female speaker)',translit:'Ya rabotala.'},
        {russian:'Я была дома.',english:'I was at home. (female speaker)',translit:'Ya byla doma.'},
        {russian:'Я гуляла с собакой.',english:'I walked with the dog.',translit:'Ya gulyala s sobakoy.'}
      ],
      steps:[
        L('Set the time first','Вчера я работала.','Yesterday I worked.','For a female speaker, many past-tense verbs end in -ла.',
          G('Female past: verb stem + -ла in many common verbs.',[['TIME','Вчера','yesterday'],['SUBJECT','я','I'],['PREDICATE','работала','worked']],'TIME → SUBJECT → PREDICATE.')),
        C('Your wife says “Yesterday I was at home.”',['Вчера я была дома.','Вчера я был дома.','Завтра я была дома.'],'Вчера я была дома.',
          G('A female speaker uses «была».',[['TIME','Вчера','yesterday'],['SUBJECT','я','I'],['PREDICATE','была','was'],['PLACE','дома','at home']],'TIME → SUBJECT → PREDICATE → PLACE.')),
        L('Use a phrase from real dog life','Я гуляла с собакой.','I walked with the dog.','«Гуляла» is feminine past. Learn «с собакой» as one useful chunk for now.',
          G('Past action + companion phrase.',[['SUBJECT','Я','I'],['PREDICATE','гуляла','walked'],['COMPANION','с собакой','with the dog']],'SUBJECT → PREDICATE → COMPANION.')),
        S('Listen for the past marker','Вчера я готовила дома.',['Yesterday I cooked at home.','Tomorrow I will cook at home.','I am cooking now.'],'Yesterday I cooked at home.',
          G('«Вчера» + a -ла past form makes the time clear.',[['TIME','Вчера','yesterday'],['SUBJECT','я','I'],['PREDICATE','готовила','cooked'],['PLACE','дома','at home']],'TIME → SUBJECT → ACTION → PLACE.'),'Yesterday I cooked at home.'),
        B('Build: “Yesterday I was at home.”',['была','дома','Вчера','я'],['Вчера','я','была','дома'],
          G('Use the stable beginner frame.',[['TIME','Вчера','yesterday'],['SUBJECT','я','I'],['PREDICATE','была','was'],['PLACE','дома','at home']],'TIME → SUBJECT → PREDICATE → PLACE.'),'Вчера я была дома.'),
        T('Type the female past form of “was”',['была'],'б-ы-л-а',
          G('Female: «была»; male: «был».',[['PREDICATE','была','was, female speaker']],'Use after «я» when the speaker is female.'))
      ]
    },
    {
      id:6, unit:'Tomorrow', title:'Что будем делать?', subtitle:'Future plans together', minutes:13, xp:95, level:'A1+',
      goals:['Talk about tomorrow','Use буду / будем','Make plans as a couple'],
      vocab:[
        {russian:'завтра',english:'tomorrow',translit:'zavtra'},
        {russian:'Я буду работать.',english:'I will work.',translit:'Ya budu rabotat.'},
        {russian:'Что будем делать?',english:'What will we do?',translit:'Chto budem delat?'},
        {russian:'Будем дома.',english:'We will be at home.',translit:'Budem doma.'}
      ],
      steps:[
        L('Use the easiest future construction','Завтра я буду работать.','Tomorrow I will work.','«Буду + infinitive» is a reliable way to make the future.',
          G('Future: буду + infinitive.',[['TIME','Завтра','tomorrow'],['SUBJECT','я','I'],['AUXILIARY','буду','will'],['INFINITIVE','работать','work']],'TIME → SUBJECT → буду → infinitive.')),
        C('Which asks “What will we do?”',['Что будем делать?','Что буду делать?','Что делала вчера?'],'Что будем делать?',
          G('«Будем» is the “we” future form.',[['QUESTION','Что','what'],['AUXILIARY','будем','will we'],['INFINITIVE','делать','do']],'QUESTION → будем → infinitive.')),
        L('A compact couple answer','Будем дома.','We will be at home.','Russian can omit «мы» because «будем» already marks “we.”',
          G('The verb form can carry the subject information.',[['PREDICATE','Будем','we will be'],['PLACE','дома','at home']],'PREDICATE → PLACE.')),
        S('Listen and choose the plan','Завтра будем гулять с собаками.',['Tomorrow we will walk the dogs.','Yesterday we walked the dogs.','The dogs are at home.'],'Tomorrow we will walk the dogs.',
          G('«Будем + infinitive» = we will do something.',[['TIME','Завтра','tomorrow'],['AUXILIARY','будем','we will'],['INFINITIVE','гулять','walk'],['COMPANION','с собаками','with the dogs']],'TIME → будем → ACTION → extra information.'),'Tomorrow we will walk the dogs.'),
        B('Build: “What will we do?”',['делать','будем','Что'],['Что','будем','делать'],
          G('Question first, then future helper, then action.',[['QUESTION','Что','what'],['AUXILIARY','будем','will we'],['INFINITIVE','делать','do']],'QUESTION → AUXILIARY → INFINITIVE.'),'Что будем делать?'),
        T('Type “tomorrow”',['завтра'],'з-а-в-т-р-а',
          G('«Завтра» never changes form.',[['TIME','завтра','tomorrow']],'It often comes first to set the time.'))
      ]
    },
    {
      id:7, unit:'Needs', title:'Я хочу / мне нужно', subtitle:'Wants, needs, and practical requests', minutes:14, xp:100, level:'A1+',
      goals:['Say what you want','Say what you need','Use an infinitive after хочу / нужно'],
      vocab:[
        {russian:'Я хочу есть.',english:'I am hungry / I want to eat.',translit:'Ya khochu yest.'},
        {russian:'Я хочу кофе.',english:'I want coffee.',translit:'Ya khochu kofe.'},
        {russian:'Мне нужно ехать.',english:'I need to go / drive.',translit:'Mne nuzhno yekhat.'},
        {russian:'Мне нужна вода.',english:'I need water.',translit:'Mne nuzhna voda.'}
      ],
      steps:[
        L('Say a direct want','Я хочу кофе.','I want coffee.','This pattern matches English closely.',
          G('Subject + predicate + object.',[['SUBJECT','Я','I'],['PREDICATE','хочу','want'],['OBJECT','кофе','coffee']],'SUBJECT → PREDICATE → OBJECT.')),
        C('Which means “I want to eat”?',['Я хочу есть.','Мне есть хочу.','Я хочешь есть.'],'Я хочу есть.',
          G('After «хочу», use the infinitive «есть».',[['SUBJECT','Я','I'],['PREDICATE','хочу','want'],['INFINITIVE','есть','to eat']],'Я → хочу → infinitive.')),
        L('Now express a necessity','Мне нужно ехать.','I need to go / drive.','Russian often frames need as “to me it is necessary.”',
          G('Мне + нужно + infinitive.',[['EXPERIENCER','Мне','to me'],['NECESSITY','нужно','it is necessary'],['INFINITIVE','ехать','to go by vehicle']],'Мне → нужно → infinitive.')),
        S('Listen for what is needed','Мне нужна вода.',['I need water.','I want coffee.','I am drinking water.'],'I need water.',
          G('With a noun like feminine «вода», use «нужна».',[['EXPERIENCER','Мне','to me'],['PREDICATE','нужна','is needed'],['SUBJECT','вода','water']],'Мне → нужна → вода.'),'I need water.'),
        B('Build: “I need to go.”',['ехать','Мне','нужно'],['Мне','нужно','ехать'],
          G('Keep «мне нужно» as a useful frame.',[['EXPERIENCER','Мне','to me'],['NECESSITY','нужно','need'],['INFINITIVE','ехать','to go / drive']],'Мне → нужно → infinitive.'),'Мне нужно ехать.'),
        T('Type “I want”',['я хочу','Я хочу'],'я + х...',
          G('«Хочу» is the “I” form of хотеть.',[['SUBJECT','я','I'],['PREDICATE','хочу','want']],'SUBJECT → PREDICATE.'),'Я хочу.')
      ]
    },
    {
      id:8, unit:'Places', title:'Где ты?', subtitle:'Location versus destination', minutes:14, xp:100, level:'A1+',
      goals:['Ask where someone is','Say where you are','Contrast в магазин / в магазине'],
      vocab:[
        {russian:'Где ты?',english:'Where are you?',translit:'Gde ty?'},
        {russian:'Я в магазине.',english:'I am in the store.',translit:'Ya v magazine.'},
        {russian:'Я еду в магазин.',english:'I am going to the store.',translit:'Ya yedu v magazin.'},
        {russian:'Я уже дома.',english:'I am already home.',translit:'Ya uzhe doma.'}
      ],
      steps:[
        L('A very common text message','Где ты?','Where are you?','No present-tense “are” is spoken.',
          G('Question word + subject.',[['QUESTION','Где','where'],['SUBJECT','ты','you']],'Где → ты?')),
        C('You are already inside the store',['Я в магазине.','Я в магазин.','Я еду в магазине.'],'Я в магазине.',
          G('Location answers «Где?» and changes магазин → магазине.',[['SUBJECT','Я','I'],['PLACE','в магазине','in the store']],'SUBJECT → PLACE.')),
        L('Now movement toward the store','Я еду в магазин.','I am going / driving to the store.','Destination answers «Куда?» and uses «в магазин».',
          G('Movement + destination.',[['SUBJECT','Я','I'],['PREDICATE','еду','am going by vehicle'],['DIRECTION','в магазин','to the store']],'SUBJECT → MOVEMENT → DIRECTION.')),
        S('Listen to a useful arrival message','Я уже дома.',['I am already home.','I am going home.','I was at home yesterday.'],'I am already home.',
          G('«Уже» means “already.”',[['SUBJECT','Я','I'],['TIME/STATUS','уже','already'],['PLACE','дома','at home']],'SUBJECT → уже → PLACE.'),'I am already home.'),
        B('Build: “I am going to the store.”',['в магазин','еду','Я'],['Я','еду','в магазин'],
          G('Do not use the location ending when there is movement toward the place.',[['SUBJECT','Я','I'],['PREDICATE','еду','am going'],['DIRECTION','в магазин','to the store']],'SUBJECT → PREDICATE → DIRECTION.'),'Я еду в магазин.'),
        T('Type “Where are you?”',['где ты','Где ты'],'где + ты',
          G('Russian needs only the question word and subject here.',[['QUESTION','где','where'],['SUBJECT','ты','you']],'QUESTION → SUBJECT.'),'Где ты?')
      ]
    },
    {
      id:9, unit:'Dogs', title:'Собаки', subtitle:'Walks, food, and home routines', minutes:13, xp:100, level:'A1+',
      goals:['Talk about the dogs','Use simple imperatives','Use with-phrases as chunks'],
      vocab:[
        {russian:'Пойдём гулять?',english:'Shall we go for a walk?',translit:'Poydyom gulyat?'},
        {russian:'Покорми собак, пожалуйста.',english:'Feed the dogs, please.',translit:'Pokormi sobak, pozhaluysta.'},
        {russian:'Собаки дома.',english:'The dogs are at home.',translit:'Sobaki doma.'},
        {russian:'Я гуляю с собакой.',english:'I am walking with the dog.',translit:'Ya gulyayu s sobakoy.'}
      ],
      steps:[
        L('Suggest a walk together','Пойдём гулять?','Shall we go for a walk?','Treat this as a useful spoken chunk first; the motion grammar can come later.',
          G('Invitation + activity.',[['INVITATION','Пойдём','shall we go'],['INFINITIVE','гулять','to walk']],'Пойдём → activity?')),
        C('Which is a polite request to feed the dogs?',['Покорми собак, пожалуйста.','Собаки кормят тебя.','Я покорми собак.'],'Покорми собак, пожалуйста.',
          G('Imperative + object + пожалуйста.',[['IMPERATIVE','Покорми','feed'],['OBJECT','собак','the dogs'],['POLITENESS','пожалуйста','please']],'REQUEST → OBJECT → please.')),
        L('Describe the current situation','Собаки дома.','The dogs are at home.','Again, present “are” is omitted.',
          G('Noun subject + place.',[['SUBJECT','Собаки','the dogs'],['PLACE','дома','at home']],'SUBJECT → PLACE.')),
        S('Listen for who is walking','Я гуляю с собакой.',['I am walking with the dog.','The dog is at home.','We will feed the dogs.'],'I am walking with the dog.',
          G('Learn «с собакой» as the chunk “with the dog.”',[['SUBJECT','Я','I'],['PREDICATE','гуляю','am walking'],['COMPANION','с собакой','with the dog']],'SUBJECT → ACTION → COMPANION.'),'I am walking with the dog.'),
        B('Build: “The dogs are at home.”',['дома','Собаки'],['Собаки','дома'],
          G('No present “are.”',[['SUBJECT','Собаки','the dogs'],['PLACE','дома','at home']],'SUBJECT → PLACE.'),'Собаки дома.'),
        T('Type “please”',['пожалуйста'],'по-жал-уй-ста',
          G('«Пожалуйста» can soften requests.',[['POLITENESS','пожалуйста','please / you’re welcome']],'Often placed after the request.'))
      ]
    },
    {
      id:10, unit:'Messages', title:'Я уже еду', subtitle:'Short texts that sound natural', minutes:12, xp:105, level:'A1+',
      goals:['Send useful short messages','Use уже / скоро / ещё','Understand omitted subjects'],
      vocab:[
        {russian:'Я уже еду.',english:'I am already on my way.',translit:'Ya uzhe yedu.'},
        {russian:'Скоро буду дома.',english:'I will be home soon.',translit:'Skoro budu doma.'},
        {russian:'Ты скоро?',english:'Will you be here soon?',translit:'Ty skoro?'},
        {russian:'Ещё пять минут.',english:'Five more minutes.',translit:'Yeshchyo pyat minut.'}
      ],
      steps:[
        L('A message you can actually send','Я уже еду.','I am already on my way.','Context usually makes the destination obvious, so it can be omitted.',
          G('Subject + уже + movement verb.',[['SUBJECT','Я','I'],['STATUS','уже','already'],['PREDICATE','еду','am on my way']],'SUBJECT → уже → PREDICATE.')),
        C('Which means “I’ll be home soon”?',['Скоро буду дома.','Скоро была дома.','Дома скоро вчера.'],'Скоро буду дома.',
          G('«Буду» marks future; «я» can be omitted in a short message.',[['TIME','Скоро','soon'],['PREDICATE','буду','will be'],['PLACE','дома','at home']],'TIME → PREDICATE → PLACE.')),
        L('A compact check-in question','Ты скоро?','Will you be here soon?','Russian often leaves the obvious verb unstated in casual speech.',
          G('Subject + time/status word can form a complete contextual question.',[['SUBJECT','Ты','you'],['TIME','скоро','soon']],'SUBJECT → скоро? Context supplies the missing idea.')),
        S('Listen for the delay','Ещё пять минут.',['Five more minutes.','It is five o’clock.','I arrived five minutes ago.'],'Five more minutes.',
          G('«Ещё» can mean “more / another” in this context.',[['QUANTITY FRAME','Ещё','more / another'],['TIME AMOUNT','пять минут','five minutes']],'Ещё → amount.'),'Five more minutes.'),
        B('Build: “I will be home soon.”',['дома','буду','Скоро'],['Скоро','буду','дома'],
          G('A natural message can omit «я».',[['TIME','Скоро','soon'],['PREDICATE','буду','will be'],['PLACE','дома','at home']],'TIME → PREDICATE → PLACE.'),'Скоро буду дома.'),
        T('Type “already”',['уже'],'у-ж-е',
          G('«Уже» is an adverb and does not change.',[['STATUS','уже','already']],'It often comes before the verb or place phrase.'))
      ]
    },
    {
      id:11, unit:'Preferences', title:'Мне нравится', subtitle:'Likes without translating English word-for-word', minutes:14, xp:110, level:'A1+',
      goals:['Say what you like','Contrast нравится and люблю','Understand the “to me” structure'],
      vocab:[
        {russian:'Мне нравится кофе.',english:'I like coffee.',translit:'Mne nravitsya kofe.'},
        {russian:'Мне нравится Юджин.',english:'I like Eugene.',translit:'Mne nravitsya Yudzhin.'},
        {russian:'Я люблю тебя.',english:'I love you.',translit:'Ya lyublyu tebya.'},
        {russian:'Мне не нравится.',english:'I don’t like it.',translit:'Mne ne nravitsya.'}
      ],
      steps:[
        L('Learn the Russian logic, not an English translation','Мне нравится кофе.','I like coffee.','Literally, the structure is closer to “Coffee is pleasing to me.”',
          G('Мне + нравится + thing.',[['EXPERIENCER','Мне','to me'],['PREDICATE','нравится','is pleasing'],['SUBJECT','кофе','coffee']],'Мне → нравится → thing.')),
        C('Which means “I like Eugene”?',['Мне нравится Юджин.','Я нравится Юджин.','Юджин мне люблю.'],'Мне нравится Юджин.',
          G('Do not use English-style «я нравится».',[['EXPERIENCER','Мне','to me'],['PREDICATE','нравится','is pleasing'],['SUBJECT','Юджин','Eugene']],'Мне → нравится → subject.')),
        L('A different, stronger verb','Я люблю тебя.','I love you.','«Люблю» uses a more English-like subject + verb + object pattern.',
          G('Я + люблю + object.',[['SUBJECT','Я','I'],['PREDICATE','люблю','love'],['OBJECT','тебя','you']],'SUBJECT → PREDICATE → OBJECT.')),
        S('Listen for the negative','Мне не нравится.',['I don’t like it.','I really like it.','I don’t understand.'],'I don’t like it.',
          G('Put «не» directly before «нравится».',[['EXPERIENCER','Мне','to me'],['NEGATION','не','not'],['PREDICATE','нравится','is pleasing']],'Мне → не → нравится.'),'I don’t like it.'),
        B('Build: “I like Eugene.”',['Юджин','Мне','нравится'],['Мне','нравится','Юджин'],
          G('Keep the frame «Мне нравится…».',[['EXPERIENCER','Мне','to me'],['PREDICATE','нравится','is pleasing'],['SUBJECT','Юджин','Eugene']],'Мне → нравится → thing.'),'Мне нравится Юджин.'),
        T('Type “I don’t like it”',['мне не нравится','Мне не нравится'],'мне + не + н...',
          G('Negation goes before the predicate.',[['EXPERIENCER','мне','to me'],['NEGATION','не','not'],['PREDICATE','нравится','is pleasing']],'Мне → не → нравится.'),'Мне не нравится.')
      ]
    },
    {
      id:12, unit:'How you feel', title:'Мне холодно', subtitle:'States, feelings, and being tired', minutes:13, xp:110, level:'A1+',
      goals:['Say how you feel','Use мне + state','Use feminine устала'],
      vocab:[
        {russian:'Мне холодно.',english:'I am cold.',translit:'Mne kholodno.'},
        {russian:'Мне жарко.',english:'I am hot.',translit:'Mne zharko.'},
        {russian:'Я устала.',english:'I am tired. (female speaker)',translit:'Ya ustala.'},
        {russian:'Всё нормально.',english:'Everything is fine / I’m okay.',translit:'Vsyo normalno.'}
      ],
      steps:[
        L('Say “I am cold” the Russian way','Мне холодно.','I am cold.','Russian uses «мне» — literally “to me.”',
          G('Мне + state word.',[['EXPERIENCER','Мне','to me'],['STATE','холодно','cold']],'Мне → STATE.')),
        C('Which means “I am hot”?',['Мне жарко.','Я жарко.','Мне холодно.'],'Мне жарко.',
          G('Use the same «мне + state» frame.',[['EXPERIENCER','Мне','to me'],['STATE','жарко','hot']],'Мне → жарко.')),
        L('A different structure for tired','Я устала.','I am tired.','«Устала» behaves like a feminine past-form adjective-like state; a male speaker says «устал».',
          G('Female speaker: Я + устала.',[['SUBJECT','Я','I'],['PREDICATE/STATE','устала','am tired']],'SUBJECT → STATE.')),
        S('Listen for reassurance','Всё нормально.',['Everything is fine / I’m okay.','I am very tired.','It is cold outside.'],'Everything is fine / I’m okay.',
          G('This is a fixed everyday phrase.',[['SUBJECT','Всё','everything'],['STATE','нормально','fine / okay']],'SUBJECT → STATE.'),'Everything is fine / I’m okay.'),
        B('Build: “I am cold.”',['холодно','Мне'],['Мне','холодно'],
          G('Do not translate “I am” literally.',[['EXPERIENCER','Мне','to me'],['STATE','холодно','cold']],'Мне → STATE.'),'Мне холодно.'),
        T('Type the female form “I am tired”',['я устала','Я устала'],'я + у...',
          G('For the female learner, practice «устала» as the default self-reference.',[['SUBJECT','я','I'],['STATE','устала','tired']],'SUBJECT → STATE.'),'Я устала.')
      ]
    },
    {
      id:13, unit:'Longer thoughts', title:'И, но, потому что', subtitle:'Connect ideas without making Russian complicated', minutes:15, xp:120, level:'A1+ → A2',
      goals:['Join two ideas','Explain a reason','Avoid repeating the same subject'],
      vocab:[
        {russian:'и',english:'and',translit:'i'}, {russian:'но',english:'but',translit:'no'},
        {russian:'потому что',english:'because',translit:'potomu chto'},
        {russian:'Я дома, потому что я устала.',english:'I’m home because I’m tired.',translit:'Ya doma, potomu chto ya ustala.'}
      ],
      steps:[
        L('Join two actions','Я готовлю и слушаю музыку.','I am cooking and listening to music.','When the subject is the same, Russian usually does not repeat «я».',
          G('One subject can control two predicates.',[['SUBJECT','Я','I'],['PREDICATE 1','готовлю','am cooking'],['CONNECTOR','и','and'],['PREDICATE 2','слушаю','am listening'],['OBJECT','музыку','music']],'SUBJECT → ACTION 1 → и → ACTION 2.')),
        C('Which sentence correctly gives a reason?',['Я дома, потому что я устала.','Я дома, но потому устала что.','Потому я дома что.'],'Я дома, потому что я устала.',
          G('«Потому что» stays together as one connector.',[['MAIN IDEA','Я дома','I am home'],['CONNECTOR','потому что','because'],['REASON','я устала','I am tired']],'MAIN IDEA → потому что → REASON.')),
        L('Use contrast','Я хочу гулять, но на улице дождь.','I want to walk, but it is raining outside.','«Но» marks a contrast between what you want and the situation.',
          G('Idea 1 + но + contrasting idea 2.',[['IDEA 1','Я хочу гулять','I want to walk'],['CONNECTOR','но','but'],['PLACE','на улице','outside'],['SUBJECT','дождь','rain']],'IDEA 1 → но → IDEA 2.')),
        S('Listen for the connector','Я устала, но всё нормально.',['I am tired, but everything is okay.','I am tired because I worked.','Everything was fine yesterday.'],'I am tired, but everything is okay.',
          G('Listen for «но» = but.',[['IDEA 1','Я устала','I am tired'],['CONNECTOR','но','but'],['IDEA 2','всё нормально','everything is okay']],'IDEA 1 → но → IDEA 2.'),'I am tired, but everything is okay.'),
        B('Build: “I’m home because I’m tired.”',['я устала','Я дома','потому что'],['Я дома','потому что','я устала'],
          G('Treat «потому что» as one indivisible connector.',[['MAIN IDEA','Я дома','I am home'],['CONNECTOR','потому что','because'],['REASON','я устала','I am tired']],'MAIN IDEA → connector → REASON.'),'Я дома, потому что я устала.'),
        T('Type “because”',['потому что'],'потому + что',
          G('Two written words, one connector.',[['CONNECTOR','потому что','because']],'It introduces the reason.'))
      ]
    },
    {
      id:14, unit:'Out and about', title:'Можно, пожалуйста?', subtitle:'Cafés, stores, and polite requests', minutes:15, xp:125, level:'A1+ → A2',
      goals:['Order simply','Ask permission','Use polite request frames'],
      vocab:[
        {russian:'Можно кофе, пожалуйста?',english:'Can I have a coffee, please?',translit:'Mozhno kofe, pozhaluysta?'},
        {russian:'Сколько это стоит?',english:'How much does this cost?',translit:'Skolko eto stoit?'},
        {russian:'Можно картой?',english:'Can I pay by card?',translit:'Mozhno kartoy?'},
        {russian:'Без сахара, пожалуйста.',english:'Without sugar, please.',translit:'Bez sakhara, pozhaluysta.'}
      ],
      steps:[
        L('Order without overbuilding the sentence','Можно кофе, пожалуйста?','Can I have a coffee, please?','«Можно» is extremely useful for permission and simple requests.',
          G('Можно + thing + пожалуйста.',[['PERMISSION/REQUEST','Можно','may I / can I have'],['OBJECT','кофе','coffee'],['POLITENESS','пожалуйста','please']],'Можно → OBJECT → пожалуйста?')),
        C('Which asks the price?',['Сколько это стоит?','Где это кофе?','Можно это сколько?'],'Сколько это стоит?',
          G('Question word + subject + predicate.',[['QUESTION','Сколько','how much'],['SUBJECT','это','this'],['PREDICATE','стоит','costs']],'QUESTION → SUBJECT → PREDICATE.')),
        L('A compact payment question','Можно картой?','Can I pay by card?','The full verb “pay” is omitted because the context makes it obvious.',
          G('Можно + method is enough in a payment context.',[['PERMISSION','Можно','can I'],['METHOD','картой','by card']],'Можно → METHOD?')),
        S('Listen for the modification','Без сахара, пожалуйста.',['Without sugar, please.','With extra sugar, please.','No coffee, thanks.'],'Without sugar, please.',
          G('«Без + noun» means “without + noun.”',[['PREPOSITION','Без','without'],['NOUN','сахара','sugar'],['POLITENESS','пожалуйста','please']],'Без → noun → пожалуйста.'),'Without sugar, please.'),
        B('Build: “How much does this cost?”',['стоит','Сколько','это'],['Сколько','это','стоит'],
          G('Question first.',[['QUESTION','Сколько','how much'],['SUBJECT','это','this'],['PREDICATE','стоит','costs']],'QUESTION → SUBJECT → PREDICATE.'),'Сколько это стоит?'),
        T('Type “please”',['пожалуйста'],'по-жал-уй-ста',
          G('Use it to soften requests.',[['POLITENESS','пожалуйста','please']],'Usually at the end or after the requested item.'))
      ]
    },
    {
      id:15, unit:'Checkpoint', title:'Вечер вместе', subtitle:'A mini-conversation using what you already know', minutes:16, xp:150, level:'Checkpoint A1+',
      goals:['Combine familiar patterns','Understand a short couple dialogue','Produce useful Russian without a new grammar load'],
      vocab:[
        {russian:'Ты скоро?',english:'Will you be here soon?',translit:'Ty skoro?'},
        {russian:'Да, я уже еду.',english:'Yes, I’m already on my way.',translit:'Da, ya uzhe yedu.'},
        {russian:'Что будем есть?',english:'What will we eat?',translit:'Chto budem yest?'},
        {russian:'Потом пойдём гулять.',english:'Then we’ll go for a walk.',translit:'Potom poydyom gulyat.'}
      ],
      steps:[
        L('Read the first exchange as a real text conversation','— Ты скоро?\n— Да, я уже еду.','— Will you be here soon?\n— Yes, I’m already on my way.','Nothing new here: this checkpoint recombines earlier patterns.',
          G('Recognize chunks before analyzing every ending.',[['QUESTION','Ты скоро?','will you be here soon?'],['ANSWER','Да','yes'],['SUBJECT','я','I'],['STATUS','уже','already'],['PREDICATE','еду','am on my way']],'Question → short answer.')),
        C('Your partner asks «Что будем есть?» What does it mean?',['What will we eat?','Where will we eat?','What did we eat?'],'What will we eat?',
          G('«Будем + infinitive» marks “we will…”.',[['QUESTION','Что','what'],['AUXILIARY','будем','will we'],['INFINITIVE','есть','eat']],'QUESTION → будем → ACTION.')),
        L('Continue the evening plan','Потом пойдём гулять.','Then we’ll go for a walk.','«Потом» organizes the sequence: now one thing, then another.',
          G('Time/sequencing word + invitation/future movement + activity.',[['SEQUENCE','Потом','then'],['PREDICATE','пойдём','we will go'],['INFINITIVE','гулять','walk']],'SEQUENCE → PREDICATE → ACTIVITY.')),
        S('Listen to the full useful sequence','Я уже дома. Хочешь кофе? Потом пойдём гулять.',['I’m already home. Want coffee? Then we’ll go for a walk.','I’m going to work. The dogs want food.','I was home yesterday because it rained.'],'I’m already home. Want coffee? Then we’ll go for a walk.',
          G('Process one short clause at a time.',[['CLAUSE 1','Я уже дома','I’m already home'],['CLAUSE 2','Хочешь кофе?','Want coffee?'],['CLAUSE 3','Потом пойдём гулять','Then we’ll go for a walk']],'Clause 1 → question → next plan.'),'I’m already home. Want coffee? Then we’ll go for a walk.'),
        B('Build the message: “Yes, I’m already on my way.”',['я','еду','Да','уже'],['Да','я','уже','еду'],
          G('Answer word first, then subject, status, action.',[['ANSWER','Да','yes'],['SUBJECT','я','I'],['STATUS','уже','already'],['PREDICATE','еду','am on my way']],'ANSWER → SUBJECT → уже → ACTION.'),'Да, я уже еду.'),
        T('Type the natural question “What will we do?”',['что будем делать','Что будем делать'],'что + будем + делать',
          G('This tests the future “we” frame from Lesson 6.',[['QUESTION','что','what'],['AUXILIARY','будем','will we'],['INFINITIVE','делать','do']],'QUESTION → AUXILIARY → INFINITIVE.'),'Что будем делать?')
      ]
    }
  ];

  const dailyPhrases = [
    {russian:'Ты скоро?', english:'Will you be here soon?', context:'Text your partner'},
    {russian:'Я уже еду.', english:'I’m already on my way.', context:'On the way home'},
    {russian:'Хочешь кофе?', english:'Do you want coffee?', context:'At home'},
    {russian:'Что будем есть?', english:'What will we eat?', context:'Dinner'},
    {russian:'Пойдём гулять?', english:'Shall we go for a walk?', context:'With the dogs'},
    {russian:'Мне холодно.', english:'I’m cold.', context:'At home or outside'},
    {russian:'Скоро буду дома.', english:'I’ll be home soon.', context:'Quick message'}
  ];

  const couplePractice = [
    {scene:'You are leaving the grocery store and heading home.', target:'Я уже еду домой.', help:'I’m already on my way home.'},
    {scene:'Ask your husband if he wants coffee.', target:'Хочешь кофе?', help:'Do you want coffee?'},
    {scene:'Ask what you two will do tonight.', target:'Что будем делать?', help:'What will we do?'},
    {scene:'Tell him you are tired but okay.', target:'Я устала, но всё нормально.', help:'I’m tired, but everything is okay.'},
    {scene:'Suggest walking the dogs.', target:'Пойдём гулять?', help:'Shall we go for a walk?'},
    {scene:'Say you need to drive / go.', target:'Мне нужно ехать.', help:'I need to go.'},
    {scene:'Say you like Eugene.', target:'Мне нравится Юджин.', help:'I like Eugene.'},
    {scene:'Ask where he is.', target:'Где ты?', help:'Where are you?'}
  ];

  window.FORMOMMY_COURSE = {
    version: 2,
    title: 'Russian for Us',
    level: 'A1 → A2',
    lessons,
    dailyPhrases,
    couplePractice
  };
})();