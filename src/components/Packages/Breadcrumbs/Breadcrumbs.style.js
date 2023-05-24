import {css} from 'emotion.instance';

export const container = css`
  display: flex;
  background-color: black;
  padding: 0 10px;
  height: 20px;
  border: none;
  box-sizing: border-box;
  width: 100%;
  color: white;

  & span:last-of-type {
    margin-left: 1200px;
  }
`;

export const breadcrumbsButton = (hasBreadcrumbsCallback) => css`
  cursor: ${hasBreadcrumbsCallback ? 'pointer' : 'auto'};
  outline: initial;
  user-select: none;
`;
export const greetingContainer = css``;
export const margin = css`
  margin: 0 5px;
`;
