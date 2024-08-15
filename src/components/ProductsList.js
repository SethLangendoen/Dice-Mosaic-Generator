import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from './queries/getProducts';
import { useCart } from './context/CartContext';
import './styling.css'; 

const ProductList = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const { addToCart } = useCart();
  
  // State to track quantities for each variant
  const [quantities, setQuantities] = useState({});

  // Ref to access the HTML container for image styling
  const htmlContainerRef = useRef(null);

  useEffect(() => {
    // Function to style images
    const styleImages = () => {
      const container = htmlContainerRef.current;
      if (container) {
        const images = container.querySelectorAll('img');
        images.forEach(img => {
          img.style.width = '200px';
          img.style.height = '200px';
          img.style.objectFit = 'cover'; // Optional: To ensure images fit within the specified dimensions
        });
      }
    };

    // Style images after the HTML content is rendered
    styleImages();
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure data is defined and has the expected structure
  if (!data || !data.products || !data.products.edges) {
    return <p>No products available.</p>;
  }

  // Handle quantity change for a variant
  const handleQuantityChange = (variantId, value) => {
    setQuantities({
      ...quantities,
      [variantId]: value
    });
  };

  const handleAddToCart = (product) => {
	product.variants.edges.forEach(({ node: variant }) => {
	  const quantity = quantities[variant.id] || 0;
	  if (quantity > 0) {
		for (let i = 0; i < quantity; i++) {
		  addToCart({ ...product, variant, quantity: 1 }); // Add one item at a time
		}
	  }
	});
  };
  


  return (
    <div>
      <h1 id='bringToLife'>Bring Your Mosaic To Life!</h1>
	  <p>Free shipping on orders over $100</p>

{/* 
      {data.products.edges.map(({ node }) => (
		<div>
			<p>{node.descriptionHtml}</p>
		</div>
	  ))} */}


      <div className="product-list">
        {data.products.edges.map(({ node: product }) => (
          <div key={product.id} className="product-item">
            <h3>{product.title}</h3>

            <div className="product-content">
              <div className="product-description" ref={htmlContainerRef}>
                <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
              </div>

              <div className="product-variants">
                {product.variants.edges.map(({ node: variant }) => (
                  <div key={variant.id} className="product-variant">
                    <p class= 'itemQuantityP'>{variant.title} - ${parseFloat(variant.priceV2.amount).toFixed(2)}</p>
                    <input
						class="itemQuantityInput"
                      	type="number"
                      	min="0"
                      	value={quantities[variant.id] || ''}
                      	onChange={(e) => handleQuantityChange(variant.id, parseInt(e.target.value, 10))}
                    />

                  </div>
                ))}
                <button class = 'addToCartButton' onClick={() => handleAddToCart(product)}>
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
