function connect() {
  navigator.requestMIDIAccess()
  .then(
    (midi) => midiReady(midi),
    (err) => console.log('Something went wrong', err));
}

function midiReady(midi) {
  // Also react to device changes.
  midi.addEventListener('statechange', (event) => initDevices(event.target));
  initDevices(midi); // see the next section!
}

function initDevices(midi) {
  // Reset.
  midiIn = [];
  midiOut = [];
  
  // MIDI devices that send you data.
  const inputs = midi.inputs.values();
  for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
    midiIn.push(input.value);
  }
  
  // MIDI devices that you send data to.
  const outputs = midi.outputs.values();
  for (let output = outputs.next(); output && !output.done; output = outputs.next()) {
    midiOut.push(output.value);
  }
  
  // displayDevices();
  startListening();
}


// Start listening to MIDI messages.
function startListening() {
  for (const input of midiIn) {
    // input.addEventListener('midimessage', midiMessageReceived);
  }
}

function sendMidiMessage(pitch, velocity, duration) {
  const NOTE_ON = 144;
  const NOTE_OFF = 128;
  
  const device = midiOut[0];
  const msgOn = [NOTE_ON, pitch, velocity];
  const msgOff = [NOTE_OFF, pitch, velocity];
  
  // First send the note on;
  device.send(msgOn); 
    
  // Then send the note off. You can send this separately if you want 
  // (i.e. when the button is released)
  device.send(msgOff, Date.now() + duration); 
}

connect();