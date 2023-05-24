import {css, keyframes} from 'emotion.instance';

const checkboxAnimation = keyframes`
0% {
   height: 0;
   width: 0;
}
25% {
   height: 0;
   width: 5px;
}
50% {
   height: 15px;
   width: 5px;
}`;

export const checkbox = ({error}) => css`
  -moz-appearance: initial;
  border: 0;
  cursor: pointer;
  margin: 0;
  outline: 0;
  padding: 0;
  position: relative;
  height: 32px;
  width: 32px;

  &:focus,
  &:hover,
  &:active {
    &::before {
      border-color: black;
    }
  }

  &::before {
    background-color: ${error ? '#edbfbe' : 'white'};
    border: 1px solid ${error ? 'red' : 'black'};
    box-sizing: border-box;
    content: '';
    height: 32px;
    position: absolute;
    transition: background-color 0.2s, border-color 0.2s;
    width: 32px;
  }

  &:checked::after {
    animation: ${checkboxAnimation} 0.8s;
    border-right: 4px solid green;
    border-top: 4px solid green;
    content: '';
    height: 15px;
    left: 7px;
    position: absolute;
    top: 18px;
    transform: scaleX(-1) rotate(135deg);
    transform-origin: left top;
    width: 5px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    pointer-events: none;
  }
`;
