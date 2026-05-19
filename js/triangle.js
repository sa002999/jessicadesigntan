// 全域變數
const NB_PARTICLES = 100;
let triangles = [];    // ArrayList<Triangle>
let parts = [];        // Particle[]
let myColor;           // MyColor object
let DIST_MAX = 50;
let canvasWidth = 600, canvasHeight = 600;

// 宣告一個class叫做MyColor
class MyColor
{
  // class的建構式
  constructor()
  {
    // 執行class自己的method成員: init()
    this.init();
  }
  
  // method成員: init() - 初始化class自己的property成員的數值
  init()
  {
    // 初始化顏色轉變速度的最小值與最大值
    this.minSpeed = 0.7;
    this.maxSpeed = 1.5;

    // 初始化RGB各通道的顏色，從0~255隨機挑選
    this.R = random(255);
    this.G = random(255);
    this.B = random(255);

    // 初始化RGB各通道顏色轉變的速度值
    this.Rspeed = (random(1) > 0.5 ? 1 : -1) * random(this.minSpeed, this.maxSpeed);
    this.Gspeed = (random(1) > 0.5 ? 1 : -1) * random(this.minSpeed, this.maxSpeed);
    this.Bspeed = (random(1) > 0.5 ? 1 : -1) * random(this.minSpeed, this.maxSpeed);
  }
  
  // method成員: update() - 更新RGB各通道顏色轉變的速度值
  update()
  {
    this.Rspeed = ((this.R += this.Rspeed) > 255 || (this.R < 0)) ? -this.Rspeed : this.Rspeed;
    this.Gspeed = ((this.G += this.Gspeed) > 255 || (this.G < 0)) ? -this.Gspeed : this.Gspeed;
    this.Bspeed = ((this.B += this.Bspeed) > 255 || (this.B < 0)) ? -this.Bspeed : this.Bspeed;
  }
}

// 宣告一個class叫做Particle
class Particle
{ 
  // class的建構式，初始化class自己的property成員的數值
  constructor()
  {
    // 
    this.RAD = 4;
    this.BOUNCE = -1;

    // 初始化particle的最大移動速度值
    this.SPEED_MAX = 2.2;

    // 初始化particle的移動速度值
    this.speed = createVector(random(-this.SPEED_MAX, this.SPEED_MAX), random(-this.SPEED_MAX, this.SPEED_MAX));

    // 初始化particle的出生點位置，隨機決定，X軸範圍是0~windowWidth，Y軸範圍是0~windowHeight
    this.pos = createVector(random(canvasWidth), random(canvasHeight));

    // 初始化相鄰點陣列
    this.neighboors = [];  // ArrayList<Particle>, neighboors contains the particles within DIST_MAX distance, as well as itself
  }

  // method成員: move() - 移動particle的位置，並檢查是否有超出可移動的範圍界線
  move()
  {
    // 更新particle的出生點位置
    this.pos.add(this.speed);
    
    // 若particle的出生點位置的X座標小於0的話...
    if (this.pos.x < 0)
    {
      // 更新particle的出生點位置的X座標=0
      this.pos.x = 0;

      // 更新particle的移動速度值的X分量
      this.speed.x *= this.BOUNCE;
    }
    // 或者，若particle的出生點位置的X座標大於windowWidth的話...
    else if (this.pos.x > canvasWidth)
    {
      // 更新particle的出生點位置的X座標=windowWidth
      this.pos.x = canvasWidth;

      // 更新particle的移動速度值的X分量
      this.speed.x *= this.BOUNCE;
    }

    // 若particle的出生點位置的Y座標小於0的話...
    if (this.pos.y < 0)
    {
      // 更新particle的出生點位置的Y座標=0
      this.pos.y = 0;

      // 更新particle的移動速度值的Y分量
      this.speed.y *= this.BOUNCE;
    }
    // 或者，若particle的出生點位置的T座標大於windowHeight的話...
    else if (this.pos.y > canvasHeight)
    {
      // 更新particle的出生點位置的X座標=windowHeight
      this.pos.y = canvasHeight;

      // 更新particle的移動速度值的Y分量
      this.speed.y *= this.BOUNCE;
    }
  }
  
  // method成員: display() - 繪製particle
  display()
  {
    // 填充的顏色
    fill(255, 14);

    // 繪製ellipse形狀
    ellipse(this.pos.x, this.pos.y, RAD, RAD);
  }
}

class Triangle
{
  constructor(p1, p2, p3)
  {
    this.A = p1;
    this.B = p2;
    this.C = p3;
  }
  
  display()
  {
    vertex(this.A.x, this.A.y);
    vertex(this.B.x, this.B.y);
    vertex(this.C.x, this.C.y);
  }
}

function setup()
{
  let mycanvas = createCanvas(canvasWidth, canvasHeight);
  // mycanvas.class('mycanvas');
  mycanvas.parent('sketch-holder');
  // mycanvas.position(0, 0);

  for (let i = 0; i < NB_PARTICLES; i++)
  {
    parts.push(new Particle());
  }
  
  myColor = new MyColor();
}

function draw()
{
  myColor.update();
  noStroke();
  fill(120, 1);
  background(255);
  triangles = [];
  let p1, p2;  // Particle object

  for (let i = 0; i < NB_PARTICLES; i++)
  {
    parts[i].move();
  }

  for (let i = 0; i < NB_PARTICLES; i++)
  {
    p1 = parts[i];
    //p1.neighboors = new ArrayList<Particle>();
    p1.neighboors = [];
    p1.neighboors.push(p1);
    for (let j = i+1; j < NB_PARTICLES; j++)
    {
      p2 = parts[j];
      let d = p5.Vector.dist(p1.pos, p2.pos); 
      if (d > 0 && d < DIST_MAX)
      {
        p1.neighboors.push(p2);
      }
    }
    if(p1.neighboors.length > 1)
    {
      addTriangles(p1.neighboors);
    }
  }
  drawTriangles();
}

function drawTriangles()
{
  noStroke();
  fill(myColor.R, myColor.G, myColor.B, 13);
  stroke(max(myColor.R-15, 0), max(myColor.G-15, 0), max(myColor.B-15, 0), 13);
  //noFill();
  beginShape(TRIANGLES);
  for (let i = 0; i < triangles.length; i ++)
  {
    let t = triangles[i];
    t.display();
  }
  endShape();  
}

function addTriangles(p_neighboors)
{
  let s = p_neighboors.length;
  if (s > 2)
  {
    for (let i = 1; i < s-1; i ++)
    { 
      for (let j = i+1; j < s; j ++)
      { 
         triangles.push(new Triangle(p_neighboors[0].pos, p_neighboors[i].pos, p_neighboors[j].pos));
      }
    }
  }
}

function mousePressed()
{
   myColor.init(); 
}