var midi = require('midi');

// Set up a new input.
var input = new midi.input();

input.ignoreTypes(true, false, true);

var type = {
  191: 'controls',
  224: 'pitch',
  176: 'modulate',
  144: 'keydown',
  128: 'keyup'
};

var numPorts = input.getPortCount();
var port = -1;
for (var i = 0; i < numPorts; ++i) {
  if (input.getPortName(i) === 'Oxygen 25') {
    port = i;
    break;
  }
}

if (port > -1) {
  input.openPort(port);
}

module.exports = {
  subscribe: function(handle){
    input.on('message', function(deltaTime, message){
      if (message[0] in type) {
        handle('oxygen:' + type[message[0]], {key: message[1], value: message[2]});
      }
    });
  }
}
