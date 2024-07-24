import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './styling.css'; // Ensure your styling is imported

const HomeText = () => {
  useEffect(() => {
    AOS.init(); // Initialize AOS
  }, []);

  return (
    <div id="homePageText">
      <h1 data-aos="zoom-out" data-aos-duration = '2000'>Dice mosaics just got easier</h1>

    </div>
  );
}

export default HomeText;
