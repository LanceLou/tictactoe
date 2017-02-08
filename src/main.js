import {SelectDialog} from './lanceDialog.js';
import {GradeMap} from './Map.js';
import {Minimax} from './MiniMax.js';
import {ElementClassNameHandlerUtils} from './utils';
const positions = [...document.querySelector("section.map-container").children];
var map = new GradeMap(), //Map obj
		minMax = null, //MiniMax obj
		curPcChess = null,
		oneDMap = map.getOneDimensionalMap(); //the on-d map array

function renderMap() {
	let innerText = "";
	for(let [index, positionValue] of oneDMap.entries()){
		innerText = positionValue === null ? "" : positionValue === 1 ? "X" : "O";
		positions[index].innerText = innerText;
	}
}

function renderResult() {
	var inLineArr = minMax.lineCheesArr;
	inLineArr.forEach((index) => {ElementClassNameHandlerUtils.addElementClassName(positions[index], "hint")});
	setTimeout(function () {
		inLineArr.forEach((index) => {ElementClassNameHandlerUtils.removeElementClassName(positions[index], "hint")});
		window.location.reload();
	},5000);
}
function checkState() {
	let state = 2;
	state = minMax.gameState(oneDMap);
	if (state === 0 || state === 1 || state === -1){
		renderResult();
		return true;
	}
	return false;
}
function pcTurn() {
	let position = minMax.minimax(oneDMap);
	console.log(position);
	oneDMap[position] = curPcChess;
	renderMap();
	if (!checkState()) {
			gamerTurn();
	}
}

function gamerTurn() {
	map.getGamerInput(positions[0].parentNode, null, function (position) {
		oneDMap[position] = 1 - curPcChess;
		renderMap();
		if (!checkState()) {
			pcTurn();
		}
	});
}

// 0: "O"   1: "X"
function startGame(pcChess) {
	minMax = new Minimax(pcChess);
	curPcChess = pcChess;
	if(pcChess === 1)
		pcTurn();
	else
		gamerTurn();
}
function main() {
	let dialog = new SelectDialog("tictactoe", "x or o?", ["o", "x"]),
		curPcChess = null;
	dialog.addCallback(dialog, function (value) {
		if (value === "o")
			startGame(1);
		else
			startGame(0);
		this.close();
	});
	dialog.popup();	
}
main();