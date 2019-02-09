const Sequelize = require('sequelize')
const sequelize = require('../db')

const Song = sequelize.define('songs', {
  album_id: Sequelize.INTEGER,
  artist_id: Sequelize.INTEGER,
  name:Sequelize.STRING
  },{
  tableName: 'songs'
})

module.exports = Song