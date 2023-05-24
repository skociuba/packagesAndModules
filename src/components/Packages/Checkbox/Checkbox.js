import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {cx} from 'emotion.instance';

import {checkbox} from './Checkbox.style';

const Checkbox = forwardRef(({className, error, ...props}, ref) => {
  return (
    <input className={cx(checkbox({error}), className)} {...props} type="checkbox" ref={ref} />
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.PropTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Checkbox;
