import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchShippingDetails = async () => {
    try {
        const response = await axios.get(`/shippingdetails/getShippingDetailsWithUser`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    shippingDetails: [],
    isLoading: false,
    error: null
}

export const shippingDetailsSlice = createSlice({
    name: 'shippingDetails',
    initialState,
    reducers: {
        fetchShippingDetailsStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchShippingDetailsSuccess(state, action) {
            state.shippingDetails = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchShippingDetailsFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const getShippingDetails = () => async (dispatch) => {
    try {
        dispatch(fetchShippingDetailsStart());
        const shippingDetails = await fetchShippingDetails();
        dispatch(fetchShippingDetailsSuccess(shippingDetails));
    } catch (error) {
        dispatch(fetchShippingDetailsFailure(error));
    }
};


export const { fetchShippingDetailsStart, fetchShippingDetailsSuccess, fetchShippingDetailsFailure } = shippingDetailsSlice.actions;

export default shippingDetailsSlice.reducer;