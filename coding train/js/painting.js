var video;
var vScale = 16;

var particles = [];

var slider;

function setup() {
	createCanvas(640, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(width/vScale, height/vScale);
	for (var i = 0; i < 100; i++) {
		particles[i] = new Particle(random(width), random(height));
	}
	slider = createSlider(0,255, 127);
	background(51);
	video.hide();
}

function draw(){
	video.loadPixels();
	for (var i = 0; i < particles.length; i++) {
		particles[i].update();
		particles[i].show();
	}
}



function Particle(x, y) {
	this.x = x;
	this.y = y;
	this.r = random(2, 16);

	this.update = function() {
		this.x += random(-10, 10);
		this.y += random(-10, 10);

		this.x = constrain(this.x, 0, width);
		this.y = constrain(this.y, 0, height);
	}

	this.show = function() {
		noStroke();
		var px = floor(this.x / vScale);
		var py = floor(this.y / vScale);
		var col = video.get(px, py);
		fill(col[0], col[1], col[2], slider.value());
		ellipse(this.x, this.y, this.r, this.r);
	}
}