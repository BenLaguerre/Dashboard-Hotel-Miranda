import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';

const GUESTS_MULTIPLY = 10;

//Return the month and year of a date
function monthName(date){
  let newDate = new Date(date)
  return newDate.toLocaleString("en-EN", { year: "numeric" ,month: "long" })
}

export const fetchGuests = createAsyncThunk('roomList/fetchGuests', async () => {
  return await apiRequest('bookings','GET')
})

export const fetchGuestsOfMonth = createAsyncThunk('roomList/fetchGuestsOfMonth', async () => {
  return await apiRequest('bookings','GET')
})

export const guestSlice = createSlice ({
  name: 'guestList',
  initialState: {
    status: 'idle',
    guestList: [],
    oneGuest: [],
    guestMonth: [],
    error: null
  },
  
  /*reducers: {  
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
  },*/
  extraReducers(builder) {
    builder

      //fetchGuests
      .addCase(fetchGuests.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchGuests.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.guestList = action.payload.filter(item => {
          if (action.meta.arg.startDate){

            if (action.meta.arg.filt === 1){
              return (new Date(item.start_date) > action.meta.arg.startDate) && (new Date(item.start_date) < action.meta.arg.endDate);
              
            } else if (action.meta.arg.filt === 2) {
              return (new Date(item.exit_date) > action.meta.arg.startDate)  && (new Date(item.exit_date) < action.meta.arg.endDate);
            }
            
            return ((new Date(item.booking_date) > action.meta.arg.startDate) && (new Date(item.booking_date) < action.meta.arg.endDate)) ||
            ((new Date(item.start_date) > action.meta.arg.startDate) && (new Date(item.start_date) < action.meta.arg.endDate)) ||
            ((new Date(item.exit_date) > action.meta.arg.startDate)  && (new Date(item.exit_date) < action.meta.arg.endDate));
          }

          return true
        
        })
        .slice((action.meta.arg.page-1)*GUESTS_MULTIPLY , action.meta.arg.page * GUESTS_MULTIPLY).map((item,index) => 
        ({ 
          key: item.key, 
          id: item.id, 
          index: index,
          name: item.name,
          orderDate: item.booking_date, 
          checkIn: item.start_date, 
          checkOut: item.exit_date,
          message: item.message, 
          room: item.room_id
        }))
      })
      .addCase(fetchGuests.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })

      //FetchGuestOfMonth
      .addCase(fetchGuestsOfMonth.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchGuestsOfMonth.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.guestMonth = action.payload.filter(item => {
          return monthName(item.start_date)  === action.meta.arg ||  monthName(item.exit_date)  === action.meta.arg

        })
        .map((item,index) => 
        ({ 
          key: item.key, 
          id: item.id, 
          index: index,
          name: item.name,
          orderDate: item.booking_date, 
          checkIn: item.start_date, 
          checkOut: item.exit_date,
          message: item.message, 
          room: item.room_id
        }))
      })
      .addCase(fetchGuestsOfMonth.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
    }
}
)

export default guestSlice.reducer
  
