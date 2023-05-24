import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material/react-button';

import {Modal} from './../Modal/index';
import {container, buttonContainer} from './PopUp.style';

const PopUp = ({
  isOpen,
  onConfirm = () => {},
  onCancel = () => {},
  hederText,
  disabled,
  bodyText,
  children,
}) => {
  return (
    <Modal open={isOpen} fullWidth={true}>
      <div className={container}>
        {hederText}
        <p />
        {bodyText}
        <p />

        {children}
        <div className={buttonContainer}>
          <Button onClick={() => onCancel()}>Cancel</Button>
          <Button onClick={() => onConfirm()} disabled={disabled}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
};
PopUp.displayName = 'PopUp';

PopUp.defaultProps = {isOpen: false};
PopUp.propTypes = {isOpen: PropTypes.bool};
export default PopUp;
