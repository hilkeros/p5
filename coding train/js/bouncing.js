let gravity = 0.1;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  particle = new Particle(100, 100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(200);
	particle.update();
	particle.show();
}

function Particle(x, y) {
	this.x = x;
	this.y = y;

	this.yspeed = 0;

	this.update = function() {
		this.y += this.yspeed;
		this.yspeed += gravity;

		if (this.y > height) {
			this.y = height;
			this.yspeed *= -0.7;
		}
	}

	this.show = function() {
		fill(0);
		ellipse(this.x, this.y, 30, 30);
	}
}

