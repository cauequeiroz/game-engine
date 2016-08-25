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
	bg_music,
	total = 0,
	loaded = 0;

// load bg music
loadMusic();
function loadMusic() {
	bg_music = new Audio();
	bg_music.src = 'snd/bg.mp3';
	bg_music.volume = 0.8;
	bg_music.load();
	bg_music.loop = true;
	bg_music.play();
}

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
	hud		  = new HUD(ctx, spaceship);

	loop.addSprite(bg1);
	loop.addSprite(bg2);
	loop.addSprite(bg3);
	loop.addSprite(hud);
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
	spaceship.die = function() {
		gameOver();
	}
	keyboard.tap(K_SPACE, function() {
		spaceship.shot();
	});

	collision.anyCollision = function(s1, s2) {
		if ( (s1 instanceof Ovni && s2 instanceof Bullet) ||
		     (s1 instanceof Bullet && s2 instanceof Ovni) ) {
			hud.score += 20;
		}
	}

	game_start();
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

// start game
function game_start() {
	loop.start();
	createEnemy();
}

// game over
function gameOver() {
	loop.stop();
	alert('game over');
}