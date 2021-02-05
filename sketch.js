var bgImage
var PLAY = 1;
var gameState=PLAY;
var END = 0;
var alien1,alien2
var fruit1,fruit2,fruit3,fruit4
var sword, swordImage
var spawnFruit
var spawnFruitOpp
var rand
var fruitGroup
var fruitGroupOpp
var alienGroup
var spawnAlien
var alien
var score
var fruit
var fruitOpp
var gameOver
var gameOverImage
var gameOverSound
var knifeSound

function preload(){
  alien1 = loadAnimation("alien1.png")
  alien2 = loadAnimation("alien2.png")
  
  fruit1Image = loadImage("fruit1.png")
  fruit2Image = loadImage("fruit2.png")
  fruit3Image = loadImage("fruit3.png")
  fruit4Image = loadImage("fruit4.png")
  
  bgImage = loadImage("ninga.jfif")
  
  swordImage = loadImage("sword.png")
  
  gameOverImage=loadImage("gameover.png")
  
  knifeSound=loadSound("knifeSwooshSound.mp3")

  gameOverSound=loadSound("gameover.mp3")

                        
                        
}

function setup(){
  createCanvas(400,400);
  
  var bg = createSprite(200,200)
  bg.addImage("b",bgImage);
  bg.scale=3;
  
  fruitGroup=createGroup();
  fruitGroupOpp=createGroup();
  alienGroup=createGroup();
  
  sword = createSprite(200,200,40,40)
  sword.addImage("sword",swordImage)
  sword.scale=0.5;
  
  gameOver = createSprite(200,200,40,30)
  gameOver.addImage(gameOverImage)
  gameOver.scale=1;
  score=0
  
}


function draw(){
  background("lightblue");
  
  sword.y=mouseY;
  sword.x=mouseX;
  
  if(gameState===PLAY){
    gameOver.visible=false;
     spawnFruit()
     spawnFruitOpp()
     spawnAlien()
    
   if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      knifeSound.play()
      score=score+1;
   }
    
    if(fruitGroupOpp.isTouching(sword)){
      fruitGroupOpp.destroyEach();
       knifeSound.play()
      score=score+1;
   }
    
    if(alienGroup.isTouching(sword)){
      gameOverSound.play()
      gameState=END
    }
  }
  
  else if(gameState===END){
    gameOver.visible=true;
    
    
    fruitGroup.setLifetimeEach(-1)
    fruitGroupOpp.setLifetimeEach(-1)
    alienGroup.setLifetimeEach(-1)
    
    fruitGroup.setVelocityXEach(0)
    fruitGroupOpp.setVelocityXEach(0)
    alienGroup.setVelocityXEach(0)
  }
  
  
  drawSprites();
  text("score:"+score,200,30)
}


function spawnFruit(){
   if (frameCount % 70 === 0){
     fruit = createSprite(410,200,20,20)
     fruit.y=Math.round(random(20,380))
     fruit.velocityX=-(5+score/4)
      

var rand=Math.round(random(1,4));
switch (rand){
  case 1:fruit.addImage(fruit1Image);
    break;
  case 2:fruit.addImage(fruit2Image);
    break;
  case 3:fruit.addImage(fruit3Image);
    break;
  case 4:fruit.addImage(fruit4Image);
    break;
  default:break;
 } 
  
   fruit.scale=0.15;
  fruit.lifetime=150;

  fruitGroup.add(fruit);

     
  }
}


function spawnFruitOpp(){
   if (frameCount % 70 === 0){
     fruitOpp = createSprite(0,200,20,20)
     fruitOpp.y=Math.round(random(20,380))
     fruitOpp.velocityX=(5+score/4);
      

var rand=Math.round(random(1,4));
switch (rand){
  case 1:fruitOpp.addImage(fruit3Image);
    break;
  case 2:fruitOpp.addImage(fruit4Image);
    break;
  case 3:fruitOpp.addImage(fruit1Image);
    break;
  case 4:fruitOpp.addImage(fruit2Image);
    break;
  default:break;
 } 
  
   fruitOpp.scale=0.15;
  fruitOpp.lifetime=150;

  fruitGroupOpp.add(fruitOpp);

     
  }
}


function spawnAlien(){
  if(frameCount % 100 === 0){
     alien = createSprite(400,200,20,20)
     alien.y=Math.round(random(20,380))
     alien.velocityX=-3;
    
    
    var rand=Math.round(random(1,2));
    switch (rand){
      case 1:alien.addAnimation("kill",alien1);
        break;
      case 2:alien.addAnimation("killing",alien2);
        break
    }
        
    alien.scale=1;
        alien.lifetime=150;
        
        alienGroup.add(alien);
  }
}


