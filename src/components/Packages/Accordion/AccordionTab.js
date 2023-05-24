import React, {forwardRef, useEffect, useRef, useState, useReducer, useCallback} from 'react';
import PropTypes from 'prop-types';
import {cx} from 'emotion.instance';
import {BsChevronDoubleUp, BsChevronDoubleDown} from 'react-icons/bs';

import {
  accordionTab,
  iconStyle,
  expandableContent,
  accordionTitle,
  collapse,
} from './Accordion.style';

function consoleLog(log) {
  return log;
}
function nextFrame(callback) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}
let COLLAPSED = 'collapsed';
let COLLAPSING = 'collapsing';
let EXPANDING = 'expanding';
let EXPANDED = 'expanded';

const KEYCODE_ENTER = 13;
const KEYCODE_SPACE = 32;

const AccordionTab = forwardRef(
  (
    {
      children,
      collapseHeight,
      elementType,
      onInit,
      noAnim,
      transition,
      style,
      onChange,
      overflowOnExpanded,
      isOpen,
      title,
      theme,
      handleClick,
      handleKeyDown,
      index,
      error,
      ariaLabel,
      ...props
    },
    ref,
  ) => {
    consoleLog('AccordionTab.ref', ref, title);

    const expandedContent = children;
    const icon = isOpen ? <BsChevronDoubleUp /> : <BsChevronDoubleDown />;
    const aLabel = ariaLabel || title;
    let [callbackTick, setCallbackTick] = useState(0);
    let getCollapsedVisibility = () => (collapseHeight === '0px' ? 'hidden' : '');
    const elementRef = useRef(); // expandable content

    let state = useRef({
      collapse: isOpen ? EXPANDED : COLLAPSED,
      style: {
        height: isOpen ? '' : collapseHeight,
        visibility: isOpen ? '' : getCollapsedVisibility(),
      },
    }).current;

    function getElementHeight() {
      if (!elementRef.current) {
        return;
      }
      consoleLog('elementRef.current.scrollHeight[', index, ']:', elementRef.current.scrollHeight);
      return `${elementRef.current.scrollHeight}px`;
    }

    let [__, forceUpdate] = useReducer((_) => _ + 1, 0);

    function innerHandleClick() {
      if (handleClick) {
        handleClick(index);
      }
      if (props.onClick) {
        props.onClick();
      }
      consoleLog(__);
    }

    function innerOnKeyDown(e) {
      if (handleKeyDown) {
        handleKeyDown(e, index);
      }
      if (e.keyCode === KEYCODE_ENTER || e.keyCode === KEYCODE_SPACE) {
        e.preventDefault();
        innerHandleClick();
        return;
      }
      if (props.onKeyDown) {
        props.onKeyDown();
      }
    }

    function setCollapsed() {
      if (!elementRef.current) {
        return;
      }
      state.collapse = COLLAPSED;

      consoleLog('setCollapsed');

      state.style = {
        height: collapseHeight,
        visibility: getCollapsedVisibility(),
      };
      consoleLog('setCollapsed.height:', state.style.height);
      forceUpdate();

      setTimeout(() => {
        setCallbackTick(Date.now);
      }, 0);
    }

    function setCollapsing() {
      if (!elementRef.current) {
        return;
      }
      if (noAnim) {
        return setCollapsed();
      }
      state.collapse = COLLAPSING;

      consoleLog('setCollapsing');

      state.style = {
        height: getElementHeight(),
        visibility: '',
      };
      consoleLog('setCollapsed.height:', state.style.height);
      forceUpdate();

      nextFrame(() => {
        if (!elementRef.current) {
          return;
        }
        if (state.collapse !== COLLAPSING) {
          return;
        }

        state.style = {
          height: collapseHeight,
          visibility: '',
        };
        setCallbackTick(Date.now);
      }, 0);
    }
    function setExpanding() {
      if (!elementRef.current) {
        return;
      }
      if (noAnim) {
        return setExpanded();
      }
      state.collapse = EXPANDING;

      consoleLog('setExpanding');

      nextFrame(() => {
        if (!elementRef.current) {
          return;
        }
        if (state.collapse !== EXPANDING) {
          return;
        }

        state.style = {
          height: getElementHeight(),
          visibility: '',
        };

        consoleLog('setExpanding.height:', state.style.height);
        setCallbackTick(Date.now);
      }, 0);
    }
    function setExpanded() {
      if (!elementRef.current) {
        return;
      }

      state.collapse = EXPANDED;

      consoleLog('setExpanded');

      state.style = {
        height: '',
        visibility: '',
      };

      consoleLog('setExpanded.height:', state.style.height);
      forceUpdate();

      setTimeout(() => {
        setCallbackTick(Date.now);
      }, 0);
    }

    function onTransitionEnd({target, propertyName}) {
      if (target === elementRef.current && propertyName === 'height') {
        consoleLog('onTransitionEnd - Tab[', index, ']=', isOpen);
        let styleHeight = target.style.height;
        consoleLog('onTransitionEnd', state.collapse, propertyName, styleHeight);
        switch (state.collapse) {
          case EXPANDING:
            if (styleHeight === '' || styleHeight === collapseHeight) {
              console.warn(
                `onTransitionEnd height unexpected ${styleHeight}`,
                'ignore setExpanded',
              );
            } else {
              setExpanded();
            }
            break;
          case COLLAPSING:
            if (styleHeight === '' || styleHeight !== collapseHeight) {
              console.warn(
                `onTransitionEnd height unexpected ${styleHeight}`,
                'ignore setCollapsed',
              );
            } else {
              setCollapsed();
            }
            break;
          default:
            console.warn(`Ignored onTransitionEnd`, state.collapse);
        }
      }
    }

    let onCallback = (callback, params = {}) => {
      if (callback) {
        var param = {state: state.collapse, style: state.style, ...params};
        consoleLog('onCallback' + callback.name, param);
        callback(param);
      }
    };

    useEffect(() => {
      if (callbackTick) {
        onCallback(onChange);
      }
    }, [callbackTick]);

    let didOpen = state.collapse === EXPANDED || state.collapse === EXPANDING;

    if (!didOpen && isOpen) {
      setExpanding();
    }

    if (didOpen && !isOpen) {
      setCollapsing();
    }

    let callbackRef = useCallback(
      (node) => {
        if (node) {
          elementRef.current = node;
          onCallback(onInit, {node});
          consoleLog('callbackRef');
        }
      },
      [elementType],
    );

    let overflow = state.collapse === EXPANDED && overflowOnExpanded ? '' : 'hidden';
    let computedStyle = {
      overflow,
      transition,
      ...style,
      ...state.style,
    };

    consoleLog('computedStyle:', computedStyle, collapseHeight);

    return (
      <>
        <div
          className={accordionTab({isOpen, error})}
          role="button"
          tabIndex={index + 1}
          ref={ref}
          onClick={innerHandleClick}
          aria-expanded={isOpen}
          aria-label={aLabel}
          onKeyDown={innerOnKeyDown}>
          <div className={accordionTitle()}>{title}</div>
          <div className={iconStyle()}>{icon}</div>
        </div>
        <div
          className={cx(collapse, expandableContent({isOpen}))}
          style={computedStyle}
          ref={callbackRef}
          onTransitionEnd={onTransitionEnd}
          {...props}>
          {expandedContent}
        </div>
      </>
    );
  },
);

AccordionTab.displayName = 'AccordionTab';

AccordionTab.defaultProps = {
  isOpen: false,
  index: 0,
  theme: {},
  collapseHeight: '0px',
  elementType: 'div',
};
AccordionTab.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
  theme: PropTypes.object,
  collapseHeight: PropTypes.string,
  elementType: PropTypes.string,
  onInit: PropTypes.func,
  onAnim: PropTypes.bool,
  transition: PropTypes.string,
  style: PropTypes.string,
  onChange: PropTypes.func,
  overflowExpanded: PropTypes.bool,
  title: PropTypes.string,
  handleKeyDown: PropTypes.func,
  error: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

export default AccordionTab;
