function HUD(ctx, spaceship) {
	this.ctx = ctx;
	this.spaceship = spaceship;

	this.score = 0;
	this.spritesheet = new Spritesheet(this.ctx, this.spaceship.img, 3, 2);
}
HUD.prototype = {
	update: function() {

	},
	draw: function() {
		var x = 20,
			y = 20,
			scoreTxt = 'SCORE: '+this.score;

		for ( var i=0; i<this.spaceship.lifes; i++ ) {
			this.ctx.scale(0.5, 0.5);
			this.spritesheet.draw(x, y);
			this.ctx.scale(2, 2);
			x += 40;
		}

		this.ctx.save();
		this.ctx.fillStyle = 'white';
		this.ctx.font = '18px monospace';
		this.ctx.fillText(scoreTxt, 100, 26);
		this.ctx.restore();
	}
}