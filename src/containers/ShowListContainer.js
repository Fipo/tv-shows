import React, { Component } from 'react'
import { API_URL } from '../constants'
import axios from 'axios'
import ShowList from '../components/ShowList'
import loremIpsum from 'lorem-ipsum'

class ShowListContainer extends Component {
  state = { data: [] }
  componentDidMount() {
    axios
      .get(`${API_URL}/shows`)
      .then(response => this.setState({ data: response.data }))
      .catch(error => console.log(error))
  }

  _addNewShow = () => {
    const newMessage = loremIpsum({ count: 1, units: 'sentences' })
    axios
      .post(`${API_URL}/shows`, { author: 'me', text: newMessage })
      .then(result => {
        const newArray = this.state.data.slice()
        newArray.splice(newArray.length, 0, result.data.newShow)
        this.setState({ data: newArray })
      })
      .catch(error => console.error(error))
  }

  handleDeleteShow = id => {
    axios
      .delete(`${API_URL}/shows/${id}`)
      .then(response => {
        const newArray = this.state.data.slice()
        const index = newArray.findIndex(show => show._id === id)
        newArray.splice(index, 1)
        this.setState({ data: newArray })
      })
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
