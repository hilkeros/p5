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
let alpha = 0.1;

let amp;
let fft;


function preload(){
  bigBody = loadImage('images/body.png');
  mySound = loadSound('sounds/paradoxes.mp3');
}
function setup(){
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  mySound.play();
  amp = new p5.Amplitude();
  // fft = new p5.FFT();
}

function draw(){
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;

  setAlphaByAmplitude();
  fill(320, 0, 14, alpha);
  rect(0, 0, width, height);

  // background(0);
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