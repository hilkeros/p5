let scrollX;
let scrollY;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	scrollX = window.pageXOffset;
	scrollY = window.pageYOffset;

	background(0);
	showScrollPosition();
	drawCircle(scrollY/20);
	drawSquare(scrollX/20);
}

function showScrollPosition(){
	textSize(32);
	fill(255);
	text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
}

function drawCircle(diameter){
	fill(255);
	ellipse(200, 200, diameter, diameter);
}

function drawSquare(width){
	fill(255,0,0);
	rect(600, 400, width, width);
}