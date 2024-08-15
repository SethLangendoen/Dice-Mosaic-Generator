import { gql } from '@apollo/client';
import { client } from '../ApolloClientProvider';

const CREATE_CART = gql`
  mutation createCart($lineItems: [CartLineInput!]!) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        id
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const createCart = async (lineItems) => {
  const { data } = await client.mutate({
    mutation: CREATE_CART,
    variables: { lineItems },
  });

  if (data.cartCreate.cart) {
    return data.cartCreate.cart.checkoutUrl; // Return the checkout URL
  } else {
    console.error(data.cartCreate.userErrors);
  }
};
