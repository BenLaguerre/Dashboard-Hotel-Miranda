import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {apiRequest} from './apiRequest';

const CONCIERGE_MULTIPLY = 10;

export const fetchConcierges = createAsyncThunk('conciergeList/fetchConcierges', async () => {
    return await apiRequest('concierges','GET')
})

export const fetchOneConcierge = createAsyncThunk('conciergeList/fetchOneConcierge', async (arg) => {
  return await apiRequest('concierges/' +arg.id,'GET')
})

export const conciergeSlice = createSlice ({
  name: 'conciergeList',
  initialState: {
    status: 'idle',
    conciergeList : [],
    oneConcierge : [],
    error: null
  },
  
  reducers: {   
  },
  extraReducers(builder) {
    builder

      //fetchConcierges
      .addCase(fetchConcierges.pending, (state, action) => {
        state.status = 'loading'      
      })
      .addCase(fetchConcierges.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.conciergeList = action.payload.filter(item => {
          if (action.meta.arg.filt === 1){
            return item.state === 1;
          } else if (action.meta.arg.filt === 2) {
            return item.state === 0;
          }
          return true;
        
        }).slice((action.meta.arg.page-1)*CONCIERGE_MULTIPLY , action.meta.arg.page * CONCIERGE_MULTIPLY)
          .map((data, index) =>
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
      })
      .addCase(fetchConcierges.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })

      //fetchOneConcierge
      .addCase(fetchOneConcierge.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchOneConcierge.fulfilled, (state, action) => {
        state.status = 'succeeded'  
        state.oneConcierge = action.payload[0]
      })
      .addCase(fetchOneConcierge.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message      
      })
  }

}
)
 
export const { deleteConcierge, addConcierge }  = conciergeSlice.actions
 
export default conciergeSlice.reducer