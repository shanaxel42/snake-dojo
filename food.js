
module.exports = {
	Food: Food,
	FoodTypes: Food.types
}


function Food(eventCenter, type, y, x) {
	this.type = type;
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


Food.types = {
	FOOD: "food",
	SPIDER: "spider"
};