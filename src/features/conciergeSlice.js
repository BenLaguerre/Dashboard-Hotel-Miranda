import { createSlice } from '@reduxjs/toolkit';
import conciergeJSON from '../json/conciergeJSON.json';

const CONCIERGE_MULTIPLY = 10;

let conciergesMap = conciergeJSON.map ((data, index) =>
  ({
    key: data.id, 
    id: data.id, 
    index: index,
    name: data.name,
    joinDate: data.join_date, 
    job: data.job_description, 
    phone: data.phone_number, 
    status: data.state
  }))

export const conciergeSlice = createSlice ({
  name: 'conciergeList',
  initialState: {
    conciergeList : []
  },
  
  reducers: {   

  fetchConcierge: (state, action) => {
    state.conciergeList = conciergesMap.filter(item => {
      if (action.payload.filt === 1){
        return item.status === 1;

      } else if (action.payload.filt === 2) {
        return item.status === 0;
      }
      
      return true;
    
    }).slice((action.payload.page-1)*CONCIERGE_MULTIPLY , action.payload.page * CONCIERGE_MULTIPLY).map((item,index) => 
    ({ 
      key: item.key, 
      id: item.id, 
      index: index,
      name: item.name,
      joinDate: item.joinDate, 
      job: item.job, 
      phone: item.phone, 
      status: item.status
    })
  )},

    deleteConcierge: (state, id) => {      
      state.conciergeList = state.conciergeList.filter(item=> item.index+1 !== id.payload).map ((item,index) => 
      
          ({ 
            key: item.key, 
            id: item.id, 
            index: index,
            name: item.name,
            joinDate: item.joinDate, 
            job: item.job, 
            phone: item.phone, 
            status: item.status
          })
        
      )}
  }
}
)
 
export const {  fetchConcierge, deleteConcierge }  = conciergeSlice.actions
 
export default conciergeSlice.reducer