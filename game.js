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
	spaceship,
	generatorOvni,
	total = 0,
	loaded = 0;

// load images
loadImages();
function loadImages() {
	images = {
		space: 'bg-space.png',
		stars: 'bg-stars.png',
		cloud: 'bg-cloud.png',
		spaceship: 'spaceship.png',
		ovni: 'ovni.png',
		explosion: 'explosion.png'
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
	spaceship = new Spaceship(ctx, keyboard, images.spaceship);

	loop.addSprite(bg1);
	loop.addSprite(bg2);
	loop.addSprite(bg3);
	loop.addSprite(spaceship);

	loop.addProcess(collision);
	collision.addSprite(spaceship);

	game_config();
}

// config sprites
function game_config() {
	bg1.speed = 60;
	bg2.speed = 150;
	bg3.speed = 500;

	spaceship.restartPosition();
	keyboard.tap(K_SPACE, function() {
		spaceship.shot();
	});

	game_start();
}

// start game
function game_start() {
	loop.start();

	createEnemy();
}

// generate one ovni per second
function createEnemy() {
	generatorOvni = {
		last_time: new Date().getTime(),
		process: function() {
			var now = new Date().getTime();
			if ( now - this.last_time > 1000 ) {
				newOvni();
				this.last_time = now;	
			}			
		}
	}

	loop.addProcess(generatorOvni);
}
function newOvni() {
	var ovni = new Ovni(this.ctx, images.ovni);
		ovni.x = Math.floor(Math.random() * ( this.ctx.canvas.width - images.ovni.width + 1 ));
		ovni.y = -images.ovni.height;
		ovni.speed = Math.floor(150 + Math.random() * (600 - 150 + 1));

	loop.addSprite(ovni);
	collision.addSprite(ovni);
}