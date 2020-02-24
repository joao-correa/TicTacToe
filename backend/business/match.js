
module.exports = () => {
	return class Match {
		constructor({ player1, player2, luckyFactor = ((Math.random() * 50)) }){
			this.remainderPlaces = 9;
			this.player1 = {
				id: player1.id,
				userName: player1.userName,
			};
      
			this.player2 = {
				id: player2.id,
				userName: player2.userName,
			};

			this.player1.mark = 'X';
			this.player2.mark = 'O';

			this.currentPlayer = luckyFactor & 1 ? this.player1 : this.player2;

			this.state = {
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
		}
      
		play ({ position, name }) {
			const verifyPlayerResult = this.verifyPlayer(name); 
			if (!verifyPlayerResult.state)
				return verifyPlayerResult;

			const verifyPlayResult = this.verifyPlay(position);
			if(!verifyPlayResult.state)
				return verifyPlayResult;

			this.state[position] = {
				value: this.currentPlayer.mark,
				player: { ...this.currentPlayer }
			};

			this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
			this.remainderPlaces--;
			return {
				state: true,
			};
		}

		verifyPlayer(userName){
			if (this.currentPlayer.userName != userName)
				return {
					state: false,
					message: 'is not your turn.',
				};
			else 
				return {
					state: true,
				};
		}

		verifyPlay (position) {
			if(this.state[position].value == '')
				return { 
					state: true,
				};

			return { 
				state: false, 
				message: 'the position is already fill',
			};
		}

		verifyWinner () {
			const players = [this.player1, this.player2];

			for (const player of players) {
				let isWinner = false;
				const mark = player.mark;
        
				if (this.state[ 'A1' ].value == mark && this.state[ 'A2' ].value == mark && this.state[ 'A3' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'B1' ].value == mark && this.state[ 'B2' ].value == mark && this.state[ 'B3' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'C1' ].value == mark && this.state[ 'C2' ].value == mark && this.state[ 'C3' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'A1' ].value == mark && this.state[ 'B1' ].value == mark && this.state[ 'C1' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'A2' ].value == mark && this.state[ 'B2' ].value == mark && this.state[ 'C2' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'A3' ].value == mark && this.state[ 'B3' ].value == mark && this.state[ 'C3' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'A1' ].value == mark && this.state[ 'B2' ].value == mark && this.state[ 'C3' ].value == mark) {
					isWinner = true;
				} else if (this.state[ 'A3' ].value == mark && this.state[ 'B2' ].value == mark && this.state[ 'C1' ].value == mark) {
					isWinner = true;
				}
  
				if ( isWinner ) {
					return {
						winner : true,
						...player,
					};   
				} 
			}

			return undefined;
		}

		restart () {
			this.remainderPlaces = 9;
			this.state = {
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
		}
	};
};
