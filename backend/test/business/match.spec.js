
const Match = require('./../../business/match')();

describe('regras da partida', () => {

	const p1 = {
		id: 'p1',
		userName: 'p1',
	};

	const p2 = {
		id: 'p2',
		userName: 'p2',
	};

	const match = new Match({player1: p1, player2: p2});

	it('constructor gerou um objeto', () => {
		expect(match).toBeDefined();
	});

	it('validar jogador atual', () => {
		const match1 = new Match({player1: p1, player2: p2, luckyFactor: 1});
		expect(match1.currentPlayer).toEqual(match1.player1);

		const match2 = new Match({player1: p1, player2: p2, luckyFactor: 2});
		expect(match2.currentPlayer).toEqual(match2.player2);
	});

	it('validar jogada incorreta', () => {
		const currentPlayer = match.currentPlayer;
		const player = currentPlayer == match.player1 ? match.player2 : match.player1;
		const retorno = match.play({ position: 'A1', name: player.userName });

		expect(retorno).toBeDefined();
		expect(retorno.state).toBeFalsy();
		expect(retorno.message).toBe('is not your turn.');
	});

	it('validar posicao incorreta', () => {
		const currentPlayer = match.currentPlayer;
		const otherPlayer = currentPlayer == match.player1 ? match.player2 : match.player1;

		match.state['A1'] = {
			value: otherPlayer.mark,
			player: {}
		};
		const retorno = match.play({ position: 'A1', name: currentPlayer.userName });

		expect(retorno).toBeDefined();
		expect(retorno.state).toBeFalsy();
		expect(retorno.message).toBe('the position is already fill');
	});

	it('validar jogada correta', () => {
		let currentPlayer = match.currentPlayer;
		const retorno1 = match.play({ position: 'B1', name: currentPlayer.userName });
		expect(retorno1).toBeDefined();
		expect(retorno1.state).toBeTruthy();

		currentPlayer  = match.currentPlayer;
		const retorno2 = match.play({ position: 'B2', name: currentPlayer.userName });
		expect(retorno2).toBeDefined();
		expect(retorno2.state).toBeTruthy();
	});

	it('validar com vencedor \'O\'', () => {

		match.state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: 'O', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno3 = match.verifyWinner();
		expect(retorno3.winner).toBeTruthy();

		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: 'O', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno4 = match.verifyWinner();
		expect(retorno4.winner).toBeTruthy;

		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: 'O', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno5 = match.verifyWinner();
		expect(retorno5.winner).toBeTruthy;

		match.state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: 'O', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno6 = match.verifyWinner();
		expect(retorno6.winner).toBeTruthy;

		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: 'O', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: 'O', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno7 = match.verifyWinner();
		expect(retorno7.winner).toBeTruthy;

		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: 'O', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno8 = match.verifyWinner();
		expect(retorno8.winner).toBeTruthy;

		match.state = {
			'A1' : { value: 'O', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: 'O', player: '' },
		};
		const retorno9 = match.verifyWinner();
		expect(retorno9.winner).toBeTruthy;

		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: 'O', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: 'O', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: 'O', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno10 = match.verifyWinner();
		expect(retorno10.winner).toBeTruthy;

	});

	it('validar sem vencedor', () => {
		match.state = {
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		};
		const retorno = match.verifyWinner();
		expect(retorno).toBeUndefined();
	});

	it('validar restart' , () => {
		match.restart();
		expect(match.remainderPlaces).toBe(9);
		expect(match.state).toEqual({
			'A1' : { value: '', player: '' },
			'A2' : { value: '', player: '' },
			'A3' : { value: '', player: '' },
			'B1' : { value: '', player: '' },
			'B2' : { value: '', player: '' },
			'B3' : { value: '', player: '' },
			'C1' : { value: '', player: '' },
			'C2' : { value: '', player: '' },
			'C3' : { value: '', player: '' },
		});
	});

});