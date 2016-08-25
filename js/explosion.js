var explosion_sound = new Audio();
	explosion_sound.src = 'snd/explosion.mp3';
	explosion_sound.volume = 0.4;
	explosion_sound.load();

function Explosion(ctx, ovni) {
	this.ctx = ctx;
	this.ovni = ovni;

	this.x = ovni.x;
	this.y = ovni.y;
	this.spritesheet = new Spritesheet(this.ctx, images.explosion, 1, 5);
	this.spritesheet.interval = 75;
	this.end = null;

	var $this = this;
	this.spritesheet.end = function() {
		$this.loop.removeSprite($this);
		if ($this.end) $this.end();
	}

	explosion_sound.currentTime = 0.0;
	explosion_sound.play();
}
Explosion.prototype = {
	update: function() {

	},
	draw: function() {
		this.spritesheet.draw(this.x, this.y);
		this.spritesheet.animate();
	}
}