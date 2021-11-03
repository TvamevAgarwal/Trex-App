var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud , cloudImg, cactus ;
var ob1, ob2, ob3, ob4, ob5, ob6;
var play = 1, end = 0, gamestate = play;
var cactusG, cloudG;
var gameover , restart , gameoverI , restartI;
var score = 0 , HiScore = 0 ;
var die , jump , cp ; 


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
   
  groundImage = loadImage("ground2.png");
  
  cloudImg = loadImage("cloud.png")
  
  ob1 =   loadImage("obstacle1.png");
  ob2 =   loadImage("obstacle2.png");
  ob3 =   loadImage("obstacle3.png");
  ob4 =   loadImage("obstacle4.png");
  ob5 =   loadImage("obstacle5.png");
  ob6 =   loadImage("obstacle6.png");
  
  trex_collided = loadAnimation("trex_collided.png")
  gameoverI = loadImage("gameOver.png")
  restartI = loadImage("restart.png")
  
  die = loadSound("die.mp3");
  jump = loadSound("jump.mp3");
  cp = loadSound("checkPoint.mp3");
  
}

function setup() {

  createCanvas(windowWidth,windowHeight)
  
  //create a trex sprite
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("colide",trex_collided);
  trex.scale = 0.5;
  //trex.debug = true
  trex.setCollider("rectangle",0,0,80,trex.height)
  
  //create a ground sprite
  ground = createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  //creating invisible ground
  invisibleGround = createSprite(200,height-10,width,10);
  invisibleGround.visible = false;
  
  cactusG = new Group();
  cloudG = new Group();
  
  gameover = createSprite(width/2,height/2,10,10)
  gameover.addImage(gameoverI)
  gameover.scale = 0.8
  
  restart = createSprite(width/2,height/2,10,10)
  restart.addImage(restartI)
  restart.scale = 0.5
}

function draw() {
  //set background color
  background(0);
  
  fill(200)
  textSize(15)
  text("Score : "+score,width-100,20)
  text("HiScore : "+HiScore,width/2,20)
  
  if(score>HiScore){
    HiScore = score 
  }
  
  if(score%100===0 && score > 0){
    cp.play();
  }
  
  
  if(gamestate===play){
    
    gameover.visible = false 
    restart.visible = false
     ground.velocityX = -(4+(score/300));
     
    score = score+ Math.round(getFrameRate()/61)
    
  trex.changeAnimation("running",trex_running);
    
   // jump when the space key is pressed
  if((touches.length > 0 || keyDown("space")) && trex.y >= height-45) {
    trex.velocityY = -12;
    jump.play();
    touches=[];
  }
    
    trex.velocityY = trex.velocityY + 0.47
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    trex.collide(invisibleGround)
    
    spawnClouds();
    spawnCactus();
    
    if(trex.isTouching(cactusG)){
      gamestate = end;
      die.play();
      
    }
  }
  
  if(gamestate===end){
   trex.velocityY = 0;
   ground.velocityX = 0;
   trex.changeAnimation("colide",trex_collided);
   cactusG.setVelocityXEach(0);
   cloudG.setVelocityXEach(0);
   cactusG.setLifetimeEach(-1);
   cloudG.setLifetimeEach(-1);
   gameover.visible = true 
   restart.visible = true
    
   if(mousePressedOver(restart) || touches.length > 0 ){
     reset();
     touches=[];
   }
  
      
    
  } 

 
  drawSprites();
}

function reset(){
  gamestate = play 
  score = 0
  cactusG.destroyEach();
  cloudG.destroyEach();
  
}

function spawnClouds(){
  if(frameCount%60===0){
    cloud = createSprite(width,random(30,100),20,20)
    cloud.addImage(cloudImg)
    cloud.scale = 0.5
    cloud.velocityX = -4
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1
    cloud.lifetime = width/2
    cloudG.add(cloud);

    } 
  
}

function spawnCactus(){
  if(frameCount%90===0){
    cactus = createSprite(width,height-40,20,20)
    cactus.velocityX = -(4+(score/300));
    cactus.lifetime = width/2
    cactus.scale = 0.6
    cactusG.add(cactus);
    
    var a = Math.round(random(1,6))
    switch(a){
        
      case 1 : cactus.addImage(ob1);
      break;
      case 2 : cactus.addImage(ob2);
      break;
      case 3 : cactus.addImage(ob3);
      break;
      case 4 : cactus.addImage(ob4);
      break;
      case 5 : cactus.addImage(ob5);
      break;
      case 6 : cactus.addImage(ob6);
      break;
      
    } 
  }
}