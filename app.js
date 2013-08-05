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
 * Functions
 */
function streamXml(file, res) {
  var filePath = __dirname + '/public/xml/' + file
  var size = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'application/xml',
    'Content-Length': size
  })

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res)
}

/*
 * Routes
 */
app.get('/', function (req, res) {
  res.render('index',
  { title : 'Home' }
  )
})

app.get('/smartblock', function (req, res) {
  io.sockets.emit('call', { cli: req.query.cli })
  streamfile('initialBlock.xml', res)
})

app.get('/smartblock/tone', function (req, res) {
  io.sockets.emit('five')
  res.end()
})

/*
 * Sockets
 */
io.sockets.on('connection', function (socket) {

})