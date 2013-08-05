/*
 * Module dependencies
 */
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , fs = require('fs')
  , stylus = require('stylus')
  , nib = require('nib')

/*
 * Set Up
 */
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(express.logger('dev'))
app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))
app.use(express.static(__dirname + '/public'))

server.listen(3000)

/*
 * Routes
 */
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

/*
 * Sockets
 */
io.sockets.on('connection', function (socket) {

  socket.emit('news', { hello: 'world' })

  socket.on('my other event', function (data) {
    console.log(data)
  })

  socket.emit('five')
  socket.emit('seven')

})