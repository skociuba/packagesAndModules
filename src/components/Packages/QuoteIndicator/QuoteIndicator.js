import React from 'react';
import PropTypes from 'prop-types';
import {BsChevronDoubleUp, BsChevronDoubleDown} from 'react-icons/bs';
import NumberFormat from 'react-number-format';
import {cx} from 'emotion.instance';

import {quoteIndicator, textColor} from './QuoteIndicator.style';

const QuoteIndicator = ({withIndicator, withColor, withIcon, prefix, suffix, value, className}) => {
  if (!value) {
    return null;
  }

  const isNegative = Math.sign(value) < 0;

  const icon = isNegative ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />;

  return (
    <span
      className={cx(quoteIndicator, withColor ? textColor(isNegative) : '', className)}
      data-testid="quoteIndicator">
      {withIcon && icon}
      <NumberFormat
        displayType="text"
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale={true}
        value={Number(value).toFixed(2)}
        allowNegative={true}
        prefix={`${withIndicator && !isNegative ? '+' : ''}${prefix}`}
        suffix={suffix}
      />
    </span>
  );
};

QuoteIndicator.defaultProps = {
  withIndicator: true,
  withColor: true,
  withIcon: true,
  prefix: '',
  suffix: '',
  value: null,
  className: '',
};

QuoteIndicator.propTypes = {
  withIndicator: PropTypes.bool,
  withColor: PropTypes.bool,
  withIcon: PropTypes.bool,
  prefix: PropTypes.any,
  suffix: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};

export default QuoteIndicator;
