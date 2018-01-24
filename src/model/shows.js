'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ShowSchema = new Schema({
  author: String,
  text: String
})

module.exports = mongoose.model('Show', ShowSchema)
