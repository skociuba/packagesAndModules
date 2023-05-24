import {css} from 'emotion.instance';

export const ContainerStyle = css`
  width: 696px;
  background-color: red;
`;
export const outerContainerStyle = css`
  display: flex;
  width: 100%;
  overflow-x: auto;
`;

export const innerContainerStyle = css`
  width: max-content;
  display: flex;
  align-items: center;
`;

export const boxes = css`
  padding: 12px;
  margin: 4px;
  background-color: rgb(196, 218, 243);
  min-width: 200px;
  text-align: center;
  border-radius: 6px;
  height: 400px;
`;

export const arrowContainer = css`
  height: 2em;
  display: flex;
  justify-content: space-between;
`;

export const image = css`
  width: 100% !important;
  height: 100% !important;
`;
export const buttonLeftStyle = css`
  position: absolute;
  height: 50px;
`;
export const buttonRightStyle = css`
  position: absolute;
  margin-left: 688px;
  height: 50px;
`;
export const buttonContainer = css`
  background: #6a899c;
`;
