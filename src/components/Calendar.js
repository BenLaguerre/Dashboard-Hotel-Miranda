import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import calendarDates from '../json/calendarDates.json'

export default function Calendar(props) {

  let startDates = calendarDates.map(x => {
    return {start: x.start}
  })
  let endDates = calendarDates.map(x => {
    return {start: x.end}
  })

  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
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
