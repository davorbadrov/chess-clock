module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "+eY/":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"button":"button__jQNF7","centeredButton":"centeredButton__k-p50 button__jQNF7"};

/***/ }),

/***/ "/CH5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var keys = {
	SPACE: 32,
	ENTER: 13,
	ESCAPE: 27
};

/* harmony default export */ __webpack_exports__["a"] = (keys);

/***/ }),

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	if (opts === void 0) opts = EMPTY$1;

	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	var aAttr = a.attributes || EMPTY$1,
	    bAttr = b.attributes || EMPTY$1;
	if (aAttr.default) {
		return 1;
	}
	if (bAttr.default) {
		return -1;
	}
	var diff = rank(aAttr.path) - rank(bAttr.path);
	return diff || aAttr.path.length - bAttr.path.length;
}

function segmentize(url) {
	return strip(url).split('/');
}

function rank(url) {
	return (strip(url).match(/\/+/g) || '').length;
}

function strip(url) {
	return url.replace(/(^\/+|\/+$)/g, '');
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				return routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.slice().sort(pathRankSort).map(function (vnode) {
			var attrs = vnode.attributes || {},
			    path = attrs.path,
			    matches = exec(url, path, attrs);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
			return false;
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("JkW7");


/***/ }),

/***/ "7y5Z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__("xAKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('path', { d: 'M217.5 256l137.2-137.2c4.7-4.7 4.7-12.3 0-17l-8.5-8.5c-4.7-4.7-12.3-4.7-17 0L192 230.5 54.8 93.4c-4.7-4.7-12.3-4.7-17 0l-8.5 8.5c-4.7 4.7-4.7 12.3 0 17L166.5 256 29.4 393.2c-4.7 4.7-4.7 12.3 0 17l8.5 8.5c4.7 4.7 12.3 4.7 17 0L192 281.5l137.2 137.2c4.7 4.7 12.3 4.7 17 0l8.5-8.5c4.7-4.7 4.7-12.3 0-17L217.5 256z' });

/* harmony default export */ __webpack_exports__["a"] = (function () {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'svg',
		{ 'class': __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.closeIcon, viewBox: '0 0 384 512', 'aria-label': 'Close' },
		_ref
	);
});

/***/ }),

/***/ "E1C8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Home; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("ZAL5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_icon_settings__ = __webpack_require__("eGSV");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_icon_start__ = __webpack_require__("tdA7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__lib_settings__ = __webpack_require__("NUME");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__lib_keys__ = __webpack_require__("/CH5");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'h1',
	null,
	'Chess clock'
);

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	'label',
	{ 'for': 'minutesInput' },
	'Minutes (per player):'
);

var _ref3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_5__components_icon_start__["a" /* default */], null);

var Home = function (_Component) {
	_inherits(Home, _Component);

	function Home() {
		var _temp, _this, _ret;

		_classCallCheck(this, Home);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.componentWillUnmount = function () {
			document.removeEventListener('keydown', _this.keyPress);
		}, _this.keyPress = function (event) {
			if (event.keyCode === __WEBPACK_IMPORTED_MODULE_7__lib_keys__["a" /* default */].SPACE || event.keyCode === __WEBPACK_IMPORTED_MODULE_7__lib_keys__["a" /* default */].ENTER) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_settings__["b" /* save */])(_this.state);
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_preact_router__["route"])('/game');
			}
		}, _this.minutesChanged = function (event) {
			var timeInMins = Number(event.target.value);
			var newState = { timePerPlayerInMins: timeInMins };
			_this.setState(newState);
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_settings__["b" /* save */])(newState);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Home.prototype.componentDidMount = function componentDidMount() {
		var userSettings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__lib_settings__["a" /* get */])();
		this.setState(userSettings);
		document.addEventListener('keydown', this.keyPress);
	};

	Home.prototype.render = function render(props, state) {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.home },
			_ref,
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				null,
				_ref2,
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('input', {
					id: 'minutesInput',
					type: 'number',
					min: '1',
					step: '1',
					pattern: '[0-9]+',
					value: state.timePerPlayerInMins,
					onChange: this.minutesChanged
				})
			),
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
				{
					'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.startButton,
					'aria-label': 'Start game',
					href: '/game'
				},
				_ref3
			)
		);
	};

	return Home;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style__ = __webpack_require__("rq4c");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_app__ = __webpack_require__("qLaj");



/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_1__components_app__["a" /* default */]);

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "KoKg":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = minToMs;
/* harmony export (immutable) */ __webpack_exports__["b"] = format;
/* harmony export (immutable) */ __webpack_exports__["a"] = calculateTimeLeft;
function minToMs(minutes) {
	return minutes * 60 * 1000;
}

function format(timeInMs) {
	var timeInSeconds = Math.floor(timeInMs / 1000);
	var minutes = Math.floor(timeInSeconds / 60);
	var seconds = timeInSeconds % 60;
	var minutesString = ('0' + minutes).slice(-2);
	var secondsString = ('0' + seconds).slice(-2);
	return minutesString + ':' + secondsString;
}

function calculateTimeLeft(_ref) {
	var lastSubstractedTime = _ref.lastSubstractedTime,
	    timeLeftInMs = _ref.timeLeftInMs;

	var timeLeft = timeLeftInMs - (new Date() - lastSubstractedTime);
	return timeLeft;
}

/***/ }),

/***/ "NUME":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultSettings */
/* harmony export (immutable) */ __webpack_exports__["b"] = save;
/* harmony export (immutable) */ __webpack_exports__["a"] = get;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var key = 'CHESS_SETTINGS';

var defaultSettings = {
	// color1: '#3498db',
	// color2: '#d35400',
	timePerPlayerInMins: 10
};

function save(userSettings) {
	var settings = _extends({}, defaultSettings, userSettings);
	var settingsStringified = JSON.stringify(settings);
	localStorage.setItem(key, settingsStringified);
}

function get() {
	var settingsStringified = localStorage.getItem(key);
	var persistedSettings = JSON.parse(settingsStringified);
	try {
		return _extends({}, defaultSettings, persistedSettings);
	} catch (error) {

		/* ignore the error */
		return _extends({}, defaultSettings);
	}
}

/***/ }),

/***/ "R2VR":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"container":"container__3gzur","containerInactive":"containerInactive__3HyUa container__3gzur","playerArea":"playerArea__FyBzY","playerAreaActive":"playerAreaActive__bAMcR","player1Area":"player1Area__GCWcc playerArea__FyBzY","player1AreaActive":"player1AreaActive__1MHA7 player1Area__GCWcc playerArea__FyBzY playerAreaActive__bAMcR","player2Area":"player2Area__1g-MQ playerArea__FyBzY","player2AreaActive":"player2AreaActive__21Gqj player2Area__1g-MQ playerArea__FyBzY playerAreaActive__bAMcR"};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__MseGd","startButton":"startButton__1hOhd"};

/***/ }),

/***/ "eGSV":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__("xAKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('path', { d: 'M190.883 502.932c-4.517 0-9.082-.991-13.368-3.055l-63.216-30.438c-13.348-6.426-20.255-21.479-16.422-35.794 3.684-13.757 8.609-29.81 14.376-46.879a195.425 195.425 0 0 1-15.733-19.711c-17.979 1.837-34.736 3.07-48.937 3.594-14.773.515-27.899-9.536-31.195-23.975L.776 278.273c-3.297-14.444 4.167-29.229 17.748-35.156 13.056-5.697 28.669-11.851 45.59-17.977a193.78 193.78 0 0 1 5.601-24.614c-12.655-12.922-24.061-25.246-33.297-35.989-9.643-11.217-9.939-27.761-.706-39.339l43.744-54.854c9.239-11.584 25.453-14.963 38.552-8.043 12.556 6.636 27.096 15.004 42.466 24.433a194.25 194.25 0 0 1 22.746-10.969c2.209-17.923 4.735-34.522 7.381-48.468 2.757-14.532 15.506-25.079 30.315-25.079h70.161c14.815 0 27.569 10.567 30.325 25.126 2.646 13.983 5.17 30.564 7.377 48.422a193.854 193.854 0 0 1 22.75 10.971c15.42-9.466 29.975-17.843 42.506-24.458 13.079-6.901 29.275-3.512 38.509 8.066l43.743 54.855c9.237 11.582 8.928 28.142-.738 39.374-9.254 10.756-20.646 23.066-33.263 35.957a193.79 193.79 0 0 1 5.601 24.62c16.986 6.145 32.615 12.304 45.634 17.992h.001c13.553 5.923 20.997 20.699 17.701 35.137l-15.615 68.4c-3.299 14.446-16.455 24.532-31.247 23.972-14.229-.531-30.97-1.762-48.889-3.588a195.251 195.251 0 0 1-15.728 19.703c5.791 17.122 10.723 33.189 14.394 46.921 3.819 14.291-3.093 29.324-16.436 35.748l-63.214 30.438c-13.351 6.428-29.426 2.438-38.224-9.484-8.455-11.455-17.931-25.313-27.679-40.466-8.425.548-16.745.548-25.176 0-9.772 15.201-19.257 29.075-27.702 40.508-5.964 8.075-15.283 12.499-24.824 12.5zm-61.851-61.915l61.516 29.619c15.437-20.988 29.097-42.937 36.43-54.579 26.665 3.104 31.829 3.053 58.035.001 6.932 10.997 20.8 33.291 36.445 54.576l61.515-29.619c-6.794-25.207-15.471-49.669-19.957-62.54 19.028-18.834 22.066-22.637 36.219-45.367 13.048 1.451 39.007 4.495 65.388 5.533l15.195-66.562c-24.034-10.441-48.695-18.946-61.337-23.387-2.824-26.58-3.888-31.341-12.882-56.619 9.27-9.299 27.886-27.753 45.083-47.657l-42.566-53.381c-22.622 12.001-44 25.528-56.513 33.37-22.495-14.328-26.889-16.481-52.31-25.228-1.474-12.904-4.292-38.972-9.156-64.958H221.86c-4.53 24.145-7.144 47.395-9.144 64.955-25.185 8.667-29.587 10.755-52.309 25.223-11.055-6.923-33.256-21.009-56.521-33.362l-42.568 53.379c16.896 19.57 35.133 37.669 45.088 47.647-8.943 25.131-10.043 29.878-12.885 56.613-12.366 4.348-37.104 12.879-61.339 23.397l15.192 66.562c25.642-.998 50.721-3.907 65.381-5.542 14.147 22.727 17.192 26.54 36.221 45.377-4.265 12.257-13.059 37.034-19.944 62.549zm351.667-168.554l.009.004-.009-.004zM256 347.486c-50.446 0-91.486-41.041-91.486-91.486s41.041-91.486 91.486-91.486c50.445 0 91.486 41.041 91.486 91.486S306.445 347.486 256 347.486zm0-150.972c-32.801 0-59.486 26.686-59.486 59.486S223.2 315.486 256 315.486 315.486 288.8 315.486 256 288.801 196.514 256 196.514z' });

/* unused harmony default export */ var _unused_webpack_default_export = (function () {
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'svg',
		{
			'class': __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.settingsIcon,
			viewBox: '0 0 512 512',
			'aria-label': 'Settings'
		},
		_ref
	);
});

/***/ }),

/***/ "kLLQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Profile; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match__ = __webpack_require__("sw5u");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router_match___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_preact_router_match__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style__ = __webpack_require__("R2VR");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__style___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__style__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lib_settings__ = __webpack_require__("NUME");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_button__ = __webpack_require__("rAoZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_icon_start__ = __webpack_require__("tdA7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_icon_close__ = __webpack_require__("7y5Z");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__lib_time__ = __webpack_require__("KoKg");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__lib_keys__ = __webpack_require__("/CH5");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var PLAYER_1 = 1;
var PLAYER_2 = 2;

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_6__components_icon_start__["a" /* default */], { white: true });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
	__WEBPACK_IMPORTED_MODULE_1_preact_router_match__["Link"],
	{ href: '/' },
	__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_7__components_icon_close__["a" /* default */], null)
);

var Profile = function (_Component) {
	_inherits(Profile, _Component);

	function Profile() {
		var _this$state;

		var _temp, _this, _ret;

		_classCallCheck(this, Profile);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = (_this$state = {
			activePlayer: undefined,
			timer: undefined,
			playerLost: undefined
		}, _this$state[PLAYER_1] = {
			lastSubstractedTime: undefined, // need to change this to "lastSubstractedTime" and update it each time
			timeLeftInMs: undefined // timeLeftInMs is updated
		}, _this$state[PLAYER_2] = {
			lastSubstractedTime: undefined,
			timeLeftInMs: undefined
		}, _this$state), _this.componentWillUnmount = function () {
			document.removeEventListener('keydown', _this.keyPress);
		}, _this.keyPress = function (event) {
			if (event.keyCode === __WEBPACK_IMPORTED_MODULE_9__lib_keys__["a" /* default */].SPACE || event.keyCode === __WEBPACK_IMPORTED_MODULE_9__lib_keys__["a" /* default */].ENTER) {
				if (!_this.state.activePlayer) {
					_this.startGame();
				} else {
					_this.endTurn();
				}
			}

			if (event.keyCode === __WEBPACK_IMPORTED_MODULE_9__lib_keys__["a" /* default */].ESCAPE) {
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_preact_router__["route"])('/');
			}
		}, _this.updateTime = function () {
			var _this$setState;

			var state = _this.state;
			var activePlayer = state.activePlayer;
			var timeLeftInMs = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["a" /* calculateTimeLeft */])(state[activePlayer]);

			if (timeLeftInMs <= 0) {
				clearInterval(_this.state.timer);
			}

			var updatedActivePlayerState = _extends({}, state[activePlayer], {
				timeLeftInMs: timeLeftInMs,
				lastSubstractedTime: new Date()
			});

			_this.setState((_this$setState = {}, _this$setState[activePlayer] = updatedActivePlayerState, _this$setState.playerLost = timeLeftInMs <= 0 ? activePlayer : undefined, _this$setState));
		}, _this.startGame = function (event) {
			var _this$setState2;

			event && event.stopPropagation(); // prevent triggering the event on the body
			var oldPlayerState = _this.state[PLAYER_2];
			var newPlayerState = _extends({}, oldPlayerState, {
				lastSubstractedTime: new Date().getTime()
			});

			_this.setState((_this$setState2 = {
				activePlayer: PLAYER_2
			}, _this$setState2[PLAYER_2] = newPlayerState, _this$setState2));

			_this.setState({
				timer: setInterval(_this.updateTime, 100)
			});
		}, _this.endTurn = function () {
			var _this$setState3;

			if (!_this.state.activePlayer) return;

			var oldActivePlayer = _this.state.activePlayer;
			var newActivePlayer = oldActivePlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;

			var oldPlayerState = _this.state[oldActivePlayer];
			var newPlayerState = _this.state[newActivePlayer];
			var newActivePlayerState = _extends({}, newPlayerState, {
				lastSubstractedTime: new Date().getTime()
			});
			var oldActivePlayerState = _extends({}, oldPlayerState, {
				timeLeftInMs: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["a" /* calculateTimeLeft */])(oldPlayerState)
			});

			_this.setState((_this$setState3 = {
				activePlayer: newActivePlayer
			}, _this$setState3[newActivePlayer] = newActivePlayerState, _this$setState3[oldActivePlayer] = oldActivePlayerState, _this$setState3));
		}, _this.renderStartButton = function () {
			if (_this.state.activePlayer) return;

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_5__components_button__["a" /* default */],
				{ center: true, onClick: _this.startGame },
				_ref
			);
		}, _this.renderTimeout = function (state) {
			if (!state.playerLost) return null;

			var player1Class = state.playerLost === PLAYER_2 ? __WEBPACK_IMPORTED_MODULE_3__style___default.a.player1AreaActive : __WEBPACK_IMPORTED_MODULE_3__style___default.a.player1Area;

			var player2Class = state.playerLost === PLAYER_1 ? __WEBPACK_IMPORTED_MODULE_3__style___default.a.player2AreaActive : __WEBPACK_IMPORTED_MODULE_3__style___default.a.player2Area;

			var player1Message = state.playerLost === PLAYER_1 ? 'You lost' : 'You won';
			var player2Message = state.playerLost === PLAYER_2 ? 'You lost' : 'You won';

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.container },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ 'class': player1Class },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'span',
						null,
						player1Message
					)
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ 'class': player2Class },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'span',
						null,
						player2Message
					)
				)
			);
		}, _this.renderClock = function (state) {
			if (state.playerLost) return null;

			var player1Class = state.activePlayer === PLAYER_1 ? __WEBPACK_IMPORTED_MODULE_3__style___default.a.player1AreaActive : __WEBPACK_IMPORTED_MODULE_3__style___default.a.player1Area;

			var player2Class = state.activePlayer === PLAYER_2 ? __WEBPACK_IMPORTED_MODULE_3__style___default.a.player2AreaActive : __WEBPACK_IMPORTED_MODULE_3__style___default.a.player2Area;

			return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				'div',
				{ 'class': __WEBPACK_IMPORTED_MODULE_3__style___default.a.container },
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ 'class': player1Class },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'span',
						null,
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["b" /* format */])(state[PLAYER_1].timeLeftInMs)
					)
				),
				__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
					'div',
					{ 'class': player2Class },
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
						'span',
						null,
						__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["b" /* format */])(state[PLAYER_2].timeLeftInMs)
					)
				)
			);
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Profile.prototype.componentDidMount = function componentDidMount() {
		var _extends2;

		var userSettings = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__lib_settings__["a" /* get */])();
		this.setState(_extends({}, userSettings, (_extends2 = {}, _extends2[PLAYER_1] = {
			timeLeftInMs: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["c" /* minToMs */])(userSettings.timePerPlayerInMins)
		}, _extends2[PLAYER_2] = {
			timeLeftInMs: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8__lib_time__["c" /* minToMs */])(userSettings.timePerPlayerInMins)
		}, _extends2)));
		document.addEventListener('keydown', this.keyPress);
	};

	Profile.prototype.render = function render(props, state) {
		var containerSyle = state.activePlayer ? __WEBPACK_IMPORTED_MODULE_3__style___default.a.container : __WEBPACK_IMPORTED_MODULE_3__style___default.a.containerInactive;
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ 'class': containerSyle, onClick: this.endTurn },
			_ref2,
			this.renderTimeout(state),
			this.renderClock(state),
			this.renderStartButton()
		);
	};

	return Profile;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "qLaj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return App; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact_router__ = __webpack_require__("/QC5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__routes_home__ = __webpack_require__("E1C8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__routes_game__ = __webpack_require__("kLLQ");


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






//import Settings from '../routes/settings';

var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_2__routes_home__["a" /* default */], { path: '/' });

var _ref2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(__WEBPACK_IMPORTED_MODULE_3__routes_game__["a" /* default */], { path: '/game' });

var App = function (_Component) {
	_inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		_classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			_this.currentUrl = e.url;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
			'div',
			{ id: 'app' },
			__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
				__WEBPACK_IMPORTED_MODULE_1_preact_router__["Router"],
				{ onChange: this.handleRoute },
				_ref,
				_ref2
			)
		);
	};

	return App;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);



/***/ }),

/***/ "rAoZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__("+eY/");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);




/* harmony default export */ __webpack_exports__["a"] = (function (_ref) {
	var children = _ref.children,
	    _ref$type = _ref.type,
	    type = _ref$type === undefined ? 'button' : _ref$type,
	    onClick = _ref.onClick,
	    center = _ref.center;

	var buttonClass = center ? __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.centeredButton : __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.button;
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'button',
		{ 'class': buttonClass, onClick: onClick, type: type },
		children
	);
});

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "tdA7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css__ = __webpack_require__("xAKj");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_css__);




var _ref = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('path', { d: 'M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zM40 256c0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216 0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216zm331.7-18l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM192 335.8V176.9c0-4.7 5.1-7.6 9.1-5.1l134.5 81.7c3.9 2.4 3.8 8.1-.1 10.3L201 341c-4 2.3-9-.6-9-5.2z' });

/* harmony default export */ __webpack_exports__["a"] = (function (white) {
	var iconClass = white ? __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.whitePlayIcon : __WEBPACK_IMPORTED_MODULE_1__style_css___default.a.playIcon;
	return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(
		'svg',
		{ 'class': iconClass, viewBox: '0 0 512 512', 'aria-label': 'Start' },
		_ref
	);
});

/***/ }),

/***/ "xAKj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"icon":"icon__2Q675","settingsIcon":"settingsIcon__1dwWE icon__2Q675","closeIcon":"closeIcon__tLsiI icon__2Q675","playIcon":"playIcon__1ZKVf icon__2Q675","whitePlayIcon":"whitePlayIcon__Azvee playIcon__1ZKVf icon__2Q675"};

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map