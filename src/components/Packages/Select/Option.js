import React from 'react';
import PropTypes from 'prop-types';
const Option = ({children, label, disabled, value}) => (
  <option label={label ? label : children} disabled={disabled} value={value}>
    {children}
  </option>
);

Option.displayName = 'Option';
Option.PropTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
Option.defaultProps = {
  disabled: false,
};

export default Option;
