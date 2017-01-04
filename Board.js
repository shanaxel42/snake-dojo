var Snake = require('./snake.js').Snake;

module.exports = {
	Board: Board,
	BoardDisplay: BoardDisplay
}

/**
 * Created by saxelrod on 12/5/16.
 */
function Board(width, height, snake) {
	this.width = width;
	this.height = height;
	this.snake = snake;

	this.step = function() {
		snake.move();
		return !this.isSnakeDead();
	},

	this.isSnakeDead = function() {
		var segment = snake.segments[0];
		return segment.row >= this.height
						|| segment.col >= this.width
						|| segment.row < 0
						|| segment.col < 0
				|| snake.intersectWithSelf();
	}
}

function BoardDisplay(board) {
	this.el = document.getElementById("gameBoard");
	this.board = board;
}

BoardDisplay.prototype = {
	constructor: BoardDisplay,

	drawEmptyCell: function(row, col) {
		return '<td id="col_' + col + '">O</td>';
	},

	drawSnakeCell: function(row, col) {
		return '<td id="col_' + col + '" class="snake">=</td>';
	},

	draw: function() {

		if (this.board.isSnakeDead()) {
			document.getElementsByTagName("pre")[0].style = "display: block"
		} else {
			var t = "";

			for (var i = 0; i < this.board.width; i++) {
				t += '<tr id="row_' + i + '">';
				for (var j = 0; j < this.board.height; j++) {
					if (this.board.snake.hasSegmentAt(i, j)) {
						t += this.drawSnakeCell(i, j);
					} else {
						t += this.drawEmptyCell(i, j);
					}
				}

				t += '</tr>\n';
			}

			this.el.innerHTML = ("<table>" + t + "</table>");
		}
	}
};