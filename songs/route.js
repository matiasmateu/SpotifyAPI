const { Router } = require('express')
const Song = require('./model')
const bcrypt = require('bcryptjs');
const Album = require('../albums/model')
const Artist = require('../artists/model')

const router = new Router()

router.get('/songs', (req, res, next) => {
    Song
      .findAll()
      .then(songs => {
        res.send({ songs })
      })
      .catch(error => next(error))
  })

  router.get('/songs/:id', (req, res, next) => {
    Song
      .findById(req.params.id,{ include: [Album,Artist] })
      .then(song => {
        if (!song) {
          return res.status(404).send({
            message: `Song does not exist`
          })
        }
        return res.send(song)
      })
      .catch(error => next(error))
  })

Song.belongsTo(Album,{foreignKey:'album_id',targetKey:'id'})
Song.belongsTo(Artist,{foreignKey:'artist_id',targetKey:'id'})

module.exports = router

