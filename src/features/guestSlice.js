import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';
import guestJSON from '../json/guestJSON.json';

const GUESTS_MULTIPLY = 10;

//Return the month and year of a date
function monthName(date){
  let newDate = new Date(date)
  return newDate.toLocaleString("en-EN", { year: "numeric" ,month: "long" })
}

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
    guestList: [],
    fullGuestList: []
  },
  
  reducers: {  
    fetchGuests: (state, action) => {
      state.guestList = guestsMap.filter(item => {
        if (action.payload.startDate){

          if (action.payload.filt === 1){
            return (new Date(item.checkIn) > action.payload.startDate) && (new Date(item.checkIn) < action.payload.endDate);
            
          } else if (action.payload.filt === 2) {
            return (new Date(item.checkOut) > action.payload.startDate)  && (new Date(item.checkOut) < action.payload.endDate);
          }
          
          return ((new Date(item.orderDate) > action.payload.startDate) && (new Date(item.orderDate) < action.payload.endDate)) ||
          ((new Date(item.checkIn) > action.payload.startDate) && (new Date(item.checkIn) < action.payload.endDate)) ||
          ((new Date(item.checkOut) > action.payload.startDate)  && (new Date(item.checkOut) < action.payload.endDate));
        }
        return true
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
    )},
    fetchAllGuests: (state, action) => {
      state.fullGuestList = guestsMap.filter(item => {
        if(action.payload){
          return monthName(item.checkIn)  === action.payload ||  monthName(item.checkOut)  === action.payload
        }
        return true;
      }
        
      ).map((item,index) => 
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
 
export const {  fetchGuests,  deleteGuest, fetchAllGuests }  = guestSlice.actions
 
export default guestSlice.reducer
  
