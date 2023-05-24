const MAIN_PAGE = 'mainPage';

export const getTranslations = (t, number) => ({
  helloGuest: t(`${MAIN_PAGE}:helloGuest`, {number}),
  todayIs: t(`${MAIN_PAGE}:todayIs`),
  newYear: t(`${MAIN_PAGE}:newYear`),
});
