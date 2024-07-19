import React, { useState, useEffect } from 'react';
import './styling.css'; // Ensure this file exists for the styles
import twoDiceLogoImage from '../Assets/twoDiceNavbar.png'; 


function Navbar() {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('generator');
  let lastScrollY = window.pageYOffset;

  const controlNavbar = () => {
    if (window.pageYOffset > lastScrollY) {
      setShow(false);
    } else {
      setShow(true);
    }
    lastScrollY = window.pageYOffset;
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (section) => {
    setActiveLink(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Ensure smooth scrolling
    }
    setMenuOpen(false); // Close menu after click
  };
  

  return (
    <nav className={`navbar ${show ? 'navbar-show' : 'navbar-hide'}`}>
      <img src={twoDiceLogoImage} className="navbar-logo" alt="Logo" />
      <div className={`nav-links ${menuOpen ? 'nav-links-mobile' : ''}`}>
        <a 
          href="#generator" 
          className={activeLink === 'generator' ? 'active' : ''} 
          onClick={() => handleLinkClick('generator')}
        >
          Generator
        </a>
         <a 
          href="#shop" 
          className={activeLink === 'shop' ? 'active' : ''} 
          onClick={() => handleLinkClick('shop')}
        >
          Shop
        </a>
        <a 
          href="#About" 
          className={activeLink === 'about' ? 'active' : ''} 
          onClick={() => handleLinkClick('about')}
        >
          About
        </a> 
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
