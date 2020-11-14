var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground, invisibleGround;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var obstacle, obstacleImage;
var banana, bananaImage

var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600, 300); 
  
monkey = createSprite(50,210,20,50);
monkey.addAnimation("running", monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(200,250,600,20);
ground.x = ground.width /2;
ground.velocityX = -4;
  
//invisibleGround = createSprite(200,190,400,10);
//invisibleGround.visible = false;  
  
// create Obstacle and food groups
obstacleGroup = new Group();
foodGroup = new Group();
  
console.log("Hello" + 5);
  
score = 0;
  
}


function draw() {
background(225);
  
("Score: "+ score, 500,50);
  
if(gameState === PLAY){
//move the ground
ground.velocityX = -4;

    
if(keyDown("space")&& monkey.y >= 100) {
monkey.velocityY = -13;
  }
  
monkey.velocityY = monkey.velocityY + 0.8
  
//score
score = score + Math.round(frameCount/60);
  
if (ground.x < 0){
ground.x = ground.width/2;
}
  
  //spawn the food
    spawnFood();
    //spawn obstacles on the ground
    spawnObstacle();
  
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
    } 
  
  }
  if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    
  }
  monkey.collide(ground);
drawSprites(); 
}

function spawnObstacle(){
if (frameCount % 60 === 0){
var obstacle = createSprite(600,220,10,40);
obstacle.velocityX = -6;

  //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 200;
  obstacle.addImage(obstacleImage);
   
   //adding obstacles to the group
   obstacleGroup.add(obstacle);
  
 }
}
function spawnFood() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
     food = createSprite(600,100,40,10);
    food.y = Math.round(random(10,60));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3;
    
     //assign lifetime to the variable
    food.lifetime = 200;
    
    //adjust the depth
    food.depth = monkey.depth;
    food.depth = monkey.depth + 1;
    
    //adding banana to the group
   foodGroup.add(food);
  }
  
}






