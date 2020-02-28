let images;
let imgSize = 2048;
let activeImg;
let bodyShader;
let scrollX, scrollY, y, canvasSize;
let mixValue;

function preload(){
  bodyShader = loadShader('js/effect.vert', 'js/effect.frag');
  

  // images = [ loadImage('../01_PARTS2048/01HROSKI_01.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_02.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_03.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_04.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_05.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_06.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_07.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_08.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_09.png'),
  //   loadImage('../01_PARTS2048/01HROSKI_10.png')
  // ];
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
  mixValue = scrollY/imgSize;
  y = scrollY % 5000;
  
  activeImg = Math.floor(scrollY/5000);
  if (activeImg > 9){ activeImg = 9};
  
  // console.log(scrollY);
  // console.log(activeImg);

  shader(bodyShader);
  bodyShader.setUniform('tex0', images[activeImg]);
  bodyShader.setUniform('tex1', images[activeImg + 1]);
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