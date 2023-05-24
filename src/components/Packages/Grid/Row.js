import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import {cx} from './../../../emotion.instance';
import {row, rowWrapper} from './Row.style';
const Row = forwardRef(({spacing, children, className, ...props}, ref) => (
  <div className={rowWrapper}>
    <div className={cx(row({spacing}), className)} {...props} ref={ref}>
      {children}
    </div>
  </div>
));

Row.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  spacing: PropTypes.number,
};

Row.displayName = 'Row';

export default Row;
