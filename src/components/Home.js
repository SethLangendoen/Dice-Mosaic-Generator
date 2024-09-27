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
      <h1 className = 'slogan' data-aos="zoom-out" data-aos-duration = '2000'>"Transform ordinary dice into extraordinary, personalized art pieces!"
</h1>

      {/* <h1 className = 'intro' data-aos="zoom-in" data-aos-duration="400"  data-aos-anchor-placement="center-center">Create something unique</h1>
      <h1 className = 'intro' data-aos="zoom-in" data-aos-duration="400" data-aos-anchor-placement="center-center">impress your friends</h1>
      <h1 className = 'intro' data-aos="zoom-in" data-aos-duration="400" data-aos-anchor-placement="center-center">Elevate your room</h1>
      <h1 className = 'intro' data-aos="zoom-in" data-aos-duration="400" data-aos-offset="200" data-aos-anchor-placement="center-center">Let's get creative</h1> */}






      {/* <p id = 'homeParagraph'>

      Make art that is unique, impressive and eye-catching.<strong> Make a Dice Mosaic. </strong>
      Impress your friends, decorate your walls, and keep you occupied. Dice Mosaics are the puzzles of the future. We 
      have streamlined the build process, it's deceptively simple. 

    
      </p> */}

    </div>
  );
}

export default HomeText;
