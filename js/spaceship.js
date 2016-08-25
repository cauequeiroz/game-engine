function Spaceship(ctx, keyboard, img) {
	this.ctx = ctx;
	this.img = img;
	this.keyboard = keyboard;

	this.x = 0;
	this.y = 0;
	this.speed = 200;

	this.spritesheet = new Spritesheet(this.ctx, this.img, 3, 2);
	this.spritesheet.interval = 75;
}
Spaceship.prototype = {
	update: function() {
		var increment = this.speed * this.loop.perSecond;

		if ( this.keyboard.pressed(K_LEFT) && this.x > 0 ) {
			this.x -= increment;
		}
		else if ( this.keyboard.pressed(K_RIGHT) && this.x < this.ctx.canvas.width - 36 ) {
			this.x += increment;
		}
		if ( this.keyboard.pressed(K_UP) && this.y > 0 ) {
			this.y -= increment;
		}
		else if ( this.keyboard.pressed(K_DOWN) && this.y < this.ctx.canvas.height - 48 ) {
			this.y += increment;
		}
	},
	draw: function() {
		this.spritesheet.draw(this.x, this.y);
		this.spritesheet.animate();
	},
	shot: function() {
		var bullet = new Bullet(this.ctx, this);
		this.loop.addSprite(bullet);
	},
	restartPosition: function() {
		this.x = this.ctx.canvas.width/2 - 18;
		this.y = this.ctx.canvas.height - 60;
	}
}