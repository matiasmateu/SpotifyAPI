const { Router } = require('express')
const Artist = require('./model')
const bcrypt = require('bcryptjs');

const router = new Router()

router.get('/artists', (req, res, next) => {
    Artist
      .findAll()
      .then(artists => {
        res.send({ artists })
      })
      .catch(error => next(error))
  })

  

module.exports = router