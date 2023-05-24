import React from 'react';

import {container, breadcrumbsButton, greetingContainer, margin} from './Breadcrumbs.style';
const Breadcrumbs = ({breadcrumbs, onBreadcrumbsClick}) => {
  return (
    <div className={container}>
      {breadcrumbs && (
        <>
          <div>
            <span
              className={breadcrumbsButton(onBreadcrumbsClick)}
              tabIndex="0"
              role="button"
              aria-pressed={false}
              onClick={onBreadcrumbsClick()}>
              {breadcrumbs.home}
            </span>
            {breadcrumbs.items.map((item) => (
              <>
                <span className={margin}>{'>'}</span>
                <span
                  tabIndex="0"
                  role="button"
                  aria-pressed={false}
                  className={breadcrumbsButton(onBreadcrumbsClick)}
                  onClick={onBreadcrumbsClick(item)}>
                  {item}
                </span>
                <span className={greetingContainer}>{breadcrumbs.greeting}</span>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
