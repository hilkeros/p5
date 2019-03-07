let fill_value = 0;
let synth = new Tone.Synth().toMaster();

//pass in an array of events
let part = new Tone.Part(function(time, event){
	//the events will be given to the callback with the time they occur
	synth.triggerAttackRelease(event.note, event.dur, time)
}, [{ time : 0, note : 'C4', dur : '4n'},
	{ time : {'4n' : 1, '8n' : 1}, note : 'E4', dur : '8n'},
	{ time : '2n', note : 'G4', dur : '16n'},
	{ time : {'2n' : 1, '8t' : 1}, note : 'B4', dur : '4n'}]);

//start the part at the beginning of the Transport's timeline
part.start(0);

//loop the part
part.loop = true;
part.loopEnd = '1m';


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(120);
  fill(fill_value);
  rect(25, 24, 50, 50);
  ellipse(mouseX, mouseY, 33, 33);
  if (mouseY > 200) {
  	synth.triggerAttackRelease('C6', '8n');
  	fill_value = color(255, 204, 0);
  }
}

function mouseClicked() {
  if (fill_value === 0) {
    fill_value = 255;
    // synth.triggerAttackRelease('C4', '8n');
    Tone.Transport.start();

  } else {
    fill_value = 0;
    Tone.Transport.stop();
  }
}