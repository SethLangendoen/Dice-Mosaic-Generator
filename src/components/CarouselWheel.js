// ScrollWheel.js
import React from 'react';
import Slider from 'react-slick';
import './styling.css'; // Ensure this path is correct

const images = [
  { src: require('../Assets/Carousel/pandaMug.png'), title: 'Mugs', link: `https://amzn.to/4bX5eo9` },
  { src: require('../Assets/Carousel/oldManCanvas.png'), title: `Canvas's`, link: `https://amzn.to/3WFHwaD` },
  { src: require('../Assets/Carousel/yahtzeePoster.png'), title: 'Posters', link: `https://amzn.to/3WB8Rfc`},
  { src: require('../Assets/Carousel/diceShirt.png'), title: 'Shirts', link: `https://amzn.to/3LD2u4u` },
  { src: require('../Assets/Carousel/pandaHat.png'), title: 'Hats', link: `https://amzn.to/4cY4kZQ` },
  // Add more images as needed
];

const ScrollWheel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Default number of slides shown
    slidesToScroll: 1,
    arrows: true, // Optional: Show arrows for navigation
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile devices
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div id='scrollWheelContainer'>
      <div className="scroll-wheel">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="scroll-wheel-item">
              <h3><a href={image.link} target="_blank" rel="noreferrer">{image.title}</a></h3>
              <img src={image.src} alt={image.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ScrollWheel;
