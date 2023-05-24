import {css} from 'emotion.instance';

const limitValue = ({min, max, value}) => Math.max(Math.min(value, max), min);

export const progressBar = ({current, total}) => css`
  background-color: silver;
  height: 5px;
  position: relative;
  width: 100%;

  &:after {
    background-color: red;
    content: '';
    height: 100%;
    position: absolute;
    transition: width 0.2s;
    width: ${limitValue({value: (current / total) * 100, min: 0, max: 100})}%;
  }
`;
export const progressLabel = css`
  display: inline-block;
  margin-bottom: 6px;
`;
