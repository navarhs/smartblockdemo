$(document).ready(function () {
  var socket = io.connect('http://localhost');

  socket.on('player1', function (data) {
    $('#player1').text("Player 1 connected: " + data.player);
  });

  socket.on('player2', function (data) {
    $('#player2').text("Player 2 connected: " + data.player);
  });

  socket.on('move', function (data) {
    $('#b' + data.square).text(data.sign);
  });

  socket.on('log', function (data) {
    console.log(data.message);
  });

  socket.on('gameOver', function (data) {
    console.log("winner is: " + data.winner);
  });
});