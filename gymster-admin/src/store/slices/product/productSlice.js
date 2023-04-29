import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = async (props) => {
    try {
        const response = await axios.get(`/product/getProductsAdmin?keyword=${props.keyword}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    products: [],
    isLoading: false,
    error: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchProductsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchProductsSuccess(state, action) {
            state.products = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchProductsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteProduct = (props) => async (dispatch) => {
    try {
        await axios.delete(`/product/deleteProduct/${props.id}`);
        dispatch(fetchProductsStart());
        const product = await fetchProducts();
        dispatch(fetchProductsSuccess(product));
    } catch (error) {
        dispatch(fetchProductsFailure(error));
    }
}

export const getProducts = (props) => async (dispatch) => {
    try {
        dispatch(fetchProductsStart());
        const products = await fetchProducts(props);
        if (Array.isArray(products)) {
            dispatch(fetchProductsSuccess(products));
          } else {
            dispatch(fetchProductsFailure(products));
          }
          
    } catch (error) {
        dispatch(fetchProductsFailure(error));
    }
};


export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productsSlice.actions;

export default productsSlice.reducer;