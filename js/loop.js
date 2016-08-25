function Loop(ctx) {
	this.ctx = ctx;

	this.sprites = [];
	this.removeSprites = [];
	this.processList = [];
	this.canPlay = false;
	this.lastCicle = 0;
	this.perSecond = 0;
}
Loop.prototype = {
	addSprite: function(sprite) {
		this.sprites.push(sprite);
		sprite.loop = this;
	},
	removeSprite: function(sprite) {
		this.removeSprites.push(sprite);
	},
	addProcess: function(process) {
		this.processList.push(process);
	},
	start: function() {
		this.canPlay = true;
		this.nextFrame();
	},
	stop: function() {
		this.canPlay = false;
	},
	nextFrame: function() {
		if ( !this.canPlay ) return;

		var now = new Date().getTime();
		if ( this.lastCicle === 0 ) this.lastCicle = now;
		var timeDifference = now - this.lastCicle;
		this.perSecond = timeDifference / 1000;

		for ( var i in this.sprites )
			this.sprites[i].update();
		for ( var i in this.sprites )
			this.sprites[i].draw();
		for ( var i in this.processList )
			this.processList[i].process();

		this.processExclusions();

		this.lastCicle = now;

		var $this = this;
		requestAnimationFrame(function() {
			$this.nextFrame();
		});
	},
	processExclusions: function() {
		var newSprites = [];

		for ( var i in this.sprites ) {
			if ( this.removeSprites.indexOf(this.sprites[i]) === -1 ) {
				newSprites.push(this.sprites[i]);
			}
		}

		this.removeSprites = [];
		this.sprites = newSprites;
	}
}