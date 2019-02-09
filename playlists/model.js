const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model')

const Playlist = sequelize.define('playlists', {
  user_id: Sequelize.INTEGER,
  name:Sequelize.STRING
  },{
  tableName: 'playlists'
})

module.exports = Playlist