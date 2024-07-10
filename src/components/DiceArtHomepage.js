import ImageUploader from "./ImageUploader";
import Navbar from './Navbar'; 
import { useEffect, useState } from "react";
import './styling.css'
// import Navbar from "./Navbar";

// importing dice images for the radio button images. 
import diceOneImage from '../Assets/dice-one.png';
import whiteDiceOneImage from '../Assets/whitedice-one.png';
import blackAndWhiteOneImage from '../Assets/blackAndWhiteDie.png'; 


export default function DiceArtHomepage() {
  
  const [diceX, setDiceX] = useState(0);
  const [diceY, setDiceY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(1); 
  const [width, setWidth] = useState(1); 
  const [height, setHeight] = useState(1); 
  const [radio, setRadio] = useState('black'); 
  const [brightness, setBrightness] = useState(1); 
  const [diceSize, setDiceSize] = useState(1.6); 
  const [controlsDisplayed, setControlsDisplayed] = useState(false); 

  function handleNumPixelsXChange(event) {
    setDiceX(event.target.value); // Set the state with the new value of the input field
  }

  function handleNumPixelsYChange(event) {
    setDiceY(event.target.value); // Set the state with the new value of the input field
  }

  function handleIncreaseSize() {
    const xyRatio = selectedImage.width / selectedImage.height;
	console.log(xyRatio); 
	var newDiceX; 
	var newDiceY; 
	if (width >= height){
    newDiceX = Math.min(diceX + (width/height)*5); // Limit the maximum value to 160
	newDiceY = Math.min(diceY + 5); // Limit the maximum value to 160
	} else {
		newDiceX = Math.min(diceX + 5); // Limit the maximum value to 160
		newDiceY = Math.min(diceY + (height/width)*5); // Limit the maximum value to 160
	}


    setDiceX(Math.round(newDiceX));
	setDiceY(Math.round(newDiceY)); 
	
  }

  function handleDecreaseSize() {
    const xyRatio = selectedImage.width / selectedImage.height;
	console.log(xyRatio); 
	var newDiceX; 
	var newDiceY; 
	if (width >= height){
    newDiceX = Math.min(diceX - (width/height)*5); // Limit the maximum value to 160
	newDiceY = Math.min(diceY - 5); // Limit the maximum value to 160
	} else {
		newDiceX = Math.min(diceX - 5); // Limit the maximum value to 160
		newDiceY = Math.min(diceY - (height/width)*5); // Limit the maximum value to 160
	}
    setDiceX(Math.round(newDiceX));
	setDiceY(Math.round(newDiceY)); 
	
  }


  const handleImageChange = (event) => {
	const file = event.target.files[0];
	if (file) {
	  const reader = new FileReader();
	  reader.onload = function (e) {
		const img = new Image();
		img.onload = function () {
		const width = img.naturalWidth;
		const height = img.naturalHeight;
		setWidth(img.naturalWidth); 
		setHeight(img.naturalHeight);
		
		  setSelectedImage({ src: e.target.result, width, height });
		  console.log('width: ' + width + ' Height: ' + height); 
		if (width >= height){
			setDiceX(80); 
			setDiceY(80*(height/width)); 
		} else {
			setDiceX(80*(width/height))
			setDiceY(80); 
		}

		};
		img.src = e.target.result;
	  };
	  reader.readAsDataURL(file);

    // also if there is a file I want to render the controls... 
    setControlsDisplayed(true); 

	}
  };
  
  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  const handleSetBrightness = (event) => {
	  setBrightness(event.target.value);
  }

  const handleDiceSizeChange = (event) => {
    setDiceSize(event.target.value); 
  }

  return (
    <div>
      <Navbar/>

      <h1 id="title">Dice Mosaic Generator</h1>

      <div>
        <label htmlFor="imageInput" className="imageInputButton">
          <span>Choose Image</span>
          <input 
            id="imageInput" 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </label>
      </div>
      
      {controlsDisplayed && (

        
        <div id='imageControls'>
          {/* <div>
          <input 
            type="radio" 
            id="black" 
            name="color" 
            value="black" 
            checked={radio === 'black'} 
            onChange={handleRadioChange}
          />
          <label htmlFor="black">Black
          
          </label>


          <input 
            type="radio" 
            id="white" 
            name="color" 
            value="white" 
            checked={radio === 'white'} 
            onChange={handleRadioChange}
          />
          <label htmlFor="white">White</label>




          <input 
            type="radio" 
            id="both" 
            name="color" 
            value="both" 
            checked={radio === 'both'} 
            onChange={handleRadioChange}
          />
          <label htmlFor="both">Both</label>
          </div>  
      */}


      <div>
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
          {/* You can use either image or a combination image for "both" */}
          <img src={blackAndWhiteOneImage} className="radio-image" alt="Both Dice" />
        </label>
      </div>


      <div>
        <button onClick={handleIncreaseSize}>Increase size</button>
        <button onClick={handleDecreaseSize}>Decrease size</button>
      </div> 







          <div>
          <label>
            Number of Dice X:
            <input
              type="number"
              value={diceX}
              min={30}
              max={160}
              onChange={handleNumPixelsXChange}
            />
          </label>

          <label>
            Number of Dice Y:
            <input
              type="number"
              value={diceY}
              min={30}
              max={160}
              onChange={handleNumPixelsYChange}
            />
          </label>
          </div>

          <div>
            <input id = 'diceSizeSetter' type = 'number' value={diceSize}
            onChange={handleDiceSizeChange}
            placeholder='Die Size'
            step = '0.1'
            /> 

            <p>Dice Image Size: {(diceX * diceSize).toFixed(2)}cm x {(diceY * diceSize).toFixed(2)}cm</p>
          </div>
      </div>

      )}

      <ImageUploader 
      diceX={diceX} 
      diceY={diceY} 
      selectedImage={selectedImage} 
      radio={radio} 
      brightness={brightness}/>
    </div>
  );
}
