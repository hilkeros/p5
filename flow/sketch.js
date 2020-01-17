let bigBody;
let xNoise = 0;
let yNoise = 0;
let xoff = 0;
let yoff = 0;
let selfScroll = 0;
let selfScrollSpeed = 0.2;
let imageZoom = 400;
let x,y;
let loopCounter = 0;

let currentLoop = 1;
let particles = [];

function preload(){
  bigBody = loadImage('images/flower1.jpg');
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  background(0);
}


function mousePressed() {
  particles.push(new Particle(mouseX, mouseY));
}

function keyTyped() {
  if (key === 'f'){
    fullScreenToggler()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  
  // get the scroll position
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;

  background(0);
  // select a small part of the big body
  // a bit of offset (to remove the black), the scroll position and a bit of noise movement
  // in the Y direction we add a bit off self-scroll
  
  x = (scrollX % (bigBody.width - canvas.width)) + xNoise + selfScroll/4;
  y = (scrollY % (bigBody.height - canvas.height)) + yNoise + selfScroll;

  // desktop or phone: never leave a black part
  if (width > height){
    imageSize = width;
  } else {
    imageSize = height;
  }

  image(bigBody, 0, 0, imageSize, imageSize, x, y % (bigBody.height - canvas.height), imageZoom, imageZoom);

 
  //caculate the noise movement
  let noisyX = map(noise(xoff), 0, 1, -0.5, 0.5);
  xNoise += noisyX;
  xoff += 0.02;
  let noisyY = map(noise(yoff), 0, 1, -0.5, 0.5);
  yNoise += noisyY;
  yoff += 0.02;
   
  // scroll down a bit automatically
  selfScroll += selfScrollSpeed;


  
  if (particles){
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].show();

      if (particles[i].size > 400){
        particles.splice(i);
      }
    }
  }

  loopCounter = Math.floor((scrollY + y) * 2 / bigBody.height);
  // showScrollPosition();
  loopHandler(loopCounter);

}

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = 0;
  this.alpha = 130;

  this.update = function() {
    this.size = this.size + 1;
    this.alpha = this.alpha - 0.5;
  }

  this.show = function() {
    noStroke();
    fill(90, 0, 0, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }
}



function showScrollPosition(){
  textSize(32);
  fill(255);
  text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
  text('iX: ' + round(x) + '/ iY: ' + round(y), 30, 100);
  text('loop ' + loopCounter, 30, 170);
}

function loopHandler(loopCount){
  if (loopCount != currentLoop) {
    currentLoop = loopCount;
    console.log('scene ' + currentLoop);
    sendMidiMessage(currentLoop + 60, 127, 100);
  }
}

function fullScreenToggler(){
  var viewFullScreen = document.getElementById("full-screen-container");
  if(document.webkitFullscreenElement) {
        document.webkitCancelFullScreen();
      
  }else {
        viewFullScreen.webkitRequestFullScreen();
  };
}


