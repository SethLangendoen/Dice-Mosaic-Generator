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

  const getRandomXPosition = (containerWidth) => Math.random() * (containerWidth - 50);
  const getRandomSize = () => Math.random() * (3 - 1) + 1;
  const getRandomSpeed = () => Math.random() * (5 - 3) + 3;

  const addRandomDie = useCallback((containerWidth) => {
    const randomDice = diceImages[Math.floor(Math.random() * diceImages.length)];
    const newDie = {
      id: Date.now(),
      src: randomDice,
      xPos: getRandomXPosition(containerWidth),
      opacity: 1,
      size: getRandomSize(),
      speed: getRandomSpeed(),
    };
    setDice((prevDice) => [...prevDice, newDie]);

    // Remove the die after 10 seconds
    setTimeout(() => {
      setDice((prevDice) => prevDice.filter((die) => die.id !== newDie.id));
    }, 10000); // 10 seconds timeout for removal
  }, []);

  useEffect(() => {
    const container = document.getElementById('diceFall');
    const containerWidth = container.clientWidth;

    const interval = setInterval(() => {
      addRandomDie(containerWidth);
    }, 800);

    return () => clearInterval(interval);
  }, [addRandomDie]);

  return (
    <div
      id="diceFall"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        top: -100,
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
            width: `${die.size}rem`,
            height: 'auto',
            opacity: die.opacity,
            animation: `fall ${die.speed}s ease-in forwards`,
            zIndex: 1,
            top: `0px`,
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
