import Slider from 'react-slick';
import './styling.css'

// // Main component that renders the 3D wheel
// export default function MosaicExamples() {
//   const mosaics = [
//     { src: '../Assets/MosaicExamples/wolf.png', alt: 'Wolf Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/kobe.png', alt: 'Kobe Bryant Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/eye.png', alt: 'Eye Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/bikini.png', alt: 'Bikini Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/shmoo.png', alt: 'Shmoo Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/jackpot.png', alt: 'Jackpot Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/monopoly.png', alt: 'Monopoly Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/keanuReeves.png', alt: 'Keanu Reeves Dice Mosaic' },
//     { src: '../Assets/MosaicExamples/mrBeast.png', alt: 'Mr. Beast Dice Mosaic' },
//   ];


const images = [
  { src: require('../Assets/MosaicExamples/wolf.png'), title: 'Wolf ' },
  { src: require('../Assets/MosaicExamples/kobe.png'), title: `Kobe ` },
  { src: require('../Assets/MosaicExamples/eye.png'), title: 'Eye '},
  { src: require('../Assets/MosaicExamples/bikini.png'), title: 'Woman' },
  { src: require('../Assets/MosaicExamples/jackpot.png'), title: 'Jackpot ' },
  { src: require('../Assets/MosaicExamples/monopoly.png'), title: 'Monopoly ' },
  { src: require('../Assets/MosaicExamples/mrBeast.png'), title: 'Mr.Beast ' },


  // Add more images as needed
];





const ScrollWheel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1, // Default number of slides shown
    slidesToScroll: 1,
    arrows: true, // Optional: Show arrows for navigation
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024, // For tablets
        settings: {
          slidesToShow: 1, // Show 2 slides on tablets
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
    <div id = 'ideaContainerFM'>
    <h1 id = 'carouselTitle'>Featured Mosaics</h1>
    <div id='scrollWheelContainer'>
      <div className="scroll-wheel">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="scroll-wheel-item-FM">
              <img src={image.src} alt={image.title} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
    </div>
  );
};

export default ScrollWheel;
