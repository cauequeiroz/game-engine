var K_LEFT  = 37,
	K_RIGHT = 39,
	K_UP	= 38,
	K_DOWN	= 40,
	K_SPACE = 32,
	K_ENTER = 13;

function Keyboard(element) {
	this.press = [];
	this.tapList = [];
	this.tapFunction = [];

	var $this = this;
	element.addEventListener('keydown', function(e) {
		$this.press[e.keyCode] = true;

		if ( !$this.tapList[e.keyCode] && $this.tapFunction[e.keyCode] ) {
			$this.tapList[e.keyCode] = true;
			$this.tapFunction[e.keyCode] () ;
		}
	});
	element.addEventListener('keyup', function(e) {
		$this.press[e.keyCode] = false;
		$this.tapList[e.keyCode] = false;
	});
}
Keyboard.prototype = {
	pressed: function(key) {
		return this.press[key];
	},
	tap: function(key, callback) {
		this.tapFunction[key] = callback;
	}
}