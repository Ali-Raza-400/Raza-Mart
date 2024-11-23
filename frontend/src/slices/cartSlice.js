import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const newCartItem = action.payload;

      // Check if the item already exists in the cart
      const existingItem = state.cart.cartItems.find(
        (item) => item._id === newCartItem._id // Match by unique identifier
      );

      if (existingItem) {
        // Update quantity if the item already exists
        existingItem.quantity += 1;
      } else {
        // Add the new item with a default quantity of 1
        state.cart.cartItems.push({ ...newCartItem, quantity: 1 });
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeCartItem: (state, action) => {
      const productId = action.payload;

      const existingItem = state.cart.cartItems.find(
        (item) => item._id === productId
      );

      if (existingItem) {
        // Decrease quantity or remove if quantity is 1
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item) => item._id !== productId
          );
        }
      }

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    clearCart: (state) => {
      state.cart = {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "PayPal",
      };

      // Clear the cart from localStorage
      localStorage.removeItem("cart");
    },
    clearAProductFromCart: (state,action) => {
      const productId = action.payload;
      console.log("productId:::",productId);
      state.cart.cartItems = state.cart.cartItems.filter(
        (item) => item._id!== productId
      );
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const { setCartItem, removeCartItem, clearCart, clearAProductFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
