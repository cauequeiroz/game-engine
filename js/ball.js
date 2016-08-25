function Ball(ctx) {
	this.ctx = ctx;

	this.x = 0;
	this.y = 0;
	this.velX = 0;
	this.velY = 0;
	this.color = 'black';
	this.radius = 10;
}
Ball.prototype = {
	update: function() {
		if ( this.x < this.radius || this.x > this.ctx.canvas.width - this.radius ) {
			this.velX *= -1;
		}
		if ( this.y < this.radius || this.y > this.ctx.canvas.height -this.radius ) {
			this.velY *= -1;
		}

		this.x += this.velX;
		this.y += this.velY;
	},
	draw: function() {
		var ctx = this.ctx;

		ctx.save();
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fill();
		ctx.restore();
	},
	getRects: function() {
		var rects = [
				{
					x: this.x - this.radius,
					y: this.y - this.radius,
					w: this.radius * 2,
					h: this.radius * 2
				}
			],
			ctx   = this.ctx;

		for ( var i in rects ) {
			ctx.save();
			ctx.strokeStyle = 'black';
			ctx.strokeRect(rects[i].x, rects[i].y, rects[i].w, rects[i].h);
			ctx.restore();
		}

		return rects;
	},
	collidedWith: function(other) {
		if ( this.x < other.x ) {
			this.velX = -Math.abs(this.velX);
		}
		else if ( this.x > other.x ) {
			this.velX = Math.abs(this.velX);	
		}
		if ( this.y < other.y ) {
			this.velY = -Math.abs(this.velY);
		}
		else if ( this.y > other.y ) {
			this.velY = Math.abs(this.velY);	
		}
	}
}