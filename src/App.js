import './App.css';
import DiceArtHomepage from './components/DiceArtHomepage';
import './components/styling.css'
import ApolloClientProvider from './components/ApolloClientProvider';
import { CartProvider } from './components/context/CartContext' // Import CartProvider
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogComponent from './components/blog/blogComponent';


function App() {

  return (
    <div className="App">
    <Router>
    <Navbar />
    <ApolloClientProvider >
      <CartProvider>
        <Routes>
            <Route path="/" element={<DiceArtHomepage /> }/>
            <Route path="/blog" element={<BlogComponent />} />


        </Routes>
      </CartProvider>
    </ApolloClientProvider>
    </Router>
    </div>

  );
}

export default App;
