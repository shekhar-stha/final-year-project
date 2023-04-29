import { createSlice } from "@reduxjs/toolkit";

const buyProductSlice = createSlice({
  name: "buyProduct",
  initialState: {
    buyProduct: null,
    quantity: 1,
    membership: null
  },
  reducers: {
    selectProduct: (state, action) => {
      localStorage.setItem("product", JSON.stringify(action.payload))
      state.buyProduct = action.payload;
    },
    updateQuantity: (state, action) => {
      localStorage.setItem("quantity", (action.payload))
      state.quantity = action.payload;
    },
    selectMembership: (state,action) => {
      state.membership = action.payload
    }
  },
});

export const { selectProduct, updateQuantity, selectMembership } = buyProductSlice.actions;

export default buyProductSlice.reducer;
