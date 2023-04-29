import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchMembers = async (props) => {
    try {
        const response = await axios.get(`/member/getMember?search=${props.search}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    members: [],
    isLoading: false,
    error: null
}

export const gymMemberSlice = createSlice({
    name: 'gymMembers',
    initialState,
    reducers: {
        fetchMembersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchMembersSuccess(state, action) {
            state.members = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchMembersFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteMember = (props) => async (dispatch) => {
    try {
        await axios.delete(`/member/deleteMember/${props.id}`);
        dispatch(fetchMembersStart());
        const member = await fetchMembers();
        dispatch(fetchMembersSuccess(member));
    } catch (error) {
        dispatch(fetchMembersFailure(error));
    }
}

export const getMembers = (props) => async (dispatch) => {
    try {
        dispatch(fetchMembersStart());
        const members = await fetchMembers(props);
        if (Array.isArray(members)) {
            dispatch(fetchMembersSuccess(members));
          } else {
            dispatch(fetchMembersFailure(members));
          }
    } catch (error) {
        dispatch(fetchMembersFailure(error));
    }
};


export const { fetchMembersStart, fetchMembersSuccess, fetchMembersFailure } = gymMemberSlice.actions;

export default gymMemberSlice.reducer;