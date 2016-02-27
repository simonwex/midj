var midi = require('../node_modules/midi/');
var input = new midi.input();

var deviceName = process.argv[2]

var numPorts = input.getPortCount();
var port = -1;
for (var i = 0; i < numPorts; ++i) {
  if (input.getPortName(i) === deviceName) {
    port = i;
    break;
  }
}

if (port > -1) {
  input.on('message', function(deltaTime, message) {
    console.log(message);
  });
  input.openPort(port);
}
else {
  console.error('Couldn\'t find ' + deviceName + '.');
  process.exit(0);
}
