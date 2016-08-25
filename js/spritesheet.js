function Spritesheet(ctx, img, row, col) {
	this.ctx = ctx;
	this.img = img;
	this.n_row = row;
	this.n_col = col;

	this.row = 0;
	this.col = 0;
	this.width = this.img.width / this.n_col;
	this.height = this.img.height / this.n_row;
	this.interval = 41;
}
Spritesheet.prototype = {
	animate: function() {
		var now = new Date().getTime();

		if ( !this.last_time ) this.last_time = now;
		if ( now - this.last_time < this.interval ) return;

		if ( this.col < this.n_col - 1 ) {
			this.col++;
		} else {
			this.col = 0;
		}

		this.last_time = now;
	},
	draw: function(x, y) {
		this.ctx.drawImage(
			this.img,
			
			this.width*this.col,
			this.height*this.row,
			this.width,
			this.height,
			
			x,
			y,
			this.width,
			this.height
		);
	}
}