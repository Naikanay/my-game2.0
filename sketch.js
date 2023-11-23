var bg, bgImg;
var sophie;
var sophieRunning;
var sophieStanding;
var cactus, cactusImg, cactusGroup;
var invisibleGround;
var invisibleSky;
var gameState = "play"
var gameOver, gameOverImg;
var score = 0;

function preload(){
  bgImg = loadImage("assets/long_background.jpg");
  sophieRunning = loadAnimation("assets/frame1running.png","assets/frame2running.png","assets/frame3running.png","assets/frame4running.png","assets/frame5running.png","assets/frame6running.png");
  sophieStanding = loadAnimation("assets/frame2running.png");
  cactusImg = loadImage("assets/cactus.png");
  gameOverImg = loadImage("assets/gameOver.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  bg = createSprite(width/2,height/2);
  bg.addImage(bgImg);
  bg.scale = 2.8;
  sophie = createSprite(80,560);
  sophie.addAnimation("sophieStanding",sophieStanding);
  sophie.addAnimation("sophieRunning",sophieRunning);
  cactusGroup = new Group()
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2
  invisibleGround = createSprite(0,height-80,width,10);
  invisibleSky = createSprite(0,height-400,width,10);
  invisibleGround.visible = false;
  invisibleSky.visible = false;

}

function draw(){
  background("blue");
  if(gameState === "play"){
    bg.velocityX = -0.000000001
    gameOver.visible = false;
    score = score + Math.round(frameCount/200);
    if(keyDown(RIGHT_ARROW)){
      sophie.changeAnimation("sophieRunning");
      bg.velocityX = -10
    }
    if(keyDown(UP_ARROW)){
      sophie.velocityY -= 10
    }
    sophie.velocityY = sophie.velocityY + 0.8;
   
    spawnCactus();
    if(sophie.isTouching(cactusGroup)){
      gameState = "end"
    }
  }
  if(gameState === "end"){
    gameOver.visible = true;
    bg.velocityX = 0;
    cactusGroup.setVelocityXEach(0);
    sophie.changeAnimation("sophieStanding");
  }
  if(bg.x < 20){
    bg.x = bg.width/2;
  }
  sophie.collide(invisibleGround);
  sophie.collide(invisibleSky);
  drawSprites();
  textSize(30);
  text("SCORE: " + score,50,50);
}
function spawnCactus() {
  //write code here to spawn the clouds
   if (frameCount % 150 === 0) {
     cactus = createSprite(width,height-100);
   // cactus.y = Math.round(random(10,60));
    cactus.scale = 0.5;
    cactus.velocityX = -3;
    cactus.addImage("cactusImage",cactusImg);
    cactusGroup.add(cactus);
    //adjust the depth
    cactus.depth = sophie.depth;
    sophie.depth = sophie.depth + 1;
    }
}