let graphics;
let x = 100;
let y = 100;
let angle = 0;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  pixelDensity(1);
  graphics = createGraphics(500, 500);
  graphics.background(100);
}

function draw() {
	background(0);
	// if (mouseIsPressed) {
		graphics.fill(255);
		graphics.stroke(255);
		graphics.ellipse(x, y, 64);
		x += random(-5, 5);
		y += random(-5, 5);
	// }

	// image(graphics, 0, 0);
	// image(graphics, 600, 0);

	image(graphics, 0, 0);
	push();
	translate(400, 400);
	rotate(angle);
	tint(0,255,0);
	image(graphics, 0, 0);
	pop();
	angle += 0.03;




	// fill(255, 0, 255);
	// ellipse(mouseX, mouseY, 32);
}