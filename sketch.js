var database;
var  dog, happyDog,  foodS, foodStock;
var  dogImg, happyDogImg

function preload(){
	dogImg = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg2.png");
}

function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg)
  dog.scale=0.2

  database = firebase.database();

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);
}

function draw() {  
  background(46,139,87)
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  textSize(22);
  fill("white");
  stroke("red");
  text("Food Left :"+ foodS,190,400);
  text("Note:Press UP_ARROW key to feed Yohan Milk",10,50)
  drawSprites();
}
function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

