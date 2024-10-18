import React from 'react';

const CompletionTracker = ({ currentStep, totalSteps }) => {
  return (
    <div className="completion-tracker">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div 
          key={index} 
          className={`step ${index <= currentStep ? 'completed' : ''}`}
        >
          Step {index + 1}
        </div>
      ))}
    </div>
  );
};

export default CompletionTracker;
