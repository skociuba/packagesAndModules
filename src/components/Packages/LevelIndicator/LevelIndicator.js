import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Brightness1Icon from '@mui/icons-material/Brightness1';
const LevelIndicator = ({checked, length}) => (
  <div>
    {[...Array(length)].map((_, index) =>
      // eslint-disable-next-line react/jsx-key
      index < checked ? <CheckCircleOutlineIcon /> : <Brightness1Icon />,
    )}
  </div>
);

export default LevelIndicator;
