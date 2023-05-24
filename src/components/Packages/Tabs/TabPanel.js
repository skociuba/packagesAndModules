import React from 'react';
import PropTypes from 'prop-types';
import {cx, css} from 'emotion.instance';

import {getPanelId, getTabId, useTabContext} from './TabContext';

const tabPanelStyle = css`
  padding: '24px';
  color: black;
`;
const TabPanel = React.forwardRef(function TabPanel(
  {ariaLabel, children, className, value = 0, ...other},
  ref,
) {
  const context = useTabContext();
  if (context === null) {
    throw new TypeError(`No TabContext provided`);
  }
  const id = `tab-for-${ariaLabel}` || getPanelId(context, value);
  const tabId = `tab-for-${ariaLabel}` || getTabId(context, value);
  return (
    <div
      aria-labelledby={tabId}
      className={cx(tabPanelStyle, className)}
      hidden={value !== context.value}
      id={id}
      role="tabpanel"
      {...other}
      ref={ref}>
      {value === context.value && children}
    </div>
  );
});
TabPanel.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  /**
   * @ignore
   * */
  className: PropTypes.string,
  value: PropTypes.oneOfType[(PropTypes.string.isRequired, PropTypes.number.isRequired)],
  ariaLabel: PropTypes.string,
};
export default TabPanel;
