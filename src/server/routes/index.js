const express = require('express')
const router = express.Router()
const Show = require('../../model/shows.js')

router.get('/', (req, res) => res.json({ message: 'API Initialized!' }))

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

    newShow.author = req.body.author
    newShow.text = req.body.text
    newShow.save(error => {
      if (error) res.send(error)
      res.json({ newShow, message: 'Show successfully added!' })
    })
  })

router.route('/shows/:show_id').delete((request, response) => {
  Show.deleteOne({ _id: request.params.show_id }, (error, result) => {
    if (error) response.send(error)
    response.json({ result, message: 'Show has beed deleted' })
  })
})

module.exports = router
