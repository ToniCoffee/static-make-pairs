document.addEventListener('DOMContentLoaded', function (e) {
  canvas.width =
    document.documentElement.clientWidth || document.body.clientWidth;
  const scrollWidth =
    document.documentElement.scrollWidth || document.body.scrollWidth;
  canvas.width -= scrollWidth - canvas.width;

  canvas.height =
    document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  canvas.height -= scrollHeight - canvas.height;

  const clockRadius = 85;
  const halfCanvasWidth = canvas.width / 2;
  const halfCanvasHeight = canvas.height / 2;
  const hoursAngleIncrement = degreesToRadians(30); // 30 = 360 / 12; (In radians)
  const secondsAngleIncrement = 6; // 6  = 360 / 60; (In degrees)
  let currentSecondsAngle = 180;

  const fontSize = 30;
  const halfFontSize = fontSize / 2;

  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px serif`;
  ctx.textAlign = 'center';

  drawAll(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    halfFontSize,
    clockRadius,
    hoursAngleIncrement,
    currentSecondsAngle
  );

  let handler = setInterval(() => {
    currentSecondsAngle += secondsAngleIncrement;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAll(
      ctx,
      halfCanvasWidth,
      halfCanvasHeight,
      halfFontSize,
      clockRadius,
      hoursAngleIncrement,
      currentSecondsAngle
    );
  }, 1000);
});

function degreesToRadians(degrees = 1) {
  return (degrees * Math.PI) / 180;
}
function radiansToDegrees(radians = 1) {
  return (radians * 180) / Math.PI;
}

function drawAxis(
  ctx,
  canvasWidth,
  canvasheight,
  halfCanvasWidth,
  halfCanvasHeight
) {
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(0, halfCanvasHeight);
  ctx.lineTo(canvasWidth, halfCanvasHeight);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(halfCanvasWidth, 0);
  ctx.lineTo(halfCanvasWidth, canvasheight);
  ctx.stroke();
  ctx.closePath();
  ctx.strokeStyle = 'black';
}

function drawCenter(ctx, halfCanvasWidth, halfCanvasHeight, radius = 15) {
  ctx.fillStyle = '#111111';
  ctx.arc(halfCanvasWidth, halfCanvasHeight, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'black';
}

function drawHours(
  ctx,
  hoursAngle,
  halfCanvasWidth,
  halfCanvasHeight,
  halfFontSize,
  clockRadius
) {
  let currentAngle = (3 * Math.PI) / 2; // 270 degrees
  let clockFactor = 1.8;
  let yFactor = 0.6;
  clockFactor *= clockRadius;
  yFactor *= halfFontSize;
  let x, y;

  for (let i = 12; i > 0; i--) {
    x = halfCanvasWidth + Math.cos(currentAngle) * clockFactor;
    y = halfCanvasHeight + Math.sin(currentAngle) * clockFactor;
    y += yFactor;

    // drawHoursLines(ctx, halfCanvasWidth, halfCanvasHeight, Math.cos(currentAngle) , Math.sin(currentAngle), clockRadius);

    ctx.fillText(`${i}`, x, y, 50);
    currentAngle -= hoursAngle;
  }
}

function drawHoursLines(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  cos,
  sin,
  clockRadius
) {
  ctx.beginPath();
  ctx.moveTo(halfCanvasWidth, halfCanvasHeight);
  ctx.lineTo(
    halfCanvasWidth + cos * clockRadius * 2,
    halfCanvasHeight + sin * clockRadius * 2
  );
  ctx.stroke();
  ctx.closePath();
}

function drawHandler(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  clockRadius,
  factor = 1,
  rotationDegrees = 0,
  w = 10,
  strokeStyle = '#111111'
) {
  ctx.translate(halfCanvasWidth, halfCanvasHeight);
  ctx.rotate(degreesToRadians(rotationDegrees));
  // ctx.fillRect(-w / 2, 0, w, clockRadius * factor);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = w;
  ctx.lineCap = 'round';
  ctx.lineTo(0, clockRadius * factor);
  ctx.stroke();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = 'black';
}

function drawHourHandler(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  clockRadius,
  factor = 1,
  rotationDegrees = 0,
  w = 10,
  strokeStyle = '#111111'
) {
  drawHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    factor,
    rotationDegrees,
    w,
    strokeStyle
  );
}

function drawMinuteHandler(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  clockRadius,
  factor = 1,
  rotationDegrees = 0,
  w = 10,
  strokeStyle = '#111111'
) {
  drawHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    factor,
    rotationDegrees,
    w,
    strokeStyle
  );
}

function drawSecondHandler(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  clockRadius,
  factor = 1,
  rotationDegrees = 0,
  w = 10,
  strokeStyle = '#111111'
) {
  drawHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    factor,
    rotationDegrees,
    w,
    strokeStyle
  );
}

function drawAll(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  halfFontSize,
  clockRadius,
  hoursAngleIncrement,
  currentSecondsAngle
) {
  // drawAxis(ctx, canvas.width, canvas.height, halfCanvasWidth, halfCanvasHeight);
  drawHours(
    ctx,
    hoursAngleIncrement,
    halfCanvasWidth,
    halfCanvasHeight,
    halfFontSize,
    clockRadius
  );
  drawSecondHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    1.8,
    currentSecondsAngle,
    3,
    'red'
  );
  drawMinuteHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    1.6,
    240
  );
  drawHourHandler(ctx, halfCanvasWidth, halfCanvasHeight, clockRadius, 1, 120);
  drawCenter(ctx, halfCanvasWidth, halfCanvasHeight);
}