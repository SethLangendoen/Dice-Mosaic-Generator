import React from 'react';
import DescriptionComponent from './DescriptionComponent';
import '../styling.css'

const StepManager = ({ currentStep, steps }) => {
  return (
    <div className="step-manager-container">

		{/* Description and image center */}
		<div className="description-container">
			<DescriptionComponent step={steps[currentStep]} />
		</div>

		{/* Steps on the right side */}
		<div className="steps-container">
			{steps.map((step, index) => (
			<div
				key={step.number}
				className={`step ${index <= currentStep ? 'step-completed' : ''}`}
			>
				<div className="step-number">{step.number}</div>
				<div className="step-title">{step.title}</div>
			</div>
			))}
		</div>
    </div>
  );
};

export default StepManager;
