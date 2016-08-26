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

	ctx.save();
	ctx.fillStyle = '#7f8c8d';
	ctx.font = '20px monospace';
	ctx.fillText('LOADING...', 50, 410);

	var widthTotal = 400,	
		widthCurrent = loaded / total * widthTotal;
	ctx.fillRect(50, 420, widthCurrent, 4);

	if ( total === loaded ) {
		startButton('show');
		game_init();
	}
}

// control start button
function startButton(command) {
	var button = document.querySelector('#btnStart');
	if ( command === 'show' ) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		button.style.display = 'block';
	}
	else if ( command === 'hide' ) {
		button.style.display = 'none';
	}
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
		game_over();
	}

	keyboard.tap(K_ENTER, game_pause);

	collision.anyCollision = function(s1, s2) {
		if ( (s1 instanceof Ovni && s2 instanceof Bullet) ||
		     (s1 instanceof Bullet && s2 instanceof Ovni) ) {
			hud.score += 20;
		}
	}

	createEnemy();
}

// can spaceship shot?
function canShot(can) {
	if ( can ) {
		keyboard.tap(K_SPACE, function() {
			spaceship.shot();
		});
	} else {
		keyboard.tap(K_SPACE, null);
	}
}

// generate one ovni per second
function createEnemy() {
	generatorOvni = {
		lastTime: new Date().getTime(),
		process: function() {
			var now = new Date().getTime();
			if ( now - this.lastTime > 1000 ) {
				newOvni();
				this.lastTime = now;	
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
	generatorOvni.lastTime = new Date().getTime();
	startButton('hide');
	loop.start();
	bg_music.play();
	canShot(true);
}

// pause game
function game_pause() {
	if ( loop.canPlay ) {
		canShot(false);
		bg_music.pause();
		loop.stop();

		// draw pause screen
		ctx.globalAlpha = 0.4;
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.globalAlpha = 1;
		ctx.fillStyle = 'white';
		ctx.font = '50px monospace';
		ctx.fillText('PAUSE', 180, 125);
	} else {
		canShot(true);
		bg_music.play();
		loop.lastCicle = 0;
		generatorOvni.lastTime = new Date().getTime();
		loop.start();
	}
}

// game over
function game_over() {
	loop.stop();
	alert('game over');
}