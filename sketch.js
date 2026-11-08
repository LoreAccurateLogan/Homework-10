let screenSize = 500;

let groundSize = 400;

let grassAmount = 300;
let grass = [];

let treeAmount = 20;
let trees = [];
let treeWidth = 6;
let treeHeight = 80;
let leafSize = 30;

let rabbitAmount = 3;
let rabbits = [];

let cameraX = -150;
let cameraY = -40;
let cameraZ = 200;

let cameraLookX = 0;
let cameraLookY = -40;

function setup() {
  createCanvas(screenSize, screenSize, WEBGL);
  // Help blind or low-vision users understand your sketch
  describe("A 400 by 400 pixel gray canvas.");

  for (let g = 0; g < grassAmount; g++){
    let newGrass = {
      w:random(1,2), // Width
      h:random(7, 11), // Height
      x:random(0 - ((groundSize / 2) - 60), 0 + ((groundSize / 2) - 60)),// X Position
      y:-5,// Y Position
      z:random(0 - ((groundSize / 2) - 60), 0 + ((groundSize / 2) - 60)),// Z Position
      r:random(PI)
    }
    grass.push(newGrass);
  }

  for (let t = 0; t < treeAmount; t++){
    let newTree = {
      x:random(0 - groundSize / 2, 0 + groundSize / 2),
      y:0,
      z:random(0 - groundSize / 2, 0 + groundSize / 2),
      r:random(PI)
    }
    trees.push(newTree);
  }

  for (let r = 0; r < rabbitAmount; r++){
    let newRabbit = {
      x:random(0 - groundSize / 2, 0 + groundSize / 2),
      y:-2,
      z:random(0 - groundSize / 2, 0 + groundSize / 2),
      r:random(PI),
      // Get Destination X and Z to use for Lerping
      destinationX:random(0 - groundSize / 2, 0 + groundSize / 2),
      destinationZ:random(0 - groundSize / 2, 0 + groundSize / 2),
      // Check to see if individual rabbit is at destination
      atDestination: false
    }
    rabbits.push(newRabbit);
  }
  
}



function draw() {
  // Sky
  background(106, 227, 245);
 
  
  // X; Y; Z; LookX; LookY; LookZ; Up Vector
  camera(cameraX, cameraY, cameraZ, cameraLookX, cameraLookY, 0, 0, 11, 0)
  orbitControl();
  directionalLight(209, 224, 255, 1, 0.7, 0.5)
  ambientLight(91, 138, 235);
  
  // Width; Height; Depth;
  // Ground
  push();
  rotateX(HALF_PI);
  fill(66, 148, 62);
  noStroke();
  plane(groundSize,groundSize);
  pop();

  // Grass
  push();
    drawGrass();
  pop();

  // Tree
  for (t of trees){
    drawTree(t.x, t.y, t.z, t.r);
  }
  
  
  // Pond
  push();
  translate(-40, -1);
  
  noStroke();

  fill(82, 181, 255);
  
  cylinder(40, 0, 10);

  pop();

  // Rabbit
  drawRabbit();
  moveRabbit();
  
  drawLandscape();

  // Bottom thingy
  push();
  translate(0, 63.5, 0);
  noStroke();
  rotateY(QUARTER_PI);
  fill(97, 73, 48);
  cone(300, 125, 5);
  pop();
}

// Reset Camera
function mouseClicked(){
  cameraLookX = 0;
  cameraLookY = -40;
}

// Camera Looking
function mouseMoved(){
  if (movedX > 0) {
    cameraLookX += 1;
  } else if (movedX < 0) {
    cameraLookX -= 1;
  }
  
  if (movedY > 0) {
    cameraLookY += 1;
  } else if (movedY < 0) {
    cameraLookY -= 1;
  }
}

function drawGrass(){
  for (g of grass){
    push();
    noStroke();
    fill(104, 201, 99);
    translate(g.x, g.y, g.z);
    rotateY(g.r);
    plane(g.w, g.h)
    pop();
  }
}

function drawTree(x, y, z, r){
  push();
    translate(x,y,z);
    rotateY(r);
    
    // Leaves
    push();
    translate(30,-90,0);
    noStroke();
    fill(104, 201, 99);
    sphere(leafSize);
    pop();
  
    push();
    translate(10,-60,0);
    noStroke();
    fill(79, 153, 76);
    sphere(leafSize);
    pop();
  
    push();
    translate(40,-60,10);
    noStroke();
    fill(86, 120, 84);
    sphere(leafSize);
    pop();
    
    // Bark
    push();
    translate(30,0 - treeHeight / 2,0);
    noStroke();
    fill(125, 99, 62);
    cylinder(treeWidth,treeHeight,10);
    
    pop();
  pop();
}

function drawLandscape(){
  // Top side landscape
  push();
    push();
    noStroke();
    translate(40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
    
    push();
    noStroke();
    translate(120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  pop();

  // Right side landscape
  push();
    translate(400,0, -40)
    rotateY(HALF_PI);
    push();
    noStroke();
    translate(40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
    
    push();
    noStroke();
    translate(120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();

    push();
      noStroke();
      translate(-200,0, -200);
      fill(32, 99, 46);
      ellipsoid(80, 40, 40);
      pop();
    pop();
  
  // Left side landscape
  push();
    translate(0,0,-40);
    rotateY(HALF_PI);
    push();
    noStroke();
    translate(40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
    
    push();
    noStroke();
    translate(120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();

    push();
    noStroke();
    translate(-200,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  pop();

  // Bottom side landscape
  push();
    translate(0,0,400);
    push();
    noStroke();
    translate(40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
    
    push();
    noStroke();
    translate(120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-40,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  
    push();
    noStroke();
    translate(-120,0, -200);
    fill(32, 99, 46);
    ellipsoid(80, 40, 40);
    pop();
  pop();
}

function drawRabbit(){
  for (r of rabbits){
    push();
    translate(r.x, r.y, r.z);
    rotateY(r.r);
    scale(0.5);
    // Body
    push();
    translate(0,0,0);
    noStroke();
    emissiveMaterial(100);
    ellipsoid(12, 10, 10);
    pop();

    // Head
    push();
    translate(-13, -10, 0);
    noStroke();
    emissiveMaterial(100);
    sphere(9);
    pop();
  
    // Ears

    // Left Ear
    push();
    translate(-10,-20, 5);
    noStroke();
    emissiveMaterial(100);
    ellipsoid(2, 10, 5);
    pop();

  // Left Ear Detail
    push();
    translate(-10.5,-20, 5);
    noStroke();
    fill(255, 186, 232);
    ellipsoid(2, 9, 4);
    pop();

    // Right Ear
    push();
    translate(-10,-20, -5);
    noStroke();
    emissiveMaterial(100);
    ellipsoid(2, 10, 5);
    pop();

  // Right Ear Detail
    push();
    translate(-10.5,-20, -5);
    noStroke();
    fill(255, 186, 232);
    ellipsoid(2, 9, 4);
    pop();

    // Tail
    push();
    translate(10, -5, 0);
    noStroke();
    emissiveMaterial(100);
    sphere(5);
    pop();

    // Eyes

  // Left Eye
    push();
    translate(-22, -10, 5);
    rotateY(HALF_PI);
    noStroke();
    emissiveMaterial(255,255,255);
    circle(0,0,7);
    pop();
  // Left Eye
    push();
    translate(-22.1, -10, 5);
    rotateY(HALF_PI);
    noStroke();
    fill(0);
    circle(0,0,5);
    pop();


  // Right Eye
    push();
    translate(-22, -10, -5);
    rotateY(HALF_PI);
    noStroke();
    emissiveMaterial(255,255,255);
    circle(0,0,7);
    pop();
  
  // Right Eye Sparkle
    push();
    translate(-22.1, -10, -5);
    rotateY(HALF_PI);
    noStroke();
    fill(0);
    circle(0,0,5);
    pop();
  pop();
  }
  
}

function moveRabbit(){
  for (r of rabbits){
    // If not at destination
    if (r.destinationX - r.x < 0.1){
      r.atDestination = true;
    }
    if (r.atDestination == false){
      
      r.x = lerp(r.x, r.destinationX, 0.05);
      r.z = lerp(r.z, r.destinationZ, 0.05);

      // Get direction vector
      let dx = r.destinationX - r.x;
      let dz = r.destinationZ - r.z;

      // Convert to angle (had to search up how to do this but now I know)
      let angle = atan2(dx, dz);
      r.r = angle + HALF_PI;
    }
    // If at destination re-roll the destination position
    else
    {
      print(r)
      r.destinationX = random(0 - groundSize / 2, 0 + groundSize / 2);
      r.destinationZ = random(0 - groundSize / 2, 0 + groundSize / 2);
      r.atDestination = false;
    }
  }
}