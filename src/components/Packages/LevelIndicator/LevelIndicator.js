import React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Brightness1Icon from '@mui/icons-material/Brightness1';
const LevelIndicator = ({checked, length}) => {
  return (
    <div>
      {[...Array(length)].map((_, index) =>
        index < checked ? <CheckCircleOutlineIcon /> : <Brightness1Icon />,
      )}
    </div>
  );
};

export default LevelIndicator;
