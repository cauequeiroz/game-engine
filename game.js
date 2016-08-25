// get canvas and set context
var canvas = document.querySelector('#canvas'),
	ctx    = canvas.getContext('2d');

// create variables
var loop,
	keyboard,
	collision,
	images,
	bg1,
	bg2,
	bg3,
	total = 0,
	loaded = 0;

// load images
loadImages();
function loadImages() {
	images = {
		space: 'bg-space.png',
		stars: 'bg-stars.png',
		cloud: 'bg-cloud.png'
	}

	for ( var i in images ) {
		var img = new Image();
			img.src = 'img/'+images[i];
			img.onload = loading;

		total++;
		images[i] = img;
	}
}
function loading() {
	loaded++;
	if ( total === loaded ) game_init();
}

// initialize objects
function game_init() {
	loop      = new Loop(ctx);
	keyboard  = new Keyboard(document);
	collision = new Collision();
	bg1		  = new Background(ctx, images.space);
	bg2		  = new Background(ctx, images.stars);
	bg3		  = new Background(ctx, images.cloud);

	loop.addSprite(bg1);
	loop.addSprite(bg2);
	loop.addSprite(bg3);

	game_config();
}

// config sprites
function game_config() {
	bg1.speed = 60;
	bg2.speed = 150;
	bg3.speed = 500;

	game_start();
}

// start game
function game_start() {
	loop.start();
}