import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload; // Get the new item from the action payload
      const costAsNumber = parseFloat(newItem.cost.replace("$", ""));
      const existingItem = state.items.find(item => item.name === newItem.name); // Check if the item already exists in the cart

      if (existingItem) {
        existingItem.quantity += newItem.quantity; // If it exists, increase the quantity
      } else {
        const itemToAdd = {
          ...newItem,
          cost: costAsNumber, // Store the cost as a number
          quantity: 1, // Start with a quantity of 1
        };
        state.items.push(itemToAdd);
      }
    },
    removeItem: (state, action) => {
      const itemName = action.payload.name;
      state.items = state.items.filter((item) => item.name !== itemName);
    },
    updateQuantity: (state, action) => {
      const {name,quantity} = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity; // Update the quantity of the item
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
