$(document).ready(function () {
  var socket = io.connect('http://localhost');

  socket.on('player1', function (data) {
    $('#player1').html("Player connected: <br/>" + data.player);
    $('#log').html(data.player + " has connected as player 1. <br/>Awaiting an opponent.")
  });

  socket.on('player2', function (data) {
    $('#player2').html("Player connected: <br/>" + data.player);
    $('#log').html(data.player + " has connected as player 2. <br/>Game starting. Player 1's turn.")
  });

  socket.on('move', function (data) {
    $('#b' + data.square).text(data.sign);
    if (data.sign == 'X')
      $('#log').html("Player 1 has moved. <br/>Player 2's turn.");
    else
      $('#log').html("Player 2 has moved. <br/>Player 1's turn.");
  });

  socket.on('log', function (data) {
    console.log(data.message);
  });

  socket.on('gameOver', function (data) {
    if (data.winner == 1)
      $('#log').html("Game over. <br/>The winner is player 1!")
    else {
      if (data.winner == 2)
        $('#log').html("Game over. <br/>The winner is player 2!")
      else
        $('#log').html("Game over. <br/>The game is a draw!")
    }
  });
});