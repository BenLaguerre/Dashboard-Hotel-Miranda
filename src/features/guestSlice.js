import { createSlice } from '@reduxjs/toolkit';
import guestJSON from '../json/guestJSON.json';

const GUESTS_MULTIPLY = 10;

let guestsMap = guestJSON.map ((item, index) =>
  ({
    key: item.id, 
    id: item.id, 
    index: index,
    name: item.name,
    orderDate: item.booking_date, 
    checkIn: item.start_date, 
    checkOut: item.exit_date, 
    message: item.message,
    room: item.room_id 
  }))

export const guestSlice = createSlice ({
  name: 'guestList',
  initialState: {
    guestList: []
  },
  
  reducers: {  
    fetchGuests: (state, action) => {
      state.guestList = guestsMap.filter(item => {
        if (action.payload.filt === 1){
          //convert the date to milisecond to compare it with the payload.date that is also in milisecond
          return new Date(item.checkIn).getTime() < action.payload.date;

        } else if (action.payload.filt === 2) {
          return new Date(item.checkOut).getTime() < action.payload.date;;
        }
        
        return true;
      
      }).slice((action.payload.page-1)*GUESTS_MULTIPLY , action.payload.page * GUESTS_MULTIPLY).map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        name: item.name,
        orderDate: item.orderDate, 
        checkIn: item.checkIn, 
        checkOut: item.checkOut, 
        room: item.room
      })
    )}, 

    deleteGuest: (state, id) => {      
      state.guestList = state.guestList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        name: item.name,
        orderDate: item.orderDate, 
        checkIn: item.checkIn, 
        checkOut: item.checkOut, 
        room: item.room
      })
    )}
  }
}
)
 
export const {  fetchGuests,  deleteGuest }  = guestSlice.actions
 
export default guestSlice.reducer
  
