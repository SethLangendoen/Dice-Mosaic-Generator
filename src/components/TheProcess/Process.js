import React, { useState } from 'react';
import StepManager from './StepManager'; // New component managing steps
import carImage from '../../Assets/MosaicExamples/car2.png';
import moneyStack from '../../Assets/moneyDMG.png'
import choosePhoto from '../../Assets/choosePhoto.jpeg'
import genAndCust from '../../Assets/genAndCust.jpeg'
import saveAndShop from '../../Assets/saveAndShop.jpeg'
import resources from '../../Assets/resources.jpeg'
import construction from '../../Assets/construction.jpeg'
import placement from '.././blog/Images/wallMosaic.png'
import reflection from '../../Assets/reflection.png'


const Process = () => {
  const [currentStep, setCurrentStep] = useState(0); // Tracks the current step

  const steps = [
    {
      number: 0,
      title: "Introduction",
      description: "Dice mosaics are admirable. By combining thousounds of dice into a perfectly arranged layout, we can take something so simple and create mesmerizing art. As complicated as these portraits may seem, they are actually deceptively simple to make. Let us take you on a journey with our step-by-step guide and teach you everything you need to know about creating amazing dice art.",
      image: carImage
    },
    {
      number: 1,
      title: "Plan your design",
      description: "There are many considerations to make before you jump into the creation process. Mosaics vary by dice size, cost, contruction time, actual mosaic size and dice types. Make sure that you have considered where the mosaic is being displayed, how bright it needs to be, and how much you are willing to spend on dice. ",
      image: moneyStack
    },
    {
      number: 2,
      title: "Choose your photo",
      description: "The key to a stunning mosaic is the perfect photo. Upload your image and watch as the generator previews your design, giving you a sneak peek into how each dice will bring your picture to life, pixel by pixel.",
      image: choosePhoto
    },
    {
      number: 3,
      title: "Generate and customize",
      description: "With your photo selected, click our Choose Photo button, where we will instantly generate your mosaic. Now you can begin customizing. Increase the size for a better resolution of your dice art. Change the brightness to help make focal points apparent. Trim unnecessary edges, and finally select individual pieces on the mosaic to personalize your dice art.",
      image: genAndCust
    },
    {
      number: 4,
      title: "Save and Shop",
      description: "Once satisfied with your design, save your mosaic and start shopping for the materials. You will need lots of dice, which are easy to purchase using our shop as we work directly with manufacturers to offer high quality, low cost dice in bulk. ",
      image: saveAndShop
    },
    {
      number: 5,
      title: "Gather resources",
      description: "It's time to collect the essential resources for your mosaic. Receive the exact number of dice and all the materials you’ll need, ensuring every detail matches your vision. Get yourself some plywood for the backing and edges of the mosaic, as well as some glue to fix dice in place. Prepare yourself for the exciting hands-on process of creating your artwork.",
      image: resources
    },
    {
      number: 6,
      title: "Construction",
      description: "Now the real fun begins! With your frame assembled to size, follow the grid and instructions of you generated png mosaic as reference to place each die. Watch your artwork grow piece by piece, turning your chosen photo into a physical mosaic masterpiece.",
      image: construction
    },
    {
      number: 7,
      title: "Placement and fastening",
      description: "Attention to placement is key! Make your mosaic stand out. This piece will impress your friends and family, so make sure that it's in a location that can be easily seen! When fastening the mosaic, ensure that you mount it securely as these mosaics can get heavy. ",
      image: placement
    },
    {
      number: 8,
      title: "Reflection",
      description: "Admire your finished mosaic! From the planning stages to final placement, reflect on the creative journey that brought your vision to life. Frame your work and let it serve as a unique testament to your artistic flair and patience.",
      image: reflection
    }
  ];
  
  const handleNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="process-container">

      <div id = 'alignProcessAndArrows'>
      <button onClick={handlePreviousStep} disabled={currentStep === 0}>
          &lt; 
        </button>
      <h1 id ='theProcessTitle'>The Process</h1>
      <button onClick={handleNextStep} disabled={currentStep === steps.length - 1}>
          &gt;
      </button>
      </div>



      <div className="process-controls">

      </div>

      <StepManager currentStep={currentStep} steps={steps} />

    </div>
  );
};

export default Process;
