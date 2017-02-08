function isHtmlDomElement(target) {
	//is Element check
	return target instanceof Element;
}
var ElementClassNameHandlerUtils = {
	addElementClassName: function (element, className = "") {
		if(!isHtmlDomElement(element))
			throw new TypeError("expect a Element");
		let oldClassName = element.className;
		if (oldClassName.indexOf(className) < 0) {
			className = oldClassName.length > 0 ? " " + className : className;
			element.className = oldClassName + "" + className;
		}
	},
	removeElementClassName: function (element, className = "") {
		if(!isHtmlDomElement(element))
			throw new TypeError("expect a Element");
		let oldClassName = element.className;
		element.className = oldClassName.replace(className, "");
	},
	include: function (element, className = "") {
		if(!isHtmlDomElement(element))
			throw new TypeError("expect a Element");
		return element.className.indexOf(className) >= 0;
	}
};

var HtmlStrHandlerUtils = {
	saferHTML: function (literals, ...values) {
		var s = literals[0];
		for(var i = 0; i < values.length; i++){
			var arg = String(values[i]);
			// Escape special characters in the substitution.
    		s += arg.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
            // Don't escape special characters in the template.
    		s += literals[i+1];
		}
		return s;
	}
}

export {ElementClassNameHandlerUtils, HtmlStrHandlerUtils};