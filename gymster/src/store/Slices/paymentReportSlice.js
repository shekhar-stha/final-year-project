import { createSlice } from "@reduxjs/toolkit";

const paymentReportSlice = createSlice({
    name: "paymentReport",
    initialState: {
        paymentStatus: ""
    },
    reducers:{
        paymentStatus: (state, action) =>{
            state.paymentStatus = action.payload
        }
    }
})

export const {paymentStatus} = paymentReportSlice.actions;
export default paymentReportSlice.reducer;