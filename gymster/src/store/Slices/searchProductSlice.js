import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    searchedProduct: "",
}

export const searchedProductsSlice = createSlice({
    name: 'searchedProduct',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchedProduct = action.payload;
        },
    }
})



export const { setSearchTerm  } = searchedProductsSlice.actions;

export default searchedProductsSlice.reducer;