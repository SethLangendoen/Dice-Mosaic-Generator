import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import the Slider
import './styling.css'; // Ensure you have a CSS file for styles

import selectPhotoDemo from '../Assets/HowToVideos/selectPhotoDemo.mov';
import editMosaicDemo from '../Assets/HowToVideos/customizeMosaics.mov';
import generateAndPay from '../Assets/HowToVideos/generateAndCheckout.mov';

export default function HowTo() {
  const videoRefs = useRef([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    // Play the active video when the slide changes
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === activeSlide) {
          videoRef.play().catch(err => {
            console.error("Error playing video:", err);
          });
        } else {
          videoRef.pause();
        }
      }
    });
  }, [activeSlide]);

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    afterChange: (current) => setActiveSlide(current), // Update active slide index
  };

  return (
    <div id='parent-how-to-container'>
      <h1 id='theProcess' >The Process</h1>
      <Slider {...sliderSettings}>
        <div className="how-to-container">
          <div className="item">
            <h2 className='titleHowTo'>1. Choose a photo to dicify</h2>
            <video
              ref={el => (videoRefs.current[0] = el)}
              className='video'
              src={selectPhotoDemo}
              muted
              loop
            />



          </div>
        </div>
        <div className="how-to-container">
          <div className="item">
            <h2 className='titleHowTo'>2. Customize it to your liking</h2>
            <video
              ref={el => (videoRefs.current[1] = el)}
              className='video'
              src={editMosaicDemo}
              muted
              loop
            />
          </div>
        </div>
        <div className="how-to-container">
          <div className="item">
            <h2 className='titleHowTo'>3. Generate, shop and checkout</h2>
            <video
              ref={el => (videoRefs.current[2] = el)}
              className='video'
              src={generateAndPay}
              muted
              loop
            />
          </div>
        </div>
      </Slider>
    </div>
  );
}
