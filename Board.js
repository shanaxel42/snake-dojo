var Snake = require('./snake.js').Snake;
var Food = require('./food.js').Food;
var EventCenter = require('./event.js').EventCenter;

module.exports = {
	Board: Board,
	BoardDisplay: BoardDisplay
}

/**
 * Created by saxelrod on 12/5/16.
 */
function Board(eventCenter, width, height, snake) {
	this.points = 0;
	this.eventListeners = {};
	this.width = width;
	this.height = height;
	this.snake = snake;
	this.food = [];
	this.eventCenter = eventCenter;



	this.onFoodEaten = function (eatenFood) {
		this.removeFood(eatenFood);

		if (eatenFood.type !== "spider") {
			if(Math.random() > 0.5) {
				this.createSpider();
			}
			this.createFood(Food.types.FOOD);
		}

		this.points += eatenFood.points;

	};

	this.eventCenter.listenToEvent(this.eventCenter.EVENT_NAME_FOOD_ATE, this.onFoodEaten.bind(this));

	this.removeFood = function (food) {
		this.food = this.food.filter(function(f) {
			return f != food;
		});
	};

	this.createSpider = function () {
		console.log("createSpider!!!")
		for (var i = 0; i < this.food.length; i++) {
			if (this.food[i].type === 'spider') {
				return;
			}
		}
		this.createFood(Food.types.SPIDER);
	};

	this.moveFood = function (food) {
		//remove the eaten food and add a new one
		food.move(parseInt(Math.random() * this.height, 10), parseInt(Math.random() * this.width, 10));

		for (var i = 0; i < this.snake.segments.length; i++) {
			if (food.segmentIsHere(this.snake.segments[i])) {
				this.moveFood(food);
			}
		}
	};
	this.createFood = function(type){
		var f = new Food(this.eventCenter, type, 15, 6);
		this.food.push(f);
		this.moveFood(f);
		return f;
	};

	this.step = function () {
		snake.move();
		return !this.isSnakeDead();
	};

	this.hasFoodAt = function (row, col) {
		for (var i = 0; i < this.food.length; i++) {
			if (this.food[i].isHere(row, col)) {
				return this.food[i];
			}
		}
		return null;
	};

	this.isSnakeDead = function () {
		var segment = this.snake.segments[0];
		return segment.row >= this.height
				|| segment.col >= this.width
				|| segment.row < 0
				|| segment.col < 0
				|| this.snake.intersectWithSelf();
	};

	this.ateFood = function () {
		console.log("ateFood(): food", this.food);
		for (var i = 0; i < this.food.length; i++) {
			if (this.food[i].segmentIsHere(this.snake.segments[0])) {
				this.eventCenter.fireEvent(this.eventCenter.EVENT_NAME_FOOD_ATE, this.food[i]);
			}
		}
	}

	this.createFood(Food.types.FOOD);
}

function BoardDisplay(board) {
	this.el = document.getElementById("gameBoard");
	this.board = board;
}

BoardDisplay.prototype = {
	constructor: BoardDisplay,

	drawCell: function (row, col) {
		var cls = "";

		var cellFood = this.board.hasFoodAt(row, col);
		if (this.board.snake.hasSegmentAt(row, col)) {
			cls = "snake";
		} else if (cellFood) {
			cls += cellFood.type;
			console.log(cls);
		}

		return '<td id="col_' + col + '" class="' + cls + '">O</td>';
	},

	shouldInsertSpider: function () {
		return true;
	},

	draw: function () {
		if (this.board.ateFood()) {
			// do something
		} else if (this.board.isSnakeDead()) {
			document.getElementsByTagName("pre")[0].style = "display: block"
		} else {
			var t = "";

			for (var i = 0; i < this.board.width; i++) {
				var empty = true;
				t += '<tr id="row_' + i + '">';
				for (var j = 0; j < this.board.height; j++) {
					t += this.drawCell(i, j);
				}

				t += '</tr>\n';
			}

			this.el.innerHTML = ("<div><span class=\"points-label\">Points:</span><span class=\"points\"> " + this.board.points + "</span></div><table>" + t + "</table>");
		}

		if (this.shouldInsertSpider()) {

		}
	}
};