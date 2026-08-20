(() => {
  const course = window.FORMOMMY_COURSE;
  if (!course) throw new Error('Base course must load before course-pack-2.js');
  const G = (rule, parts, order, tip = '') => ({ rule, parts, order, tip });
  const L = (prompt, russian, english, note, grammar, translit='') => ({type:'learn',prompt,russian,translation:english,note,grammar,translit});
  const C = (prompt, answers, correct, grammar, translation='') => ({type:'choice',prompt,answers,correct,grammar,translation});
  const S = (prompt, speech, answers, correct, grammar, translation='') => ({type:'listen',prompt,speech,answers,correct,grammar,translation});
  const B = (prompt, chips, correct, grammar, answerText='') => ({type:'build',prompt,chips,correct,grammar,answerText:answerText || correct.join(' ')});
  const T = (prompt, answers, hint, grammar, answerText='') => ({type:'type',prompt,answers,hint,grammar,answerText:answerText || answers[0]});

  const lessons = [
    {
      id:21, unit:'Time', title:'Который час?', subtitle:'Clock time without a grammar table', minutes:14, xp:140, level:'A1+ → A2',
      goals:['Ask what time it is','Tell simple whole-hour times','Say when something starts'],
      vocab:[
        {russian:'Который час?',english:'What time is it?',translit:'Kotoryy chas?'},
        {russian:'Сейчас пять часов.',english:'It is five o’clock now.',translit:'Seychas pyat chasov.'},
        {russian:'В семь часов.',english:'At seven o’clock.',translit:'V sem chasov.'},
        {russian:'Во сколько?',english:'At what time?',translit:'Vo skolko?'}
      ],
      steps:[
        L('Ask for the current time','Который час?','What time is it?','Learn this as a fixed everyday question. You do not need to decline «который» yet.',
          G('Fixed time question.',[['QUESTION','Который час?','what time is it?']],'Use the phrase as one unit.')),
        C('Which means “It is five o’clock now”?',['Сейчас пять часов.','Сейчас в пять часов.','Вчера пять час.'],'Сейчас пять часов.',
          G('For a simple statement of the current hour, use «Сейчас + number + часов».',[['TIME','Сейчас','now'],['CLOCK TIME','пять часов','five o’clock']],'TIME → CLOCK TIME.')),
        L('Say when something happens','В семь часов.','At seven o’clock.','«В» marks the scheduled time: at seven.',
          G('At + clock time: в + time.',[['PREPOSITION','В','at'],['CLOCK TIME','семь часов','seven o’clock']],'В → CLOCK TIME.')),
        S('Listen for the question','Во сколько ты будешь дома?',['What time will you be home?','How long will you be home?','Where will you be tonight?'],'What time will you be home?',
          G('«Во сколько?» asks “at what time?”',[['QUESTION','Во сколько','at what time'],['SUBJECT','ты','you'],['PREDICATE','будешь','will be'],['PLACE','дома','at home']],'QUESTION → SUBJECT → FUTURE → PLACE.'),'What time will you be home?'),
        B('Build: “At seven o’clock.”',['семь часов','В'],['В','семь часов'],
          G('Put «в» directly before the clock time.',[['PREPOSITION','В','at'],['CLOCK TIME','семь часов','seven o’clock']],'PREPOSITION → TIME.'),'В семь часов.'),
        T('Type “What time is it?”',['который час','Который час'],'который + час',
          G('Memorize the complete question first.',[['QUESTION','который час','what time is it?']],'Use question intonation.'),'Который час?')
      ]
    },
    {
      id:22, unit:'Week', title:'Сегодня и в выходные', subtitle:'Days, today, and weekend plans', minutes:14, xp:140, level:'A1+ → A2',
      goals:['Name today/tomorrow/weekend','Ask about weekend plans','Use в + day as a practical chunk'],
      vocab:[
        {russian:'сегодня',english:'today',translit:'segodnya'},
        {russian:'в выходные',english:'on the weekend',translit:'v vykhodnyye'},
        {russian:'в субботу',english:'on Saturday',translit:'v subbotu'},
        {russian:'Какие планы?',english:'What are the plans?',translit:'Kakiye plany?'}
      ],
      steps:[
        L('Set today as the time context','Сегодня я работаю.','I am working today.','«Сегодня» does not change form and often comes first.',
          G('Time word + subject + present action.',[['TIME','Сегодня','today'],['SUBJECT','я','I'],['PREDICATE','работаю','work / am working']],'TIME → SUBJECT → ACTION.')),
        C('Which means “on Saturday”?',['в субботу','на суббота','в субботе'],'в субботу',
          G('Learn «в субботу» as one scheduling chunk.',[['PREPOSITION','в','on'],['DAY','субботу','Saturday']],'в → DAY.')),
        L('Ask about weekend plans','Какие планы на выходные?','What are the plans for the weekend?','This is a natural compact planning question.',
          G('Question word + plans + time target.',[['QUESTION','Какие','what / which'],['NOUN','планы','plans'],['TIME TARGET','на выходные','for the weekend']],'QUESTION → PLANS → TIME TARGET.')),
        S('Listen for the plan','В выходные будем дома.',['We’ll be home on the weekend.','We were home on Saturday.','We work every weekend.'],'We’ll be home on the weekend.',
          G('Time first + «будем» future.',[['TIME','В выходные','on the weekend'],['PREDICATE','будем','we will be'],['PLACE','дома','at home']],'TIME → FUTURE → PLACE.'),'We’ll be home on the weekend.'),
        B('Build: “Today I am working.”',['я','Сегодня','работаю'],['Сегодня','я','работаю'],
          G('Time first is a clear neutral order.',[['TIME','Сегодня','today'],['SUBJECT','я','I'],['PREDICATE','работаю','am working']],'TIME → SUBJECT → ACTION.'),'Сегодня я работаю.'),
        T('Type “on the weekend”',['в выходные','В выходные'],'в + выходные',
          G('Memorize this phrase as a time chunk.',[['TIME','в выходные','on the weekend']],'It can go first or later in the sentence.'),'В выходные.')
      ]
    },
    {
      id:23, unit:'Food', title:'Что на ужин?', subtitle:'Meals, food choices, and feminine objects', minutes:15, xp:145, level:'A1+ → A2',
      goals:['Ask what is for dinner','Use common food objects after хочу / готовлю','Notice common -а → -у object changes'],
      vocab:[
        {russian:'Что на ужин?',english:'What’s for dinner?',translit:'Chto na uzhin?'},
        {russian:'Я хочу пиццу.',english:'I want pizza.',translit:'Ya khochu pitstsu.'},
        {russian:'Я готовлю пасту.',english:'I’m cooking pasta.',translit:'Ya gotovlyu pastu.'},
        {russian:'Давай закажем еду.',english:'Let’s order food.',translit:'Davay zakazhem yedu.'}
      ],
      steps:[
        L('Ask the dinner question','Что на ужин?','What’s for dinner?','A short zero-verb question that is useful at home.',
          G('Question word + meal phrase.',[['QUESTION','Что','what'],['MEAL','на ужин','for dinner']],'QUESTION → MEAL.')),
        C('Which means “I want pizza”?',['Я хочу пиццу.','Я хочу пицца.','Мне пиццу нравится хочу.'],'Я хочу пиццу.',
          G('Many feminine -а nouns change to -у when they are the direct object: пицца → пиццу.',[['SUBJECT','Я','I'],['PREDICATE','хочу','want'],['OBJECT','пиццу','pizza']],'SUBJECT → WANT → OBJECT.')),
        L('Reuse the same object pattern','Я готовлю пасту.','I am cooking pasta.','«Паста» becomes «пасту» as the direct object.',
          G('Common feminine object change: -а → -у.',[['SUBJECT','Я','I'],['PREDICATE','готовлю','am cooking'],['OBJECT','пасту','pasta']],'SUBJECT → ACTION → OBJECT.','For now, notice the pattern rather than memorizing a full case chart.')),
        S('Listen for the suggestion','Давай закажем еду.',['Let’s order food.','Let’s cook pasta.','I already ordered coffee.'],'Let’s order food.',
          G('«Давай + we-form» is a common “let’s…” pattern.',[['INVITATION','Давай','let’s'],['PREDICATE','закажем','we’ll order'],['OBJECT','еду','food']],'INVITATION → ACTION → OBJECT.'),'Let’s order food.'),
        B('Build: “I’m cooking pasta.”',['пасту','готовлю','Я'],['Я','готовлю','пасту'],
          G('Use subject + action + direct object.',[['SUBJECT','Я','I'],['PREDICATE','готовлю','am cooking'],['OBJECT','пасту','pasta']],'SUBJECT → ACTION → OBJECT.'),'Я готовлю пасту.'),
        T('Type “What’s for dinner?”',['что на ужин','Что на ужин'],'что + на ужин',
          G('No present-tense “is” is needed.',[['QUESTION','что','what'],['MEAL','на ужин','for dinner']],'QUESTION → MEAL.'),'Что на ужин?')
      ]
    },
    {
      id:24, unit:'Possession', title:'У меня есть', subtitle:'Say what you have without using “I have” word-for-word', minutes:15, xp:150, level:'A2 bridge',
      goals:['Say what you have','Ask what your partner has','Understand the у + person pattern'],
      vocab:[
        {russian:'У меня есть машина.',english:'I have a car.',translit:'U menya yest mashina.'},
        {russian:'У тебя есть время?',english:'Do you have time?',translit:'U tebya yest vremya?'},
        {russian:'У нас есть кофе.',english:'We have coffee.',translit:'U nas yest kofe.'},
        {russian:'У меня есть вопрос.',english:'I have a question.',translit:'U menya yest vopros.'}
      ],
      steps:[
        L('Learn the Russian possession frame','У меня есть машина.','I have a car.','Russian often expresses possession as “at me there is a car.”',
          G('У + person + есть + thing.',[['POSSESSOR','У меня','at me / I have'],['EXISTENCE','есть','there is'],['THING','машина','a car']],'POSSESSOR → есть → THING.')),
        C('Ask “Do you have time?”',['У тебя есть время?','Ты имеешь время?','У тебя время быть?'],'У тебя есть время?',
          G('For a spouse, use informal «у тебя».',[['POSSESSOR','У тебя','you have'],['EXISTENCE','есть','there is'],['THING','время','time']],'POSSESSOR → есть → THING?')),
        L('Use the “we” possessor','У нас есть кофе.','We have coffee.','«У нас» means “we have / at our place.”',
          G('Change the possessor, keep the rest of the frame.',[['POSSESSOR','У нас','we have'],['EXISTENCE','есть','there is'],['THING','кофе','coffee']],'POSSESSOR → есть → THING.')),
        S('Listen for what the speaker has','У меня есть вопрос.',['I have a question.','I have no time.','Do you have a car?'],'I have a question.',
          G('Listen for «у меня есть» = I have.',[['POSSESSOR','У меня','I have'],['EXISTENCE','есть','there is'],['THING','вопрос','a question']],'POSSESSOR → есть → THING.'),'I have a question.'),
        B('Build: “We have coffee.”',['кофе','У нас','есть'],['У нас','есть','кофе'],
          G('Keep «у нас» together.',[['POSSESSOR','У нас','we have'],['EXISTENCE','есть','there is'],['THING','кофе','coffee']],'POSSESSOR → есть → THING.'),'У нас есть кофе.'),
        T('Type “Do you have time?”',['у тебя есть время','У тебя есть время'],'у тебя + есть + время',
          G('Use «у тебя» for informal “you have.”',[['POSSESSOR','у тебя','you have'],['EXISTENCE','есть','there is'],['THING','время','time']],'POSSESSOR → есть → THING?'),'У тебя есть время?')
      ]
    },
    {
      id:25, unit:'Possession', title:'У меня нет', subtitle:'Say what you do not have', minutes:14, xp:150, level:'A2 bridge',
      goals:['Negate possession','Use нет with high-frequency chunks','Ask and answer about time or money'],
      vocab:[
        {russian:'У меня нет времени.',english:'I don’t have time.',translit:'U menya net vremeni.'},
        {russian:'У нас нет молока.',english:'We don’t have milk.',translit:'U nas net moloka.'},
        {russian:'У меня нет наличных.',english:'I don’t have cash.',translit:'U menya net nalichnykh.'},
        {russian:'Нет проблем.',english:'No problem.',translit:'Net problem.'}
      ],
      steps:[
        L('Flip possession from yes to no','У меня нет времени.','I don’t have time.','When possession is absent, «есть» becomes «нет» and the following noun often changes form.',
          G('У + person + нет + thing.',[['POSSESSOR','У меня','I have'],['NEGATIVE EXISTENCE','нет','there is no'],['THING','времени','time']],'POSSESSOR → нет → THING.','Learn «нет времени» as a chunk before studying the full genitive case.')),
        C('Which means “We don’t have milk”?',['У нас нет молока.','У нас есть молока.','Мы нет молоко.'],'У нас нет молока.',
          G('Use «у нас нет…» for “we don’t have…”.',[['POSSESSOR','У нас','we have'],['NEGATIVE','нет','no / do not have'],['THING','молока','milk']],'POSSESSOR → нет → THING.')),
        L('A useful payment sentence','У меня нет наличных.','I don’t have cash.','«Наличные» means cash; after «нет» you will often hear «наличных».',
          G('Keep the possession-negation frame.',[['POSSESSOR','У меня','I have'],['NEGATIVE','нет','no'],['THING','наличных','cash']],'POSSESSOR → нет → THING.')),
        S('Listen for the reassuring phrase','Нет проблем.',['No problem.','There is a problem.','I have no money.'],'No problem.',
          G('«Нет проблем» is a fixed high-frequency phrase.',[['NEGATIVE','Нет','no'],['THING','проблем','problems']],'Learn as one chunk.'),'No problem.'),
        B('Build: “I don’t have time.”',['времени','нет','У меня'],['У меня','нет','времени'],
          G('Keep the negative frame in this order.',[['POSSESSOR','У меня','I have'],['NEGATIVE','нет','do not have'],['THING','времени','time']],'POSSESSOR → нет → THING.'),'У меня нет времени.'),
        T('Type “No problem”',['нет проблем','Нет проблем'],'нет + проблем',
          G('Memorize this everyday phrase as a unit.',[['PHRASE','нет проблем','no problem']],'It stands alone.'),'Нет проблем.')
      ]
    },
    {
      id:26, unit:'Ability', title:'Я могу', subtitle:'Can, can’t, and asking for help', minutes:15, xp:155, level:'A2 bridge',
      goals:['Say what you can or cannot do','Ask “Can you…?”','Use могу / можешь + infinitive'],
      vocab:[
        {russian:'Я могу помочь.',english:'I can help.',translit:'Ya mogu pomoch.'},
        {russian:'Ты можешь помочь?',english:'Can you help?',translit:'Ty mozhesh pomoch?'},
        {russian:'Я не могу сейчас.',english:'I can’t right now.',translit:'Ya ne mogu seychas.'},
        {russian:'Можешь подождать?',english:'Can you wait?',translit:'Mozhesh podozhdat?'}
      ],
      steps:[
        L('Say what you can do','Я могу помочь.','I can help.','After «могу», use an infinitive such as «помочь».',
          G('Я + могу + infinitive.',[['SUBJECT','Я','I'],['MODAL','могу','can'],['INFINITIVE','помочь','help']],'SUBJECT → CAN → ACTION.')),
        C('Which means “Can you help?”',['Ты можешь помочь?','Ты могу помочь?','Можешь я помочь?'],'Ты можешь помочь?',
          G('With «ты», use «можешь».',[['SUBJECT','Ты','you'],['MODAL','можешь','can'],['INFINITIVE','помочь','help']],'SUBJECT → CAN → ACTION?')),
        L('Say you cannot do it now','Я не могу сейчас.','I can’t right now.','Put «не» directly before «могу». The action can be omitted if context makes it obvious.',
          G('Subject + не + modal + time.',[['SUBJECT','Я','I'],['NEGATION','не','not'],['MODAL','могу','can'],['TIME','сейчас','right now']],'SUBJECT → не → CAN → TIME.')),
        S('Listen for a practical request','Можешь подождать?',['Can you wait?','Can you drive?','Do you want to wait?'],'Can you wait?',
          G('The subject «ты» can be omitted because «можешь» already points to “you.”',[['MODAL','Можешь','can you'],['INFINITIVE','подождать','wait']],'CAN YOU → ACTION?'),'Can you wait?'),
        B('Build: “I can help.”',['помочь','могу','Я'],['Я','могу','помочь'],
          G('Put the infinitive after the modal verb.',[['SUBJECT','Я','I'],['MODAL','могу','can'],['INFINITIVE','помочь','help']],'SUBJECT → MODAL → ACTION.'),'Я могу помочь.'),
        T('Type “Can you wait?”',['можешь подождать','Можешь подождать'],'можешь + подождать',
          G('No «ты» is required in this short question.',[['MODAL','можешь','can you'],['INFINITIVE','подождать','wait']],'MODAL → ACTION?'),'Можешь подождать?')
      ]
    },
    {
      id:27, unit:'Messages', title:'Позвони мне', subtitle:'Calls, texts, and quick coordination', minutes:14, xp:155, level:'A2 bridge',
      goals:['Ask someone to call or text','Say you will call later','Use мне as the receiver'],
      vocab:[
        {russian:'Позвони мне.',english:'Call me.',translit:'Pozvoni mne.'},
        {russian:'Напиши мне.',english:'Text me / write to me.',translit:'Napishi mne.'},
        {russian:'Я позвоню позже.',english:'I’ll call later.',translit:'Ya pozvonyu pozzhe.'},
        {russian:'Я тебе напишу.',english:'I’ll text you.',translit:'Ya tebe napishu.'}
      ],
      steps:[
        L('Ask for a call','Позвони мне.','Call me.','«Мне» marks the receiver: call to me.',
          G('Imperative + receiver.',[['IMPERATIVE','Позвони','call'],['RECEIVER','мне','me / to me']],'REQUEST → RECEIVER.')),
        C('Which means “Text me”?',['Напиши мне.','Написала мне.','Я напиши.'],'Напиши мне.',
          G('«Напиши» is the informal imperative “write / text.”',[['IMPERATIVE','Напиши','write / text'],['RECEIVER','мне','me']],'REQUEST → RECEIVER.')),
        L('Promise a later call','Я позвоню позже.','I’ll call later.','«Позвоню» is a compact future form. Learn it as a high-frequency whole word first.',
          G('Subject + future action + later.',[['SUBJECT','Я','I'],['PREDICATE','позвоню','will call'],['TIME','позже','later']],'SUBJECT → ACTION → TIME.')),
        S('Listen for the receiver','Я тебе напишу.',['I’ll text you.','Text me now.','You called me.'],'I’ll text you.',
          G('«Тебе» means “to you” in this receiver role.',[['SUBJECT','Я','I'],['RECEIVER','тебе','to you'],['PREDICATE','напишу','will write / text']],'SUBJECT → RECEIVER → ACTION.'),'I’ll text you.'),
        B('Build: “I’ll call later.”',['позже','Я','позвоню'],['Я','позвоню','позже'],
          G('Use subject + future action + time.',[['SUBJECT','Я','I'],['PREDICATE','позвоню','will call'],['TIME','позже','later']],'SUBJECT → ACTION → TIME.'),'Я позвоню позже.'),
        T('Type “Call me”',['позвони мне','Позвони мне'],'позвони + мне',
          G('Use «мне» as the receiver.',[['IMPERATIVE','позвони','call'],['RECEIVER','мне','me']],'REQUEST → RECEIVER.'),'Позвони мне.')
      ]
    },
    {
      id:28, unit:'Driving', title:'Я за рулём', subtitle:'Car and driving language for daily life', minutes:15, xp:160, level:'A2 bridge',
      goals:['Say you are driving','Ask where the car is','Talk about parking and gas in simple chunks'],
      vocab:[
        {russian:'Я за рулём.',english:'I’m driving / I’m behind the wheel.',translit:'Ya za rulyom.'},
        {russian:'Где машина?',english:'Where is the car?',translit:'Gde mashina?'},
        {russian:'Я припарковалась здесь.',english:'I parked here. (female speaker)',translit:'Ya priparkovalas zdes.'},
        {russian:'Нужно заправиться.',english:'We/I need to get gas.',translit:'Nuzhno zapravitsya.'}
      ],
      steps:[
        L('Say you are driving','Я за рулём.','I’m driving / I’m behind the wheel.','This fixed phrase literally means “I am behind the steering wheel.”',
          G('Subject + fixed position phrase.',[['SUBJECT','Я','I'],['STATE','за рулём','behind the wheel / driving']],'SUBJECT → STATE.')),
        C('Ask where the car is',['Где машина?','Куда машина?','Где машину?'],'Где машина?',
          G('For a stationary object, ask «Где?»',[['QUESTION','Где','where'],['SUBJECT','машина','the car']],'QUESTION → THING?')),
        L('Say where you parked','Я припарковалась здесь.','I parked here.','The female speaker uses «припарковалась».',
          G('Female past + place.',[['SUBJECT','Я','I'],['PREDICATE','припарковалась','parked, female'],['PLACE','здесь','here']],'SUBJECT → PAST ACTION → PLACE.')),
        S('Listen for what the car needs','Нужно заправиться.',['Need to get gas.','Need to park here.','The car is already home.'],'Need to get gas.',
          G('«Нужно + infinitive» states a practical necessity without naming the person.',[['NECESSITY','Нужно','need to'],['INFINITIVE','заправиться','get fuel']],'NEED → ACTION.'),'Need to get gas.'),
        B('Build: “I parked here.”',['здесь','припарковалась','Я'],['Я','припарковалась','здесь'],
          G('Subject + female past action + place.',[['SUBJECT','Я','I'],['PREDICATE','припарковалась','parked'],['PLACE','здесь','here']],'SUBJECT → ACTION → PLACE.'),'Я припарковалась здесь.'),
        T('Type “I’m driving”',['я за рулём','Я за рулём','я за рулем','Я за рулем'],'я + за рулём',
          G('Learn «за рулём» as the driving chunk.',[['SUBJECT','я','I'],['STATE','за рулём','driving']],'SUBJECT → STATE.'),'Я за рулём.')
      ]
    },
    {
      id:29, unit:'Weather', title:'Какая погода?', subtitle:'Weather for deciding what to do', minutes:14, xp:160, level:'A2 bridge',
      goals:['Ask about weather','Describe cold/rain/sun','Connect weather to plans'],
      vocab:[
        {russian:'Какая погода?',english:'What’s the weather like?',translit:'Kakaya pogoda?'},
        {russian:'Сегодня холодно.',english:'It’s cold today.',translit:'Segodnya kholodno.'},
        {russian:'Идёт дождь.',english:'It’s raining.',translit:'Idyot dozhd.'},
        {russian:'Сегодня солнечно.',english:'It’s sunny today.',translit:'Segodnya solnechno.'}
      ],
      steps:[
        L('Ask about the weather','Какая погода?','What’s the weather like?','Treat this as a fixed question before studying adjective agreement in detail.',
          G('Question adjective + noun.',[['QUESTION','Какая','what kind of'],['NOUN','погода','weather']],'QUESTION → NOUN?')),
        C('Which means “It’s cold today”?',['Сегодня холодно.','Сегодня холодная.','Вчера холодно завтра.'],'Сегодня холодно.',
          G('Use the impersonal state word «холодно» for weather.',[['TIME','Сегодня','today'],['STATE','холодно','cold']],'TIME → STATE.')),
        L('Learn the Russian rain phrase','Идёт дождь.','It’s raining.','Russian literally says “rain is going.”',
          G('Predicate + weather subject.',[['PREDICATE','Идёт','is going / falling'],['SUBJECT','дождь','rain']],'PREDICATE → WEATHER SUBJECT.')),
        S('Listen for a sunny day','Сегодня солнечно.',['It’s sunny today.','It’s raining today.','It was cold yesterday.'],'It’s sunny today.',
          G('«Солнечно» is an impersonal weather state word.',[['TIME','Сегодня','today'],['STATE','солнечно','sunny']],'TIME → STATE.'),'It’s sunny today.'),
        B('Build: “It’s raining.”',['дождь','Идёт'],['Идёт','дождь'],
          G('Learn this weather phrase in its common neutral order.',[['PREDICATE','Идёт','is falling'],['SUBJECT','дождь','rain']],'PREDICATE → SUBJECT.'),'Идёт дождь.'),
        T('Type “What’s the weather like?”',['какая погода','Какая погода'],'какая + погода',
          G('Memorize the whole question.',[['QUESTION','какая погода','what’s the weather like?']],'Use question intonation.'),'Какая погода?')
      ]
    },
    {
      id:30, unit:'Checkpoint', title:'Суббота в Юджине', subtitle:'Plan a realistic weekend day together', minutes:18, xp:190, level:'Checkpoint · A2 bridge',
      goals:['Combine time, possession, ability, driving, weather, and food','Follow a longer everyday exchange','Make a simple weekend plan in Russian'],
      vocab:[
        {russian:'Какие планы на сегодня?',english:'What are the plans for today?',translit:'Kakiye plany na segodnya?'},
        {russian:'Сейчас идёт дождь.',english:'It’s raining now.',translit:'Seychas idyot dozhd.'},
        {russian:'Давай сначала выпьем кофе.',english:'Let’s have coffee first.',translit:'Davay snachala vypiyem kofe.'},
        {russian:'Потом поедем гулять с собаками.',english:'Then we’ll drive/go to walk the dogs.',translit:'Potom poyedem gulyat s sobakami.'}
      ],
      steps:[
        L('Start with a weekend planning exchange','— Какие планы на сегодня?\n— Пока не знаю.','— What are the plans for today?\n— I don’t know yet.','This checkpoint uses short conversational chunks instead of a long textbook dialogue.',
          G('Question about plans → short status answer.',[['QUESTION','Какие планы на сегодня?','what are the plans for today?'],['STATUS','Пока не знаю','I don’t know yet']],'QUESTION → SHORT ANSWER.')),
        C('You look outside and say «Сейчас идёт дождь.»',['It’s raining now.','It will be sunny later.','It was cold yesterday.'],'It’s raining now.',
          G('«Сейчас» sets the time; «идёт дождь» is the rain phrase.',[['TIME','Сейчас','now'],['PREDICATE','идёт','is falling'],['SUBJECT','дождь','rain']],'TIME → WEATHER PHRASE.')),
        L('Make a simple sequence','Давай сначала выпьем кофе. Потом поедем гулять с собаками.','Let’s have coffee first. Then we’ll go walk the dogs.','«Сначала» and «потом» organize a plan without needing complex grammar.',
          G('Sequence word + action, then next sequence word + action.',[['INVITATION','Давай','let’s'],['SEQUENCE','сначала','first'],['ACTION','выпьем кофе','have coffee'],['SEQUENCE','Потом','then'],['ACTION','поедем гулять','we’ll go for a walk']],'INVITATION → FIRST ACTION → THEN → SECOND ACTION.')),
        S('Listen to the coordination message','Я за рулём. Напиши мне, когда будешь готов.',['I’m driving. Text me when you’re ready.','I’m home. Call me tomorrow.','I parked and I have no phone.'],'I’m driving. Text me when you’re ready.',
          G('Process the two clauses separately.',[['STATE','Я за рулём','I’m driving'],['REQUEST','Напиши мне','text me'],['TIME CLAUSE','когда будешь готов','when you are ready']],'STATE → REQUEST + timing.'),'I’m driving. Text me when you’re ready.'),
        B('Build the plan: “Let’s have coffee first.”',['кофе','сначала','Давай','выпьем'],['Давай','сначала','выпьем','кофе'],
          G('Invitation + sequence + action + object.',[['INVITATION','Давай','let’s'],['SEQUENCE','сначала','first'],['PREDICATE','выпьем','we’ll drink / have'],['OBJECT','кофе','coffee']],'INVITATION → FIRST → ACTION → OBJECT.'),'Давай сначала выпьем кофе.'),
        T('Type “What are the plans for today?”',['какие планы на сегодня','Какие планы на сегодня'],'какие + планы + на сегодня',
          G('Use «на сегодня» for “for today” in this planning question.',[['QUESTION','какие','what'],['NOUN','планы','plans'],['TIME TARGET','на сегодня','for today']],'QUESTION → PLANS → TIME TARGET.'),'Какие планы на сегодня?')
      ]
    }
  ];

  course.lessons.push(...lessons);
  course.dailyPhrases.push(
    {russian:'Который час?',english:'What time is it?',context:'Checking time'},
    {russian:'Какие планы на выходные?',english:'What are the plans for the weekend?',context:'Planning together'},
    {russian:'У тебя есть время?',english:'Do you have time?',context:'Before asking something'},
    {russian:'Я могу помочь.',english:'I can help.',context:'At home'},
    {russian:'Позвони мне.',english:'Call me.',context:'Quick coordination'},
    {russian:'Я за рулём.',english:'I’m driving.',context:'In the car'},
    {russian:'Идёт дождь.',english:'It’s raining.',context:'Oregon weather'}
  );
  course.couplePractice.push(
    {scene:'Ask what time it is.',target:'Который час?',help:'What time is it?'},
    {scene:'Ask about weekend plans.',target:'Какие планы на выходные?',help:'What are the plans for the weekend?'},
    {scene:'Ask if your husband has time.',target:'У тебя есть время?',help:'Do you have time?'},
    {scene:'Say you do not have time right now.',target:'У меня нет времени сейчас.',help:'I don’t have time right now.'},
    {scene:'Offer to help.',target:'Я могу помочь.',help:'I can help.'},
    {scene:'Ask him to text you.',target:'Напиши мне.',help:'Text me.'},
    {scene:'Say you are driving.',target:'Я за рулём.',help:'I’m driving.'},
    {scene:'Say it is raining now.',target:'Сейчас идёт дождь.',help:'It’s raining now.'}
  );
  course.version = 3;
})();
