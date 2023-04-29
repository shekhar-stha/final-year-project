import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSchedule = async () => {
    try {
        const response = await axios.get('/schedule/getSchedule');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    schedule: [],
    isLoading: false,
    error: null
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        fetchScheduleStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchScheduleSuccess(state, action) {
            state.schedule = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchScheduleFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteteSchedule = (props) => async(dispatch) => {
    try {
       await axios.delete(`/schedule/deleteSchedule/${props.id}`);
        dispatch(fetchScheduleStart());
        const schedule = await fetchSchedule();
        dispatch(fetchScheduleSuccess(schedule));
    } catch (error) {
        dispatch(fetchScheduleFailure(error));
    }
}

export const getSchedule = () => async (dispatch) => {
    try {
        dispatch(fetchScheduleStart());
        const schedule = await fetchSchedule();
        if (Array.isArray(schedule)) {
            dispatch(fetchScheduleSuccess(schedule));
          } else {
            dispatch(fetchScheduleFailure(schedule));
          }
          
    } catch (error) {
        dispatch(fetchScheduleFailure(error));
    }
};


export const { fetchScheduleStart, fetchScheduleSuccess, fetchScheduleFailure } = scheduleSlice.actions;

export default scheduleSlice.reducer;