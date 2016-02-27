var m = require('./node_modules/midi/');
var output = new m.output();
var portCount = output.getPortCount();

var messageInterval;

for (var i = 0; i < portCount; ++i) {
  if (output.getPortName(i) === 'Node MIDI Consumer') {
    output.openPort(i);
    output.sendMessage([250]);
    messageInterval = setInterval(function () {output.sendMessage([248]);}, 1000);
    break;
  }
}
