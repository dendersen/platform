let url =
"https://api.openweathermap.org/data/2.5/weather?id=2618424&appid=2a0853a28b198e2d0fb19c11ce2a044a";
//api.openweathermap.org/data/2.5/weather?id=2618424&appid=3d458e6af50ae07021a3f6fa1af4bc45
var data;
let gravit8
let xX = 50 //charector x
let yY = 750 // same but y

function preload() {
  img = loadImage("placeholder.png");
  loadJSON(url, gotData);
}
function gotData(info) {
  data = info;
  if (data) {
    print(data);
  }
}

function setBackDrop() {
  createCanvas(windowWidth, windowHeight);
  background(220);
  if (sunGet) {
    fill(45, 181, 151);
    print("bright");
  } else {
    fill(45 / 2, 181 / 2, 151 / 2);
    print("dark");
  }
  rect((width - 1600) / 2, (height - 900) / 2, 1600, 900);
}

function setup() {
  sunGet();
  setBackDrop();
  collisionClear();
}

function plotx(x /*0-1600*/) {
  x = (width - 1600) / 2 + x;
  return x;
}

function ploty(y /*0-900*/) {
  y = (height - 900) / 2 + y;
  return y;
}

//16:9 spille størlse
//1600 * 900 px 
function draw() {
  fill(0);
  platforme(50,800,600);
  mand(xX, yY);
  canvasCut();
  yY = gravity(xX,yY)
}

function mand(x, y) {
  //original 462x642
  image(img, plotx(x), ploty(y - 100), 100, 100);
}

function platforme(x,y,length) {
  fill(0, 50, 0);
  rect(plotx(x), ploty(y), length, 60);
  placeCollision(x,y,length)
}

function canvasCut() {
  fill(150);
  noStroke();
  rect(0, 0, plotx(0), height); //left 
  rect(0, 0, width, ploty(0)); //top
  rect(plotx(-5), ploty(900), width + plotx(10)); //bottom
  rect(plotx(1600), ploty(-5), plotx(0), ploty(900) + ploty(10)); // right
  stroke(0);
}

//data.sys.sunrise
//data.sys.sunset
function sunGet(/*checks if sun is up*/) {
  if (
    new Date().getTime() / 1000 > data.sys.sunrise &&
    new Date().getTime() / 1000 < data.sys.sunset
  ) {
    light = true;
  } else {
    light = false;
  }
  print("lighting is currently " + light);
  return light;
}

const collision =[]

//physics math shit made by david, higly inefficient but hopefully works
var gravity = 0;
var gravitySpeed = 0;

function gravity(x,y){
  if(!collisionTest(x,y)){    
    y++
    print (true)
    return y
  }
  print(false)
  return y
}

function collisionTest(x,y){
  for(let i; i < 100; i++){
    /* checks collision in img
    if img has platform 1 pixel beneath, do nothing
    if not move one down
    const collision goes x then y meaning const collision mod 1600 = y
    const collision - (const collision mod 1600) = x
    this way a grid can be searched up for only the necesary parts */
    v = y*1600+i+x
    if(collision[v]){
    return(true)
    }
  }
  return(false)
}

function placeCollision(x,y,lenght){
  let v
  for(let i; i<lenght; i++){
  v = y*1600+i+x
  collision[v] = true
  print(v+" is true")
  }
}

function collisionClear(){
  for(let i; i<(1600*900+50);i++){
    collision[i]=false
  }
  print("clear complete")
}



function movement() {
  if (!gravty) {
    y++;
  }

  //inspiration: http://jsfiddle.net/loktar/dMYvG/
  if (keyIsPressed) {
    if (keyCode === 32) {
      //OP
      // keyCode = 0;
      if (velY > -speed) {
        velY -= 100;
      }
    }
    if (keyCode === 39) {
      //Højre
      // keyCode = 0;

      if (velX < speed) {
        velX++;
      }
    }
    if (keyCode === 37) {
      //Venstre
      // keyCode = 0;

      if (velX > -speed) {
        velX--;
      }
    }
  }

  velY *= friction;
  y += velY;
  velX *= friction;
  x += velX;

  rect(x, y, 50, 50);
}

function scroll() {

  if(xX < 50){
    scrX = scrX-windowWidth+150
  } else if(xX+100 > (windowWidth-50)){
    scrX = scrX+windowWidth-150
  }
  
  while (yY <= windowHeight/8){
    scrY--
  }
  while (yY+100 >= windowHeight-(windowHeight/8)){
    scrY++
  }
  }














