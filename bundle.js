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

	__webpack_require__(1);
	var content = __webpack_require__(5);
	content.main();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./style.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./style.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body {\n        background: yellow;\n    }\n.snake {\n    background-color: green;\n}", ""]);

	// exports


/***/ },
/* 3 */
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
/* 4 */
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(6).Snake;
	var Board = __webpack_require__(7).Board;
	var BoardDisplay = __webpack_require__(7).BoardDisplay;

	var GAME_INTERVAL = 750;

	module.exports = {
		main: function() {
			var snake = new Snake(12, 12);
			var board = new Board(25, 25, snake);
			var boardDisplay = new BoardDisplay(board);

			var interval = setInterval(function() {
				if (!board.step()) {
					clearInterval(interval);
				}
				boardDisplay.draw();
			}, GAME_INTERVAL);

			window.onkeydown = function(e) {
				var key = e.keyCode ? e.keyCode : e.which;

				var directionMap = {
					37 : board.snake.DIRECTIONS.LEFT,
					38 : board.snake.DIRECTIONS.UP,
					39 : board.snake.DIRECTIONS.RIGHT,
					40 : board.snake.DIRECTIONS.DOWN
				};

				if (directionMap[key] != null) { // up?
					board.snake.setDirection(directionMap[key]);
				}
			};

			return "ASDF";
		}
	}


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = {
		Snake: Snake
	}


	function SnakeSegment(x, y) {
		this.row = y;
		this.col = x;
	}

	SnakeSegment.prototype = {
		constructor: SnakeSegment,
	};

	function Snake(x, y) {
		this.DIRECTIONS = {
			UP: 'UP',
			DOWN: 'DOWN',
			LEFT: 'LEFT',
			RIGHT: 'RIGHT'
		};

		this.direction = this.DIRECTIONS.UP;

		this.segments = [ new SnakeSegment(x, y),
						  new SnakeSegment(x -1, y),
						  new SnakeSegment(x -2, y),
						  new SnakeSegment(x -3, y),
						  new SnakeSegment(x -4, y),
						  new SnakeSegment(x -5, y),
						  new SnakeSegment(x -6, y)];

		this.hasSegmentAt = function(row, col) {
			for (var i=0; i < this.segments.length; i++) {
				if (this.segments[i].col === col && this.segments[i].row === row) {
					return true;
				}
			}
			return false;
		},

		this.setDirection = function(direction) {
			console.log(direction);
			var oppositeDir = false;

			this.DIRECTIONS.keys().filter(function(d) {
				// DO STUFF HERE
				return d === direction;
			});

			if(this.direction == this.DIRECTIONS.UP && direction == this.DIRECTIONS.DOWN) {
				oppositeDir = true;
			}

			if(!oppositeDir) {
				this.direction = direction;
			}
		},

		this.move = function() {
			var currentHeadSegment = this.segments[0]; //duplicate this?

			var newSegCol;
			var newSegRow;
			switch (this.direction) {
				case this.DIRECTIONS.UP:
					newSegCol = currentHeadSegment['col'];
					newSegRow = currentHeadSegment['row'] - 1;
					break;
				case this.DIRECTIONS.LEFT:
					newSegCol = currentHeadSegment['col'] - 1;
					newSegRow = currentHeadSegment['row'];
					break;
				case this.DIRECTIONS.RIGHT:
					newSegCol = currentHeadSegment['col'] + 1;
					newSegRow = currentHeadSegment['row'];
					break;
				case this.DIRECTIONS.DOWN:
					newSegCol = currentHeadSegment['col'];
					newSegRow = currentHeadSegment['row'] + 1;
					break;
			}

			this.segments.unshift(new SnakeSegment(newSegCol, newSegRow));
			// chop off last segment
			this.segments.pop();
		}

		this.intersectWithSelf = function() {
			var headSegment = this.segments[0];

			return this.segments.slice(1, this.segments.length).filter(function(segment) {
				return headSegment.row === segment.row && headSegment.col === segment.col;
			}).length > 0;
		}
	}


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Snake = __webpack_require__(6).Snake;

	module.exports = {
		Board: Board,
		BoardDisplay: BoardDisplay
	}

	/**
	 * Created by saxelrod on 12/5/16.
	 */
	function Board(width, height, snake) {
		this.width = width;
		this.height = height;
		this.snake = snake;

		this.step = function() {
			snake.move();
			return !this.isSnakeDead();
		},

		this.isSnakeDead = function() {
			var segment = snake.segments[0];
			return segment.row >= this.height
							|| segment.col >= this.width
							|| segment.row < 0
							|| segment.col < 0
					|| snake.intersectWithSelf();
		}
	}

	function BoardDisplay(board) {
		this.el = document.getElementById("gameBoard");
		this.board = board;
	}

	BoardDisplay.prototype = {
		constructor: BoardDisplay,

		drawEmptyCell: function(row, col) {
			return '<td id="col_' + col + '">O</td>';
		},

		drawSnakeCell: function(row, col) {
			return '<td id="col_' + col + '" class="snake">=</td>';
		},

		draw: function() {

			if (this.board.isSnakeDead()) {
				document.getElementsByTagName("pre")[0].style = "display: block"
			} else {
				var t = "";

				for (var i = 0; i < this.board.width; i++) {
					t += '<tr id="row_' + i + '">';
					for (var j = 0; j < this.board.height; j++) {
						if (this.board.snake.hasSegmentAt(i, j)) {
							t += this.drawSnakeCell(i, j);
						} else {
							t += this.drawEmptyCell(i, j);
						}
					}

					t += '</tr>\n';
				}

				this.el.innerHTML = ("<table>" + t + "</table>");
			}
		}
	};

/***/ }
/******/ ]);