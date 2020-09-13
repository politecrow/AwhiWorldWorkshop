const canvasWidth = 400;
const canvasHeight = 400;
const canvasCentreX = canvasWidth/2;
const canvasCentreY = canvasHeight/2;

const polygonNames = ["not-a-gon", "henagon","digon","trigon","tetragon","pentagon","hexagon","heptagon","octagon","nonagon","decagon","hendecagon","dodecagon","tridecagon","tetradecagon","pentadecagon","hexadecagon","heptadecagon","octadecagon","enneadecagon","icosagon","icosihenagon","icosidigon","icositrigon","icositetragon","icosipentagon"];

var cubeHeight = 65;
var cubeWidth = 50;
var yOffset = 0 - cubeHeight / 2;
var calibration = 0.01745; //By all logic this number should be exactly 0.018, but for some reason this causes the 1st vertical to deviate... So here's a precise-ass value that's no where near 0.018

var rotationSpeed = 0.5;
var viewAngle = 0;
var parallax = 1;
var numberOfSides = 4;

function setup(){
  createCanvas(canvasWidth, canvasHeight);
  frameRate(60);
  fill(color(220));
  angleMode(DEGREES);
}

var f = 0;
function draw(){
  background(220);
  textSize(12);
  fill(0, 102, 153);
  stroke(0, 0, 0);
  //Crosshair
  line(canvasCentreX - 5, canvasCentreY, canvasCentreX + 5, canvasCentreY);
  line(canvasCentreX, canvasCentreY - 5, canvasCentreX, canvasCentreY + 5);
  
  angleProduct1 = (cubeHeight * viewAngle);
  angleProduct2 = (cubeHeight * viewAngle) + (viewAngle * 100);
  angleProduct3 = ((cubeHeight/2) * viewAngle);
  
  
  var i = 0;
  while(i < numberOfSides){
    var pos1x = (Math.sin((f + ((360 / numberOfSides) * i) * calibration)) * cubeWidth) + canvasCentreX;
    var pos1y = (Math.cos((f + ((360 / numberOfSides) * i) * calibration)) * angleProduct2) + (canvasCentreY + yOffset);
    
    var pos2x = (Math.sin((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * cubeWidth) + canvasCentreX;
    var pos2y = (Math.cos((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * angleProduct2) + (canvasCentreY + yOffset);
    
    //pos1x = ((pos1x - canvasCentreX) * parallax) + canvasCentreX;
    //pos2x = ((pos2x - canvasCentreX) * parallax) + canvasCentreX;
    
    //Sides
    line(pos1x, pos1y + angleProduct3, pos1x, (pos1y + cubeHeight) - ((cubeHeight/2) * viewAngle));
    strokeWeight(0);
    text((i + 1), pos1x - 5, pos1y - 5 + angleProduct3);
    strokeWeight(1);
    //Top
    line(pos1x, pos1y + angleProduct3, pos2x, pos2y + angleProduct3);
    //Bottom
    line(pos1x, (pos1y + cubeHeight) - angleProduct3, pos2x, (pos2y + cubeHeight) - angleProduct3);
    
    i++;
  }
  
  strokeWeight(0);
  text(polygonNames[numberOfSides], 7, 17);
  strokeWeight(1);
  
  axis();
  
  f = f + rotationSpeed;
}

function axis(){
  strokeWeight(0);
  fill(0, 0, 255);
  text("z", 7 + (10 * parallax) - (10 * viewAngle), (canvasHeight - 7) - (48 * viewAngle));
  fill(255, 0, 0);
  text("x", 7, (canvasHeight - 55) + (49 * viewAngle));
  fill(0, 255, 0);
  text("y", 55 + (5 * viewAngle), canvasHeight - 7);
  strokeWeight(1);
  
  //Z
  stroke(0, 0, 255);
  line(10, canvasHeight - 10, 10 + (10 * parallax) - (10 * viewAngle), (canvasHeight - 10) - (40 * viewAngle));
  //X
  stroke(255, 0, 0);
  line(10, canvasHeight - 10, 10,  (canvasHeight - 50) + (40 * viewAngle));
  //Y
  stroke(0, 255, 0);
  line(10, canvasHeight - 10, 50 + (5 * viewAngle), canvasHeight - 10);
  //Origin
  stroke(0, 0, 0);
  line(8, canvasHeight - 8, 12, canvasHeight - 12);
  line(8, canvasHeight - 12, 12, canvasHeight - 8);
}


function logParallaxValue(value){
  var factor = 1;
  //value will be between 0 and 100
  var minp = canvasCentreY;
  var maxp = canvasHeight;

  //The result should be between 100 an 10,000,000
  var minv = Math.log(canvasCentreY);
  var maxv = Math.log(canvasHeight * factor);

  //Calculate the adjustment scale
  var scale = (maxv - minv) / (maxp - minp);

  return Math.exp(minv + scale * (value - minp));
}


function logAngleValue(value){
  var factor = 1;
  //value will be between 0 and 1
  var minp = 100;
  var maxp = 1000;

  //The result should be between 100 an 10,000
  var minv = Math.log(10);
  var maxv = Math.log(5000 * factor);

  //Calculate the adjustment scale
  var scale = (maxv - minv) / (maxp - minp);

  return (Math.log(value * 100) / 100);
}