import React, { useState, useEffect, useCallback } from "react";

export default function MosaicSummaryDiv({ 
  trim, 
  numPixelsX, 
  numPixelsY, 
  diceFiveImage, 
  whiteDiceFiveImage, 
  blackDiceCount, 
  whiteDiceCount,
  generatePNG
}) {
  const [diceSize, setDiceSize] = useState(1.5); // Default dice size

  const handleDiceSize = useCallback((size) => {
    setDiceSize(size); // Update dice size
  }, []);

  useEffect(() => {
    handleDiceSize(diceSize); 
  }, [numPixelsX, numPixelsY, diceSize, handleDiceSize]);

  const width = (diceSize * (numPixelsX - trim.left - trim.right)).toFixed(2);
  const height = (diceSize * (numPixelsY - trim.top - trim.bottom)).toFixed(2);
  const estimatedTimeHours = Math.floor((((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom) * 7) / 3600) + 1);
  const estimatedTimeMinutes = Math.round(((((((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * 7) / 3600) + 1) % 1) * 60);
  const estimatedCost = (((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * (0.015 * (Number(diceSize) + 0.5))).toFixed(2);
  const monetaryValue = (((numPixelsX - trim.left - trim.right) * (numPixelsY - trim.top - trim.bottom)) * (0.015 * (Number(diceSize) + 0.5)) * 7.3).toFixed(2);

  return (
    <div id="mosaicSummaryDiv">
      <h3>Mosaic Summary</h3>
      <div>
        Dice Size: 
        <input 
          type="number" 
          step="0.1" 
          min="0.5" 
          max="3" 
          value={diceSize} 
          onChange={(e) => handleDiceSize(Number(e.target.value))} 
        /> mm
      </div>
      <p>Width: <strong>{width} cm</strong></p>
      <p>Height: <strong>{height} cm</strong></p>
      <p>
        Estimated Time: 
        <strong>{estimatedTimeHours} hours, {estimatedTimeMinutes} minutes</strong>
      </p>
      <p> 
        Estimated Cost: 
        <strong className="costBlur">${estimatedCost}</strong> 
        <div id="visitShop"> 
          <a id="shopLink" href="/shop"> See Shop</a>
        </div>
      </p>
      <p> 
        Monetary value: 
        <strong className="costBlur">${monetaryValue}</strong> 
        <div id="visitBlog"> 
          <a id="blogLink" href="/blog"> See Blog</a>
        </div>
      </p>
      <p>
        <img src={diceFiveImage} style={{ width: '12px', height: '12px', marginRight: '5px' }} alt="black dice" />
        Black Dice: <strong>{blackDiceCount}</strong>
      </p>
      <p>
        <img src={whiteDiceFiveImage} style={{ width: '12px', height: '12px', marginRight: '5px' }} alt="white dice" />
        White Dice: <strong>{whiteDiceCount}</strong>
      </p>
      <button id="generatePNG" onClick={generatePNG}>Generate PNG</button>
    </div>
  );
}
