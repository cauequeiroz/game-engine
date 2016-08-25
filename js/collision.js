function Collision() {
	this.sprites = [];
	this.removeSprites = [];
	this.anyCollision = null;
}
Collision.prototype = {
	addSprite: function(sprite) {
		this.sprites.push(sprite);
		sprite.collision = this;
	},
	removeSprite: function(sprite) {
		this.removeSprites.push(sprite);
	},
	process: function() {
		var testList = new Object();

		for ( var i in this.sprites ) {
			for ( var j in this.sprites ) {
				if ( i === j ) continue;

				var obj1 = this.createString(this.sprites[i]),
					obj2 = this.createString(this.sprites[j]);

				if ( !testList[obj1] ) testList[obj1] = [];
				if ( !testList[obj2] ) testList[obj2] = [];

				if ( testList[obj1].indexOf(obj2) === -1 && testList[obj2].indexOf(obj1) === -1 ) {
					this.testCollision(this.sprites[i], this.sprites[j]);	

					testList[obj1].push(obj2);
					testList[obj2].push(obj1);
				}				
			}
		}

		this.processExclusions();
	},
	testCollision: function(sprite1, sprite2) {
		var rects1 = sprite1.getRects(),
			rects2 = sprite2.getRects();

		collisions:
		for ( var i in rects1 ) {
			for ( var j in rects2 ) {
				if ( this.hasCollided(rects1[i], rects2[j]) ) {
					sprite1.collidedWith(sprite2);
					sprite2.collidedWith(sprite1);

					if ( this.anyCollision ) this.anyCollision(sprite1, sprite2);
					break collisions;
				}
			}
		}
	},
	hasCollided: function(s1, s2) {
		return (s1.x + s1.w) > s2.x &&
			   s1.x < s2.x + s2.w &&
			   (s1.y + s1.h) > s2.y &&
			   s1.y < s2.y + s2.h;
	},
	createString: function(sprite) {
		var rects = sprite.getRects(),
			str   = '';

		for ( var i in rects ) {
			str += 'x:'+rects[i].x+','+
				   'y:'+rects[i].y+','+
				   'w:'+rects[i].w+','+
				   'h:'+rects[i].h+'\n';
		}

		return str;
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
