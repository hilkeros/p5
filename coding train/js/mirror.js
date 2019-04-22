var video;
var vScale = 16;


function setup() {
	// createCanvas(320, 240);
	createCanvas(640, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	//video.size(320, 240);
	video.size(width/vScale, height/vScale);
}

function draw(){
	background(51);

	video.loadPixels();
	loadPixels();
	// for (var y = 0; y < height; y++) {
	// 	for (var x = 0; x < width; x++) {
	// 		var index = (x + y * width) * 4;
	// 		var r = video.pixels[index+0];
	// 		var g = video.pixels[index+1];
	// 		var b = video.pixels[index+2];

	// 		var bright = (r+g+b)/3;

	// 		pixels[index+0] = bright;
	// 		pixels[index+1] = bright;
	// 		pixels[index+2] = bright;
	// 		pixels[index+3] = 255;


	// 	}
	// }
	
	//updatePixels();

	for (var y = 0; y < video.height; y++) {
		for (var x = 0; x < video.width; x++) {
			//var index = (x + y * video.width)*4;
			//really mirroring is making the first pixel the last one
			var index = (video.width - x + 1 + (y * video.width))*4;
			var r = video.pixels[index+0];
			var g = video.pixels[index+1];
			var b = video.pixels[index+2];
			
			var bright = (r+g+b)/3;

			// fill(bright);
			// rect(x*vScale, y*vScale, vScale, vScale);

			var w = map(bright, 0, 255, 0, vScale);
			noStroke();
			fill(255);
			rectMode(CENTER);
			rect(x*vScale, y*vScale, w, w);
		}
	}
}