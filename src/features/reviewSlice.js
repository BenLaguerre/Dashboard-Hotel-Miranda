import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';

const REVIEW_MULTIPLY = 10;

export const fetchReviews = createAsyncThunk('reviewList/fetchReviews', async () => {
    return await apiRequest('reviews','GET')
})

export const reviewSlice = createSlice ({
  name: 'reviewList',
  initialState: {
    status: 'idle',
    totalReview : 0,
    reviewList : [],
    error: null
  },
  
    reducers: {  
    },

    extraReducers(builder) {
      builder

      //fetchReviews
      .addCase(fetchReviews.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded' 
        state.totalReview = action.payload.length 
        state.reviewList = action.payload.slice((action.meta.arg-1)*REVIEW_MULTIPLY , action.meta.arg * REVIEW_MULTIPLY)
          .map((data, index) =>
          ({
            key: data.id, 
            id: data.id, 
            index: index,
            date: data.date,
            name: data.name,
            comment: data.comment
          }))   
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
    } 
})
 
export const {  deleteGuest }  = reviewSlice.actions
 
export default reviewSlice.reducer
  
