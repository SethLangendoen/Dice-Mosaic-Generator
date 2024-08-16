import React, { useRef, useEffect, useState } from 'react';
import './styling.css'; // Ensure you have a CSS file for styles
// import SelectPhotoVideo from '../Assets/HowToVideos/selectAPhoto.mp4'; 
// import CustomizePhotoVideo from '../Assets/HowToVideos/customizeAPhoto.mp4'; 

// import customizePhotoDemo from '../Assets/HowToVideos/vid2.mp4'; 
// import generatePhotoDemo from '../Assets/HowToVideos/vid3.mp4'; 

import selectPhotoDemo from '../Assets/HowToVideos/selectPhotoDemo.mov'
import editMosaicDemo from '../Assets/HowToVideos/customizeMosaics.mov'
import generateAndPay from '../Assets/HowToVideos/generateAndCheckout.mov'



export default function HowTo() {
  const videoRefs = useRef([]);
  const [isPlaying, setIsPlaying] = useState({});

  useEffect(() => {
    const handleScroll = () => {
      videoRefs.current.forEach((videoRef, index) => {
        if (videoRef) {
          const rect = videoRef.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
          );
          
          if (isInViewport) {
            videoRef.play().catch(err => {
              console.error("Error playing video:", err);
            });
            setIsPlaying(prev => ({ ...prev, [index]: true }));
          } else {
            videoRef.pause();
            setIsPlaying(prev => ({ ...prev, [index]: false }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id='parent-how-to-container'>
      <h1>The Process</h1>
      <div className="how-to-container">
        <div className="item">
          <h2>1. Choose a photo to dicify</h2>
          <video
            ref={el => (videoRefs.current[0] = el)}
            className={`video ${isPlaying[0] ? 'playing' : 'greyed-out'}`}
            src={selectPhotoDemo}
            muted
            loop
          ></video>
        </div>
        <div className="item">
          <h2>2. Customize it to your liking</h2>
          <video
            ref={el => (videoRefs.current[1] = el)}
            className={`video ${isPlaying[1] ? 'playing' : 'greyed-out'}`}
            src={editMosaicDemo}
            muted
            loop
          ></video>
        </div>
        <div className="item">
          <h2>3. Generate, shop and checkout</h2>
          <video
            ref={el => (videoRefs.current[2] = el)}
            className={`video ${isPlaying[2] ? 'playing' : 'greyed-out'}`}
            src={generateAndPay}
            muted
            loop
          ></video>
        </div>
      </div>
    </div>
  );
}
