/*! This file is created by lancelou */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _lanceDialog = __webpack_require__(1);

	var _Map = __webpack_require__(7);

	var _MiniMax = __webpack_require__(8);

	var _utils = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var positions = [].concat(_toConsumableArray(document.querySelector("section.map-container").children));
	var map = new _Map.GradeMap(),
	    //Map obj
	minMax = null,
	    //MiniMax obj
	curPcChess = null,
	    oneDMap = map.getOneDimensionalMap(); //the on-d map array

	function renderMap() {
		var innerText = "";
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = oneDMap.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var _step$value = _slicedToArray(_step.value, 2),
				    index = _step$value[0],
				    positionValue = _step$value[1];

				innerText = positionValue === null ? "" : positionValue === 1 ? "X" : "O";
				positions[index].innerText = innerText;
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}
	}

	function renderResult() {
		var inLineArr = minMax.lineCheesArr;
		inLineArr.forEach(function (index) {
			_utils.ElementClassNameHandlerUtils.addElementClassName(positions[index], "hint");
		});
		setTimeout(function () {
			inLineArr.forEach(function (index) {
				_utils.ElementClassNameHandlerUtils.removeElementClassName(positions[index], "hint");
			});
			window.location.reload();
		}, 5000);
	}
	function checkState() {
		var state = 2;
		state = minMax.gameState(oneDMap);
		if (state === 0 || state === 1 || state === -1) {
			renderResult();
			return true;
		}
		return false;
	}
	function pcTurn() {
		var position = minMax.minimax(oneDMap);
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
		minMax = new _MiniMax.Minimax(pcChess);
		curPcChess = pcChess;
		if (pcChess === 1) pcTurn();else gamerTurn();
	}
	function main() {
		var dialog = new _lanceDialog.SelectDialog("tictactoe", "x or o?", ["o", "x"]),
		    curPcChess = null;
		dialog.addCallback(dialog, function (value) {
			if (value === "o") startGame(1);else startGame(0);
			this.close();
		});
		dialog.popup();
	}
	main();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.SelectDialog = exports.Dialog = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(2);

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	__webpack_require__(3); // 载入 style.css


	var _dialogEle = Symbol('dialogEle');
	var _dialogEleGenerator = Symbol('dialogEleGenerator');
	var _dialogFeedbackCallbacks = Symbol('dialogFeedbackCallbacks');
	var _triggerCallback = Symbol('triggerCallback');
	var _initEventLis = Symbol('initEventLis');

	var Dialog = function () {
		function Dialog() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.hostname;
			var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			_classCallCheck(this, Dialog);

			this.name = name;
			this.content = content;
			this[_dialogEle] = null;
			this[_dialogFeedbackCallbacks] = [];
		}

		/**
	  * @inner
	  * generate the dialog element by name,content,selects
	  *
	  * @return {HTMLDivElement} [the Element of the dialog]
	  */


		_createClass(Dialog, [{
			key: _dialogEleGenerator,
			value: function value() {
				var eleStr = '<div class="dialog-mask"></div>\n\t\t<div class="dialog-win">\n\t\t\t<div class="d-header"><h1>' + this.name + '</h1></div>\n\t\t\t<div class="d-content">' + this.content + '</div>\n\t\t\t<div class="d-btnWrapper">\n\t\t\t\t<a href="javascript: void(0)" data-target="yes">yes</a>\n\t\t\t\t<a href="javascript: void(0)" data-target="no">no</a>\n\t\t\t</div>\n\t\t</div>',
				    dialogEle = document.createElement("div");
				dialogEle.className = "lance-dialog-wrapper close";
				dialogEle.innerHTML = eleStr;
				return dialogEle;
			}

			/**
	   * @inner
	   * 
	   * trigger all user select callback when user select a option(publish)
	   */

		}, {
			key: _triggerCallback,
			value: function value(targetData) {
				this[_dialogFeedbackCallbacks].forEach(function (item) {
					return item.callback.call(item.thisArg, targetData === "yes" ? true : false);
				});
			}

			/**
	   * @inner
	   * init dialog element all event lis
	   */

		}, {
			key: _initEventLis,
			value: function value() {
				var self = this;
				this[_dialogEle].addEventListener("click", function (event) {
					var target = event.target;
					if (_utils.ElementClassNameHandlerUtils.include(target, "dialog-mask")) {
						self.close();
						return;
					}
					if (target.tagName === "A") {
						self[_triggerCallback](target.getAttribute("data-target"));
					}
				});
			}

			/**
	   * public
	   * popup the dialog
	   * 
	   */

		}, {
			key: 'popup',
			value: function popup() {
				if (!this[_dialogEle]) {
					this[_dialogEle] = this[_dialogEleGenerator]();
					this[_initEventLis]();
					document.body.appendChild(this[_dialogEle]);
				}
				var self = this;
				setTimeout(function () {
					_utils.ElementClassNameHandlerUtils.removeElementClassName(self[_dialogEle], "close");
				}, 0);
			}

			/**
	   * public
	   * unpopup the dialog
	   */

		}, {
			key: 'close',
			value: function close() {
				_utils.ElementClassNameHandlerUtils.addElementClassName(this[_dialogEle], "close");
			}

			/**
	   * public
	   * add users click feedback callback
	   *
	   * @param {Object} thisArg the this context when call the func
	   * @param {Function} callback the function will be call when user select a option, the function's argument is true(yes) false(false) in Dialog class, is from this.selects in SelectDialog class.
	   */

		}, {
			key: 'addCallback',
			value: function addCallback() {
				var thisArg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
				var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

				this[_dialogFeedbackCallbacks].push({ thisArg: thisArg, callback: callback });
			}
		}]);

		return Dialog;
	}();

	var SelectDialog = function (_Dialog) {
		_inherits(SelectDialog, _Dialog);

		function SelectDialog() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window.location.hostname;
			var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
			var selects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

			_classCallCheck(this, SelectDialog);

			var _this = _possibleConstructorReturn(this, (SelectDialog.__proto__ || Object.getPrototypeOf(SelectDialog)).call(this, name, content));

			_this.selects = [].concat(_toConsumableArray(selects));
			return _this;
		}

		/**
	  * @override
	  * 
	  * @inner
	  * generate the dialog element by name,content,selects
	  *
	  * @return {HTMLDivElement} [the Element of the dialog]
	  */


		_createClass(SelectDialog, [{
			key: _dialogEleGenerator,
			value: function value() {
				var eleStr = '<div class="dialog-mask"></div>\n\t\t<div class="dialog-win">\n\t\t\t<div class="d-header"><h1>' + this.name + '</h1></div>\n\t\t\t<div class="d-content">' + this.content + '</div>\n\t\t\t<div class="d-btnWrapper">\n\t\t\t\t' + this.selects.map(function (selectName) {
					return '\n\t\t\t\t\t<a href="javascript: void(0)" data-target="' + selectName + '">' + selectName + '</a>\n\t\t\t\t\t';
				}).join('') + '\n\t\t\t</div>\n\t\t</div>',
				    dialogEle = document.createElement("div");
				dialogEle.className = "lance-dialog-wrapper close";
				dialogEle.innerHTML = eleStr;
				return dialogEle;
			}

			/**
	   * @override
	   * 
	   * @inner
	   * 
	   * trigger all user select callback when user select a option(publish)
	   */

		}, {
			key: _triggerCallback,
			value: function value(targetData) {
				this[_dialogFeedbackCallbacks].forEach(function (item) {
					return item.callback.call(item.thisArg, targetData);
				});
			}
		}]);

		return SelectDialog;
	}(Dialog);

	exports.Dialog = Dialog;
	exports.SelectDialog = SelectDialog;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function isHtmlDomElement(target) {
		//is Element check
		return target instanceof Element;
	}
	var ElementClassNameHandlerUtils = {
		addElementClassName: function addElementClassName(element) {
			var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			if (!isHtmlDomElement(element)) throw new TypeError("expect a Element");
			var oldClassName = element.className;
			if (oldClassName.indexOf(className) < 0) {
				className = oldClassName.length > 0 ? " " + className : className;
				element.className = oldClassName + "" + className;
			}
		},
		removeElementClassName: function removeElementClassName(element) {
			var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			if (!isHtmlDomElement(element)) throw new TypeError("expect a Element");
			var oldClassName = element.className;
			element.className = oldClassName.replace(className, "");
		},
		include: function include(element) {
			var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";

			if (!isHtmlDomElement(element)) throw new TypeError("expect a Element");
			return element.className.indexOf(className) >= 0;
		}
	};

	var HtmlStrHandlerUtils = {
		saferHTML: function saferHTML(literals) {
			var s = literals[0];

			for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				values[_key - 1] = arguments[_key];
			}

			for (var i = 0; i < values.length; i++) {
				var arg = String(values[i]);
				// Escape special characters in the substitution.
				s += arg.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				// Don't escape special characters in the template.
				s += literals[i + 1];
			}
			return s;
		}
	};

	exports.ElementClassNameHandlerUtils = ElementClassNameHandlerUtils;
	exports.HtmlStrHandlerUtils = HtmlStrHandlerUtils;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./lanceDialog.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./lanceDialog.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "div.lance-dialog-wrapper{\n\tposition: absolute;\n\tmargin: 0;\n\tpadding: 0;\n}\ndiv.lance-dialog-wrapper *{\n\tmargin: 0;\n\tpadding: 0;\n}\ndiv.lance-dialog-wrapper div.dialog-mask{\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground: #555;\n\topacity: 0.7;\n\tfilter: opacity(70%);\n}\ndiv.lance-dialog-wrapper div.dialog-win{\n\tposition: fixed;\n\ttop: 30%;\n\tleft: 50%;\n\tvisibility: visible;\n\topacity: 1;\n\tfilter: opacity(100%);\n\twidth: 36%;\n\ttransform: translate(-50%, -50%);\n\tbackground-color: #fff;\n\tpadding: 20px 15px;\n    border-radius: 5px;\t\n    box-shadow: 0px 2px 5px #111;\n    transition: all linear 0.5s;\n}\ndiv.lance-dialog-wrapper div.dialog-win > div{\n\tmargin: 2px 0;\n\tpadding: 25px 0;\n\ttext-align: center;\n\tbackground-color: #111;\n\tcolor: #fff;\n}\ndiv.lance-dialog-wrapper div.dialog-win div.d-header{\n\t\n}\ndiv.lance-dialog-wrapper div.dialog-win div.d-content{\n\n}\ndiv.lance-dialog-wrapper div.dialog-win div.d-btnWrapper{\n\tbackground-color: transparent;\n\tpadding: 12px;\n\ttext-align: right;\n}\ndiv.lance-dialog-wrapper div.dialog-win div.d-btnWrapper a{\n    text-decoration: none;\n    color: #000;\n    border: 1px solid #555;\n    border-radius: 2px;\n    display: inline-block;\n    width: 25px;\n    line-height: 30px;\n    text-align: center;\n    margin: 0 3px;\n    padding: 0 0.3rem;\n}\ndiv.lance-dialog-wrapper div.dialog-win div.d-btnWrapper a:hover{\n\tbackground-color: #eee;\n}\ndiv.close div.dialog-mask{\n\tdisplay: none;\n}\ndiv.close div.dialog-win{\n\ttop: 10%;\n\tvisibility: hidden;\n\topacity: 0;\n\tfilter: opacity(0);\n}\n@media only screen and (max-width: 768px) {\n\tdiv.lance-dialog-wrapper div.dialog-win{\n\t\twidth: 80%;\n\t}\n}", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _mapArr = Symbol('mapArr');
	var _checkPosition = Symbol('checkPosition');
	function isHtmlDomElement(target) {
		//is Element check
		return target instanceof Element;
	}

	var GradeMap = function () {

		/**
	  * the GradeMap constructor 
	  * 
	  * @param  {Number} multiple the multiple of the grade, eg: multiple=3: 3*3 grade
	  */
		function GradeMap() {
			var multiple = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

			_classCallCheck(this, GradeMap);

			if (!Number.isInteger(multiple) || multiple <= 0) throw new TypeError("illegal param multiple");
			this.multiple = multiple;
			this[_mapArr] = new Array(multiple);
			for (var i = 0; i < multiple; i++) {
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


		_createClass(GradeMap, [{
			key: _checkPosition,
			value: function value(position) {
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

		}, {
			key: 'addChess',
			value: function addChess(chess, position) {
				var map = this[_mapArr];
				if (!this[_checkPosition](position)) throw new TypeError("param illegal");
				if (map[position.y - 1][position.x - 1] !== null) return false;
				map[position.y - 1][position.x - 1] = chess;
				return true;
			}

			/**
	   * remove a chess from the map
	   * @param {<x, y>} position the location{x: horizen(j), y: vertical(i)} x and y start from 1 to multiple
	   * @return {Object} the chess have been removed
	   */

		}, {
			key: 'removeChess',
			value: function removeChess(position) {
				var map = this[_mapArr],
				    chees = null;
				if (!this[_checkPosition](position)) throw new TypeError("param illegal");
				if (map[position.y - 1][position.x - 1] === null) return false;
				chess = map[position.y - 1][position.x - 1];
				map[position.y - 1][position.x - 1] = null;
				return chess;
			}

			/**
	   * move a chess from one position to another
	   * @param  {<x,y>} fromPosition 
	   * @param  {<x,y>} toPosition   
	   * @return {Boolean}              is the move success
	   */

		}, {
			key: 'moveChess',
			value: function moveChess(fromPosition, toPosition) {
				var chees = this.removeChess(fromPosition);
				if (chees === false) return false;
				if (!this.addChess(chees, toPosition)) return false;
				return true;
			}

			/**
	   * clear all chees in the map
	   */

		}, {
			key: 'clearMap',
			value: function clearMap() {
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

		}, {
			key: 'getGamerInput',
			value: function getGamerInput(element, context, callback) {
				if (!isHtmlDomElement(element)) throw new TypeError("expect a Element param: element");
				if (typeof callback !== "function") throw new TypeError("expect a function param: callback");
				function gamerClickHandler(event) {
					var target = event.target,
					    position = null;
					if (target.tagName !== "DIV") return;
					position = [].concat(_toConsumableArray(target.parentNode.children)).indexOf(target);
					callback.call(context, position);
					element.removeEventListener("click", gamerClickHandler);
				}
				element.addEventListener("click", gamerClickHandler);
			}

			/**
	   * get the copy of the mapArr
	   * @return {Array} the mapArr
	   */

		}, {
			key: 'getMap',
			value: function getMap() {
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

		}, {
			key: 'getOneDimensionalMap',
			value: function getOneDimensionalMap() {
				var map = [];
				this[_mapArr].map(function (item) {
					item.map(function (chess) {
						map.push(chess);
					});
				});
				return map;
			}
		}]);

		return GradeMap;
	}();

	exports.GradeMap = GradeMap;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var WIN = -100;
	var LOSE = 100;
	var DRAW = 0;
	var DOUBLE_CONNECTED = 50;
	var empty = null;
	var _gameState = Symbol('gameState');
	var INPROGRESS = 1;
	var INFINITY = 100;

	var Minimax = function () {
		/**
	  * constructor
	  * @param  {Number} curPcChees 1 or 0 => 1: x, 0: o
	  */
		function Minimax(curPcChees) {
			_classCallCheck(this, Minimax);

			this.curPcChees = curPcChees;
			this.lineCheesArr = []; //when three chees in-line, this arr will record it
		}

		/**
	  * get the in-line chess arr when have three in-line
	  * @return {Array} the in-line array
	  */


		_createClass(Minimax, [{
			key: 'getLineChees',
			value: function getLineChees() {
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

		}, {
			key: _gameState,
			value: function value(oneDMap) {
				var state = DRAW,
				    tempChees = null,
				    isFull = false,
				    isFind = false,
				    i = 0,
				    sucTable = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
				isFull = oneDMap.every(function (item) {
					return item !== null;
				});

				//记录是否三联且记录棋子种类
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = sucTable.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var _step$value = _slicedToArray(_step.value, 2),
						    index = _step$value[0],
						    _item = _step$value[1];

						tempChees = oneDMap[_item[0]];
						for (i = 1; i < 3; i++) {
							if (oneDMap[_item[i]] != tempChees) break;
						}if (tempChees !== empty && i === 3) {
							isFind = true;
							this.lineCheesArr = sucTable[index];
							break;
						}
					}

					//has three in-line won or lose
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				if (isFind) {
					state = tempChees === this.curPcChees ? WIN : LOSE;
				} else {
					if (isFull) {
						return DRAW;
					} else {
						//finds[0] => one(0 part)   finds[1] => other(1 part) not clear which is computer
						var finds = [0, 0];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = sucTable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var item = _step2.value;

								tempChees = 0;
								var findEmpty = false,
								    j = void 0;
								for (j = 0; j < 3; j++) {
									if (oneDMap[item[j]] === empty && !findEmpty) findEmpty = true;else {
										var mapValue = oneDMap[item[j]] === empty ? 10 : oneDMap[item[j]];
										tempChees = tempChees + mapValue;
									}
								}
								if (tempChees === 2 && findEmpty) {
									isFind = true;
									finds[1]++;
								} else if (tempChees === 0 && findEmpty) {
									isFind = true;
									finds[0]++;
								}
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}

						if (finds[0] > 1 && finds[1] < 1) state = this.curPcChees === 0 ? -DOUBLE_CONNECTED : DOUBLE_CONNECTED;else if (finds[1] > 1 && finds[0] < 1) state = this.curPcChees === 1 ? -DOUBLE_CONNECTED : DOUBLE_CONNECTED;else state = INPROGRESS;
					}
				}
				return state;
			}

			/**
	   * analyze the game state by the param: oneDMap for outer call
	   * @param  {Array} oneDMap the game map desc by one-D array
	   * @return {Number}  the score  -1: loose 0: draw 1: win(PC)
	   */

		}, {
			key: 'gameState',
			value: function gameState(oneDMap) {
				this.lineCheesArr = [];
				var value = this[_gameState](oneDMap),
				    returnValue = 2;
				switch (value) {
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
		}, {
			key: 'minSearch',
			value: function minSearch(oneDMap) {
				var positionValue = this[_gameState](oneDMap),
				    i = void 0,
				    bestValue = INFINITY;
				if (positionValue === DRAW) return 0;
				if (positionValue !== INPROGRESS) return positionValue;
				for (i = 0; i < 9; i++) {
					if (oneDMap[i] === empty) {
						oneDMap[i] = this.curPcChees;
						var value = this.maxSearch(oneDMap);
						if (value < bestValue) bestValue = value;
						oneDMap[i] = empty;
					}
				}
				return bestValue;
			}
		}, {
			key: 'maxSearch',
			value: function maxSearch(oneDMap) {
				var positionValue = this[_gameState](oneDMap),
				    i = void 0,
				    bestValue = -INFINITY;
				if (positionValue === DRAW) return 0;
				if (positionValue !== INPROGRESS) return positionValue;
				for (i = 0; i < 9; i++) {
					if (oneDMap[i] === empty) {
						oneDMap[i] = Math.abs(1 - this.curPcChees);
						var value = this.minSearch(oneDMap);
						if (value > bestValue) bestValue = value;
						oneDMap[i] = empty;
					}
				}
				return bestValue;
			}
		}, {
			key: 'minimax',
			value: function minimax(oneDMap) {
				var i = void 0,
				    bestValue = INFINITY,
				    index = 0,
				    bestMove = [];
				for (i = 0; i < 9; i++) {
					if (oneDMap[i] === empty) {
						oneDMap[i] = this.curPcChees;
						var value = this.maxSearch(oneDMap);
						console.log(value);
						if (value < bestValue) {
							bestValue = value;
							index = 0;
							bestMove[index] = i;
						} else if (value === bestValue) {
							//best position more than one
							bestMove[index++] = i;
						}
						oneDMap[i] = empty;
					}
				}
				if (index > 0) index = Math.floor(Math.random() * index);
				return bestMove[index];
			}
		}]);

		return Minimax;
	}();

	exports.Minimax = Minimax;

/***/ }
/******/ ]);