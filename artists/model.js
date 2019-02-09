const Sequelize = require('sequelize')
const sequelize = require('../db')
const Album = require('../albums/model')
const Song = require('../songs/model')

const Artist = sequelize.define('artists', {
  name: Sequelize.STRING
  },{
  tableName: 'artists'
})

Artist.hasMany(Album, {foreignKey: 'artist_id', sourceKey: 'id'});
Artist.hasMany(Song, {foreignKey: 'artist_id', sourceKey: 'id'});


module.exports = Artist