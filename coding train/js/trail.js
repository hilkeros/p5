function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  particle = new Particle(400, 400);
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

	this.history = [];

	this.update = function() {
		this.x += random(-5, 5);
		this.y += random(-5, 5);

		let v = createVector(this.x, this.y);
		this.history.push(v);

		if (this.history.length > 25) {
			this.history.splice(0,1);	
		}
	}

	this.show = function() {
		stroke(0)
		fill(0, 150);
		ellipse(this.x, this.y, 30, 30);

		for (var i = 0; i < this.history.length; i++) {
			let pos = this.history[i];
			fill(random(255));
			//ellipse(pos.x, pos.y, 10, 10);
			ellipse(pos.x, pos.y, i, i);
		}
	}
}

