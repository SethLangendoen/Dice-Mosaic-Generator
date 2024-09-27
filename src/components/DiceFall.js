import React, { useState, useEffect, useCallback } from 'react';
import die1 from '../Assets/NewDice/BlackDice/1.png';
import die2 from '../Assets/NewDice/BlackDice/2.png';
import die3 from '../Assets/NewDice/BlackDice/3.png';
import die4 from '../Assets/NewDice/BlackDice/4.png';
import die5 from '../Assets/NewDice/BlackDice/5.png';
import die6 from '../Assets/NewDice/BlackDice/6.png';
import dieW1 from '../Assets/NewDice/WhiteDice/2.png';
import dieW2 from '../Assets/NewDice/WhiteDice/3.png';
import dieW3 from '../Assets/NewDice/WhiteDice/4.png';
import dieW4 from '../Assets/NewDice/WhiteDice/5.png';
import dieW5 from '../Assets/NewDice/WhiteDice/6.png';
import dieW6 from '../Assets/NewDice/WhiteDice/7.png';

import './styling.css'; // For custom CSS animations

const diceImages = [die1, die2, die3, die4, die5, die6, dieW1, dieW2, dieW3, dieW4, dieW5, dieW6];

const DiceFall = ({ children }) => {
  const [dice, setDice] = useState([]);

  // Function to generate a random x position
  const getRandomXPosition = (containerWidth) => {
    const randomPosition = Math.random() * (containerWidth - 50); // Adjust based on dice width (50px as an example)
    return randomPosition;
  };

  // Function to generate a random size for the dice
  const getRandomSize = () => {
    return Math.random() * (3 - 1) + 1; // Random size between 1% to 3%
  };

  // Function to generate a random falling speed
  const getRandomSpeed = () => {
    return Math.random() * (5 - 3) + 3; // Random speed between 2s to 4s
  };

  // Function to add a new die at a random position with random size and speed
  const addRandomDie = useCallback((containerWidth) => {
    const randomDice = diceImages[Math.floor(Math.random() * diceImages.length)];
    const newDie = {
      id: Date.now(),
      src: randomDice,
      xPos: getRandomXPosition(containerWidth),
      opacity: 1, // Set initial opacity
      size: getRandomSize(), // Set random size
      speed: getRandomSpeed() // Set random speed
    };
    setDice((prevDice) => [...prevDice, newDie]);
  }, []); // No dependencies since it doesn’t rely on any external state

  useEffect(() => {
    const container = document.getElementById('diceFall');
    const containerWidth = container.clientWidth; // Get the width of the container

    // Add a new die every 800 milliseconds
    const interval = setInterval(() => {
      addRandomDie(containerWidth);
    }, 800); // Change this interval as needed

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, [addRandomDie]); // Add addRandomDie to the dependency array

  useEffect(() => {
    // Fade out and remove dice after 2 seconds
    const fadeOutDice = () => {
      setDice((prevDice) => 
        prevDice.map((die) => ({ ...die, opacity: 0 }))
      );
    };

    const timer = setTimeout(() => {
      fadeOutDice();
    }, 2000); // Fade out after 2 seconds

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, [dice]);

  return (
    <div
      id="diceFall"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      {dice.map((die) => (
        <img
          key={die.id}
          src={die.src}
          alt="Falling dice"
          className="falling-dice"
          style={{
            left: `${die.xPos}px`,
            position: 'absolute',
            width: `${die.size}rem`, // Set width based on random size
            height: 'auto',
            opacity: die.opacity, // Set opacity for fade effect
            animation: `fall ${die.speed}s ease-in forwards`, // Use random speed for animation
            zIndex: 1,
            top: `0px`, // Start from the top
          }}
        />
      ))}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default DiceFall;
