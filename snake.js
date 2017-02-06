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

function Snake(eventCenter, x, y) {
	this.DIRECTIONS = {
		UP: 'UP',
		DOWN: 'DOWN',
		LEFT: 'LEFT',
		RIGHT: 'RIGHT'
	};

	this.direction = this.DIRECTIONS.UP;
	this.eventCenter = eventCenter;
	this.eatingFood = false;

	this.eventCenter.listenToEvent(this.eventCenter.EVENT_NAME_FOOD_ATE, function(obj){
		this.eatingFood = true;
		console.log("snake event", obj)
	}.bind(this));

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

		if((this.direction == this.DIRECTIONS.UP && direction == this.DIRECTIONS.DOWN) ||
			(this.direction == this.DIRECTIONS.DOWN && direction == this.DIRECTIONS.UP) ||
			(this.direction == this.DIRECTIONS.LEFT && direction == this.DIRECTIONS.RIGHT) ||
			(this.direction == this.DIRECTIONS.RIGHT && direction == this.DIRECTIONS.LEFT)
		) {
			oppositeDir = true;
		}

		if (!oppositeDir) {
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

		if(!this.eatingFood) {
			// chop off last segment
			this.segments.pop();
		}

		var newSeg = new SnakeSegment(newSegCol, newSegRow);
		/* if newSeg is food, grow snake and put new food on board */
		this.segments.unshift(newSeg);
		this.eatingFood = false;
	},

	this.intersectWithSelf = function() {
		var headSegment = this.segments[0];

		return this.segments.slice(1, this.segments.length).filter(function(segment) {
			return headSegment.row === segment.row && headSegment.col === segment.col;
		}).length > 0;
	}

}
