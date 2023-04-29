import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = async () => {
    try {
        const response = await axios.get('/order/getUserOrder');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    order: [],
    isLoading: false,
    error: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        fetchOrderStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchOrderSuccess(state, action) {
            state.order = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchOrderFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const getOrders = () => async (dispatch) => {
    try {
        dispatch(fetchOrderStart());
        const order = await fetchOrders();
        dispatch(fetchOrderSuccess(order));
    } catch (error) {
        dispatch(fetchOrderFailure(error));
    }
};


export const { fetchOrderStart, fetchOrderSuccess, fetchOrderFailure } = orderSlice.actions;

export default orderSlice.reducer;