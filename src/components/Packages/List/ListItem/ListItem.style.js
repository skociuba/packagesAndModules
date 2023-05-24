import {css} from '@emotion/css';

import {media} from '../../../Media/Theme.style';

export const listItem = (hasVerticalPadding, hasFullWidth, noMarginBottom, isVertical) => css`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${isVertical ? 'row' : 'column'};
  padding: ${hasVerticalPadding ? '0 14px' : 0};
  margin: ${noMarginBottom ? 0 : '0 0 28px 0'};
  width: ${hasFullWidth ? '100%' : ' 60%'};

  @media${media.device.tablet} {
    margin: ${noMarginBottom ? 0 : '0 0 24px 0'};
  }
  @media${media.device.mobile} {
    width: 100% !important;
  }
`;
export const listItemTitle = (hasTitleBorder, isVertical) => css`
display-flex;
font-size:16px
font-weight:400;
line-height:24px:
letter-spacing:0;
border-bottom:${hasTitleBorder ? '1px solid black' : 0}
  padding: ${hasTitleBorder ? '0 0 8px' : 0};
  margin: ${hasTitleBorder ? '8px 8px 8px 0' : '0 8px 8px 0'};
 ${isVertical && 'width:50%'};
`;
export const listItemContent = (hasPaddingLeft, isVertical) => css`font-size:16px
font-weight:500;
line-height:24px:
letter-spacing:0;
color:red;
padding-left: ${hasPaddingLeft ? '12px' : 0};
${isVertical && 'text-align:right; margin:8px 0 8px 8px 0; width:50%'};
`;
