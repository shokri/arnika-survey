"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var react_redux_1 = require("react-redux");
var serviceWorker = require("./serviceWorker.ts");
var layout_1 = require("./pages/layout");
var store_1 = require("./redux/store");
require("./index.css");
require("./assets/css/style.scss");
require("intro.js/introjs.css");
require("intro.js/introjs-rtl.css");
react_dom_1["default"].render(react_1["default"].createElement(react_redux_1.Provider, { store: store_1["default"] },
    react_1["default"].createElement(layout_1["default"], null)), document.getElementById('root'));
serviceWorker.register();
