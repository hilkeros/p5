let images;
let imgSize = 2048;
let activeImg;
let bodyShader;
let scrollX, scrollY, canvasSize;

function preload(){
  bodyShader = loadShader('js/effect.vert', 'js/effect.frag');
  images = [ loadImage('../square_images/bodypt1.png'),
    loadImage('../square_images/bodypt2.png'),
    loadImage('../square_images/bodypt3.png')
  ];
}

function setup() {
  setSquareCanvas();
  let canvas = createCanvas(canvasSize, canvasSize, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();
  
}

function draw(){
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;

  activeImg = Math.floor(scrollY * 0.4/ imgSize);
  if (activeImg > 2){ activeImg = 2};

  shader(bodyShader);
  bodyShader.setUniform('tex0', images[activeImg]);
  bodyShader.setUniform('scrollX', scrollX);
  bodyShader.setUniform('scrollY', scrollY);
  bodyShader.setUniform('time', frameCount * 0.2);
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