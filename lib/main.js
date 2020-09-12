const canvasWidth = 400;
const canvasHeight = 400;
const canvasCentreX = canvasWidth/2;
const canvasCentreY = canvasHeight/2;


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
  line(canvasCentreX - 5, canvasCentreY, canvasCentreX + 5, canvasCentreY);
  line(canvasCentreX, canvasCentreY - 5, canvasCentreX, canvasCentreY + 5);
  
  textSize(12);
  fill(0, 102, 153);
  
  var i = 0;
  while(i < numberOfSides){
    var pos1x = (Math.sin((f + ((360 / numberOfSides) * i) * calibration)) * cubeWidth) + canvasCentreX;
    var pos1y = (Math.cos((f + ((360 / numberOfSides) * i) * calibration)) * (cubeHeight * rotationAngle)) + canvasCentreY + yOffset;
    
    var pos2x = (Math.sin((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * cubeWidth) + canvasCentreX;
    var pos2y = (Math.cos((f + ((360 / numberOfSides) * (i + 1)) * calibration)) * (cubeHeight * rotationAngle)) + canvasCentreY + yOffset;
    
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
    line(pos1x, pos1y, pos1x, pos1y + (cubeHeight / rotationAngle));
    text((i + 1), pos1x, pos1y - 5);
    //Top
    line(pos1x, pos1y, pos2x, pos2y);
    //Bottom
    line(pos1x, pos1y + (cubeHeight / rotationAngle), pos2x, pos2y + (cubeHeight / rotationAngle));
    
    i++;
  }
  
  f = f + rotationSpeed;
}