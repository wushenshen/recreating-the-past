let handpose;
let hit;
let video;
let predictions = [];

const weight = 5;
const trailLength = 20;

const digits = {
  1: { color: '#B1E4E6', history: [] }, // thumb
  2: { color: '#80C7D1', history: [] }, // index
  3: { color: '#9188E6', history: [] }, // middle
  4: { color: '#BBADFF', history: [] }, // ring
  5: { color: '#FFD6F6', history: [] }, // pinkie
}

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
  video.hide();

  handpose = ml5.handpose(video);
  handpose.on("predict", results => predictions = results)

  frameRate(15);
}

function draw() {
  image(video, 0, 0, width, height);
  drawFingertips();
  Object.values(digits).forEach(digit => drawTrail(digit));
}

function drawFingertips() {
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];
    const landmarks = prediction.landmarks;
    for (let j = 0; j < landmarks.length; j++) {
      const fingertips = [4, 8, 12, 16, 20]; // only draw fingertips, 
      if (fingertips.includes(j)) {
        const digit = digits[j/4];
        fill(digit.color);
        const keypoint = landmarks[j];
        digit.history.push(createVector([keypoint[0]], [keypoint[1]]));
        noStroke();
      }
    }
  }
}

// @param digit { color: '#000000', history: [] }
function drawTrail(digit) {
  noFill();
  strokeWeight(weight);
  stroke(digit.color);
  beginShape();
  for (let i = 0; i < digit.history.length; i++) {
    const points = digit.history[i];
    curveVertex(points.x[0], points.y[0]);
  }
  endShape();
  
  eraseTrail(digit);
}

function eraseTrail(digit) {
  if (digit.history.length > trailLength) {
    digit.history.splice(0, 1)
  }
}
