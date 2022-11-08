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
var mute;
var rope2;
var fruit_con2;
var button2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air; 
var blower;

function preload(){
  bg_img = loadImage("background.png");
  fruit_img = loadImage("melon.png");
  rabbit_img = loadImage("Rabbit-01.png");
  blink = loadAnimation("blink_1.png" , "blink_2.png" , "blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png" , "eat_2.png" , "eat_3.png" , "eat_4.png");
  sad = loadAnimation("sad_1.png" , "sad_2.png" , "sad_3.png");

  bk_song = loadSound("sound1.mp3");
  cut_sound = loadSound("cut.mp3");
  sad_sound = loadSound("sad.wav");
  eating_sound = loadSound("eating.mp3");
  air = loadSound("air.wav");

  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  eat.looping = false;
  sad.looping = false;
}

function setup() 
{
  createCanvas(500,700);

  bk_song.play();
  
  bk_song.setVolume(0.3);
  cut_sound.setVolume(0.8);
  sad_sound.setVolume(0.8);
  eating_sound.setVolume(0.8);
  air.setVolume(0.8);
  
  
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);

  rope = new Rope(6,{x:245, y: 30});
  rope2 = new Rope(4, {x: 400, y: 225});

  var fruit_options = {desity:0.0001};
  fruit = Bodies.circle(300, 300, 15, fruit_options);
  Matter.Composite.add(rope.body, fruit);
  fruit_con = new Link(rope, fruit);
  fruit_con2 = new Link(rope2, fruit);
  
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

  button2 = createImg("cut_button.png");
  button2.position(380, 225);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  //botao mudo
  mute = createImg("mute.png");
  mute.position(450, 20);
  mute.size(50, 50);
  mute.mouseClicked(mudo);

  //vento
  blower = createImg("blower.png");
  blower.position(10, 250);
  blower.size(150, 100);
  blower.mouseClicked(airblow);

   

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
  rope2.show();
  

  //removendo a fruta da tela
  if(fruit!=null){
    image(fruit_img, fruit.position.x, fruit.position.y,60,60); 
  }

  if(collide(fruit,rabbit) ==true){
    rabbit.changeAnimation('eating');
    eating_sound.play();
  }
   
  if(fruit != null && fruit.position.y >= 650){
    rabbit.changeAnimation('crying');
    sad_sound.play();
  }

  Engine.update(engine);
  

 
  drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null;


  
  cut_sound.play();
}

function drop2(){
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null;


  
  cut_sound.play();
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

function airblow(){
  Matter.Body.applyForce(fruit,{x:0, y:0}, {x:0.01, y:0});

  air.play();
}

function mudo(){
  if(bk_song.isPlaying()){
    bk_song.stop()}
    else{
      bk_song.play()}
    }