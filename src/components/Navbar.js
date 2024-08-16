import React, { useState, useEffect, useRef, useCallback } from 'react';
import './styling.css'; // Ensure this file exists for the styles
import twoDiceLogoImage from '../Assets/twoDiceNavbar.png';

function Navbar() {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('generator');
  const lastScrollY = useRef(window.pageYOffset);

  const controlNavbar = useCallback(() => {
    if (window.pageYOffset > lastScrollY.current) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastScrollY.current = window.pageYOffset;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [controlNavbar]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (section) => {
    setActiveLink(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false); // Close menu after click
  };

  return (
    <nav className={`navbar ${show ? 'navbar-show' : 'navbar-hide'}`}>
      <div id="logoAndNameNavbar" href='lottie-container' onClick={() => handleLinkClick('lottie-container')}>
        <img src={twoDiceLogoImage} className="navbar-logo" alt="Logo" />
        <p>Dice Mosaic Generator</p>
      </div>
      <div className={`nav-links ${menuOpen ? 'nav-links-mobile' : ''}`}>
        <a 
          href="#title" 
          className={activeLink === 'generator' ? 'active' : ''} 
          onClick={() => handleLinkClick('generator')}
        >
          Generator
        </a>

        <a 
          href="#parent-how-to-container" // says about cuz this used to be an about section, but now it's a features section...
          className={activeLink === 'about' ? 'active' : ''} 
          onClick={() => handleLinkClick('parent-how-to-container')}
        >
          Learn the process
        </a>

        <a 
          href="#About" // says about cuz this used to be an about section, but now it's a features section...
          className={activeLink === 'about' ? 'active' : ''} 
          onClick={() => handleLinkClick('about')}
        >
          FAQ and Features
        </a>

        {/* <a 
          href="#shop" 
          className={activeLink === 'shop' ? 'active' : ''} 
          onClick={() => handleLinkClick('shop')}
        >
          Shop
        </a> */}

        <a 
          href="#contact" 
          className={activeLink === 'contact' ? 'active' : ''} 
          onClick={() => handleLinkClick('contact')}
        >
          Contact
        </a>
      </div>
      <div className="burger-menu" onClick={handleMenuToggle}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;
