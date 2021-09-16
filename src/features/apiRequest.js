export async function apiRequest (location,method,data = null) {
     try{
      const response = await fetch(`http://localhost:3001/${location}`, {
        method: method,
        withCredentials: true,
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI5NzE5ODk5LCJleHAiOjE2MzIzMTE4OTl9.klo-XtcqmgNAWq7mDRXrnASKafMD-UANT37g0UX_0yg'
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