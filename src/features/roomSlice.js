import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roomJSON from '../json/roomJSON.json';
import {apiRequest} from './apiRequest';

const ROOMS_MULTIPLY = 10;

export const fetchRooms = createAsyncThunk('roomList/fetchRooms', async () => {
  return await apiRequest('rooms','GET')
})
    /*try {
    const response = await fetch('http://localhost:3001/rooms', {
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI5NzE5ODk5LCJleHAiOjE2MzIzMTE4OTl9.klo-XtcqmgNAWq7mDRXrnASKafMD-UANT37g0UX_0yg'
      }
    })  
    return await response.json();
  }catch (err) {
    console.log(err);
  }
})*/

/*let roomsMap = roomJSON.map ((data, index) =>
  ({
    key: data.id, 
    id: data.id, 
    index: index,
    roomName: data.room_name,
    bedType: data.bed_type, 
    facilities: data.facilities, 
    rates: data.rates, 
    btype: data.btype
  }))*/

export const roomSlice = createSlice ({
  name: 'roomList',
  initialState:  {
    status: 'idle',
    roomList : [],
    error: null
  }
  ,
  
  reducers: {/*    
    fetchRooms: (state, action) => {
      state.roomList = roomsMap.filter(item => {
        if (action.payload.filt === 1){
          return item.btype === 'Booked';

        } else if (action.payload.filt === 2) {
          return item.btype === 'Available';
        }
        
        return true;
      
      }).slice((action.payload.page-1)*ROOMS_MULTIPLY , action.payload.page * ROOMS_MULTIPLY).map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        roomName: item.roomName,
        bedType: item.bedType, 
        facilities: item.facilities, 
        rates: item.rates, 
        btype: item.btype, 
      })
    )},

    deleteRoom: (state, id) => {   
      state.roomList = state.roomList.filter(item => item.index+1 !== id.payload).map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        roomName: item.roomName,
        bedType: item.bedType, 
        facilities: item.facilities, 
        rates: item.rates, 
        btype: item.btype, 
      })
    )},   
    
    occupiedRooms: (state) => {
      state.roomList = roomsMap.filter(item => item.btype === 'Booked').map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        roomName: item.roomName,
        bedType: item.bedType, 
        facilities: item.facilities, 
        rates: item.rates, 
        btype: item.btype, 
      })
    )},
    
    freeRooms: (state) => {
      state.roomList = roomsMap.filter(item => item.btype === 'Available').map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        roomName: item.roomName,
        bedType: item.bedType, 
        facilities: item.facilities, 
        rates: item.rates, 
        btype: item.btype, 
      })
    )},

    addRoom: (state, newRoom) => {   
      roomsMap.push(newRoom.payload);
      state.roomList = state.roomList.map((item,index) => 
      ({ 
        key: item.key, 
        id: item.id, 
        index: index,
        roomName: item.roomName,
        bedType: item.bedType, 
        facilities: item.facilities, 
        rates: item.rates, 
        btype: item.btype 
      })
    )},*/
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRooms.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.roomList = action.payload.map((data, index) =>
          ({
            key: data.id, 
            id: data.id, 
            index: index,
            roomName: data.name,
            bedType: data.room_type, 
            facilities: data.service, 
            rates: data.price, 
            discount: data.discount_price,
            state: data.state
          }))   
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
  }
}
)
 
export const { deleteRoom, occupiedRooms, freeRooms, addRoom} = roomSlice.actions
 
export default roomSlice.reducer
  