import React from 'react';
import './styling.css';

const images = [
  { src: require('../Assets/MosaicExamples/wolf.png'), title: 'Wolf' },
  { src: require('../Assets/MosaicExamples/kobe.png'), title: 'Kobe' },
  { src: require('../Assets/MosaicExamples/eye.png'), title: 'Eye' },
  { src: require('../Assets/MosaicExamples/bikini.png'), title: 'Woman' },
  { src: require('../Assets/MosaicExamples/jackpot.png'), title: 'Jackpot' },
  { src: require('../Assets/MosaicExamples/monopoly.png'), title: 'Monopoly' },
  { src: require('../Assets/MosaicExamples/mrBeast.png'), title: 'Mr. Beast' },
  // Add more images as needed
];

const cars = [
  { src: require('../Assets/MosaicExamples/car1.png'), title: 'classic car' },
  { src: require('../Assets/MosaicExamples/yinYang.png'), title: 'yin Yang ' },
  { src: require('../Assets/MosaicExamples/car2.png'), title: 'classic car' },
  { src: require('../Assets/MosaicExamples/dice.png'), title: 'die made of dice' },
  { src: require('../Assets/MosaicExamples/tree.png'), title: 'tree made of dice' },
  { src: require('../Assets/MosaicExamples/anime.png'), title: 'anime made of dice' },

]

const ScrollWheel = () => {
  return (
    <div id='ideaContainerFM'>
      <h1 id='carouselTitle'>Featured Mosaics</h1>
      
      {/* First scrolling belt (left) */}
      <div id='scrollWheelContainer'>
        <div className="scroll-wheel">

          {images.map((image, index) => (
            <div key={index} className="scroll-wheel-item-FM">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
          {/* Repeat images for seamless effect */}
          {images.map((image, index) => (
            <div key={`repeat-${index}`} className="scroll-wheel-item-FM">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
          
        </div>
      </div>


      {/* Third scrolling belt (upward) */}
      <div id='scrollWheelContainer'>
        <div className="scroll-wheel-2">
          {cars.map((image, index) => (
            <div key={index} className="scroll-wheel-item-FM">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
          {/* Repeat images for seamless effect */}
          {cars.map((image, index) => (
            <div key={`repeat-${index}`} className="scroll-wheel-item-FM">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollWheel;
