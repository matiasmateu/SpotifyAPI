const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcryptjs');

const router = new Router()

router.get('/Listusers', (req, res, next) => {
    User
      .findAll()
      .then(users => {
        res.send({ users })
      })
      .catch(error => next(error))
  })


module.exports = router

