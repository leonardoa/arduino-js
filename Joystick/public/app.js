$(function () {
  const socket = io();
  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  }

  socket.on('msg', (data) => {
    console.log('msg', data);

    //map the value
    let height = mapRange(data.y, -1, 0.9, 0, 500);
    let width = mapRange(data.x, -1, 0.9, 0, 500);

    //rotate the div
    document.getElementById('rect').style.height = `${height}px`;
    document.getElementById('rect').style.width = `${width}px`;
  });

  //let's wait at least a second before starting the loop
  let shuffle = false;
  setTimeout(() => {
    function drawLoop() {
      //if p5 is ready
      if (ready) {
        //se dal p5.js viene inviato il messaggio di shuffle
        if (label == "shuffle" && confidence > 0.9) {
          if (shuffle) {
            document.getElementById('rect').style.borderRadius = `50%`;
          }
        }
        else {
          document.getElementById('rect').style.borderRadius = `0%`;
        }
      }
      requestAnimationFrame(drawLoop);
    }
    requestAnimationFrame(drawLoop);
    shuffle = true;
  }, 1000);



});
