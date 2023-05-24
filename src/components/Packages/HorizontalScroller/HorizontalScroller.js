import {createRef, useEffect, useState} from 'react';

import {
  innerContainerStyle,
  outerContainerStyle,
  ContainerStyle,
  boxes,
  buttonLeftStyle,
  buttonRightStyle,
  buttonContainer,
  image,
} from './HorizontalScroller.style';
const HorizontalScroller = ({data}) => {
  const outerContainerRef = createRef();
  const innerContainerRef = createRef();
  const [showNavigation, setShowNavigation] = useState(false);
  const [num, setNum] = useState(3);

  useEffect(() => {
    const outerContainer = outerContainerRef.current;
    const innerContainer = innerContainerRef.current;
    if (!outerContainer || !innerContainer) {
      return;
    }

    const observer = new ResizeObserver(() => {
      setShowNavigation(innerContainer.clientWidth > outerContainer.clientWidth);
    });

    observer.observe(outerContainer);
    observer.observe(innerContainer);

    // Cleanup
    return () => observer.disconnect();
  }, [outerContainerRef.current, innerContainerRef.current]);

  function scrollRight() {
    outerContainerRef.current.scrollBy(outerContainerRef.current.clientWidth, 0);
  }

  function scrollLeft() {
    outerContainerRef.current.scrollBy(-outerContainerRef.current.clientWidth, 0);
  }

  function add() {
    setNum((el) => Math.min(el + 1, data.length));
  }

  function remove() {
    setNum((el) => Math.max(el - 1, 0));
  }

  return (
    <div>
      {' '}
      <div className={ContainerStyle}>
        <div className={outerContainerStyle} ref={outerContainerRef}>
          <div className={innerContainerStyle} ref={innerContainerRef}>
            {showNavigation && (
              <>
                <button onClick={scrollLeft} className={buttonLeftStyle}>
                  {'<'}
                </button>
              </>
            )}
            {data.slice(0, num).map((li) => {
              return (
                <div key={li.id} className={boxes}>
                  {li.name}
                  {li.uri ? <img src={li.uri} className={image} alt="logo" /> : null}
                </div>
              );
            })}{' '}
            {showNavigation && (
              <>
                <button onClick={scrollRight} className={buttonRightStyle}>
                  {'>'}
                </button>
              </>
            )}
          </div>
        </div>
        <div className={buttonContainer}>
          <button onClick={add}>ADD</button>
          <br />
          <br />
          <button onClick={remove}>REMOVE</button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroller;
