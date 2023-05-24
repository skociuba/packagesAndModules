import React from 'react';
import PropTypes from 'prop-types';

import {cx} from '../../../../emotion.instance';

import {listItem, listItemTitle, listItemContent} from './ListItem.style';

const ListItem = ({
  className,
  isVertical,
  hasVerticalPadding,
  hasFullWidth,
  noMarginBottom,
  hasTitleBorder,
  title,
  children,
  loading,
  hasPaddingLeft,
}) => (
  <div
    className={cx(
      listItem(hasVerticalPadding, hasFullWidth, noMarginBottom, isVertical),
      className,
    )}>
    {title && <span className={listItemTitle(hasTitleBorder, isVertical)}>{title}</span>}
    {children && (
      <span
        className={listItemContent(
          loading ? (hasPaddingLeft = false) : hasPaddingLeft,
          isVertical,
        )}>
        {children}
      </span>
    )}
  </div>
);

ListItem.defaultProps = {
  isVertical: false,
  hasVerticalPadding: false,
  hasFullWidth: false,
  noMarginBottom: false,
  hasTitleBorder: false,
  loading: false,
  hasPaddingLeft: false,
};

ListItem.propTypes = {
  className: PropTypes.string,
  isVertical: PropTypes.bool,
  hasVerticalPadding: PropTypes.bool,
  hasFullWidth: PropTypes.bool,
  noMarginBottom: PropTypes.bool,
  hasTitleBorder: PropTypes.bool,
  loading: PropTypes.bool,
  hasPaddingLeft: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default ListItem;
