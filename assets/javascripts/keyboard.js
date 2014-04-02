function KeyboardControls(object, options) {
	this.object = object;
	options = options || {};
	this.domElement = options.domElement || document;
	this.moveSpeed = options.moveSpeed || 1;

	this.domElement.addEventListener('keydown', this.onKeyDown.bind(this), false);
	this.domElement.addEventListener('keyup', this.onKeyUp.bind(this), false);
}

KeyboardControls.prototype = {
	update: function() {
		if (this.moveFoward) 	this.object.translateZ(-this.moveSpeed);
		if (this.moveBackward) 	this.object.translateZ( this.moveSpeed);
		if (this.moveLeft)		this.object.translateX(-this.moveSpeed);
		if (this.moveRight)		this.object.translateX( this.moveSpeed);
	},

	onKeyDown: function (event) {
		switch(event.keyCode) {
			case 38: // up
			case 87: // W
				this.moveFoward = true;
				break;
			case 37:// left
			case 65:// A
				this.moveLeft = true;
				break;
			case 40:// down
			case 83:// S
				this.moveBackward = true;
				break;
			case 39: // right
			case 68: // D
				this.moveRight = true;
				break;
				
		}
	},

	onKeyUp: function (event) {
		switch(event.keyCode) {
			case 38: // up
			case 87: // W
				this.moveFoward = false;
				break;
			case 37:// left
			case 65:// A
				this.moveLeft = false;
				break;
			case 40:// down
			case 83:// S
				this.moveBackward = false;
				break;
			case 39: // right
			case 68: // D
				this.moveRight = false;
				break;
		}
	}
};