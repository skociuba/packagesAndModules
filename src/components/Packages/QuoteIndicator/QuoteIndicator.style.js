import {css} from 'emotion.instance';

export const quoteIndicator = () => css`
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const textColor = (isNegative) => css`
  color: ${isNegative ? 'red' : 'green'};
`;
