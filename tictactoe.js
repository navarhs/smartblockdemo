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

exports.addPlayer = function (game, player, sockets) {
	if (game.player1 == undefined) {
		game.player1 = player;
		sockets.emit('player1', { player: player })
	}
	else {
		if (game.player2 == undefined) {
			game.player2 = player;
			sockets.emit('player2', { player: player })
		}
	}
}