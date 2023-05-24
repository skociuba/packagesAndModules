import React, {useState, forwardRef} from 'react';
import PropTypes from 'prop-types';

import {cx} from '../../../emotion.instance';

import {input, container} from './CustomInput.style';

export const formatPhoneNumber = (value) => {
  if (!value) {
    return value;
  }

  const phoneNumber = value.replace(/[^\d]/g, '');

  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength < 4) {
    return phoneNumber;
  }

  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

const isSpaceBetweenNumbers = (str) => {
  const arr = str?.split('');

  if (!arr) {
    return false;
  }

  let isSpaceBetween = false;

  for (let i = 0; i < arr.length; i++) {
    const prev = Number(arr[i - 1] || arr[i - 1]);
    const curr = arr[i];
    const next = Number(arr[i + 1] || arr[i + 1]);

    if (curr === '' && !isNaN(prev) && !isNaN(next)) {
      isSpaceBetween = true;
      break;
    }
  }
  return isSpaceBetween;
};

const removeExtraSpacesFrom = (str) =>
  (str?.match(/ /g) || [])?.length >= 2 ? str.replace(/\s+/g, '') : str || null;

const getDashTypeFormat = (value) =>
  isSpaceBetweenNumbers(value) ? value : removeExtraSpacesFrom(value);

console.log(getDashTypeFormat('111   111'));

const formatValue = (value) => {
  const removedNonDigits = String(value).replace(/(?!^[-])[^0-9]/g, '');
  return (Number(removedNonDigits) / 100).toFixed(2);
};

const addSeparators = (value) => {
  let [part1, part2] = value.split('.');

  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(part1)) {
    part1 = part1.replace(rgx, '$1,$2');
  }
  return `${part1}${part2 ? `.${part2}` : ''}`;
};

const getModifiedEventObject = (e) => {
  const withFraction = formatValue(e.target.value === '-' ? 0 : e.target.value);
  const handler = {
    get: function (target, property) {
      return property !== 'value' ? target[property] : withFraction;
    },
  };
  const target = new Proxy(e.target, handler);
  return {...e, target};
};

const CustomInput = forwardRef(
  (
    {
      isLoading,
      type,
      value,
      defaultValue,
      disabled,
      onFocus,
      onBlur,
      autoFocus,
      error,
      inputRef,
      onChange,
      onClick,
      prefix,
      className,
      suffix,
      ...props
    },
    ref,
  ) => {
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocus] = useState(autoFocus);

    const isCurrencyType = type === 'currency';
    const isPhoneNumberType = type === 'phone';

    const handleChange = (e) => {
      if (isCurrencyType) {
        const withFraction = formatValue(e.target.value === '-' ? 0 : e.target.value);
        e.target.value = addSeparators(withFraction);

        if (onChange) {
          onChange(getModifiedEventObject(e));
        }
      } else if (isPhoneNumberType) {
        const formattingPhoneNumber = formatPhoneNumber(e.target.value);
        console.log(formattingPhoneNumber);
        setInputValue(formattingPhoneNumber);
        e.target.value = formattingPhoneNumber;
      } else {
        if (onChange) {
          onChange(e);
        }
      }
    };

    const handleClick = (e) => {
      if (isCurrencyType) {
        if (onClick) {
          onClick(getModifiedEventObject(e));
        }
      } else {
        if (onClick) {
          onClick(e);
        }
      }
    };

    const handleFocus = (e) => {
      setFocus(true);
      if (isCurrencyType) {
        if (onFocus) {
          onFocus(getModifiedEventObject(e));
        }
      } else {
        if (onFocus) {
          onFocus(e);
        }
      }
    };

    const handleBlur = (e) => {
      setFocus(false);
      if (isCurrencyType) {
        if (onBlur) {
          onBlur(getModifiedEventObject(e));
        }
      } else {
        if (onBlur) {
          onBlur(e);
        }
      }
    };

    return (
      <div ref={ref} className={cx(container({disabled, focused, error}), className)}>
        {prefix}
        <input
          autoFocus={autoFocus}
          type={isCurrencyType || isPhoneNumberType ? 'text' : type}
          onChange={handleChange}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={
            isCurrencyType && value
              ? addSeparators(formatValue(value))
              : isPhoneNumberType && value
              ? formatPhoneNumber(value)
              : value
          }
          defaultValue={
            isCurrencyType && defaultValue
              ? addSeparators(formatValue(defaultValue))
              : defaultValue || (isPhoneNumberType && inputValue)
              ? inputValue
              : defaultValue
          }
          className={input}
          disabled={disabled}
          ref={inputRef}
          {...props}
        />
        {suffix}
      </div>
    );
  },
);

CustomInput.displayName = 'CustomInput';
CustomInput.PropTypes = {
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  inputRef: PropTypes.any,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

export default CustomInput;
