import React from 'react';

import {
  rangeInputStyles,
  rangeVerticalInputStyles,
  buble,
  buble2,
  sliderParent,
} from './RangeSlider.style';
const RangeSlider = ({min, max, value, onChange, isVertical}) => (
  <>
    <div className={sliderParent}>
      <div className={isVertical ? rangeVerticalInputStyles : rangeInputStyles}>
        <input
          type="range"
          onChange={onChange}
          min={min}
          max={max}
          step={1}
          value={value}
          orient={isVertical ? 'vertical' : null}
        />
        <div className={isVertical ? buble2(value, min, max) : buble(value, min, max)}>{value}</div>
      </div>
    </div>
  </>
);

export default RangeSlider;
