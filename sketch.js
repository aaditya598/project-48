
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var gameState="fight"
var bg,bullets=70
var shooter,bulletGroup,zombieGroup
var heart1,heart2,heart3,life=3
var shooterImg
var shootingImg,bulletimg,bullet,score=0
let engine;
let world;
function preload(){
  bg=loadImage("bg 1.jpeg")
shooterImg=loadImage("bg6.png")
shootingImg=loadImage("bg7.png")
zombieImg=loadImage("bg8.png")
heart1=loadImage("bg2.png")
heart2=loadImage("bg3.png")
heart3=loadImage("bg4.png")
bulletimg=loadImage("bullet.png")
}


function setup()
{
  createCanvas(displayWidth,displayHeight);
shooter=createSprite(100,height/2,40,40)
shooter.addImage(shooterImg)
shooter.scale=0.4

//  heart sprite
heart11=createSprite(width/2,20)
heart11.addImage(heart1)
heart11.visible=false
heart11.scale=0.4
heart22=createSprite(width/2,40)
heart22.addImage(heart2)
heart22.visible=false
heart22.scale=0.4
heart33=createSprite(width/2,60)
heart33.addImage(heart3)
heart33.visible=false
heart33.scale=0.4

bulletGroup=new Group()
zombieGroup=new Group()





}

function draw() 
{
  background(bg);
  console.log(life)
  if (gameState==="fight"){
if (life===3){
  heart33.visible=true
  heart22.visible=false
  heart11.visible=false
}
if (life===2){
  heart22.visible=true
  heart33.visible=false
  heart11.visible=false
}
if (life===1){
  heart22.visible=false
  heart33.visible=false
  heart11.visible=true
}
if (life===0){
  gameState="lost"
}
if(score===100){
  gameState="won"
}
if(keyDown("UP_ARROW") || touches.length>0){
  shooter.y=shooter.y-30
}

if(keyDown("DOWN_ARROW") || touches.length>0)
{shooter.y=shooter.y+30}
if(zombieGroup.isTouching(bulletGroup)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy()
    bulletGroup.destroyEach()
    score=score+2
  }
}}

if(keyWentDown("space")){
  bullet=createSprite(shooter.x+70,shooter.y-30)
  bullet.addImage(bulletimg)
  bullet.velocityX=20
  bulletGroup.add(bullet)
  bullet.scale=0.04
  shooter.addImage(shootingImg)
  bullets=bullets-1
  shooter.depth=bullet.depth+2

}
else if(keyWentUp("space")){
  shooter.addImage(shooterImg)
} 
if (bullets==0){
  gameState="bullet"
}
if(zombieGroup.isTouching(shooter)){
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(shooter)){
      zombieGroup[i].destroy()
      life=life-1}
  }

}


 
 

spawnzombie()

  }

drawSprites();
textSize(40)
fill("white")
text("Score: "+score,width-200,80)
if(gameState=="lost"){
  textSize(100)
  fill("white")
  text("You Lost",width/2,height/2)
  player.destroy()
  zombieGroup.destroyEach()}
  else if(gameState=="won"){
    textSize(100)
  fill("white")
  text("You won",width/2,height/2)
  player.destroy()
   zombieGroup.destroyEach()}
  }
  


function  spawnzombie(){
if(frameCount %80===0){
zombie=createSprite(width+4,random(80,height-90))
zombie.addImage(zombieImg)
zombie.velocityX=-3
zombie.scale=0.2
zombieGroup.add(zombie)
}


}


