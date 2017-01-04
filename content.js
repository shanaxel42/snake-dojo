var Snake = require('./snake.js').Snake;
var Board = require('./board.js').Board;
var BoardDisplay = require('./board.js').BoardDisplay;

var GAME_INTERVAL = 750;

module.exports = {
	main: function() {
		var snake = new Snake(12, 12);
		var board = new Board(25, 25, snake);
		var boardDisplay = new BoardDisplay(board);

		var interval = setInterval(function() {
			if (!board.step()) {
				clearInterval(interval);
			}
			boardDisplay.draw();
		}, GAME_INTERVAL);

		window.onkeydown = function(e) {
			var key = e.keyCode ? e.keyCode : e.which;

			var directionMap = {
				37 : board.snake.DIRECTIONS.LEFT,
				38 : board.snake.DIRECTIONS.UP,
				39 : board.snake.DIRECTIONS.RIGHT,
				40 : board.snake.DIRECTIONS.DOWN
			};

			if (directionMap[key] != null) { // up?
				board.snake.setDirection(directionMap[key]);
			}
		};

		return "ASDF";
	}
}
