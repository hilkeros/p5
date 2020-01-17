let scrollX;
let scrollY;

let angleX = 1;
let angleY = 2;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  noStroke();
  angleMode(DEGREES);
  rectMode(CENTER);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	scrollX = window.pageXOffset;
	scrollY = window.pageYOffset;

	background(0);
	showScrollPosition();
	scale(mouseX / 500);
	spinningEllipse(angleX);
	spinningRect(angleY);

	angleX = angleX + 1 + (scrollX / 500);
	angleY = angleY + 1 + (scrollY / 500);
}

function showScrollPosition(){
	textSize(32);
	fill(255);
	text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
}

function spinningRect(angle) {
	push();
	translate(200,200);
	rotate(angle);
	stroke(255);
	fill(100);
	rect(0, 0, 100, 50);
	pop();
}

function spinningEllipse(angle) {
	push();
	translate(500,500);
	rotate(-angle);
	stroke(255);
	fill(200, 100, 100);
	ellipse(0, 0, 50, 100);
	pop();
}