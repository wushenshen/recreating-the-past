const CANVAS_COLOR = "#f2efe8"
const LINE_COLOR = "#d0dccb"
const OVER_COLOR = "#816b5e"
const UNDER_COLOR = CANVAS_COLOR
const COUNT = 20;
const GRID_SIZE = 18;
const PATTERN_SIZE = 12;
const OVER = true;
const UNDER = false;

const PATTERN1 = [OVER, UNDER, OVER, UNDER, OVER, UNDER, OVER, UNDER, OVER, UNDER, OVER, UNDER]
const PATTERN2 = [UNDER, OVER, OVER, UNDER, OVER, OVER, UNDER, OVER, OVER, UNDER, OVER, OVER]
const PATTERN3 = [UNDER, OVER, OVER, OVER, UNDER, OVER, OVER, OVER, UNDER, OVER, OVER, OVER]
const pattern = PATTERN1

let x = COUNT * 3;
let y = COUNT * 3;
let i = 0;
let rowsDrawn = 0;
let first;
let last;

const drawGrid = (startX, startY) => {
  let x = startX;
  let y = startY;

  stroke(LINE_COLOR)

  for (let i = 0; i <= GRID_SIZE; i++) {
    line(x, y, x, COUNT * GRID_SIZE)
    x += COUNT
  }

  x = startX;

  for (let i = 0; i <= GRID_SIZE; i++) {
    line(x, y, COUNT * GRID_SIZE, y)
    y += COUNT
  }
}

const drawRow = () => {
  if (rowsDrawn === PATTERN_SIZE) return

  for (let i = 0; i < pattern.length; i++) {
    drawSquare(x + (COUNT * i), y, COUNT, pattern[i])
  }

  first = pattern.shift();
  pattern.push(first)
  y += COUNT
  rowsDrawn++
}

const drawSquare = (x, y, width, over) => {
  if (over) {
    fill(OVER_COLOR)
    stroke(OVER_COLOR)
  }
  else {
    fill(UNDER_COLOR)
    stroke(UNDER_COLOR)
  }
  rect(x, y, width, width)
}

function setup() {
  const canvas = createCanvas(COUNT * GRID_SIZE, COUNT * GRID_SIZE);
  background(CANVAS_COLOR);
  noSmooth();
  canvas.parent('recreation');
  frameRate(3)
  drawGrid(0, 0)
}

function draw() {
  drawRow()
}
