import React from 'react';

const DescriptionComponent = ({ step }) => {
  return (
    <div className="description-content">        
      <div className="image-container">
        <img src={step.image} alt={step.title} />
      </div>
      <div className="text-container" >
	  <h2>{step.title}</h2>
        <p>{step.description}</p>
      </div>
    </div>
  );
};

export default DescriptionComponent;
