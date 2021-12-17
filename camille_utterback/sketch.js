let handpose;
let hit;
let video;
let predictions = [];

const colors = {
  1: '#B1E4E6',
  2: '#80C7D1',
  3: '#9188E6',
  4: '#BBADFF',
  5: '#FFD6F6',
}

const history = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
}

const weight = 5;
const trailLength = 20;

const options = {
  flipHorizontal: true, // boolean value for if the video should be flipped, defaults to false
  maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector 
  detectionConfidence: 0.6, // [0, 1] threshold for discarding a prediction
  scoreThreshold: 0.5, // [0, 1] threshold for removing duplicate detections using "non-maximum suppression" 
  iouThreshold: 0.3, // [0, 1] threshold for deciding whether boxes overlap in non-maximum suppression
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => predictions = results)

  video.hide();

  frameRate(15);
}

const modelReady = () => console.log("Model ready!");

function draw() {
  image(video, 0, 0, width, height);

  drawFingertips();

  [1,2,3,4,5].forEach(digit => drawTrail(digit));
}

function drawTrail(digit) {
  noFill();
  strokeWeight(weight);
  stroke(colors[digit]);
  beginShape();
  for (let i = 0; i < history[digit].length; i++) {
    const points = history[digit][i];
    curveVertex(points.x[0], points.y[0]);
  }
  endShape();

  eraseTrail(digit);
}

function eraseTrail(digit) {
  if (history[digit].length > trailLength) {
    history[digit].splice(0, 1)
  }
}

function drawFingertips() {
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    const landmarks = prediction.landmarks;
    for (let j = 0; j < landmarks.length; j++) {
      // only draw fingertips
      if ([4, 8, 12, 16, 20].includes(j)) {
        const key = j/4;
        fill(colors[key]);
        const keypoint = landmarks[j];
        history[key].push(createVector([keypoint[0]], [keypoint[1]]));
        noStroke();
        // ellipse(keypoint[0], keypoint[1], 10, 10);
      }
    }
  }
}
