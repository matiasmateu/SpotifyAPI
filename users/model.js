const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlist = require('../playlists/model')

const User = sequelize.define('users', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  },{
  tableName: 'users'
})
User.hasMany(Playlist,{foreignKey: 'user_id', sourceKey: 'id'});

module.exports = User