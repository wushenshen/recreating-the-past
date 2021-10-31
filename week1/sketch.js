// Config variables
const numColumns = 4;
const numRows = 6;
const width = 2;
const scale = 26;
const distanceBetween = 8;
const offset = scale * width + distanceBetween;
const randomness = 1/10;
const leftMargin = 69;
const topMargin = 98;
const canvasWidth = (leftMargin * 2) + 3 * (numColumns * offset)
const canvasHeight = (topMargin * 2) + (numRows * offset)
const canvasRgb = [242, 236, 223]
const gridRgb = [234, 228, 216]
const pointRgb = [117, 108, 95]
const lineRgb = [99, 89, 83]
const textRgb = [181, 175, 162]

const options = {
  scale,
  width,
  distanceBetween,
  offset,
  numColumns,
}

const getCanvasWidth = () => canvasWidth

const getPointsForRow = (row, points) => {
  return {
    0: [
      [points[0], points[2], points[6], points[8]],
      [points[0], points[2], points[6], points[8]],
      [points[0], points[2], points[6], points[8]],
      [points[0], points[2], points[6], points[8]],
    ],
    1: [
      [points[0], points[2], points[6], points[8], points[3], points[5]],
      [points[0], points[2], points[6], points[8], points[1], points[7]],
      [points[0], points[2], points[6], points[8]],
      [points[0], points[2], points[6], points[8]],
    ],
    2: [
      [points[0], points[2], points[6], points[8], points[3], points[4], points[5]],
      [points[0], points[2], points[6], points[8], points[1], points[4], points[7]],
      [points[0], points[2], points[6], points[8], points[4], points[5]],
      [points[0], points[2], points[6], points[8], points[4], points[5]],
    ],
    3: [
      [points[0], points[2], points[6], points[8], points[3], points[4], points[5]],
      [points[0], points[2], points[6], points[8], points[1], points[4], points[7]],
      [points[0], points[2], points[6], points[8], points[4], points[7]],
      [points[0], points[2], points[6], points[8], points[4], points[7]],
    ],
    4: [
      [points[0], points[2], points[6], points[8], points[3], points[4], points[5]],
      [points[0], points[2], points[6], points[8], points[1], points[4], points[7]],
      [points[0], points[2], points[6], points[8], points[3], points[4]],
      [points[0], points[2], points[6], points[8], points[3], points[4]],
    ],
    5: [
      [points[0], points[2], points[6], points[8], points[3], points[4], points[5]],
      [points[0], points[2], points[6], points[8], points[1], points[4], points[7]],
      [points[0], points[2], points[6], points[8], points[1], points[4]],
      [points[0], points[2], points[6], points[8], points[1], points[4]],
    ],
  }[row]
}

const getLinesForRow = (row, points) => {
  return {
    0: [],
    1: [
      [[...points[3], ...points[5]]],
      [[...points[1], ...points[7]]],
      [[...points[2], ...points[6]]],
      [[...points[0], ...points[8]]]
    ],
    2: [
      [[...points[3], ...points[5]], [...points[4], ...points[2]]],
      [[...points[1], ...points[7]], [...points[4], ...points[2]]],
      [[...points[2], ...points[6]], [...points[4], ...points[5]]],
      [[...points[0], ...points[8]], [...points[4], ...points[5]]]
    ],
    3: [
      [[...points[3], ...points[5]], [...points[4], ...points[8]]],
      [[...points[1], ...points[7]], [...points[4], ...points[8]]],
      [[...points[2], ...points[6]], [...points[4], ...points[7]]],
      [[...points[0], ...points[8]], [...points[4], ...points[7]]]
    ],
    4: [
      [[...points[3], ...points[5]], [...points[4], ...points[6]]],
      [[...points[1], ...points[7]], [...points[4], ...points[6]]],
      [[...points[2], ...points[6]], [...points[4], ...points[3]]],
      [[...points[0], ...points[8]], [...points[4], ...points[3]]]
    ],
    5: [
      [[...points[3], ...points[5]], [...points[4], ...points[0]]],
      [[...points[1], ...points[7]], [...points[4], ...points[0]]],
      [[...points[2], ...points[6]], [...points[4], ...points[1]]],
      [[...points[0], ...points[8]], [...points[4], ...points[1]]]
    ],
  }[row]
}

const getOutlines = (points) => {
  return [
    [...points[0], ...points[2]],
    [...points[0], ...points[6]],
    [...points[6], ...points[8]],
    [...points[2], ...points[8]],
  ]
}

const drawSquare = (x, y, options) => {
  const { scale, width, name, rowNumber, numberInRow, withOutline } = options;

  const gridPoints = []
  const drawnPoints = []
  const randomDistance = Math.floor(Math.random() * randomness * scale + 1);

  for (let i = 0; i <= width; i++) {
    for (let j = 0; j <= width; j++) {
      const xDistance = j * scale + x
      const yDistance = i * scale + y

      gridPoints.push([xDistance, yDistance])
      drawnPoints.push([xDistance + randomDistance, yDistance + randomDistance])
    }
  }

  // Draw underlying grid
  stroke(gridRgb);
  strokeWeight(2);
  line(...[...gridPoints[0], ...gridPoints[2]]);
  line(...[...gridPoints[3], ...gridPoints[5]]);
  line(...[...gridPoints[6], ...gridPoints[8]]);
  line(...[...gridPoints[0], ...gridPoints[6]]);
  line(...[...gridPoints[1], ...gridPoints[7]]);
  line(...[...gridPoints[2], ...gridPoints[8]]);

  // Draw points
  if (name === 'DOTS') {
    stroke(pointRgb);
    strokeWeight(3);
    const dots = getPointsForRow(rowNumber, gridPoints)
    const dotsForSquare = dots[numberInRow]
    if (dots && dotsForSquare) {
      dotsForSquare.forEach((coords) => point(...coords))
    }
  }

  // Draw bold lines
  if (name === 'LINES') {
    stroke(lineRgb);
    strokeWeight(2);
    const lines = getLinesForRow(rowNumber, drawnPoints)
    const linesForSquare = lines[numberInRow]
    if (lines && linesForSquare) {
      linesForSquare.forEach((coords) => line(...coords))
    }
  }

  // Draw outlines
  if (withOutline) {
    const outlines = getOutlines(drawnPoints)
    outlines.forEach((coords) => line(...coords))
  }
}

const drawGrid = (startX, startY, options) => {
  const { name, numColumns, offset, rowNumber } = options;
  let x = startX;
  let y = startY;
  for (let i = 0; i < numColumns; i++) {
    drawSquare(x, y, { ...options, name, rowNumber, numberInRow: i });
    x += offset;
  }
}

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  background(canvasRgb);
  noSmooth();
  translate(leftMargin, topMargin);
  canvas.parent('recreation');
  
  let x = 0;
  let y = 0;
  
  for (let i = 0; i < numRows; i++) {
    drawGrid(x, y, { ...options, rowNumber: i, name: 'DOTS' });
    y += offset;
  }

  x += offset * numColumns;
  y -= offset * numRows;

  for (let i = 0; i < numRows; i++) {
    drawGrid(x, y, { ...options, rowNumber: i, name: 'LINES' });
    y += offset;
  }

  x += offset * numColumns;
  y -= offset * numRows;
  for (let i = 0; i < numRows; i++) {
    drawGrid(x, y, { ...options, rowNumber: i, name: 'LINES', withOutline: true });
    y += offset;
  }

  strokeWeight(1)
  stroke(textRgb)
  fill(textRgb)
  textFont('Helvetica')
  text('Dots. Lines. Forms. 1984. Reconstituted. 2006. Recreated. 2021.', 0, canvasHeight - topMargin * 2 + 10)
}