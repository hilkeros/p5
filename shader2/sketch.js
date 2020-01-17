// in this sketch the camera image will be distorted by using a sine wave function in the shader

// the shader variable
let camShader;
let smallBody;
let bigBody;

let imageSize;
let imageXOffset = 0;
let imageYOffset = 0;

let xNoise = 0;
let yNoise = 0;
let xoff = 0;
let yoff = 0;
let selfScroll = 0;
let selfScrollSpeed = 0.4;
let imageZoom = 500;

let fragment

// the camera variable
let cam;

function preload(){
  // load the shader
  camShader = loadShader('effect.vert', 'effect.frag');
  // bigBody = loadImage('../body.png');
  smallBody = loadImage('../bodysmall.png');
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // initialize the webcam at the window size
  // cam = createCapture(VIDEO);
  // cam.size(windowWidth, windowHeight);

  // // hide the html element that createCapture adds to the screen
  // cam.hide();

}

function draw() {  
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;

  // background(0);
  let x = imageXOffset + scrollX + xNoise;
  let y = imageYOffset + scrollY + yNoise + selfScroll;

  // image(smallBody, 0, 0, imageSize, imageSize, x, y, imageZoom, imageZoom);

  // shader() sets the active shader with our shader
  shader(camShader);

  // lets just send the cam to our shader as a uniform
  camShader.setUniform('tex0', smallBody);

  // send a slow frameCount to the shader as a time variable
  camShader.setUniform('time', frameCount * 0.03);

  // lets map the mouseX to frequency and mouseY to amplitude
  // try playing with these to get a more or less distorted effect
  // 10 and 0.25 are just magic numbers that I thought looked good
  let freq = map(mouseX, 0, width, 0, 30.0);
  let amp = map(mouseY, 0, height, 0, 0.025);

  // send the two values to the shader
  camShader.setUniform('frequency', freq);
  camShader.setUniform('amplitude', amp);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}