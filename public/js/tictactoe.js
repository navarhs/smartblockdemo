$(document).ready(function () {
  var socket = io.connect('http://localhost');

  socket.on('tone', function (data) {
    tone = data.tone;
  });
});