import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/auth/userSlice'
import dietSlice from './slices/diet/dietSlice'
import gymMemberSlice from './slices/members/memberSlice'
import membershipSlice from './slices/membership/membershipSlice'
import noticeSlice from './slices/notice/noticeSlice'
import orderSlice from './slices/order/orderSlice'
import productsSlice from './slices/product/productSlice'
import scheduleSlice from './slices/schedule/scheduleSlice'
import  gymTrainersSlice  from './slices/trainer/trainerSlice'


export const store = configureStore({
  reducer: {
    user: userSlice,
    gymMember: gymMemberSlice,
    gymTrainer: gymTrainersSlice,
    membership: membershipSlice,
    notice: noticeSlice,
    diet: dietSlice,
    schedule: scheduleSlice,
    product: productsSlice,
    order: orderSlice
  },
})