import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';

const ROOMS_MULTIPLY = 10;

export const addRoom = createAsyncThunk('roomList/addRoom', async (arg) => {
  return await apiRequest('rooms','POST', arg)
})

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
    totalRoom : 0,
    allRoom : [],
    oneRoom: [],
    error: null
  }
  ,
  
  reducers: {
  },
  extraReducers(builder) {
    builder
      //addRoom
      .addCase(addRoom.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.status = 'succeeded'
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })

      //fetchRooms
      .addCase(fetchRooms.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.totalRoom = action.payload.length
        state.allRoom = action.payload.filter(item => {
          if (action.meta.arg.filt === 1){
            return item.status === false;
          } else if (action.meta.arg.filt === 2) {
            return item.status === true;
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

      //fetchOneRoom
      .addCase(fetchOneRoom.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOneRoom.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.oneRoom = action.payload[0]
      })
      .addCase(fetchOneRoom.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
  }
}
)
 
export const { deleteRoom, } = roomSlice.actions
 
export default roomSlice.reducer
  