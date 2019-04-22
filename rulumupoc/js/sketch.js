let scrollX;
let scrollY;
let song;
let mic;
let amp;
let triggered = false;
let triggered2 = false;

function preload() {
  data = loadJSON('json/wac.json')
}
function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-holder');
  background(0);
  song = new Song(data);
  Tone.Transport.bpm.value = 80;

  mic = new p5.AudioIn();
  amp = new p5.Amplitude();

  analyser = new Tone.Analyser;
  Tone.Master.chain(analyser);
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

  let vol = amp.getLevel();
  ellipse(100,100,200, vol * 200);
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
  song.startScene(0);
  // if (!triggered) {
  //   song.startPartInSession(0, 0);
  //   song.startPartInSession(1, 0);
  //   print('triggered');
  // }
  // triggered = true;
}


function scene3(){
  background(255, 230, 0);
  song.startScene(1);
  // if (!triggered2) {
  //   song.startPartInSession(0, 1);
  //   song.startPartInSession(1, 1);
  // }
  // triggered2 = true;
}

class Song {
  constructor(json_data) {
    this.tracks = json_data.ableton.tracks;
    this.instruments = [];
    this.scenes_switches = [];
    
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
        instrument.parts[j].loop = true;
      }

      //add instrument to song
      this.instruments.push(instrument);
    }
    //set all scene triggers to false
    for(let i = 0; i < this.instruments[0].parts.length; i++) {
      this.scenes_switches[i] = false;
    }
  }

  startPart(instrument_index, part_index) {
    let part = this.instruments[instrument_index].parts[part_index]
    part.start(0);
    print('part started');  
  }

  startPartInSession(instrument_index, part_index) {
    let instrument = this.instruments[instrument_index];
    //start the part with e part_index and stop all other parts of this instrument
    for (let p = 0; p < instrument.parts.length; p++) {
      if (part_index == p) {
        instrument.parts[p].start(0);
        console.log('started in session');
      } else {
        instrument.parts[p].stop();
      }
    }
  }

  startScene(index = 0) {
    if (this.scenes_switches[index] == false) {
      
      for ( let s = 0; s < this.scenes_switches.length; s++){
        if (s == index) {
          this.scenes_switches[s] = true;
        } else {
          this.scenes_switches[s] = false;
        }
      }
      for (let i = 0; i < this.instruments.length; i++) {
        this.startPartInSession(i, index);  
      }
    }
  }
}



function to_tone_values(events) {
  processed = events.map(function(event) { return {time: event.time * Tone.Time('4n'), 
    note: event.note, duration : event.duration * Tone.Time('4n'), velocity: event.velocity }});
  return processed;
}