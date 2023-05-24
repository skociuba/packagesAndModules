import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tab';
import {grey, yellow} from '@mui/material/colors';

import {getPanelId, getTabId, useTabContext} from './TabContext';

const tabColors = {
  light: {
    label: 'red',
    background: 'none',
    backgroundHover: grey,
    backgroundPressed: yellow,
  },
};

const generateClassName = createGenerateClassName({
  productionPrefix: 'WealthTab',
  seed: 'WealthTab',
});

const makeDefaultStyles = makeStyles({
  root: {
    color: ({tabTheme}) => tabTheme?.label,
    opacity: 1,
    backgroundColor: ({tabTheme}) => tabTheme?.background,
    '&:hover': {
      color: ({tabTheme}) => tabTheme?.label,
      backgroundColor: ({tabTheme}) => tabTheme?.backgroundHover,
    },
    '&:active': {
      color: ({tabTheme}) => tabTheme?.label,
      backgroundColor: ({tabTheme}) => tabTheme?.backgroundPressed,
    },
    '&:focus': {
      //  filter: ({withFocus}) => (withFocus ? `drop-shadow(0 0 1px black)` : 'none'),
      border: ({withFocus}) => (withFocus ? `1px solid black` : 0),
    },
  },
  selected: {
    borderLeft: `1px solid black`,
    borderRight: `1px solid black`,
    borderTop: `1px solid black`,
  },
});

const makeNavigatorStyles = makeStyles({
  root: {
    backgroundColor: grey,
    textTransform: 'none',
    minWidth: 72,
    borderRight: `1px solid black`,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {
    backgroundColor: grey,
    borderLeft: `1px solid blue`,
    borderRight: `1px solid blue`,
    borderTop: `5px solid blue`,
  },
});
const makeToggleStyles = makeStyles({
  root: {
    backgroundColor: 'grey',
    textTransform: 'none',
    minWidth: 72,
    border: `1px solid black`,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&:selected': {
      backgroundColor: 'white',
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
});

const Tab = forwardRef(({children, className, width, withFocus = true, ...other}, ref) => {
  const tabTheme = tabColors.light;
  const context = useTabContext();
  const defaultStyles = makeDefaultStyles({tabTheme, withFocus: context.withFocus ?? withFocus});
  const navigatorStyles = makeNavigatorStyles();
  const toggleStyles = makeToggleStyles();
  const ariaControls = `panel-for-${other.label}` || getPanelId(context, other.index);
  const id = `tab-for-${other.label}` || getTabId(context, other.index);

  let innerStyle = {};
  innerStyle.width = width;

  if (context === null) {
    throw new TypeError(`No TabContext provided`);
  }
  let ret = (
    <MuiTab
      aria-controls={ariaControls}
      classes={defaultStyles}
      id={id}
      className={className}
      style={innerStyle}
      disableRipple={true}
      {...other}
      ref={ref}>
      {children}
    </MuiTab>
  );

  if (context.type === 'navigator') {
    ret = (
      <MuiTab
        aria-controls={ariaControls}
        classes={navigatorStyles}
        id={id}
        className={className}
        style={innerStyle}
        disableRipple={true}
        {...other}
        ref={ref}>
        {children}
      </MuiTab>
    );
  }
  if (context.type === 'toggle') {
    ret = (
      <MuiTab
        aria-controls={ariaControls}
        classes={toggleStyles}
        id={id}
        className={className}
        style={innerStyle}
        disableRipple={true}
        {...other}
        ref={ref}>
        {children}
      </MuiTab>
    );
  }

  return ret;
});

const TabStylesProviderWrapper = forwardRef((props, ref) => (
  <StylesProvider generateClassName={generateClassName}>
    <Tab {...props} ref={ref} />
  </StylesProvider>
));

Tab.displayName = 'Tab';

Tab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  withFocus: PropTypes.bool,
  width: PropTypes.string,
};
export default TabStylesProviderWrapper;
