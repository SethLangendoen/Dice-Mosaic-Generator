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

const diceImages = [
  diceOneImage, diceTwoImage, diceThreeImage, diceFourImage, diceFiveImage, diceSixImage
];

const whiteDiceImages = [
  whiteDiceSixImage, whiteDiceFiveImage, whiteDiceFourImage, whiteDiceThreeImage, whiteDiceTwoImage, whiteDiceOneImage
];

const Pixelated = ({ bwImage, numPixelsX, numPixelsY, radio, bright }) => {
  const [brightness, setBrightness] = useState(bright);
  const [diceValues, setDiceValues] = useState([]);
  const [trim, setTrim] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  var blackDiceCount = 0;
  var whiteDiceCount = 0;

  const mapToDieIndex = useCallback((color) => {
    const palette = ['#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff'];
    const redValue = parseInt(color.split(',')[0].slice(4), 10);
    const rangeSize = Math.ceil((256 - brightness) / palette.length);
    if (redValue < rangeSize) return 0;
    if (redValue < rangeSize * 2) return 1;
    if (redValue < rangeSize * 3) return 2;
    if (redValue < rangeSize * 4) return 3;
    if (redValue < rangeSize * 5) return 4;
    return 5;
  }, [brightness]);

  const mapToDieBothIndex = useCallback((color) => {
    const paletteSize = 12;
    const redValue = parseInt(color.split(',')[0].slice(4), 10);
    const adjustedBrightness = (brightness + 100) / 200;
    const rangeSize = Math.ceil(256 / paletteSize);
    let adjustedRedValue = redValue * adjustedBrightness;
    const index = Math.floor(adjustedRedValue / rangeSize);
    return index;
  }, [brightness]);

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

        const startX = trim.left;
        const startY = trim.top;
        const endX = numPixelsX - trim.right;
        const endY = numPixelsY - trim.bottom;

        for (let y = startY; y < endY; y++) {
          const row = [];
          const diceRow = [];
          for (let x = startX; x < endX; x++) {
            const pixelX = x * pixelWidth;
            const pixelY = y * pixelHeight;
            const imageData = ctx.getImageData(pixelX, pixelY, 1, 1);
            const [r, g, b] = imageData.data;
            const color = `rgb(${r}, ${g}, ${b})`;
            row.push(color);
            if (radio === 'both') {
              diceRow.push(mapToDieBothIndex(color));
            } else {
              diceRow.push(mapToDieIndex(color));
            }
          }
          colors.push(row);
          diceValues.push(diceRow);
        }
        setDiceValues(diceValues);
      };
      img.src = bwImage;
    }
  }, [bwImage, numPixelsX, numPixelsY, brightness, radio, mapToDieBothIndex, mapToDieIndex, trim]);

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
        blackDiceCount += 1; 
        return diceImages[dieIndex];
      } else {
        whiteDiceCount += 2; 
        return whiteDiceImages[dieIndex - 6];
      }
    } else {
      if (radio === 'white'){
        whiteDiceCount += 1;
      } else {
        blackDiceCount += 1;
      }

      return radio === 'white' ? whiteDiceImages[dieIndex] : diceImages[dieIndex];
    }
  };

  const generatePNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scale = 60; // Adjust scale for higher resolution
    canvas.width = diceValues[0].length * scale;
    canvas.height = diceValues.length * scale;

    diceValues.forEach((row, rowIndex) => {
      row.forEach((dieValue, colIndex) => {
        const img = new Image();
        img.src = getDieImage(dieValue);
        ctx.drawImage(img, colIndex * scale, rowIndex * scale, scale, scale);
      });
    });

    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'dice-mosaic.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
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
      
      <div id = 'trimDivContainer'>
        <label htmlFor="trim-top">Trim Top </label>
        <input
          type="number"
          id="trim-top"
          min='0'
          value={trim.top}
          onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, top: parseInt(e.target.value) }))}
        />
        <label htmlFor="trim-bottom">Trim Bottom </label>
        <input
          type="number"
          id="trim-bottom"
          min='0'
          value={trim.bottom}
          onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, bottom: parseInt(e.target.value) }))}
        />
        <label htmlFor="trim-left">Trim Left </label>
        <input
          type="number"
          id="trim-left"
          min='0'
          value={trim.left}
          onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, left: parseInt(e.target.value) }))}
        />
        <label htmlFor="trim-right">Trim Right </label>
        <input
          type="number"
          id="trim-right"
          min='0'
          value={trim.right}
          onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, right: parseInt(e.target.value) }))}
        />
      </div>

      {['black', 'white', 'both'].includes(radio) && (
        <div id='diceMosaicContainer'>
          {diceValues.map((row, rowIndex) => (
            <div className='diceRow' key={rowIndex} style={{ height: '10px' }}>
              {row.map((dieValue, colIndex) => (
                <img
                  src={getDieImage(dieValue)}
                  alt='Die'
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

      <button id = 'generatePNG' onClick={generatePNG}>Generate PNG</button>

      <p>
        <img src={diceFiveImage} style={{ width: '12px', height: '12px' }} alt='black dice' />
        Black dice used: {blackDiceCount}
      </p>
      <p>
        <img src={whiteDiceFiveImage} style={{ width: '12px', height: '12px' }} alt='white dice' />
        White dice used: {whiteDiceCount}
      </p>
    </div>
  );
};

export default Pixelated;
