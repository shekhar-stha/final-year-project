import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchTrainers = async () => {
    try {
        const response = await axios.get('/trainer/getTrainer');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const initialState = {
    trainers: [],
    isLoading: false,
    error: null
}

export const gymTrainersSlice = createSlice({
    name: 'gymTrainers',
    initialState,
    reducers: {
        fetchTrainersStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        fetchTrainersSuccess(state, action) {
            state.trainers = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        fetchTrainersFailure(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export const deleteTrainer = (props) => async (dispatch) => {
    try {
        await axios.delete(`/trainer/deleteTrainer/${props.id}`);
        toast.success(`Successfully deleted ${props?.full_name}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        dispatch(fetchTrainersStart());
        const trainer = await fetchTrainers();
        dispatch(fetchTrainersSuccess(trainer));
    } catch (error) {
        console.log(error)
        toast.error(`Error ${error?.response?.data}`, {
            position: toast.POSITION.BOTTOM_RIGHT,
        })
        dispatch(fetchTrainersFailure(error));
    }
}

// export const deleteMembership = (props) => async (dispatch) => {
//     try {
//         await axios.delete(`/membership/deleteMembership/${props.id}`);
//         dispatch(fetchMembershipStart());
//         const membership = await fetchMembership();
//         dispatch(fetchMembershipSuccess(membership));
//     } catch (error) {
//         dispatch(fetchMembershipFailure(error));
//     }
// }

export const getTrainers = () => async (dispatch) => {
    try {
        dispatch(fetchTrainersStart());
        const trainers = await fetchTrainers();
        if (Array.isArray(trainers)) {
            dispatch(fetchTrainersSuccess(trainers));
        } else {
            dispatch(fetchTrainersFailure(trainers));
        }

    } catch (error) {
        dispatch(fetchTrainersFailure(error));
    }
};


export const { fetchTrainersStart, fetchTrainersSuccess, fetchTrainersFailure } = gymTrainersSlice.actions;

export default gymTrainersSlice.reducer;