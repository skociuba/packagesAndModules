import {css} from 'emotion.instance';

export const row = ({spacing = 0}) => css`
  display: flex;
  flex-wrap: wrap;
  margin: ${-spacing * 8 + 'px'};
  width: calc(100% + ${spacing * 8 * 2 + 'px'});
  & > div {
    padding: ${spacing * 8 + 'px'};
  }
`;

export const rowWrapper = css`
  flex-grow: 1;
`;
