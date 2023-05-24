import React from 'react';
import PropTypes from 'prop-types';
const OptGroup = ({children, label, disabled}) => (
  <optgroup label={label} disabled={disabled}>
    {children}
  </optgroup>
);

OptGroup.displayName = 'OptGroup';
OptGroup.PropTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};
OptGroup.defaultProps = {
  disabled: false,
};

export default OptGroup;
