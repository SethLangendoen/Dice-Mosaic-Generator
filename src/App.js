import './App.css';
import DiceArtHomepage from './components/DiceArtHomepage';
import './components/styling.css'
import ApolloClientProvider from './components/ApolloClientProvider';
import { CartProvider } from './components/context/CartContext' // Import CartProvider

function App() {

  return (
    <ApolloClientProvider >
      <CartProvider>
      <div className="App">
        <DiceArtHomepage /> 
      </div>
      </CartProvider>
    </ApolloClientProvider>
  );
}

export default App;
