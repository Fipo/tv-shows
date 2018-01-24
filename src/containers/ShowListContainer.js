import React, { Component } from 'react'
import { API_URL, API_POLL_INTERVAL } from '../constants'
import axios from 'axios'
import ShowList from '../components/ShowList'
import loremIpsum from 'lorem-ipsum'

class ShowListContainer extends Component {
  state = { data: [] }
  componentDidMount() {
    setInterval(this._getShows, API_POLL_INTERVAL)
  }

  _getShows = () => {
    axios
      .get(`${API_URL}/shows`)
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.log(error))
  }

  _addNewShow = () => {
    const newMessage = loremIpsum({ count: 1, units: 'sentences' })
    axios
      .post(`${API_URL}/shows`, { author: 'me', text: newMessage })
      .then(result => console.log(result))
      .catch(error => console.error(error))
  }

  handleDeleteShow = id => {
    axios
      .delete(`${API_URL}/shows/${id}`)
      .then(response => console.log(response))
      .catch(error => console.error(error))
  }

  render() {
    return (
      <div>
        <ShowList shows={this.state.data} handleDeleteShow={this.handleDeleteShow} />
        <button onClick={this._addNewShow}>Generate new comment</button>
      </div>
    )
  }
}
export default ShowListContainer
