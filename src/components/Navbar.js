import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import './styling.css'; // Ensure this file exists for the styles
import twoDiceLogoImage from '../Assets/twoDiceNavbar.png';

function Navbar() {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(window.pageYOffset);
  const location = useLocation(); // Get the current location

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

  useEffect(() => {
    // Scroll to the top when navigating to the home page
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false); // Close menu after click
  };

  // Determine the active link based on the current location
  const getActiveLink = () => {
    if (location.pathname === '/blog') return 'blog'; // Active if on the blog page
    if (location.pathname === '/') {
      const hash = location.hash.replace('#', ''); // Remove the '#' for ID matching
      return hash ? hash : 'generator'; // Return the hash or default to 'generator'
    }
    return 'generator'; // Default if no active link found
  };

  const activeLink = getActiveLink(); // Get the active link

  return (
    <nav className={`navbar ${show ? 'navbar-show' : 'navbar-hide'}`}>
      <div id="logoAndNameNavbar" onClick={() => handleLinkClick('lottie-container')}>
        <img src={twoDiceLogoImage} className="navbar-logo" alt="Logo" />
        <p>Dice Mosaic Generator</p>
      </div>
      <div className={`nav-links ${menuOpen ? 'nav-links-mobile' : ''}`}>
        <Link 
          to="/blog" 
          className={activeLink === 'blog' ? 'active' : ''} 
          onClick={() => handleLinkClick('blog')}
        >
          Blog
        </Link>

        <Link 
          to="/#title" 
          className={activeLink === 'title' ? 'active' : ''} 
          onClick={() => handleLinkClick('title')}
        >
          Generator
        </Link>

        <Link 
          to="/#bringToLife" 
          className={activeLink === 'shop' ? 'active' : ''} 
          onClick={() => handleLinkClick('bringToLife')}
        >
          Shop
        </Link>

        <Link 
          to="/#parent-how-to-container" 
          className={activeLink === 'about' ? 'active' : ''} 
          onClick={() => handleLinkClick('parent-how-to-container')}
        >
          Process
        </Link>

        <Link 
          to="/#ideaContainerFM" 
          className={activeLink === 'featuredMosaics' ? 'active' : ''} 
          onClick={() => handleLinkClick('ideaContainerFM')}
        >
          Featured Mosaics
        </Link>

        <Link 
          to="/#About" 
          className={activeLink === 'faq' ? 'active' : ''} 
          onClick={() => handleLinkClick('About')}
        >
          FAQ
        </Link>

        <Link 
          to="/#contact" 
          className={activeLink === 'contact' ? 'active' : ''} 
          onClick={() => handleLinkClick('contact')}
        >
          Contact
        </Link>
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
