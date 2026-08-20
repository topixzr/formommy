(() => {
  if (typeof FORMOMMY_MODULES === 'undefined') return;
  FORMOMMY_MODULES.push(
    {
      id: 5,
      title: 'Time, Food & Everyday Control',
      subtitle: 'Start handling scheduling, meals, possession, and practical availability.',
      lessonIds: [21,22,23,24,25],
      outcome: 'Coordinate ordinary plans and needs with fewer English-to-Russian translations.',
      canDo: ['Ask and tell simple times','Talk about weekend plans','Choose food and dinner','Say what you have and do not have'],
      phrases: ['Который час?','Какие планы на выходные?','Что на ужин?','У меня нет времени.']
    },
    {
      id: 6,
      title: 'Independent Everyday Russian',
      subtitle: 'Use Russian around ability, messages, driving, weather, and a full Saturday plan.',
      lessonIds: [26,27,28,29,30],
      outcome: 'Put several familiar patterns together in one practical conversation.',
      canDo: ['Say what you can do','Coordinate by phone or text','Use basic driving language','Talk about Oregon weather','Plan a Saturday in Eugene'],
      phrases: ['Я могу помочь.','Напиши мне.','Я за рулём.','Сейчас идёт дождь.']
    }
  );
})();