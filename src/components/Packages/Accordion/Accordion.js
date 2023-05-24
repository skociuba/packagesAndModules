import React, {forwardRef, useRef, useState} from 'react';
import PropTypes from 'prop-types';

import AccordionTab from './AccordionTab';
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;

const Accordion = forwardRef(({children, theme, initData, multipleExpand, ...props}, ref) => {
  let accordionRefs = [];
  const [expandTabs, setExpandTabs] = useState(initData.map(() => false));
  function handleClick(index) {
    let innerExpandTabs = multipleExpand
      ? expandTabs.map((elem) => elem)
      : initData.map(() => false);
    innerExpandTabs[index] = !expandTabs[index];
    setExpandTabs(innerExpandTabs);
  }
  function handleDropdownKeyDown(e, index) {
    if (e.keyCode === KEYCODE_DOWN || e.keyCode === KEYCODE_UP) {
      e.preventDefault();
      let change = e.keyCode === KEYCODE_DOWN ? 1 : -1;
      let i = index + change;
      if (i >= accordionRefs.length || i < 0) {
        accordionRefs[index].current.focus();
      } else {
        accordionRefs[index + change].current.focus();
      }
    }
  }

  const accordionElement = initData.map((childData, index) => {
    const innerContent = childData.content;
    const header = childData.title;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const buttonRef = useRef();
    accordionRefs.push(buttonRef);

    return (
      <AccordionTab
        key={'AccordionTab' + index}
        index={index}
        title={header}
        ref={buttonRef}
        handleClick={handleClick}
        isOpen={expandTabs[index]}
        handleKeyDown={handleDropdownKeyDown}>
        {innerContent}
      </AccordionTab>
    );
  });
  return (
    <div ref={ref} {...props}>
      {accordionElement}
    </div>
  );
});
Accordion.displayName = 'Accordion';

Accordion.defaultProps = {
  theme: {},
};
Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
  initData: PropTypes.array,
  multipleExpand: PropTypes.bool,
};

export default Accordion;
