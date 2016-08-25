function Spaceship(ctx, keyboard, img) {
	this.ctx = ctx;
	this.img = img;
	this.keyboard = keyboard;

	this.x = 0;
	this.y = 0;
	this.speed = 250;

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
		this.collision.addSprite(bullet);
	},
	restartPosition: function() {
		this.x = this.ctx.canvas.width/2 - 18;
		this.y = this.ctx.canvas.height - 60;
	},
	getRects: function() {
		var rects = [
			{x:this.x+2, y:this.y+19, w:9, h:13},
			{x:this.x+13, y:this.y+3, w:10, h:33},
			{x:this.x+25, y:this.y+19, w:9, h:13}
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
		if ( other instanceof Ovni ) {
			this.loop.removeSprite(this);
			this.collision.removeSprite(this);
			this.loop.removeSprite(other);
			this.collision.removeSprite(other);

			var explosion1 = new Explosion(this.ctx, this),
				explosion2 = new Explosion(this.ctx, other);

			this.loop.addSprite(explosion1);
			this.loop.addSprite(explosion2);

			explosion1.end = function() {
				this.loop.stop();
				alert('game over');
			}
		}
	}
}