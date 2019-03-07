var video;

var vScale = 16;

function setup() {
  createCanvas(320, 240);
  pixelDensity(1);
  // video = createCapture(VIDEO);
  video = createVideo('assets/leuchtkoerper.mp4');
  video.size(320, 240);
  video.play;
}

function draw() {
  background(51);

  video.loadPixels();
  loadPixels;
  // for (var y = 0; y < video.height; y++) {
  //   for (var x = 0; x < video.width; x++) {
  //     var index = (video.width - x + 1 + (y * video.width))*4;
  //     var r = video.pixels[index+0];
  //     var g = video.pixels[index+1];
  //     var b = video.pixels[index+2];

  //     var bright = (r+g+b)/3;

  //     pixels[index+0] = video.pixels[index+0];
  //     pixels[index+1] = video.pixels[index+1];
  //     pixels[index+2] = video.pixels[index+2];
  //     pixels[index+3] = 255;

  //   }
  // }
  //updatePixels();
 
}