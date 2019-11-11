let canvas = document.getElementById('canvas'),
    ctx    = canvas.getContext('2d'),
    isMouseDown = false,
    coords = []
    ;

canvas.width = 512;
canvas.height = 512;

function fillCanvasBackground() {
  // ctx.fillStyle = 'blue';
  // ctx.strokeStyle = 'red';
  ctx.lineWidth = 20;
  ctx.strokeRect(0, 0, 512, 512);
}
fillCanvasBackground();

canvas.addEventListener('mousedown', function() {
  isMouseDown = true;
})

canvas.addEventListener('mouseup', function() {
  isMouseDown = false;
  ctx.beginPath();
})

canvas.addEventListener('mousemove', function(e) {
  if(isMouseDown) {
    ctx.lineTo(e.layerX, e.layerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.layerX, e.layerY);

    coords.push([e.layerX, e.layerY]);
    localStorage.setItem('coords', JSON.stringify(coords));
  }
})

function clear() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.fillStyle = 'black';

 }

 document.addEventListener('keydown', function(event) {
   if (event.keyCode === 81) {
     clear();
     fillCanvasBackground();
   }
 })

 document.addEventListener("DOMContentLoaded", () => {
  coords = JSON.parse(localStorage.getItem('coords'));
  let timer = setInterval(function() {
    if(!coords.length) {
      clearInterval(timer);
      ctx.beginPath();
      return;
    }
    let crd = coords.shift(),
    e = {
      layerX: crd['0'],
      layerY: crd['1']
    };

    ctx.lineTo(e.layerX, e.layerY);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(e.layerX, e.layerY, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(e.layerX, e.layerY);
  }, 1)
});
// function drowAfterReloadPage () 

//  document.addEventListener("DOMContentLoaded", drowAfterReloadPage);

//  let clearPalette = document.getElementsByClassName('top-left-panel');

//  clearPalette.addEventListener('mousedown', function(event){
//   console.log(event)
//   // console.log(event.target)

//   let target = event.target;
//   if(target.classList.contains('menu--image-4')) {
//     clear();
//   }
//  })