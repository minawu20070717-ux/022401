let shapes = [];
let song;
let amplitude;
let points = [[-3, 5], [5, 6], [7, 2], [0, -4], [-6, -3]];

function preload() {
  song = loadSound('midnight-quirk-255361.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  amplitude = new p5.Amplitude();

  for (let i = 0; i < 10; i++) {
    shapes.push(createShape());
  }
}

function createShape() {
  let obj = {};
  obj.x = random(0, windowWidth);
  obj.y = random(0, windowHeight);
  obj.dx = random(-3, 3);
  obj.dy = random(-3, 3);
  obj.scale = random(1, 10);
  obj.color = color(random(255), random(255), random(255));
  obj.points = points.map(p => {
    let point = [];
    point[0] = map(p[0], -10, 10, -obj.scale * 10, obj.scale * 10);
    point[1] = map(p[1], -10, 10, -obj.scale * 10, obj.scale * 10);
    return point;
  });
  return obj;
}

function draw() {
  background('#ffcdb2');
  strokeWeight(2);

  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.5, 2);

  for (let shape of shapes) {
    shape.x += shape.dx;
    shape.y += shape.dy;

    if (shape.x < 0 || shape.x > windowWidth) {
      shape.dx *= -1;
    }
    if (shape.y < 0 || shape.y > windowHeight) {
      shape.dy *= -1;
    }

    fill(shape.color);
    stroke(shape.color);

    push();
    translate(shape.x, shape.y);
    scale(sizeFactor);
    beginShape();
    for (let p of shape.points) {
      vertex(p[0], p[1]);
    }
    endShape(CLOSE);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
  } else {
    song.loop();
  }
}
