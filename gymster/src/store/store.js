import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/Slices/userSlice'
import membershipSlice from './Slices/membershipSlice'
import buyProductSlice from './Slices/buyProductSlice';
import paymentReportSlice from './Slices/paymentReportSlice';
import productSlice from './Slices/productSlice';
import shippingDetailsSlice from './Slices/shippingDetailsSlice';
import orderSlice from './Slices/orderSlice';
import searchProductSlice from './Slices/searchProductSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    membership: membershipSlice,
    product: productSlice,
    shippingDetail : shippingDetailsSlice,
    buyProduct: buyProductSlice,
    paymentReport: paymentReportSlice,
    order: orderSlice,
    searchedProducts: searchProductSlice
  }
})