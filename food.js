module.exports = {
	Food: Food
}


function Food(eventCenter, y, x) {
	this.row = y;
	this.col = x;
	this.eventCenter = eventCenter;

	this.move = function(row, col) {
		this.row = row;
		this.col = col;
	},

	this.isHere = function(row, col){
		return this.row == row && this.col == col;
	},

	this.segmentIsHere = function(snakeSegment) {
		return this.isHere(snakeSegment.row, snakeSegment.col);
	}
}
