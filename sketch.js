const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bg_img, fruit_img, food, rabbit, rabbit_img;
var button;
var blink, eat, sad;

function preload(){
  bg_img = loadImage("background.png");
  fruit_img = loadImage("melon.png");
  rabbit_img = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png" , "blink_2.png" , "blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png" , "eat_2.png" , "eat_3.png" , "eat_4.png");
  sad = loadAnimation("sad_1.png" , "sad_2.png" , "sad_3.png");

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(6,{x:245, y: 30});

  var fruit_options = {desity:0.0001};
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);
  
  //coelhinho 
  rabbit = createSprite(250, 565, 100, 100);
  rabbit.addImage(rabbit_img);
  rabbit.scale = 0.27;
  
  //adc animation
  blink.frameDelay = 14;
  eat.frameDelay = 14;
  sad.frameDelay = 14;
  rabbit.addAnimation("blinking" , blink);
  rabbit.addAnimation("eating" , eat);
  rabbit.addAnimation("crying" , sad);
  rabbit.changeAnimation("blinking");

  //button
  button = createImg("cut_button.png");
  button.position(220, 30);
  button.size(50, 50);
  button.mouseClicked(drop);

   

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img, 0, 0, 500, 700);
  ground.show();
  rope.show();
  image(fruit_img, fruit.position.x, fruit.position.y, 50, 50);

  //removendo a fruta da tela
  if(fruit!=null){
    image(fruit_img, fruit.position.x, fruit.position.y,60,60); 
  }

  if(collide(fruit,rabbit) ==true){
    rabbit.changeAnimation('eating');
  }
   
  if(collide(fruit,ground.body) ==true ){
    rabbit.changeAnimation('crying');
  }

  Engine.update(engine);
  

 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function collide(body , sprite){
  if(body!=null){
    var d = dist(body.position.x , body.position.y , sprite.position.x , sprite.position.y);

    if(d <= 80){
      World.remove(engine.world , fruit);
      fruit = null;
      return true;
    }
    else{
      return false;
    }
  }
}