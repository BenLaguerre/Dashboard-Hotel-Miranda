import { configureStore } from '@reduxjs/toolkit';
import guestListReducer from '../features/guestSlice';
import roomListReducer from '../features/roomSlice';
import conciergeListReducer from '../features/conciergeSlice';
import reviewListReducer from '../features/reviewSlice';
import authReducer from '../features/authSlice';

export default configureStore({
  reducer: {
    guestList: guestListReducer,
    roomList: roomListReducer,
    conciergeList: conciergeListReducer,
    reviewList: reviewListReducer,
    auth : authReducer
  }
})