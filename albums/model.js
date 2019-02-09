const Sequelize = require('sequelize')
const sequelize = require('../db')
const Song = require ('../songs/model')

const Album = sequelize.define('albums', {
    artist_id: {
        type: Sequelize.INTEGER,
        field: 'artist_id'
      },
    name: Sequelize.STRING
}, {
        tableName: 'albums'
    })

    Album.hasMany(Song,{foreignKey: 'album_id', sourceKey: 'id'});


module.exports = Album