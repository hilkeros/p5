var video;
var vScale = 16;
var slider;

var cols = 40;
var rows = 30;
var boxes = [];

function setup() {
	createCanvas(640, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.size(cols, rows);
	slider = createSlider(0, 255, 77);

	for (var y = 0; y < rows; y++) {
		for (var x = 0; x < cols; x++) {
			var box = createCheckbox();
			box.style('display', 'inline');
			box.parent('mirror');
			boxes.push(box);
		}
		var linebreak = createSpan('<br/>');
		linebreak.parent('mirror');
	}
}

function draw(){
	background(51);

	video.loadPixels();
	loadPixels();
	

	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {
			var index = (video.width - x + 1 + (y * video.width))*4;
			var r = video.pixels[index+0];
			var g = video.pixels[index+1];
			var b = video.pixels[index+2];
			
			var bright = (r+g+b)/3;

			var treshold = slider.value();

			var checkIndex = x + y * cols;

			if (bright > treshold) {
				fill(255);
				boxes[checkIndex].checked(false);
			} else {
				fill(0);
				boxes[checkIndex].checked(true);
			}

			noStroke();
			rectMode(CENTER);
			rect(x*vScale, y*vScale, vScale, vScale);
		}
	}
}