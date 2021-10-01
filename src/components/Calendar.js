import React, { useEffect, useRef }from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useSelector, useDispatch } from 'react-redux';

export default function Calendar(props) {

  const calendar = useSelector(state => state.guestList.fullGuestList); 
  let startDates = calendar.map(x => {
    return {
      start: x.checkIn,
      name: x.name
    }
  })
  let endDates = calendar.map(x => {
    return {start: x.checkOut}
  })
  
  return (
    <FullCalendar 
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      datesSet={args => props.changeDate(args.view.activeStart)}
      headerToolbar = {{
        left: 'prev,title,next',
        center:'',
        right: 'today'
      }}
      height="auto"
      eventSources=  {[{
        events: startDates,
        color : '#135846'
      },
      {
        events: endDates,
        color : '#ff0000'
      }]}
    />
  )
}
