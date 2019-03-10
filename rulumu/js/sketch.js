let scrollX;
let scrollY;
let song;
let triggered = false;

function preload() {
  data = loadJSON('json/wac.json')
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  background(0);
  song = new Song(data);
  Tone.Transport.bpm.value = 80;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  scrollX = window.pageXOffset;
  scrollY = window.pageYOffset;
  
  if (scrollY < 1000) {
    scene1();
  } else if (scrollY < 2000) {
    scene2();
  } else {
    scene3();
  }

  showScrollPosition();
}

function showScrollPosition(){
  textSize(32);
  fill(255);
  text('X: ' + scrollX + '/ Y: ' + scrollY, 30, 30);
}

function scene1(){
  background(0);
}


function scene2(){
  background(255, 0, 0);
  Tone.Transport.start();
  if (!triggered) {
    song.startPart(0, 0);
    print('triggered');
  }
  triggered = true;
}


// function scene3(){
//   background(255, 230, 0);
//   let triggered = false;
//   if (!triggered) {
//     song.startPart(1, 0);
//   }
//   triggered = true;
// }

class Song {
  constructor(json_data) {
    this.tracks = json_data.ableton.tracks;
    this.instruments = [];
    for (let i = 0; i < this.tracks.length; i++) {
      
      //set up instruments
      let mapping = this.tracks[i].drum_rack;
      let instrument = new Tone.Sampler(mapping, function(){
      }, 'sounds/wac/');

      instrument.toMaster();

      //set up parts
      instrument.parts = [];
      let events = this.tracks[i].events;
      for (let j = 0; j < events.length; j++) {
        let part_events = to_tone_values(events[j]);
        instrument.parts[j] = new Tone.Part(function(time, event) {
          instrument.triggerAttackRelease(event.note, event.duration, time)
        }, part_events, true)
      }

      //add instrument to song
      this.instruments.push(instrument);
    }
  }

  startPart(instrument_index, part_index) {
    let part = this.instruments[instrument_index].parts[part_index]
    part.loop = true;
    part.start('@1m');
    print('part started');  
  }
}



function to_tone_values(events) {
  processed = events.map(function(event) { return {time: event.time * Tone.Time('4n'), 
    note: event.note, duration : event.duration * Tone.Time('4n'), velocity: event.velocity }});
  return processed;
}