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
	this.eventListeners = {};
	this.width = width;
	this.height = height;
	this.snake = snake;
	this.food = new Food(eventCenter, 3, 4);
	this.eventCenter = eventCenter;

	this.eventCenter.listenToEvent(this.eventCenter.EVENT_NAME_FOOD_ATE, function(obj) {
			this.moveFood();
	}.bind(this));

	this.moveFood = function() {
		this.food.move(parseInt(Math.random() * this.height, 10), parseInt(Math.random() * this.width, 10));

		for(var i = 0; i < this.snake.segments.length; i++) {
			if(this.food.segmentIsHere(this.snake.segments[i])) {
				this.moveFood();
			}
		}
	},

	this.step = function () {
		snake.move();
		return !this.isSnakeDead();
	},

	this.hasFoodAt = function (row, col) {
		return this.food.isHere(row, col);
	},

	this.isSnakeDead = function () {
		var segment = this.snake.segments[0];
		return segment.row >= this.height
				|| segment.col >= this.width
				|| segment.row < 0
				|| segment.col < 0
				|| this.snake.intersectWithSelf();
	},

	this.ateFood = function () {
		if (this.food.segmentIsHere(this.snake.segments[0])) {
			this.eventCenter.fireEvent(this.eventCenter.EVENT_NAME_FOOD_ATE, this);
		}
	}
}

function BoardDisplay(board) {
	this.el = document.getElementById("gameBoard");
	this.board = board;
}

BoardDisplay.prototype = {
	constructor: BoardDisplay,

	drawCell: function (row, col) {
		var cls = "";

		if (this.board.snake.hasSegmentAt(row, col)) {
			cls = "snake";
		} else if (this.board.hasFoodAt(row, col)) {
			cls += "food";
		}

		return '<td id="col_' + col + '" class="' + cls + '">O</td>';
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

			this.el.innerHTML = ("<table>" + t + "</table>");
		}
	}
};