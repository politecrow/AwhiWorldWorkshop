const canvasWidth = 400;
const canvasHeight = 400;
const canvasCentreX = canvasWidth/2;
const canvasCentreY = canvasHeight/2;

const polygonNames = ["", "henagon","digon","trigon","tetragon","pentagon","hexagon","heptagon","octagon","nonagon","decagon","hendecagon","dodecagon","tridecagon","tetradecagon","pentadecagon","hexadecagon","heptadecagon","octadecagon","enneadecagon","icosagon","icosihenagon","icosidigon","icositrigon","icositetragon","icosipentagon"];

var cubeHeight = 65;
var cubeWidth = 50;
var yOffset = 0 - cubeHeight / 2;
var calibration = 0.01745; //By all logic this number should be exactly 0.018, but for some reason this causes the 1st vertical to deviate... So here's a precise-ass value that's no where near 0.018

var rotationSpeed = 0.5;
var rotationAngle = 25;
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
  
  
  var i = 0;
  while(i < numberOfSides){
    var pos1x = (Math.sin((f + ((360 / numberOfSides) * i) * calibration)) * cubeWidth) + canvasCentreX;
    var pos1y = (Math.cos((f + ((360 / numberOfSides) * i) * calibration)) * (cubeHeight * rotationAngle)) + (canvasCentreY + yOffset);
    
    var pos2x = (Math.sin((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * cubeWidth) + canvasCentreX;
    var pos2y = (Math.cos((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * (cubeHeight * rotationAngle)) + (canvasCentreY + yOffset);
    
    pos1x = ((pos1x - canvasCentreX) * parallax) + canvasCentreX;
    pos2x = ((pos2x - canvasCentreX) * parallax) + canvasCentreX;
    
    /*
    //Sides
    line(pos1x + ((pos1x - canvasCentreX) * parallax / 10), pos1y * parallax, pos1x, pos1y + cubeHeight * parallax);
    text((i + 1), pos1x + ((pos1x - canvasCentreX) * parallax / 10), pos1y * parallax - 5);
    //Top
    line(pos1x + ((pos1x - canvasCentreX) * parallax / 10), pos1y * parallax, pos2x + ((pos2x - canvasCentreX) * parallax / 10), pos2y * parallax);
    //Bottom
    line(pos1x, pos1y + cubeHeight * parallax, pos2x, pos2y + cubeHeight * parallax);
    */
    
    //Sides
    line(pos1x, pos1y + ((cubeHeight/2) * rotationAngle), pos1x, (pos1y + cubeHeight) - ((cubeHeight/2) * rotationAngle));
    strokeWeight(0);
    text((i + 1), pos1x - 5, pos1y - 5 + ((cubeHeight/2) * rotationAngle));
    strokeWeight(1);
    //Top
    line(pos1x, pos1y + ((cubeHeight/2) * rotationAngle), pos2x, pos2y + ((cubeHeight/2) * rotationAngle));
    //Bottom
    line(pos1x, (pos1y + cubeHeight) - ((cubeHeight/2) * rotationAngle), pos2x, (pos2y + cubeHeight) - ((cubeHeight/2) * rotationAngle));
    
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
  text("z", 7 + (10 * parallax) - (10 * rotationAngle), (canvasHeight - 7) - (48 * rotationAngle));
  fill(255, 0, 0);
  text("x", 7, (canvasHeight - 55) + (49 * rotationAngle));
  fill(0, 255, 0);
  text("y", 55 + (5 * rotationAngle), canvasHeight - 7);
  strokeWeight(1);
  
  //Z
  stroke(0, 0, 255);
  line(10, canvasHeight - 10, 10 + (10 * parallax) - (10 * rotationAngle), (canvasHeight - 10) - (40 * rotationAngle));
  //X
  stroke(255, 0, 0);
  line(10, canvasHeight - 10, 10,  (canvasHeight - 50) + (40 * rotationAngle));
  //Y
  stroke(0, 255, 0);
  line(10, canvasHeight - 10, 50 + (5 * rotationAngle), canvasHeight - 10);
  //Origin
  stroke(0, 0, 0);
  line(8, canvasHeight - 8, 12, canvasHeight - 12);
  line(8, canvasHeight - 12, 12, canvasHeight - 8);
}