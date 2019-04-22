let bigBody;
let imageSize;
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
let alpha = 0;

let amp;
let fft;
let sumLow = 0;
let sumMid = 0;
let sumHigh = 0;

let playing = false;

function preload(){
  bigBody = loadImage('images/body.png');
  mySound = loadSound('sounds/paradoxes.mp3');
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  background(0);
  // amp = new p5.Amplitude();
  fft = new p5.FFT(0.9, 64);
}

function mouseClicked(){
  if (playing == false) {
    mySound.play();
    playing = true;
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
  let x = imageXOffset + scrollX + xNoise;
  let y = imageYOffset + scrollY + yNoise + selfScroll;

  // desktop or phone: never leave a black part
  if (width > height){
    imageSize = width;
  } else {
    imageSize = height;
  }


  image(bigBody, 0, 0, imageSize, imageSize, x, y, imageZoom, imageZoom);

  //xNoise += random(-2, 2);
  //yNoise += random(-2, 2);
  
  //caculate the noise movement
  let noisyX = map(noise(xoff), 0, 1, -0.5, 0.5);
  xNoise += noisyX;
  xoff += 0.02;
  let noisyY = map(noise(yoff), 0, 1, -0.5, 0.5);
  yNoise += noisyY;
  yoff += 0.02;
   
  // scroll down a bit automatically
  selfScroll += selfScrollSpeed;

  // zoom out if we move far to the right;
  imageZoom = imageZoom + (scrollX/2000);

  // colored overlay is visible depending on the music
  // setAlphaByAmplitude();
  setAlphaBySpectrum();
  noStroke();
  fill(251, 152, 156, alpha);
  rect(0, 0, width, height);

  // showScrollPosition();
  // showSoundAnalysis();

  if (playing == false) {
    textSize(16);
    fill(255);
    text('Click anywhere to start the music. Scroll to discover the world', 50, 50);
  }  
}

function setAlphaByAmplitude(){
  alpha = amp.getLevel() * 500 - 50;
  // console.log(alpha);
}

function setAlphaBySpectrum(){
  let spectrum = fft.analyze(128);
  let third = spectrum.length / 3;

  for(i = 0; i < spectrum.length; i++){
    
    if (i < third) {
    sumLow = sumLow + spectrum[i];
    } else if (i < 2 * third){
    sumMid = sumMid + spectrum[i];
    } else {
    sumHigh = sumHigh + spectrum[i];
    }
  }
  let averageLow = sumLow / third;
  let averageMid = sumMid / third;
  let averageHigh = sumHigh / third;
  let sumBeat = averageLow + averageHigh/1.5;
  alpha = map(sumBeat, 100, 400, 0, 250) - 100;
  if (alpha > 50) {
    alpha += 80;
  }
  // console.log(alpha);
  sumLow = 0;
  sumMid = 0;
  sumHigh = 0;
}

function showScrollPosition(){
  textSize(32);
  fill(255);
  text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
}


function showSoundAnalysis(){
  let spectrum = fft.analyze();
  noStroke();
  fill(0,255,0); // spectrum is green
  for (let i = 0; i< spectrum.length; i++){
    let xSpectrum = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(xSpectrum, height, width / spectrum.length, h )
  }

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(255,0,0); // waveform is red
  strokeWeight(1);
  for (let i = 0; i< waveform.length; i++){
    let xWaveform = map(i, 0, waveform.length, 0, width);
    let yWaveform = map( waveform[i], -1, 1, 0, height);
    vertex(xWaveform,yWaveform);
  }
  endShape();

  // waveformNoiseX = map( waveform, -1, 1, -10, 10);
  // xNoise = xNoise + waveformNoiseX;
}