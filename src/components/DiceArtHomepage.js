

// to push changes without getting the permiissions error...
// git remote set-url origin https://github.com/SethLangendoen/Dice-Mosaic-Generator.git
// git branch
// git checkout master
// git add .
// git commit -m "structure update"
// git push -u origin master


import ImageUploader from "./ImageUploader";
import HomeText from "./Home";
import {useState } from "react";
// import About from './About'; 
import './styling.css'
import GeneratorControls from "./GeneratorControls";



// Import preset images
import presetImage1 from '../Assets/rubiks.gif';
import presetImage2 from '../Assets/panda.png'; 
import presetImage3 from '../Assets/guitar.jpg';
import presetImage4 from '../Assets/dm/anim.jpg';
import presetImage5 from '../Assets/dm/tiger.avif';
import presetImage6 from '../Assets/dm/bird.jpg';
import presetImage7 from '../Assets/dm/aiFrog.png'
import presetImage8 from '../Assets/dm/aiCat.png'
import presetImage9 from '../Assets/dm/aiEye.png'
import presetImage10 from '../Assets/dm/aiBird2.png'
import presetImage11 from '../Assets/dm/aiCow.jpeg'
import presetImage12 from '../Assets/dm/butterfly.jpg'



import MosaicExamples from "./MosaicExamples";
import DiceFall from "./DiceFall";
// import Process from "./TheProcess/Process";
// import ParticlesComponent from './ParticlesComponent';


const presetImages = [
  { src: presetImage1, width: 800, height: 600 },
  { src: presetImage2, width: 800, height: 600 },
  { src: presetImage3, width: 800, height: 600 },
  { src: presetImage4, width: 800, height: 600 },
  { src: presetImage5, width: 800, height: 600 },
  { src: presetImage6, width: 800, height: 600 },
  { src: presetImage7, width: 800, height: 600 },
  { src: presetImage8, width: 800, height: 600 },
  { src: presetImage9, width: 800, height: 600 },
  { src: presetImage10, width: 800, height: 600 },
  { src: presetImage11, width: 800, height: 600 },
  { src: presetImage12, width: 800, height: 600 }


];




export default function DiceArtHomepage() {
  
  const [diceX, setDiceX] = useState(0);
  const [diceY, setDiceY] = useState(0);
  const [selectedImage, setSelectedImage] = useState(1); 
  const [width, setWidth] = useState(1); 
  const [height, setHeight] = useState(1); 
  const [radio, setRadio] = useState('black'); 
  const [diceSize, setDiceSize] = useState(1.6); 
  const [controlsDisplayed, setControlsDisplayed] = useState(false); 


  // these controls are used in pixelated: 
  const [brightness, setBrightness] = useState(1);
  const [trim, setTrim] = useState({ top: 0, bottom: 0, left: 0, right: 0 });

  // var brightness = 1; 

  


  

  const handlePresetImageClick = (presetImage) => {
    setSelectedImage(presetImage);
    setWidth(presetImage.width);
    setHeight(presetImage.height);
  
    if (presetImage.width >= presetImage.height) {
      setDiceX(80);
      setDiceY(80 * (presetImage.height / presetImage.width));
    } else {
      setDiceX(80 * (presetImage.width / presetImage.height));
      setDiceY(80);
    }
  
    // Render the controls
    setControlsDisplayed(true);
  };



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
    
    if(newDiceY > 30 && newDiceY < 130){
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

  // const handleSetBrightness = (event) => {
	//   setBrightness(event.target.value);
  // }

  const handleDiceSizeChange = (event) => {
    setDiceSize(event.target.value); 
  }

  return (
    <div>


      <DiceFall >


      <h1 id="title">Dice Mosaic Generator</h1>

      <HomeText />


      <div id = 'generator'>


        <label htmlFor="imageInput" className="imageInputButton">
          <span>Choose Image</span>
          <input 
            id="imageInput" 
            type="file" 
            accept="image/*,image/avif"  
            onChange={handleImageChange} 
          />
        </label>

        <p>Or select one of our preset images </p>

        <div className="preset-images">
          {presetImages.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Preset ${index + 1}`}
              onClick={() => handlePresetImageClick(image)}
              className="preset-thumbnail"
            />
          ))}
        </div>


      </div>

      </DiceFall>

      <div id = 'generatorContainer'> 
      
      {controlsDisplayed && (

      <div>
        <GeneratorControls 
          radio={radio} 
          setRadio={setRadio}
          brightness={brightness} 
          setBrightness={setBrightness} 
          trim={trim} 
          setTrim={setTrim}
          setDiceX={setDiceX} 
          setDiceY={setDiceY}
          selectedImage={selectedImage}
          handleIncreaseSize={handleIncreaseSize}
          handleDecreaseSize={handleDecreaseSize}
          diceX={diceX} 
          diceY={diceY} 
        />

      </div>

      )}

      <ImageUploader 
      diceX={diceX} 
      diceY={diceY} 
      selectedImage={selectedImage} 
      radio={radio} 
      trim={trim}
      brightness={brightness}
      handleDiceSizeChange={handleDiceSizeChange}
      diceSize={diceSize}
      />





      </div>

      {/* <MosaicShop />  */}



      {/* <Process /> */}
      {/* <BlogComponent /> */}

      <MosaicExamples />

        {/* <div id = 'aboutBackground'>
          <About />  
        </div>
       */}
        <div  id = 'donationDiv'>
          <div data-aos='fade-up' data-aos-offset="100" data-aos-duration = '1500'>
          <p id="support-message" > If you found this tool helpful please consider supporting the developer, it is greatly appreciated! <a href='https://buymeacoffee.com/sethlangendoen' target='_blank' rel='noopener noreferrer'>Buy me a coffee</a></p>
          <p id = 'contact' >For business enquiries, questions, or concerns email us at <a href="mailto:dicemosaicgenerator@gmail.com" target = '_blank' rel='noopener noreferrer'>dicemosaicgenerator@gmail.com</a></p>
          </div>


          {/* <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@dicemosaicgenerator.com" data-unique-id="dicemosaicgenerator.com" data-embed-type="creator" style={{maxWidth: "780px", minWidth: "288px"}} > <section> <a target="_blank" href="https://www.tiktok.com/@dicemosaicgenerator.com?refer=creator_embed">@dicemosaicgenerator.com</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script> */}
        
        
        </div>




    </div>
  );
}
