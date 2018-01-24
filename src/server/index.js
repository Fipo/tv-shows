'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Show = require('../model/shows.js')
const app = express()
const router = express.Router()

const port = process.env.API_PORT || 8000

mongoose.connect('mongodb://localhost:27017/tvshows')

//now we should configure the API to use bodyParser and look for JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//To prevent errors from Cross Origin Resource Sharing, we will set our headers to allow CORS with middleware like so:
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

//now we can set the route path & initialize the API
router.get('/', function(req, res) {
  res.json({ message: 'API Initialized!' })
})

//adding the /shows route to our /api router
router
  .route('/shows')
  .get(function(req, res) {
    Show.find((error, shows) => {
      if (error) res.send(error)
      res.json(shows)
    })
  })
  .post(function(req, res) {
    const newShow = new Show()
    //body parser lets us use the req.body
    newShow.author = req.body.author
    newShow.text = req.body.text
    newShow.save(error => {
      if (error) res.send(error)
      res.json({ message: 'Show successfully added!' })
    })
  })

router.route('/shows/:show_id').delete((request, response) => {
  Show.remove({ _id: request.params.show_id }, (error, comment) => {
    if (error) response.send(error)
    response.json({ message: 'Show has beed deleted' })
  })
})

//Use our router configuration when we call /api
app.use('/api', router)

//starts the server and listens for requests
app.listen(port, function() {
  console.log(`api running on port ${port}`)
})
