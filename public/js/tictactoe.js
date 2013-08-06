$(document).ready(function () {
  var socket = io.connect('http://localhost');

  socket.on('player1', function (data) {
    $('#player1').text("Player 1 connected: " + data.player);
  });

  socket.on('player2', function (data) {
    $('#player2').text("Player 2 connected: " + data.player);
  });

  socket.on('tone', function (data) {
    tone = data.tone;
  });
});