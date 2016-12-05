var Board = require('./board.js').Board;

var GAME_INTERVAL = 100;

module.exports = {
	getBoard: function() {
		return new Board(25, 25);
	},
	
	main: function() {
		var greeting = "It works from content.js with auto.";

		// this.getBoard().initialize();

		setInterval(this.frame, GAME_INTERVAL);

		return greeting;
	},

	frame: function() {
		this.getBoard.draw();
		console.log("ASDFASDFASDF");
	}
}
