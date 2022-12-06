
// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

let five = require("johnny-five");
let board = new five.Board();

// Variables
let valore = 0;
let connesso = false;

board.on("ready", function () {
  server.listen(port, () => {
    console.log('Server listening at port %d', port);
  });

  // Routing
  app.use(express.static(path.join(__dirname, 'public')));

  // Create a new `joystick` hardware instance.
  var joystick = new five.Joystick({
    //   [ x, y ]
    pins: ["A0", "A1"]
  });

  io.on('connection', (socket) => {
    joystick.on("change", function () {
      console.log("Joystick");
      console.log("  x : ", this.x);
      console.log("  y : ", this.y);
      console.log("--------------------------------------");
      valore = { x: this.x, y: this.y };
      socket.broadcast.emit('msg', valore);
    });
  });
});
