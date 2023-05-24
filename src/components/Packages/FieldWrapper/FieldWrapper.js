import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Collapse from '@mui/material/Collapse';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import InfoIcon from '@mui/icons-material/Info';

import {label, hint, errorTxt} from './FieldWrapper.style';

// clone error only this components
const allowedTypes = ['CustomInput', 'input', 'select', 'Select', 'radio', 'Checkbox'];

const recursiveMap = (children, err, fn) =>
  React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    if (child.props.children) {
      return React.cloneElement(child, {
        children: recursiveMap(child.props, children, err, fn),
      });
    }
    return fn(child, err);
  });

const returnElement = (el, error) =>
  allowedTypes.includes(el.type.displayName) ? React.cloneElement(el, {error}) : el;

const FieldWrapper = forwardRef(
  (
    {children, error, labelText, hintText, errorText, tooltip, ariaLabel, onTooltipOpen, ...props},
    ref,
  ) => {
    return (
      <div {...props} ref={ref}>
        {labelText && (
          <div className={label({hintText})} data-testid="fieldWrapper-label">
            <span>{labelText}</span>
            {tooltip && (
              <Tooltip title={tooltip}>
                <InfoIcon fontSize="small" />
              </Tooltip>
            )}
          </div>
        )}
        {hintText && (
          <div className={hint} data-testid="fieldWrapper-hint">
            {hintText}
          </div>
        )}
        {recursiveMap(children, error, returnElement)}
        {errorText && (
          <Collapse in={error}>
            <div className={errorTxt} data-testid="fieldWrapper-error">
              <ReportGmailerrorredIcon fontSize="small" sx={{color: 'red'}} />
              <span>{errorText}</span>
            </div>
          </Collapse>
        )}
      </div>
    );
  },
);
FieldWrapper.displayName = 'FieldWrapper';
FieldWrapper.PropTypes = {
  children: PropTypes.node,
};
FieldWrapper.defaultProps = {
  onTooltipOpen: () => {},
};

export default FieldWrapper;
