function Background(ctx, img) {
	this.ctx = ctx;
	this.img = img;

	this.x = 0;
	this.y = 0;
	this.width = img.width;
	this.height = img.height;
	this.divisor = 0;
	this.speed = 0;
}
Background.prototype = {
	update: function() {
		this.divisor += this.speed * this.loop.perSecond;

		if ( this.divisor > this.img.height ) {
			this.divisor = 0;
		}		
	},
	draw: function() {
		this.y = this.divisor - this.height;
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

		this.y = this.divisor;
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}