import { createSlice } from '@reduxjs/toolkit';
import conciergeJSON from '../json/conciergeJSON.json';


export const conciergeSlice = createSlice ({
  name: 'conciergeList',
  initialState: {
    newConciergeList: conciergeJSON.map ((data, index) =>
    ({
      key: data.id, 
      id: data.id, 
      index: index,
      firstName: data.first_name,
      lastName: data.last_name, 
      job: data.job, 
      starts: data.starts, 
      ends: data.ends, 
      contact: data.contact 
    }))
  },
  
  reducers: {    
    deleteConcierge: (state, id) => {      
      state.newConciergeList = state.newConciergeList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      
          ({ 
            key: item.key, 
            id: item.id, 
            index: index,
            firstName: item.firstName,
            lastName: item.lastName, 
            job: item.job, 
            starts: item.starts, 
            ends: item.ends, 
            contact: item.contact 
          })
        
      )},
  
  
    decrement: state => {      
     state.value -= 1    
    }
  }
}
)
 
export const {  decrement, deleteConcierge }  = conciergeSlice.actions
 
export default conciergeSlice.reducer