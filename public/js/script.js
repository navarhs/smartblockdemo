$(document).ready(function () {
  drawKeypad('keypad');

  var socket = io.connect('http://localhost');
  socket.on('call', function (data) {
    $('#call').text("Call established with: " + data.cli);
  })

  socket.on('tone', function (data) {
    tone = data.tone;
    $('#key' + tone).attr('fill', 'red');
    setTimeout("$('#key" + tone + "').attr('fill', 'green');", 300);
  });
});

function drawKeypad(svg) {
  var svg = document.getElementById(svg);
  var svgns = 'http://www.w3.org/2000/svg';

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
      var y = svg.getAttribute('height') * 1/5 * i;
      var x = svg.getAttribute('width') * 1/4 * j;

      var circle = document.createElementNS(svgns, 'circle');
      circle.setAttribute('id', 'key' + val);
      circle.setAttribute('cx', x);
      circle.setAttribute('cy', y);
      circle.setAttribute('r', '20');
      circle.setAttribute('fill', 'green');
      
      var text = document.createElementNS(svgns, 'text');
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('fill', 'white');
      text.setAttribute('style', 'text-anchor: middle; alignment-baseline: middle');
      text.setAttribute('font-family', "'Arial'");
      text.setAttribute('font-size', '16');
      text.setAttribute('font-weight', 'bold');
      if (val == 'star')
        text.textContent = '\u2731';
      else {
        if (val == 'hash')
          text.textContent = '#';
        else
          text.textContent = val;
      }

      svg.appendChild(circle);
      svg.appendChild(text);

      k++;
    }
  }
}