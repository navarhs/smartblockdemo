gameRunning = 0;

exports.createGame = function () {
	Game = function() {
		this.board = new Array(0,0,0,0,0,0,0,0,0);

		this.player1 = undefined;
		this.player2 = undefined;

		this.p1_turn = 1;
	}
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
			gameRunning = 1;
		}
	}
}

exports.isWon = function (b) {
	// horizontals
	if ((b[0] == b[1] && b[1] == b[2]) && b[0])
		return b[0];

	if ((b[3] == b[4] && b[4] == b[5]) && b[3])
		return b[3];

	if ((b[6] == b[7] && b[7] == b[8]) && b[6])
		return b[6];

	// verticals
	if ((b[0] == b[3] && b[3] == b[6]) && b[0])
		return b[0];

	if ((b[1] == b[4] && b[4] == b[7]) && b[1])
		return b[1];

	if ((b[2] == b[5] && b[5] == b[8]) && b[2])
		return b[2];

	// diagonals
	if ((b[0] == b[4] && b[4] == b[8]) && b[0])
		return b[0];

	if ((b[6] == b[4] && b[4] == b[2]) && b[6])
		return b[6];

	return 0;
}

exports.isFull = function (b) {
	for (var i=0; i<b.length; i++)
		if (b[i] == 0)
			return false;

	return true;
}

exports.move = function (game, player, sockets, move) {
	if (!gameRunning)
		return;

	var square = move - 1;

	if (game.player1 != player && game.player2 != player) {
		sockets.emit('log', { message: "You are not a valid player" })
	}
		return

	if (game.player1 == player && !game.p1_turn) {
		sockets.emit('log', { message: "Player 1, it's not your turn" });
		return;
	}

	if (game.player2 == player && game.p1_turn) {
		sockets.emit('log', { message: "Player 2, it's not your turn" });
		return;
	}

	if (game.board[square] != 0 || square < 0 || square > 8) {
		sockets.emit('log', { message: "That is not a valid move" });
		return;
	}

	if (game.p1_turn) {
		game.board[square] = 1;
		sockets.emit('move', { square: move, sign: 'X' })
	}
	else {
		game.board[square] = 2;
		sockets.emit('move', { square: move, sign: 'O' })
	}

	game.p1_turn = !game.p1_turn;

	var winner = exports.isWon(game.board);

	if (winner || exports.isFull(game.board)) {
		sockets.emit('gameOver', { winner: winner });
		gameRunning = 0;
	}

	sockets.emit('board', { board : game.board });
}