module.exports = {
	Snake: Snake
}


function SnakeSegment(x, y) {
	this.x = x;
	this.y = y;
}

SnakeSegment.prototype = {
	constructor: SnakeSegment,
};

function Snake(x, y) {
	this.segments = [ new SnakeSegment(x, y) ];

}
