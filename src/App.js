import './App.css';
import DiceArtHomepage from './components/DiceArtHomepage';
import './components/styling.css';
import ApolloClientProvider from './components/ApolloClientProvider';
import { CartProvider } from './components/context/CartContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogComponent from './components/blog/blogComponent';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MosaicShop from './components/MosaicShop';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Ensure the document head exists and then load the Google Analytics script
    const loadGoogleAnalytics = () => {
      if (typeof document !== 'undefined' && document.head) {
        // Create the script element
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-B3MKBFTVXS';

        // Add the script to the document head
        document.head.appendChild(script);

        // Initialize Google Analytics
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'G-B3MKBFTVXS');
      }
    };

    // Call the function to load Google Analytics
    loadGoogleAnalytics();
  }, []); // Empty array ensures this effect runs only once

  return (
    <div className="App">
        <title>Dice Art Generator</title>

      <Router>
        <Navbar />
        <ApolloClientProvider>
          <CartProvider>
            <Routes>
              <Route path="/" element={<DiceArtHomepage />} />
              <Route path="/blog" element={<BlogComponent />} />
              <Route path="/shop" element={<MosaicShop />} />
            </Routes>
          </CartProvider>
        </ApolloClientProvider>
      </Router>
    </div>
  );
}

export default App;
