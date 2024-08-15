// src/components/ApolloClientProvider.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Replace with your Storefront API URL and Access Token
const client = new ApolloClient({
  uri: 'https://fcca51-41.myshopify.com/api/2024-07/graphql.json',
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
  },
  cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export { client }; // Named export for client
export default ApolloClientProvider; // Default export for ApolloClientProvider
