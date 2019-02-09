const { Router } = require('express')
const Playlist = require('./model')
const bcrypt = require('bcryptjs');
const User = require ('../users/model')
const PlaylistSongs = require ('../playlists_songs/model')

const router = new Router()

router.get('/playlistsSongs', (req, res, next) => {
    PlaylistSongs
      .findAll()
      .then(playlists => {
        res.send({ playlists })
      })
      .catch(error => next(error))
})




module.exports = router
