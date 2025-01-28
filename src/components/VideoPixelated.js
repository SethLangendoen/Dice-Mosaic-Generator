import React, { useState, useEffect, useCallback } from 'react';
import diceOneImage from '../Assets/NewDice/BlackDice/1.png';
import diceTwoImage from '../Assets/NewDice/BlackDice/2.png';
import diceThreeImage from '../Assets/NewDice/BlackDice/3.png';
import diceFourImage from '../Assets/NewDice/BlackDice/4.png';
import diceFiveImage from '../Assets/NewDice/BlackDice/5.png';
import diceSixImage from '../Assets/NewDice/BlackDice/6.png';
import whiteDiceOneImage from '../Assets/NewDice/WhiteDice/2.png';
import whiteDiceTwoImage from '../Assets/NewDice/WhiteDice/3.png';
import whiteDiceThreeImage from '../Assets/NewDice/WhiteDice/4.png';
import whiteDiceFourImage from '../Assets/NewDice/WhiteDice/5.png';
import whiteDiceFiveImage from '../Assets/NewDice/WhiteDice/6.png';
import whiteDiceSixImage from '../Assets/NewDice/WhiteDice/7.png';
import './styling.css';

const diceImages = [diceOneImage, diceTwoImage, diceThreeImage, diceFourImage, diceFiveImage, diceSixImage];
const whiteDiceImages = [whiteDiceOneImage, whiteDiceTwoImage, whiteDiceThreeImage, whiteDiceFourImage, whiteDiceFiveImage, whiteDiceSixImage];

const VideoPixelated = ({ frames,contrast, numPixelsX, numPixelsY, radio, brightness, trim, videoDuration, videoProgress, handleDiceSizeChange, diceSize, diceX, diceY }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [diceValues, setDiceValues] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(50);

  const mapToDieIndex = useCallback((color) => {
    const palette = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'];
    const redValue = parseInt(color.split(',')[0].slice(4), 10);
  
    // Adjust brightness scaling: -100 -> black, +100 -> white
    let adjustedRedValue;
    if (brightness >= 0) {
      adjustedRedValue = redValue + (255 - redValue) * (brightness / 100);
    } else {
      adjustedRedValue = redValue * (1 + brightness / 100); // Adjust for negative brightness
    }
  
    // Apply contrast if provided
    if (contrast) {
      const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast)); // Contrast formula
      adjustedRedValue = contrastFactor * (adjustedRedValue - 128) + 128; // Apply contrast
    }
  
    // Ensure adjustedRedValue is clamped between 0 and 255
    adjustedRedValue = Math.max(0, Math.min(255, adjustedRedValue));
  
    // Calculate the index based on adjusted red value and brightness
    const rangeSize = Math.ceil(256 / palette.length);
  
    if (adjustedRedValue < rangeSize) return 0;
    if (adjustedRedValue < rangeSize * 2) return 1;
    if (adjustedRedValue < rangeSize * 3) return 2;
    if (adjustedRedValue < rangeSize * 4) return 3;
    if (adjustedRedValue < rangeSize * 5) return 4;
    return 5;
  }, [brightness, contrast]);
  

  const getDieImage = (dieIndex) => {
    if (radio === 'both') {
      return dieIndex < 6 ? diceImages[dieIndex] : whiteDiceImages[dieIndex - 6];
    } else {
      return radio === 'white' ? whiteDiceImages[dieIndex] : diceImages[dieIndex];
    }
  };

  const mapToDieBothIndex = useCallback((color) => {
    const paletteSize = 12;
    const redValue = parseInt(color.split(',')[0].slice(4), 10); // Extract red channel value
  
    // Adjust brightness scaling: -100 -> black, +100 -> white
    let adjustedRedValue;
    if (brightness >= 0) {
      adjustedRedValue = redValue + (255 - redValue) * (brightness / 100);
    } else {
      adjustedRedValue = redValue + (redValue) * (brightness / 100);
    }

    if (contrast) {
      const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast)); // Formula for contrast adjustment
      adjustedRedValue = contrastFactor * (adjustedRedValue - 128) + 128; // Red
    } 
  
    // Ensure the value is clamped between 0 and 255
    adjustedRedValue = Math.max(0, Math.min(255, adjustedRedValue));
  
    // Calculate index based on the adjusted red value
    const rangeSize = Math.ceil(256 / paletteSize);
    const index = Math.floor(adjustedRedValue / rangeSize);
  
    return index;
  }, [brightness, contrast]);



  useEffect(() => {
    if (!isPlaying) return;

    const intervalId = setInterval(() => {
      setFrameIndex(prevIndex => (prevIndex + 1) % frames.length);
    }, speed);

    return () => clearInterval(intervalId);
  }, [isPlaying, frames.length, speed]);

  useEffect(() => {
    if (frames[frameIndex]) {
      const img = new Image();
      img.src = frames[frameIndex];
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const newDiceValues = [];
        const pixelWidth = Math.floor(img.width / numPixelsX);
        const pixelHeight = Math.floor(img.height / numPixelsY);
        const startX = trim.left;
        const startY = trim.top;
        const endX = numPixelsX - trim.right;
        const endY = numPixelsY - trim.bottom;

        for (let y = startY; y < endY; y++) {
          const row = [];
          for (let x = startX; x < endX; x++) {
            const pixelX = x * pixelWidth;
            const pixelY = y * pixelHeight;
            const imageData = ctx.getImageData(pixelX, pixelY, 1, 1);
            const [r, g, b] = imageData.data;
            const color = `rgb(${r}, ${g}, ${b})`;
            row.push(radio === 'both' ? mapToDieBothIndex(color) : mapToDieIndex(color));
          }
          newDiceValues.push(row);
        }
        setDiceValues(newDiceValues);




      };
    }
  }, [frameIndex, frames, numPixelsX, numPixelsY, mapToDieIndex, mapToDieBothIndex, radio, trim]);

  return (
    <div className="diceImageContainer">
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <label>
        Frame rate (ms):
        <input
          type="number"
          value={speed}
          onChange={(e) => setSpeed(Math.max(1, Number(e.target.value)))}
        />
      </label>

	  <label>
        Frame / {frames.length}:
        <input
          type="number"
          value={frameIndex}
          onChange={(e) => setFrameIndex(Math.max(0, Number(e.target.value)))}
		  max={frames.length}
		  min='0'
        />
      </label>


      {['black', 'white', 'both'].includes(radio) && (
		
        <div id='diceMosaicContainer'>

          {diceValues.map((row, rowIndex) => (
            <div key={rowIndex} className='videoDiceRow'>
              {row.map((dieValue, colIndex) => (
                <img
                  key={colIndex}
                  src={getDieImage(dieValue)}
                  alt="Die"
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoPixelated;
