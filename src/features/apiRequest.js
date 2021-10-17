import { toast } from "react-toastify";
const token = localStorage.getItem('token');

export async function apiRequest (location,method,data = null) {
    
     try{
      
      const response = await toast.promise (fetch(`https://backendhotelmiranda.azurewebsites.net/${location}`, {
        method: method,
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: data ? JSON.stringify(data) : null
        
        }),
        {
          pending: method === 'GET' ? 'Retrieving data from the server...' : 'Conctacting server...',
          succes: method === 'GET' ?'Success' : 'Creation successfull!',
          error: method === 'GET' ? 'Could not join the server 🤯' : 'Error during the creation process 🤯' 
        });
      if (response.ok){
        return await response.json();
      } else{
        throw new Error ('Network response was not ok')
      }
    }catch (err) {
      throw new Error('There has been a problem with your fetch operation:');
    }
}