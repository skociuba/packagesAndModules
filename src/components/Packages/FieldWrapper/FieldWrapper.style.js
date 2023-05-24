import {css} from 'emotion.instance';

export const label = ({hintText}) => css`
  display: flex;
  font-size: 1rem;
  letter-spacing: 0px;
  line-height: 24px;
  margin-bottom: ${hintText ? '4px' : '8px'};
  > span {
    margin-right: 10px;
  }
`;
export const hint = () =>
  css`
    color: 'grey';
    font-size: 0.875rem;
    margin-bottom: 8px;
  `;
export const errorTxt = css`
  display: flex;
  font-size: 1rem;
  margin-top: 8px;
  > span {
    margin-left: 10px;
    padding-bottom: 8px;
    color: red;
  }
`;
