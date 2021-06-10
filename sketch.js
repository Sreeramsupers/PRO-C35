var balloon, balloonImage1, balloonImage2;
var height, database;

function preload() {
  bg = loadImage("images/cityImage.png");
  balloonImage1 = loadAnimation("images/hotairballoon1.png");
  balloonImage2 = loadAnimation("images/hotairballoon1.png", "images/hotairballoon1.png",
    "images/hotairballoon1.png", "images/hotairballoon2.png", "images/hotairballoon2.png",
    "images/hotairballoon2.png", "images/hotairballoon3.png", "images/hotairballoon3.png", "images/hotairballoon3.png");
}

//Function to set initial environment
function setup() {
  database = firebase.database();
  createCanvas(1500, 700);

  balloon = createSprite(250, 450, 150, 150);
  balloon.addAnimation("hotAirBalloon", balloonImage1);
  balloon.scale = 0.5;

  var balloonRef = database.ref('Balloon/height');
  balloonRef.on("value", readHeight,showError)

  textSize(20);
}

// function to display UI
function draw() {
  background(bg);


  if (keyDown(LEFT_ARROW)) {
    updateHeight(-2,0)
    balloon.addAnimation("hotAirBalloon", balloonImage2);

  }

  else if (keyDown(RIGHT_ARROW)) {
    
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    updateHeight(2,0)
  }

  else if (keyDown(UP_ARROW)) {
    updateHeight(0,-3)
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale -0.01;
  }
  else if (keyDown(DOWN_ARROW)) {
    updateHeight(0,3)
    balloon.addAnimation("hotAirBalloon", balloonImage2);
    balloon.scale = balloon.scale +0.01;

}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!", 40, 40);
}

function updateHeight(x,y){
  database.ref('Balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}
function showError(){
  console.log("error");
}



