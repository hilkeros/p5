//TRYING TO BUILD SOMETHING WITH IMAGES CUT IN SQUARES

let images;
let imgSize = 2048;
let imageZoom = 500;
let scrollX, scrollY, canvasSize, graphics, breakpoint;
let activeImg, x, y;
let adding = false, makeup;
let myShader;

function preload(){
  myShader = loadShader('effect.vert', 'effect.frag');

  images = [ loadImage('../square_images/bodypt1.png'),
    loadImage('../square_images/bodypt2.png'),
    loadImage('../square_images/bodypt3.png')
  ];
}

function setup() {
  // shaders require WEBGL mode to work
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  // let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  noStroke();
}

function draw() {  
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;
  background(77);

  // desktop or phone: never leave a black part
  // if (width > height){
  //   canvasSize = width;
  // } else {
  //   canvasSize = height;
  // }
  canvasSize = height;

 
  // calculate which part of the image you need
  activeImg = Math.floor(scrollY / imgSize);
  if (activeImg > 2){ activeImg = 2};
  y = scrollY % imgSize;

  graphics = createGraphics(canvasSize, canvasSize);
  graphics.background(0);
  graphics.image(images[activeImg], 0, 0, canvasSize, canvasSize, scrollX, y, imageZoom, imageZoom);

  //if the image ended, also show a part of the next image
  breakpoint = imgSize - imageZoom;
  if (y > breakpoint && activeImg < 2){
    makeup = (y - breakpoint) * (canvasSize/imageZoom);
    graphics.image(images[activeImg +1], 0, graphics.height - makeup,
      canvasSize, canvasSize,
      scrollX, 0, imageZoom, imageZoom);
  } 

  // image(graphics, 0, 0, 500, 500);
  
  // showScrollPosition();

  function showScrollPosition(){
    textSize(32);
    fill(255);
    text('X: ' + scrollX + '/ Y: ' + scrollY, width - 300, 30);
  }

  // shader() sets the active shader with our shader
  shader(myShader);

  // let freq = map(mouseX, 0, width, 0, 10.0);
  // let amp = map(mouseY, 0, height, 0, 0.25);
  let freq = 17.0;
  let amp = 0.001;
  myShader.setUniform('tex0', graphics);
  myShader.setUniform('time', frameCount * 0.2);

  myShader.setUniform('frequency', freq);
  myShader.setUniform('amplitude', amp);
  // rect gives us some geometry on the screen
  rect(0,0,500,500);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}