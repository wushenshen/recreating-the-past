let mic, fft, audioContext, amplitude;
let spaceBetweenLines;
let volHistory = [];

const isRecording = (audioContext) => audioContext.state === "running"
const periods = 256;
const mapMax = 1.0;

let mode = 'LINE'

function setup() {
  const canvas = createCanvas(710, 800);
  canvas.parent("recreation")
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.9, periods);
  fft.setInput(mic);
  angleMode(DEGREES);
  spaceBetweenLines = width / periods;
  colorMode(RGB, 222);
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

function draw() {
  background(0);
  textAlign(CENTER, CENTER);
  stroke(255);
  text(isRecording(audioContext) ? "Recording" : "Tap to start", width / 2, 20);

  const volume = mic.getLevel() *1.5;
  console.log('mic.getLevel()', mic.getLevel())
  // ellipse(width/2, height/2, volume * 500, volume * 500);

  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    stroke(255);
    fill(i, 255, 255);
    let amp = spectrum[i];
    let y = map(amp, 0, 256, height, 0);
    // line(i * spaceBetweenLines, height, i *spaceBetweenLines, y);
    rect(i * spaceBetweenLines, y, spaceBetweenLines, height - y);
  }

  var level = amplitude.getLevel() * 10;

  // map ellipse height
  var ellipseHeight = map(level, 0, mapMax, height, 0);
  ellipse(width/2, ellipseHeight, 100, 100);

  // Volume history stuff
  if (isRecording(audioContext)) {
    volHistory.push(volume);

    if (mode === 'LINE') {
      noFill();
      beginShape();
      for (let i = 0; i < volHistory.length; i++) {
        stroke('#fae');
        let y = map(volHistory[i], 0, 1, height - 5, 0);
        vertex(i, y);
      }
      endShape();
    }

    if (mode === 'CIRCLE') {
      translate(width / 2, height / 2)
      noFill();
      beginShape();
      for (let i = 0; i < volHistory.length; i++) {
        stroke(255);
        let r = map(volHistory[i], 0, 1, 10, 300);
        let x = r * cos(i);
        let y = r * sin(i);
        vertex(x, y);
      }
      endShape();
    }

    if (volHistory.length > width) {
      volHistory.splice(0, 1)
    }
  }
}

function mousePressed() {
  audioContext.resume();
  mode = mode === 'LINE' ? 'CIRCLE' : 'LINE';
}