import React from 'react';

import {
  controlWrapperStyles,
  inputWrapperStyles,
  inputStyles,
  wrapperStyles,
  controlStyles,
  innerRailStyles,
  railStyles,
} from '././RangeSlider.style';
const MultiRangeSlider = ({min, max, value, step, onChange}) => {
  const [minValue, setMinValue] = React.useState(value ? value.min : min);
  const [maxValue, setMaxValue] = React.useState(value ? value.max : max);

  React.useEffect(() => {
    if (value) {
      setMinValue(value.min);
      setMaxValue(value.max);
    }
  }, [value]);

  const handleMinChange = (e) => {
    e.preventDefault();
    const newMinVal = Math.min(+e.target.value, maxValue - step);
    if (!value) {
      setMinValue(newMinVal);
    }
    onChange({min: newMinVal, max: maxValue});
  };

  const handleMaxChange = (e) => {
    e.preventDefault();
    const newMaxVal = Math.max(+e.target.value, minValue + step);
    if (!value) {
      setMaxValue(newMaxVal);
    }
    onChange({min: minValue, max: newMaxVal});
  };

  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className={wrapperStyles}>
      <div className={inputWrapperStyles}>
        <input
          className={inputStyles}
          type="range"
          value={minValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMinChange}
        />
        <input
          className={inputStyles}
          type="range"
          value={maxValue}
          min={min}
          max={max}
          step={step}
          onChange={handleMaxChange}
        />
      </div>

      <div className={controlWrapperStyles}>
        <div className={controlStyles} style={{left: `${minPos}%`}} />
        <div className={railStyles}>
          <div
            className={innerRailStyles}
            style={{left: `${minPos}%`, right: `${100 - maxPos}%`}}
          />
        </div>
        <div className={controlStyles} style={{left: `${maxPos}%`}} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
