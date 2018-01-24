import React from 'react'

const ShowList = props => (
  <div>
    {props.shows.map(show => (
      <div key={show._id}>
        {show.author}: {show.text}
        <button onClick={() => props.handleDeleteShow(show._id)}>x</button>
      </div>
    ))}
  </div>
)

export default ShowList
