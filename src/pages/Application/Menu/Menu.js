import React from 'react';
import {media, useMedia} from 'components/Media';

import {Row, Column} from './../../../components/Packages/Grid/index';
import {menuTheme, mobileMenuContainer, desktopContainer, activeButton} from './Menu.style';

const Menu = ({data, handleNavigation, translations}) => {
  const isMobile = useMedia(media.device.mobile);

  const menuMobile = data.menu.primary.map((item, i) => (
    <Row spacing={1} key={i}>
      <Column>
        <button onClick={() => handleNavigation(item.to)}>{translations[item.name]}</button>
      </Column>
    </Row>
  ));

  const menuDesktop = data.menu.primary.map((item, i) => (
    <button
      key={i}
      className={
        window.location.hash && window.location.hash.substring(0) === `#${item?.to}`
          ? activeButton
          : ''
      }
      onClick={() => handleNavigation(item.to)}>
      {translations[item.name]}
    </button>
  ));
  const menu = isMobile ? (
    <div className={mobileMenuContainer}>{menuMobile}</div>
  ) : (
    <div className={desktopContainer}>{menuDesktop}</div>
  );
  return <div className={menuTheme}>{menu}</div>;
};
export default Menu;
