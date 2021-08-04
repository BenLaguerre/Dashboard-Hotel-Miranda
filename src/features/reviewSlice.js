import { createSlice } from '@reduxjs/toolkit';
import reviewJSON from '../json/reviewJSON.json';


export const reviewSlice = createSlice ({
  name: 'reviewList',
  initialState: {
    newReviewList: reviewJSON.map ((data, index) =>
    ({
      key: data.id, 
      id: data.id, 
      index: index,
      date: data.date,
      firstName: data.first_name,
      lastName: data.last_name, 
      rating: data.rating, 
      comment: data.comment, 
    }))
  },
  
  reducers: {    
    deleteGuest: (state, id) => {      
      state.newGuestList = state.newGuestList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      
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
  
  
    decrement: state => {      
     state.value -= 1    
    }
  }
}
)
 
export const {  decrement, deleteGuest }  = reviewSlice.actions
 
export default reviewSlice.reducer
  
