import React, { useEffect } from 'react';
import lottie from 'lottie-web'; // Import Lottie library
import animationData from '../Assets/diceAnimation.json'; // Import your JSON animation file

const LottieAnimation = () => {
  useEffect(() => {
    // Use Lottie library to load animation
    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-container'), // Specify the container element
      renderer: 'svg', // Choose the renderer: svg / canvas / html (not all renderers are supported in all browsers)
      loop: true, // Optional
      autoplay: true, // Optional
      animationData: animationData, // Animation data
    });

    // Clean up animation on component unmount
    return () => anim.destroy();
  }, []); // Empty dependency array ensures useEffect runs only once

  return <div id="lottie-container" ></div>;
};

export default LottieAnimation;
