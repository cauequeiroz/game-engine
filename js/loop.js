function Loop(ctx) {
	this.ctx = ctx;

	this.sprites = [];
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

		this.lastCicle = now;

		var $this = this;
		requestAnimationFrame(function() {
			$this.nextFrame();
		});
	}
}