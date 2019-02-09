const { Router } = require('express')
const Playlist = require('./model')
const bcrypt = require('bcryptjs');
const User = require ('../users/model')
const {toData} = require ('../auth/jwt')

const router = new Router()

// ADD THE TOKEN AUTORIZATION TO RETRIEVE THE PLAYLISTS
router.get('/playlists', (req, res, next) => {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    const data = toData(auth[1])
    Playlist
      .findAll({where:{user_id:data}})
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
