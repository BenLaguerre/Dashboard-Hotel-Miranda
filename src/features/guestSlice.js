import { createSlice } from '@reduxjs/toolkit';
import guestJSON from '../json/guestJSON.json';


export const guestSlice = createSlice ({
  name: 'guestList',
  initialState: {
    newGuestList: guestJSON.map ((data, index) =>
    ({
      key: data.id, 
      id: data.id, 
      index: index,
      firstName: data.first_name,
      lastName: data.last_name, 
      orderDate: data.order_date, 
      checkIn: data.check_in, 
      checkOut: data.check_out, 
      roomType: data.room_type 
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
 
export const {  decrement, deleteGuest }  = guestSlice.actions
 
export default guestSlice.reducer
  
