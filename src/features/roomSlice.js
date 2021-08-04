import { createSlice } from '@reduxjs/toolkit';
import roomJSON from '../json/roomJSON.json';


export const roomSlice = createSlice ({
  name: 'roomList',
  initialState: {
    newRoomList: roomJSON.map ((data, index) =>
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
  },
  
  reducers: {    
    deleteRoom: (state, id) => {      
      state.newRoomList = state.newRoomList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      
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
      
                                                                                         
    
        
    
  
    decrement: state => {      
     state.value -= 1    
    }
  }
}
)
 
export const { deleteRoom, decrement} = roomSlice.actions
 
export default roomSlice.reducer
  