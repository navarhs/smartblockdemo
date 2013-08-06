gameRunning = 0;

exports.createGame = function () {
	Game = function() {
		this.board = new Array(0,0,0,0,0,0,0,0,0);

		this.player1 = undefined;
		this.player2 = undefined;

		this.p1_turn = 1;
	}
	gameRunning = 1;
	return new Game();
}