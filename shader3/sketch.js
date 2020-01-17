let camShader;

let smallBody;
let bigBody;
let graphics;

let imageSize;
let imageXOffset = 400;
let imageYOffset = 500;

let xNoise = 0;
let yNoise = 0;
let xoff = 0;
let yoff = 0;
let selfScroll = 0;
let selfScrollSpeed = 0.14;
let imageZoom = 500;

var loaded = false;
// var myPromise = new Promise(function(resolve, reject){
//   bigBody = new Image();
//   bigBody.addEventListener('load', e => resolve(bigBody));
//   bigBody.addEventListener('error', function(){
//         reject(new Error('Failed to load image'));
//   });
//   bigBody.src = '../body.png';
// });

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
  bigBody = loadImage('../bodycut1.png');
  smallBody = loadImage('../bodysmall2.png');
}

function setup() {
  // shaders require WEBGL mode to work
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();
  // background(0);

  // await myPromise;
  loaded = true;
}

function draw() {  
  
  if (loaded){
    scrollX = window.pageXOffset;
    scrollY = window.pageYOffset;

    // background(0);

    // desktop or phone: never leave a black part
    if (width > height){
      imageSize = width;
    } else {
      imageSize = height;
    }

    let x = imageXOffset + scrollX + xNoise;
    let y = imageYOffset + scrollY + yNoise + selfScroll;

    // shader() sets the active shader with our shader
    shader(camShader);
    background(0);

    graphics = createGraphics(imageSize, imageSize);
    graphics.background(0);
    graphics.image(bigBody, 0, 0, imageSize, imageSize, x, y, imageZoom, imageZoom);
    //caculate the noise movement
    let noisyX = map(noise(xoff), 0, 1, -0.05, 0.05);
    xNoise += noisyX;
    xoff += 0.02;
    let noisyY = map(noise(yoff), 0, 1, -0.05, 0.05);
    yNoise += noisyY;
    yoff += 0.02;
     
    // scroll down a bit automatically
    // selfScroll += selfScrollSpeed;

    // lets just send the cam to our shader as a uniform
    camShader.setUniform('tex0', graphics);

    // send a slow frameCount to the shader as a time variable
    camShader.setUniform('time', frameCount * 0.3);

    // // lets map the mouseX to frequency and mouseY to amplitude
    // // try playing with these to get a more or less distorted effect
    // // 10 and 0.25 are just magic numbers that I thought looked good
    let freq = map(mouseX, 0, width, 0, 30.0);
    let amp = map(mouseY, 0, height, 0, 0.025);


    // // send the two values to the shader
    camShader.setUniform('frequency', freq);
    camShader.setUniform('amplitude', amp);
    camShader.setUniform('perlin', xNoise);

    // // rect gives us some geometry on the screen
    rect(0, 0, 400, 400);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}