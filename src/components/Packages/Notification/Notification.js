import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {cx} from 'emotion.instance';

import styles from './Notification.style';

const iconMap = {
  error: <ReportGmailerrorredIcon />,
  warning: <ReportProblemIcon />,
  success: <CheckCircleOutlineIcon />,
  information: <InfoIcon />,
  contextualError: <ReportGmailerrorredIcon />,
  contextualWarning: <ReportProblemIcon />,
  contextualSuccess: <CheckCircleOutlineIcon />,
  contextualInformation: <InfoIcon />,
};
const notificationKind = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  information: 'information',
  contextualError: 'contextualError',
  contextualWarning: 'contextualWarning',
  contextualSuccess: 'contextualSuccess',
  contextualInformation: 'contextualInformation',
};
const notificationColor = {
  error: 'red',
  warning: 'yellow',
  success: 'green',
  information: 'blue',
  contextualError: '#f28d8d',
  contextualWarning: '#e6e5ae',
  contextualSuccess: '#89d46c',
  contextualInformation: '#6cbcd4',
};
const notificationBorder = {
  contextualError: 'red',
  contextualWarning: 'yellow',
  contextualSuccess: 'green',
  contextualInformation: 'blue',
};

const Notification = forwardRef(
  (
    {
      kind,
      show,
      shadow,
      bold,
      contextual,
      overflow,
      className,
      onClose,
      children,
      maxContentWidth,
      wrapper,
      ...props
    },
    ref,
  ) => {
    const color = notificationColor[kind];
    const border = notificationBorder[kind];
    const Component = wrapper;

    return (
      <Collapse in={show}>
        <div
          className={cx(styles.notification({bold, color, border}), className)}
          {...props}
          ref={ref}>
          <Component>
            <div className={styles.center({maxContentWidth})}>
              <span className={styles.icon({bold})}>{iconMap[kind]}</span>
              <span className={styles.hiddenText}>{notificationKind?.[kind]}</span>
              <div className={styles.container}>{children}</div>
              {onClose && <button onClick={onClose}>X</button>}
            </div>
          </Component>
        </div>
      </Collapse>
    );
  },
);

Notification.displayName = 'Notification';
Notification.PropTypes = {
  children: PropTypes.node,
  kind: PropTypes.string,
  show: PropTypes.bool,
  shadow: PropTypes.any,
  bold: PropTypes.bool,
  contextual: PropTypes.string,
  overflow: PropTypes.string,
  className: PropTypes.string,
  onClose: PropTypes.func,
  maxContentWidth: PropTypes.string,
  wrapper: PropTypes.any,
};
Notification.defaultProps = {
  kind: 'red',
  maxContentWidth: 'none',
  wrapper: React.Fragment,
};

export default Notification;
