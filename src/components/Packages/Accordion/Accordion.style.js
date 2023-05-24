import {css} from 'emotion.instance';

export const accordionTab = function ({isOpen, error}) {
  let borderBottom = '';
  let borderBottomFocus = '';
  if (!isOpen) {
    borderBottom = '1px solid silver';
    borderBottomFocus = '1px solid grey';
  }
  return css`
    background-color: white;
    border-bottom: ${borderBottom};
    border-left: '1px solid silver';
    border-right: '1px solid silver';
    border-top: '1px solid silver';
    cursor: pointer;
    display: flex;
    padding-bottom: 10px;
    padding-top: 10px;
    &:hover {
      background-color: grey;
    }
    &:focus {
      border-bottom: ${borderBottomFocus};
      border-left: '1px solid grey';
      border-right: '1px solid grey';
      border-top: '1px solid grey';
    }
  `;
};
export const expandableContent = function ({isOpen}) {
  return css`
    background-color: white;
  `;
};

export const accordionTitle = () => css`
  display: flex;
  margin: 0px;
  padding: 0px 10px;
  width: 100%;
`;
export const iconStyle = () => css`
  padding-right: 20px;
`;
export const collapse = css`
  overflow: hidden;
  -o-transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
  transition: height 1s cubic-bezier(0.4, 0, 0.2, 1);
`;
