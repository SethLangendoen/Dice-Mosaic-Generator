import React, { useState, useRef } from 'react';
import { useCart } from './context/CartContext';
import { createCart } from './utils/CreateCheckout';
import './styling.css'; // Make sure the updated CSS is referenced here
import shoppingCartLogo from '../Assets/shopping-cart.png';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const cartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState('Canada');

  const handleCheckout = async () => {
    const lineItems = cart.map(item => ({
      merchandiseId: item.variant.id,
      quantity: item.quantity || 1,
    }));

    const checkoutUrl = await createCart(lineItems);

    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.variant.priceV2.amount * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const scrollToCart = (e) => {
    e.preventDefault();
    if (cartRef.current) {
      const topPosition = cartRef.current.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPosition - window.innerHeight + cartRef.current.offsetHeight + 30,
        behavior: 'smooth'
      });
    }
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const renderShippingTable = () => {
    return (
      <table className="shipping-table">
        <thead>
          <tr>
            <th>Rate Name</th>
            <th>Condition</th>
            <th>Transit Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {selectedCountry === 'Canada' ? (
            <>
              <tr>
                <td>Express</td>
                <td>0kg–2kg</td>
                <td>1 to 2 business days</td>
                <td>$21.90 CAD</td>
              </tr>
              <tr>
                <td>Standard</td>
                <td>$100.00 and up</td>
                <td>3 to 9 business days</td>
                <td>Free</td>
              </tr>
              <tr>
                <td>Standard</td>
                <td>0kg–2kg</td>
                <td>3 to 9 business days</td>
                <td>$14.90 CAD</td>
              </tr>
              <tr>
                <td>Standard</td>
                <td>2kg–30kg</td>
                <td>3 to 9 business days</td>
                <td>$21.90 CAD</td>
              </tr>
            </>
          ) : (
            <>
				<tr>
				<td>Express International</td>
				<td>0kg–1.5kg</td>
				<td>2 to 3 business days</td>
				<td>$34.90 CAD</td>
				</tr>
				<tr>
				<td>Standard International</td>
				<td>$100.00 and up</td>
				<td>4 to 8 business days</td>
				<td>Free</td>
				</tr>
				<tr>
				<td>Standard International</td>
				<td>0kg–0.5kg</td>
				<td>4 to 8 business days</td>
				<td>$7.90 CAD</td>
				</tr>
				<tr>
				<td>Standard International</td>
				<td>0.5kg–1.5kg</td>
				<td>4 to 8 business days</td>
				<td>$19.90 CAD</td>
				</tr>
				<tr>
				<td>Standard International</td>
				<td>1.5kg–30kg</td>
				<td>4 to 8 business days</td>
				<td>$29.90 CAD</td>
				</tr>
			</>

          )}
        </tbody>
      </table>
    );
  };

  return (
    <div className="cart-container" id="cart-section" ref={cartRef}>
      <h2>Cart</h2>
      <ul className="cart-items">
        {cart.map(item => (
          <li key={item.variant.id} className="cart-item">
            <span>{item.variant.title}</span>
            <span>Price CAD: ${(item.variant.priceV2.amount * item.quantity).toFixed(2)}</span>
            <span>Quantity: {item.quantity}</span>
            <button onClick={() => removeFromCart(item.variant.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div className="cart-summary">
        <h3>Total Price: CAD ${totalPrice.toFixed(2)}</h3>
        {cart.length > 0 && (
          <button className="checkout-button" onClick={handleCheckout}>Checkout</button>
        )}
      </div>

      <div className="shipping-section">
        <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
          <option value="Canada">Canada</option>
          <option value="US">US</option>
        </select>
      </div>

	  <p className="shipping-description">Shipping times vary based on Location. Shipping options can be selected during checkout. 
		Note that trasnit time is the estimated number of days it takes for a shipment to reach the customer after the order has been fulfilled and shipped.</p>

      {renderShippingTable()}

      {totalItems > 0 && (
        <a href="#cart-section" className="cart-icon" onClick={scrollToCart}>
          <img className="shopping-cart-icon" src={shoppingCartLogo} alt="Shopping Cart" />
          <span className="item-count">{totalItems}</span>
        </a>
      )}
    </div>
  );
};

export default Cart;
