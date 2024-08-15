import React, { useState, useEffect } from 'react';
import './styling.css'; 
import Pixelated from './Pixelated'; // Import the Pixelated component

const ImageUploader = ({ diceX, diceY, selectedImage, radio, trim, brightness, handleDiceSizeChange, diceSize }) => { // Destructure props to get diceX and diceY
  // const [selectedImage, setSelectedImage] = useState(null);
  const [bwImage, setBwImage] = useState(null);
  const [numPixelsX, setNumPixelsX] = useState(50); // Default value, can be updated using props
  const [numPixelsY, setNumPixelsY] = useState(50); // Default value, can be updated using props

  useEffect(() => {
    if (diceX && diceY) { // Update numPixelsX and numPixelsY when props change
      setNumPixelsX(diceX);
      setNumPixelsY(diceY);
    }
  }, [diceX, diceY]);


  useEffect(() => {
    if (selectedImage.src) {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imageData.data;
        const ratio = img.height / img.width;

        setNumPixelsX(60); // Set default values if props are not provided
        setNumPixelsY(Math.round(ratio * 60));

        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = brightness;
          data[i + 1] = brightness;
          data[i + 2] = brightness;
        }

        ctx.putImageData(imageData, 0, 0);
        setBwImage(canvas.toDataURL());
      };
      img.src = selectedImage.src;
    } else {
      setBwImage(null);
    }
  }, [selectedImage.src]);





  return (
    <div className="container">

  
      {/* Render Pixelated component only when both numPixelsX and numPixelsY have valid values */}
      {numPixelsX && numPixelsY && bwImage && (
        <div className="pixelated-container">
          <Pixelated
            bwImage={bwImage}
            numPixelsX={numPixelsX}
            numPixelsY={numPixelsY}
            radio={radio}
            brightness={brightness}
            trim={trim}
            handleDiceSizeChange={handleDiceSizeChange}
            diceSize={diceSize}
            diceX={diceX}
            diceY={diceY}

          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
