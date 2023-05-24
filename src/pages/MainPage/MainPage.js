import React, {useMemo} from 'react';
import {IS_STAFF} from 'config/constants';
import {useTranslation} from 'react-i18next';

import {getTranslations} from './translations';
import {contentContainer} from './MainPage.style';
const MainPage = () => {
  const number = 6;
  const {t} = useTranslation();
  const translations = useMemo(() => getTranslations(t, number), [t, number]);

  return (
    <div className={contentContainer}>
      {IS_STAFF ? <div>MAIN PAGE for staff</div> : <div>MAIN PAGE for customer</div>}
      <p />
      Translation using variable:
      <p />
      {translations.helloGuest}
    </div>
  );
};

export default MainPage;
