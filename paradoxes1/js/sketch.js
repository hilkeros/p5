let bigBody;
let mySound;
let imageXOffset = 400;
let imageYOffset = 500;
let xNoise = 0;
let yNoise = 0;
let xoff = 0;
let yoff = 0;
let selfScroll = 0;
let selfScrollSpeed = 0.4;
let imageZoom = 500;


function preload(){
  bigBody = loadImage('images/body.png');
  mySound = loadSound('sounds/paradoxes.mp3');
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  mySound.play();
}

function draw(){
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;

  background(0);
  let x = imageXOffset + scrollX + xNoise;
  let y = imageYOffset + scrollY + yNoise + selfScroll;

  image(bigBody, 0, 0, width, width, x, y, imageZoom, imageZoom);

  //xNoise += random(-2, 2);
  //yNoise += random(-2, 2);
  
  let noisyX = map(noise(xoff), 0, 1, -0.5, 0.5);
  xNoise += noisyX;
  xoff += 0.02;
  let noisyY = map(noise(yoff), 0, 1, -0.5, 0.5);
  yNoise += noisyY;
  yoff += 0.02;
   

  selfScroll += selfScrollSpeed;

  imageZoom = imageZoom + (scrollX/2000);

  // showScrollPosition();
  // showSoundAnalysis();
 


}

function setAlphaByAmplitude(){
  alpha = amp.getLevel() * 2;
  // console.log(alpha);
}

function showScrollPosition(){
  textSize(32);
  fill(255);
  text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
}
