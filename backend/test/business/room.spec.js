
const Room = require("./../../business/room");

describe("funcionamento da room", () => {

	const p1 = {
		userName: "p1",
		on: jest.fn(function (type, fn) {
			this.play = fn;
		}),
		emit: jest.fn(),
	};

	const p2 = {
		userName: "p2",
		on: jest.fn(function (type, fn) {
			this.play = fn;
		}),
		emit: jest.fn(),
	};

	const match = function (p1, p2) {
		this.game = {
			state: {},
		};
		this.player1 = p1;
		this.player2 = p2;
		this.play = jest.fn();
		this.verifyWinner = jest.fn();
		this.restart = jest.fn();
	}

	const room = new (Room({ Match: match }))(p1, p2);

	it("constructor room", () => {
		expect(room).toBeDefined();
		expect(room.game).toBeDefined();
		expect(room.socketPlayer1).toEqual(p1);
		expect(room.socketPlayer2).toEqual(p2);
		expect(p1.play).toBeDefined();
	});

	it("jogada invalida", () => {
		const p1 = {
			userName: "p1",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const p2 = {
			userName: "p2",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const match = function (p1, p2) {
			this.game = {
				state: {},
			};
			this.player1 = p1;
			this.player2 = p2;
			this.play = jest.fn(() => ({ state: false, message: "teste" }));
			this.verifyWinner = jest.fn();
			this.restart = jest.fn();
		};
		const room = new (Room({ Match: match }))(p1, p2);

		p1.play("A1");

		expect(p1.play).toBeDefined();
		expect(p1.emit).toHaveBeenCalledWith("cantPlay", "teste");
	})

	it("jogada correta", () => {
		const p1 = {
			userName: "p1",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const p2 = {
			userName: "p2",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const match = function (p1, p2) {
			this.game = {
				state: {},
			};
			this.player1 = p1;
			this.player2 = p2;
			this.play = jest.fn(() => ({ state: true }));
			this.verifyWinner = jest.fn(() => undefined);
			this.restart = jest.fn();
		};
		const room = new (Room({ Match: match }))(p1, p2);

		p1.play("A1");

		expect(p1.emit).toHaveBeenCalledWith("updateGame", room.game);
		expect(p2.emit).toHaveBeenCalledWith("updateGame", room.game);
	})

	it("jogada correta - final", () => {
		const p1 = {
			userName: "p1",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const p2 = {
			userName: "p2",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const match = function (p1, p2) {
			this.game = {
				state: {},
			};
			this.player1 = p1;
			this.player2 = p2;
			this.play = jest.fn(() => ({ state: true }));
			this.verifyWinner = jest.fn(() => true);
			this.restart = jest.fn();
		};
		const room = new (Room({ Match: match }))(p1, p2);

		p1.play("A1");

		expect(p1.emit).toHaveBeenCalledWith("updateGame", room.game);
		expect(p2.emit).toHaveBeenCalledWith("updateGame", room.game);

		expect(p1.emit).toHaveBeenCalledWith("updateGame", room.game);
		expect(p2.emit).toHaveBeenCalledWith("updateGame", room.game);

		expect(p1.emit).toHaveBeenCalledWith("finishMatch", true);
		expect(p2.emit).toHaveBeenCalledWith("finishMatch", true);
	})

	it("jogada correta - velha", () => {
		const p1 = {
			userName: "p1",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const p2 = {
			userName: "p2",
			on: jest.fn(function (type, fn) {
				this.play = fn;
			}),
			emit: jest.fn(),
		};
		const match = function (p1, p2) {
			this.remainderPlaces = 0;
			this.state = {};
			this.player1 = p1;
			this.player2 = p2;
			this.play = jest.fn(() => ({ state: true }));
			this.verifyWinner = jest.fn(() => undefined);
			this.restart = jest.fn();
		};
		const room = new (Room({ Match: match }))(p1, p2);

		p1.play("A1");
		
		expect(room.game.restart).toHaveBeenCalled();
		expect(p1.emit).toHaveBeenCalledWith("updateGame", room.game);
		expect(p2.emit).toHaveBeenCalledWith("updateGame", room.game);

	})


});
