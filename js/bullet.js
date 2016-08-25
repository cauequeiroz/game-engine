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

		if ( this.y < -this.height ) {
			this.loop.removeSprite(this);
			this.collision.removeSprite(this);
		}
	},
	draw: function() {
		var ctx = this.ctx;

		ctx.save();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.restore();
	},
	getRects: function() {
		var rects = [
			{x: this.x, y: this.y, w: this.width, h:this.height}
		];

		// var ctx = this.ctx;
		// for ( var i in rects ) {
		// 	ctx.save();
		// 	ctx.strokeStyle = 'yellow';
		// 	ctx.strokeRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
		// 	ctx.restore();
		// }

		return rects;
	},
	collidedWith: function(other) {

	}
}