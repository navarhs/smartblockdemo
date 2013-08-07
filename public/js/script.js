$(document).ready(function () {
  drawKeypad('keys');

  var socket = io.connect('http://localhost');
  socket.on('call', function (data) {
    $('#call').text('Call established with: ' + data.cli);
  })

  socket.on('tone', function (data) {
    tone = data.tone;
    $('#key' + tone).toggleClass('checked');
    setTimeout("$('#key" + tone + "').toggleClass('checked');", 300)
  });
});

function drawKeypad(div) {
  var div = document.getElementById(div);

  var k = 1;
  for (var i=1; i<=4; i++) {
    for (var j=1; j<=3; j++) {
      var val = k;
      switch (k)
      {
        case 10: val = 'star'; break;
        case 11: val = 0; break;
        case 12: val = 'hash'; break;
      }

      var keyBorder = document.createElement('div');
      keyBorder.className = 'keyBorder';

      var key = document.createElement('div');
      key.className = 'key';
      key.setAttribute('id', 'key' + val);

      var keyContent = document.createElement('b');
      keyContent.className = 'keyContent';
      if (val == 'star')
        keyContent.textContent = '\u2731';
      else {
        if (val == 'hash')
          keyContent.textContent = '#';
        else
          keyContent.textContent = val;
      }

      key.appendChild(keyContent);
      keyBorder.appendChild(key);
      div.appendChild(keyBorder);

      k++;
    }
  }
}