module.exports = {
	Snake: Snake
}


function SnakeSegment(x, y) {
	this.row = y;
	this.col = x;
}

SnakeSegment.prototype = {
	constructor: SnakeSegment,
};

function Snake(x, y) {
	this.DIRECTIONS = {
		UP: 'UP',
		DOWN: 'DOWN',
		LEFT: 'LEFT',
		RIGHT: 'RIGHT'
	};

	this.direction = this.DIRECTIONS.UP;

	this.segments = [ new SnakeSegment(x, y),
					  new SnakeSegment(x -1, y),
					  new SnakeSegment(x -2, y),
					  new SnakeSegment(x -3, y),
					  new SnakeSegment(x -4, y),
					  new SnakeSegment(x -5, y),
					  new SnakeSegment(x -6, y)];

	this.hasSegmentAt = function(row, col) {
		for (var i=0; i < this.segments.length; i++) {
			if (this.segments[i].col === col && this.segments[i].row === row) {
				return true;
			}
		}
		return false;
	},

	this.setDirection = function(direction) {
		console.log(direction);
		var oppositeDir = false;

		this.DIRECTIONS.keys().filter(function(d) {
			DO STUFF HERE
			return d === direction;
		});

		if(this.direction == this.DIRECTIONS.UP && direction == this.DIRECTIONS.DOWN) {
			oppositeDir = true;
		}

		if(!oppositeDir) {
			this.direction = direction;
		}
	},

	this.move = function() {
		var currentHeadSegment = this.segments[0]; //duplicate this?

		var newSegCol;
		var newSegRow;
		switch (this.direction) {
			case this.DIRECTIONS.UP:
				newSegCol = currentHeadSegment['col'];
				newSegRow = currentHeadSegment['row'] - 1;
				break;
			case this.DIRECTIONS.LEFT:
				newSegCol = currentHeadSegment['col'] - 1;
				newSegRow = currentHeadSegment['row'];
				break;
			case this.DIRECTIONS.RIGHT:
				newSegCol = currentHeadSegment['col'] + 1;
				newSegRow = currentHeadSegment['row'];
				break;
			case this.DIRECTIONS.DOWN:
				newSegCol = currentHeadSegment['col'];
				newSegRow = currentHeadSegment['row'] + 1;
				break;
		}

		this.segments.unshift(new SnakeSegment(newSegCol, newSegRow));
		// chop off last segment
		this.segments.pop();
	}

	this.intersectWithSelf = function() {
		var headSegment = this.segments[0];

		return this.segments.slice(1, this.segments.length).filter(function(segment) {
			return headSegment.row === segment.row && headSegment.col === segment.col;
		}).length > 0;
	}
}
