// src/queries/getProducts.js
import { gql } from '@apollo/client';

export const GET_PRODUCTS = gql`
  query {
    products(first: 10) {
      edges {
        node {
          id
          title
          descriptionHtml
          variants(first: 10) {
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

