import { createSlice } from '@reduxjs/toolkit';
import reviewJSON from '../json/reviewJSON.json';

const REVIEW_MULTIPLY = 10;
let reviewsMap = reviewJSON.map ((data, index) =>
  ({
    key: data.id, 
    id: data.id, 
    index: index,
    date: data.date,
    firstName: data.first_name,
    lastName: data.last_name, 
    rating: data.rating, 
    comment: data.comment
  }))

export const reviewSlice = createSlice ({
  name: 'reviewList',
  initialState: {
    reviewList : [],
  },
  
  reducers: {   

    fetchReviews: (state, page) => {
      state.reviewList = reviewsMap
        .slice((page.payload-1)*REVIEW_MULTIPLY , page.payload * REVIEW_MULTIPLY)
        .map((data,index) => 
          ({ 
            key: data.id, 
            id: data.id, 
            index: index,
            date: data.date,
            firstName: data.firstName,
            lastName: data.lastName, 
            rating: data.rating, 
            comment: data.comment 
          })
        )}, 

    deleteReviews: (state, id) => {      
      state.reviewList = state.reviewList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      
          ({ 
            key: item.key, 
            id: item.id, 
            index: index,
            firstName: item.firstName,
            lastName: item.lastName, 
            orderDate: item.orderDate, 
            checkIn: item.checkIn, 
            checkOut: item.checkOut, 
            roomType: item.roomType 
          })
          )},
  }
}
)
 
export const {  fetchReviews, deleteGuest }  = reviewSlice.actions
 
export default reviewSlice.reducer
  
