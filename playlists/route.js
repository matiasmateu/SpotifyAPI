const { Router } = require('express')
const Playlist = require('./model')
const bcrypt = require('bcryptjs');
const User = require ('../users/model')

const router = new Router()

router.get('/playlists', (req, res, next) => {
    Playlist
      .findAll()
      .then(playlists => {
        res.send({ playlists })
      })
      .catch(error => next(error))
  })

  router.get('/playlists/:id', (req, res, next) => {
    Playlist
      .findById(req.params.id,{ include: [User] })
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `Playlist does not exist`
          })
        }
        return res.send(playlist)
      })
      .catch(error => next(error))
  })

  Playlist.belongsTo(User, {foreignKey: 'user_id', sourceKey: 'id'});



module.exports = router
