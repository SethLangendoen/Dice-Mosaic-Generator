import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './styling.css';
import twoDiceLogoImage from '../Assets/twoDiceNavbar.png';

const NAV_LINKS = [
  { to: '/#parent-how-to-container', label: 'Process', id: 'parent-how-to-container' },
  { to: '/#ideaContainerFM', label: 'Featured Mosaics', id: 'ideaContainerFM' },
  { to: '/#About', label: 'FAQ', id: 'About' },
  { to: '/#contact', label: 'Contact', id: 'contact' },

];

function Navbar() {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lastScrollY = useRef(window.pageYOffset);
  const location = useLocation();

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
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

  const handleLinkClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const getActiveLink = () => {
    if (location.pathname === '/blog') return 'blog';
    if (location.pathname === '/') {
      const hash = location.hash.replace('#', '');
      return hash ? hash : 'generator';
    }
    return 'generator';
  };

  const activeLink = getActiveLink();

  return (
    <nav className={`navbar ${show ? 'navbar-show' : 'navbar-hide'}`}>
      <div id="logoAndNameNavbar" onClick={() => handleLinkClick('lottie-container')}>
        <img src={twoDiceLogoImage} className="navbar-logo" alt="Logo" />
        <p>Dice Mosaic Generator</p>
      </div>



      <div className={`nav-links ${menuOpen ? 'nav-links-mobile' : ''}`}>
        
        <div className="dropdown">
          <button className={`dropdown-toggle ${dropdownOpen ? 'active' : ''}`} onClick={handleDropdownToggle}>
            Home
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {NAV_LINKS.map(({ to, label, id }) => (
                <Link 
                  key={id} 
                  to={to} 
                  onClick={() => handleLinkClick(id)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link 
          to="/shop" 
          className={activeLink === 'shop' ? 'active' : ''} 
          onClick={() => handleLinkClick('shop')}
        >
          Shop
        </Link>


        <Link 
          to="/blog" 
          className={activeLink === 'blog' ? 'active' : ''} 
          onClick={() => handleLinkClick('blog')}
        >
          Blog
        </Link>

      </div>
      <div className="burger-menu" onClick={handleMenuToggle} aria-label="Toggle navigation menu">
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
    </nav>
  );
}

export default Navbar;
