function Ovni(ctx, img) {
	this.ctx = ctx;
	this.img = img;

	this.x = 0;
	this.y = 0;
	this.speed = 0;
	this.width = img.width;
	this.height = img.height;
}
Ovni.prototype = {
	update: function() {
		this.y += this.speed * this.loop.perSecond;

		if ( this.y > this.ctx.canvas.height ) {
			this.loop.removeSprite(this);
			this.collision.removeSprite(this);
		}
	},
	draw: function() {
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	},
	getRects: function() {
		var rects = [
			{x:this.x+20, y:this.y+1, w:25, h:10},
			{x:this.x+2, y:this.y+11, w:60, h:12},
			{x:this.x+20, y:this.y+23, w:25, h:7}
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
		if ( other instanceof Bullet ) {
			this.loop.removeSprite(this);
			this.collision.removeSprite(this);
			this.loop.removeSprite(other);
			this.collision.removeSprite(other);
		}
	}
}