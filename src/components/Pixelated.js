import React, { useState, useEffect } from 'react';
import diceOneImage from '../Assets/dice-one.png';
import diceTwoImage from '../Assets/dice-two.png';
import diceThreeImage from '../Assets/dice-three.png';
import diceFourImage from '../Assets/dice-four.png';
import diceFiveImage from '../Assets/dice-five.png';
import diceSixImage from '../Assets/dice-six.png';
import whiteDiceOneImage from '../Assets/whitedice-one.png';
import whiteDiceTwoImage from '../Assets/whitedice-two.png';
import whiteDiceThreeImage from '../Assets/whitedice-three.png';
import whiteDiceFourImage from '../Assets/whitedice-four.png';
import whiteDiceFiveImage from '../Assets/whitedice-five.png';
import whiteDiceSixImage from '../Assets/whitedice-six.png';
import './styling.css';

const diceImages = [
  diceOneImage, diceTwoImage, diceThreeImage, diceFourImage, diceFiveImage, diceSixImage
];

const whiteDiceImages = [
  whiteDiceOneImage, whiteDiceTwoImage, whiteDiceThreeImage, whiteDiceFourImage, whiteDiceFiveImage, whiteDiceSixImage
];

const Pixelated = ({ bwImage, numPixelsX, numPixelsY, radio, bright }) => {
  const [pixelColors, setPixelColors] = useState([]);
  const [brightness, setBrightness] = useState(bright);
  const [diceValues, setDiceValues] = useState([]);
  // const [blackDiceCount, setBlackDiceCount] = useState(0); // used to let the user know how many dice are used in each generation. 
  // const [whiteDiceCount, setWhiteDiceCount] = useState(0); // same thing but for white dice 
  
  var blackDiceCount = 0; 
  var whiteDiceCount = 0; 


  useEffect(() => {
    if (bwImage) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const colors = [];
        const diceValues = [];
        const pixelWidth = Math.floor(img.width / numPixelsX);
        const pixelHeight = Math.floor(img.height / numPixelsY);

        // everytime that this is called we are re-creating the dice art image, therefore 
        // we need to set the black and white die values to 0 as they will be reset in the double for loop. 
        // setBlackDiceCount(0); 
        // setWhiteDiceCount(0); 

        blackDiceCount = 0; 
        whiteDiceCount = 0; 

        
        for (let y = 0; y < numPixelsY; y++) {
          const row = [];
          const diceRow = [];
          for (let x = 0; x < numPixelsX; x++) {
            const pixelX = x * pixelWidth;
            const pixelY = y * pixelHeight;
            const imageData = ctx.getImageData(pixelX, pixelY, 1, 1);
            const [r, g, b, a] = imageData.data;
            const color = `rgb(${r}, ${g}, ${b})`;
            row.push(color);
            if (radio === 'both') {
              diceRow.push(mapToDieBothIndex(color)); // we need to count the number of white vs black die mapped here. 
            } else {
              diceRow.push(mapToDieIndex(color)); // We need to consider the colour type that is matched here. 
            }
          }
          colors.push(row);
          diceValues.push(diceRow);
        }
        setPixelColors(colors);
        setDiceValues(diceValues);
      };
      img.src = bwImage;
    }
  }, [bwImage, numPixelsX, numPixelsY, brightness, radio]);

  const mapToDieIndex = (color) => {
    const palette = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'];
    const redValue = parseInt(color.split(',')[0].slice(4), 10);
    const rangeSize = Math.ceil((256 - brightness) / palette.length);


    if (redValue < rangeSize) return 0;
    if (redValue < rangeSize * 2) return 1;
    if (redValue < rangeSize * 3) return 2;
    if (redValue < rangeSize * 4) return 3;
    if (redValue < rangeSize * 5) return 4;
    return 5;
  };




  const mapToDieBothIndex = (color) => {
    const paletteSize = 12; // 12 die total, there are 12 possible shades. 
    const redValue = parseInt(color.split(',')[0].slice(4), 10); // Get the red integer value of the color
    const adjustedBrightness = (brightness + 100) / 200; // Normalize brightness to range 0-1 //
    const rangeSize = Math.ceil(256 / paletteSize);


    let adjustedRedValue = redValue * adjustedBrightness; // ratio between 0 and 1 that 

    const index = Math.floor(adjustedRedValue / rangeSize);
    console.log(index); 
    // the index that is returned here is a value that is between 0-11. So, if the value is >=s 6, we have a white die. 
    // if we have a value <6 we have a black die. 
    // if (index >= 6){
    //   // setWhiteDiceCount(whiteDiceCount + 1); // increment the die count by 1. 
    // } else if (index < 6){
    //   // setBlackDiceCount(blackDiceCount + 1); 
    // }

    return index;
  };

  const handleDieClick = (rowIndex, colIndex) => {
    setDiceValues(prevDiceValues => {
      const newDiceValues = prevDiceValues.map(row => row.slice());
      newDiceValues[rowIndex][colIndex] = (newDiceValues[rowIndex][colIndex] + 1) % (radio === 'both' ? 12 : 6);
      return newDiceValues;
    });
  };

  const getDieImage = (dieIndex) => {
    if (radio === 'both') {
      if (dieIndex < 6) {
        // setBlackDiceCount(blackDiceCount + 1); 
        blackDiceCount += 1; 
        return diceImages[dieIndex];
      } else {
        // setWhiteDiceCount(whiteDiceCount + 1); 
        whiteDiceCount += 1; 
        return whiteDiceImages[dieIndex - 6];
      }
    } else {


      /** This is to count the number of dice for strictly black or white photos, however
       * The dice count can simply be calculated by multiplying the x value by the y value. 
       */
      // if(radio === 'white'){
      //   setWhiteDiceCount(whiteDiceCount + 1); 
      // } else if (radio === 'black'){
      //   setBlackDiceCount(blackDiceCount + 1); 
      // }
      if (radio === 'white'){
        whiteDiceCount += 1; 
      } else {
        blackDiceCount += 1; 
      }

      return radio === 'white' ? whiteDiceImages[dieIndex] : diceImages[dieIndex];
    }
  };

  return (
    <div className="diceImageContainer">
      <div>
        <label htmlFor="brightness">Brightness </label>
        <input
          type="range"
          id="brightness"
          min="-100"
          max="100"
          value={brightness}
          onChange={(e) => setBrightness(parseInt(e.target.value))}
        />
        <output htmlFor="brightness">{brightness}</output>
      </div>

      {['black', 'white', 'both'].includes(radio) && (
        <div>
          {diceValues.map((row, rowIndex) => ( 
            <div className='diceRow' key={rowIndex} style={{ height: '10px' }}>
              {row.map((dieValue, colIndex) => (
                <img
                  src={getDieImage(dieValue)}
                  alt='Die Image'
                  key={colIndex}
                  onClick={() => handleDieClick(rowIndex, colIndex)}
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    marginRight: '0px',
                    marginTop: '0px',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <p> Black dice used: {blackDiceCount}</p>
      <p> White dice used: {whiteDiceCount}</p>




      


    </div>
  );
};

export default Pixelated;
