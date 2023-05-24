import React, {useMemo, forwardRef, createElement} from 'react';
import MaterialDialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';

const transitions = {
  slide: Slide,
  grow: Grow,
  zoom: Zoom,
};

const capitalize = (string) =>
  typeof string === 'string' ? string.charAt(0).toUpperCase() + string.slice(1) : '';

const Modal = forwardRef(
  ({className, children, transition, transitionDirection, ...props}, ref) => {
    const TransitionComponent =
      transition &&
      transitions[transition] &&
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useMemo(() => {
        const Transition = forwardRef(
          ({children: transitionChildren, ...transitionProps}, transitionRef) =>
            createElement(
              transitions[transition],
              {
                ...transitionProps,
                direction: transitionDirection,
                ref: transitionRef,
              },
              transitionChildren,
            ),
        );
        Transition.displayName = capitalize(transition);
        return Transition;
      }, [transition, transitionDirection]);
    return (
      <MaterialDialog
        {...props}
        classes={className}
        ref={ref}
        TransitionComponent={TransitionComponent}>
        {children}
      </MaterialDialog>
    );
  },
);

Modal.displayName = 'Modal';

Modal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  transition: PropTypes.string,
  transitionDirection: PropTypes.string,
};
Modal.defaultProps = {
  transitionDirection: 'down',
};

export default Modal;
