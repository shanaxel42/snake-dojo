/**
 * Created by saxelrod on 12/5/16.
 */
function SnakeDisplay(board) {
	this.board = board;
}

SnakeDisplay.prototype = {
	constructor: SnakeDisplay,
	
	draw: function() {
		console.log("ASDF", this.board.snake.x, this.board.snake.y);
		
	}
}