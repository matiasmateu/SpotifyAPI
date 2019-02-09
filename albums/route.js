const { Router } = require('express')
const Album = require('./model')
const Artist = require('../artists/model')
const bcrypt = require('bcryptjs');

const router = new Router()

router.get('/albums', (req, res, next) => {
    Album
        .findAll()
        .then(albums => {
            res.send({ albums })
        })
        .catch(error => next(error))
})

router.get('/albums/:id', (req, res, next) => {
    Album
      .findById(req.params.id,{ include: [Artist] })
      .then(album => {
        if (!album) {
          return res.status(404).send({
            message: `Album does not exist`
          })
        }
        return res.send(album)
      })
      .catch(error => next(error))
  })

Album.belongsTo(Artist, {foreignKey: 'artist_id', sourceKey: 'id'});


module.exports = router