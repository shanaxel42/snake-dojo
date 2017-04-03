var Snake = require('./snake.js').Snake;
var Board = require('./board.js').Board;
var BoardDisplay = require('./board.js').BoardDisplay;
var EventCenter = require('./event.js').EventCenter;

var GAME_INTERVAL = 250;
// make the game interval faster each time the snake eats food

module.exports = {
	main: function() {
		var eventCenter = new EventCenter();
		var snake = new Snake(eventCenter, 12, 12);
		var board = new Board(eventCenter, 25, 25, snake);
		var boardDisplay = new BoardDisplay(board);

		function startInterval(intervalTime) {
			return setInterval(function() {
				if (!board.step()) {
					clearInterval(interval);
				}
				boardDisplay.draw();
			}, intervalTime);
		}

		var interval = startInterval(GAME_INTERVAL);

		eventCenter.listenToEvent(eventCenter.EVENT_SPEED_UP_GAME, function(obj){
			GAME_INTERVAL -= GAME_INTERVAL > 50 ? 50: 0;
			clearInterval(interval);
			interval = startInterval(GAME_INTERVAL);
		}.bind(this));
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
