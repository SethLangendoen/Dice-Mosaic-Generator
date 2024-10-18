// src/queries/getProducts.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products(first: 20) {
      edges {
        node {
          id
          title
          descriptionHtml
          variants(first: 15) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                }
              }
            }
          }
        }
      }
    }
  }
`;

