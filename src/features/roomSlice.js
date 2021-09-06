import { createSlice } from '@reduxjs/toolkit';
import roomJSON from '../json/roomJSON.json';

const ROOMS_MULTIPLY = 10;
let roomsMap = roomJSON.map ((data, index) =>
  ({
    key: data.id, 
    id: data.id, 
    index: index,
    roomName: data.room_name,
    bedType: data.bed_type, 
    facilities: data.facilities, 
    rates: data.rates, 
    btype: data.btype
  }))

export const roomSlice = createSlice ({
  name: 'roomList',
  initialState:  {
    roomList : [],
  }
  ,
  
  reducers: {    
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
    )},
  }
}
)
 
export const { deleteRoom, fetchRooms, occupiedRooms, freeRooms, addRoom} = roomSlice.actions
 
export default roomSlice.reducer
  