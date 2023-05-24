import {css} from 'emotion.instance';

export const rangeInputStyles = css`
  input[type='range'] {
    -webkit-appearance: none;
    touch-action: pan-y;
    height: 10px;
    margin: 0;
    padding: 0;
    background-color: #ddd;
    border-radius: 5px;
    outline: none;
  }
  input[type='range']::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb:hover {
    box-shadow: #d46a6a90 0px 0px 0px 8px;
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms, bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;

export const rangeVerticalInputStyles = css`
  input[type='range'] {
    -webkit-appearance: none;
    background-color: #ddd;
    border-radius: 5px;
    outline: none;
    width: 200px;
    height: 10px;
    margin-top: 100px;
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    z-index: 0;
  }
  input[type='range']::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type='range']::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }
  input[type='range']::-webkit-slider-thumb:hover {
    box-shadow: #d46a6a90 0px 0px 0px 8px;
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms, bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
export const buble = (value, min, max) => css`
  padding-left: ${((value - min) / (max - min)) * 100}px;
  position: absolute;
`;

export const buble2 = (value, min, max) => css`
  margin-top: ${((value - min) / (max - min)) * 200 - 110}px !important;
  padding-left: 70px;
  position: absolute;
`;
export const sliderParent = css`
  margin-top: 100px;
  position: relative;
`;

const $thumbSize = '20px';

const trackStyles = css`
  appearance: none;
  background: transparent;
  border: transparent;
`;

export const thumbStyles = css`
  appearance: none;
  pointer-events: all;
  width: ${$thumbSize};
  height: ${$thumbSize};
  border-radius: 0px;
  border: 0 none;
  cursor: grab;
  background-color: red;
`;

export const rootStyles = css`
  max-width: 500px;
  padding: 12px;
  margin: auto;
`;

export const wrapperStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  margin: 40px calc(${$thumbSize} / 2);
  padding-top: 1.6rem;
  height: calc(${$thumbSize} + 1.6rem);
`;

export const inputWrapperStyles = css`
  width: calc(100% + ${$thumbSize});
  margin: 0 calc(${$thumbSize} / -2);
  position: absolute;
  height: ${$thumbSize};
`;

export const controlWrapperStyles = css`
  width: 100%;
  position: absolute;
  height: ${$thumbSize};
`;

export const inputStyles = css`
  position: absolute;
  width: 100%;
  pointer-events: none;
  appearance: none;
  height: 100%;
  opacity: 0;
  z-index: 3;
  padding: 0;

  &::-ms-track {
    ${trackStyles};
  }

  &::-moz-range-track {
    ${trackStyles};
  }

  &:focus::-webkit-slider-runnable-track {
    ${trackStyles};
  }

  &::-ms-thumb {
    ${thumbStyles};
  }

  &::-moz-range-thumb {
    ${thumbStyles};
  }

  &::-webkit-slider-thumb {
    ${thumbStyles};
  }
`;

export const railStyles = css`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  height: 10px;
  border-radius: 5px;
  background: #ddd;
`;

export const innerRailStyles = css`
  position: absolute;
  height: 100%;
  background: red;
  opacity: 0.5;
`;

export const controlStyles = css`
  width: ${$thumbSize};
  height: ${$thumbSize};
  border-radius: 50%;
  position: absolute;
  background: red;
  top: 50%;
  margin-left: calc(${$thumbSize} / -2);
  transform: translate3d(0, -50%, 0);
  z-index: 2;
  &:hover {
    box-shadow: #d46a6a90 0px 0px 0px 8px;
    transition: box-shadow 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
      left 350ms cubic- bezier(0.4, 0, 0.2, 1) 0ms, bottom 350ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`;
