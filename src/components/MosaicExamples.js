import React, { useState } from 'react';

export default function MosaicExamples() {
  // Define an array of mosaic objects with image paths and alt text
  const mosaics = [
    { src: require('../Assets/MosaicExamples/wolf.png'), alt: 'Wolf Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/kobe.png'), alt: 'Kobe Bryant Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/eye.png'), alt: 'Eye Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/bikini.png'), alt: 'Bikini Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/shmoo.png'), alt: 'Shmoo Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/jackpot.png'), alt: 'Jackpot Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/monopoly.png'), alt: 'Monopoly Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/keanuReeves.png'), alt: 'Keanu Reeves Dice Mosaic' },
    { src: require('../Assets/MosaicExamples/mrBeast.png'), alt: 'Mr. Beast Dice Mosaic' },
  ];

  // State to control the modal
  const [selectedMosaic, setSelectedMosaic] = useState(null);

  // Function to handle image click
  const handleImageClick = (mosaic) => {
    setSelectedMosaic(mosaic);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setSelectedMosaic(null);
  };

  return (
    <div style={styles.outerContainer}>
      <h1 style={styles.title}>Featured Mosaics</h1>

      <div style={styles.container}>
        {mosaics.map((mosaic, index) => (
          <img
            key={index}
            src={mosaic.src}
            alt={mosaic.alt} // Use the alt text from the object
            style={styles.image}
            onClick={() => handleImageClick(mosaic)}
          />
        ))}
      </div>

      {selectedMosaic && (
        <div style={styles.modal} onClick={handleCloseModal}>
          <div style={styles.modalContent}>
            <img src={selectedMosaic.src} alt={selectedMosaic.alt} style={styles.modalImage} />
          </div>
        </div>
      )}
    </div>
  );
}

// CSS styles in JavaScript object format
const styles = {
  outerContainer: {
    backgroundColor: 'white',
  },
  title: {
    marginTop: '10px',
    fontSize: '100px',
    fontFamily: "'Dancing Script', 'Brush Script MT', cursive", // Corrected font-family syntax
    color: 'black',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: 'white',
    padding: '20px',
  },
  image: {
    width: 'auto',
    height: 'auto',
    maxHeight: '300px',
    borderRadius: '8px',
    cursor: 'pointer', // Change cursor to pointer on hover
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s', // Add a smooth zoom effect on hover
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Darken the background
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, // Ensure the modal is on top
    cursor: 'pointer',
  },
  modalContent: {
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Add a more dramatic shadow
  },
  modalImage: {
    width: '50%',
    height: 'auto',
    borderRadius: '10px', // Match the modal's border radius
    transition: 'transform 0.3s', // Add a subtle zoom-in effect
  },
};
