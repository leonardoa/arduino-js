// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

const { Board, Led, Sensor } = require("johnny-five");
const board = new Board();

// Variables
let valore = 0;
let connesso = false;

board.on("ready", () => {

  server.listen(port, () => {
    console.log('Server listening at port %d', port);
  });

  // Routing
  app.use(express.static(path.join(__dirname, 'public')));

  // Create a new `sensor` hardware instance.
  const potentiometer = new Sensor("A3");

  // Connection
  io.on('connection', (socket) => {
    potentiometer.on("change", () => {
      //takes the value of the potentiometer
      const { value, raw } = potentiometer;
      //console the value
      console.log("Sensor: ");
      console.log("  value  : ", value);
      console.log("  raw    : ", raw);
      console.log("-----------------");
      valore = value;
      socket.broadcast.emit('msg', valore);
    });
  });

});




// // Setup basic express server
// const express = require('express');
// const app = express();
// const path = require('path');
// const server = require('http').createServer(app);
// const io = require('socket.io')(server);
// const port = process.env.PORT || 3000;


// const { Board, Led, Sensor } = require("johnny-five");
// const board = new Board();

// // Variables
// let valore = 0;
// let connesso = false;


// server.listen(port, () => {
//   console.log('Server listening at port %d', port);
// });

// // Routing
// app.use(express.static(path.join(__dirname, 'public')));

// // Connection
// io.on('connection', (socket) => {
//   connesso = true;
//   console.log("connesso")

//     board.on("ready", () => {
//       // Create a new `sensor` hardware instance.
//       const potentiometer = new Sensor("A3");
//       potentiometer.on("change", () => {
//         //takes the value of the potentiometer
//         const { value, raw } = potentiometer;
//         if (connesso) {
//           //console the value
//           console.log("Sensor: ");
//           console.log("  value  : ", value);
//           console.log("  raw    : ", raw);
//           console.log("-----------------");
//           valore = value;
//           socket.broadcast.emit('msg', valore);
//         }
//       });
//     });

// });
