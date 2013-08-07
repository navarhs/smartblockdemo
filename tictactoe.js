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
	Result = function () {
		this.winner = 0;
		this.squares;
		this.direction;
	}
	var result = new Result();

	// horizontals
	if ((b[0] == b[1] && b[1] == b[2]) && b[0]) {
		result.winner = b[0];
		result.squares = [1,2,3];
		result.direction = 0;
		return result;
	}

	if ((b[3] == b[4] && b[4] == b[5]) && b[3]) {
		result.winner = b[3];
		result.squares = [4,5,6];
		result.direction = 0;
		return result;
	}

	if ((b[6] == b[7] && b[7] == b[8]) && b[6]) {
		result.winner = b[6];
		result.squares = [7,8,9];
		result.direction = 0;
		return result;
	}

	// verticals
	if ((b[0] == b[3] && b[3] == b[6]) && b[0]) {
		result.winner = b[0];
		result.squares = [1,4,7];
		result.direction = 1;
		return result;
	}

	if ((b[1] == b[4] && b[4] == b[7]) && b[1]) {
		result.winner = b[1];
		result.squares = [2,5,8];
		result.direction = 1;
		return result;
	}

	if ((b[2] == b[5] && b[5] == b[8]) && b[2]) {
		result.winner = b[2];
		result.squares = [3,6,9];
		result.direction = 1;
		return result;
	}

	// diagonals
	if ((b[0] == b[4] && b[4] == b[8]) && b[0]) {
		result.winner = b[0];
		result.squares = [1,5,9];
		result.direction = 2;
	}

	if ((b[6] == b[4] && b[4] == b[2]) && b[6]) {
		result.winner = b[6];
		result.squares = [3,5,7];
		result.direction = 3;
	}

	return result;
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
		sockets.emit('log', { message: "You are not a valid player." })
		return;
	}

	if (game.player1 == player && !game.p1_turn) {
		sockets.emit('log', { message: "Player 1, it's not your turn." });
		return;
	}

	if (game.player2 == player && game.p1_turn) {
		sockets.emit('log', { message: "Player 2, it's not your turn." });
		return;
	}

	if (game.board[square] != 0 || square < 0 || square > 8) {
		sockets.emit('log', { message: "That is not a valid move." });
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

	var result = exports.isWon(game.board);
	var winner = result.winner;

	if (winner || exports.isFull(game.board)) {
		sockets.emit('gameOver', { winner: winner, squares: result.squares, direction: result.direction });
		gameRunning = 0;
	}

	sockets.emit('board', { board : game.board });
}