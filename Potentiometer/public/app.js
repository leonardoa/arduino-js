$(function () {


  const socket = io();

  function mapRange(value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
  }

  socket.on('msg', (data) => {
    console.log('msg', data);
    //console log the value

    //map the value to the rotation
    let deg = mapRange(data, 0, 1023, 0, 360);

    //rotate the div
    document.getElementById('rect').style.transform = `rotate(${deg}deg)`;
  });

  
});
