require("./lanceDialog.css") // 载入 style.css
import {ElementClassNameHandlerUtils, HtmlStrHandlerUtils} from './utils';

const _dialogEle = Symbol('dialogEle');
const _dialogEleGenerator = Symbol('dialogEleGenerator');
const _dialogFeedbackCallbacks = Symbol('dialogFeedbackCallbacks');
const _triggerCallback = Symbol('triggerCallback');
const _initEventLis = Symbol('initEventLis');

class Dialog{
	constructor(name=window.location.hostname, content=""){
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
	[_dialogEleGenerator]() {
		let eleStr = `<div class="dialog-mask"></div>
		<div class="dialog-win">
			<div class="d-header"><h1>${this.name}</h1></div>
			<div class="d-content">${this.content}</div>
			<div class="d-btnWrapper">
				<a href="javascript: void(0)" data-target="yes">yes</a>
				<a href="javascript: void(0)" data-target="no">no</a>
			</div>
		</div>`,
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
	[_triggerCallback](targetData) {
		this[_dialogFeedbackCallbacks].forEach(item => item.callback.call(item.thisArg, targetData==="yes"?true:false));
	}

	/**
	 * @inner
	 * init dialog element all event lis
	 */
	[_initEventLis]() {
		let self = this;
		this[_dialogEle].addEventListener("click", function (event) {
			let target = event.target;
			if(ElementClassNameHandlerUtils.include(target, "dialog-mask")){
				self.close();
				return;
			}
			if(target.tagName === "A"){
				self[_triggerCallback](target.getAttribute("data-target"));
			}
		});
	}

	/**
	 * public
	 * popup the dialog
	 * 
	 */
	popup() {
		if (!this[_dialogEle]) {
			this[_dialogEle] = this[_dialogEleGenerator]();
			this[_initEventLis]();
			document.body.appendChild(this[_dialogEle]);
		}
		let self = this;
		setTimeout(function () {
			ElementClassNameHandlerUtils.removeElementClassName(self[_dialogEle], "close");
		}, 0);
	}

	/**
	 * public
	 * unpopup the dialog
	 */
	close() {
		ElementClassNameHandlerUtils.addElementClassName(this[_dialogEle], "close");
	}

	/**
	 * public
	 * add users click feedback callback
	 *
	 * @param {Object} thisArg the this context when call the func
	 * @param {Function} callback the function will be call when user select a option, the function's argument is true(yes) false(false) in Dialog class, is from this.selects in SelectDialog class.
	 */
	addCallback(thisArg = null, callback = () => {}) {
		this[_dialogFeedbackCallbacks].push({thisArg, callback});
	}
}

class SelectDialog extends Dialog{
	constructor(name=window.location.hostname, content="", selects=[]){
		super(name, content);
		this.selects = [...selects];
	}

	/**
	 * @override
	 * 
	 * @inner
	 * generate the dialog element by name,content,selects
	 *
	 * @return {HTMLDivElement} [the Element of the dialog]
	 */
	[_dialogEleGenerator]() {
		let eleStr = `<div class="dialog-mask"></div>
		<div class="dialog-win">
			<div class="d-header"><h1>${this.name}</h1></div>
			<div class="d-content">${this.content}</div>
			<div class="d-btnWrapper">
				${this.selects.map(selectName => `
					<a href="javascript: void(0)" data-target="${selectName}">${selectName}</a>
					`).join('')}
			</div>
		</div>`,
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
	[_triggerCallback](targetData) {
		this[_dialogFeedbackCallbacks].forEach(item => item.callback.call(item.thisArg, targetData));
	}
}

export {Dialog, SelectDialog};