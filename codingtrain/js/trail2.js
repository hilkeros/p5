let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	particles.push(new Particle(mouseX, mouseY));
}

function draw() {
	background(200);
	for (let i = 0; i < particles.length; i++) {
  	particles[i].update();
  	particles[i].show();
  }
}

function Particle(x, y) {
	this.x = x;
	this.y = y;

	this.history = [];

	this.update = function() {
		this.x += random(-10, 10);
		this.y += random(-10, 10);

		let v = createVector(this.x, this.y);
		this.history.push(v);

		if (this.history.length > 100) {
			this.history.splice(0,1);	
		}
	}

	this.show = function() {
		stroke(0);
		fill(0, 150);
		ellipse(this.x, this.y, 30, 30);

		for (let i = 0; i < this.history.length; i++) {
			let pos = this.history[i];
			fill(random(255));
			//ellipse(pos.x, pos.y, 10, 10);
			ellipse(pos.x, pos.y, i, i);
		}
	}
}

