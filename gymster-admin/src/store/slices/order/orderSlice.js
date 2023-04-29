import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrder = async (props) => {
    try {
        const response = await axios.get(`/order/getOrders?id=${props.id}`);
        console.log('fetchOrder response:', response.data);
        return response.data;
    } catch (error) {
        console.log('fetchOrder error:', error);
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
        fetchOrderByDates(state, action) {
            state.order = action.payload;
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

export const getOrder = (props) => async (dispatch) => {
    try {
        dispatch(fetchOrderStart());
        const order = await fetchOrder(props);
        console.log('order:', order);
        if (Array.isArray(order)) {
            dispatch(fetchOrderSuccess(order));
        } else {
            dispatch(fetchOrderFailure(order));
        }

    } catch (error) {
        dispatch(fetchOrderFailure(error));
    }
};


export const { fetchOrderStart, fetchOrderSuccess, fetchOrderFailure,  fetchOrderByDates} = orderSlice.actions;

export default orderSlice.reducer;
