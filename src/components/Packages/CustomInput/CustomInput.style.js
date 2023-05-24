import {css} from 'emotion.instance';

export const input = css`
  background-color: transparent;
  height: 100%;
  border: none;
  box-sizing: border-box;
  width: 100%;
  margin: 0 6px;
  border: none;
  outline: none;
`;
export const container = ({disabled, focused, error}) => css`
  align-items: center;
  box-sizing: border-box;
  background-color: ${error ? '#edbfbe' : ' white'};
  border: 1px solid ${error ? 'red' : 'grey'};
  display: flex;
  height: 46px;
  padding: 0 6px;
  transition: background-color 0.2s, border-color 0.2s;
  &:focus,
  &:hover {
    border-color: 'blue';
  }
  ${disabled &&
  `
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
  `}

  ${focused &&
  `
   border-color: 'blue';
  `}
`;
