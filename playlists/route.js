const { Router } = require('express')
const Playlist = require('./model')
const bcrypt = require('bcryptjs');
const User = require('../users/model')
const Album = require('../albums/model')
const Artist = require('../artists/model')
const Song = require('../songs/model')
const { toData } = require('../auth/jwt')
const auth = require ('../auth/middleware')
const PlaylistsSongs = require ('../playlists_songs/model')

const router = new Router()

router.get('/playlists', (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const data = toData(auth[1])
    Playlist
      .findAll({ where: { user_id: data } })
      .then(playlists => {
        res.send({ playlists })
      })
      .catch(error => next(error))
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

router.post('/playlists', (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const user = toData(auth[1])
    Playlist
      .findOrCreate({ where: { name: req.body.name }, defaults: { user_id: user } })
      .spread(function (user, created) {
        if (created) {
          res.status(201).send({
            message: 'Playlist Created'
          })
        } else {
          res.status(400).send({
            message: 'The playlist already exists.'
          })
        }
      })
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})




router.get('/playlists/:id', (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const data = toData(auth[1])
    Playlist
      .findAll({ where: { user_id: data } })
      .then(playlist => {
        if (!playlist) {
          return res.status(204).send({
            message: `No content`
          })
        } else {
          const pl = playlist.filter(pl => pl['id'] == req.params.id)
          if (pl.length > 0) {
            return res.status(200).send(pl[0])
          } else {
            return res.status(204).send("No content")
          }

        }
      })
      .catch(error => next(error))

  } else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
})

router.delete('/playlists/:id'), (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const user = toData(auth[1])
    Playlist
      .findById(req.params.id)
      .then(
        playlist => {
          if (playlist['user_id'] == user) {
            Playlist.destroy({ where: { id: req.params.id } })
            res.status(200).send({
              message: 'Playlist deleted'
            })
          } else {
            res.status(400).send({
              message: 'You cannot delete this playlist'
            })
          }
        }
      )
      .catch(res.status(400).send("No results..."))
  } else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }

}

router.post('/playlists/:id/songs', (req, res) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const user = toData(auth[1])
    // FIND OR CREATE ARTIST

    // FIND OR CREATE ALBUM

    // FIND OR CREATE SONG

    // CREATE RELATION SONG - PL in PlayListsSongs
    }
})


Playlist.belongsTo(User, { foreignKey: 'user_id', sourceKey: 'id' });

module.exports = router
