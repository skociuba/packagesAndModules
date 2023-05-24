import React from 'react';
import PropTypes from 'prop-types';

import {cx} from '../../../emotion.instance';

import {resultsList, resultRow} from './List.style';

const List = ({
  className,
  isVertical,
  isBordered,
  isStriped,
  hasSeparators,
  isDark,
  children,
  flexDirection,
}) => (
  <ul className={cx(resultsList(isBordered, isDark, isVertical), className)}>
    {Array.isArray(children) ? (
      children.map(
        (child, index) =>
          child && (
            <li
              key={index}
              className={resultRow(isVertical, isStriped, hasSeparators, flexDirection)}>
              {child}
            </li>
          ),
      )
    ) : (
      <li className={resultRow(isVertical, isStriped, hasSeparators)}>{children}</li>
    )}
  </ul>
);

List.defaultProps = {
  isVertical: false,
  isBordered: false,
  isStriped: false,
  hasSeparators: true,
  dark: false,
  flexDirection: false,
};

List.propTypes = {
  className: PropTypes.string,
  isVertical: PropTypes.bool,
  isBorder: PropTypes.bool,
  isStriped: PropTypes.bool,
  hasSeparators: PropTypes.bool,
  dark: PropTypes.bool,
  flexDirection: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default List;
