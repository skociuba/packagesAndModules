import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import {cx} from './../../../emotion.instance';
import {column} from './Column.style';
const Column = forwardRef(({xs, sm, ms, md, lg, xl, children, className, ...props}, ref) => (
  <div className={cx(column({xs, sm, ms, md, lg, xl}), className)} {...props} ref={ref}>
    {children}
  </div>
));

Column.propTypes = {
  children: PropTypes.any,
  xs: PropTypes.number,
  sm: PropTypes.number,
  ms: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  className: PropTypes.string,
};

Column.displayName = 'Column';

export default Column;
