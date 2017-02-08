const WIN = -100;
const LOSE = 100;
const DRAW = 0;
const DOUBLE_CONNECTED = 50;
const empty = null;
const _gameState = Symbol('gameState');
const INPROGRESS = 1;
const INFINITY = 100;

class Minimax{
	/**
	 * constructor
	 * @param  {Number} curPcChees 1 or 0 => 1: x, 0: o
	 */
	constructor(curPcChees) {

		this.curPcChees = curPcChees;
		this.lineCheesArr = []; //when three chees in-line, this arr will record it
	}

	/**
	 * get the in-line chess arr when have three in-line
	 * @return {Array} the in-line array
	 */
	getLineChees() {
		return this.lineCheesArr;
	}

	/**
	 * @inner analyze the game state by the param: oneDMap
	 *
	 * @param {Array} oneDMap the game map desc by one-D array
	 *
	 * @return {Number} the score of the map
	 * 
	 */
	[_gameState](oneDMap) {
		let state = DRAW,
			tempChees = null,
			isFull = false,
			isFind = false,
			i = 0,
			sucTable = [
				[0,1,2],
				[3,4,5],
				[6,7,8],
				[0,3,6],
				[1,4,7],
				[2,5,8],
				[0,4,8],
				[2,4,6]
			];
		isFull = oneDMap.every((item) => item !== null);

		//记录是否三联且记录棋子种类
		for (let [index, item] of sucTable.entries()){
			tempChees = oneDMap[item[0]];
			for(i = 1; i < 3; i++)
				if(oneDMap[item[i]] != tempChees)
					break;
			if (tempChees !== empty && i === 3) {
				isFind = true;
				this.lineCheesArr = sucTable[index];
				break;
			}
		}

		//has three in-line won or lose
		if (isFind) {
			state = tempChees === this.curPcChees ? WIN : LOSE;
		}else{
			if (isFull) {
				return DRAW;
			}else{
				//finds[0] => one(0 part)   finds[1] => other(1 part) not clear which is computer
				let finds = [0,0];
				for (let item of sucTable){
					tempChees = 0;
					let findEmpty = false,
						j;
					for (j = 0; j < 3; j++){
						if (oneDMap[item[j]] === empty && !findEmpty)
							findEmpty = true;
						else{
							let mapValue = oneDMap[item[j]] === empty ? 10 : oneDMap[item[j]];
							tempChees = tempChees + mapValue;
						}
					}
					if (tempChees === 2 && findEmpty) {
						isFind = true;
						finds[1]++;
					}else if (tempChees === 0 && findEmpty) {
						isFind = true;
						finds[0]++;
					}
				}
				if (finds[0] > 1 && finds[1] < 1) 
					state = this.curPcChees === 0 ? -DOUBLE_CONNECTED : DOUBLE_CONNECTED;
				else if(finds[1] > 1 && finds[0] < 1) 
					state = this.curPcChees === 1 ? -DOUBLE_CONNECTED : DOUBLE_CONNECTED;
				else 
					state = INPROGRESS;

			}
		}
		return state;
	}

	/**
	 * analyze the game state by the param: oneDMap for outer call
	 * @param  {Array} oneDMap the game map desc by one-D array
	 * @return {Number}  the score  -1: loose 0: draw 1: win(PC)
	 */
	gameState(oneDMap) {
		this.lineCheesArr = [];
		let value = this[_gameState](oneDMap),
			returnValue = 2;
		switch(value){
			case WIN:
				returnValue = 1;
				break;
			case LOSE:
				returnValue = -1;
				break;
			case DRAW:
				returnValue = 0;
		}
		if (value === WIN || value === LOSE) {
			console.log(this.lineCheesArr);
		}
		return returnValue;
	}


	minSearch(oneDMap) {
		let positionValue = this[_gameState](oneDMap),
			i,
			bestValue = INFINITY;
		if (positionValue === DRAW) return 0;
		if (positionValue !== INPROGRESS) return positionValue;
		for (i = 0; i < 9; i++){
			if (oneDMap[i] === empty) {
				oneDMap[i] = this.curPcChees;
				let value = this.maxSearch(oneDMap);
				if (value < bestValue) 
					bestValue = value;
				oneDMap[i] = empty;
			}
		}
		return bestValue;
	}

	maxSearch(oneDMap) {
		let positionValue = this[_gameState](oneDMap),
			i,
			bestValue = -INFINITY;
		if (positionValue === DRAW) return 0;
		if (positionValue !== INPROGRESS) return positionValue;
		for (i = 0; i < 9; i++){
			if (oneDMap[i] === empty) {
				oneDMap[i] = Math.abs(1 - this.curPcChees);
				let value = this.minSearch(oneDMap);
				if (value > bestValue) 
					bestValue = value;
				oneDMap[i] = empty;
			}
		}
		return bestValue;
	}

	minimax(oneDMap) {
		let i,
			bestValue = INFINITY,
			index = 0,
			bestMove = [];
		for (i = 0; i < 9; i++){
			if (oneDMap[i] === empty) {
				oneDMap[i] = this.curPcChees;
				let value = this.maxSearch(oneDMap);
				console.log(value);
				if (value < bestValue) {
					bestValue = value;
					index = 0;
					bestMove[index] = i;
				}else if (value === bestValue) { //best position more than one
					bestMove[index++] = i;
				}
				oneDMap[i] = empty;
			}
		}
		if (index > 0) 
			index = Math.floor(Math.random() * index);
		return bestMove[index];
	}
}

export {Minimax};