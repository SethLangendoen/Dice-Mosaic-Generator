// src/context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
	setCart((prevCart) => {
	  const existingItem = prevCart.find(item => item.variant.id === product.variant.id);
  
	  if (existingItem) {
		return prevCart.map(item =>
		  item.variant.id === product.variant.id
			? { ...item, quantity: item.quantity + 1 }
			: item
		);
	  } else {
		return [...prevCart, { ...product, quantity: 1 }];
	  }
	});
  };
  
  const removeFromCart = (itemId) => {
	setCart((prevCart) => {
	  const existingItem = prevCart.find(item => item.variant.id === itemId);
  
	  if (existingItem.quantity > 1) {
		return prevCart.map(item =>
		  item.variant.id === itemId
			? { ...item, quantity: item.quantity - 1 }
			: item
		);
	  } else {
		return prevCart.filter(item => item.variant.id !== itemId);
	  }
	});
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
