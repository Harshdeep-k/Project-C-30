const Engine=Matter.Engine;
const Body=Matter.Body;
const Bodies=Matter.Bodies;
const Constraint=Matter.Constraint;
const World=Matter.World;

let ground,engine,world;
let base1,base2;
let block1=[],b1;
let block2=[],b2;
let polygon,chain;
function preload()
{
    pg=loadImage("polygon.png");
}
function setup()
{
    createCanvas(windowWidth,windowHeight);
    engine=Engine.create();
    world=engine.world;

    ground=new Ground(width/2,height-10,width,20);
    base1=new Ground(580,465,320,20);
    base2=new Ground(980,370,320,20);
  
    polygon=Bodies.circle(180,320,30,{'restitution':0.8,'friction':0.8,'density':0.7,'frictionAir':0.005});
    World.add(world,polygon);
    
    for(let j=1;j<=4;j++)
    {
        for(let i=1;i<=(9-(j*2));i++)
        {
            b1=new Block(420+(i*40)+(j-1)*40,490-(j*50),40,50);
            b2=new Block(820+(i*40)+(j-1)*40,400-(j*50),40,50);
            block1.push(b1);
            block2.push(b2);
        }
    }
    chain =new Slingshot(polygon,{x:200 ,y:220});
    

  
}

function draw()
{
    background("pink");
    Engine.update(engine);
    ground.display();
    base1.display();
    base2.display();
    
    for(let b of block1)
    {
        b.display();
        
    }
    for(let b of block2)
    {
        b.display();
    }
    imageMode(CENTER);
    image(pg,polygon.position.x,polygon.position.y,60,60);
    chain.display();
    textSize(25);
    fill("blue");
    stroke("lime");
    strokeWeight(2);
    text("Press Space for another chance at hitting the tower",300,50);

}
function mouseDragged()
{
    Body.setPosition(polygon,{x:mouseX,y:mouseY})
}
function mouseReleased()
{
    chain.fly();
}
function keyPressed()
{
    if(keyCode===32)
    {
        Body.setPosition(polygon,{x:180,y:320})
        chain.attach(polygon);
    }
}