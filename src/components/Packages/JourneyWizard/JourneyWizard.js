import React from 'react';

const JourneyWizard = ({currentStep, totalSteps, header, body, footer, ...props}) => {
  return (
    <div {...props}>
      <span>{`Step:${currentStep + 1}of ${totalSteps}`}</span>
      <p>{header && header()}</p>
      <p>{body && body()}</p>
      <p>{footer && footer()}</p>
    </div>
  );
};

JourneyWizard.defaultProps = {
  currentStep: null,
  totalSteps: null,
  header: null,
  body: null,
  footer: null,
};

export default JourneyWizard;
