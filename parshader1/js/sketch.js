let bodyImg;
let bodyShader;
let canvasSize;

function preload(){
  bodyShader = loadShader('js/effect.vert', 'js/effect.frag');
  // bodyImg = loadImage('../square_images/numberedpattern.png');
  bodyImg = loadImage('../square_images/bodypt1.png');
}

function setup() {
  setSquareCanvas();
  let canvas = createCanvas(canvasSize, canvasSize, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();
  
}

function draw(){
  shader(bodyShader);
  bodyShader.setUniform('tex0', bodyImg);
  bodyShader.setUniform('scrollX', window.pageXOffset);
  bodyShader.setUniform('scrollY', window.pageYOffset);
  rect(0,0,width, height);
}

function windowResized(){
  setSquareCanvas();
  resizeCanvas(canvasSize, canvasSize);
}

function setSquareCanvas(){
  if (windowWidth > windowHeight){
    canvasSize = windowWidth;
  } else {
    canvasSize = windowHeight;
  }
  
}