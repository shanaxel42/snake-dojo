var Snake = require('./snake.js').Snake;

module.exports = {
	Board: Board,
	BoardDisplay: BoardDisplay
}

/**
 * Created by saxelrod on 12/5/16.
 */
function Board(width, height) {
	this.width = width;
	this.height = height;
	this.snake = new Snake(width / 2, height / 2);
}

function BoardDisplay(board) {
	this.el = document.getElementById("gameBoard");
	this.board = board;
	this.snakeDisplay = new SnakeDisplay(board);

	draw: function() {
		asdfasdf
		left off here
		
	}
}

BoardDisplay.prototype = {
	constructor: BoardDisplay,
	
	init: function() {
		for (var i=0; i < this.width; i++) {
			t += '<tr id="row_' + i + '">';

			for (var j = 0; j < this.height; j++) {
				t+= '<td id="col_' + j + '">O</td>';
			}

			t += '</tr>\n';
		}
		
		this.el.innerHTML = ("<table>" + t + "</table>");
	},
	
	draw: function() {
		init();
		this.snakeDisplay.draw();
	}
}