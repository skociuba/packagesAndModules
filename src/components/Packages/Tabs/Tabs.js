import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {makeStyles, StylesProvider, createGenerateClassName} from '@material-ui/core/styles';
import MuiTab from '@material-ui/core/Tabs';

import {useTabContext} from './TabContext';

const generateClassName = createGenerateClassName({
  productionPrefix: 'WealthTabs',
  seed: 'WealthTabs',
});

const makeLineStyles = makeStyles({
  flexContainer: {
    borderBottom: ({withLine}) => (withLine ? `2px solid blue` : 0),
  },
});

const makeNavigatorStyles = makeStyles({
  root: {
    borderBottom: `1px solid grey`,
  },
  indicator: {
    height: 0,
  },
});
const makeToggleStyles = makeStyles({
  indicator: {
    backgroundColor: 'transparent',
  },
});

const Tabs = forwardRef(({children, withLine, ...props}, ref) => {
  const context = useTabContext();
  const lineStyles = makeLineStyles({withLine});
  const navigatorStyles = makeNavigatorStyles();
  const toggleStyles = makeToggleStyles();

  if (context === null) {
    throw new TypeError(`No TabContext provided`);
  }
  let ret = (
    <MuiTab classes={lineStyles} {...props} ref={ref}>
      {children}
    </MuiTab>
  );

  if (context.type === 'navigator') {
    ret = (
      <MuiTab classes={navigatorStyles} {...props} ref={ref}>
        {children}
      </MuiTab>
    );
  }
  if (context.type === 'toggle') {
    ret = (
      <MuiTab classes={toggleStyles} {...props} ref={ref}>
        {children}
      </MuiTab>
    );
  }

  return ret;
});

const TabStylesProviderWrapper = forwardRef((props, ref) => (
  <StylesProvider generateClassName={generateClassName}>
    <Tabs {...props} ref={ref} />
  </StylesProvider>
));

Tabs.displayName = 'Tabs';

Tabs.propTypes = {
  children: PropTypes.node,
  withLine: PropTypes.bool,
};
Tabs.defaultProps = {
  withLine: false,
};
export default TabStylesProviderWrapper;
