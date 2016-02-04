var midi = require('midi');

// Set up a new input.
var input = new midi.input();

input.ignoreTypes(true, false, true);

// Create a virtual input port.
input.openVirtualPort("Node MIDI Consumer");

module.exports = {
  subscribe: function(handle){
    var previousSendValue;
    var count = 0;

    input.on('message', function(deltaTime, messageCode){
      // midi clock message
      if (messageCode[0] === 248) {
        // console.log(deltaTime);
        var bpm = 60 / (24 * deltaTime);

        count++;

        if (count % 6 === 0){
          // process.stdout.cursorTo(0);
          // process.stdout.clearLine();
          // process.stdout.write(beats[0]);
          // beats.push(beats.shift());
        }

        if (count === 24) {
          handle('beat');
          process.stdout.write('.');
          count = 0;
        }

        // var value = bpm;
        // if (value != previousSendValue) {
        //   previousSendValue = value;
        // }
      }

      if (messageCode[0] === 252) {
        console.log('sync stopped');
      }
      if (messageCode[0] === 250) {
        console.log('sync started');
      }
    });
  }
}
