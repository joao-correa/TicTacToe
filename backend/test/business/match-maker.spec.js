
const matchMaker = require('./../../business/match-maker'); 

describe('funcionamento do gerador de partidas', () => {
  
	let p1 = {
		userName: 'p1',
		emit : jest.fn(),
	};

	let p2 = {
		userName: 'p2',
		emit : jest.fn()
	};

	let p3 = {
		userName: 'p3',
		emit : jest.fn()
	};

	let fakeRoom = jest.fn((p1,p2) => {
		return {
			game: {
				state: {}
			}
		};
	});

	const match = matchMaker(fakeRoom);

	it('injecao por parametro default', () => {
		const match = matchMaker();
		expect(match.unsubscribe).toBeDefined();
		expect(match.subscribe).toBeDefined();
	});

	it('retornar um objeto com subscribe e unsubscribe functions', () => {
		expect(match.unsubscribe).toBeDefined();
		expect(match.subscribe).toBeDefined();
	});

	it('gerar partida' , () => {
		match.subscribe(p1);
		match.subscribe(p1);
		match.subscribe(p2);
		match.subscribe(p3);

		expect(fakeRoom).toHaveBeenCalledWith(p1, p2);
		expect(p1.emit).toHaveBeenCalledTimes(1);
		expect(p2.emit).toHaveBeenCalledTimes(1);
		expect(p3.emit).toHaveBeenCalledTimes(0);
	});    

	it('remover p3 da lista e retornar true', () => {
		expect(match.unsubscribe(p3)).toBeTruthy();
	});

});