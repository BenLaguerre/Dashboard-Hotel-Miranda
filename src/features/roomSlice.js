import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';

const ROOMS_MULTIPLY = 10;

export const fetchRooms = createAsyncThunk('roomList/fetchRooms', async () => {
    return await apiRequest('rooms','GET')
})

export const fetchOneRoom = createAsyncThunk('roomList/fetchOneRoom', async (arg) => {
    return await apiRequest('rooms/' +arg.id,'GET')
})

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
        state.roomList = action.payload.filter(item => {
          if (action.meta.arg.filt === 1){
            return item.state === true;
          } else if (action.meta.arg.filt === 2) {
            return item.state === false;
          }
          return true;
        
        }).slice((action.meta.arg.page-1)*ROOMS_MULTIPLY , action.meta.arg.page * ROOMS_MULTIPLY)
          .map((data, index) =>
          ({
            key: data.id, 
            id: data.id, 
            index: index,
            name: data.name,
            bed: data.bed, 
            price: data.price, 
            status: data.status
          }))   
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })

      .addCase(fetchOneRoom.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOneRoom.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.roomList = action.payload[0]
      })
      .addCase(fetchOneRoom.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
  }
}
)
 
export const { deleteRoom, occupiedRooms, freeRooms, addRoom} = roomSlice.actions
 
export default roomSlice.reducer
  