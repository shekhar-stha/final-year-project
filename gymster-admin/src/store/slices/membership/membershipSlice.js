import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMembership = async () => {
    try {
        const response = await axios.get('/membership/getMembership');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    membership: [],
    isLoading: false,
    error: null
}

export const membershipSlice = createSlice({
    name: 'membership',
    initialState,
    reducers: {
        fetchMembershipStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchMembershipSuccess(state, action) {
            state.membership = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchMembershipFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteMembership = (props) => async(dispatch) => {
    try {
       await axios.delete(`/membership/deleteMembership/${props.id}`);
        dispatch(fetchMembershipStart());
        const membership = await fetchMembership();
        dispatch(fetchMembershipSuccess(membership));
    } catch (error) {
        dispatch(fetchMembershipFailure(error));
    }
}

export const getMembership = () => async (dispatch) => {
    try {
        dispatch(fetchMembershipStart());
        const membership = await fetchMembership();
        if (Array.isArray(membership)) {
            dispatch(fetchMembershipSuccess(membership));
          } else {
            dispatch(fetchMembershipFailure(membership));
          }
          
    } catch (error) {
        dispatch(fetchMembershipFailure(error));
    }
};


export const { fetchMembershipStart, fetchMembershipSuccess, fetchMembershipFailure } = membershipSlice.actions;

export default membershipSlice.reducer;