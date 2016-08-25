function Bullet(ctx, spaceship) {
	this.ctx = ctx;
	this.spaceship = spaceship;

	this.width = 2;
	this.height = 15;
	this.x = spaceship.x + spaceship.spritesheet.width/2 - this.width;
	this.y = spaceship.y - this.height;
	this.color = '#f1c40f';
	this.speed = 400;
}
Bullet.prototype = {
	update: function() {
		this.y -= this.speed * this.loop.perSecond;
	},
	draw: function() {
		var ctx = this.ctx;

		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	}
}