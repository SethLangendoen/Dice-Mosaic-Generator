import ImageUploader from "./ImageUploader";
import HomeText from "./Home";
import Navbar from './Navbar'; 
import { useEffect, useState } from "react";
import About from './About'; 
import './styling.css'
import Animation from './Animation.js'; 





// import Navbar from "./Navbar";


to push changes without getting the permiissions error...
git remote set-url origin https://github.com/SethLangendoen/Dice-Mosaic-Generator.git
git branch
git checkout master
git add .
git commit -m "Added generator die counting functionality"     
git push -u origin master

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
    newDiceX = Math.min(parseInt(diceX) + parseInt((width/height)*5)); // Limit the maximum value to 160
	  newDiceY = Math.min(parseInt(diceY) + parseInt(5)); // Limit the maximum value to 160
	} else {
		newDiceX = Math.min(parseInt(diceX) + parseInt(5)); // Limit the maximum value to 160
		newDiceY = Math.min(parseInt(diceY) + parseInt((height/width)*5)); // Limit the maximum value to 160
	}
    if(newDiceX > 30 && newDiceX < 130){
      setDiceX(Math.round(newDiceX));
    }
    
    if(newDiceY > 30 && newDiceY <130){
      setDiceY(Math.round(newDiceY)); 
    }
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
    if(newDiceX > 30 && newDiceX < 130){
      setDiceX(Math.round(newDiceX));
    }

    if(newDiceY > 30 && newDiceY < 130){
      setDiceY(Math.round(newDiceY)); 
    }
	
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

      <Animation />

      <Navbar/>

      <h1 id="title">Dice Mosaic Generator</h1>

      <HomeText />


      <div id = 'generator'>
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
              value={Math.round(diceX)}
              min={30}
              max={130}
              onChange={handleNumPixelsXChange}
            />
          </label>

          <label>
            Number of Dice Y:
            <input
              type="number"
              value={Math.round(diceY)}
              min={30}
              max={130}
              onChange={handleNumPixelsYChange}
            />
          </label>
          </div>

      </div>

      )}

      <ImageUploader 
      diceX={diceX} 
      diceY={diceY} 
      selectedImage={selectedImage} 
      radio={radio} 
      brightness={brightness}/>


      {controlsDisplayed && (
        <div id = 'diceSizeSetterContainer'>
        <input id = 'diceSizeSetter' type = 'number' value={diceSize}
        onChange={handleDiceSizeChange}
        placeholder='Die Size'
        step = '0.1'
        /> 
        <p>Dice Image Size: {(diceX * diceSize).toFixed(2)}cm x {(diceY * diceSize).toFixed(2)}cm</p>
      </div>
      )}


      {/** This is where I will state how many dice of each colour were used.  */}


      <div id = 'aboutBackground'>
        <About />  
      </div>
     

        <div data-aos='fade-up' data-aos-offset="100" id = 'donationDiv'>
          <p id="support-message" >Did you find this generator helpful? If so, please support the developer <a href='https://buymeacoffee.com/sethlangendoen' target='_blank'>Buy me a coffee!</a></p>
          <p id = 'contact' >Any other questions or concerns? Email us at <a href="mailto:youremail@example.com" target = '_blank'>youremail@example.com</a></p>
        </div>



    </div>
  );
}
