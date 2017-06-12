
module.exports = {
	Food: Food,
	FoodTypes: Food.types
}


function Food(eventCenter, type, y, x) {
	this.points = Food.points[type];
	console.log("ASDFASDFASDF", type, this.points);
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
	},

	this.equals = function(otherFood) {
		return this.row === otherFood.row && this.col === otherFood.col && this.type === otherFood.type;
	}
}


Food.types = {
	FOOD: "food",
	SPIDER: "spider"
};

// TODO make this better
Food.points = {
	food: 1,
	spider: 200
};