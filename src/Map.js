const _mapArr = Symbol('mapArr');
const _checkPosition = Symbol('checkPosition');
function isHtmlDomElement(target) {
	//is Element check
	return target instanceof Element;
}
class GradeMap{

	/**
	 * the GradeMap constructor 
	 * 
	 * @param  {Number} multiple the multiple of the grade, eg: multiple=3: 3*3 grade
	 */
	constructor(multiple=3){
		if (!Number.isInteger(multiple) || multiple <= 0) throw new TypeError("illegal param multiple");
		this.multiple = multiple;
		this[_mapArr] = new Array(multiple);
		for(let i = 0; i < multiple; i++){
			this[_mapArr][i] = new Array(multiple);
		}
		this.clearMap();
	}

	/**
	 * check the position legal
	 * @param {<x, y>} position
	 *
	 * @return {Boolean} 
	 */
	[_checkPosition](position){
		if (position) return false;
		if (position.x === undefined || position.x > this.multiple) return false;
		if (position.y === undefined || position.y > this.multiple) return false;
		return true;
	}

	/**
	 * add a chess into the map
	 * @param {Object} chess    the chess Object(you decide) want to add
	 * @param {<x, y>} position the location{x: horizen(j), y: vertical(i)} x and y start from 1 to multiple
	 * @return {Boolean} is the add success
	 */
	addChess(chess, position){
		var map = this[_mapArr];
		if (!this[_checkPosition](position)) throw new TypeError("param illegal");
		if (map[position.y-1][position.x-1] !== null) return false;
		map[position.y-1][position.x-1] = chess;
		return true;
	}

	/**
	 * remove a chess from the map
	 * @param {<x, y>} position the location{x: horizen(j), y: vertical(i)} x and y start from 1 to multiple
	 * @return {Object} the chess have been removed
	 */
	removeChess(position){
		var map = this[_mapArr],
			chees = null;
		if (!this[_checkPosition](position)) throw new TypeError("param illegal");
		if (map[position.y-1][position.x-1] === null) return false;
		chess = map[position.y-1][position.x-1];
		map[position.y-1][position.x-1] = null;
		return chess;
	}

	/**
	 * move a chess from one position to another
	 * @param  {<x,y>} fromPosition 
	 * @param  {<x,y>} toPosition   
	 * @return {Boolean}              is the move success
	 */
	moveChess(fromPosition, toPosition){
		var chees = this.removeChess(fromPosition);
		if (chees === false) return false;
		if (!this.addChess(chees, toPosition)) return false;
		return true;
	}

	/**
	 * clear all chees in the map
	 */
	clearMap(){
		var map = this[_mapArr];
		for (var i = 0; i < map.length; i++) {
			for (var j = 0; j < map.length; j++) {
				map[i][j] = null;
			}
		}
	}

	/**
	 * get the user choice of the position locate his/her chees
	 *
	 * @param {Element} element the dom element of the map
	 * @param {Object} context the this context when call callback
	 * @param {Function} callback the function be called when user inputed
	 * 
	 * @return {position} the position in oneDMap
	 */
	getGamerInput(element, context, callback) {
		if(!isHtmlDomElement(element))
			throw new TypeError("expect a Element param: element");
		if (typeof callback !== "function") 
			throw new TypeError("expect a function param: callback");
		function gamerClickHandler(event) {
			let target = event.target,
				position = null;
			if (target.tagName !== "DIV") 
				return;
			position = [...target.parentNode.children].indexOf(target);
			callback.call(context, position);
			element.removeEventListener("click", gamerClickHandler);
		}
		element.addEventListener("click", gamerClickHandler);
	}

	/**
	 * get the copy of the mapArr
	 * @return {Array} the mapArr
	 */
	getMap(){
		var map = new Array(this.multiple),
			thisMap = this[_mapArr];
		for (var i = 0; i < map.length; i++) {
			map[i] = new Array(this.multiple);
			for (var j = 0; j < map.length; j++) {
				map[i][j] = thisMap[i][j];
			}
		}
		return map;
	}

	/**
	 * get the one dimensional copy of the mapArr(Just thranslate from tow to on)
	 * @return {Arrar} the one-D array
	 */
	getOneDimensionalMap(){
		var map = [];
		this[_mapArr].map((item) => {item.map((chess)=>{ map.push(chess)})});
		return map;
	}
}

export {GradeMap};