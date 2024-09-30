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

const Pixelated = ({ bwImage, numPixelsX, numPixelsY, radio, trim, brightness, handleDiceSizeChange, diceX, diceY }) => {
  // const [brightness, setBrightness] = useState(bright);
  const [diceValues, setDiceValues] = useState([]);
  const [diceSize, setDiceSize] = useState(1.6); 
  // const [trim, setTrim] = useState({ top: 0, bottom: 0, left: 0, right: 0 });
  // const [isPaid, setIsPaid] = useState(false); 
  // Add state to store contrast value
// const [contrast, setContrast] = useState(1);

// Slider component to control contrast
// const handleContrastChange = (e) => {
//   setContrast(e.target.value);
// };


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
    const redValue = parseInt(color.split(',')[0].slice(4), 10); // Extract red channel value
  
    // Adjust brightness scaling: -100 -> black, +100 -> white
    let adjustedRedValue;
    if (brightness >= 0) {
      adjustedRedValue = redValue + (255 - redValue) * (brightness / 100);
    } else {
      adjustedRedValue = redValue + (redValue) * (brightness / 100);
    }
  
    // Ensure the value is clamped between 0 and 255
    adjustedRedValue = Math.max(0, Math.min(255, adjustedRedValue));
  
    // Calculate index based on the adjusted red value
    const rangeSize = Math.ceil(256 / paletteSize);
    const index = Math.floor(adjustedRedValue / rangeSize);
  
    return index;
  }, [brightness]);
  









  const generatePNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const scale = 60; // Adjust scale for higher resolution // For Fiver: 20 basic, 40, medium, 70 high
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
        whiteDiceCount += 1; 
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


  const handleDiceSize = useCallback((size) => {
    setDiceSize(size); // save the dimensions. 
  }, [])

  useEffect(() => {
    handleDiceSize(diceSize); 

  }, [numPixelsX, numPixelsY, diceSize, handleDiceSize])


  return (
    <div className="diceImageContainer">



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


      <div id = 'mosaicSummaryDiv'>
      <h3 >Mosaic Summary</h3>
      <div>Dice Size <input type = 'number' step = '0.1' min = '0.5' max ='3' value = {diceSize} onChange={(e => handleDiceSize(e.target.value))}></input> mm</div>
      <p>Width: <strong>{(diceSize * (numPixelsX - trim.left - trim.right)).toFixed(2)} cm</strong></p>
      <p>Height: <strong>{(diceSize * (numPixelsY - trim.top - trim.bottom)).toFixed(2)} cm </strong></p>
      <p>
        Estimated Time: 
        <strong>
          {Math.floor(((((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * 7) / 3600) + 1)} hours, 
           {' ' + Math.round(((((((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * 7) / 3600) + 1) % 1) * 60)} minutes
        </strong>
      </p> 
      <p> 
        Estimated Cost: 
        <strong className = 'costBlur'>
          {'$' + (((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * (0.015 * ((Number(diceSize) + 0.5)))).toFixed(2)}
          </strong> <div id = 'visitShop'> <a id = 'shopLink' href = '/shop'> See Shop</a></div>
      </p>
      <p> 
        Monetary value: 
        <strong className = 'costBlur'>
          {'$' + (((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * (0.015 * ((Number(diceSize) + 0.5)))*7.3).toFixed(2)}
        </strong> <div id = 'visitBlog'> <a id = 'blogLink' href = '/blog'> See Blog</a></div>
      </p>

      


      <p>
        <img src={diceFiveImage} style={{ width: '12px', height: '12px', marginRight: '5px'}} alt='black dice' />
        Black Dice: <strong>{blackDiceCount}</strong>
      </p>
      <p>
        <img src={whiteDiceFiveImage} style={{ width: '12px', height: '12px', marginRight: '5px' }} alt='white dice' />
        White dice: <strong>{whiteDiceCount}</strong>
      </p>
      
      <button id = 'generatePNG' onClick={generatePNG}>Generate PNG</button>

      </div>




      <div class="mosaic-container" data-aos="zoom-in" data-aos-duration = '750' data-aos-offset="800">
        <h1 class="mosaic-heading">Your Mosaic is looking Great!</h1>
        <p id="mosaic-description">
          Dice mosaics are an awesome project to keep you entertained and harness your inner creativity! Impress your friends, make a personable gift, or spend some valuable time putting one together with the family. When you are finished, hang it on your wall to show off your amazing skills!
        </p>
        <h2 id = 'nowWhat'>Now what?</h2>
        <ul id = 'whatsNextListItems'>
          <li>Save your customized dice art as a png for <strong>free!</strong></li>
          <li>Use our <strong>dice counter</strong> to check how many dice you will need for the project</li>
          <li>Head over to our <strong>shop</strong> where you can purchase the dice in bulk</li>
          <li>Read our <strong>blog</strong> for tips and tricks about how to create dice mosaics</li>
        </ul>
      </div>



    </div>
  );
};

export default Pixelated;
