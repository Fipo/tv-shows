import React from 'react'

const ShowList = props => (
  <div>
    {props.shows.map((show, index) => (
      <div key={show._id}>
        {index} {show.author}: {show.text}
        <button onClick={() => props.handleDeleteShow(show._id)}>x</button>
      </div>
    ))}
  </div>
)

export default ShowList
