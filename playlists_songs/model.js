const Sequelize = require('sequelize')
const sequelize = require('../db')

const PlaylistsSongs = sequelize.define('playlist_songs', {
  playlist_id: Sequelize.INTEGER,
  song_id:Sequelize.INTEGER
  },{
  tableName: 'playlist_songs'
})

module.exports = PlaylistsSongs