import {css} from 'emotion.instance';

export const inputBar = css`
  width: 100%;
  display: flex;
  align-items: flex-end;

  button {
    margin-left: 8px;
    height: 46px;
    padding: 0 5px;
  }
`;
export const labelContainer = css`
  line-height: 24px;
  margin-bottom: 5px;
`;

export const autocompleteContainer = css`
  position: relative;
  width: 100%;
`;
export const listContainer = (length) => css`
  box-sizing: border-box;
  background-color: white;
  border-color: black;
  border-style: solid;
  border-width: ${length === 0 ? 0 : '1px'};
  border-top: 0;
  height: ${Math.min(length, 5) * 45 + 'px'};
  overflow-x: hidden;
  overflow-y: scroll;
  position: absolute;
  width: 100%;
  z-index: 1;
  padding: 0;
  margin: 0;
`;
export const listItem = (isSelected) => css`
  align-items: center;
  border-bottom: black 1px solid;
  color: grey;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  justify-content: space-between;
  line-height: 24px;
  padding: 9px 11px 11px 12px;
  width: calc(100% - 37px);

  &:focus,
  &:hover,
  &:active {
    background-color: silver;
  }
  ${isSelected ? `background-color: grey;` : ''}
`;
