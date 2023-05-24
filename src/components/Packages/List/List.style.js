import {css} from '@emotion/css';

export const resultsListDark = css`
  color: white;
  h1,
  h2,
  h3,
  h4,
  h5,
  a {
    color: white;
  }
`;
export const resultsListBordered = css`
  border: 1px solid black;
`;
export const resultsList = (isBordered, isDark, isVertical) => css`
  display: flex;
  justify-content: center;
  flex-direction: ${isVertical ? 'row' : 'column'};
  ${isBordered ? resultsListBordered : ''};
  ${isDark ? resultsListDark : ''};
`;
export const resultRowStriped = css`
  &:nth-child(2n + 1) {
    background-color: grey;
  }
`;
export const resultRowHorizontalSeparators = css`
  border-bottom: 1px solid black;
  &:last-child {
    border-bottom: 0;
  }
`;
export const resultRowVerticalSeparators = css`
  border-left: 1px solid black;
  padding: 0 20px;
  &:first-child {
  }
`;
export const resultRow = (isVertical, isStriped, hasSeparators, flexDirection) => css`
  display: flex;
  flex-direction: ${flexDirection ? 'row' : 'column'};
  height: 100%;
  padding-left: ${isVertical ? '' : '10px'};
  width: auto;
  ${isStriped ? resultRowStriped : ''};
  ${hasSeparators
    ? isVertical
      ? resultRowVerticalSeparators
      : resultRowHorizontalSeparators
    : ''};
`;
