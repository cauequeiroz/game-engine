// get canvas and set context
var canvas = document.querySelector('#canvas'),
	ctx    = canvas.getContext('2d');

// create ball
var ball = new Ball(ctx);
	ball.x = 100;
	ball.y = 100;
	ball.radius = 10;
	ball.color  = '#2ecc71';
	ball.velX   = -10;
	ball.velY   = -4;

var ball2 = new Ball(ctx);
	ball2.x = 285;
	ball2.y = 285;
	ball2.radius = 28;
	ball2.color  = '#f1c40f';
	ball2.velX   = 14;
	ball2.velY   = 8;

// Create game loop
var loop = new Loop(ctx);
	loop.addSprite(ball);
	loop.addSprite(ball2);

	loop.start();