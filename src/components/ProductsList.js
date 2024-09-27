import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './queries/getProducts';
import { useCart } from './context/CartContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import './styling.css'; 

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { addToCart } = useCart();

  // State to track the selected variant and quantity
  const [selectedVariant, setSelectedVariant] = useState({});
  const [quantities, setQuantities] = useState({});

  // State for error messages
  const [errorMessages, setErrorMessages] = useState({});

  // Extract images from HTML and store them in a state
  const [images, setImages] = useState({});
  const [descriptions, setDescriptions] = useState({});

  useEffect(() => {
    if (data && data.products && data.products.edges) {
      const newImages = {};
      const newDescriptions = {};
      
      data.products.edges.forEach(({ node: product }) => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = product.descriptionHtml;

        // Extract images
        const imgs = tempDiv.getElementsByTagName('img');
        newImages[product.id] = Array.from(imgs).map(img => img.src);

        // Remove the image tags from the HTML
        Array.from(imgs).forEach(img => img.parentNode.removeChild(img));
        
        // Store the cleaned HTML
        newDescriptions[product.id] = tempDiv.innerHTML;
      });

      setImages(newImages);
      setDescriptions(newDescriptions);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data || !data.products || !data.products.edges) {
    return <p>No products available.</p>;
  }

  const handleVariantChange = (productId, variantId) => {
    setSelectedVariant({
      ...selectedVariant,
      [productId]: variantId
    });

    // Clear error message when a variant is selected
    setErrorMessages(prevMessages => ({
      ...prevMessages,
      [productId]: prevMessages[productId] ? '' : ''
    }));
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities({
      ...quantities,
      [productId]: value
    });

    // Clear error message when a quantity is entered
    setErrorMessages(prevMessages => ({
      ...prevMessages,
      [productId]: prevMessages[productId] ? '' : ''
    }));
  };

  const handleAddToCart = (product) => {
    const variantId = selectedVariant[product.id];
    const quantity = quantities[product.id] || 0;

    if (!variantId) {
      setErrorMessages(prevMessages => ({
        ...prevMessages,
        [product.id]: 'Please select a variant.'
      }));
      return;
    }

    if (quantity <= 0) {
      setErrorMessages(prevMessages => ({
        ...prevMessages,
        [product.id]: 'Please enter a quantity greater than 0.'
      }));
      return;
    }

    const variant = product.variants.edges.find(({ node }) => node.id === variantId).node;
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, variant, quantity: 1 }); // Add one item at a time
    }
    // Clear error message upon successful addition
    setErrorMessages(prevMessages => ({
      ...prevMessages,
      [product.id]: ''
    }));
  };

  return (
    <div>
      <h1 id='bringToLife'>Bring Your Mosaic To Life!</h1>
      <p>Free shipping on orders over $100</p>

      <div className="product-list">
        {data.products.edges.map(({ node: product }) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>

            <div className="product-content">
              <div className="product-carousel">
                {images[product.id] && images[product.id].length > 0 ? (
                  <Carousel showThumbs={false} infiniteLoop useKeyboardArrows>
                    {images[product.id].map((src, index) => (
                      <div key={index}>
                        <img className='productImages' src={src} alt={`Product ${index + 1}`} />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <p>No images available</p>
                )}
              </div>

              <div className="product-description">
                <div dangerouslySetInnerHTML={{ __html: descriptions[product.id] }} />
              </div>

              <div className="product-variants">
                {errorMessages[product.id] && (
                  <p className="error-message">{errorMessages[product.id]}</p>
                )}
                <select
                  value={selectedVariant[product.id] || ''}
                  onChange={(e) => handleVariantChange(product.id, e.target.value)}
                  className="variant-select"
                >
                  <option value="" disabled>Select an option</option>
                  {product.variants.edges.map(({ node: variant }) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.title} - ${parseFloat(variant.priceV2.amount).toFixed(2)}
                    </option>
                  ))}
                </select>
                <input
                  className="itemQuantityInput"
                  placeholder='select quantity'
                  type="number"
                  min="0"
                  value={quantities[product.id] || ''}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                />
                <button className='addToCartButton' onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
