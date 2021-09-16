const token = localStorage.getItem('token');

export async function apiRequest (location,method,data = null) {
     try{
      const response = await fetch(`http://localhost:3001/${location}`, {
        method: method,
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data ? JSON.stringify(data) : null
      })
      if (response.ok){
        return await response.json();
      } else{
        console.log('Network response was not ok')
      }
    }catch (err) {
      console.log('There has been a problem with your fetch operation:', err);
    }
}