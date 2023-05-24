import React, {forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import {CustomInput} from '../CustomInput/index';

const toISODateString = (date) => {
  if (!date) {
    return null;
  }
  return date.toISOString().split('T')[0];
};

const CustomDatePicker = ({
  name,
  disabled,
  value,
  onChange,
  error,
  dateFormat = 'dd-MMM-yyyy',
  inputClassName,
  iconClassName,
  className,
}) => {
  const DatePickerInput = forwardRef(({value: inputValue, onClick}, ref) => (
    <CustomInput
      ref={ref}
      type="text"
      disabled={disabled}
      name={name}
      data-testid={name}
      value={inputValue}
      error={error}
      onClick={onClick}
      className={inputClassName}
      suffix={
        <button className={iconClassName} onClick={onClick}>
          {' '}
          <CalendarMonthIcon fontSize="small" />
        </button>
      }
    />
  ));
  return (
    <DatePicker
      disabled={disabled}
      name={name}
      data-testid={name}
      dateFormat={dateFormat}
      selected={new Date(value)}
      onChange={(date, event) =>
        onChange({
          ...event,
          target: {...event.target, name: name, value: toISODateString(date)},
        })
      }
      className={className}
      customInput={<DatePickerInput />}
    />
  );
};
CustomDatePicker.displayName = 'CustomDatePicker';
CustomDatePicker.PropTypes = {
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  value: PropTypes.string,
};
CustomDatePicker.defaultProps = {
  dateFormat: 'dd-MMM-yyyy',
};

export default CustomDatePicker;
