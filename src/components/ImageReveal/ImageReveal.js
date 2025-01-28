import React, { useRef } from 'react';
import './ImageReveal.css';
import topImg from '../../Assets/dm/treeNoBg.png'; 
import bottomImg from '../../Assets/MosaicExamples/treeHomeNoBg.png'; 


function ImageReveal() {
  const overlayRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = overlayRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left; // Horizontal position relative to the image
    overlayRef.current.style.clipPath = `inset(0 0 0 ${mouseX}px)`;
  };

  const handleMouseLeave = () => {
    overlayRef.current.style.clipPath = `inset(0 0 0 0)`; // Reset to full overlay
  };

  return (
    <div className="image-container" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <img src={bottomImg} alt="Bottom Layer" className="bottom-image" />
      <img ref={overlayRef} src={topImg} alt="Top Layer" className="top-image" />
    </div>
  );
}

export default ImageReveal;
