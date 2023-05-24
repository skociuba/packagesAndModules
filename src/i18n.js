import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import mainPageEN from './pages/MainPage/translations/en.json';
import mainPagePL from './pages/MainPage/translations/pl.json';
import testPageEN from './pages/Test/translations/en.json';
import testPagePL from './pages/Test/translations/pl.json';
import applicationDisplayEN from './pages/Application/translations/en.json';
import applicationDisplayPL from './pages/Application/translations/pl.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        mainPage: mainPageEN,
        application: applicationDisplayEN,
        test: testPageEN,
      },
      pl: {
        application: applicationDisplayPL,
        mainPage: mainPagePL,
        test: testPagePL,
      },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {},
    ns: [mainPageEN],
    defaultNS: 'translations',
    keySeparator: false,
  })
  .catch(console.error);

export default i18n;
