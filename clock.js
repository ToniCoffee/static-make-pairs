document.addEventListener("DOMContentLoaded", function (e) {
  const canvas                = document.getElementById("canvas");
  canvas.width                = document.documentElement.clientWidth || document.body.clientWidth;
  const scrollWidth           = document.documentElement.scrollWidth || document.body.scrollWidth;
  canvas.width                -= scrollWidth - canvas.width;

  canvas.height               = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollHeight          = document.documentElement.scrollHeight || document.body.scrollHeight;
  canvas.height               -= scrollHeight - canvas.height;

  const date                  = new Date();
  let dateHour                = date.getHours() - 12;
  let dateMinutes             = date.getMinutes();
  let dateSeconds             = date.getSeconds();
  const clockRadius           = canvas.width < canvas.height ? (canvas.width / 3) / 2 : (canvas.height / 3) / 2; // 85
  const halfCanvasWidth       = canvas.width / 2;
  const halfCanvasHeight      = canvas.height / 2;
  const hoursAngle            = degreesToRadians(30);  // 30 = 360 / 12; (In radians)
  const secondsAngleIncrement = 6 / 1;      // Six degrees every 1 second; (In degrees)
  const minutesAngleIncrement = 6 / 60;     // Six degrees every 60 seconds; (In degrees)
  const hoursAngleIncrement   = 30 / 3600;  // 30 degrees every 3600 seconds; (In degrees)
  let currentSecondsAngle     = 180 + (dateSeconds * 6);
  let currentMinutesAngle     = 180 + (dateMinutes * 6);
  let currentHoursAngle       = 180 + (dateHour * 6 * 5) + (dateMinutes * 60 * 30) / 3600;

  const fontSize              = 30;
  const halfFontSize          = fontSize / 2;

  canvas.style.background     = `radial-gradient(
    circle at center,
    #777777 ${clockRadius * 2}px,
    #000000 ${clockRadius * 2.1}px,
    #ffffff ${clockRadius * 2.2}px,
    #111111 ${clockRadius * 2.3}px
  )`;

  const ctx      = canvas.getContext("2d");
  ctx.font       = `${fontSize}px serif`;
  ctx.textAlign  = "center";

  drawAll(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    halfFontSize,
    clockRadius,
    hoursAngle,
    currentHoursAngle,
    currentMinutesAngle,
    currentSecondsAngle
  );

  let handler = setInterval(() => {
    currentSecondsAngle = setSeconds(currentSecondsAngle, secondsAngleIncrement);
    currentMinutesAngle = setMinutes(currentMinutesAngle, minutesAngleIncrement);
    currentHoursAngle   = setHours(currentHoursAngle, hoursAngleIncrement);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawAll(
      ctx,
      halfCanvasWidth,
      halfCanvasHeight,
      halfFontSize,
      clockRadius,
      hoursAngle,
      currentHoursAngle,
      currentMinutesAngle,
      currentSecondsAngle
    );
  }, 1000);
});

function normalize(angle) {
  if (angle === 540) angle = 180;
  return angle;
}

function degreesToRadians(degrees = 1) {
  return (degrees * Math.PI) / 180;
}
function radiansToDegrees(radians = 1) {
  return (radians * 180) / Math.PI;
}

function setSeconds(seconds, angleIncrement) {
  seconds += angleIncrement;
  seconds = normalize(seconds);
  return seconds;
}

function setMinutes(minutes, angleIncrement) {
  minutes += angleIncrement;
  minutes = normalize(minutes);
  return minutes;
}

function setHours(hours, angleIncrement) {
  hours += angleIncrement;
  hours = normalize(hours);
  return hours;
}

function drawAxis(
  ctx,
  canvasWidth,
  canvasheight,
  halfCanvasWidth,
  halfCanvasHeight
) {
  ctx.strokeStyle = "green";
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
  ctx.strokeStyle = "black";
}

function drawCenter(ctx, halfCanvasWidth, halfCanvasHeight, radius = 15) {
  ctx.fillStyle = "#111111";
  ctx.arc(halfCanvasWidth, halfCanvasHeight, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "black";
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
  ctx.lineWidth = 1;
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
  strokeStyle = "#111111"
) {
  ctx.translate(halfCanvasWidth, halfCanvasHeight);
  ctx.rotate(degreesToRadians(rotationDegrees));
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = w;
  ctx.lineCap = "round";
  ctx.lineTo(0, clockRadius * factor);
  ctx.stroke();
  ctx.closePath();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.strokeStyle = "black";
}

function drawHourHandler(
  ctx,
  halfCanvasWidth,
  halfCanvasHeight,
  clockRadius,
  rotationDegrees = 0,
  factor = 1,
  w = 10,
  strokeStyle = "#111111"
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
  rotationDegrees = 0,
  factor = 1,
  w = 10,
  strokeStyle = "#111111"
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
  rotationDegrees = 0,
  factor = 1,
  w = 10,
  strokeStyle = "#111111"
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
  hoursAngle,
  currentHoursAngle,
  currentMinutesAngle,
  currentSecondsAngle
) {
  // drawAxis(ctx, canvas.width, canvas.height, halfCanvasWidth, halfCanvasHeight);
  drawHours(
    ctx,
    hoursAngle,
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
    currentSecondsAngle,
    1.8,
    3,
    "red"
  );
  drawMinuteHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    currentMinutesAngle,
    1.6
  );
  drawHourHandler(
    ctx,
    halfCanvasWidth,
    halfCanvasHeight,
    clockRadius,
    currentHoursAngle,
    1
  );
  drawCenter(ctx, halfCanvasWidth, halfCanvasHeight);
}
