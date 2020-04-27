let images;
let imgSize = 2048;
let activePart, activeImg;
let bodyShader;
let scrollX, scrollY, y, canvasSize;
let mixValue;

function preload(){
  oneimgShader = loadShader('js/effect.vert', 'js/1img.frag');
  twoimgShader = loadShader('js/effect.vert', 'js/2img.frag');

  images = [ loadImage('../01_PARTS2048/01HROSKI_01.png'),
    loadImage('../01_PARTS2048/01HROSKI_02.png'),
    loadImage('../01_PARTS2048/01HROSKI_03.png'),
    loadImage('../01_PARTS2048/01HROSKI_04.png'),
    loadImage('../01_PARTS2048/01HROSKI_05.png'),
    loadImage('../01_PARTS2048/01HROSKI_06.png'),
    loadImage('../01_PARTS2048/01HROSKI_07.png'),
    loadImage('../01_PARTS2048/01HROSKI_08.png'),
    loadImage('../01_PARTS2048/01HROSKI_09.png'),
    loadImage('../01_PARTS2048/01HROSKI_10.png')
  ];
}

function setup() {
  // setSquareCanvas();
  canvasSize = 500;
  let canvas = createCanvas(canvasSize, canvasSize, WEBGL);
  canvas.parent('canvas-holder');
  noStroke();
  
}

function draw(){
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;
  y = scrollY % 4096;
  mixValue = y / 4096;
  
  activePart = Math.floor(scrollY/4096);
  activeImg = Math.round(activePart/2);
  let OnlyOneImage = isEven(activePart);
  // console.log('part', activePart);
  // console.log('img', activeImg);

  bodyShader = OnlyOneImage ? oneimgShader : twoimgShader;
  shader(bodyShader);
  bodyShader.setUniform('tex0', images[activeImg]);
  if (!OnlyOneImage) bodyShader.setUniform('tex1', images[activeImg - 1]);
  bodyShader.setUniform('scrollX', scrollX);
  bodyShader.setUniform('scrollY', y);
  bodyShader.setUniform('mixValue', mixValue);
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

function isEven(n) {
  return n % 2 == 0;
}