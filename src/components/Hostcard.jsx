import React from 'react'

export const Hostcard = ({eventcard}) => {
  return (
    
    <div className="eventcard">
        <h3>{eventcard.eventname}</h3>
        <h2>{eventcard.date}</h2>
        <h2>{eventcard.location}</h2>
        <h2>{eventcard.time}</h2>

    </div>
  )
}
