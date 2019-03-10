var video;
var btn;
var snapshots = [];
var counter = 0;

function setup() {
  createCanvas(800, 240);
  background(51);
  video = createCapture(VIDEO, ready);
  video.size(320, 240);
  // btn = createButton('snap');
  // btn.mouseClicked(takesnap);
}

var go = false;

function ready(){
	go = true;
}

function takesnap() {
	loadPixels();
	snapshots.push(video.get());
	// image(video, 0, 0);
}

function draw() {
	if (go) {
		snapshots.push(video.get());
	}
	var w = 80;
	var h = 60;
	var x = 0;
	var y = 0;
	for (var i = 0; i < snapshots.length; i++) {
		tint(255, 50);
		image(snapshots[i], x, y, w, h);
	}
}


