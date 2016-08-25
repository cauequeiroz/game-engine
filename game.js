// get canvas and set context
var canvas = document.querySelector('#canvas'),
	ctx    = canvas.getContext('2d');

// import classes
var loop      = new Loop(ctx),
	collision = new Collision();

// create ball
var ball = new Ball(ctx);
	ball.x = 100;
	ball.y = 100;
	ball.radius = 20;
	ball.color  = '#2ecc71';
	ball.velX   = -10;
	ball.velY   = -4;

var ball2 = new Ball(ctx);
	ball2.x = 285;
	ball2.y = 285;
	ball2.radius = 35;
	ball2.color  = '#f1c40f';
	ball2.velX   = 14;
	ball2.velY   = 8;

var ball3 = new Ball(ctx);
	ball3.x = 50;
	ball3.y = 50;
	ball3.radius = 28;
	ball3.color  = '#c0392b';
	ball3.velX   = -14;
	ball3.velY   = 8;


loop.addSprite(ball);
loop.addSprite(ball2);
loop.addSprite(ball3);

loop.addProcess(collision);
collision.addSprite(ball);
collision.addSprite(ball2);
collision.addSprite(ball3);

loop.start();