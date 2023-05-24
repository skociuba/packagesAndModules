import {css} from 'emotion.instance';

const container = css`
  flex-grow: 1;
  width: 100%;
  padding: 5px;
`;
const notification = ({color, bold, border}) => css`
  padding: ${bold ? '13px, 20px, 15px' : '9px,16px, 11px'};
  border: 1px solid ${border};
  border-radius: ${border ? '8px' : '0px'};
  margin-left: ${border ? '10px' : '0px'};
  margin-right: ${border ? '10px' : '0px'};
  background-color: ${color};
  margin-bottom: 5px;
`;
const center = ({maxContentWidth}) => css`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  margin: 0 auto;
  max-width: ${maxContentWidth};
  padding-right: 5px;
`;

const icon = ({bold}) => css`
  align-self: baseline;
  margin-top: 0.1em;
  margin: ${bold ? '12px' : '8px'};
`;

const hiddenText = css`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

export default {
  notification,
  container,
  center,
  hiddenText,
  icon,
};
