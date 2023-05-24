import React from 'react';

import {cx} from '../../emotion.instance';

import {componentWrapper} from './ComponentWrapper.style';
const ComponentWrapper = ({
  children,
  className,
  testId,
  hasTopMargin = false,
  hasBottomMargin = false,
  noPaddings = false,
  fullWidth = false,
  ...props
}) => {
  return (
    <section
      data-testid={testId ? testId : ''}
      className={cx(
        componentWrapper(hasTopMargin, hasBottomMargin, noPaddings, fullWidth),
        className,
      )}
      {...props}>
      {children}
    </section>
  );
};

export default ComponentWrapper;
