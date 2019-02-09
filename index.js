const express = require('express')
const usersRouter = require('./users/route')
const artistsRouter = require('./artists/route')
const albumsRouter = require('./albums/route')
const songsRouter = require('./songs/route')
const playlistsRouter = require('./playlists/route')
const playlistsSongsRouter = require('./playlists_songs/route')

const app = express()
const port = process.env.PORT || 4000

app
  .use(usersRouter)
  .use(artistsRouter)
  .use(albumsRouter)
  .use(songsRouter)
  .use(playlistsRouter)
  .use(playlistsSongsRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))