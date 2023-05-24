import React, {forwardRef, isValidElement} from 'react';
import PropTypes from 'prop-types';

import {progressBar, progressLabel} from './ProgressIndicator.style';
const defaultLabel = ({current, total}) => (
  <span className={progressLabel} dataTestid="progresLabel">
    Step <strong>{current}</strong> of <strong>{total}</strong>
  </span>
);

const ProgressIndicator = forwardRef(({current, total, label, ...props}, ref) => {
  let labelComponent = null;
  if (typeof label === 'boolean') {
    labelComponent = defaultLabel({current, total});
  }
  if (isValidElement(label)) {
    labelComponent = label;
  }
  return (
    <div ref={ref} {...props}>
      {labelComponent}
      <div className={progressBar({current, total})} />
    </div>
  );
});

ProgressIndicator.displayName = 'ProgressIndicator';

ProgressIndicator.propTypes = {
  current: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.element]),
};

export default ProgressIndicator;
