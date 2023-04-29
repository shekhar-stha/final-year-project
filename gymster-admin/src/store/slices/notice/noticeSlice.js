import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNotice = async () => {
    try {
        const response = await axios.get('/notice/getNotice');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    notice: [],
    isLoading: false,
    error: null
}

export const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        fetchNoticeStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchNoticeSuccess(state, action) {
            state.notice = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchNoticeFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const getNotice = () => async (dispatch) => {
    try {
        dispatch(fetchNoticeStart());
        const notice = await fetchNotice();
        if (Array.isArray(notice)) {
            dispatch(fetchNoticeSuccess(notice));
          } else {
            dispatch(fetchNoticeFailure(notice));
          }
          
    } catch (error) {
        dispatch(fetchNoticeFailure(error));
    }
};


export const { fetchNoticeStart, fetchNoticeSuccess, fetchNoticeFailure } = noticeSlice.actions;

export default noticeSlice.reducer;