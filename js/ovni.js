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
	},
	draw: function() {
		this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}
}