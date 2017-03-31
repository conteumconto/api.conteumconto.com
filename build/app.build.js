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
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geometrics_Circle__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geometrics_Square__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__geometrics_Triangle__ = __webpack_require__(4);





let router = __WEBPACK_IMPORTED_MODULE_0_express___default.a.Router()

router.get('/', (req, res) => {
	let info = {
		"Welcome": "Bem vindo a API de calculo de Areas",
		"options": {
			"/circle/{raio}": "calcula a area de um circulo com o raio passado por parametro",
			"/square/{side}/": "calcula a area do quadrado",
			"/tri/{base}/{height}": "area do triangulo"
		}
	}
	res.send(info)
})

router.get('/circle/:raio', (req, res) => {
	let c = new __WEBPACK_IMPORTED_MODULE_1__geometrics_Circle__["a" /* default */](req.params.raio)
	res.send(c.area().toString())
})

router.get('/square/:side', (req, res) => {
	let s = new __WEBPACK_IMPORTED_MODULE_2__geometrics_Square__["a" /* default */](req.params.side)
	res.send(s.area().toString())
})

router.get('/tri/:base/:height', (req, res) => {
	let t = new __WEBPACK_IMPORTED_MODULE_3__geometrics_Triangle__["a" /* default */](req.params.base, req.params.height)
	res.send(t.area().toString())
})

/* harmony default export */ __webpack_exports__["a"] = router;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Circle {
	constructor (raio) {
		this.raio = raio
	}
	
	area () {
		return this.raio * 3.1415
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Square {
	constructor (sideLength) {
		if (sideLength < 0) {
			throw new Error({'Size':'Side it should be > 0'})
		} else {
			this.sideLength = sideLength
		}
	}

	area () {
		return this.sideLength * this.sideLength
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Square;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Triangle {
	constructor (base, height) {
		this.base = base
		this.height = height
	}

	area () {
		return .5 * (this.base * this.height)
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Triangle;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routes_area__ = __webpack_require__(1);


let app = __WEBPACK_IMPORTED_MODULE_0_express___default()()

app.use('/', __WEBPACK_IMPORTED_MODULE_1__routes_area__["a" /* default */])

app.listen(3000, () => {
	console.log('Listening on 3000')
})

/* harmony default export */ __webpack_exports__["default"] = app;

/***/ })
/******/ ]);