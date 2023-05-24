import React, {Suspense, useLayoutEffect, useState, useMemo} from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {shared} from 'sharedConstants';
import {media, useMedia} from 'components/Media';
import {useTranslation} from 'react-i18next';

import {Row, Column} from './../../components/Packages/Grid/index';
import {getTranslations} from './translations';
import Menu from './Menu/Menu';
import {appCheckConfig} from './actions';
import {applicationWrapper, mobileApplicationWrapper} from './Application.style';

export const handleNavigate = (navigate, to) => {
  const toElements = to?.split(':') || [];

  if (toElements.includes('http') || toElements.includes('https')) {
    window.open(to, '_blank');
  } else {
    navigate(to);
  }
};

const Application = ({children}) => {
  const [checked, setChecked] = useState(true);
  const isMobile = useMedia(media.device.mobile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const config = useSelector((state) => state.application.config);

  const {t, i18n} = useTranslation();
  const translations = useMemo(() => getTranslations(t), [t]);

  useLayoutEffect(() => {
    if (!config || !('urls' in config)) {
      dispatch(appCheckConfig());
    }
  });

  const handleContent = () => {
    if (checked) {
      setChecked(!checked);
    } else {
      setChecked(!checked);
    }
  };
  const handleNavigation = (to) => {
    handleNavigate(navigate, to);
    handleContent();
  };

  const headerData = {
    ...shared.header,
    menu: {
      ...shared.header.menu,
      primary: [
        ...shared.header.menu.primary.filter(
          (menuItem) =>
            menuItem.showFor.includes(process.env.REACT_APP_CHANNEL_TYPE) && {
              name: menuItem?.name,
              to: menuItem.to,
            },
        ),
      ],
    },
  };

  const content = () => {
    if (isMobile) {
      return (
        <div>
          <button onClick={() => i18n.changeLanguage('en')}>{translations.English}</button>
          <button onClick={() => i18n.changeLanguage('pl')}>{translations.Polish}</button>
          <Row>
            {checked ? (
              <Column>
                <div className={mobileApplicationWrapper}>
                  <button onClick={() => handleContent()}>|||</button>
                  <Suspense fallback={<div />}>{children}</Suspense>
                </div>
              </Column>
            ) : (
              <Column>
                <Menu
                  translations={translations}
                  data={headerData}
                  handleNavigation={handleNavigation}
                  rightSideMenuElements={<div />}
                />
              </Column>
            )}
          </Row>
        </div>
      );
    } else {
      return (
        <>
          <button onClick={() => i18n.changeLanguage('en')}>{translations.English}</button>
          <button onClick={() => i18n.changeLanguage('pl')}>{translations.Polish}</button>
          <Menu
            translations={translations}
            data={headerData}
            handleNavigation={handleNavigation}
            rightSideMenuElements={<div />}
          />
          <div className={applicationWrapper}>
            <Suspense fallback={<div />}>{children}</Suspense>
          </div>
        </>
      );
    }
  };
  return <div data-testid="applicationContainer"> {content()}</div>;
};
export default Application;
