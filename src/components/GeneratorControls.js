import React, { useState } from 'react';
import './styling.css'; 

import diceOneImage from '../Assets/NewDice/BlackDice/1.png';
import whiteDiceOneImage from '../Assets/NewDice/WhiteDice/2.png';
import blackAndWhiteOneImage from '../Assets/NewDice/dualColourOne.png';

export default function GeneratorControls({
  radio, setRadio,
  brightness, setBrightness,
  trim, setTrim,
  diceX, diceY, setDiceX, setDiceY,
  selectedImage,
  handleIncreaseSize,
  handleDecreaseSize
}) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  const handleNumPixelsXChange = (event) => {
    setDiceX(event.target.value); // Set the state with the new value of the input field
  };

  const handleNumPixelsYChange = (event) => {
    setDiceY(event.target.value); // Set the state with the new value of the input field
  };

  return (
    <>
      <button onClick={toggleSidebar} id = 'toggle-controls' className="toggle-button">
        {isOpen ? 'Close' : 'Open'} Controls
      </button>
      <div id="sidebar" className={isOpen ? 'open' : ''}>
        <div id="imageControls">
			<p>Selected photo</p>
		  <img id = 'chosenPhoto' src = {selectedImage.src} alt = 'selected'></img>
          <div id = 'diceColourTypes'>
            <input
              type="radio"
              id="black"
              name="color"
              value="black"
              checked={radio === 'black'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            <label htmlFor="black" className="radio-label">
              <img src={diceOneImage} className="radio-image" alt="Black Dice" />
            </label>

            <input
              type="radio"
              id="white"
              name="color"
              value="white"
              checked={radio === 'white'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            <label htmlFor="white" className="radio-label">
              <img src={whiteDiceOneImage} className="radio-image" alt="White Dice" />
            </label>

            <input
              type="radio"
              id="both"
              name="color"
              value="both"
              checked={radio === 'both'}
              onChange={handleRadioChange}
              className="radio-input"
            />
            <label htmlFor="both" className="radio-label">
              <img src={blackAndWhiteOneImage} className="radio-image" alt="Both Dice" />
            </label>
          </div>

          <div>
            <button id = 'incSize' onClick={handleIncreaseSize}>Increase size</button>
            <button id = 'decSize' onClick={handleDecreaseSize}>Decrease size</button>
          </div> 

          <div>
            <label>
              Number of Dice X:
              <input
                type="number"
                value={Math.round(diceX)}
                min={30}
                max={300}
                onChange={handleNumPixelsXChange}
              />
            </label>

            <label>
              Number of Dice Y:
              <input
                type="number"
                value={Math.round(diceY)}
                min={30}
                max={300}
                onChange={handleNumPixelsYChange}
              />
            </label>
          </div>

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
          
          <div id='trimDivContainer'>
			<div class = 'trimAlignment'>
				<label htmlFor="trim-top">Trim Top </label>
				<input
					placeholder='top'
					type="number"
					id="trim-top"
					min='0'
					value={trim.top}
					onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, top: parseInt(e.target.value) }))}
				/>
			</div>

			<div class = 'trimAlignment'>
            <label htmlFor="trim-bottom">Trim Bottom </label>
            <input
              type="number"
              id="trim-bottom"
              min='0'
              value={trim.bottom}
              onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, bottom: parseInt(e.target.value) }))}
            />
			</div>

			<div class = 'trimAlignment'>
            <label htmlFor="trim-left">Trim Left </label>
            <input
              type="number"
              id="trim-left"
              min='0'
              value={trim.left}
              onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, left: parseInt(e.target.value) }))}
            />
			</div>

			<div class = 'trimAlignment'>
            <label htmlFor="trim-right">Trim Right </label>
            <input
              type="number"
              id="trim-right"
              min='0'
              value={trim.right}
              onChange={(e) => setTrim(prevTrim => ({ ...prevTrim, right: parseInt(e.target.value) }))}
            />
			</div>
          </div>
        </div>
      </div>
    </>
  );
}
