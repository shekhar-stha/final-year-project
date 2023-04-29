import { createSlice } from '@reduxjs/toolkit'
const storedLoginDetails = localStorage.getItem('loginDetails');
const loginDetails = storedLoginDetails ? JSON.parse(storedLoginDetails) : null;

export const initialState = {
    isLoading: false,
    user: loginDetails,
    error: null
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.isLoading = true;
            state.user = null;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.error = null;
        },
        loginError: (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        },
        logout: (state) => {
            state.isLoading = false;
            state.user = null;
            state.error = null;
        }
    }
})

export const { loginStart, loginSuccess, loginError, logout } = userSlice.actions;
export default userSlice.reducer;