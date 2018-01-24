'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

const router = require('./routes')

const port = process.env.API_PORT || 8000

mongoose.connect('mongodb://localhost:27017/tvshows')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  res.setHeader('Cache-Control', 'no-cache') //and remove cacheing so we get the most recent shows
  next()
})

app.use('/api', router)

app.listen(port, function() {
  console.log(`api running on port ${port}`)
})
