import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice ({
  name: 'auth',
  initialState: {
    auth : false
  },
  
  reducers: {   
    authenticationHanlder: (state, action) => { 
			if (action.payload){
				state.auth = true 
				localStorage.setItem('authenticated', '1');
			} else {
				state.auth = false 
				localStorage.removeItem('authenticated');
				localStorage.removeItem('token');
			}
		}
	},
  
})

 
export const {  authenticationHanlder }  = authSlice.actions
 
export default authSlice.reducer