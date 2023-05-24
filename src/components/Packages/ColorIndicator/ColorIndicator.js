import React from 'react';
import Brightness1Icon from '@mui/icons-material/Brightness1';

import {indicatorContainer} from './ColorIndicator.style';
const getBadgeColors = (value) => {
  let color, label, content;
  switch (value) {
    case 1:
      color = 'red';
      label = 'danger';
      break;
    case 2:
      color = 'yellow';
      label = 'watch';
      break;
    case 3:
      color = 'green';
      label = 'save';
      break;
    default:
      color = '';
      break;
  }
  return {color, content, label};
};

const ColorIndicator = ({data}) => {
  return (
    <div className={indicatorContainer}>
      <Brightness1Icon sx={{color: getBadgeColors(data)?.color}} />
      <span>{getBadgeColors(data)?.label}</span>
    </div>
  );
};

export default ColorIndicator;
