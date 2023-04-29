import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDiet = async () => {
    try {
        const response = await axios.get('/diet/getDiet');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    diet: [],
    isLoading: false,
    error: null
}

export const dietSlice = createSlice({
    name: 'diet',
    initialState,
    reducers: {
        fetchDietStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchDietSuccess(state, action) {
            state.diet = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchDietFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteDiet = (props) => async(dispatch) => {
    try {
       await axios.delete(`/diet/deleteDiet/${props.id}`);
        dispatch(fetchDietStart());
        const diet = await fetchDiet();
        dispatch(fetchDietSuccess(diet));
    } catch (error) {
        dispatch(fetchDietFailure(error));
    }
}

export const updateDiet = (props) => async(dispatch) => {
    try {
       await axios.patch(`/diet/updateDiet/${props.id}`);
        dispatch(fetchDietStart());
        const diet = await fetchDiet();
        dispatch(fetchDietSuccess(diet));
    } catch (error) {
        dispatch(fetchDietFailure(error));
    }
}

export const getDiet = () => async (dispatch) => {
    try {
        dispatch(fetchDietStart());
        const diet = await fetchDiet();
        if (Array.isArray(diet)) {
            dispatch(fetchDietSuccess(diet));
          } else {
            dispatch(fetchDietFailure(diet));
          }
    } catch (error) {
        dispatch(fetchDietFailure(error));
    }
};


export const { fetchDietStart, fetchDietSuccess, fetchDietFailure } = dietSlice.actions;

export default dietSlice.reducer;