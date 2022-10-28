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


function preload(){
  bg_img = loadImage("background.png");
  fruit_img = loadImage("melon.png");
  rabbit_img = loadImage("Rabbit-01.png");
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

  Engine.update(engine);
  

 
   drawSprites();
}

function drop(){
  rope.break();
  fruit_con.detach();
  fruit_con = null
}