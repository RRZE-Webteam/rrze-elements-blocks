/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@wordpress/icons/build-module/library/color.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/color.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const color = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  viewBox: "0 0 24 24",
  xmlns: "http://www.w3.org/2000/svg"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M17.2 10.9c-.5-1-1.2-2.1-2.1-3.2-.6-.9-1.3-1.7-2.1-2.6L12 4l-1 1.1c-.6.9-1.3 1.7-2 2.6-.8 1.2-1.5 2.3-2 3.2-.6 1.2-1 2.2-1 3 0 3.4 2.7 6.1 6.1 6.1s6.1-2.7 6.1-6.1c0-.8-.3-1.8-1-3zm-5.1 7.6c-2.5 0-4.6-2.1-4.6-4.6 0-.3.1-1 .8-2.3.5-.9 1.1-1.9 2-3.1.7-.9 1.3-1.7 1.8-2.3.7.8 1.3 1.6 1.8 2.3.8 1.1 1.5 2.2 2 3.1.7 1.3.8 2 .8 2.3 0 2.5-2.1 4.6-4.6 4.6z"
}));
/* harmony default export */ __webpack_exports__["default"] = (color);
//# sourceMappingURL=color.js.map

/***/ }),

/***/ "./node_modules/@wordpress/icons/build-module/library/symbol.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@wordpress/icons/build-module/library/symbol.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__);

/**
 * WordPress dependencies
 */

const symbol = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.SVG, {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24"
}, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_1__.Path, {
  d: "M21.3 10.8l-5.6-5.6c-.7-.7-1.8-.7-2.5 0l-5.6 5.6c-.7.7-.7 1.8 0 2.5l5.6 5.6c.3.3.8.5 1.2.5s.9-.2 1.2-.5l5.6-5.6c.8-.7.8-1.9.1-2.5zm-1 1.4l-5.6 5.6c-.1.1-.3.1-.4 0l-5.6-5.6c-.1-.1-.1-.3 0-.4l5.6-5.6s.1-.1.2-.1.1 0 .2.1l5.6 5.6c.1.1.1.3 0 .4zm-16.6-.4L10 5.5l-1-1-6.3 6.3c-.7.7-.7 1.8 0 2.5L9 19.5l1.1-1.1-6.3-6.3c-.2 0-.2-.2-.1-.3z"
}));
/* harmony default export */ __webpack_exports__["default"] = (symbol);
//# sourceMappingURL=symbol.js.map

/***/ }),

/***/ "./src/accordion/InspectorControls/ColorSwitcher.js":
/*!**********************************************************!*\
  !*** ./src/accordion/InspectorControls/ColorSwitcher.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ColorSwitcher: function() { return /* binding */ ColorSwitcher; },
/* harmony export */   ColorSwitcherToolbar: function() { return /* binding */ ColorSwitcherToolbar; }
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/color.js");






var colorToSlugMap = {
  "#04316A": "",
  "#C50F3C": "rw",
  "#7bb725": "nat",
  "#18B4F1": "med",
  "#FDB735": "phil",
  "#8C9FB1": "tf"
};
var ColorSwitcher = function ColorSwitcher(_ref) {
  var attributes = _ref.attributes,
    setAttributes = _ref.setAttributes;
  var color = attributes.color;
  var onChangeColor = function onChangeColor(newColor) {
    setAttributes({
      color: colorToSlugMap[newColor]
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Color Settings", "rrze-elements-b")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ColorPalette, {
    colors: [{
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Central institution", "rrze-elements-b"),
      color: "#04316A",
      slug: ""
    }, {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Business, Economics, and Law", "rrze-elements-b"),
      color: "#C50F3C"
    }, {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Sciences", "rrze-elements-b"),
      color: "#7bb725"
    }, {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Medicine", "rrze-elements-b"),
      color: "#18B4F1"
    }, {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Humanities, Social Sciences, and Theology", "rrze-elements-b"),
      color: "#FDB735"
    }, {
      name: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Engineering", "rrze-elements-b"),
      color: "#8C9FB1"
    }],
    value: Object.keys(colorToSlugMap).find(function (key) {
      return colorToSlugMap[key] === color;
    }),
    onChange: onChangeColor
  }));
};
var ColorSwitcherToolbar = function ColorSwitcherToolbar(_ref2) {
  var attributes = _ref2.attributes,
    setAttributes = _ref2.setAttributes;
  var color = attributes.color;
  var setColor = function setColor(newColor) {
    setAttributes({
      color: colorToSlugMap[newColor]
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarItem, null, function () {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToolbarDropdownMenu, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
      className: "rrzeElementsBFakColorSelector ".concat(attributes.color),
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Select a Color", "rrze-elements-b"),
      controls: [{
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Central Institution", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#04316A");
        }
      }, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Business, Economics, and Law", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#C50F3C");
        }
      }, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Sciences", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#7bb725");
        }
      }, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Medicine", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#18B4F1");
        }
      }, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Humanities, Social Sciences, and Theology", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#FDB735");
        }
      }, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("Faculty of Engineering", "rrze-elements-b"),
        icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
        onClick: function onClick() {
          return setColor("#8C9FB1");
        }
      }]
    });
  }));
};


/***/ }),

/***/ "./src/accordion/InspectorControls/IconPicker.js":
/*!*******************************************************!*\
  !*** ./src/accordion/InspectorControls/IconPicker.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IconMarkComponent: function() { return /* binding */ IconMarkComponent; },
/* harmony export */   IconPicker: function() { return /* binding */ IconPicker; },
/* harmony export */   useDynamicSvgIcon: function() { return /* binding */ useDynamicSvgIcon; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fontawesomeIconNames_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fontawesomeIconNames.json */ "./src/accordion/InspectorControls/fontawesomeIconNames.json");








/**
 * Fetch and set the SVG string attribute based on the provided type and iconName.
 *
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
var fetchSvgIcon = function fetchSvgIcon(type, iconName, attributes, setAttributes) {
  if (type && iconName) {
    var filePath = "assets/svg/".concat(type, "/").concat(iconName, ".svg");
    fetch(attributes.directory + filePath).then(function (response) {
      return response.text();
    }).then(function (svgString) {
      svgString = svgString.replace("<svg", "<svg height=\"1em\" width=\"1em\" class=\"rrze-elements-icon\" style=\"font-size: 1em; fill: currentcolor;\" aria-hidden=\"true\"");
      setAttributes({
        svgString: svgString + " "
      });
    }).catch(function (err) {
      console.error("Failed to load SVG: ".concat(err));
    });
  }
};

/**
 * Dynamically import the SVG icon based on the provided type and iconName.
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 * @returns
 */
var useDynamicSvgIcon = function useDynamicSvgIcon(type, iconName, attributes, setAttributes) {
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(null),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    Icon = _useState2[0],
    setIcon = _useState2[1];
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (type && iconName) {
      var filePath = "../../collapse/svg/".concat(type, "/").concat(iconName, ".svg");
      __webpack_require__("./src/collapse/svg lazy recursive ^\\.\\/.*\\.svg$")("./".concat(type, "/").concat(iconName, ".svg")).then(function (_ref) {
        var importedIcon = _ref.default;
        setIcon(function () {
          return importedIcon;
        });
      }).catch(function (err) {
        console.error("Failed to load SVG: ".concat(err));
      });
    }
  }, [type, iconName]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    fetchSvgIcon(type, iconName, attributes, setAttributes);
  }, [type, iconName, attributes, setAttributes]);
  return Icon;
};

/**
 * Handles the Icon selection inside the InspectorControls IconPanel or ToolbarButton with Modal.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
var IconPicker = React.memo(function (_ref2) {
  var attributes = _ref2.attributes,
    setAttributes = _ref2.setAttributes;
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    allIconsOptions = _useState4[0],
    setAllIconsOptions = _useState4[1];
  var _attributes$icon$spli = attributes.icon.split(" "),
    _attributes$icon$spli2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_attributes$icon$spli, 2),
    type = _attributes$icon$spli2[0],
    iconName = _attributes$icon$spli2[1];
  var Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    var createIconOptions = function createIconOptions(icons, label) {
      return icons.map(function (icon) {
        return {
          label: "".concat(icon, " (").concat(label, ")"),
          value: "".concat(label, " ").concat(icon)
        };
      });
    };
    setAllIconsOptions([].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(createIconOptions(_fontawesomeIconNames_json__WEBPACK_IMPORTED_MODULE_5__.solid, "solid")), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(createIconOptions(_fontawesomeIconNames_json__WEBPACK_IMPORTED_MODULE_5__.regular, "regular")), (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(createIconOptions(_fontawesomeIconNames_json__WEBPACK_IMPORTED_MODULE_5__.brands, "brands"))));
  }, []);
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ComboboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)("Select an icon", "rrze-elements-b"),
    onChange: function onChange(newIcon) {
      return setAttributes({
        icon: newIcon
      });
    },
    value: attributes.icon,
    options: allIconsOptions,
    onFilterValueChange: function onFilterValueChange(newIcon) {
      return setAttributes({
        icon: newIcon
      });
    }
  }), attributes.icon !== "" && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, Icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(Icon, {
    className: "elements-blocks-icon-selector-display"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
    isSecondary: true,
    onClick: function onClick() {
      return setAttributes({
        icon: "",
        svgString: ""
      });
    }
  }, "Remove Icon")));
});

/**
 * Handles the Icon Display inside the Editor View.
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
var IconMarkComponent = function IconMarkComponent(_ref3) {
  var type = _ref3.type,
    iconName = _ref3.iconName,
    attributes = _ref3.attributes,
    setAttributes = _ref3.setAttributes;
  var Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);
  return Icon ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(Icon, {
    className: "elements-blocks-icon-insideEditor"
  }) : null;
};


/***/ }),

/***/ "./src/accordion/edit.js":
/*!*******************************!*\
  !*** ./src/accordion/edit.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Edit; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @wordpress/icons */ "./node_modules/@wordpress/icons/build-module/library/symbol.js");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _InspectorControls_ColorSwitcher__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InspectorControls/ColorSwitcher */ "./src/accordion/InspectorControls/ColorSwitcher.js");
/* harmony import */ var _collapse_InspectorControls_HeadingComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../collapse/InspectorControls/HeadingComponent */ "./src/collapse/InspectorControls/HeadingComponent.js");
/* harmony import */ var _InspectorControls_IconPicker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./InspectorControls/IconPicker */ "./src/accordion/InspectorControls/IconPicker.js");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }









function Edit(_ref) {
  var attributes = _ref.attributes,
    context = _ref.context,
    setAttributes = _ref.setAttributes,
    clientId = _ref.clientId;
  /////////// Use Selects ///////////
  var _useSelect = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_6__.useSelect)(function (select) {
      var _getBlock;
      var _select = select("core/block-editor"),
        getBlock = _select.getBlock,
        getBlockParents = _select.getBlockParents,
        getBlocks = _select.getBlocks;
      var blockParents = getBlockParents(clientId, true);
      var parentClientId = blockParents[0];
      var siblingBlocks = getBlocks(parentClientId);
      var collapsiblesBeforeMe = ((_getBlock = getBlock(parentClientId)) === null || _getBlock === void 0 || (_getBlock = _getBlock.attributes) === null || _getBlock === void 0 ? void 0 : _getBlock.previousBlockIds) || [];
      var totalChildrenCount = 0;
      collapsiblesBeforeMe.forEach(function (blockClientId) {
        var _getBlock2;
        var childrenCount = ((_getBlock2 = getBlock(blockClientId)) === null || _getBlock2 === void 0 || (_getBlock2 = _getBlock2.attributes) === null || _getBlock2 === void 0 ? void 0 : _getBlock2.childrenCount) || 0;
        totalChildrenCount += childrenCount;
      });
      return {
        selectedBlock: getBlock(clientId),
        blockParents: blockParents,
        siblingBlocks: siblingBlocks,
        totalChildrenCount: totalChildrenCount
      };
    }, [clientId] // only rerun if clientId changes
    ),
    selectedBlock = _useSelect.selectedBlock,
    blockParents = _useSelect.blockParents,
    siblingBlocks = _useSelect.siblingBlocks,
    totalChildrenCount = _useSelect.totalChildrenCount;
  var props = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)();
  var sameBlockCount = attributes.sameBlockCount,
    title = attributes.title,
    color = attributes.color,
    loadOpen = attributes.loadOpen,
    icon = attributes.icon;
  var _useState = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState, 2),
    isActive = _useState2[0],
    setIsActive = _useState2[1];
  var _ref2 = (icon === null || icon === void 0 ? void 0 : icon.split(" ")) || [],
    _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, 2),
    iconType = _ref3[0],
    iconName = _ref3[1];
  var _useState3 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
    _useState4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState3, 2),
    isOpen = _useState4[0],
    setOpen = _useState4[1];
  var _useState5 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(""),
    _useState6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_useState5, 2),
    pluginDir = _useState6[0],
    setPluginDir = _useState6[1];

  //////////////// Use Effects ////////////////
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    setAttributes({
      ancestorCount: context["rrze-elements/collapseSBlockCount"] + context["rrze-elements/collapseTotalChildrenCount"] + 1
    });
  }, [context["rrze-elements/collapseSBlockCount"], context["rrze-elements/collapseTotalChildrenCount"]]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    setAttributes({
      color: context["rrze-elements/collapseColor"]
    });
  }), [context["rrze-elements/collapseColor"]];
  var sameTypeSiblingsBefore = 0;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    if (selectedBlock && blockParents.length > 0) {
      var _iterator = _createForOfIteratorHelper(siblingBlocks),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var block = _step.value;
          if (block.clientId === selectedBlock.clientId) {
            break;
          }
          if (block.name === selectedBlock.name) {
            var _block$innerBlocks;
            if (block !== null && block !== void 0 && (_block$innerBlocks = block.innerBlocks) !== null && _block$innerBlocks !== void 0 && _block$innerBlocks.forEach(function (innerBlock) {
              if (innerBlock.name === "rrze-elements/accordions") {
                sameTypeSiblingsBefore = sameTypeSiblingsBefore + (innerBlock === null || innerBlock === void 0 ? void 0 : innerBlock.innerBlocks.length);
              }
            })) ;
            sameTypeSiblingsBefore++;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (sameTypeSiblingsBefore !== attributes.sameBlockCount) {
        setAttributes({
          sameBlockCount: sameTypeSiblingsBefore
        });
      }
    }
  }, [selectedBlock, blockParents, siblingBlocks, attributes.sameBlockCount, setAttributes]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    // Fetch plugin directory path via REST API – Needed for save.js
    fetch("/wp-json/rrze-elements-blocks/v1/plugin-directory").then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    }).then(function (data) {
      setPluginDir(data.directory);
      setAttributes({
        directory: data.directory
      });
    }).catch(function (error) {
      console.error("There was a problem fetching the directory:", error);
    });
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    setAttributes({
      hstart: context["rrze-elements/accordion-hstart"]
    });
  }), [context["rrze-elements/accordion-hstart"]];

  /////////////////////// Event Handler / OnClick Handler //////////
  var openModal = function openModal() {
    return setOpen(true);
  };
  var closeModal = function closeModal() {
    return setOpen(false);
  };
  var toggleActive = function toggleActive() {
    setIsActive(!isActive);
  };
  var onChangeTitle = function onChangeTitle(newText) {
    if (newText === "") {
      setAttributes({
        title: " "
      });
    } else {
      setAttributes({
        title: newText
      });
    }
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.BlockControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarGroup, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarItem, null, function () {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.ToolbarButton, {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_10__["default"],
      label: icon === "" ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Add an icon", "rrze-elements-b") : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Change the icon", "rrze-elements-b"),
      onClick: openModal
    }), isOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Modal, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Select an Icon", "rrze-elements-b"),
      onRequestClose: closeModal
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_InspectorControls_IconPicker__WEBPACK_IMPORTED_MODULE_9__.IconPicker, {
      attributes: attributes,
      setAttributes: setAttributes
    }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
      isPrimary: true,
      onClick: closeModal
    }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Close", "rrze-elements-b"))));
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Icon Settings", "rrze-elements-b")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_InspectorControls_IconPicker__WEBPACK_IMPORTED_MODULE_9__.IconPicker, {
    attributes: attributes,
    setAttributes: setAttributes
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", _objectSpread({}, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "accordion-group ".concat(attributes.color)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_collapse_InspectorControls_HeadingComponent__WEBPACK_IMPORTED_MODULE_8__["default"], {
    level: attributes.hstart + 1,
    className: "accordion-heading",
    onClick: toggleActive
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "accordion-toggle ".concat(isActive || loadOpen ? "active" : "")
  }, attributes.icon && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_InspectorControls_IconPicker__WEBPACK_IMPORTED_MODULE_9__.IconMarkComponent, {
    type: iconType,
    iconName: iconName,
    attributes: attributes,
    setAttributes: setAttributes,
    className: "elements-blocks-icon-insideEditor"
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    onChange: onChangeTitle,
    value: title,
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)("Your Text", "text-box"),
    className: "elements-blocks-input-following-icon"
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "accordion-body ".concat(isActive ? "active" : "")
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("div", {
    className: "accordion-inner clearfix"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InnerBlocks, {
    allowedBlocks: ["rrze/rrze-video", "core/paragraph", "core/heading", "core/list", "core/image", "core/quote", "core/file", "core/audio", "core/cover", "core/table", "core/freeform", "core/preformatted", "core/pullquote", "core/verse", "core/code", "core/separator", "core/spacer", "core/shortcode", "core/calendar", "core/rss"]
  }))))));
}

/***/ }),

/***/ "./src/accordion/index.js":
/*!********************************!*\
  !*** ./src/accordion/index.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/accordion/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/accordion/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/accordion/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./save */ "./src/accordion/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./block.json */ "./src/accordion/block.json");




/**
 * Internal dependencies
 */




/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_5__.name, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_4__["default"]
});

/***/ }),

/***/ "./src/accordion/save.js":
/*!*******************************!*\
  !*** ./src/accordion/save.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ save; }
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _collapse_InspectorControls_HeadingComponent__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../collapse/InspectorControls/HeadingComponent */ "./src/collapse/InspectorControls/HeadingComponent.js");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


function save(_ref) {
  var attributes = _ref.attributes;
  var blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps.save();
  var sameBlockCount = attributes.sameBlockCount,
    totalChildrenCount = attributes.totalChildrenCount,
    color = attributes.color,
    title = attributes.title,
    ancestorCount = attributes.ancestorCount,
    hstart = attributes.hstart;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", _objectSpread({}, blockProps), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "accordion-group ".concat(attributes.color)
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_collapse_InspectorControls_HeadingComponent__WEBPACK_IMPORTED_MODULE_3__["default"], {
    level: hstart + 1,
    className: "accordion-heading"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("span", {
    className: "read-mode-only"
  }, "Test "), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("button", {
    className: "accordion-toggle",
    "data-toggle": "collapse",
    href: "#collapse_".concat(sameBlockCount + totalChildrenCount + ancestorCount),
    dangerouslySetInnerHTML: {
      __html: "".concat(attributes.svgString).concat(title)
    }
  }, title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    id: "collapse_".concat(sameBlockCount + totalChildrenCount + ancestorCount),
    className: "accordion-body",
    style: {
      display: "none"
    }
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)("div", {
    className: "accordion-inner clearfix"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InnerBlocks.Content, null))))));
}

/***/ }),

/***/ "./src/collapse/InspectorControls/HeadingComponent.js":
/*!************************************************************!*\
  !*** ./src/collapse/InspectorControls/HeadingComponent.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);


var _excluded = ["level", "children"];

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var HeadingComponent = function HeadingComponent(_ref) {
  var level = _ref.level,
    children = _ref.children,
    props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref, _excluded);
  switch (level) {
    case 3:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h3", _objectSpread({}, props), children);
    case 4:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h4", _objectSpread({}, props), children);
    case 5:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h5", _objectSpread({}, props), children);
    case 6:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h6", _objectSpread({}, props), children);
    case 7:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h6", _objectSpread({}, props), children);
    default:
      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.createElement)("h2", _objectSpread({}, props), children);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (HeadingComponent);

/***/ }),

/***/ "./src/accordion/editor.scss":
/*!***********************************!*\
  !*** ./src/accordion/editor.scss ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/accordion/style.scss":
/*!**********************************!*\
  !*** ./src/accordion/style.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/collapse/svg lazy recursive ^\\.\\/.*\\.svg$":
/*!************************************************************************************!*\
  !*** ./src/collapse/svg/ lazy ^\.\/.*\.svg$ chunkName: svg-icons namespace object ***!
  \************************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var map = {
	"./brands/42-group.svg": [
		"./src/collapse/svg/brands/42-group.svg",
		"svg-icons0"
	],
	"./brands/500px.svg": [
		"./src/collapse/svg/brands/500px.svg",
		"svg-icons1"
	],
	"./brands/accessible-icon.svg": [
		"./src/collapse/svg/brands/accessible-icon.svg",
		"svg-icons2"
	],
	"./brands/accusoft.svg": [
		"./src/collapse/svg/brands/accusoft.svg",
		"svg-icons3"
	],
	"./brands/adn.svg": [
		"./src/collapse/svg/brands/adn.svg",
		"svg-icons4"
	],
	"./brands/adversal.svg": [
		"./src/collapse/svg/brands/adversal.svg",
		"svg-icons5"
	],
	"./brands/affiliatetheme.svg": [
		"./src/collapse/svg/brands/affiliatetheme.svg",
		"svg-icons6"
	],
	"./brands/airbnb.svg": [
		"./src/collapse/svg/brands/airbnb.svg",
		"svg-icons7"
	],
	"./brands/algolia.svg": [
		"./src/collapse/svg/brands/algolia.svg",
		"svg-icons8"
	],
	"./brands/alipay.svg": [
		"./src/collapse/svg/brands/alipay.svg",
		"svg-icons9"
	],
	"./brands/amazon-pay.svg": [
		"./src/collapse/svg/brands/amazon-pay.svg",
		"svg-icons10"
	],
	"./brands/amazon.svg": [
		"./src/collapse/svg/brands/amazon.svg",
		"svg-icons11"
	],
	"./brands/amilia.svg": [
		"./src/collapse/svg/brands/amilia.svg",
		"svg-icons12"
	],
	"./brands/android.svg": [
		"./src/collapse/svg/brands/android.svg",
		"svg-icons13"
	],
	"./brands/angellist.svg": [
		"./src/collapse/svg/brands/angellist.svg",
		"svg-icons14"
	],
	"./brands/angrycreative.svg": [
		"./src/collapse/svg/brands/angrycreative.svg",
		"svg-icons15"
	],
	"./brands/angular.svg": [
		"./src/collapse/svg/brands/angular.svg",
		"svg-icons16"
	],
	"./brands/app-store-ios.svg": [
		"./src/collapse/svg/brands/app-store-ios.svg",
		"svg-icons17"
	],
	"./brands/app-store.svg": [
		"./src/collapse/svg/brands/app-store.svg",
		"svg-icons18"
	],
	"./brands/apper.svg": [
		"./src/collapse/svg/brands/apper.svg",
		"svg-icons19"
	],
	"./brands/apple-pay.svg": [
		"./src/collapse/svg/brands/apple-pay.svg",
		"svg-icons20"
	],
	"./brands/apple.svg": [
		"./src/collapse/svg/brands/apple.svg",
		"svg-icons21"
	],
	"./brands/artstation.svg": [
		"./src/collapse/svg/brands/artstation.svg",
		"svg-icons22"
	],
	"./brands/asymmetrik.svg": [
		"./src/collapse/svg/brands/asymmetrik.svg",
		"svg-icons23"
	],
	"./brands/atlassian.svg": [
		"./src/collapse/svg/brands/atlassian.svg",
		"svg-icons24"
	],
	"./brands/audible.svg": [
		"./src/collapse/svg/brands/audible.svg",
		"svg-icons25"
	],
	"./brands/autoprefixer.svg": [
		"./src/collapse/svg/brands/autoprefixer.svg",
		"svg-icons26"
	],
	"./brands/avianex.svg": [
		"./src/collapse/svg/brands/avianex.svg",
		"svg-icons27"
	],
	"./brands/aviato.svg": [
		"./src/collapse/svg/brands/aviato.svg",
		"svg-icons28"
	],
	"./brands/aws.svg": [
		"./src/collapse/svg/brands/aws.svg",
		"svg-icons29"
	],
	"./brands/bandcamp.svg": [
		"./src/collapse/svg/brands/bandcamp.svg",
		"svg-icons30"
	],
	"./brands/battle-net.svg": [
		"./src/collapse/svg/brands/battle-net.svg",
		"svg-icons31"
	],
	"./brands/behance.svg": [
		"./src/collapse/svg/brands/behance.svg",
		"svg-icons32"
	],
	"./brands/bilibili.svg": [
		"./src/collapse/svg/brands/bilibili.svg",
		"svg-icons33"
	],
	"./brands/bimobject.svg": [
		"./src/collapse/svg/brands/bimobject.svg",
		"svg-icons34"
	],
	"./brands/bitbucket.svg": [
		"./src/collapse/svg/brands/bitbucket.svg",
		"svg-icons35"
	],
	"./brands/bitcoin.svg": [
		"./src/collapse/svg/brands/bitcoin.svg",
		"svg-icons36"
	],
	"./brands/bity.svg": [
		"./src/collapse/svg/brands/bity.svg",
		"svg-icons37"
	],
	"./brands/black-tie.svg": [
		"./src/collapse/svg/brands/black-tie.svg",
		"svg-icons38"
	],
	"./brands/blackberry.svg": [
		"./src/collapse/svg/brands/blackberry.svg",
		"svg-icons39"
	],
	"./brands/blogger-b.svg": [
		"./src/collapse/svg/brands/blogger-b.svg",
		"svg-icons40"
	],
	"./brands/blogger.svg": [
		"./src/collapse/svg/brands/blogger.svg",
		"svg-icons41"
	],
	"./brands/bluetooth-b.svg": [
		"./src/collapse/svg/brands/bluetooth-b.svg",
		"svg-icons42"
	],
	"./brands/bluetooth.svg": [
		"./src/collapse/svg/brands/bluetooth.svg",
		"svg-icons43"
	],
	"./brands/bootstrap.svg": [
		"./src/collapse/svg/brands/bootstrap.svg",
		"svg-icons44"
	],
	"./brands/bots.svg": [
		"./src/collapse/svg/brands/bots.svg",
		"svg-icons45"
	],
	"./brands/btc.svg": [
		"./src/collapse/svg/brands/btc.svg",
		"svg-icons46"
	],
	"./brands/buffer.svg": [
		"./src/collapse/svg/brands/buffer.svg",
		"svg-icons47"
	],
	"./brands/buromobelexperte.svg": [
		"./src/collapse/svg/brands/buromobelexperte.svg",
		"svg-icons48"
	],
	"./brands/buy-n-large.svg": [
		"./src/collapse/svg/brands/buy-n-large.svg",
		"svg-icons49"
	],
	"./brands/buysellads.svg": [
		"./src/collapse/svg/brands/buysellads.svg",
		"svg-icons50"
	],
	"./brands/canadian-maple-leaf.svg": [
		"./src/collapse/svg/brands/canadian-maple-leaf.svg",
		"svg-icons51"
	],
	"./brands/cc-amazon-pay.svg": [
		"./src/collapse/svg/brands/cc-amazon-pay.svg",
		"svg-icons52"
	],
	"./brands/cc-amex.svg": [
		"./src/collapse/svg/brands/cc-amex.svg",
		"svg-icons53"
	],
	"./brands/cc-apple-pay.svg": [
		"./src/collapse/svg/brands/cc-apple-pay.svg",
		"svg-icons54"
	],
	"./brands/cc-diners-club.svg": [
		"./src/collapse/svg/brands/cc-diners-club.svg",
		"svg-icons55"
	],
	"./brands/cc-discover.svg": [
		"./src/collapse/svg/brands/cc-discover.svg",
		"svg-icons56"
	],
	"./brands/cc-jcb.svg": [
		"./src/collapse/svg/brands/cc-jcb.svg",
		"svg-icons57"
	],
	"./brands/cc-mastercard.svg": [
		"./src/collapse/svg/brands/cc-mastercard.svg",
		"svg-icons58"
	],
	"./brands/cc-paypal.svg": [
		"./src/collapse/svg/brands/cc-paypal.svg",
		"svg-icons59"
	],
	"./brands/cc-stripe.svg": [
		"./src/collapse/svg/brands/cc-stripe.svg",
		"svg-icons60"
	],
	"./brands/cc-visa.svg": [
		"./src/collapse/svg/brands/cc-visa.svg",
		"svg-icons61"
	],
	"./brands/centercode.svg": [
		"./src/collapse/svg/brands/centercode.svg",
		"svg-icons62"
	],
	"./brands/centos.svg": [
		"./src/collapse/svg/brands/centos.svg",
		"svg-icons63"
	],
	"./brands/chrome.svg": [
		"./src/collapse/svg/brands/chrome.svg",
		"svg-icons64"
	],
	"./brands/chromecast.svg": [
		"./src/collapse/svg/brands/chromecast.svg",
		"svg-icons65"
	],
	"./brands/cloudflare.svg": [
		"./src/collapse/svg/brands/cloudflare.svg",
		"svg-icons66"
	],
	"./brands/cloudscale.svg": [
		"./src/collapse/svg/brands/cloudscale.svg",
		"svg-icons67"
	],
	"./brands/cloudsmith.svg": [
		"./src/collapse/svg/brands/cloudsmith.svg",
		"svg-icons68"
	],
	"./brands/cloudversify.svg": [
		"./src/collapse/svg/brands/cloudversify.svg",
		"svg-icons69"
	],
	"./brands/cmplid.svg": [
		"./src/collapse/svg/brands/cmplid.svg",
		"svg-icons70"
	],
	"./brands/codepen.svg": [
		"./src/collapse/svg/brands/codepen.svg",
		"svg-icons71"
	],
	"./brands/codiepie.svg": [
		"./src/collapse/svg/brands/codiepie.svg",
		"svg-icons72"
	],
	"./brands/confluence.svg": [
		"./src/collapse/svg/brands/confluence.svg",
		"svg-icons73"
	],
	"./brands/connectdevelop.svg": [
		"./src/collapse/svg/brands/connectdevelop.svg",
		"svg-icons74"
	],
	"./brands/contao.svg": [
		"./src/collapse/svg/brands/contao.svg",
		"svg-icons75"
	],
	"./brands/cotton-bureau.svg": [
		"./src/collapse/svg/brands/cotton-bureau.svg",
		"svg-icons76"
	],
	"./brands/cpanel.svg": [
		"./src/collapse/svg/brands/cpanel.svg",
		"svg-icons77"
	],
	"./brands/creative-commons-by.svg": [
		"./src/collapse/svg/brands/creative-commons-by.svg",
		"svg-icons78"
	],
	"./brands/creative-commons-nc-eu.svg": [
		"./src/collapse/svg/brands/creative-commons-nc-eu.svg",
		"svg-icons79"
	],
	"./brands/creative-commons-nc-jp.svg": [
		"./src/collapse/svg/brands/creative-commons-nc-jp.svg",
		"svg-icons80"
	],
	"./brands/creative-commons-nc.svg": [
		"./src/collapse/svg/brands/creative-commons-nc.svg",
		"svg-icons81"
	],
	"./brands/creative-commons-nd.svg": [
		"./src/collapse/svg/brands/creative-commons-nd.svg",
		"svg-icons82"
	],
	"./brands/creative-commons-pd-alt.svg": [
		"./src/collapse/svg/brands/creative-commons-pd-alt.svg",
		"svg-icons83"
	],
	"./brands/creative-commons-pd.svg": [
		"./src/collapse/svg/brands/creative-commons-pd.svg",
		"svg-icons84"
	],
	"./brands/creative-commons-remix.svg": [
		"./src/collapse/svg/brands/creative-commons-remix.svg",
		"svg-icons85"
	],
	"./brands/creative-commons-sa.svg": [
		"./src/collapse/svg/brands/creative-commons-sa.svg",
		"svg-icons86"
	],
	"./brands/creative-commons-sampling-plus.svg": [
		"./src/collapse/svg/brands/creative-commons-sampling-plus.svg",
		"svg-icons87"
	],
	"./brands/creative-commons-sampling.svg": [
		"./src/collapse/svg/brands/creative-commons-sampling.svg",
		"svg-icons88"
	],
	"./brands/creative-commons-share.svg": [
		"./src/collapse/svg/brands/creative-commons-share.svg",
		"svg-icons89"
	],
	"./brands/creative-commons-zero.svg": [
		"./src/collapse/svg/brands/creative-commons-zero.svg",
		"svg-icons90"
	],
	"./brands/creative-commons.svg": [
		"./src/collapse/svg/brands/creative-commons.svg",
		"svg-icons91"
	],
	"./brands/critical-role.svg": [
		"./src/collapse/svg/brands/critical-role.svg",
		"svg-icons92"
	],
	"./brands/css3-alt.svg": [
		"./src/collapse/svg/brands/css3-alt.svg",
		"svg-icons93"
	],
	"./brands/css3.svg": [
		"./src/collapse/svg/brands/css3.svg",
		"svg-icons94"
	],
	"./brands/cuttlefish.svg": [
		"./src/collapse/svg/brands/cuttlefish.svg",
		"svg-icons95"
	],
	"./brands/d-and-d-beyond.svg": [
		"./src/collapse/svg/brands/d-and-d-beyond.svg",
		"svg-icons96"
	],
	"./brands/d-and-d.svg": [
		"./src/collapse/svg/brands/d-and-d.svg",
		"svg-icons97"
	],
	"./brands/dailymotion.svg": [
		"./src/collapse/svg/brands/dailymotion.svg",
		"svg-icons98"
	],
	"./brands/dashcube.svg": [
		"./src/collapse/svg/brands/dashcube.svg",
		"svg-icons99"
	],
	"./brands/deezer.svg": [
		"./src/collapse/svg/brands/deezer.svg",
		"svg-icons100"
	],
	"./brands/delicious.svg": [
		"./src/collapse/svg/brands/delicious.svg",
		"svg-icons101"
	],
	"./brands/deploydog.svg": [
		"./src/collapse/svg/brands/deploydog.svg",
		"svg-icons102"
	],
	"./brands/deskpro.svg": [
		"./src/collapse/svg/brands/deskpro.svg",
		"svg-icons103"
	],
	"./brands/dev.svg": [
		"./src/collapse/svg/brands/dev.svg",
		"svg-icons104"
	],
	"./brands/deviantart.svg": [
		"./src/collapse/svg/brands/deviantart.svg",
		"svg-icons105"
	],
	"./brands/dhl.svg": [
		"./src/collapse/svg/brands/dhl.svg",
		"svg-icons106"
	],
	"./brands/diaspora.svg": [
		"./src/collapse/svg/brands/diaspora.svg",
		"svg-icons107"
	],
	"./brands/digg.svg": [
		"./src/collapse/svg/brands/digg.svg",
		"svg-icons108"
	],
	"./brands/digital-ocean.svg": [
		"./src/collapse/svg/brands/digital-ocean.svg",
		"svg-icons109"
	],
	"./brands/discord.svg": [
		"./src/collapse/svg/brands/discord.svg",
		"svg-icons110"
	],
	"./brands/discourse.svg": [
		"./src/collapse/svg/brands/discourse.svg",
		"svg-icons111"
	],
	"./brands/dochub.svg": [
		"./src/collapse/svg/brands/dochub.svg",
		"svg-icons112"
	],
	"./brands/docker.svg": [
		"./src/collapse/svg/brands/docker.svg",
		"svg-icons113"
	],
	"./brands/draft2digital.svg": [
		"./src/collapse/svg/brands/draft2digital.svg",
		"svg-icons114"
	],
	"./brands/dribbble.svg": [
		"./src/collapse/svg/brands/dribbble.svg",
		"svg-icons115"
	],
	"./brands/dropbox.svg": [
		"./src/collapse/svg/brands/dropbox.svg",
		"svg-icons116"
	],
	"./brands/drupal.svg": [
		"./src/collapse/svg/brands/drupal.svg",
		"svg-icons117"
	],
	"./brands/dyalog.svg": [
		"./src/collapse/svg/brands/dyalog.svg",
		"svg-icons118"
	],
	"./brands/earlybirds.svg": [
		"./src/collapse/svg/brands/earlybirds.svg",
		"svg-icons119"
	],
	"./brands/ebay.svg": [
		"./src/collapse/svg/brands/ebay.svg",
		"svg-icons120"
	],
	"./brands/edge-legacy.svg": [
		"./src/collapse/svg/brands/edge-legacy.svg",
		"svg-icons121"
	],
	"./brands/edge.svg": [
		"./src/collapse/svg/brands/edge.svg",
		"svg-icons122"
	],
	"./brands/elementor.svg": [
		"./src/collapse/svg/brands/elementor.svg",
		"svg-icons123"
	],
	"./brands/ello.svg": [
		"./src/collapse/svg/brands/ello.svg",
		"svg-icons124"
	],
	"./brands/ember.svg": [
		"./src/collapse/svg/brands/ember.svg",
		"svg-icons125"
	],
	"./brands/empire.svg": [
		"./src/collapse/svg/brands/empire.svg",
		"svg-icons126"
	],
	"./brands/envira.svg": [
		"./src/collapse/svg/brands/envira.svg",
		"svg-icons127"
	],
	"./brands/erlang.svg": [
		"./src/collapse/svg/brands/erlang.svg",
		"svg-icons128"
	],
	"./brands/ethereum.svg": [
		"./src/collapse/svg/brands/ethereum.svg",
		"svg-icons129"
	],
	"./brands/etsy.svg": [
		"./src/collapse/svg/brands/etsy.svg",
		"svg-icons130"
	],
	"./brands/evernote.svg": [
		"./src/collapse/svg/brands/evernote.svg",
		"svg-icons131"
	],
	"./brands/expeditedssl.svg": [
		"./src/collapse/svg/brands/expeditedssl.svg",
		"svg-icons132"
	],
	"./brands/facebook-f.svg": [
		"./src/collapse/svg/brands/facebook-f.svg",
		"svg-icons133"
	],
	"./brands/facebook-messenger.svg": [
		"./src/collapse/svg/brands/facebook-messenger.svg",
		"svg-icons134"
	],
	"./brands/facebook.svg": [
		"./src/collapse/svg/brands/facebook.svg",
		"svg-icons135"
	],
	"./brands/fantasy-flight-games.svg": [
		"./src/collapse/svg/brands/fantasy-flight-games.svg",
		"svg-icons136"
	],
	"./brands/fedex.svg": [
		"./src/collapse/svg/brands/fedex.svg",
		"svg-icons137"
	],
	"./brands/fedora.svg": [
		"./src/collapse/svg/brands/fedora.svg",
		"svg-icons138"
	],
	"./brands/figma.svg": [
		"./src/collapse/svg/brands/figma.svg",
		"svg-icons139"
	],
	"./brands/firefox-browser.svg": [
		"./src/collapse/svg/brands/firefox-browser.svg",
		"svg-icons140"
	],
	"./brands/firefox.svg": [
		"./src/collapse/svg/brands/firefox.svg",
		"svg-icons141"
	],
	"./brands/first-order-alt.svg": [
		"./src/collapse/svg/brands/first-order-alt.svg",
		"svg-icons142"
	],
	"./brands/first-order.svg": [
		"./src/collapse/svg/brands/first-order.svg",
		"svg-icons143"
	],
	"./brands/firstdraft.svg": [
		"./src/collapse/svg/brands/firstdraft.svg",
		"svg-icons144"
	],
	"./brands/flickr.svg": [
		"./src/collapse/svg/brands/flickr.svg",
		"svg-icons145"
	],
	"./brands/flipboard.svg": [
		"./src/collapse/svg/brands/flipboard.svg",
		"svg-icons146"
	],
	"./brands/fly.svg": [
		"./src/collapse/svg/brands/fly.svg",
		"svg-icons147"
	],
	"./brands/font-awesome.svg": [
		"./src/collapse/svg/brands/font-awesome.svg",
		"svg-icons148"
	],
	"./brands/fonticons-fi.svg": [
		"./src/collapse/svg/brands/fonticons-fi.svg",
		"svg-icons149"
	],
	"./brands/fonticons.svg": [
		"./src/collapse/svg/brands/fonticons.svg",
		"svg-icons150"
	],
	"./brands/fort-awesome-alt.svg": [
		"./src/collapse/svg/brands/fort-awesome-alt.svg",
		"svg-icons151"
	],
	"./brands/fort-awesome.svg": [
		"./src/collapse/svg/brands/fort-awesome.svg",
		"svg-icons152"
	],
	"./brands/forumbee.svg": [
		"./src/collapse/svg/brands/forumbee.svg",
		"svg-icons153"
	],
	"./brands/foursquare.svg": [
		"./src/collapse/svg/brands/foursquare.svg",
		"svg-icons154"
	],
	"./brands/free-code-camp.svg": [
		"./src/collapse/svg/brands/free-code-camp.svg",
		"svg-icons155"
	],
	"./brands/freebsd.svg": [
		"./src/collapse/svg/brands/freebsd.svg",
		"svg-icons156"
	],
	"./brands/fulcrum.svg": [
		"./src/collapse/svg/brands/fulcrum.svg",
		"svg-icons157"
	],
	"./brands/galactic-republic.svg": [
		"./src/collapse/svg/brands/galactic-republic.svg",
		"svg-icons158"
	],
	"./brands/galactic-senate.svg": [
		"./src/collapse/svg/brands/galactic-senate.svg",
		"svg-icons159"
	],
	"./brands/get-pocket.svg": [
		"./src/collapse/svg/brands/get-pocket.svg",
		"svg-icons160"
	],
	"./brands/gg-circle.svg": [
		"./src/collapse/svg/brands/gg-circle.svg",
		"svg-icons161"
	],
	"./brands/gg.svg": [
		"./src/collapse/svg/brands/gg.svg",
		"svg-icons162"
	],
	"./brands/git-alt.svg": [
		"./src/collapse/svg/brands/git-alt.svg",
		"svg-icons163"
	],
	"./brands/git.svg": [
		"./src/collapse/svg/brands/git.svg",
		"svg-icons164"
	],
	"./brands/github-alt.svg": [
		"./src/collapse/svg/brands/github-alt.svg",
		"svg-icons165"
	],
	"./brands/github.svg": [
		"./src/collapse/svg/brands/github.svg",
		"svg-icons166"
	],
	"./brands/gitkraken.svg": [
		"./src/collapse/svg/brands/gitkraken.svg",
		"svg-icons167"
	],
	"./brands/gitlab.svg": [
		"./src/collapse/svg/brands/gitlab.svg",
		"svg-icons168"
	],
	"./brands/gitter.svg": [
		"./src/collapse/svg/brands/gitter.svg",
		"svg-icons169"
	],
	"./brands/glide-g.svg": [
		"./src/collapse/svg/brands/glide-g.svg",
		"svg-icons170"
	],
	"./brands/glide.svg": [
		"./src/collapse/svg/brands/glide.svg",
		"svg-icons171"
	],
	"./brands/gofore.svg": [
		"./src/collapse/svg/brands/gofore.svg",
		"svg-icons172"
	],
	"./brands/golang.svg": [
		"./src/collapse/svg/brands/golang.svg",
		"svg-icons173"
	],
	"./brands/goodreads-g.svg": [
		"./src/collapse/svg/brands/goodreads-g.svg",
		"svg-icons174"
	],
	"./brands/goodreads.svg": [
		"./src/collapse/svg/brands/goodreads.svg",
		"svg-icons175"
	],
	"./brands/google-drive.svg": [
		"./src/collapse/svg/brands/google-drive.svg",
		"svg-icons176"
	],
	"./brands/google-pay.svg": [
		"./src/collapse/svg/brands/google-pay.svg",
		"svg-icons177"
	],
	"./brands/google-play.svg": [
		"./src/collapse/svg/brands/google-play.svg",
		"svg-icons178"
	],
	"./brands/google-plus-g.svg": [
		"./src/collapse/svg/brands/google-plus-g.svg",
		"svg-icons179"
	],
	"./brands/google-plus.svg": [
		"./src/collapse/svg/brands/google-plus.svg",
		"svg-icons180"
	],
	"./brands/google-wallet.svg": [
		"./src/collapse/svg/brands/google-wallet.svg",
		"svg-icons181"
	],
	"./brands/google.svg": [
		"./src/collapse/svg/brands/google.svg",
		"svg-icons182"
	],
	"./brands/gratipay.svg": [
		"./src/collapse/svg/brands/gratipay.svg",
		"svg-icons183"
	],
	"./brands/grav.svg": [
		"./src/collapse/svg/brands/grav.svg",
		"svg-icons184"
	],
	"./brands/gripfire.svg": [
		"./src/collapse/svg/brands/gripfire.svg",
		"svg-icons185"
	],
	"./brands/grunt.svg": [
		"./src/collapse/svg/brands/grunt.svg",
		"svg-icons186"
	],
	"./brands/guilded.svg": [
		"./src/collapse/svg/brands/guilded.svg",
		"svg-icons187"
	],
	"./brands/gulp.svg": [
		"./src/collapse/svg/brands/gulp.svg",
		"svg-icons188"
	],
	"./brands/hacker-news.svg": [
		"./src/collapse/svg/brands/hacker-news.svg",
		"svg-icons189"
	],
	"./brands/hackerrank.svg": [
		"./src/collapse/svg/brands/hackerrank.svg",
		"svg-icons190"
	],
	"./brands/hashnode.svg": [
		"./src/collapse/svg/brands/hashnode.svg",
		"svg-icons191"
	],
	"./brands/hips.svg": [
		"./src/collapse/svg/brands/hips.svg",
		"svg-icons192"
	],
	"./brands/hire-a-helper.svg": [
		"./src/collapse/svg/brands/hire-a-helper.svg",
		"svg-icons193"
	],
	"./brands/hive.svg": [
		"./src/collapse/svg/brands/hive.svg",
		"svg-icons194"
	],
	"./brands/hooli.svg": [
		"./src/collapse/svg/brands/hooli.svg",
		"svg-icons195"
	],
	"./brands/hornbill.svg": [
		"./src/collapse/svg/brands/hornbill.svg",
		"svg-icons196"
	],
	"./brands/hotjar.svg": [
		"./src/collapse/svg/brands/hotjar.svg",
		"svg-icons197"
	],
	"./brands/houzz.svg": [
		"./src/collapse/svg/brands/houzz.svg",
		"svg-icons198"
	],
	"./brands/html5.svg": [
		"./src/collapse/svg/brands/html5.svg",
		"svg-icons199"
	],
	"./brands/hubspot.svg": [
		"./src/collapse/svg/brands/hubspot.svg",
		"svg-icons200"
	],
	"./brands/ideal.svg": [
		"./src/collapse/svg/brands/ideal.svg",
		"svg-icons201"
	],
	"./brands/imdb.svg": [
		"./src/collapse/svg/brands/imdb.svg",
		"svg-icons202"
	],
	"./brands/instagram.svg": [
		"./src/collapse/svg/brands/instagram.svg",
		"svg-icons203"
	],
	"./brands/instalod.svg": [
		"./src/collapse/svg/brands/instalod.svg",
		"svg-icons204"
	],
	"./brands/intercom.svg": [
		"./src/collapse/svg/brands/intercom.svg",
		"svg-icons205"
	],
	"./brands/internet-explorer.svg": [
		"./src/collapse/svg/brands/internet-explorer.svg",
		"svg-icons206"
	],
	"./brands/invision.svg": [
		"./src/collapse/svg/brands/invision.svg",
		"svg-icons207"
	],
	"./brands/ioxhost.svg": [
		"./src/collapse/svg/brands/ioxhost.svg",
		"svg-icons208"
	],
	"./brands/itch-io.svg": [
		"./src/collapse/svg/brands/itch-io.svg",
		"svg-icons209"
	],
	"./brands/itunes-note.svg": [
		"./src/collapse/svg/brands/itunes-note.svg",
		"svg-icons210"
	],
	"./brands/itunes.svg": [
		"./src/collapse/svg/brands/itunes.svg",
		"svg-icons211"
	],
	"./brands/java.svg": [
		"./src/collapse/svg/brands/java.svg",
		"svg-icons212"
	],
	"./brands/jedi-order.svg": [
		"./src/collapse/svg/brands/jedi-order.svg",
		"svg-icons213"
	],
	"./brands/jenkins.svg": [
		"./src/collapse/svg/brands/jenkins.svg",
		"svg-icons214"
	],
	"./brands/jira.svg": [
		"./src/collapse/svg/brands/jira.svg",
		"svg-icons215"
	],
	"./brands/joget.svg": [
		"./src/collapse/svg/brands/joget.svg",
		"svg-icons216"
	],
	"./brands/joomla.svg": [
		"./src/collapse/svg/brands/joomla.svg",
		"svg-icons217"
	],
	"./brands/js.svg": [
		"./src/collapse/svg/brands/js.svg",
		"svg-icons218"
	],
	"./brands/jsfiddle.svg": [
		"./src/collapse/svg/brands/jsfiddle.svg",
		"svg-icons219"
	],
	"./brands/kaggle.svg": [
		"./src/collapse/svg/brands/kaggle.svg",
		"svg-icons220"
	],
	"./brands/keybase.svg": [
		"./src/collapse/svg/brands/keybase.svg",
		"svg-icons221"
	],
	"./brands/keycdn.svg": [
		"./src/collapse/svg/brands/keycdn.svg",
		"svg-icons222"
	],
	"./brands/kickstarter-k.svg": [
		"./src/collapse/svg/brands/kickstarter-k.svg",
		"svg-icons223"
	],
	"./brands/kickstarter.svg": [
		"./src/collapse/svg/brands/kickstarter.svg",
		"svg-icons224"
	],
	"./brands/korvue.svg": [
		"./src/collapse/svg/brands/korvue.svg",
		"svg-icons225"
	],
	"./brands/laravel.svg": [
		"./src/collapse/svg/brands/laravel.svg",
		"svg-icons226"
	],
	"./brands/lastfm.svg": [
		"./src/collapse/svg/brands/lastfm.svg",
		"svg-icons227"
	],
	"./brands/leanpub.svg": [
		"./src/collapse/svg/brands/leanpub.svg",
		"svg-icons228"
	],
	"./brands/less.svg": [
		"./src/collapse/svg/brands/less.svg",
		"svg-icons229"
	],
	"./brands/line.svg": [
		"./src/collapse/svg/brands/line.svg",
		"svg-icons230"
	],
	"./brands/linkedin-in.svg": [
		"./src/collapse/svg/brands/linkedin-in.svg",
		"svg-icons231"
	],
	"./brands/linkedin.svg": [
		"./src/collapse/svg/brands/linkedin.svg",
		"svg-icons232"
	],
	"./brands/linode.svg": [
		"./src/collapse/svg/brands/linode.svg",
		"svg-icons233"
	],
	"./brands/linux.svg": [
		"./src/collapse/svg/brands/linux.svg",
		"svg-icons234"
	],
	"./brands/lyft.svg": [
		"./src/collapse/svg/brands/lyft.svg",
		"svg-icons235"
	],
	"./brands/magento.svg": [
		"./src/collapse/svg/brands/magento.svg",
		"svg-icons236"
	],
	"./brands/mailchimp.svg": [
		"./src/collapse/svg/brands/mailchimp.svg",
		"svg-icons237"
	],
	"./brands/mandalorian.svg": [
		"./src/collapse/svg/brands/mandalorian.svg",
		"svg-icons238"
	],
	"./brands/markdown.svg": [
		"./src/collapse/svg/brands/markdown.svg",
		"svg-icons239"
	],
	"./brands/mastodon.svg": [
		"./src/collapse/svg/brands/mastodon.svg",
		"svg-icons240"
	],
	"./brands/maxcdn.svg": [
		"./src/collapse/svg/brands/maxcdn.svg",
		"svg-icons241"
	],
	"./brands/mdb.svg": [
		"./src/collapse/svg/brands/mdb.svg",
		"svg-icons242"
	],
	"./brands/medapps.svg": [
		"./src/collapse/svg/brands/medapps.svg",
		"svg-icons243"
	],
	"./brands/medium.svg": [
		"./src/collapse/svg/brands/medium.svg",
		"svg-icons244"
	],
	"./brands/medrt.svg": [
		"./src/collapse/svg/brands/medrt.svg",
		"svg-icons245"
	],
	"./brands/meetup.svg": [
		"./src/collapse/svg/brands/meetup.svg",
		"svg-icons246"
	],
	"./brands/megaport.svg": [
		"./src/collapse/svg/brands/megaport.svg",
		"svg-icons247"
	],
	"./brands/mendeley.svg": [
		"./src/collapse/svg/brands/mendeley.svg",
		"svg-icons248"
	],
	"./brands/meta.svg": [
		"./src/collapse/svg/brands/meta.svg",
		"svg-icons249"
	],
	"./brands/microblog.svg": [
		"./src/collapse/svg/brands/microblog.svg",
		"svg-icons250"
	],
	"./brands/microsoft.svg": [
		"./src/collapse/svg/brands/microsoft.svg",
		"svg-icons251"
	],
	"./brands/mix.svg": [
		"./src/collapse/svg/brands/mix.svg",
		"svg-icons252"
	],
	"./brands/mixcloud.svg": [
		"./src/collapse/svg/brands/mixcloud.svg",
		"svg-icons253"
	],
	"./brands/mixer.svg": [
		"./src/collapse/svg/brands/mixer.svg",
		"svg-icons254"
	],
	"./brands/mizuni.svg": [
		"./src/collapse/svg/brands/mizuni.svg",
		"svg-icons255"
	],
	"./brands/modx.svg": [
		"./src/collapse/svg/brands/modx.svg",
		"svg-icons256"
	],
	"./brands/monero.svg": [
		"./src/collapse/svg/brands/monero.svg",
		"svg-icons257"
	],
	"./brands/napster.svg": [
		"./src/collapse/svg/brands/napster.svg",
		"svg-icons258"
	],
	"./brands/neos.svg": [
		"./src/collapse/svg/brands/neos.svg",
		"svg-icons259"
	],
	"./brands/nfc-directional.svg": [
		"./src/collapse/svg/brands/nfc-directional.svg",
		"svg-icons260"
	],
	"./brands/nfc-symbol.svg": [
		"./src/collapse/svg/brands/nfc-symbol.svg",
		"svg-icons261"
	],
	"./brands/nimblr.svg": [
		"./src/collapse/svg/brands/nimblr.svg",
		"svg-icons262"
	],
	"./brands/node-js.svg": [
		"./src/collapse/svg/brands/node-js.svg",
		"svg-icons263"
	],
	"./brands/node.svg": [
		"./src/collapse/svg/brands/node.svg",
		"svg-icons264"
	],
	"./brands/npm.svg": [
		"./src/collapse/svg/brands/npm.svg",
		"svg-icons265"
	],
	"./brands/ns8.svg": [
		"./src/collapse/svg/brands/ns8.svg",
		"svg-icons266"
	],
	"./brands/nutritionix.svg": [
		"./src/collapse/svg/brands/nutritionix.svg",
		"svg-icons267"
	],
	"./brands/octopus-deploy.svg": [
		"./src/collapse/svg/brands/octopus-deploy.svg",
		"svg-icons268"
	],
	"./brands/odnoklassniki.svg": [
		"./src/collapse/svg/brands/odnoklassniki.svg",
		"svg-icons269"
	],
	"./brands/old-republic.svg": [
		"./src/collapse/svg/brands/old-republic.svg",
		"svg-icons270"
	],
	"./brands/opencart.svg": [
		"./src/collapse/svg/brands/opencart.svg",
		"svg-icons271"
	],
	"./brands/openid.svg": [
		"./src/collapse/svg/brands/openid.svg",
		"svg-icons272"
	],
	"./brands/opera.svg": [
		"./src/collapse/svg/brands/opera.svg",
		"svg-icons273"
	],
	"./brands/optin-monster.svg": [
		"./src/collapse/svg/brands/optin-monster.svg",
		"svg-icons274"
	],
	"./brands/orcid.svg": [
		"./src/collapse/svg/brands/orcid.svg",
		"svg-icons275"
	],
	"./brands/osi.svg": [
		"./src/collapse/svg/brands/osi.svg",
		"svg-icons276"
	],
	"./brands/padlet.svg": [
		"./src/collapse/svg/brands/padlet.svg",
		"svg-icons277"
	],
	"./brands/page4.svg": [
		"./src/collapse/svg/brands/page4.svg",
		"svg-icons278"
	],
	"./brands/pagelines.svg": [
		"./src/collapse/svg/brands/pagelines.svg",
		"svg-icons279"
	],
	"./brands/palfed.svg": [
		"./src/collapse/svg/brands/palfed.svg",
		"svg-icons280"
	],
	"./brands/patreon.svg": [
		"./src/collapse/svg/brands/patreon.svg",
		"svg-icons281"
	],
	"./brands/paypal.svg": [
		"./src/collapse/svg/brands/paypal.svg",
		"svg-icons282"
	],
	"./brands/perbyte.svg": [
		"./src/collapse/svg/brands/perbyte.svg",
		"svg-icons283"
	],
	"./brands/periscope.svg": [
		"./src/collapse/svg/brands/periscope.svg",
		"svg-icons284"
	],
	"./brands/phabricator.svg": [
		"./src/collapse/svg/brands/phabricator.svg",
		"svg-icons285"
	],
	"./brands/phoenix-framework.svg": [
		"./src/collapse/svg/brands/phoenix-framework.svg",
		"svg-icons286"
	],
	"./brands/phoenix-squadron.svg": [
		"./src/collapse/svg/brands/phoenix-squadron.svg",
		"svg-icons287"
	],
	"./brands/php.svg": [
		"./src/collapse/svg/brands/php.svg",
		"svg-icons288"
	],
	"./brands/pied-piper-alt.svg": [
		"./src/collapse/svg/brands/pied-piper-alt.svg",
		"svg-icons289"
	],
	"./brands/pied-piper-hat.svg": [
		"./src/collapse/svg/brands/pied-piper-hat.svg",
		"svg-icons290"
	],
	"./brands/pied-piper-pp.svg": [
		"./src/collapse/svg/brands/pied-piper-pp.svg",
		"svg-icons291"
	],
	"./brands/pied-piper.svg": [
		"./src/collapse/svg/brands/pied-piper.svg",
		"svg-icons292"
	],
	"./brands/pinterest-p.svg": [
		"./src/collapse/svg/brands/pinterest-p.svg",
		"svg-icons293"
	],
	"./brands/pinterest.svg": [
		"./src/collapse/svg/brands/pinterest.svg",
		"svg-icons294"
	],
	"./brands/pix.svg": [
		"./src/collapse/svg/brands/pix.svg",
		"svg-icons295"
	],
	"./brands/playstation.svg": [
		"./src/collapse/svg/brands/playstation.svg",
		"svg-icons296"
	],
	"./brands/product-hunt.svg": [
		"./src/collapse/svg/brands/product-hunt.svg",
		"svg-icons297"
	],
	"./brands/pushed.svg": [
		"./src/collapse/svg/brands/pushed.svg",
		"svg-icons298"
	],
	"./brands/python.svg": [
		"./src/collapse/svg/brands/python.svg",
		"svg-icons299"
	],
	"./brands/qq.svg": [
		"./src/collapse/svg/brands/qq.svg",
		"svg-icons300"
	],
	"./brands/quinscape.svg": [
		"./src/collapse/svg/brands/quinscape.svg",
		"svg-icons301"
	],
	"./brands/quora.svg": [
		"./src/collapse/svg/brands/quora.svg",
		"svg-icons302"
	],
	"./brands/r-project.svg": [
		"./src/collapse/svg/brands/r-project.svg",
		"svg-icons303"
	],
	"./brands/raspberry-pi.svg": [
		"./src/collapse/svg/brands/raspberry-pi.svg",
		"svg-icons304"
	],
	"./brands/ravelry.svg": [
		"./src/collapse/svg/brands/ravelry.svg",
		"svg-icons305"
	],
	"./brands/react.svg": [
		"./src/collapse/svg/brands/react.svg",
		"svg-icons306"
	],
	"./brands/reacteurope.svg": [
		"./src/collapse/svg/brands/reacteurope.svg",
		"svg-icons307"
	],
	"./brands/readme.svg": [
		"./src/collapse/svg/brands/readme.svg",
		"svg-icons308"
	],
	"./brands/rebel.svg": [
		"./src/collapse/svg/brands/rebel.svg",
		"svg-icons309"
	],
	"./brands/red-river.svg": [
		"./src/collapse/svg/brands/red-river.svg",
		"svg-icons310"
	],
	"./brands/reddit-alien.svg": [
		"./src/collapse/svg/brands/reddit-alien.svg",
		"svg-icons311"
	],
	"./brands/reddit.svg": [
		"./src/collapse/svg/brands/reddit.svg",
		"svg-icons312"
	],
	"./brands/redhat.svg": [
		"./src/collapse/svg/brands/redhat.svg",
		"svg-icons313"
	],
	"./brands/renren.svg": [
		"./src/collapse/svg/brands/renren.svg",
		"svg-icons314"
	],
	"./brands/replyd.svg": [
		"./src/collapse/svg/brands/replyd.svg",
		"svg-icons315"
	],
	"./brands/researchgate.svg": [
		"./src/collapse/svg/brands/researchgate.svg",
		"svg-icons316"
	],
	"./brands/resolving.svg": [
		"./src/collapse/svg/brands/resolving.svg",
		"svg-icons317"
	],
	"./brands/rev.svg": [
		"./src/collapse/svg/brands/rev.svg",
		"svg-icons318"
	],
	"./brands/rocketchat.svg": [
		"./src/collapse/svg/brands/rocketchat.svg",
		"svg-icons319"
	],
	"./brands/rockrms.svg": [
		"./src/collapse/svg/brands/rockrms.svg",
		"svg-icons320"
	],
	"./brands/rust.svg": [
		"./src/collapse/svg/brands/rust.svg",
		"svg-icons321"
	],
	"./brands/safari.svg": [
		"./src/collapse/svg/brands/safari.svg",
		"svg-icons322"
	],
	"./brands/salesforce.svg": [
		"./src/collapse/svg/brands/salesforce.svg",
		"svg-icons323"
	],
	"./brands/sass.svg": [
		"./src/collapse/svg/brands/sass.svg",
		"svg-icons324"
	],
	"./brands/schlix.svg": [
		"./src/collapse/svg/brands/schlix.svg",
		"svg-icons325"
	],
	"./brands/screenpal.svg": [
		"./src/collapse/svg/brands/screenpal.svg",
		"svg-icons326"
	],
	"./brands/scribd.svg": [
		"./src/collapse/svg/brands/scribd.svg",
		"svg-icons327"
	],
	"./brands/searchengin.svg": [
		"./src/collapse/svg/brands/searchengin.svg",
		"svg-icons328"
	],
	"./brands/sellcast.svg": [
		"./src/collapse/svg/brands/sellcast.svg",
		"svg-icons329"
	],
	"./brands/sellsy.svg": [
		"./src/collapse/svg/brands/sellsy.svg",
		"svg-icons330"
	],
	"./brands/servicestack.svg": [
		"./src/collapse/svg/brands/servicestack.svg",
		"svg-icons331"
	],
	"./brands/shirtsinbulk.svg": [
		"./src/collapse/svg/brands/shirtsinbulk.svg",
		"svg-icons332"
	],
	"./brands/shopify.svg": [
		"./src/collapse/svg/brands/shopify.svg",
		"svg-icons333"
	],
	"./brands/shopware.svg": [
		"./src/collapse/svg/brands/shopware.svg",
		"svg-icons334"
	],
	"./brands/simplybuilt.svg": [
		"./src/collapse/svg/brands/simplybuilt.svg",
		"svg-icons335"
	],
	"./brands/sistrix.svg": [
		"./src/collapse/svg/brands/sistrix.svg",
		"svg-icons336"
	],
	"./brands/sith.svg": [
		"./src/collapse/svg/brands/sith.svg",
		"svg-icons337"
	],
	"./brands/sitrox.svg": [
		"./src/collapse/svg/brands/sitrox.svg",
		"svg-icons338"
	],
	"./brands/sketch.svg": [
		"./src/collapse/svg/brands/sketch.svg",
		"svg-icons339"
	],
	"./brands/skyatlas.svg": [
		"./src/collapse/svg/brands/skyatlas.svg",
		"svg-icons340"
	],
	"./brands/skype.svg": [
		"./src/collapse/svg/brands/skype.svg",
		"svg-icons341"
	],
	"./brands/slack.svg": [
		"./src/collapse/svg/brands/slack.svg",
		"svg-icons342"
	],
	"./brands/slideshare.svg": [
		"./src/collapse/svg/brands/slideshare.svg",
		"svg-icons343"
	],
	"./brands/snapchat.svg": [
		"./src/collapse/svg/brands/snapchat.svg",
		"svg-icons344"
	],
	"./brands/soundcloud.svg": [
		"./src/collapse/svg/brands/soundcloud.svg",
		"svg-icons345"
	],
	"./brands/sourcetree.svg": [
		"./src/collapse/svg/brands/sourcetree.svg",
		"svg-icons346"
	],
	"./brands/space-awesome.svg": [
		"./src/collapse/svg/brands/space-awesome.svg",
		"svg-icons347"
	],
	"./brands/speakap.svg": [
		"./src/collapse/svg/brands/speakap.svg",
		"svg-icons348"
	],
	"./brands/speaker-deck.svg": [
		"./src/collapse/svg/brands/speaker-deck.svg",
		"svg-icons349"
	],
	"./brands/spotify.svg": [
		"./src/collapse/svg/brands/spotify.svg",
		"svg-icons350"
	],
	"./brands/square-behance.svg": [
		"./src/collapse/svg/brands/square-behance.svg",
		"svg-icons351"
	],
	"./brands/square-dribbble.svg": [
		"./src/collapse/svg/brands/square-dribbble.svg",
		"svg-icons352"
	],
	"./brands/square-facebook.svg": [
		"./src/collapse/svg/brands/square-facebook.svg",
		"svg-icons353"
	],
	"./brands/square-font-awesome-stroke.svg": [
		"./src/collapse/svg/brands/square-font-awesome-stroke.svg",
		"svg-icons354"
	],
	"./brands/square-font-awesome.svg": [
		"./src/collapse/svg/brands/square-font-awesome.svg",
		"svg-icons355"
	],
	"./brands/square-git.svg": [
		"./src/collapse/svg/brands/square-git.svg",
		"svg-icons356"
	],
	"./brands/square-github.svg": [
		"./src/collapse/svg/brands/square-github.svg",
		"svg-icons357"
	],
	"./brands/square-gitlab.svg": [
		"./src/collapse/svg/brands/square-gitlab.svg",
		"svg-icons358"
	],
	"./brands/square-google-plus.svg": [
		"./src/collapse/svg/brands/square-google-plus.svg",
		"svg-icons359"
	],
	"./brands/square-hacker-news.svg": [
		"./src/collapse/svg/brands/square-hacker-news.svg",
		"svg-icons360"
	],
	"./brands/square-instagram.svg": [
		"./src/collapse/svg/brands/square-instagram.svg",
		"svg-icons361"
	],
	"./brands/square-js.svg": [
		"./src/collapse/svg/brands/square-js.svg",
		"svg-icons362"
	],
	"./brands/square-lastfm.svg": [
		"./src/collapse/svg/brands/square-lastfm.svg",
		"svg-icons363"
	],
	"./brands/square-odnoklassniki.svg": [
		"./src/collapse/svg/brands/square-odnoklassniki.svg",
		"svg-icons364"
	],
	"./brands/square-pied-piper.svg": [
		"./src/collapse/svg/brands/square-pied-piper.svg",
		"svg-icons365"
	],
	"./brands/square-pinterest.svg": [
		"./src/collapse/svg/brands/square-pinterest.svg",
		"svg-icons366"
	],
	"./brands/square-reddit.svg": [
		"./src/collapse/svg/brands/square-reddit.svg",
		"svg-icons367"
	],
	"./brands/square-snapchat.svg": [
		"./src/collapse/svg/brands/square-snapchat.svg",
		"svg-icons368"
	],
	"./brands/square-steam.svg": [
		"./src/collapse/svg/brands/square-steam.svg",
		"svg-icons369"
	],
	"./brands/square-tumblr.svg": [
		"./src/collapse/svg/brands/square-tumblr.svg",
		"svg-icons370"
	],
	"./brands/square-twitter.svg": [
		"./src/collapse/svg/brands/square-twitter.svg",
		"svg-icons371"
	],
	"./brands/square-viadeo.svg": [
		"./src/collapse/svg/brands/square-viadeo.svg",
		"svg-icons372"
	],
	"./brands/square-vimeo.svg": [
		"./src/collapse/svg/brands/square-vimeo.svg",
		"svg-icons373"
	],
	"./brands/square-whatsapp.svg": [
		"./src/collapse/svg/brands/square-whatsapp.svg",
		"svg-icons374"
	],
	"./brands/square-xing.svg": [
		"./src/collapse/svg/brands/square-xing.svg",
		"svg-icons375"
	],
	"./brands/square-youtube.svg": [
		"./src/collapse/svg/brands/square-youtube.svg",
		"svg-icons376"
	],
	"./brands/squarespace.svg": [
		"./src/collapse/svg/brands/squarespace.svg",
		"svg-icons377"
	],
	"./brands/stack-exchange.svg": [
		"./src/collapse/svg/brands/stack-exchange.svg",
		"svg-icons378"
	],
	"./brands/stack-overflow.svg": [
		"./src/collapse/svg/brands/stack-overflow.svg",
		"svg-icons379"
	],
	"./brands/stackpath.svg": [
		"./src/collapse/svg/brands/stackpath.svg",
		"svg-icons380"
	],
	"./brands/staylinked.svg": [
		"./src/collapse/svg/brands/staylinked.svg",
		"svg-icons381"
	],
	"./brands/steam-symbol.svg": [
		"./src/collapse/svg/brands/steam-symbol.svg",
		"svg-icons382"
	],
	"./brands/steam.svg": [
		"./src/collapse/svg/brands/steam.svg",
		"svg-icons383"
	],
	"./brands/sticker-mule.svg": [
		"./src/collapse/svg/brands/sticker-mule.svg",
		"svg-icons384"
	],
	"./brands/strava.svg": [
		"./src/collapse/svg/brands/strava.svg",
		"svg-icons385"
	],
	"./brands/stripe-s.svg": [
		"./src/collapse/svg/brands/stripe-s.svg",
		"svg-icons386"
	],
	"./brands/stripe.svg": [
		"./src/collapse/svg/brands/stripe.svg",
		"svg-icons387"
	],
	"./brands/studiovinari.svg": [
		"./src/collapse/svg/brands/studiovinari.svg",
		"svg-icons388"
	],
	"./brands/stumbleupon-circle.svg": [
		"./src/collapse/svg/brands/stumbleupon-circle.svg",
		"svg-icons389"
	],
	"./brands/stumbleupon.svg": [
		"./src/collapse/svg/brands/stumbleupon.svg",
		"svg-icons390"
	],
	"./brands/superpowers.svg": [
		"./src/collapse/svg/brands/superpowers.svg",
		"svg-icons391"
	],
	"./brands/supple.svg": [
		"./src/collapse/svg/brands/supple.svg",
		"svg-icons392"
	],
	"./brands/suse.svg": [
		"./src/collapse/svg/brands/suse.svg",
		"svg-icons393"
	],
	"./brands/swift.svg": [
		"./src/collapse/svg/brands/swift.svg",
		"svg-icons394"
	],
	"./brands/symfony.svg": [
		"./src/collapse/svg/brands/symfony.svg",
		"svg-icons395"
	],
	"./brands/teamspeak.svg": [
		"./src/collapse/svg/brands/teamspeak.svg",
		"svg-icons396"
	],
	"./brands/telegram.svg": [
		"./src/collapse/svg/brands/telegram.svg",
		"svg-icons397"
	],
	"./brands/tencent-weibo.svg": [
		"./src/collapse/svg/brands/tencent-weibo.svg",
		"svg-icons398"
	],
	"./brands/the-red-yeti.svg": [
		"./src/collapse/svg/brands/the-red-yeti.svg",
		"svg-icons399"
	],
	"./brands/themeco.svg": [
		"./src/collapse/svg/brands/themeco.svg",
		"svg-icons400"
	],
	"./brands/themeisle.svg": [
		"./src/collapse/svg/brands/themeisle.svg",
		"svg-icons401"
	],
	"./brands/think-peaks.svg": [
		"./src/collapse/svg/brands/think-peaks.svg",
		"svg-icons402"
	],
	"./brands/tiktok.svg": [
		"./src/collapse/svg/brands/tiktok.svg",
		"svg-icons403"
	],
	"./brands/trade-federation.svg": [
		"./src/collapse/svg/brands/trade-federation.svg",
		"svg-icons404"
	],
	"./brands/trello.svg": [
		"./src/collapse/svg/brands/trello.svg",
		"svg-icons405"
	],
	"./brands/tumblr.svg": [
		"./src/collapse/svg/brands/tumblr.svg",
		"svg-icons406"
	],
	"./brands/twitch.svg": [
		"./src/collapse/svg/brands/twitch.svg",
		"svg-icons407"
	],
	"./brands/twitter.svg": [
		"./src/collapse/svg/brands/twitter.svg",
		"svg-icons408"
	],
	"./brands/typo3.svg": [
		"./src/collapse/svg/brands/typo3.svg",
		"svg-icons409"
	],
	"./brands/uber.svg": [
		"./src/collapse/svg/brands/uber.svg",
		"svg-icons410"
	],
	"./brands/ubuntu.svg": [
		"./src/collapse/svg/brands/ubuntu.svg",
		"svg-icons411"
	],
	"./brands/uikit.svg": [
		"./src/collapse/svg/brands/uikit.svg",
		"svg-icons412"
	],
	"./brands/umbraco.svg": [
		"./src/collapse/svg/brands/umbraco.svg",
		"svg-icons413"
	],
	"./brands/uncharted.svg": [
		"./src/collapse/svg/brands/uncharted.svg",
		"svg-icons414"
	],
	"./brands/uniregistry.svg": [
		"./src/collapse/svg/brands/uniregistry.svg",
		"svg-icons415"
	],
	"./brands/unity.svg": [
		"./src/collapse/svg/brands/unity.svg",
		"svg-icons416"
	],
	"./brands/unsplash.svg": [
		"./src/collapse/svg/brands/unsplash.svg",
		"svg-icons417"
	],
	"./brands/untappd.svg": [
		"./src/collapse/svg/brands/untappd.svg",
		"svg-icons418"
	],
	"./brands/ups.svg": [
		"./src/collapse/svg/brands/ups.svg",
		"svg-icons419"
	],
	"./brands/usb.svg": [
		"./src/collapse/svg/brands/usb.svg",
		"svg-icons420"
	],
	"./brands/usps.svg": [
		"./src/collapse/svg/brands/usps.svg",
		"svg-icons421"
	],
	"./brands/ussunnah.svg": [
		"./src/collapse/svg/brands/ussunnah.svg",
		"svg-icons422"
	],
	"./brands/vaadin.svg": [
		"./src/collapse/svg/brands/vaadin.svg",
		"svg-icons423"
	],
	"./brands/viacoin.svg": [
		"./src/collapse/svg/brands/viacoin.svg",
		"svg-icons424"
	],
	"./brands/viadeo.svg": [
		"./src/collapse/svg/brands/viadeo.svg",
		"svg-icons425"
	],
	"./brands/viber.svg": [
		"./src/collapse/svg/brands/viber.svg",
		"svg-icons426"
	],
	"./brands/vimeo-v.svg": [
		"./src/collapse/svg/brands/vimeo-v.svg",
		"svg-icons427"
	],
	"./brands/vimeo.svg": [
		"./src/collapse/svg/brands/vimeo.svg",
		"svg-icons428"
	],
	"./brands/vine.svg": [
		"./src/collapse/svg/brands/vine.svg",
		"svg-icons429"
	],
	"./brands/vk.svg": [
		"./src/collapse/svg/brands/vk.svg",
		"svg-icons430"
	],
	"./brands/vnv.svg": [
		"./src/collapse/svg/brands/vnv.svg",
		"svg-icons431"
	],
	"./brands/vuejs.svg": [
		"./src/collapse/svg/brands/vuejs.svg",
		"svg-icons432"
	],
	"./brands/watchman-monitoring.svg": [
		"./src/collapse/svg/brands/watchman-monitoring.svg",
		"svg-icons433"
	],
	"./brands/waze.svg": [
		"./src/collapse/svg/brands/waze.svg",
		"svg-icons434"
	],
	"./brands/weebly.svg": [
		"./src/collapse/svg/brands/weebly.svg",
		"svg-icons435"
	],
	"./brands/weibo.svg": [
		"./src/collapse/svg/brands/weibo.svg",
		"svg-icons436"
	],
	"./brands/weixin.svg": [
		"./src/collapse/svg/brands/weixin.svg",
		"svg-icons437"
	],
	"./brands/whatsapp.svg": [
		"./src/collapse/svg/brands/whatsapp.svg",
		"svg-icons438"
	],
	"./brands/whmcs.svg": [
		"./src/collapse/svg/brands/whmcs.svg",
		"svg-icons439"
	],
	"./brands/wikipedia-w.svg": [
		"./src/collapse/svg/brands/wikipedia-w.svg",
		"svg-icons440"
	],
	"./brands/windows.svg": [
		"./src/collapse/svg/brands/windows.svg",
		"svg-icons441"
	],
	"./brands/wirsindhandwerk.svg": [
		"./src/collapse/svg/brands/wirsindhandwerk.svg",
		"svg-icons442"
	],
	"./brands/wix.svg": [
		"./src/collapse/svg/brands/wix.svg",
		"svg-icons443"
	],
	"./brands/wizards-of-the-coast.svg": [
		"./src/collapse/svg/brands/wizards-of-the-coast.svg",
		"svg-icons444"
	],
	"./brands/wodu.svg": [
		"./src/collapse/svg/brands/wodu.svg",
		"svg-icons445"
	],
	"./brands/wolf-pack-battalion.svg": [
		"./src/collapse/svg/brands/wolf-pack-battalion.svg",
		"svg-icons446"
	],
	"./brands/wordpress-simple.svg": [
		"./src/collapse/svg/brands/wordpress-simple.svg",
		"svg-icons447"
	],
	"./brands/wordpress.svg": [
		"./src/collapse/svg/brands/wordpress.svg",
		"svg-icons448"
	],
	"./brands/wpbeginner.svg": [
		"./src/collapse/svg/brands/wpbeginner.svg",
		"svg-icons449"
	],
	"./brands/wpexplorer.svg": [
		"./src/collapse/svg/brands/wpexplorer.svg",
		"svg-icons450"
	],
	"./brands/wpforms.svg": [
		"./src/collapse/svg/brands/wpforms.svg",
		"svg-icons451"
	],
	"./brands/wpressr.svg": [
		"./src/collapse/svg/brands/wpressr.svg",
		"svg-icons452"
	],
	"./brands/xbox.svg": [
		"./src/collapse/svg/brands/xbox.svg",
		"svg-icons453"
	],
	"./brands/xing.svg": [
		"./src/collapse/svg/brands/xing.svg",
		"svg-icons454"
	],
	"./brands/y-combinator.svg": [
		"./src/collapse/svg/brands/y-combinator.svg",
		"svg-icons455"
	],
	"./brands/yahoo.svg": [
		"./src/collapse/svg/brands/yahoo.svg",
		"svg-icons456"
	],
	"./brands/yammer.svg": [
		"./src/collapse/svg/brands/yammer.svg",
		"svg-icons457"
	],
	"./brands/yandex-international.svg": [
		"./src/collapse/svg/brands/yandex-international.svg",
		"svg-icons458"
	],
	"./brands/yandex.svg": [
		"./src/collapse/svg/brands/yandex.svg",
		"svg-icons459"
	],
	"./brands/yarn.svg": [
		"./src/collapse/svg/brands/yarn.svg",
		"svg-icons460"
	],
	"./brands/yelp.svg": [
		"./src/collapse/svg/brands/yelp.svg",
		"svg-icons461"
	],
	"./brands/yoast.svg": [
		"./src/collapse/svg/brands/yoast.svg",
		"svg-icons462"
	],
	"./brands/youtube.svg": [
		"./src/collapse/svg/brands/youtube.svg",
		"svg-icons463"
	],
	"./brands/zhihu.svg": [
		"./src/collapse/svg/brands/zhihu.svg",
		"svg-icons464"
	],
	"./cta/background-1.svg": [
		"./src/collapse/svg/cta/background-1.svg",
		"svg-icons465"
	],
	"./cta/background-rrze.svg": [
		"./src/collapse/svg/cta/background-rrze.svg",
		"svg-icons466"
	],
	"./regular/address-book.svg": [
		"./src/collapse/svg/regular/address-book.svg",
		"svg-icons467"
	],
	"./regular/address-card.svg": [
		"./src/collapse/svg/regular/address-card.svg",
		"svg-icons468"
	],
	"./regular/bell-slash.svg": [
		"./src/collapse/svg/regular/bell-slash.svg",
		"svg-icons469"
	],
	"./regular/bell.svg": [
		"./src/collapse/svg/regular/bell.svg",
		"svg-icons470"
	],
	"./regular/bookmark.svg": [
		"./src/collapse/svg/regular/bookmark.svg",
		"svg-icons471"
	],
	"./regular/building.svg": [
		"./src/collapse/svg/regular/building.svg",
		"svg-icons472"
	],
	"./regular/calendar-check.svg": [
		"./src/collapse/svg/regular/calendar-check.svg",
		"svg-icons473"
	],
	"./regular/calendar-days.svg": [
		"./src/collapse/svg/regular/calendar-days.svg",
		"svg-icons474"
	],
	"./regular/calendar-minus.svg": [
		"./src/collapse/svg/regular/calendar-minus.svg",
		"svg-icons475"
	],
	"./regular/calendar-plus.svg": [
		"./src/collapse/svg/regular/calendar-plus.svg",
		"svg-icons476"
	],
	"./regular/calendar-xmark.svg": [
		"./src/collapse/svg/regular/calendar-xmark.svg",
		"svg-icons477"
	],
	"./regular/calendar.svg": [
		"./src/collapse/svg/regular/calendar.svg",
		"svg-icons478"
	],
	"./regular/chart-bar.svg": [
		"./src/collapse/svg/regular/chart-bar.svg",
		"svg-icons479"
	],
	"./regular/chess-bishop.svg": [
		"./src/collapse/svg/regular/chess-bishop.svg",
		"svg-icons480"
	],
	"./regular/chess-king.svg": [
		"./src/collapse/svg/regular/chess-king.svg",
		"svg-icons481"
	],
	"./regular/chess-knight.svg": [
		"./src/collapse/svg/regular/chess-knight.svg",
		"svg-icons482"
	],
	"./regular/chess-pawn.svg": [
		"./src/collapse/svg/regular/chess-pawn.svg",
		"svg-icons483"
	],
	"./regular/chess-queen.svg": [
		"./src/collapse/svg/regular/chess-queen.svg",
		"svg-icons484"
	],
	"./regular/chess-rook.svg": [
		"./src/collapse/svg/regular/chess-rook.svg",
		"svg-icons485"
	],
	"./regular/circle-check.svg": [
		"./src/collapse/svg/regular/circle-check.svg",
		"svg-icons486"
	],
	"./regular/circle-dot.svg": [
		"./src/collapse/svg/regular/circle-dot.svg",
		"svg-icons487"
	],
	"./regular/circle-down.svg": [
		"./src/collapse/svg/regular/circle-down.svg",
		"svg-icons488"
	],
	"./regular/circle-left.svg": [
		"./src/collapse/svg/regular/circle-left.svg",
		"svg-icons489"
	],
	"./regular/circle-pause.svg": [
		"./src/collapse/svg/regular/circle-pause.svg",
		"svg-icons490"
	],
	"./regular/circle-play.svg": [
		"./src/collapse/svg/regular/circle-play.svg",
		"svg-icons491"
	],
	"./regular/circle-question.svg": [
		"./src/collapse/svg/regular/circle-question.svg",
		"svg-icons492"
	],
	"./regular/circle-right.svg": [
		"./src/collapse/svg/regular/circle-right.svg",
		"svg-icons493"
	],
	"./regular/circle-stop.svg": [
		"./src/collapse/svg/regular/circle-stop.svg",
		"svg-icons494"
	],
	"./regular/circle-up.svg": [
		"./src/collapse/svg/regular/circle-up.svg",
		"svg-icons495"
	],
	"./regular/circle-user.svg": [
		"./src/collapse/svg/regular/circle-user.svg",
		"svg-icons496"
	],
	"./regular/circle-xmark.svg": [
		"./src/collapse/svg/regular/circle-xmark.svg",
		"svg-icons497"
	],
	"./regular/circle.svg": [
		"./src/collapse/svg/regular/circle.svg",
		"svg-icons498"
	],
	"./regular/clipboard.svg": [
		"./src/collapse/svg/regular/clipboard.svg",
		"svg-icons499"
	],
	"./regular/clock.svg": [
		"./src/collapse/svg/regular/clock.svg",
		"svg-icons500"
	],
	"./regular/clone.svg": [
		"./src/collapse/svg/regular/clone.svg",
		"svg-icons501"
	],
	"./regular/closed-captioning.svg": [
		"./src/collapse/svg/regular/closed-captioning.svg",
		"svg-icons502"
	],
	"./regular/comment-dots.svg": [
		"./src/collapse/svg/regular/comment-dots.svg",
		"svg-icons503"
	],
	"./regular/comment.svg": [
		"./src/collapse/svg/regular/comment.svg",
		"svg-icons504"
	],
	"./regular/comments.svg": [
		"./src/collapse/svg/regular/comments.svg",
		"svg-icons505"
	],
	"./regular/compass.svg": [
		"./src/collapse/svg/regular/compass.svg",
		"svg-icons506"
	],
	"./regular/copy.svg": [
		"./src/collapse/svg/regular/copy.svg",
		"svg-icons507"
	],
	"./regular/copyright.svg": [
		"./src/collapse/svg/regular/copyright.svg",
		"svg-icons508"
	],
	"./regular/credit-card.svg": [
		"./src/collapse/svg/regular/credit-card.svg",
		"svg-icons509"
	],
	"./regular/envelope-open.svg": [
		"./src/collapse/svg/regular/envelope-open.svg",
		"svg-icons510"
	],
	"./regular/envelope.svg": [
		"./src/collapse/svg/regular/envelope.svg",
		"svg-icons511"
	],
	"./regular/eye-slash.svg": [
		"./src/collapse/svg/regular/eye-slash.svg",
		"svg-icons512"
	],
	"./regular/eye.svg": [
		"./src/collapse/svg/regular/eye.svg",
		"svg-icons513"
	],
	"./regular/face-angry.svg": [
		"./src/collapse/svg/regular/face-angry.svg",
		"svg-icons514"
	],
	"./regular/face-dizzy.svg": [
		"./src/collapse/svg/regular/face-dizzy.svg",
		"svg-icons515"
	],
	"./regular/face-flushed.svg": [
		"./src/collapse/svg/regular/face-flushed.svg",
		"svg-icons516"
	],
	"./regular/face-frown-open.svg": [
		"./src/collapse/svg/regular/face-frown-open.svg",
		"svg-icons517"
	],
	"./regular/face-frown.svg": [
		"./src/collapse/svg/regular/face-frown.svg",
		"svg-icons518"
	],
	"./regular/face-grimace.svg": [
		"./src/collapse/svg/regular/face-grimace.svg",
		"svg-icons519"
	],
	"./regular/face-grin-beam-sweat.svg": [
		"./src/collapse/svg/regular/face-grin-beam-sweat.svg",
		"svg-icons520"
	],
	"./regular/face-grin-beam.svg": [
		"./src/collapse/svg/regular/face-grin-beam.svg",
		"svg-icons521"
	],
	"./regular/face-grin-hearts.svg": [
		"./src/collapse/svg/regular/face-grin-hearts.svg",
		"svg-icons522"
	],
	"./regular/face-grin-squint-tears.svg": [
		"./src/collapse/svg/regular/face-grin-squint-tears.svg",
		"svg-icons523"
	],
	"./regular/face-grin-squint.svg": [
		"./src/collapse/svg/regular/face-grin-squint.svg",
		"svg-icons524"
	],
	"./regular/face-grin-stars.svg": [
		"./src/collapse/svg/regular/face-grin-stars.svg",
		"svg-icons525"
	],
	"./regular/face-grin-tears.svg": [
		"./src/collapse/svg/regular/face-grin-tears.svg",
		"svg-icons526"
	],
	"./regular/face-grin-tongue-squint.svg": [
		"./src/collapse/svg/regular/face-grin-tongue-squint.svg",
		"svg-icons527"
	],
	"./regular/face-grin-tongue-wink.svg": [
		"./src/collapse/svg/regular/face-grin-tongue-wink.svg",
		"svg-icons528"
	],
	"./regular/face-grin-tongue.svg": [
		"./src/collapse/svg/regular/face-grin-tongue.svg",
		"svg-icons529"
	],
	"./regular/face-grin-wide.svg": [
		"./src/collapse/svg/regular/face-grin-wide.svg",
		"svg-icons530"
	],
	"./regular/face-grin-wink.svg": [
		"./src/collapse/svg/regular/face-grin-wink.svg",
		"svg-icons531"
	],
	"./regular/face-grin.svg": [
		"./src/collapse/svg/regular/face-grin.svg",
		"svg-icons532"
	],
	"./regular/face-kiss-beam.svg": [
		"./src/collapse/svg/regular/face-kiss-beam.svg",
		"svg-icons533"
	],
	"./regular/face-kiss-wink-heart.svg": [
		"./src/collapse/svg/regular/face-kiss-wink-heart.svg",
		"svg-icons534"
	],
	"./regular/face-kiss.svg": [
		"./src/collapse/svg/regular/face-kiss.svg",
		"svg-icons535"
	],
	"./regular/face-laugh-beam.svg": [
		"./src/collapse/svg/regular/face-laugh-beam.svg",
		"svg-icons536"
	],
	"./regular/face-laugh-squint.svg": [
		"./src/collapse/svg/regular/face-laugh-squint.svg",
		"svg-icons537"
	],
	"./regular/face-laugh-wink.svg": [
		"./src/collapse/svg/regular/face-laugh-wink.svg",
		"svg-icons538"
	],
	"./regular/face-laugh.svg": [
		"./src/collapse/svg/regular/face-laugh.svg",
		"svg-icons539"
	],
	"./regular/face-meh-blank.svg": [
		"./src/collapse/svg/regular/face-meh-blank.svg",
		"svg-icons540"
	],
	"./regular/face-meh.svg": [
		"./src/collapse/svg/regular/face-meh.svg",
		"svg-icons541"
	],
	"./regular/face-rolling-eyes.svg": [
		"./src/collapse/svg/regular/face-rolling-eyes.svg",
		"svg-icons542"
	],
	"./regular/face-sad-cry.svg": [
		"./src/collapse/svg/regular/face-sad-cry.svg",
		"svg-icons543"
	],
	"./regular/face-sad-tear.svg": [
		"./src/collapse/svg/regular/face-sad-tear.svg",
		"svg-icons544"
	],
	"./regular/face-smile-beam.svg": [
		"./src/collapse/svg/regular/face-smile-beam.svg",
		"svg-icons545"
	],
	"./regular/face-smile-wink.svg": [
		"./src/collapse/svg/regular/face-smile-wink.svg",
		"svg-icons546"
	],
	"./regular/face-smile.svg": [
		"./src/collapse/svg/regular/face-smile.svg",
		"svg-icons547"
	],
	"./regular/face-surprise.svg": [
		"./src/collapse/svg/regular/face-surprise.svg",
		"svg-icons548"
	],
	"./regular/face-tired.svg": [
		"./src/collapse/svg/regular/face-tired.svg",
		"svg-icons549"
	],
	"./regular/file-audio.svg": [
		"./src/collapse/svg/regular/file-audio.svg",
		"svg-icons550"
	],
	"./regular/file-code.svg": [
		"./src/collapse/svg/regular/file-code.svg",
		"svg-icons551"
	],
	"./regular/file-excel.svg": [
		"./src/collapse/svg/regular/file-excel.svg",
		"svg-icons552"
	],
	"./regular/file-image.svg": [
		"./src/collapse/svg/regular/file-image.svg",
		"svg-icons553"
	],
	"./regular/file-lines.svg": [
		"./src/collapse/svg/regular/file-lines.svg",
		"svg-icons554"
	],
	"./regular/file-pdf.svg": [
		"./src/collapse/svg/regular/file-pdf.svg",
		"svg-icons555"
	],
	"./regular/file-powerpoint.svg": [
		"./src/collapse/svg/regular/file-powerpoint.svg",
		"svg-icons556"
	],
	"./regular/file-video.svg": [
		"./src/collapse/svg/regular/file-video.svg",
		"svg-icons557"
	],
	"./regular/file-word.svg": [
		"./src/collapse/svg/regular/file-word.svg",
		"svg-icons558"
	],
	"./regular/file-zipper.svg": [
		"./src/collapse/svg/regular/file-zipper.svg",
		"svg-icons559"
	],
	"./regular/file.svg": [
		"./src/collapse/svg/regular/file.svg",
		"svg-icons560"
	],
	"./regular/flag.svg": [
		"./src/collapse/svg/regular/flag.svg",
		"svg-icons561"
	],
	"./regular/floppy-disk.svg": [
		"./src/collapse/svg/regular/floppy-disk.svg",
		"svg-icons562"
	],
	"./regular/folder-closed.svg": [
		"./src/collapse/svg/regular/folder-closed.svg",
		"svg-icons563"
	],
	"./regular/folder-open.svg": [
		"./src/collapse/svg/regular/folder-open.svg",
		"svg-icons564"
	],
	"./regular/folder.svg": [
		"./src/collapse/svg/regular/folder.svg",
		"svg-icons565"
	],
	"./regular/font-awesome.svg": [
		"./src/collapse/svg/regular/font-awesome.svg",
		"svg-icons566"
	],
	"./regular/futbol.svg": [
		"./src/collapse/svg/regular/futbol.svg",
		"svg-icons567"
	],
	"./regular/gem.svg": [
		"./src/collapse/svg/regular/gem.svg",
		"svg-icons568"
	],
	"./regular/hand-back-fist.svg": [
		"./src/collapse/svg/regular/hand-back-fist.svg",
		"svg-icons569"
	],
	"./regular/hand-lizard.svg": [
		"./src/collapse/svg/regular/hand-lizard.svg",
		"svg-icons570"
	],
	"./regular/hand-peace.svg": [
		"./src/collapse/svg/regular/hand-peace.svg",
		"svg-icons571"
	],
	"./regular/hand-point-down.svg": [
		"./src/collapse/svg/regular/hand-point-down.svg",
		"svg-icons572"
	],
	"./regular/hand-point-left.svg": [
		"./src/collapse/svg/regular/hand-point-left.svg",
		"svg-icons573"
	],
	"./regular/hand-point-right.svg": [
		"./src/collapse/svg/regular/hand-point-right.svg",
		"svg-icons574"
	],
	"./regular/hand-point-up.svg": [
		"./src/collapse/svg/regular/hand-point-up.svg",
		"svg-icons575"
	],
	"./regular/hand-pointer.svg": [
		"./src/collapse/svg/regular/hand-pointer.svg",
		"svg-icons576"
	],
	"./regular/hand-scissors.svg": [
		"./src/collapse/svg/regular/hand-scissors.svg",
		"svg-icons577"
	],
	"./regular/hand-spock.svg": [
		"./src/collapse/svg/regular/hand-spock.svg",
		"svg-icons578"
	],
	"./regular/hand.svg": [
		"./src/collapse/svg/regular/hand.svg",
		"svg-icons579"
	],
	"./regular/handshake.svg": [
		"./src/collapse/svg/regular/handshake.svg",
		"svg-icons580"
	],
	"./regular/hard-drive.svg": [
		"./src/collapse/svg/regular/hard-drive.svg",
		"svg-icons581"
	],
	"./regular/heart.svg": [
		"./src/collapse/svg/regular/heart.svg",
		"svg-icons582"
	],
	"./regular/hospital.svg": [
		"./src/collapse/svg/regular/hospital.svg",
		"svg-icons583"
	],
	"./regular/hourglass-half.svg": [
		"./src/collapse/svg/regular/hourglass-half.svg",
		"svg-icons584"
	],
	"./regular/hourglass.svg": [
		"./src/collapse/svg/regular/hourglass.svg",
		"svg-icons585"
	],
	"./regular/id-badge.svg": [
		"./src/collapse/svg/regular/id-badge.svg",
		"svg-icons586"
	],
	"./regular/id-card.svg": [
		"./src/collapse/svg/regular/id-card.svg",
		"svg-icons587"
	],
	"./regular/image.svg": [
		"./src/collapse/svg/regular/image.svg",
		"svg-icons588"
	],
	"./regular/images.svg": [
		"./src/collapse/svg/regular/images.svg",
		"svg-icons589"
	],
	"./regular/keyboard.svg": [
		"./src/collapse/svg/regular/keyboard.svg",
		"svg-icons590"
	],
	"./regular/lemon.svg": [
		"./src/collapse/svg/regular/lemon.svg",
		"svg-icons591"
	],
	"./regular/life-ring.svg": [
		"./src/collapse/svg/regular/life-ring.svg",
		"svg-icons592"
	],
	"./regular/lightbulb.svg": [
		"./src/collapse/svg/regular/lightbulb.svg",
		"svg-icons593"
	],
	"./regular/map.svg": [
		"./src/collapse/svg/regular/map.svg",
		"svg-icons594"
	],
	"./regular/message.svg": [
		"./src/collapse/svg/regular/message.svg",
		"svg-icons595"
	],
	"./regular/money-bill-1.svg": [
		"./src/collapse/svg/regular/money-bill-1.svg",
		"svg-icons596"
	],
	"./regular/moon.svg": [
		"./src/collapse/svg/regular/moon.svg",
		"svg-icons597"
	],
	"./regular/newspaper.svg": [
		"./src/collapse/svg/regular/newspaper.svg",
		"svg-icons598"
	],
	"./regular/notdef.svg": [
		"./src/collapse/svg/regular/notdef.svg",
		"svg-icons599"
	],
	"./regular/note-sticky.svg": [
		"./src/collapse/svg/regular/note-sticky.svg",
		"svg-icons600"
	],
	"./regular/object-group.svg": [
		"./src/collapse/svg/regular/object-group.svg",
		"svg-icons601"
	],
	"./regular/object-ungroup.svg": [
		"./src/collapse/svg/regular/object-ungroup.svg",
		"svg-icons602"
	],
	"./regular/paper-plane.svg": [
		"./src/collapse/svg/regular/paper-plane.svg",
		"svg-icons603"
	],
	"./regular/paste.svg": [
		"./src/collapse/svg/regular/paste.svg",
		"svg-icons604"
	],
	"./regular/pen-to-square.svg": [
		"./src/collapse/svg/regular/pen-to-square.svg",
		"svg-icons605"
	],
	"./regular/rectangle-list.svg": [
		"./src/collapse/svg/regular/rectangle-list.svg",
		"svg-icons606"
	],
	"./regular/rectangle-xmark.svg": [
		"./src/collapse/svg/regular/rectangle-xmark.svg",
		"svg-icons607"
	],
	"./regular/registered.svg": [
		"./src/collapse/svg/regular/registered.svg",
		"svg-icons608"
	],
	"./regular/share-from-square.svg": [
		"./src/collapse/svg/regular/share-from-square.svg",
		"svg-icons609"
	],
	"./regular/snowflake.svg": [
		"./src/collapse/svg/regular/snowflake.svg",
		"svg-icons610"
	],
	"./regular/square-caret-down.svg": [
		"./src/collapse/svg/regular/square-caret-down.svg",
		"svg-icons611"
	],
	"./regular/square-caret-left.svg": [
		"./src/collapse/svg/regular/square-caret-left.svg",
		"svg-icons612"
	],
	"./regular/square-caret-right.svg": [
		"./src/collapse/svg/regular/square-caret-right.svg",
		"svg-icons613"
	],
	"./regular/square-caret-up.svg": [
		"./src/collapse/svg/regular/square-caret-up.svg",
		"svg-icons614"
	],
	"./regular/square-check.svg": [
		"./src/collapse/svg/regular/square-check.svg",
		"svg-icons615"
	],
	"./regular/square-full.svg": [
		"./src/collapse/svg/regular/square-full.svg",
		"svg-icons616"
	],
	"./regular/square-minus.svg": [
		"./src/collapse/svg/regular/square-minus.svg",
		"svg-icons617"
	],
	"./regular/square-plus.svg": [
		"./src/collapse/svg/regular/square-plus.svg",
		"svg-icons618"
	],
	"./regular/square.svg": [
		"./src/collapse/svg/regular/square.svg",
		"svg-icons619"
	],
	"./regular/star-half-stroke.svg": [
		"./src/collapse/svg/regular/star-half-stroke.svg",
		"svg-icons620"
	],
	"./regular/star-half.svg": [
		"./src/collapse/svg/regular/star-half.svg",
		"svg-icons621"
	],
	"./regular/star.svg": [
		"./src/collapse/svg/regular/star.svg",
		"svg-icons622"
	],
	"./regular/sun.svg": [
		"./src/collapse/svg/regular/sun.svg",
		"svg-icons623"
	],
	"./regular/thumbs-down.svg": [
		"./src/collapse/svg/regular/thumbs-down.svg",
		"svg-icons624"
	],
	"./regular/thumbs-up.svg": [
		"./src/collapse/svg/regular/thumbs-up.svg",
		"svg-icons625"
	],
	"./regular/trash-can.svg": [
		"./src/collapse/svg/regular/trash-can.svg",
		"svg-icons626"
	],
	"./regular/user.svg": [
		"./src/collapse/svg/regular/user.svg",
		"svg-icons627"
	],
	"./regular/window-maximize.svg": [
		"./src/collapse/svg/regular/window-maximize.svg",
		"svg-icons628"
	],
	"./regular/window-minimize.svg": [
		"./src/collapse/svg/regular/window-minimize.svg",
		"svg-icons629"
	],
	"./regular/window-restore.svg": [
		"./src/collapse/svg/regular/window-restore.svg",
		"svg-icons630"
	],
	"./solid/0.svg": [
		"./src/collapse/svg/solid/0.svg",
		"svg-icons631"
	],
	"./solid/1.svg": [
		"./src/collapse/svg/solid/1.svg",
		"svg-icons632"
	],
	"./solid/2.svg": [
		"./src/collapse/svg/solid/2.svg",
		"svg-icons633"
	],
	"./solid/3.svg": [
		"./src/collapse/svg/solid/3.svg",
		"svg-icons634"
	],
	"./solid/4.svg": [
		"./src/collapse/svg/solid/4.svg",
		"svg-icons635"
	],
	"./solid/5.svg": [
		"./src/collapse/svg/solid/5.svg",
		"svg-icons636"
	],
	"./solid/6.svg": [
		"./src/collapse/svg/solid/6.svg",
		"svg-icons637"
	],
	"./solid/7.svg": [
		"./src/collapse/svg/solid/7.svg",
		"svg-icons638"
	],
	"./solid/8.svg": [
		"./src/collapse/svg/solid/8.svg",
		"svg-icons639"
	],
	"./solid/9.svg": [
		"./src/collapse/svg/solid/9.svg",
		"svg-icons640"
	],
	"./solid/a.svg": [
		"./src/collapse/svg/solid/a.svg",
		"svg-icons641"
	],
	"./solid/address-book.svg": [
		"./src/collapse/svg/solid/address-book.svg",
		"svg-icons642"
	],
	"./solid/address-card.svg": [
		"./src/collapse/svg/solid/address-card.svg",
		"svg-icons643"
	],
	"./solid/align-center.svg": [
		"./src/collapse/svg/solid/align-center.svg",
		"svg-icons644"
	],
	"./solid/align-justify.svg": [
		"./src/collapse/svg/solid/align-justify.svg",
		"svg-icons645"
	],
	"./solid/align-left.svg": [
		"./src/collapse/svg/solid/align-left.svg",
		"svg-icons646"
	],
	"./solid/align-right.svg": [
		"./src/collapse/svg/solid/align-right.svg",
		"svg-icons647"
	],
	"./solid/anchor-circle-check.svg": [
		"./src/collapse/svg/solid/anchor-circle-check.svg",
		"svg-icons648"
	],
	"./solid/anchor-circle-exclamation.svg": [
		"./src/collapse/svg/solid/anchor-circle-exclamation.svg",
		"svg-icons649"
	],
	"./solid/anchor-circle-xmark.svg": [
		"./src/collapse/svg/solid/anchor-circle-xmark.svg",
		"svg-icons650"
	],
	"./solid/anchor-lock.svg": [
		"./src/collapse/svg/solid/anchor-lock.svg",
		"svg-icons651"
	],
	"./solid/anchor.svg": [
		"./src/collapse/svg/solid/anchor.svg",
		"svg-icons652"
	],
	"./solid/angle-down.svg": [
		"./src/collapse/svg/solid/angle-down.svg",
		"svg-icons653"
	],
	"./solid/angle-left.svg": [
		"./src/collapse/svg/solid/angle-left.svg",
		"svg-icons654"
	],
	"./solid/angle-right.svg": [
		"./src/collapse/svg/solid/angle-right.svg",
		"svg-icons655"
	],
	"./solid/angle-up.svg": [
		"./src/collapse/svg/solid/angle-up.svg",
		"svg-icons656"
	],
	"./solid/angles-down.svg": [
		"./src/collapse/svg/solid/angles-down.svg",
		"svg-icons657"
	],
	"./solid/angles-left.svg": [
		"./src/collapse/svg/solid/angles-left.svg",
		"svg-icons658"
	],
	"./solid/angles-right.svg": [
		"./src/collapse/svg/solid/angles-right.svg",
		"svg-icons659"
	],
	"./solid/angles-up.svg": [
		"./src/collapse/svg/solid/angles-up.svg",
		"svg-icons660"
	],
	"./solid/ankh.svg": [
		"./src/collapse/svg/solid/ankh.svg",
		"svg-icons661"
	],
	"./solid/apple-whole.svg": [
		"./src/collapse/svg/solid/apple-whole.svg",
		"svg-icons662"
	],
	"./solid/archway.svg": [
		"./src/collapse/svg/solid/archway.svg",
		"svg-icons663"
	],
	"./solid/arrow-down-1-9.svg": [
		"./src/collapse/svg/solid/arrow-down-1-9.svg",
		"svg-icons664"
	],
	"./solid/arrow-down-9-1.svg": [
		"./src/collapse/svg/solid/arrow-down-9-1.svg",
		"svg-icons665"
	],
	"./solid/arrow-down-a-z.svg": [
		"./src/collapse/svg/solid/arrow-down-a-z.svg",
		"svg-icons666"
	],
	"./solid/arrow-down-long.svg": [
		"./src/collapse/svg/solid/arrow-down-long.svg",
		"svg-icons667"
	],
	"./solid/arrow-down-short-wide.svg": [
		"./src/collapse/svg/solid/arrow-down-short-wide.svg",
		"svg-icons668"
	],
	"./solid/arrow-down-up-across-line.svg": [
		"./src/collapse/svg/solid/arrow-down-up-across-line.svg",
		"svg-icons669"
	],
	"./solid/arrow-down-up-lock.svg": [
		"./src/collapse/svg/solid/arrow-down-up-lock.svg",
		"svg-icons670"
	],
	"./solid/arrow-down-wide-short.svg": [
		"./src/collapse/svg/solid/arrow-down-wide-short.svg",
		"svg-icons671"
	],
	"./solid/arrow-down-z-a.svg": [
		"./src/collapse/svg/solid/arrow-down-z-a.svg",
		"svg-icons672"
	],
	"./solid/arrow-down.svg": [
		"./src/collapse/svg/solid/arrow-down.svg",
		"svg-icons673"
	],
	"./solid/arrow-left-long.svg": [
		"./src/collapse/svg/solid/arrow-left-long.svg",
		"svg-icons674"
	],
	"./solid/arrow-left.svg": [
		"./src/collapse/svg/solid/arrow-left.svg",
		"svg-icons675"
	],
	"./solid/arrow-pointer.svg": [
		"./src/collapse/svg/solid/arrow-pointer.svg",
		"svg-icons676"
	],
	"./solid/arrow-right-arrow-left.svg": [
		"./src/collapse/svg/solid/arrow-right-arrow-left.svg",
		"svg-icons677"
	],
	"./solid/arrow-right-from-bracket.svg": [
		"./src/collapse/svg/solid/arrow-right-from-bracket.svg",
		"svg-icons678"
	],
	"./solid/arrow-right-long.svg": [
		"./src/collapse/svg/solid/arrow-right-long.svg",
		"svg-icons679"
	],
	"./solid/arrow-right-to-bracket.svg": [
		"./src/collapse/svg/solid/arrow-right-to-bracket.svg",
		"svg-icons680"
	],
	"./solid/arrow-right-to-city.svg": [
		"./src/collapse/svg/solid/arrow-right-to-city.svg",
		"svg-icons681"
	],
	"./solid/arrow-right.svg": [
		"./src/collapse/svg/solid/arrow-right.svg",
		"svg-icons682"
	],
	"./solid/arrow-rotate-left.svg": [
		"./src/collapse/svg/solid/arrow-rotate-left.svg",
		"svg-icons683"
	],
	"./solid/arrow-rotate-right.svg": [
		"./src/collapse/svg/solid/arrow-rotate-right.svg",
		"svg-icons684"
	],
	"./solid/arrow-trend-down.svg": [
		"./src/collapse/svg/solid/arrow-trend-down.svg",
		"svg-icons685"
	],
	"./solid/arrow-trend-up.svg": [
		"./src/collapse/svg/solid/arrow-trend-up.svg",
		"svg-icons686"
	],
	"./solid/arrow-turn-down.svg": [
		"./src/collapse/svg/solid/arrow-turn-down.svg",
		"svg-icons687"
	],
	"./solid/arrow-turn-up.svg": [
		"./src/collapse/svg/solid/arrow-turn-up.svg",
		"svg-icons688"
	],
	"./solid/arrow-up-1-9.svg": [
		"./src/collapse/svg/solid/arrow-up-1-9.svg",
		"svg-icons689"
	],
	"./solid/arrow-up-9-1.svg": [
		"./src/collapse/svg/solid/arrow-up-9-1.svg",
		"svg-icons690"
	],
	"./solid/arrow-up-a-z.svg": [
		"./src/collapse/svg/solid/arrow-up-a-z.svg",
		"svg-icons691"
	],
	"./solid/arrow-up-from-bracket.svg": [
		"./src/collapse/svg/solid/arrow-up-from-bracket.svg",
		"svg-icons692"
	],
	"./solid/arrow-up-from-ground-water.svg": [
		"./src/collapse/svg/solid/arrow-up-from-ground-water.svg",
		"svg-icons693"
	],
	"./solid/arrow-up-from-water-pump.svg": [
		"./src/collapse/svg/solid/arrow-up-from-water-pump.svg",
		"svg-icons694"
	],
	"./solid/arrow-up-long.svg": [
		"./src/collapse/svg/solid/arrow-up-long.svg",
		"svg-icons695"
	],
	"./solid/arrow-up-right-dots.svg": [
		"./src/collapse/svg/solid/arrow-up-right-dots.svg",
		"svg-icons696"
	],
	"./solid/arrow-up-right-from-square.svg": [
		"./src/collapse/svg/solid/arrow-up-right-from-square.svg",
		"svg-icons697"
	],
	"./solid/arrow-up-short-wide.svg": [
		"./src/collapse/svg/solid/arrow-up-short-wide.svg",
		"svg-icons698"
	],
	"./solid/arrow-up-wide-short.svg": [
		"./src/collapse/svg/solid/arrow-up-wide-short.svg",
		"svg-icons699"
	],
	"./solid/arrow-up-z-a.svg": [
		"./src/collapse/svg/solid/arrow-up-z-a.svg",
		"svg-icons700"
	],
	"./solid/arrow-up.svg": [
		"./src/collapse/svg/solid/arrow-up.svg",
		"svg-icons701"
	],
	"./solid/arrows-down-to-line.svg": [
		"./src/collapse/svg/solid/arrows-down-to-line.svg",
		"svg-icons702"
	],
	"./solid/arrows-down-to-people.svg": [
		"./src/collapse/svg/solid/arrows-down-to-people.svg",
		"svg-icons703"
	],
	"./solid/arrows-left-right-to-line.svg": [
		"./src/collapse/svg/solid/arrows-left-right-to-line.svg",
		"svg-icons704"
	],
	"./solid/arrows-left-right.svg": [
		"./src/collapse/svg/solid/arrows-left-right.svg",
		"svg-icons705"
	],
	"./solid/arrows-rotate.svg": [
		"./src/collapse/svg/solid/arrows-rotate.svg",
		"svg-icons706"
	],
	"./solid/arrows-spin.svg": [
		"./src/collapse/svg/solid/arrows-spin.svg",
		"svg-icons707"
	],
	"./solid/arrows-split-up-and-left.svg": [
		"./src/collapse/svg/solid/arrows-split-up-and-left.svg",
		"svg-icons708"
	],
	"./solid/arrows-to-circle.svg": [
		"./src/collapse/svg/solid/arrows-to-circle.svg",
		"svg-icons709"
	],
	"./solid/arrows-to-dot.svg": [
		"./src/collapse/svg/solid/arrows-to-dot.svg",
		"svg-icons710"
	],
	"./solid/arrows-to-eye.svg": [
		"./src/collapse/svg/solid/arrows-to-eye.svg",
		"svg-icons711"
	],
	"./solid/arrows-turn-right.svg": [
		"./src/collapse/svg/solid/arrows-turn-right.svg",
		"svg-icons712"
	],
	"./solid/arrows-turn-to-dots.svg": [
		"./src/collapse/svg/solid/arrows-turn-to-dots.svg",
		"svg-icons713"
	],
	"./solid/arrows-up-down-left-right.svg": [
		"./src/collapse/svg/solid/arrows-up-down-left-right.svg",
		"svg-icons714"
	],
	"./solid/arrows-up-down.svg": [
		"./src/collapse/svg/solid/arrows-up-down.svg",
		"svg-icons715"
	],
	"./solid/arrows-up-to-line.svg": [
		"./src/collapse/svg/solid/arrows-up-to-line.svg",
		"svg-icons716"
	],
	"./solid/asterisk.svg": [
		"./src/collapse/svg/solid/asterisk.svg",
		"svg-icons717"
	],
	"./solid/at.svg": [
		"./src/collapse/svg/solid/at.svg",
		"svg-icons718"
	],
	"./solid/atom.svg": [
		"./src/collapse/svg/solid/atom.svg",
		"svg-icons719"
	],
	"./solid/audio-description.svg": [
		"./src/collapse/svg/solid/audio-description.svg",
		"svg-icons720"
	],
	"./solid/austral-sign.svg": [
		"./src/collapse/svg/solid/austral-sign.svg",
		"svg-icons721"
	],
	"./solid/award.svg": [
		"./src/collapse/svg/solid/award.svg",
		"svg-icons722"
	],
	"./solid/b.svg": [
		"./src/collapse/svg/solid/b.svg",
		"svg-icons723"
	],
	"./solid/baby-carriage.svg": [
		"./src/collapse/svg/solid/baby-carriage.svg",
		"svg-icons724"
	],
	"./solid/baby.svg": [
		"./src/collapse/svg/solid/baby.svg",
		"svg-icons725"
	],
	"./solid/backward-fast.svg": [
		"./src/collapse/svg/solid/backward-fast.svg",
		"svg-icons726"
	],
	"./solid/backward-step.svg": [
		"./src/collapse/svg/solid/backward-step.svg",
		"svg-icons727"
	],
	"./solid/backward.svg": [
		"./src/collapse/svg/solid/backward.svg",
		"svg-icons728"
	],
	"./solid/bacon.svg": [
		"./src/collapse/svg/solid/bacon.svg",
		"svg-icons729"
	],
	"./solid/bacteria.svg": [
		"./src/collapse/svg/solid/bacteria.svg",
		"svg-icons730"
	],
	"./solid/bacterium.svg": [
		"./src/collapse/svg/solid/bacterium.svg",
		"svg-icons731"
	],
	"./solid/bag-shopping.svg": [
		"./src/collapse/svg/solid/bag-shopping.svg",
		"svg-icons732"
	],
	"./solid/bahai.svg": [
		"./src/collapse/svg/solid/bahai.svg",
		"svg-icons733"
	],
	"./solid/baht-sign.svg": [
		"./src/collapse/svg/solid/baht-sign.svg",
		"svg-icons734"
	],
	"./solid/ban-smoking.svg": [
		"./src/collapse/svg/solid/ban-smoking.svg",
		"svg-icons735"
	],
	"./solid/ban.svg": [
		"./src/collapse/svg/solid/ban.svg",
		"svg-icons736"
	],
	"./solid/bandage.svg": [
		"./src/collapse/svg/solid/bandage.svg",
		"svg-icons737"
	],
	"./solid/barcode.svg": [
		"./src/collapse/svg/solid/barcode.svg",
		"svg-icons738"
	],
	"./solid/bars-progress.svg": [
		"./src/collapse/svg/solid/bars-progress.svg",
		"svg-icons739"
	],
	"./solid/bars-staggered.svg": [
		"./src/collapse/svg/solid/bars-staggered.svg",
		"svg-icons740"
	],
	"./solid/bars.svg": [
		"./src/collapse/svg/solid/bars.svg",
		"svg-icons741"
	],
	"./solid/baseball-bat-ball.svg": [
		"./src/collapse/svg/solid/baseball-bat-ball.svg",
		"svg-icons742"
	],
	"./solid/baseball.svg": [
		"./src/collapse/svg/solid/baseball.svg",
		"svg-icons743"
	],
	"./solid/basket-shopping.svg": [
		"./src/collapse/svg/solid/basket-shopping.svg",
		"svg-icons744"
	],
	"./solid/basketball.svg": [
		"./src/collapse/svg/solid/basketball.svg",
		"svg-icons745"
	],
	"./solid/bath.svg": [
		"./src/collapse/svg/solid/bath.svg",
		"svg-icons746"
	],
	"./solid/battery-empty.svg": [
		"./src/collapse/svg/solid/battery-empty.svg",
		"svg-icons747"
	],
	"./solid/battery-full.svg": [
		"./src/collapse/svg/solid/battery-full.svg",
		"svg-icons748"
	],
	"./solid/battery-half.svg": [
		"./src/collapse/svg/solid/battery-half.svg",
		"svg-icons749"
	],
	"./solid/battery-quarter.svg": [
		"./src/collapse/svg/solid/battery-quarter.svg",
		"svg-icons750"
	],
	"./solid/battery-three-quarters.svg": [
		"./src/collapse/svg/solid/battery-three-quarters.svg",
		"svg-icons751"
	],
	"./solid/bed-pulse.svg": [
		"./src/collapse/svg/solid/bed-pulse.svg",
		"svg-icons752"
	],
	"./solid/bed.svg": [
		"./src/collapse/svg/solid/bed.svg",
		"svg-icons753"
	],
	"./solid/beer-mug-empty.svg": [
		"./src/collapse/svg/solid/beer-mug-empty.svg",
		"svg-icons754"
	],
	"./solid/bell-concierge.svg": [
		"./src/collapse/svg/solid/bell-concierge.svg",
		"svg-icons755"
	],
	"./solid/bell-slash.svg": [
		"./src/collapse/svg/solid/bell-slash.svg",
		"svg-icons756"
	],
	"./solid/bell.svg": [
		"./src/collapse/svg/solid/bell.svg",
		"svg-icons757"
	],
	"./solid/bezier-curve.svg": [
		"./src/collapse/svg/solid/bezier-curve.svg",
		"svg-icons758"
	],
	"./solid/bicycle.svg": [
		"./src/collapse/svg/solid/bicycle.svg",
		"svg-icons759"
	],
	"./solid/binoculars.svg": [
		"./src/collapse/svg/solid/binoculars.svg",
		"svg-icons760"
	],
	"./solid/biohazard.svg": [
		"./src/collapse/svg/solid/biohazard.svg",
		"svg-icons761"
	],
	"./solid/bitcoin-sign.svg": [
		"./src/collapse/svg/solid/bitcoin-sign.svg",
		"svg-icons762"
	],
	"./solid/blender-phone.svg": [
		"./src/collapse/svg/solid/blender-phone.svg",
		"svg-icons763"
	],
	"./solid/blender.svg": [
		"./src/collapse/svg/solid/blender.svg",
		"svg-icons764"
	],
	"./solid/blog.svg": [
		"./src/collapse/svg/solid/blog.svg",
		"svg-icons765"
	],
	"./solid/bold.svg": [
		"./src/collapse/svg/solid/bold.svg",
		"svg-icons766"
	],
	"./solid/bolt-lightning.svg": [
		"./src/collapse/svg/solid/bolt-lightning.svg",
		"svg-icons767"
	],
	"./solid/bolt.svg": [
		"./src/collapse/svg/solid/bolt.svg",
		"svg-icons768"
	],
	"./solid/bomb.svg": [
		"./src/collapse/svg/solid/bomb.svg",
		"svg-icons769"
	],
	"./solid/bone.svg": [
		"./src/collapse/svg/solid/bone.svg",
		"svg-icons770"
	],
	"./solid/bong.svg": [
		"./src/collapse/svg/solid/bong.svg",
		"svg-icons771"
	],
	"./solid/book-atlas.svg": [
		"./src/collapse/svg/solid/book-atlas.svg",
		"svg-icons772"
	],
	"./solid/book-bible.svg": [
		"./src/collapse/svg/solid/book-bible.svg",
		"svg-icons773"
	],
	"./solid/book-bookmark.svg": [
		"./src/collapse/svg/solid/book-bookmark.svg",
		"svg-icons774"
	],
	"./solid/book-journal-whills.svg": [
		"./src/collapse/svg/solid/book-journal-whills.svg",
		"svg-icons775"
	],
	"./solid/book-medical.svg": [
		"./src/collapse/svg/solid/book-medical.svg",
		"svg-icons776"
	],
	"./solid/book-open-reader.svg": [
		"./src/collapse/svg/solid/book-open-reader.svg",
		"svg-icons777"
	],
	"./solid/book-open.svg": [
		"./src/collapse/svg/solid/book-open.svg",
		"svg-icons778"
	],
	"./solid/book-quran.svg": [
		"./src/collapse/svg/solid/book-quran.svg",
		"svg-icons779"
	],
	"./solid/book-skull.svg": [
		"./src/collapse/svg/solid/book-skull.svg",
		"svg-icons780"
	],
	"./solid/book-tanakh.svg": [
		"./src/collapse/svg/solid/book-tanakh.svg",
		"svg-icons781"
	],
	"./solid/book.svg": [
		"./src/collapse/svg/solid/book.svg",
		"svg-icons782"
	],
	"./solid/bookmark.svg": [
		"./src/collapse/svg/solid/bookmark.svg",
		"svg-icons783"
	],
	"./solid/border-all.svg": [
		"./src/collapse/svg/solid/border-all.svg",
		"svg-icons784"
	],
	"./solid/border-none.svg": [
		"./src/collapse/svg/solid/border-none.svg",
		"svg-icons785"
	],
	"./solid/border-top-left.svg": [
		"./src/collapse/svg/solid/border-top-left.svg",
		"svg-icons786"
	],
	"./solid/bore-hole.svg": [
		"./src/collapse/svg/solid/bore-hole.svg",
		"svg-icons787"
	],
	"./solid/bottle-droplet.svg": [
		"./src/collapse/svg/solid/bottle-droplet.svg",
		"svg-icons788"
	],
	"./solid/bottle-water.svg": [
		"./src/collapse/svg/solid/bottle-water.svg",
		"svg-icons789"
	],
	"./solid/bowl-food.svg": [
		"./src/collapse/svg/solid/bowl-food.svg",
		"svg-icons790"
	],
	"./solid/bowl-rice.svg": [
		"./src/collapse/svg/solid/bowl-rice.svg",
		"svg-icons791"
	],
	"./solid/bowling-ball.svg": [
		"./src/collapse/svg/solid/bowling-ball.svg",
		"svg-icons792"
	],
	"./solid/box-archive.svg": [
		"./src/collapse/svg/solid/box-archive.svg",
		"svg-icons793"
	],
	"./solid/box-open.svg": [
		"./src/collapse/svg/solid/box-open.svg",
		"svg-icons794"
	],
	"./solid/box-tissue.svg": [
		"./src/collapse/svg/solid/box-tissue.svg",
		"svg-icons795"
	],
	"./solid/box.svg": [
		"./src/collapse/svg/solid/box.svg",
		"svg-icons796"
	],
	"./solid/boxes-packing.svg": [
		"./src/collapse/svg/solid/boxes-packing.svg",
		"svg-icons797"
	],
	"./solid/boxes-stacked.svg": [
		"./src/collapse/svg/solid/boxes-stacked.svg",
		"svg-icons798"
	],
	"./solid/braille.svg": [
		"./src/collapse/svg/solid/braille.svg",
		"svg-icons799"
	],
	"./solid/brain.svg": [
		"./src/collapse/svg/solid/brain.svg",
		"svg-icons800"
	],
	"./solid/brazilian-real-sign.svg": [
		"./src/collapse/svg/solid/brazilian-real-sign.svg",
		"svg-icons801"
	],
	"./solid/bread-slice.svg": [
		"./src/collapse/svg/solid/bread-slice.svg",
		"svg-icons802"
	],
	"./solid/bridge-circle-check.svg": [
		"./src/collapse/svg/solid/bridge-circle-check.svg",
		"svg-icons803"
	],
	"./solid/bridge-circle-exclamation.svg": [
		"./src/collapse/svg/solid/bridge-circle-exclamation.svg",
		"svg-icons804"
	],
	"./solid/bridge-circle-xmark.svg": [
		"./src/collapse/svg/solid/bridge-circle-xmark.svg",
		"svg-icons805"
	],
	"./solid/bridge-lock.svg": [
		"./src/collapse/svg/solid/bridge-lock.svg",
		"svg-icons806"
	],
	"./solid/bridge-water.svg": [
		"./src/collapse/svg/solid/bridge-water.svg",
		"svg-icons807"
	],
	"./solid/bridge.svg": [
		"./src/collapse/svg/solid/bridge.svg",
		"svg-icons808"
	],
	"./solid/briefcase-medical.svg": [
		"./src/collapse/svg/solid/briefcase-medical.svg",
		"svg-icons809"
	],
	"./solid/briefcase.svg": [
		"./src/collapse/svg/solid/briefcase.svg",
		"svg-icons810"
	],
	"./solid/broom-ball.svg": [
		"./src/collapse/svg/solid/broom-ball.svg",
		"svg-icons811"
	],
	"./solid/broom.svg": [
		"./src/collapse/svg/solid/broom.svg",
		"svg-icons812"
	],
	"./solid/brush.svg": [
		"./src/collapse/svg/solid/brush.svg",
		"svg-icons813"
	],
	"./solid/bucket.svg": [
		"./src/collapse/svg/solid/bucket.svg",
		"svg-icons814"
	],
	"./solid/bug-slash.svg": [
		"./src/collapse/svg/solid/bug-slash.svg",
		"svg-icons815"
	],
	"./solid/bug.svg": [
		"./src/collapse/svg/solid/bug.svg",
		"svg-icons816"
	],
	"./solid/bugs.svg": [
		"./src/collapse/svg/solid/bugs.svg",
		"svg-icons817"
	],
	"./solid/building-circle-arrow-right.svg": [
		"./src/collapse/svg/solid/building-circle-arrow-right.svg",
		"svg-icons818"
	],
	"./solid/building-circle-check.svg": [
		"./src/collapse/svg/solid/building-circle-check.svg",
		"svg-icons819"
	],
	"./solid/building-circle-exclamation.svg": [
		"./src/collapse/svg/solid/building-circle-exclamation.svg",
		"svg-icons820"
	],
	"./solid/building-circle-xmark.svg": [
		"./src/collapse/svg/solid/building-circle-xmark.svg",
		"svg-icons821"
	],
	"./solid/building-columns.svg": [
		"./src/collapse/svg/solid/building-columns.svg",
		"svg-icons822"
	],
	"./solid/building-flag.svg": [
		"./src/collapse/svg/solid/building-flag.svg",
		"svg-icons823"
	],
	"./solid/building-lock.svg": [
		"./src/collapse/svg/solid/building-lock.svg",
		"svg-icons824"
	],
	"./solid/building-ngo.svg": [
		"./src/collapse/svg/solid/building-ngo.svg",
		"svg-icons825"
	],
	"./solid/building-shield.svg": [
		"./src/collapse/svg/solid/building-shield.svg",
		"svg-icons826"
	],
	"./solid/building-un.svg": [
		"./src/collapse/svg/solid/building-un.svg",
		"svg-icons827"
	],
	"./solid/building-user.svg": [
		"./src/collapse/svg/solid/building-user.svg",
		"svg-icons828"
	],
	"./solid/building-wheat.svg": [
		"./src/collapse/svg/solid/building-wheat.svg",
		"svg-icons829"
	],
	"./solid/building.svg": [
		"./src/collapse/svg/solid/building.svg",
		"svg-icons830"
	],
	"./solid/bullhorn.svg": [
		"./src/collapse/svg/solid/bullhorn.svg",
		"svg-icons831"
	],
	"./solid/bullseye.svg": [
		"./src/collapse/svg/solid/bullseye.svg",
		"svg-icons832"
	],
	"./solid/burger.svg": [
		"./src/collapse/svg/solid/burger.svg",
		"svg-icons833"
	],
	"./solid/burst.svg": [
		"./src/collapse/svg/solid/burst.svg",
		"svg-icons834"
	],
	"./solid/bus-simple.svg": [
		"./src/collapse/svg/solid/bus-simple.svg",
		"svg-icons835"
	],
	"./solid/bus.svg": [
		"./src/collapse/svg/solid/bus.svg",
		"svg-icons836"
	],
	"./solid/business-time.svg": [
		"./src/collapse/svg/solid/business-time.svg",
		"svg-icons837"
	],
	"./solid/c.svg": [
		"./src/collapse/svg/solid/c.svg",
		"svg-icons838"
	],
	"./solid/cable-car.svg": [
		"./src/collapse/svg/solid/cable-car.svg",
		"svg-icons839"
	],
	"./solid/cake-candles.svg": [
		"./src/collapse/svg/solid/cake-candles.svg",
		"svg-icons840"
	],
	"./solid/calculator.svg": [
		"./src/collapse/svg/solid/calculator.svg",
		"svg-icons841"
	],
	"./solid/calendar-check.svg": [
		"./src/collapse/svg/solid/calendar-check.svg",
		"svg-icons842"
	],
	"./solid/calendar-day.svg": [
		"./src/collapse/svg/solid/calendar-day.svg",
		"svg-icons843"
	],
	"./solid/calendar-days.svg": [
		"./src/collapse/svg/solid/calendar-days.svg",
		"svg-icons844"
	],
	"./solid/calendar-minus.svg": [
		"./src/collapse/svg/solid/calendar-minus.svg",
		"svg-icons845"
	],
	"./solid/calendar-plus.svg": [
		"./src/collapse/svg/solid/calendar-plus.svg",
		"svg-icons846"
	],
	"./solid/calendar-week.svg": [
		"./src/collapse/svg/solid/calendar-week.svg",
		"svg-icons847"
	],
	"./solid/calendar-xmark.svg": [
		"./src/collapse/svg/solid/calendar-xmark.svg",
		"svg-icons848"
	],
	"./solid/calendar.svg": [
		"./src/collapse/svg/solid/calendar.svg",
		"svg-icons849"
	],
	"./solid/camera-retro.svg": [
		"./src/collapse/svg/solid/camera-retro.svg",
		"svg-icons850"
	],
	"./solid/camera-rotate.svg": [
		"./src/collapse/svg/solid/camera-rotate.svg",
		"svg-icons851"
	],
	"./solid/camera.svg": [
		"./src/collapse/svg/solid/camera.svg",
		"svg-icons852"
	],
	"./solid/campground.svg": [
		"./src/collapse/svg/solid/campground.svg",
		"svg-icons853"
	],
	"./solid/candy-cane.svg": [
		"./src/collapse/svg/solid/candy-cane.svg",
		"svg-icons854"
	],
	"./solid/cannabis.svg": [
		"./src/collapse/svg/solid/cannabis.svg",
		"svg-icons855"
	],
	"./solid/capsules.svg": [
		"./src/collapse/svg/solid/capsules.svg",
		"svg-icons856"
	],
	"./solid/car-battery.svg": [
		"./src/collapse/svg/solid/car-battery.svg",
		"svg-icons857"
	],
	"./solid/car-burst.svg": [
		"./src/collapse/svg/solid/car-burst.svg",
		"svg-icons858"
	],
	"./solid/car-on.svg": [
		"./src/collapse/svg/solid/car-on.svg",
		"svg-icons859"
	],
	"./solid/car-rear.svg": [
		"./src/collapse/svg/solid/car-rear.svg",
		"svg-icons860"
	],
	"./solid/car-side.svg": [
		"./src/collapse/svg/solid/car-side.svg",
		"svg-icons861"
	],
	"./solid/car-tunnel.svg": [
		"./src/collapse/svg/solid/car-tunnel.svg",
		"svg-icons862"
	],
	"./solid/car.svg": [
		"./src/collapse/svg/solid/car.svg",
		"svg-icons863"
	],
	"./solid/caravan.svg": [
		"./src/collapse/svg/solid/caravan.svg",
		"svg-icons864"
	],
	"./solid/caret-down.svg": [
		"./src/collapse/svg/solid/caret-down.svg",
		"svg-icons865"
	],
	"./solid/caret-left.svg": [
		"./src/collapse/svg/solid/caret-left.svg",
		"svg-icons866"
	],
	"./solid/caret-right.svg": [
		"./src/collapse/svg/solid/caret-right.svg",
		"svg-icons867"
	],
	"./solid/caret-up.svg": [
		"./src/collapse/svg/solid/caret-up.svg",
		"svg-icons868"
	],
	"./solid/carrot.svg": [
		"./src/collapse/svg/solid/carrot.svg",
		"svg-icons869"
	],
	"./solid/cart-arrow-down.svg": [
		"./src/collapse/svg/solid/cart-arrow-down.svg",
		"svg-icons870"
	],
	"./solid/cart-flatbed-suitcase.svg": [
		"./src/collapse/svg/solid/cart-flatbed-suitcase.svg",
		"svg-icons871"
	],
	"./solid/cart-flatbed.svg": [
		"./src/collapse/svg/solid/cart-flatbed.svg",
		"svg-icons872"
	],
	"./solid/cart-plus.svg": [
		"./src/collapse/svg/solid/cart-plus.svg",
		"svg-icons873"
	],
	"./solid/cart-shopping.svg": [
		"./src/collapse/svg/solid/cart-shopping.svg",
		"svg-icons874"
	],
	"./solid/cash-register.svg": [
		"./src/collapse/svg/solid/cash-register.svg",
		"svg-icons875"
	],
	"./solid/cat.svg": [
		"./src/collapse/svg/solid/cat.svg",
		"svg-icons876"
	],
	"./solid/cedi-sign.svg": [
		"./src/collapse/svg/solid/cedi-sign.svg",
		"svg-icons877"
	],
	"./solid/cent-sign.svg": [
		"./src/collapse/svg/solid/cent-sign.svg",
		"svg-icons878"
	],
	"./solid/certificate.svg": [
		"./src/collapse/svg/solid/certificate.svg",
		"svg-icons879"
	],
	"./solid/chair.svg": [
		"./src/collapse/svg/solid/chair.svg",
		"svg-icons880"
	],
	"./solid/chalkboard-user.svg": [
		"./src/collapse/svg/solid/chalkboard-user.svg",
		"svg-icons881"
	],
	"./solid/chalkboard.svg": [
		"./src/collapse/svg/solid/chalkboard.svg",
		"svg-icons882"
	],
	"./solid/champagne-glasses.svg": [
		"./src/collapse/svg/solid/champagne-glasses.svg",
		"svg-icons883"
	],
	"./solid/charging-station.svg": [
		"./src/collapse/svg/solid/charging-station.svg",
		"svg-icons884"
	],
	"./solid/chart-area.svg": [
		"./src/collapse/svg/solid/chart-area.svg",
		"svg-icons885"
	],
	"./solid/chart-bar.svg": [
		"./src/collapse/svg/solid/chart-bar.svg",
		"svg-icons886"
	],
	"./solid/chart-column.svg": [
		"./src/collapse/svg/solid/chart-column.svg",
		"svg-icons887"
	],
	"./solid/chart-gantt.svg": [
		"./src/collapse/svg/solid/chart-gantt.svg",
		"svg-icons888"
	],
	"./solid/chart-line.svg": [
		"./src/collapse/svg/solid/chart-line.svg",
		"svg-icons889"
	],
	"./solid/chart-pie.svg": [
		"./src/collapse/svg/solid/chart-pie.svg",
		"svg-icons890"
	],
	"./solid/chart-simple.svg": [
		"./src/collapse/svg/solid/chart-simple.svg",
		"svg-icons891"
	],
	"./solid/check-double.svg": [
		"./src/collapse/svg/solid/check-double.svg",
		"svg-icons892"
	],
	"./solid/check-to-slot.svg": [
		"./src/collapse/svg/solid/check-to-slot.svg",
		"svg-icons893"
	],
	"./solid/check.svg": [
		"./src/collapse/svg/solid/check.svg",
		"svg-icons894"
	],
	"./solid/cheese.svg": [
		"./src/collapse/svg/solid/cheese.svg",
		"svg-icons895"
	],
	"./solid/chess-bishop.svg": [
		"./src/collapse/svg/solid/chess-bishop.svg",
		"svg-icons896"
	],
	"./solid/chess-board.svg": [
		"./src/collapse/svg/solid/chess-board.svg",
		"svg-icons897"
	],
	"./solid/chess-king.svg": [
		"./src/collapse/svg/solid/chess-king.svg",
		"svg-icons898"
	],
	"./solid/chess-knight.svg": [
		"./src/collapse/svg/solid/chess-knight.svg",
		"svg-icons899"
	],
	"./solid/chess-pawn.svg": [
		"./src/collapse/svg/solid/chess-pawn.svg",
		"svg-icons900"
	],
	"./solid/chess-queen.svg": [
		"./src/collapse/svg/solid/chess-queen.svg",
		"svg-icons901"
	],
	"./solid/chess-rook.svg": [
		"./src/collapse/svg/solid/chess-rook.svg",
		"svg-icons902"
	],
	"./solid/chess.svg": [
		"./src/collapse/svg/solid/chess.svg",
		"svg-icons903"
	],
	"./solid/chevron-down.svg": [
		"./src/collapse/svg/solid/chevron-down.svg",
		"svg-icons904"
	],
	"./solid/chevron-left.svg": [
		"./src/collapse/svg/solid/chevron-left.svg",
		"svg-icons905"
	],
	"./solid/chevron-right.svg": [
		"./src/collapse/svg/solid/chevron-right.svg",
		"svg-icons906"
	],
	"./solid/chevron-up.svg": [
		"./src/collapse/svg/solid/chevron-up.svg",
		"svg-icons907"
	],
	"./solid/child-dress.svg": [
		"./src/collapse/svg/solid/child-dress.svg",
		"svg-icons908"
	],
	"./solid/child-reaching.svg": [
		"./src/collapse/svg/solid/child-reaching.svg",
		"svg-icons909"
	],
	"./solid/child-rifle.svg": [
		"./src/collapse/svg/solid/child-rifle.svg",
		"svg-icons910"
	],
	"./solid/child.svg": [
		"./src/collapse/svg/solid/child.svg",
		"svg-icons911"
	],
	"./solid/children.svg": [
		"./src/collapse/svg/solid/children.svg",
		"svg-icons912"
	],
	"./solid/church.svg": [
		"./src/collapse/svg/solid/church.svg",
		"svg-icons913"
	],
	"./solid/circle-arrow-down.svg": [
		"./src/collapse/svg/solid/circle-arrow-down.svg",
		"svg-icons914"
	],
	"./solid/circle-arrow-left.svg": [
		"./src/collapse/svg/solid/circle-arrow-left.svg",
		"svg-icons915"
	],
	"./solid/circle-arrow-right.svg": [
		"./src/collapse/svg/solid/circle-arrow-right.svg",
		"svg-icons916"
	],
	"./solid/circle-arrow-up.svg": [
		"./src/collapse/svg/solid/circle-arrow-up.svg",
		"svg-icons917"
	],
	"./solid/circle-check.svg": [
		"./src/collapse/svg/solid/circle-check.svg",
		"svg-icons918"
	],
	"./solid/circle-chevron-down.svg": [
		"./src/collapse/svg/solid/circle-chevron-down.svg",
		"svg-icons919"
	],
	"./solid/circle-chevron-left.svg": [
		"./src/collapse/svg/solid/circle-chevron-left.svg",
		"svg-icons920"
	],
	"./solid/circle-chevron-right.svg": [
		"./src/collapse/svg/solid/circle-chevron-right.svg",
		"svg-icons921"
	],
	"./solid/circle-chevron-up.svg": [
		"./src/collapse/svg/solid/circle-chevron-up.svg",
		"svg-icons922"
	],
	"./solid/circle-dollar-to-slot.svg": [
		"./src/collapse/svg/solid/circle-dollar-to-slot.svg",
		"svg-icons923"
	],
	"./solid/circle-dot.svg": [
		"./src/collapse/svg/solid/circle-dot.svg",
		"svg-icons924"
	],
	"./solid/circle-down.svg": [
		"./src/collapse/svg/solid/circle-down.svg",
		"svg-icons925"
	],
	"./solid/circle-exclamation.svg": [
		"./src/collapse/svg/solid/circle-exclamation.svg",
		"svg-icons926"
	],
	"./solid/circle-h.svg": [
		"./src/collapse/svg/solid/circle-h.svg",
		"svg-icons927"
	],
	"./solid/circle-half-stroke.svg": [
		"./src/collapse/svg/solid/circle-half-stroke.svg",
		"svg-icons928"
	],
	"./solid/circle-info.svg": [
		"./src/collapse/svg/solid/circle-info.svg",
		"svg-icons929"
	],
	"./solid/circle-left.svg": [
		"./src/collapse/svg/solid/circle-left.svg",
		"svg-icons930"
	],
	"./solid/circle-minus.svg": [
		"./src/collapse/svg/solid/circle-minus.svg",
		"svg-icons931"
	],
	"./solid/circle-nodes.svg": [
		"./src/collapse/svg/solid/circle-nodes.svg",
		"svg-icons932"
	],
	"./solid/circle-notch.svg": [
		"./src/collapse/svg/solid/circle-notch.svg",
		"svg-icons933"
	],
	"./solid/circle-pause.svg": [
		"./src/collapse/svg/solid/circle-pause.svg",
		"svg-icons934"
	],
	"./solid/circle-play.svg": [
		"./src/collapse/svg/solid/circle-play.svg",
		"svg-icons935"
	],
	"./solid/circle-plus.svg": [
		"./src/collapse/svg/solid/circle-plus.svg",
		"svg-icons936"
	],
	"./solid/circle-question.svg": [
		"./src/collapse/svg/solid/circle-question.svg",
		"svg-icons937"
	],
	"./solid/circle-radiation.svg": [
		"./src/collapse/svg/solid/circle-radiation.svg",
		"svg-icons938"
	],
	"./solid/circle-right.svg": [
		"./src/collapse/svg/solid/circle-right.svg",
		"svg-icons939"
	],
	"./solid/circle-stop.svg": [
		"./src/collapse/svg/solid/circle-stop.svg",
		"svg-icons940"
	],
	"./solid/circle-up.svg": [
		"./src/collapse/svg/solid/circle-up.svg",
		"svg-icons941"
	],
	"./solid/circle-user.svg": [
		"./src/collapse/svg/solid/circle-user.svg",
		"svg-icons942"
	],
	"./solid/circle-xmark.svg": [
		"./src/collapse/svg/solid/circle-xmark.svg",
		"svg-icons943"
	],
	"./solid/circle.svg": [
		"./src/collapse/svg/solid/circle.svg",
		"svg-icons944"
	],
	"./solid/city.svg": [
		"./src/collapse/svg/solid/city.svg",
		"svg-icons945"
	],
	"./solid/clapperboard.svg": [
		"./src/collapse/svg/solid/clapperboard.svg",
		"svg-icons946"
	],
	"./solid/clipboard-check.svg": [
		"./src/collapse/svg/solid/clipboard-check.svg",
		"svg-icons947"
	],
	"./solid/clipboard-list.svg": [
		"./src/collapse/svg/solid/clipboard-list.svg",
		"svg-icons948"
	],
	"./solid/clipboard-question.svg": [
		"./src/collapse/svg/solid/clipboard-question.svg",
		"svg-icons949"
	],
	"./solid/clipboard-user.svg": [
		"./src/collapse/svg/solid/clipboard-user.svg",
		"svg-icons950"
	],
	"./solid/clipboard.svg": [
		"./src/collapse/svg/solid/clipboard.svg",
		"svg-icons951"
	],
	"./solid/clock-rotate-left.svg": [
		"./src/collapse/svg/solid/clock-rotate-left.svg",
		"svg-icons952"
	],
	"./solid/clock.svg": [
		"./src/collapse/svg/solid/clock.svg",
		"svg-icons953"
	],
	"./solid/clone.svg": [
		"./src/collapse/svg/solid/clone.svg",
		"svg-icons954"
	],
	"./solid/closed-captioning.svg": [
		"./src/collapse/svg/solid/closed-captioning.svg",
		"svg-icons955"
	],
	"./solid/cloud-arrow-down.svg": [
		"./src/collapse/svg/solid/cloud-arrow-down.svg",
		"svg-icons956"
	],
	"./solid/cloud-arrow-up.svg": [
		"./src/collapse/svg/solid/cloud-arrow-up.svg",
		"svg-icons957"
	],
	"./solid/cloud-bolt.svg": [
		"./src/collapse/svg/solid/cloud-bolt.svg",
		"svg-icons958"
	],
	"./solid/cloud-meatball.svg": [
		"./src/collapse/svg/solid/cloud-meatball.svg",
		"svg-icons959"
	],
	"./solid/cloud-moon-rain.svg": [
		"./src/collapse/svg/solid/cloud-moon-rain.svg",
		"svg-icons960"
	],
	"./solid/cloud-moon.svg": [
		"./src/collapse/svg/solid/cloud-moon.svg",
		"svg-icons961"
	],
	"./solid/cloud-rain.svg": [
		"./src/collapse/svg/solid/cloud-rain.svg",
		"svg-icons962"
	],
	"./solid/cloud-showers-heavy.svg": [
		"./src/collapse/svg/solid/cloud-showers-heavy.svg",
		"svg-icons963"
	],
	"./solid/cloud-showers-water.svg": [
		"./src/collapse/svg/solid/cloud-showers-water.svg",
		"svg-icons964"
	],
	"./solid/cloud-sun-rain.svg": [
		"./src/collapse/svg/solid/cloud-sun-rain.svg",
		"svg-icons965"
	],
	"./solid/cloud-sun.svg": [
		"./src/collapse/svg/solid/cloud-sun.svg",
		"svg-icons966"
	],
	"./solid/cloud.svg": [
		"./src/collapse/svg/solid/cloud.svg",
		"svg-icons967"
	],
	"./solid/clover.svg": [
		"./src/collapse/svg/solid/clover.svg",
		"svg-icons968"
	],
	"./solid/code-branch.svg": [
		"./src/collapse/svg/solid/code-branch.svg",
		"svg-icons969"
	],
	"./solid/code-commit.svg": [
		"./src/collapse/svg/solid/code-commit.svg",
		"svg-icons970"
	],
	"./solid/code-compare.svg": [
		"./src/collapse/svg/solid/code-compare.svg",
		"svg-icons971"
	],
	"./solid/code-fork.svg": [
		"./src/collapse/svg/solid/code-fork.svg",
		"svg-icons972"
	],
	"./solid/code-merge.svg": [
		"./src/collapse/svg/solid/code-merge.svg",
		"svg-icons973"
	],
	"./solid/code-pull-request.svg": [
		"./src/collapse/svg/solid/code-pull-request.svg",
		"svg-icons974"
	],
	"./solid/code.svg": [
		"./src/collapse/svg/solid/code.svg",
		"svg-icons975"
	],
	"./solid/coins.svg": [
		"./src/collapse/svg/solid/coins.svg",
		"svg-icons976"
	],
	"./solid/colon-sign.svg": [
		"./src/collapse/svg/solid/colon-sign.svg",
		"svg-icons977"
	],
	"./solid/comment-dollar.svg": [
		"./src/collapse/svg/solid/comment-dollar.svg",
		"svg-icons978"
	],
	"./solid/comment-dots.svg": [
		"./src/collapse/svg/solid/comment-dots.svg",
		"svg-icons979"
	],
	"./solid/comment-medical.svg": [
		"./src/collapse/svg/solid/comment-medical.svg",
		"svg-icons980"
	],
	"./solid/comment-slash.svg": [
		"./src/collapse/svg/solid/comment-slash.svg",
		"svg-icons981"
	],
	"./solid/comment-sms.svg": [
		"./src/collapse/svg/solid/comment-sms.svg",
		"svg-icons982"
	],
	"./solid/comment.svg": [
		"./src/collapse/svg/solid/comment.svg",
		"svg-icons983"
	],
	"./solid/comments-dollar.svg": [
		"./src/collapse/svg/solid/comments-dollar.svg",
		"svg-icons984"
	],
	"./solid/comments.svg": [
		"./src/collapse/svg/solid/comments.svg",
		"svg-icons985"
	],
	"./solid/compact-disc.svg": [
		"./src/collapse/svg/solid/compact-disc.svg",
		"svg-icons986"
	],
	"./solid/compass-drafting.svg": [
		"./src/collapse/svg/solid/compass-drafting.svg",
		"svg-icons987"
	],
	"./solid/compass.svg": [
		"./src/collapse/svg/solid/compass.svg",
		"svg-icons988"
	],
	"./solid/compress.svg": [
		"./src/collapse/svg/solid/compress.svg",
		"svg-icons989"
	],
	"./solid/computer-mouse.svg": [
		"./src/collapse/svg/solid/computer-mouse.svg",
		"svg-icons990"
	],
	"./solid/computer.svg": [
		"./src/collapse/svg/solid/computer.svg",
		"svg-icons991"
	],
	"./solid/cookie-bite.svg": [
		"./src/collapse/svg/solid/cookie-bite.svg",
		"svg-icons992"
	],
	"./solid/cookie.svg": [
		"./src/collapse/svg/solid/cookie.svg",
		"svg-icons993"
	],
	"./solid/copy.svg": [
		"./src/collapse/svg/solid/copy.svg",
		"svg-icons994"
	],
	"./solid/copyright.svg": [
		"./src/collapse/svg/solid/copyright.svg",
		"svg-icons995"
	],
	"./solid/couch.svg": [
		"./src/collapse/svg/solid/couch.svg",
		"svg-icons996"
	],
	"./solid/cow.svg": [
		"./src/collapse/svg/solid/cow.svg",
		"svg-icons997"
	],
	"./solid/credit-card.svg": [
		"./src/collapse/svg/solid/credit-card.svg",
		"svg-icons998"
	],
	"./solid/crop-simple.svg": [
		"./src/collapse/svg/solid/crop-simple.svg",
		"svg-icons999"
	],
	"./solid/crop.svg": [
		"./src/collapse/svg/solid/crop.svg",
		"svg-icons1000"
	],
	"./solid/cross.svg": [
		"./src/collapse/svg/solid/cross.svg",
		"svg-icons1001"
	],
	"./solid/crosshairs.svg": [
		"./src/collapse/svg/solid/crosshairs.svg",
		"svg-icons1002"
	],
	"./solid/crow.svg": [
		"./src/collapse/svg/solid/crow.svg",
		"svg-icons1003"
	],
	"./solid/crown.svg": [
		"./src/collapse/svg/solid/crown.svg",
		"svg-icons1004"
	],
	"./solid/crutch.svg": [
		"./src/collapse/svg/solid/crutch.svg",
		"svg-icons1005"
	],
	"./solid/cruzeiro-sign.svg": [
		"./src/collapse/svg/solid/cruzeiro-sign.svg",
		"svg-icons1006"
	],
	"./solid/cube.svg": [
		"./src/collapse/svg/solid/cube.svg",
		"svg-icons1007"
	],
	"./solid/cubes-stacked.svg": [
		"./src/collapse/svg/solid/cubes-stacked.svg",
		"svg-icons1008"
	],
	"./solid/cubes.svg": [
		"./src/collapse/svg/solid/cubes.svg",
		"svg-icons1009"
	],
	"./solid/d.svg": [
		"./src/collapse/svg/solid/d.svg",
		"svg-icons1010"
	],
	"./solid/database.svg": [
		"./src/collapse/svg/solid/database.svg",
		"svg-icons1011"
	],
	"./solid/delete-left.svg": [
		"./src/collapse/svg/solid/delete-left.svg",
		"svg-icons1012"
	],
	"./solid/democrat.svg": [
		"./src/collapse/svg/solid/democrat.svg",
		"svg-icons1013"
	],
	"./solid/desktop.svg": [
		"./src/collapse/svg/solid/desktop.svg",
		"svg-icons1014"
	],
	"./solid/dharmachakra.svg": [
		"./src/collapse/svg/solid/dharmachakra.svg",
		"svg-icons1015"
	],
	"./solid/diagram-next.svg": [
		"./src/collapse/svg/solid/diagram-next.svg",
		"svg-icons1016"
	],
	"./solid/diagram-predecessor.svg": [
		"./src/collapse/svg/solid/diagram-predecessor.svg",
		"svg-icons1017"
	],
	"./solid/diagram-project.svg": [
		"./src/collapse/svg/solid/diagram-project.svg",
		"svg-icons1018"
	],
	"./solid/diagram-successor.svg": [
		"./src/collapse/svg/solid/diagram-successor.svg",
		"svg-icons1019"
	],
	"./solid/diamond-turn-right.svg": [
		"./src/collapse/svg/solid/diamond-turn-right.svg",
		"svg-icons1020"
	],
	"./solid/diamond.svg": [
		"./src/collapse/svg/solid/diamond.svg",
		"svg-icons1021"
	],
	"./solid/dice-d20.svg": [
		"./src/collapse/svg/solid/dice-d20.svg",
		"svg-icons1022"
	],
	"./solid/dice-d6.svg": [
		"./src/collapse/svg/solid/dice-d6.svg",
		"svg-icons1023"
	],
	"./solid/dice-five.svg": [
		"./src/collapse/svg/solid/dice-five.svg",
		"svg-icons1024"
	],
	"./solid/dice-four.svg": [
		"./src/collapse/svg/solid/dice-four.svg",
		"svg-icons1025"
	],
	"./solid/dice-one.svg": [
		"./src/collapse/svg/solid/dice-one.svg",
		"svg-icons1026"
	],
	"./solid/dice-six.svg": [
		"./src/collapse/svg/solid/dice-six.svg",
		"svg-icons1027"
	],
	"./solid/dice-three.svg": [
		"./src/collapse/svg/solid/dice-three.svg",
		"svg-icons1028"
	],
	"./solid/dice-two.svg": [
		"./src/collapse/svg/solid/dice-two.svg",
		"svg-icons1029"
	],
	"./solid/dice.svg": [
		"./src/collapse/svg/solid/dice.svg",
		"svg-icons1030"
	],
	"./solid/disease.svg": [
		"./src/collapse/svg/solid/disease.svg",
		"svg-icons1031"
	],
	"./solid/display.svg": [
		"./src/collapse/svg/solid/display.svg",
		"svg-icons1032"
	],
	"./solid/divide.svg": [
		"./src/collapse/svg/solid/divide.svg",
		"svg-icons1033"
	],
	"./solid/dna.svg": [
		"./src/collapse/svg/solid/dna.svg",
		"svg-icons1034"
	],
	"./solid/dog.svg": [
		"./src/collapse/svg/solid/dog.svg",
		"svg-icons1035"
	],
	"./solid/dollar-sign.svg": [
		"./src/collapse/svg/solid/dollar-sign.svg",
		"svg-icons1036"
	],
	"./solid/dolly.svg": [
		"./src/collapse/svg/solid/dolly.svg",
		"svg-icons1037"
	],
	"./solid/dong-sign.svg": [
		"./src/collapse/svg/solid/dong-sign.svg",
		"svg-icons1038"
	],
	"./solid/door-closed.svg": [
		"./src/collapse/svg/solid/door-closed.svg",
		"svg-icons1039"
	],
	"./solid/door-open.svg": [
		"./src/collapse/svg/solid/door-open.svg",
		"svg-icons1040"
	],
	"./solid/dove.svg": [
		"./src/collapse/svg/solid/dove.svg",
		"svg-icons1041"
	],
	"./solid/down-left-and-up-right-to-center.svg": [
		"./src/collapse/svg/solid/down-left-and-up-right-to-center.svg",
		"svg-icons1042"
	],
	"./solid/down-long.svg": [
		"./src/collapse/svg/solid/down-long.svg",
		"svg-icons1043"
	],
	"./solid/download.svg": [
		"./src/collapse/svg/solid/download.svg",
		"svg-icons1044"
	],
	"./solid/dragon.svg": [
		"./src/collapse/svg/solid/dragon.svg",
		"svg-icons1045"
	],
	"./solid/draw-polygon.svg": [
		"./src/collapse/svg/solid/draw-polygon.svg",
		"svg-icons1046"
	],
	"./solid/droplet-slash.svg": [
		"./src/collapse/svg/solid/droplet-slash.svg",
		"svg-icons1047"
	],
	"./solid/droplet.svg": [
		"./src/collapse/svg/solid/droplet.svg",
		"svg-icons1048"
	],
	"./solid/drum-steelpan.svg": [
		"./src/collapse/svg/solid/drum-steelpan.svg",
		"svg-icons1049"
	],
	"./solid/drum.svg": [
		"./src/collapse/svg/solid/drum.svg",
		"svg-icons1050"
	],
	"./solid/drumstick-bite.svg": [
		"./src/collapse/svg/solid/drumstick-bite.svg",
		"svg-icons1051"
	],
	"./solid/dumbbell.svg": [
		"./src/collapse/svg/solid/dumbbell.svg",
		"svg-icons1052"
	],
	"./solid/dumpster-fire.svg": [
		"./src/collapse/svg/solid/dumpster-fire.svg",
		"svg-icons1053"
	],
	"./solid/dumpster.svg": [
		"./src/collapse/svg/solid/dumpster.svg",
		"svg-icons1054"
	],
	"./solid/dungeon.svg": [
		"./src/collapse/svg/solid/dungeon.svg",
		"svg-icons1055"
	],
	"./solid/e.svg": [
		"./src/collapse/svg/solid/e.svg",
		"svg-icons1056"
	],
	"./solid/ear-deaf.svg": [
		"./src/collapse/svg/solid/ear-deaf.svg",
		"svg-icons1057"
	],
	"./solid/ear-listen.svg": [
		"./src/collapse/svg/solid/ear-listen.svg",
		"svg-icons1058"
	],
	"./solid/earth-africa.svg": [
		"./src/collapse/svg/solid/earth-africa.svg",
		"svg-icons1059"
	],
	"./solid/earth-americas.svg": [
		"./src/collapse/svg/solid/earth-americas.svg",
		"svg-icons1060"
	],
	"./solid/earth-asia.svg": [
		"./src/collapse/svg/solid/earth-asia.svg",
		"svg-icons1061"
	],
	"./solid/earth-europe.svg": [
		"./src/collapse/svg/solid/earth-europe.svg",
		"svg-icons1062"
	],
	"./solid/earth-oceania.svg": [
		"./src/collapse/svg/solid/earth-oceania.svg",
		"svg-icons1063"
	],
	"./solid/egg.svg": [
		"./src/collapse/svg/solid/egg.svg",
		"svg-icons1064"
	],
	"./solid/eject.svg": [
		"./src/collapse/svg/solid/eject.svg",
		"svg-icons1065"
	],
	"./solid/elevator.svg": [
		"./src/collapse/svg/solid/elevator.svg",
		"svg-icons1066"
	],
	"./solid/ellipsis-vertical.svg": [
		"./src/collapse/svg/solid/ellipsis-vertical.svg",
		"svg-icons1067"
	],
	"./solid/ellipsis.svg": [
		"./src/collapse/svg/solid/ellipsis.svg",
		"svg-icons1068"
	],
	"./solid/envelope-circle-check.svg": [
		"./src/collapse/svg/solid/envelope-circle-check.svg",
		"svg-icons1069"
	],
	"./solid/envelope-open-text.svg": [
		"./src/collapse/svg/solid/envelope-open-text.svg",
		"svg-icons1070"
	],
	"./solid/envelope-open.svg": [
		"./src/collapse/svg/solid/envelope-open.svg",
		"svg-icons1071"
	],
	"./solid/envelope.svg": [
		"./src/collapse/svg/solid/envelope.svg",
		"svg-icons1072"
	],
	"./solid/envelopes-bulk.svg": [
		"./src/collapse/svg/solid/envelopes-bulk.svg",
		"svg-icons1073"
	],
	"./solid/equals.svg": [
		"./src/collapse/svg/solid/equals.svg",
		"svg-icons1074"
	],
	"./solid/eraser.svg": [
		"./src/collapse/svg/solid/eraser.svg",
		"svg-icons1075"
	],
	"./solid/ethernet.svg": [
		"./src/collapse/svg/solid/ethernet.svg",
		"svg-icons1076"
	],
	"./solid/euro-sign.svg": [
		"./src/collapse/svg/solid/euro-sign.svg",
		"svg-icons1077"
	],
	"./solid/exclamation.svg": [
		"./src/collapse/svg/solid/exclamation.svg",
		"svg-icons1078"
	],
	"./solid/expand.svg": [
		"./src/collapse/svg/solid/expand.svg",
		"svg-icons1079"
	],
	"./solid/explosion.svg": [
		"./src/collapse/svg/solid/explosion.svg",
		"svg-icons1080"
	],
	"./solid/eye-dropper.svg": [
		"./src/collapse/svg/solid/eye-dropper.svg",
		"svg-icons1081"
	],
	"./solid/eye-low-vision.svg": [
		"./src/collapse/svg/solid/eye-low-vision.svg",
		"svg-icons1082"
	],
	"./solid/eye-slash.svg": [
		"./src/collapse/svg/solid/eye-slash.svg",
		"svg-icons1083"
	],
	"./solid/eye.svg": [
		"./src/collapse/svg/solid/eye.svg",
		"svg-icons1084"
	],
	"./solid/f.svg": [
		"./src/collapse/svg/solid/f.svg",
		"svg-icons1085"
	],
	"./solid/face-angry.svg": [
		"./src/collapse/svg/solid/face-angry.svg",
		"svg-icons1086"
	],
	"./solid/face-dizzy.svg": [
		"./src/collapse/svg/solid/face-dizzy.svg",
		"svg-icons1087"
	],
	"./solid/face-flushed.svg": [
		"./src/collapse/svg/solid/face-flushed.svg",
		"svg-icons1088"
	],
	"./solid/face-frown-open.svg": [
		"./src/collapse/svg/solid/face-frown-open.svg",
		"svg-icons1089"
	],
	"./solid/face-frown.svg": [
		"./src/collapse/svg/solid/face-frown.svg",
		"svg-icons1090"
	],
	"./solid/face-grimace.svg": [
		"./src/collapse/svg/solid/face-grimace.svg",
		"svg-icons1091"
	],
	"./solid/face-grin-beam-sweat.svg": [
		"./src/collapse/svg/solid/face-grin-beam-sweat.svg",
		"svg-icons1092"
	],
	"./solid/face-grin-beam.svg": [
		"./src/collapse/svg/solid/face-grin-beam.svg",
		"svg-icons1093"
	],
	"./solid/face-grin-hearts.svg": [
		"./src/collapse/svg/solid/face-grin-hearts.svg",
		"svg-icons1094"
	],
	"./solid/face-grin-squint-tears.svg": [
		"./src/collapse/svg/solid/face-grin-squint-tears.svg",
		"svg-icons1095"
	],
	"./solid/face-grin-squint.svg": [
		"./src/collapse/svg/solid/face-grin-squint.svg",
		"svg-icons1096"
	],
	"./solid/face-grin-stars.svg": [
		"./src/collapse/svg/solid/face-grin-stars.svg",
		"svg-icons1097"
	],
	"./solid/face-grin-tears.svg": [
		"./src/collapse/svg/solid/face-grin-tears.svg",
		"svg-icons1098"
	],
	"./solid/face-grin-tongue-squint.svg": [
		"./src/collapse/svg/solid/face-grin-tongue-squint.svg",
		"svg-icons1099"
	],
	"./solid/face-grin-tongue-wink.svg": [
		"./src/collapse/svg/solid/face-grin-tongue-wink.svg",
		"svg-icons1100"
	],
	"./solid/face-grin-tongue.svg": [
		"./src/collapse/svg/solid/face-grin-tongue.svg",
		"svg-icons1101"
	],
	"./solid/face-grin-wide.svg": [
		"./src/collapse/svg/solid/face-grin-wide.svg",
		"svg-icons1102"
	],
	"./solid/face-grin-wink.svg": [
		"./src/collapse/svg/solid/face-grin-wink.svg",
		"svg-icons1103"
	],
	"./solid/face-grin.svg": [
		"./src/collapse/svg/solid/face-grin.svg",
		"svg-icons1104"
	],
	"./solid/face-kiss-beam.svg": [
		"./src/collapse/svg/solid/face-kiss-beam.svg",
		"svg-icons1105"
	],
	"./solid/face-kiss-wink-heart.svg": [
		"./src/collapse/svg/solid/face-kiss-wink-heart.svg",
		"svg-icons1106"
	],
	"./solid/face-kiss.svg": [
		"./src/collapse/svg/solid/face-kiss.svg",
		"svg-icons1107"
	],
	"./solid/face-laugh-beam.svg": [
		"./src/collapse/svg/solid/face-laugh-beam.svg",
		"svg-icons1108"
	],
	"./solid/face-laugh-squint.svg": [
		"./src/collapse/svg/solid/face-laugh-squint.svg",
		"svg-icons1109"
	],
	"./solid/face-laugh-wink.svg": [
		"./src/collapse/svg/solid/face-laugh-wink.svg",
		"svg-icons1110"
	],
	"./solid/face-laugh.svg": [
		"./src/collapse/svg/solid/face-laugh.svg",
		"svg-icons1111"
	],
	"./solid/face-meh-blank.svg": [
		"./src/collapse/svg/solid/face-meh-blank.svg",
		"svg-icons1112"
	],
	"./solid/face-meh.svg": [
		"./src/collapse/svg/solid/face-meh.svg",
		"svg-icons1113"
	],
	"./solid/face-rolling-eyes.svg": [
		"./src/collapse/svg/solid/face-rolling-eyes.svg",
		"svg-icons1114"
	],
	"./solid/face-sad-cry.svg": [
		"./src/collapse/svg/solid/face-sad-cry.svg",
		"svg-icons1115"
	],
	"./solid/face-sad-tear.svg": [
		"./src/collapse/svg/solid/face-sad-tear.svg",
		"svg-icons1116"
	],
	"./solid/face-smile-beam.svg": [
		"./src/collapse/svg/solid/face-smile-beam.svg",
		"svg-icons1117"
	],
	"./solid/face-smile-wink.svg": [
		"./src/collapse/svg/solid/face-smile-wink.svg",
		"svg-icons1118"
	],
	"./solid/face-smile.svg": [
		"./src/collapse/svg/solid/face-smile.svg",
		"svg-icons1119"
	],
	"./solid/face-surprise.svg": [
		"./src/collapse/svg/solid/face-surprise.svg",
		"svg-icons1120"
	],
	"./solid/face-tired.svg": [
		"./src/collapse/svg/solid/face-tired.svg",
		"svg-icons1121"
	],
	"./solid/fan.svg": [
		"./src/collapse/svg/solid/fan.svg",
		"svg-icons1122"
	],
	"./solid/faucet-drip.svg": [
		"./src/collapse/svg/solid/faucet-drip.svg",
		"svg-icons1123"
	],
	"./solid/faucet.svg": [
		"./src/collapse/svg/solid/faucet.svg",
		"svg-icons1124"
	],
	"./solid/fax.svg": [
		"./src/collapse/svg/solid/fax.svg",
		"svg-icons1125"
	],
	"./solid/feather-pointed.svg": [
		"./src/collapse/svg/solid/feather-pointed.svg",
		"svg-icons1126"
	],
	"./solid/feather.svg": [
		"./src/collapse/svg/solid/feather.svg",
		"svg-icons1127"
	],
	"./solid/ferry.svg": [
		"./src/collapse/svg/solid/ferry.svg",
		"svg-icons1128"
	],
	"./solid/file-arrow-down.svg": [
		"./src/collapse/svg/solid/file-arrow-down.svg",
		"svg-icons1129"
	],
	"./solid/file-arrow-up.svg": [
		"./src/collapse/svg/solid/file-arrow-up.svg",
		"svg-icons1130"
	],
	"./solid/file-audio.svg": [
		"./src/collapse/svg/solid/file-audio.svg",
		"svg-icons1131"
	],
	"./solid/file-circle-check.svg": [
		"./src/collapse/svg/solid/file-circle-check.svg",
		"svg-icons1132"
	],
	"./solid/file-circle-exclamation.svg": [
		"./src/collapse/svg/solid/file-circle-exclamation.svg",
		"svg-icons1133"
	],
	"./solid/file-circle-minus.svg": [
		"./src/collapse/svg/solid/file-circle-minus.svg",
		"svg-icons1134"
	],
	"./solid/file-circle-plus.svg": [
		"./src/collapse/svg/solid/file-circle-plus.svg",
		"svg-icons1135"
	],
	"./solid/file-circle-question.svg": [
		"./src/collapse/svg/solid/file-circle-question.svg",
		"svg-icons1136"
	],
	"./solid/file-circle-xmark.svg": [
		"./src/collapse/svg/solid/file-circle-xmark.svg",
		"svg-icons1137"
	],
	"./solid/file-code.svg": [
		"./src/collapse/svg/solid/file-code.svg",
		"svg-icons1138"
	],
	"./solid/file-contract.svg": [
		"./src/collapse/svg/solid/file-contract.svg",
		"svg-icons1139"
	],
	"./solid/file-csv.svg": [
		"./src/collapse/svg/solid/file-csv.svg",
		"svg-icons1140"
	],
	"./solid/file-excel.svg": [
		"./src/collapse/svg/solid/file-excel.svg",
		"svg-icons1141"
	],
	"./solid/file-export.svg": [
		"./src/collapse/svg/solid/file-export.svg",
		"svg-icons1142"
	],
	"./solid/file-image.svg": [
		"./src/collapse/svg/solid/file-image.svg",
		"svg-icons1143"
	],
	"./solid/file-import.svg": [
		"./src/collapse/svg/solid/file-import.svg",
		"svg-icons1144"
	],
	"./solid/file-invoice-dollar.svg": [
		"./src/collapse/svg/solid/file-invoice-dollar.svg",
		"svg-icons1145"
	],
	"./solid/file-invoice.svg": [
		"./src/collapse/svg/solid/file-invoice.svg",
		"svg-icons1146"
	],
	"./solid/file-lines.svg": [
		"./src/collapse/svg/solid/file-lines.svg",
		"svg-icons1147"
	],
	"./solid/file-medical.svg": [
		"./src/collapse/svg/solid/file-medical.svg",
		"svg-icons1148"
	],
	"./solid/file-pdf.svg": [
		"./src/collapse/svg/solid/file-pdf.svg",
		"svg-icons1149"
	],
	"./solid/file-pen.svg": [
		"./src/collapse/svg/solid/file-pen.svg",
		"svg-icons1150"
	],
	"./solid/file-powerpoint.svg": [
		"./src/collapse/svg/solid/file-powerpoint.svg",
		"svg-icons1151"
	],
	"./solid/file-prescription.svg": [
		"./src/collapse/svg/solid/file-prescription.svg",
		"svg-icons1152"
	],
	"./solid/file-shield.svg": [
		"./src/collapse/svg/solid/file-shield.svg",
		"svg-icons1153"
	],
	"./solid/file-signature.svg": [
		"./src/collapse/svg/solid/file-signature.svg",
		"svg-icons1154"
	],
	"./solid/file-video.svg": [
		"./src/collapse/svg/solid/file-video.svg",
		"svg-icons1155"
	],
	"./solid/file-waveform.svg": [
		"./src/collapse/svg/solid/file-waveform.svg",
		"svg-icons1156"
	],
	"./solid/file-word.svg": [
		"./src/collapse/svg/solid/file-word.svg",
		"svg-icons1157"
	],
	"./solid/file-zipper.svg": [
		"./src/collapse/svg/solid/file-zipper.svg",
		"svg-icons1158"
	],
	"./solid/file.svg": [
		"./src/collapse/svg/solid/file.svg",
		"svg-icons1159"
	],
	"./solid/fill-drip.svg": [
		"./src/collapse/svg/solid/fill-drip.svg",
		"svg-icons1160"
	],
	"./solid/fill.svg": [
		"./src/collapse/svg/solid/fill.svg",
		"svg-icons1161"
	],
	"./solid/film.svg": [
		"./src/collapse/svg/solid/film.svg",
		"svg-icons1162"
	],
	"./solid/filter-circle-dollar.svg": [
		"./src/collapse/svg/solid/filter-circle-dollar.svg",
		"svg-icons1163"
	],
	"./solid/filter-circle-xmark.svg": [
		"./src/collapse/svg/solid/filter-circle-xmark.svg",
		"svg-icons1164"
	],
	"./solid/filter.svg": [
		"./src/collapse/svg/solid/filter.svg",
		"svg-icons1165"
	],
	"./solid/fingerprint.svg": [
		"./src/collapse/svg/solid/fingerprint.svg",
		"svg-icons1166"
	],
	"./solid/fire-burner.svg": [
		"./src/collapse/svg/solid/fire-burner.svg",
		"svg-icons1167"
	],
	"./solid/fire-extinguisher.svg": [
		"./src/collapse/svg/solid/fire-extinguisher.svg",
		"svg-icons1168"
	],
	"./solid/fire-flame-curved.svg": [
		"./src/collapse/svg/solid/fire-flame-curved.svg",
		"svg-icons1169"
	],
	"./solid/fire-flame-simple.svg": [
		"./src/collapse/svg/solid/fire-flame-simple.svg",
		"svg-icons1170"
	],
	"./solid/fire.svg": [
		"./src/collapse/svg/solid/fire.svg",
		"svg-icons1171"
	],
	"./solid/fish-fins.svg": [
		"./src/collapse/svg/solid/fish-fins.svg",
		"svg-icons1172"
	],
	"./solid/fish.svg": [
		"./src/collapse/svg/solid/fish.svg",
		"svg-icons1173"
	],
	"./solid/flag-checkered.svg": [
		"./src/collapse/svg/solid/flag-checkered.svg",
		"svg-icons1174"
	],
	"./solid/flag-usa.svg": [
		"./src/collapse/svg/solid/flag-usa.svg",
		"svg-icons1175"
	],
	"./solid/flag.svg": [
		"./src/collapse/svg/solid/flag.svg",
		"svg-icons1176"
	],
	"./solid/flask-vial.svg": [
		"./src/collapse/svg/solid/flask-vial.svg",
		"svg-icons1177"
	],
	"./solid/flask.svg": [
		"./src/collapse/svg/solid/flask.svg",
		"svg-icons1178"
	],
	"./solid/floppy-disk.svg": [
		"./src/collapse/svg/solid/floppy-disk.svg",
		"svg-icons1179"
	],
	"./solid/florin-sign.svg": [
		"./src/collapse/svg/solid/florin-sign.svg",
		"svg-icons1180"
	],
	"./solid/folder-closed.svg": [
		"./src/collapse/svg/solid/folder-closed.svg",
		"svg-icons1181"
	],
	"./solid/folder-minus.svg": [
		"./src/collapse/svg/solid/folder-minus.svg",
		"svg-icons1182"
	],
	"./solid/folder-open.svg": [
		"./src/collapse/svg/solid/folder-open.svg",
		"svg-icons1183"
	],
	"./solid/folder-plus.svg": [
		"./src/collapse/svg/solid/folder-plus.svg",
		"svg-icons1184"
	],
	"./solid/folder-tree.svg": [
		"./src/collapse/svg/solid/folder-tree.svg",
		"svg-icons1185"
	],
	"./solid/folder.svg": [
		"./src/collapse/svg/solid/folder.svg",
		"svg-icons1186"
	],
	"./solid/font-awesome.svg": [
		"./src/collapse/svg/solid/font-awesome.svg",
		"svg-icons1187"
	],
	"./solid/font.svg": [
		"./src/collapse/svg/solid/font.svg",
		"svg-icons1188"
	],
	"./solid/football.svg": [
		"./src/collapse/svg/solid/football.svg",
		"svg-icons1189"
	],
	"./solid/forward-fast.svg": [
		"./src/collapse/svg/solid/forward-fast.svg",
		"svg-icons1190"
	],
	"./solid/forward-step.svg": [
		"./src/collapse/svg/solid/forward-step.svg",
		"svg-icons1191"
	],
	"./solid/forward.svg": [
		"./src/collapse/svg/solid/forward.svg",
		"svg-icons1192"
	],
	"./solid/franc-sign.svg": [
		"./src/collapse/svg/solid/franc-sign.svg",
		"svg-icons1193"
	],
	"./solid/frog.svg": [
		"./src/collapse/svg/solid/frog.svg",
		"svg-icons1194"
	],
	"./solid/futbol.svg": [
		"./src/collapse/svg/solid/futbol.svg",
		"svg-icons1195"
	],
	"./solid/g.svg": [
		"./src/collapse/svg/solid/g.svg",
		"svg-icons1196"
	],
	"./solid/gamepad.svg": [
		"./src/collapse/svg/solid/gamepad.svg",
		"svg-icons1197"
	],
	"./solid/gas-pump.svg": [
		"./src/collapse/svg/solid/gas-pump.svg",
		"svg-icons1198"
	],
	"./solid/gauge-high.svg": [
		"./src/collapse/svg/solid/gauge-high.svg",
		"svg-icons1199"
	],
	"./solid/gauge-simple-high.svg": [
		"./src/collapse/svg/solid/gauge-simple-high.svg",
		"svg-icons1200"
	],
	"./solid/gauge-simple.svg": [
		"./src/collapse/svg/solid/gauge-simple.svg",
		"svg-icons1201"
	],
	"./solid/gauge.svg": [
		"./src/collapse/svg/solid/gauge.svg",
		"svg-icons1202"
	],
	"./solid/gavel.svg": [
		"./src/collapse/svg/solid/gavel.svg",
		"svg-icons1203"
	],
	"./solid/gear.svg": [
		"./src/collapse/svg/solid/gear.svg",
		"svg-icons1204"
	],
	"./solid/gears.svg": [
		"./src/collapse/svg/solid/gears.svg",
		"svg-icons1205"
	],
	"./solid/gem.svg": [
		"./src/collapse/svg/solid/gem.svg",
		"svg-icons1206"
	],
	"./solid/genderless.svg": [
		"./src/collapse/svg/solid/genderless.svg",
		"svg-icons1207"
	],
	"./solid/ghost.svg": [
		"./src/collapse/svg/solid/ghost.svg",
		"svg-icons1208"
	],
	"./solid/gift.svg": [
		"./src/collapse/svg/solid/gift.svg",
		"svg-icons1209"
	],
	"./solid/gifts.svg": [
		"./src/collapse/svg/solid/gifts.svg",
		"svg-icons1210"
	],
	"./solid/glass-water-droplet.svg": [
		"./src/collapse/svg/solid/glass-water-droplet.svg",
		"svg-icons1211"
	],
	"./solid/glass-water.svg": [
		"./src/collapse/svg/solid/glass-water.svg",
		"svg-icons1212"
	],
	"./solid/glasses.svg": [
		"./src/collapse/svg/solid/glasses.svg",
		"svg-icons1213"
	],
	"./solid/globe.svg": [
		"./src/collapse/svg/solid/globe.svg",
		"svg-icons1214"
	],
	"./solid/golf-ball-tee.svg": [
		"./src/collapse/svg/solid/golf-ball-tee.svg",
		"svg-icons1215"
	],
	"./solid/gopuram.svg": [
		"./src/collapse/svg/solid/gopuram.svg",
		"svg-icons1216"
	],
	"./solid/graduation-cap.svg": [
		"./src/collapse/svg/solid/graduation-cap.svg",
		"svg-icons1217"
	],
	"./solid/greater-than-equal.svg": [
		"./src/collapse/svg/solid/greater-than-equal.svg",
		"svg-icons1218"
	],
	"./solid/greater-than.svg": [
		"./src/collapse/svg/solid/greater-than.svg",
		"svg-icons1219"
	],
	"./solid/grip-lines-vertical.svg": [
		"./src/collapse/svg/solid/grip-lines-vertical.svg",
		"svg-icons1220"
	],
	"./solid/grip-lines.svg": [
		"./src/collapse/svg/solid/grip-lines.svg",
		"svg-icons1221"
	],
	"./solid/grip-vertical.svg": [
		"./src/collapse/svg/solid/grip-vertical.svg",
		"svg-icons1222"
	],
	"./solid/grip.svg": [
		"./src/collapse/svg/solid/grip.svg",
		"svg-icons1223"
	],
	"./solid/group-arrows-rotate.svg": [
		"./src/collapse/svg/solid/group-arrows-rotate.svg",
		"svg-icons1224"
	],
	"./solid/guarani-sign.svg": [
		"./src/collapse/svg/solid/guarani-sign.svg",
		"svg-icons1225"
	],
	"./solid/guitar.svg": [
		"./src/collapse/svg/solid/guitar.svg",
		"svg-icons1226"
	],
	"./solid/gun.svg": [
		"./src/collapse/svg/solid/gun.svg",
		"svg-icons1227"
	],
	"./solid/h.svg": [
		"./src/collapse/svg/solid/h.svg",
		"svg-icons1228"
	],
	"./solid/hammer.svg": [
		"./src/collapse/svg/solid/hammer.svg",
		"svg-icons1229"
	],
	"./solid/hamsa.svg": [
		"./src/collapse/svg/solid/hamsa.svg",
		"svg-icons1230"
	],
	"./solid/hand-back-fist.svg": [
		"./src/collapse/svg/solid/hand-back-fist.svg",
		"svg-icons1231"
	],
	"./solid/hand-dots.svg": [
		"./src/collapse/svg/solid/hand-dots.svg",
		"svg-icons1232"
	],
	"./solid/hand-fist.svg": [
		"./src/collapse/svg/solid/hand-fist.svg",
		"svg-icons1233"
	],
	"./solid/hand-holding-dollar.svg": [
		"./src/collapse/svg/solid/hand-holding-dollar.svg",
		"svg-icons1234"
	],
	"./solid/hand-holding-droplet.svg": [
		"./src/collapse/svg/solid/hand-holding-droplet.svg",
		"svg-icons1235"
	],
	"./solid/hand-holding-hand.svg": [
		"./src/collapse/svg/solid/hand-holding-hand.svg",
		"svg-icons1236"
	],
	"./solid/hand-holding-heart.svg": [
		"./src/collapse/svg/solid/hand-holding-heart.svg",
		"svg-icons1237"
	],
	"./solid/hand-holding-medical.svg": [
		"./src/collapse/svg/solid/hand-holding-medical.svg",
		"svg-icons1238"
	],
	"./solid/hand-holding.svg": [
		"./src/collapse/svg/solid/hand-holding.svg",
		"svg-icons1239"
	],
	"./solid/hand-lizard.svg": [
		"./src/collapse/svg/solid/hand-lizard.svg",
		"svg-icons1240"
	],
	"./solid/hand-middle-finger.svg": [
		"./src/collapse/svg/solid/hand-middle-finger.svg",
		"svg-icons1241"
	],
	"./solid/hand-peace.svg": [
		"./src/collapse/svg/solid/hand-peace.svg",
		"svg-icons1242"
	],
	"./solid/hand-point-down.svg": [
		"./src/collapse/svg/solid/hand-point-down.svg",
		"svg-icons1243"
	],
	"./solid/hand-point-left.svg": [
		"./src/collapse/svg/solid/hand-point-left.svg",
		"svg-icons1244"
	],
	"./solid/hand-point-right.svg": [
		"./src/collapse/svg/solid/hand-point-right.svg",
		"svg-icons1245"
	],
	"./solid/hand-point-up.svg": [
		"./src/collapse/svg/solid/hand-point-up.svg",
		"svg-icons1246"
	],
	"./solid/hand-pointer.svg": [
		"./src/collapse/svg/solid/hand-pointer.svg",
		"svg-icons1247"
	],
	"./solid/hand-scissors.svg": [
		"./src/collapse/svg/solid/hand-scissors.svg",
		"svg-icons1248"
	],
	"./solid/hand-sparkles.svg": [
		"./src/collapse/svg/solid/hand-sparkles.svg",
		"svg-icons1249"
	],
	"./solid/hand-spock.svg": [
		"./src/collapse/svg/solid/hand-spock.svg",
		"svg-icons1250"
	],
	"./solid/hand.svg": [
		"./src/collapse/svg/solid/hand.svg",
		"svg-icons1251"
	],
	"./solid/handcuffs.svg": [
		"./src/collapse/svg/solid/handcuffs.svg",
		"svg-icons1252"
	],
	"./solid/hands-asl-interpreting.svg": [
		"./src/collapse/svg/solid/hands-asl-interpreting.svg",
		"svg-icons1253"
	],
	"./solid/hands-bound.svg": [
		"./src/collapse/svg/solid/hands-bound.svg",
		"svg-icons1254"
	],
	"./solid/hands-bubbles.svg": [
		"./src/collapse/svg/solid/hands-bubbles.svg",
		"svg-icons1255"
	],
	"./solid/hands-clapping.svg": [
		"./src/collapse/svg/solid/hands-clapping.svg",
		"svg-icons1256"
	],
	"./solid/hands-holding-child.svg": [
		"./src/collapse/svg/solid/hands-holding-child.svg",
		"svg-icons1257"
	],
	"./solid/hands-holding-circle.svg": [
		"./src/collapse/svg/solid/hands-holding-circle.svg",
		"svg-icons1258"
	],
	"./solid/hands-holding.svg": [
		"./src/collapse/svg/solid/hands-holding.svg",
		"svg-icons1259"
	],
	"./solid/hands-praying.svg": [
		"./src/collapse/svg/solid/hands-praying.svg",
		"svg-icons1260"
	],
	"./solid/hands.svg": [
		"./src/collapse/svg/solid/hands.svg",
		"svg-icons1261"
	],
	"./solid/handshake-angle.svg": [
		"./src/collapse/svg/solid/handshake-angle.svg",
		"svg-icons1262"
	],
	"./solid/handshake-simple-slash.svg": [
		"./src/collapse/svg/solid/handshake-simple-slash.svg",
		"svg-icons1263"
	],
	"./solid/handshake-simple.svg": [
		"./src/collapse/svg/solid/handshake-simple.svg",
		"svg-icons1264"
	],
	"./solid/handshake-slash.svg": [
		"./src/collapse/svg/solid/handshake-slash.svg",
		"svg-icons1265"
	],
	"./solid/handshake.svg": [
		"./src/collapse/svg/solid/handshake.svg",
		"svg-icons1266"
	],
	"./solid/hanukiah.svg": [
		"./src/collapse/svg/solid/hanukiah.svg",
		"svg-icons1267"
	],
	"./solid/hard-drive.svg": [
		"./src/collapse/svg/solid/hard-drive.svg",
		"svg-icons1268"
	],
	"./solid/hashtag.svg": [
		"./src/collapse/svg/solid/hashtag.svg",
		"svg-icons1269"
	],
	"./solid/hat-cowboy-side.svg": [
		"./src/collapse/svg/solid/hat-cowboy-side.svg",
		"svg-icons1270"
	],
	"./solid/hat-cowboy.svg": [
		"./src/collapse/svg/solid/hat-cowboy.svg",
		"svg-icons1271"
	],
	"./solid/hat-wizard.svg": [
		"./src/collapse/svg/solid/hat-wizard.svg",
		"svg-icons1272"
	],
	"./solid/head-side-cough-slash.svg": [
		"./src/collapse/svg/solid/head-side-cough-slash.svg",
		"svg-icons1273"
	],
	"./solid/head-side-cough.svg": [
		"./src/collapse/svg/solid/head-side-cough.svg",
		"svg-icons1274"
	],
	"./solid/head-side-mask.svg": [
		"./src/collapse/svg/solid/head-side-mask.svg",
		"svg-icons1275"
	],
	"./solid/head-side-virus.svg": [
		"./src/collapse/svg/solid/head-side-virus.svg",
		"svg-icons1276"
	],
	"./solid/heading.svg": [
		"./src/collapse/svg/solid/heading.svg",
		"svg-icons1277"
	],
	"./solid/headphones-simple.svg": [
		"./src/collapse/svg/solid/headphones-simple.svg",
		"svg-icons1278"
	],
	"./solid/headphones.svg": [
		"./src/collapse/svg/solid/headphones.svg",
		"svg-icons1279"
	],
	"./solid/headset.svg": [
		"./src/collapse/svg/solid/headset.svg",
		"svg-icons1280"
	],
	"./solid/heart-circle-bolt.svg": [
		"./src/collapse/svg/solid/heart-circle-bolt.svg",
		"svg-icons1281"
	],
	"./solid/heart-circle-check.svg": [
		"./src/collapse/svg/solid/heart-circle-check.svg",
		"svg-icons1282"
	],
	"./solid/heart-circle-exclamation.svg": [
		"./src/collapse/svg/solid/heart-circle-exclamation.svg",
		"svg-icons1283"
	],
	"./solid/heart-circle-minus.svg": [
		"./src/collapse/svg/solid/heart-circle-minus.svg",
		"svg-icons1284"
	],
	"./solid/heart-circle-plus.svg": [
		"./src/collapse/svg/solid/heart-circle-plus.svg",
		"svg-icons1285"
	],
	"./solid/heart-circle-xmark.svg": [
		"./src/collapse/svg/solid/heart-circle-xmark.svg",
		"svg-icons1286"
	],
	"./solid/heart-crack.svg": [
		"./src/collapse/svg/solid/heart-crack.svg",
		"svg-icons1287"
	],
	"./solid/heart-pulse.svg": [
		"./src/collapse/svg/solid/heart-pulse.svg",
		"svg-icons1288"
	],
	"./solid/heart.svg": [
		"./src/collapse/svg/solid/heart.svg",
		"svg-icons1289"
	],
	"./solid/helicopter-symbol.svg": [
		"./src/collapse/svg/solid/helicopter-symbol.svg",
		"svg-icons1290"
	],
	"./solid/helicopter.svg": [
		"./src/collapse/svg/solid/helicopter.svg",
		"svg-icons1291"
	],
	"./solid/helmet-safety.svg": [
		"./src/collapse/svg/solid/helmet-safety.svg",
		"svg-icons1292"
	],
	"./solid/helmet-un.svg": [
		"./src/collapse/svg/solid/helmet-un.svg",
		"svg-icons1293"
	],
	"./solid/highlighter.svg": [
		"./src/collapse/svg/solid/highlighter.svg",
		"svg-icons1294"
	],
	"./solid/hill-avalanche.svg": [
		"./src/collapse/svg/solid/hill-avalanche.svg",
		"svg-icons1295"
	],
	"./solid/hill-rockslide.svg": [
		"./src/collapse/svg/solid/hill-rockslide.svg",
		"svg-icons1296"
	],
	"./solid/hippo.svg": [
		"./src/collapse/svg/solid/hippo.svg",
		"svg-icons1297"
	],
	"./solid/hockey-puck.svg": [
		"./src/collapse/svg/solid/hockey-puck.svg",
		"svg-icons1298"
	],
	"./solid/holly-berry.svg": [
		"./src/collapse/svg/solid/holly-berry.svg",
		"svg-icons1299"
	],
	"./solid/horse-head.svg": [
		"./src/collapse/svg/solid/horse-head.svg",
		"svg-icons1300"
	],
	"./solid/horse.svg": [
		"./src/collapse/svg/solid/horse.svg",
		"svg-icons1301"
	],
	"./solid/hospital-user.svg": [
		"./src/collapse/svg/solid/hospital-user.svg",
		"svg-icons1302"
	],
	"./solid/hospital.svg": [
		"./src/collapse/svg/solid/hospital.svg",
		"svg-icons1303"
	],
	"./solid/hot-tub-person.svg": [
		"./src/collapse/svg/solid/hot-tub-person.svg",
		"svg-icons1304"
	],
	"./solid/hotdog.svg": [
		"./src/collapse/svg/solid/hotdog.svg",
		"svg-icons1305"
	],
	"./solid/hotel.svg": [
		"./src/collapse/svg/solid/hotel.svg",
		"svg-icons1306"
	],
	"./solid/hourglass-end.svg": [
		"./src/collapse/svg/solid/hourglass-end.svg",
		"svg-icons1307"
	],
	"./solid/hourglass-half.svg": [
		"./src/collapse/svg/solid/hourglass-half.svg",
		"svg-icons1308"
	],
	"./solid/hourglass-start.svg": [
		"./src/collapse/svg/solid/hourglass-start.svg",
		"svg-icons1309"
	],
	"./solid/hourglass.svg": [
		"./src/collapse/svg/solid/hourglass.svg",
		"svg-icons1310"
	],
	"./solid/house-chimney-crack.svg": [
		"./src/collapse/svg/solid/house-chimney-crack.svg",
		"svg-icons1311"
	],
	"./solid/house-chimney-medical.svg": [
		"./src/collapse/svg/solid/house-chimney-medical.svg",
		"svg-icons1312"
	],
	"./solid/house-chimney-user.svg": [
		"./src/collapse/svg/solid/house-chimney-user.svg",
		"svg-icons1313"
	],
	"./solid/house-chimney-window.svg": [
		"./src/collapse/svg/solid/house-chimney-window.svg",
		"svg-icons1314"
	],
	"./solid/house-chimney.svg": [
		"./src/collapse/svg/solid/house-chimney.svg",
		"svg-icons1315"
	],
	"./solid/house-circle-check.svg": [
		"./src/collapse/svg/solid/house-circle-check.svg",
		"svg-icons1316"
	],
	"./solid/house-circle-exclamation.svg": [
		"./src/collapse/svg/solid/house-circle-exclamation.svg",
		"svg-icons1317"
	],
	"./solid/house-circle-xmark.svg": [
		"./src/collapse/svg/solid/house-circle-xmark.svg",
		"svg-icons1318"
	],
	"./solid/house-crack.svg": [
		"./src/collapse/svg/solid/house-crack.svg",
		"svg-icons1319"
	],
	"./solid/house-fire.svg": [
		"./src/collapse/svg/solid/house-fire.svg",
		"svg-icons1320"
	],
	"./solid/house-flag.svg": [
		"./src/collapse/svg/solid/house-flag.svg",
		"svg-icons1321"
	],
	"./solid/house-flood-water-circle-arrow-right.svg": [
		"./src/collapse/svg/solid/house-flood-water-circle-arrow-right.svg",
		"svg-icons1322"
	],
	"./solid/house-flood-water.svg": [
		"./src/collapse/svg/solid/house-flood-water.svg",
		"svg-icons1323"
	],
	"./solid/house-laptop.svg": [
		"./src/collapse/svg/solid/house-laptop.svg",
		"svg-icons1324"
	],
	"./solid/house-lock.svg": [
		"./src/collapse/svg/solid/house-lock.svg",
		"svg-icons1325"
	],
	"./solid/house-medical-circle-check.svg": [
		"./src/collapse/svg/solid/house-medical-circle-check.svg",
		"svg-icons1326"
	],
	"./solid/house-medical-circle-exclamation.svg": [
		"./src/collapse/svg/solid/house-medical-circle-exclamation.svg",
		"svg-icons1327"
	],
	"./solid/house-medical-circle-xmark.svg": [
		"./src/collapse/svg/solid/house-medical-circle-xmark.svg",
		"svg-icons1328"
	],
	"./solid/house-medical-flag.svg": [
		"./src/collapse/svg/solid/house-medical-flag.svg",
		"svg-icons1329"
	],
	"./solid/house-medical.svg": [
		"./src/collapse/svg/solid/house-medical.svg",
		"svg-icons1330"
	],
	"./solid/house-signal.svg": [
		"./src/collapse/svg/solid/house-signal.svg",
		"svg-icons1331"
	],
	"./solid/house-tsunami.svg": [
		"./src/collapse/svg/solid/house-tsunami.svg",
		"svg-icons1332"
	],
	"./solid/house-user.svg": [
		"./src/collapse/svg/solid/house-user.svg",
		"svg-icons1333"
	],
	"./solid/house.svg": [
		"./src/collapse/svg/solid/house.svg",
		"svg-icons1334"
	],
	"./solid/hryvnia-sign.svg": [
		"./src/collapse/svg/solid/hryvnia-sign.svg",
		"svg-icons1335"
	],
	"./solid/hurricane.svg": [
		"./src/collapse/svg/solid/hurricane.svg",
		"svg-icons1336"
	],
	"./solid/i-cursor.svg": [
		"./src/collapse/svg/solid/i-cursor.svg",
		"svg-icons1337"
	],
	"./solid/i.svg": [
		"./src/collapse/svg/solid/i.svg",
		"svg-icons1338"
	],
	"./solid/ice-cream.svg": [
		"./src/collapse/svg/solid/ice-cream.svg",
		"svg-icons1339"
	],
	"./solid/icicles.svg": [
		"./src/collapse/svg/solid/icicles.svg",
		"svg-icons1340"
	],
	"./solid/icons.svg": [
		"./src/collapse/svg/solid/icons.svg",
		"svg-icons1341"
	],
	"./solid/id-badge.svg": [
		"./src/collapse/svg/solid/id-badge.svg",
		"svg-icons1342"
	],
	"./solid/id-card-clip.svg": [
		"./src/collapse/svg/solid/id-card-clip.svg",
		"svg-icons1343"
	],
	"./solid/id-card.svg": [
		"./src/collapse/svg/solid/id-card.svg",
		"svg-icons1344"
	],
	"./solid/igloo.svg": [
		"./src/collapse/svg/solid/igloo.svg",
		"svg-icons1345"
	],
	"./solid/image-portrait.svg": [
		"./src/collapse/svg/solid/image-portrait.svg",
		"svg-icons1346"
	],
	"./solid/image.svg": [
		"./src/collapse/svg/solid/image.svg",
		"svg-icons1347"
	],
	"./solid/images.svg": [
		"./src/collapse/svg/solid/images.svg",
		"svg-icons1348"
	],
	"./solid/inbox.svg": [
		"./src/collapse/svg/solid/inbox.svg",
		"svg-icons1349"
	],
	"./solid/indent.svg": [
		"./src/collapse/svg/solid/indent.svg",
		"svg-icons1350"
	],
	"./solid/indian-rupee-sign.svg": [
		"./src/collapse/svg/solid/indian-rupee-sign.svg",
		"svg-icons1351"
	],
	"./solid/industry.svg": [
		"./src/collapse/svg/solid/industry.svg",
		"svg-icons1352"
	],
	"./solid/infinity.svg": [
		"./src/collapse/svg/solid/infinity.svg",
		"svg-icons1353"
	],
	"./solid/info.svg": [
		"./src/collapse/svg/solid/info.svg",
		"svg-icons1354"
	],
	"./solid/italic.svg": [
		"./src/collapse/svg/solid/italic.svg",
		"svg-icons1355"
	],
	"./solid/j.svg": [
		"./src/collapse/svg/solid/j.svg",
		"svg-icons1356"
	],
	"./solid/jar-wheat.svg": [
		"./src/collapse/svg/solid/jar-wheat.svg",
		"svg-icons1357"
	],
	"./solid/jar.svg": [
		"./src/collapse/svg/solid/jar.svg",
		"svg-icons1358"
	],
	"./solid/jedi.svg": [
		"./src/collapse/svg/solid/jedi.svg",
		"svg-icons1359"
	],
	"./solid/jet-fighter-up.svg": [
		"./src/collapse/svg/solid/jet-fighter-up.svg",
		"svg-icons1360"
	],
	"./solid/jet-fighter.svg": [
		"./src/collapse/svg/solid/jet-fighter.svg",
		"svg-icons1361"
	],
	"./solid/joint.svg": [
		"./src/collapse/svg/solid/joint.svg",
		"svg-icons1362"
	],
	"./solid/jug-detergent.svg": [
		"./src/collapse/svg/solid/jug-detergent.svg",
		"svg-icons1363"
	],
	"./solid/k.svg": [
		"./src/collapse/svg/solid/k.svg",
		"svg-icons1364"
	],
	"./solid/kaaba.svg": [
		"./src/collapse/svg/solid/kaaba.svg",
		"svg-icons1365"
	],
	"./solid/key.svg": [
		"./src/collapse/svg/solid/key.svg",
		"svg-icons1366"
	],
	"./solid/keyboard.svg": [
		"./src/collapse/svg/solid/keyboard.svg",
		"svg-icons1367"
	],
	"./solid/khanda.svg": [
		"./src/collapse/svg/solid/khanda.svg",
		"svg-icons1368"
	],
	"./solid/kip-sign.svg": [
		"./src/collapse/svg/solid/kip-sign.svg",
		"svg-icons1369"
	],
	"./solid/kit-medical.svg": [
		"./src/collapse/svg/solid/kit-medical.svg",
		"svg-icons1370"
	],
	"./solid/kitchen-set.svg": [
		"./src/collapse/svg/solid/kitchen-set.svg",
		"svg-icons1371"
	],
	"./solid/kiwi-bird.svg": [
		"./src/collapse/svg/solid/kiwi-bird.svg",
		"svg-icons1372"
	],
	"./solid/l.svg": [
		"./src/collapse/svg/solid/l.svg",
		"svg-icons1373"
	],
	"./solid/land-mine-on.svg": [
		"./src/collapse/svg/solid/land-mine-on.svg",
		"svg-icons1374"
	],
	"./solid/landmark-dome.svg": [
		"./src/collapse/svg/solid/landmark-dome.svg",
		"svg-icons1375"
	],
	"./solid/landmark-flag.svg": [
		"./src/collapse/svg/solid/landmark-flag.svg",
		"svg-icons1376"
	],
	"./solid/landmark.svg": [
		"./src/collapse/svg/solid/landmark.svg",
		"svg-icons1377"
	],
	"./solid/language.svg": [
		"./src/collapse/svg/solid/language.svg",
		"svg-icons1378"
	],
	"./solid/laptop-code.svg": [
		"./src/collapse/svg/solid/laptop-code.svg",
		"svg-icons1379"
	],
	"./solid/laptop-file.svg": [
		"./src/collapse/svg/solid/laptop-file.svg",
		"svg-icons1380"
	],
	"./solid/laptop-medical.svg": [
		"./src/collapse/svg/solid/laptop-medical.svg",
		"svg-icons1381"
	],
	"./solid/laptop.svg": [
		"./src/collapse/svg/solid/laptop.svg",
		"svg-icons1382"
	],
	"./solid/lari-sign.svg": [
		"./src/collapse/svg/solid/lari-sign.svg",
		"svg-icons1383"
	],
	"./solid/layer-group.svg": [
		"./src/collapse/svg/solid/layer-group.svg",
		"svg-icons1384"
	],
	"./solid/leaf.svg": [
		"./src/collapse/svg/solid/leaf.svg",
		"svg-icons1385"
	],
	"./solid/left-long.svg": [
		"./src/collapse/svg/solid/left-long.svg",
		"svg-icons1386"
	],
	"./solid/left-right.svg": [
		"./src/collapse/svg/solid/left-right.svg",
		"svg-icons1387"
	],
	"./solid/lemon.svg": [
		"./src/collapse/svg/solid/lemon.svg",
		"svg-icons1388"
	],
	"./solid/less-than-equal.svg": [
		"./src/collapse/svg/solid/less-than-equal.svg",
		"svg-icons1389"
	],
	"./solid/less-than.svg": [
		"./src/collapse/svg/solid/less-than.svg",
		"svg-icons1390"
	],
	"./solid/life-ring.svg": [
		"./src/collapse/svg/solid/life-ring.svg",
		"svg-icons1391"
	],
	"./solid/lightbulb.svg": [
		"./src/collapse/svg/solid/lightbulb.svg",
		"svg-icons1392"
	],
	"./solid/lines-leaning.svg": [
		"./src/collapse/svg/solid/lines-leaning.svg",
		"svg-icons1393"
	],
	"./solid/link-slash.svg": [
		"./src/collapse/svg/solid/link-slash.svg",
		"svg-icons1394"
	],
	"./solid/link.svg": [
		"./src/collapse/svg/solid/link.svg",
		"svg-icons1395"
	],
	"./solid/lira-sign.svg": [
		"./src/collapse/svg/solid/lira-sign.svg",
		"svg-icons1396"
	],
	"./solid/list-check.svg": [
		"./src/collapse/svg/solid/list-check.svg",
		"svg-icons1397"
	],
	"./solid/list-ol.svg": [
		"./src/collapse/svg/solid/list-ol.svg",
		"svg-icons1398"
	],
	"./solid/list-ul.svg": [
		"./src/collapse/svg/solid/list-ul.svg",
		"svg-icons1399"
	],
	"./solid/list.svg": [
		"./src/collapse/svg/solid/list.svg",
		"svg-icons1400"
	],
	"./solid/litecoin-sign.svg": [
		"./src/collapse/svg/solid/litecoin-sign.svg",
		"svg-icons1401"
	],
	"./solid/location-arrow.svg": [
		"./src/collapse/svg/solid/location-arrow.svg",
		"svg-icons1402"
	],
	"./solid/location-crosshairs.svg": [
		"./src/collapse/svg/solid/location-crosshairs.svg",
		"svg-icons1403"
	],
	"./solid/location-dot.svg": [
		"./src/collapse/svg/solid/location-dot.svg",
		"svg-icons1404"
	],
	"./solid/location-pin-lock.svg": [
		"./src/collapse/svg/solid/location-pin-lock.svg",
		"svg-icons1405"
	],
	"./solid/location-pin.svg": [
		"./src/collapse/svg/solid/location-pin.svg",
		"svg-icons1406"
	],
	"./solid/lock-open.svg": [
		"./src/collapse/svg/solid/lock-open.svg",
		"svg-icons1407"
	],
	"./solid/lock.svg": [
		"./src/collapse/svg/solid/lock.svg",
		"svg-icons1408"
	],
	"./solid/locust.svg": [
		"./src/collapse/svg/solid/locust.svg",
		"svg-icons1409"
	],
	"./solid/lungs-virus.svg": [
		"./src/collapse/svg/solid/lungs-virus.svg",
		"svg-icons1410"
	],
	"./solid/lungs.svg": [
		"./src/collapse/svg/solid/lungs.svg",
		"svg-icons1411"
	],
	"./solid/m.svg": [
		"./src/collapse/svg/solid/m.svg",
		"svg-icons1412"
	],
	"./solid/magnet.svg": [
		"./src/collapse/svg/solid/magnet.svg",
		"svg-icons1413"
	],
	"./solid/magnifying-glass-arrow-right.svg": [
		"./src/collapse/svg/solid/magnifying-glass-arrow-right.svg",
		"svg-icons1414"
	],
	"./solid/magnifying-glass-chart.svg": [
		"./src/collapse/svg/solid/magnifying-glass-chart.svg",
		"svg-icons1415"
	],
	"./solid/magnifying-glass-dollar.svg": [
		"./src/collapse/svg/solid/magnifying-glass-dollar.svg",
		"svg-icons1416"
	],
	"./solid/magnifying-glass-location.svg": [
		"./src/collapse/svg/solid/magnifying-glass-location.svg",
		"svg-icons1417"
	],
	"./solid/magnifying-glass-minus.svg": [
		"./src/collapse/svg/solid/magnifying-glass-minus.svg",
		"svg-icons1418"
	],
	"./solid/magnifying-glass-plus.svg": [
		"./src/collapse/svg/solid/magnifying-glass-plus.svg",
		"svg-icons1419"
	],
	"./solid/magnifying-glass.svg": [
		"./src/collapse/svg/solid/magnifying-glass.svg",
		"svg-icons1420"
	],
	"./solid/manat-sign.svg": [
		"./src/collapse/svg/solid/manat-sign.svg",
		"svg-icons1421"
	],
	"./solid/map-location-dot.svg": [
		"./src/collapse/svg/solid/map-location-dot.svg",
		"svg-icons1422"
	],
	"./solid/map-location.svg": [
		"./src/collapse/svg/solid/map-location.svg",
		"svg-icons1423"
	],
	"./solid/map-pin.svg": [
		"./src/collapse/svg/solid/map-pin.svg",
		"svg-icons1424"
	],
	"./solid/map.svg": [
		"./src/collapse/svg/solid/map.svg",
		"svg-icons1425"
	],
	"./solid/marker.svg": [
		"./src/collapse/svg/solid/marker.svg",
		"svg-icons1426"
	],
	"./solid/mars-and-venus-burst.svg": [
		"./src/collapse/svg/solid/mars-and-venus-burst.svg",
		"svg-icons1427"
	],
	"./solid/mars-and-venus.svg": [
		"./src/collapse/svg/solid/mars-and-venus.svg",
		"svg-icons1428"
	],
	"./solid/mars-double.svg": [
		"./src/collapse/svg/solid/mars-double.svg",
		"svg-icons1429"
	],
	"./solid/mars-stroke-right.svg": [
		"./src/collapse/svg/solid/mars-stroke-right.svg",
		"svg-icons1430"
	],
	"./solid/mars-stroke-up.svg": [
		"./src/collapse/svg/solid/mars-stroke-up.svg",
		"svg-icons1431"
	],
	"./solid/mars-stroke.svg": [
		"./src/collapse/svg/solid/mars-stroke.svg",
		"svg-icons1432"
	],
	"./solid/mars.svg": [
		"./src/collapse/svg/solid/mars.svg",
		"svg-icons1433"
	],
	"./solid/martini-glass-citrus.svg": [
		"./src/collapse/svg/solid/martini-glass-citrus.svg",
		"svg-icons1434"
	],
	"./solid/martini-glass-empty.svg": [
		"./src/collapse/svg/solid/martini-glass-empty.svg",
		"svg-icons1435"
	],
	"./solid/martini-glass.svg": [
		"./src/collapse/svg/solid/martini-glass.svg",
		"svg-icons1436"
	],
	"./solid/mask-face.svg": [
		"./src/collapse/svg/solid/mask-face.svg",
		"svg-icons1437"
	],
	"./solid/mask-ventilator.svg": [
		"./src/collapse/svg/solid/mask-ventilator.svg",
		"svg-icons1438"
	],
	"./solid/mask.svg": [
		"./src/collapse/svg/solid/mask.svg",
		"svg-icons1439"
	],
	"./solid/masks-theater.svg": [
		"./src/collapse/svg/solid/masks-theater.svg",
		"svg-icons1440"
	],
	"./solid/mattress-pillow.svg": [
		"./src/collapse/svg/solid/mattress-pillow.svg",
		"svg-icons1441"
	],
	"./solid/maximize.svg": [
		"./src/collapse/svg/solid/maximize.svg",
		"svg-icons1442"
	],
	"./solid/medal.svg": [
		"./src/collapse/svg/solid/medal.svg",
		"svg-icons1443"
	],
	"./solid/memory.svg": [
		"./src/collapse/svg/solid/memory.svg",
		"svg-icons1444"
	],
	"./solid/menorah.svg": [
		"./src/collapse/svg/solid/menorah.svg",
		"svg-icons1445"
	],
	"./solid/mercury.svg": [
		"./src/collapse/svg/solid/mercury.svg",
		"svg-icons1446"
	],
	"./solid/message.svg": [
		"./src/collapse/svg/solid/message.svg",
		"svg-icons1447"
	],
	"./solid/meteor.svg": [
		"./src/collapse/svg/solid/meteor.svg",
		"svg-icons1448"
	],
	"./solid/microchip.svg": [
		"./src/collapse/svg/solid/microchip.svg",
		"svg-icons1449"
	],
	"./solid/microphone-lines-slash.svg": [
		"./src/collapse/svg/solid/microphone-lines-slash.svg",
		"svg-icons1450"
	],
	"./solid/microphone-lines.svg": [
		"./src/collapse/svg/solid/microphone-lines.svg",
		"svg-icons1451"
	],
	"./solid/microphone-slash.svg": [
		"./src/collapse/svg/solid/microphone-slash.svg",
		"svg-icons1452"
	],
	"./solid/microphone.svg": [
		"./src/collapse/svg/solid/microphone.svg",
		"svg-icons1453"
	],
	"./solid/microscope.svg": [
		"./src/collapse/svg/solid/microscope.svg",
		"svg-icons1454"
	],
	"./solid/mill-sign.svg": [
		"./src/collapse/svg/solid/mill-sign.svg",
		"svg-icons1455"
	],
	"./solid/minimize.svg": [
		"./src/collapse/svg/solid/minimize.svg",
		"svg-icons1456"
	],
	"./solid/minus.svg": [
		"./src/collapse/svg/solid/minus.svg",
		"svg-icons1457"
	],
	"./solid/mitten.svg": [
		"./src/collapse/svg/solid/mitten.svg",
		"svg-icons1458"
	],
	"./solid/mobile-button.svg": [
		"./src/collapse/svg/solid/mobile-button.svg",
		"svg-icons1459"
	],
	"./solid/mobile-retro.svg": [
		"./src/collapse/svg/solid/mobile-retro.svg",
		"svg-icons1460"
	],
	"./solid/mobile-screen-button.svg": [
		"./src/collapse/svg/solid/mobile-screen-button.svg",
		"svg-icons1461"
	],
	"./solid/mobile-screen.svg": [
		"./src/collapse/svg/solid/mobile-screen.svg",
		"svg-icons1462"
	],
	"./solid/mobile.svg": [
		"./src/collapse/svg/solid/mobile.svg",
		"svg-icons1463"
	],
	"./solid/money-bill-1-wave.svg": [
		"./src/collapse/svg/solid/money-bill-1-wave.svg",
		"svg-icons1464"
	],
	"./solid/money-bill-1.svg": [
		"./src/collapse/svg/solid/money-bill-1.svg",
		"svg-icons1465"
	],
	"./solid/money-bill-transfer.svg": [
		"./src/collapse/svg/solid/money-bill-transfer.svg",
		"svg-icons1466"
	],
	"./solid/money-bill-trend-up.svg": [
		"./src/collapse/svg/solid/money-bill-trend-up.svg",
		"svg-icons1467"
	],
	"./solid/money-bill-wave.svg": [
		"./src/collapse/svg/solid/money-bill-wave.svg",
		"svg-icons1468"
	],
	"./solid/money-bill-wheat.svg": [
		"./src/collapse/svg/solid/money-bill-wheat.svg",
		"svg-icons1469"
	],
	"./solid/money-bill.svg": [
		"./src/collapse/svg/solid/money-bill.svg",
		"svg-icons1470"
	],
	"./solid/money-bills.svg": [
		"./src/collapse/svg/solid/money-bills.svg",
		"svg-icons1471"
	],
	"./solid/money-check-dollar.svg": [
		"./src/collapse/svg/solid/money-check-dollar.svg",
		"svg-icons1472"
	],
	"./solid/money-check.svg": [
		"./src/collapse/svg/solid/money-check.svg",
		"svg-icons1473"
	],
	"./solid/monument.svg": [
		"./src/collapse/svg/solid/monument.svg",
		"svg-icons1474"
	],
	"./solid/moon.svg": [
		"./src/collapse/svg/solid/moon.svg",
		"svg-icons1475"
	],
	"./solid/mortar-pestle.svg": [
		"./src/collapse/svg/solid/mortar-pestle.svg",
		"svg-icons1476"
	],
	"./solid/mosque.svg": [
		"./src/collapse/svg/solid/mosque.svg",
		"svg-icons1477"
	],
	"./solid/mosquito-net.svg": [
		"./src/collapse/svg/solid/mosquito-net.svg",
		"svg-icons1478"
	],
	"./solid/mosquito.svg": [
		"./src/collapse/svg/solid/mosquito.svg",
		"svg-icons1479"
	],
	"./solid/motorcycle.svg": [
		"./src/collapse/svg/solid/motorcycle.svg",
		"svg-icons1480"
	],
	"./solid/mound.svg": [
		"./src/collapse/svg/solid/mound.svg",
		"svg-icons1481"
	],
	"./solid/mountain-city.svg": [
		"./src/collapse/svg/solid/mountain-city.svg",
		"svg-icons1482"
	],
	"./solid/mountain-sun.svg": [
		"./src/collapse/svg/solid/mountain-sun.svg",
		"svg-icons1483"
	],
	"./solid/mountain.svg": [
		"./src/collapse/svg/solid/mountain.svg",
		"svg-icons1484"
	],
	"./solid/mug-hot.svg": [
		"./src/collapse/svg/solid/mug-hot.svg",
		"svg-icons1485"
	],
	"./solid/mug-saucer.svg": [
		"./src/collapse/svg/solid/mug-saucer.svg",
		"svg-icons1486"
	],
	"./solid/music.svg": [
		"./src/collapse/svg/solid/music.svg",
		"svg-icons1487"
	],
	"./solid/n.svg": [
		"./src/collapse/svg/solid/n.svg",
		"svg-icons1488"
	],
	"./solid/naira-sign.svg": [
		"./src/collapse/svg/solid/naira-sign.svg",
		"svg-icons1489"
	],
	"./solid/network-wired.svg": [
		"./src/collapse/svg/solid/network-wired.svg",
		"svg-icons1490"
	],
	"./solid/neuter.svg": [
		"./src/collapse/svg/solid/neuter.svg",
		"svg-icons1491"
	],
	"./solid/newspaper.svg": [
		"./src/collapse/svg/solid/newspaper.svg",
		"svg-icons1492"
	],
	"./solid/not-equal.svg": [
		"./src/collapse/svg/solid/not-equal.svg",
		"svg-icons1493"
	],
	"./solid/notdef.svg": [
		"./src/collapse/svg/solid/notdef.svg",
		"svg-icons1494"
	],
	"./solid/note-sticky.svg": [
		"./src/collapse/svg/solid/note-sticky.svg",
		"svg-icons1495"
	],
	"./solid/notes-medical.svg": [
		"./src/collapse/svg/solid/notes-medical.svg",
		"svg-icons1496"
	],
	"./solid/o.svg": [
		"./src/collapse/svg/solid/o.svg",
		"svg-icons1497"
	],
	"./solid/object-group.svg": [
		"./src/collapse/svg/solid/object-group.svg",
		"svg-icons1498"
	],
	"./solid/object-ungroup.svg": [
		"./src/collapse/svg/solid/object-ungroup.svg",
		"svg-icons1499"
	],
	"./solid/oil-can.svg": [
		"./src/collapse/svg/solid/oil-can.svg",
		"svg-icons1500"
	],
	"./solid/oil-well.svg": [
		"./src/collapse/svg/solid/oil-well.svg",
		"svg-icons1501"
	],
	"./solid/om.svg": [
		"./src/collapse/svg/solid/om.svg",
		"svg-icons1502"
	],
	"./solid/otter.svg": [
		"./src/collapse/svg/solid/otter.svg",
		"svg-icons1503"
	],
	"./solid/outdent.svg": [
		"./src/collapse/svg/solid/outdent.svg",
		"svg-icons1504"
	],
	"./solid/p.svg": [
		"./src/collapse/svg/solid/p.svg",
		"svg-icons1505"
	],
	"./solid/pager.svg": [
		"./src/collapse/svg/solid/pager.svg",
		"svg-icons1506"
	],
	"./solid/paint-roller.svg": [
		"./src/collapse/svg/solid/paint-roller.svg",
		"svg-icons1507"
	],
	"./solid/paintbrush.svg": [
		"./src/collapse/svg/solid/paintbrush.svg",
		"svg-icons1508"
	],
	"./solid/palette.svg": [
		"./src/collapse/svg/solid/palette.svg",
		"svg-icons1509"
	],
	"./solid/pallet.svg": [
		"./src/collapse/svg/solid/pallet.svg",
		"svg-icons1510"
	],
	"./solid/panorama.svg": [
		"./src/collapse/svg/solid/panorama.svg",
		"svg-icons1511"
	],
	"./solid/paper-plane.svg": [
		"./src/collapse/svg/solid/paper-plane.svg",
		"svg-icons1512"
	],
	"./solid/paperclip.svg": [
		"./src/collapse/svg/solid/paperclip.svg",
		"svg-icons1513"
	],
	"./solid/parachute-box.svg": [
		"./src/collapse/svg/solid/parachute-box.svg",
		"svg-icons1514"
	],
	"./solid/paragraph.svg": [
		"./src/collapse/svg/solid/paragraph.svg",
		"svg-icons1515"
	],
	"./solid/passport.svg": [
		"./src/collapse/svg/solid/passport.svg",
		"svg-icons1516"
	],
	"./solid/paste.svg": [
		"./src/collapse/svg/solid/paste.svg",
		"svg-icons1517"
	],
	"./solid/pause.svg": [
		"./src/collapse/svg/solid/pause.svg",
		"svg-icons1518"
	],
	"./solid/paw.svg": [
		"./src/collapse/svg/solid/paw.svg",
		"svg-icons1519"
	],
	"./solid/peace.svg": [
		"./src/collapse/svg/solid/peace.svg",
		"svg-icons1520"
	],
	"./solid/pen-clip.svg": [
		"./src/collapse/svg/solid/pen-clip.svg",
		"svg-icons1521"
	],
	"./solid/pen-fancy.svg": [
		"./src/collapse/svg/solid/pen-fancy.svg",
		"svg-icons1522"
	],
	"./solid/pen-nib.svg": [
		"./src/collapse/svg/solid/pen-nib.svg",
		"svg-icons1523"
	],
	"./solid/pen-ruler.svg": [
		"./src/collapse/svg/solid/pen-ruler.svg",
		"svg-icons1524"
	],
	"./solid/pen-to-square.svg": [
		"./src/collapse/svg/solid/pen-to-square.svg",
		"svg-icons1525"
	],
	"./solid/pen.svg": [
		"./src/collapse/svg/solid/pen.svg",
		"svg-icons1526"
	],
	"./solid/pencil.svg": [
		"./src/collapse/svg/solid/pencil.svg",
		"svg-icons1527"
	],
	"./solid/people-arrows.svg": [
		"./src/collapse/svg/solid/people-arrows.svg",
		"svg-icons1528"
	],
	"./solid/people-carry-box.svg": [
		"./src/collapse/svg/solid/people-carry-box.svg",
		"svg-icons1529"
	],
	"./solid/people-group.svg": [
		"./src/collapse/svg/solid/people-group.svg",
		"svg-icons1530"
	],
	"./solid/people-line.svg": [
		"./src/collapse/svg/solid/people-line.svg",
		"svg-icons1531"
	],
	"./solid/people-pulling.svg": [
		"./src/collapse/svg/solid/people-pulling.svg",
		"svg-icons1532"
	],
	"./solid/people-robbery.svg": [
		"./src/collapse/svg/solid/people-robbery.svg",
		"svg-icons1533"
	],
	"./solid/people-roof.svg": [
		"./src/collapse/svg/solid/people-roof.svg",
		"svg-icons1534"
	],
	"./solid/pepper-hot.svg": [
		"./src/collapse/svg/solid/pepper-hot.svg",
		"svg-icons1535"
	],
	"./solid/percent.svg": [
		"./src/collapse/svg/solid/percent.svg",
		"svg-icons1536"
	],
	"./solid/person-arrow-down-to-line.svg": [
		"./src/collapse/svg/solid/person-arrow-down-to-line.svg",
		"svg-icons1537"
	],
	"./solid/person-arrow-up-from-line.svg": [
		"./src/collapse/svg/solid/person-arrow-up-from-line.svg",
		"svg-icons1538"
	],
	"./solid/person-biking.svg": [
		"./src/collapse/svg/solid/person-biking.svg",
		"svg-icons1539"
	],
	"./solid/person-booth.svg": [
		"./src/collapse/svg/solid/person-booth.svg",
		"svg-icons1540"
	],
	"./solid/person-breastfeeding.svg": [
		"./src/collapse/svg/solid/person-breastfeeding.svg",
		"svg-icons1541"
	],
	"./solid/person-burst.svg": [
		"./src/collapse/svg/solid/person-burst.svg",
		"svg-icons1542"
	],
	"./solid/person-cane.svg": [
		"./src/collapse/svg/solid/person-cane.svg",
		"svg-icons1543"
	],
	"./solid/person-chalkboard.svg": [
		"./src/collapse/svg/solid/person-chalkboard.svg",
		"svg-icons1544"
	],
	"./solid/person-circle-check.svg": [
		"./src/collapse/svg/solid/person-circle-check.svg",
		"svg-icons1545"
	],
	"./solid/person-circle-exclamation.svg": [
		"./src/collapse/svg/solid/person-circle-exclamation.svg",
		"svg-icons1546"
	],
	"./solid/person-circle-minus.svg": [
		"./src/collapse/svg/solid/person-circle-minus.svg",
		"svg-icons1547"
	],
	"./solid/person-circle-plus.svg": [
		"./src/collapse/svg/solid/person-circle-plus.svg",
		"svg-icons1548"
	],
	"./solid/person-circle-question.svg": [
		"./src/collapse/svg/solid/person-circle-question.svg",
		"svg-icons1549"
	],
	"./solid/person-circle-xmark.svg": [
		"./src/collapse/svg/solid/person-circle-xmark.svg",
		"svg-icons1550"
	],
	"./solid/person-digging.svg": [
		"./src/collapse/svg/solid/person-digging.svg",
		"svg-icons1551"
	],
	"./solid/person-dots-from-line.svg": [
		"./src/collapse/svg/solid/person-dots-from-line.svg",
		"svg-icons1552"
	],
	"./solid/person-dress-burst.svg": [
		"./src/collapse/svg/solid/person-dress-burst.svg",
		"svg-icons1553"
	],
	"./solid/person-dress.svg": [
		"./src/collapse/svg/solid/person-dress.svg",
		"svg-icons1554"
	],
	"./solid/person-drowning.svg": [
		"./src/collapse/svg/solid/person-drowning.svg",
		"svg-icons1555"
	],
	"./solid/person-falling-burst.svg": [
		"./src/collapse/svg/solid/person-falling-burst.svg",
		"svg-icons1556"
	],
	"./solid/person-falling.svg": [
		"./src/collapse/svg/solid/person-falling.svg",
		"svg-icons1557"
	],
	"./solid/person-half-dress.svg": [
		"./src/collapse/svg/solid/person-half-dress.svg",
		"svg-icons1558"
	],
	"./solid/person-harassing.svg": [
		"./src/collapse/svg/solid/person-harassing.svg",
		"svg-icons1559"
	],
	"./solid/person-hiking.svg": [
		"./src/collapse/svg/solid/person-hiking.svg",
		"svg-icons1560"
	],
	"./solid/person-military-pointing.svg": [
		"./src/collapse/svg/solid/person-military-pointing.svg",
		"svg-icons1561"
	],
	"./solid/person-military-rifle.svg": [
		"./src/collapse/svg/solid/person-military-rifle.svg",
		"svg-icons1562"
	],
	"./solid/person-military-to-person.svg": [
		"./src/collapse/svg/solid/person-military-to-person.svg",
		"svg-icons1563"
	],
	"./solid/person-praying.svg": [
		"./src/collapse/svg/solid/person-praying.svg",
		"svg-icons1564"
	],
	"./solid/person-pregnant.svg": [
		"./src/collapse/svg/solid/person-pregnant.svg",
		"svg-icons1565"
	],
	"./solid/person-rays.svg": [
		"./src/collapse/svg/solid/person-rays.svg",
		"svg-icons1566"
	],
	"./solid/person-rifle.svg": [
		"./src/collapse/svg/solid/person-rifle.svg",
		"svg-icons1567"
	],
	"./solid/person-running.svg": [
		"./src/collapse/svg/solid/person-running.svg",
		"svg-icons1568"
	],
	"./solid/person-shelter.svg": [
		"./src/collapse/svg/solid/person-shelter.svg",
		"svg-icons1569"
	],
	"./solid/person-skating.svg": [
		"./src/collapse/svg/solid/person-skating.svg",
		"svg-icons1570"
	],
	"./solid/person-skiing-nordic.svg": [
		"./src/collapse/svg/solid/person-skiing-nordic.svg",
		"svg-icons1571"
	],
	"./solid/person-skiing.svg": [
		"./src/collapse/svg/solid/person-skiing.svg",
		"svg-icons1572"
	],
	"./solid/person-snowboarding.svg": [
		"./src/collapse/svg/solid/person-snowboarding.svg",
		"svg-icons1573"
	],
	"./solid/person-swimming.svg": [
		"./src/collapse/svg/solid/person-swimming.svg",
		"svg-icons1574"
	],
	"./solid/person-through-window.svg": [
		"./src/collapse/svg/solid/person-through-window.svg",
		"svg-icons1575"
	],
	"./solid/person-walking-arrow-loop-left.svg": [
		"./src/collapse/svg/solid/person-walking-arrow-loop-left.svg",
		"svg-icons1576"
	],
	"./solid/person-walking-arrow-right.svg": [
		"./src/collapse/svg/solid/person-walking-arrow-right.svg",
		"svg-icons1577"
	],
	"./solid/person-walking-dashed-line-arrow-right.svg": [
		"./src/collapse/svg/solid/person-walking-dashed-line-arrow-right.svg",
		"svg-icons1578"
	],
	"./solid/person-walking-luggage.svg": [
		"./src/collapse/svg/solid/person-walking-luggage.svg",
		"svg-icons1579"
	],
	"./solid/person-walking-with-cane.svg": [
		"./src/collapse/svg/solid/person-walking-with-cane.svg",
		"svg-icons1580"
	],
	"./solid/person-walking.svg": [
		"./src/collapse/svg/solid/person-walking.svg",
		"svg-icons1581"
	],
	"./solid/person.svg": [
		"./src/collapse/svg/solid/person.svg",
		"svg-icons1582"
	],
	"./solid/peseta-sign.svg": [
		"./src/collapse/svg/solid/peseta-sign.svg",
		"svg-icons1583"
	],
	"./solid/peso-sign.svg": [
		"./src/collapse/svg/solid/peso-sign.svg",
		"svg-icons1584"
	],
	"./solid/phone-flip.svg": [
		"./src/collapse/svg/solid/phone-flip.svg",
		"svg-icons1585"
	],
	"./solid/phone-slash.svg": [
		"./src/collapse/svg/solid/phone-slash.svg",
		"svg-icons1586"
	],
	"./solid/phone-volume.svg": [
		"./src/collapse/svg/solid/phone-volume.svg",
		"svg-icons1587"
	],
	"./solid/phone.svg": [
		"./src/collapse/svg/solid/phone.svg",
		"svg-icons1588"
	],
	"./solid/photo-film.svg": [
		"./src/collapse/svg/solid/photo-film.svg",
		"svg-icons1589"
	],
	"./solid/piggy-bank.svg": [
		"./src/collapse/svg/solid/piggy-bank.svg",
		"svg-icons1590"
	],
	"./solid/pills.svg": [
		"./src/collapse/svg/solid/pills.svg",
		"svg-icons1591"
	],
	"./solid/pizza-slice.svg": [
		"./src/collapse/svg/solid/pizza-slice.svg",
		"svg-icons1592"
	],
	"./solid/place-of-worship.svg": [
		"./src/collapse/svg/solid/place-of-worship.svg",
		"svg-icons1593"
	],
	"./solid/plane-arrival.svg": [
		"./src/collapse/svg/solid/plane-arrival.svg",
		"svg-icons1594"
	],
	"./solid/plane-circle-check.svg": [
		"./src/collapse/svg/solid/plane-circle-check.svg",
		"svg-icons1595"
	],
	"./solid/plane-circle-exclamation.svg": [
		"./src/collapse/svg/solid/plane-circle-exclamation.svg",
		"svg-icons1596"
	],
	"./solid/plane-circle-xmark.svg": [
		"./src/collapse/svg/solid/plane-circle-xmark.svg",
		"svg-icons1597"
	],
	"./solid/plane-departure.svg": [
		"./src/collapse/svg/solid/plane-departure.svg",
		"svg-icons1598"
	],
	"./solid/plane-lock.svg": [
		"./src/collapse/svg/solid/plane-lock.svg",
		"svg-icons1599"
	],
	"./solid/plane-slash.svg": [
		"./src/collapse/svg/solid/plane-slash.svg",
		"svg-icons1600"
	],
	"./solid/plane-up.svg": [
		"./src/collapse/svg/solid/plane-up.svg",
		"svg-icons1601"
	],
	"./solid/plane.svg": [
		"./src/collapse/svg/solid/plane.svg",
		"svg-icons1602"
	],
	"./solid/plant-wilt.svg": [
		"./src/collapse/svg/solid/plant-wilt.svg",
		"svg-icons1603"
	],
	"./solid/plate-wheat.svg": [
		"./src/collapse/svg/solid/plate-wheat.svg",
		"svg-icons1604"
	],
	"./solid/play.svg": [
		"./src/collapse/svg/solid/play.svg",
		"svg-icons1605"
	],
	"./solid/plug-circle-bolt.svg": [
		"./src/collapse/svg/solid/plug-circle-bolt.svg",
		"svg-icons1606"
	],
	"./solid/plug-circle-check.svg": [
		"./src/collapse/svg/solid/plug-circle-check.svg",
		"svg-icons1607"
	],
	"./solid/plug-circle-exclamation.svg": [
		"./src/collapse/svg/solid/plug-circle-exclamation.svg",
		"svg-icons1608"
	],
	"./solid/plug-circle-minus.svg": [
		"./src/collapse/svg/solid/plug-circle-minus.svg",
		"svg-icons1609"
	],
	"./solid/plug-circle-plus.svg": [
		"./src/collapse/svg/solid/plug-circle-plus.svg",
		"svg-icons1610"
	],
	"./solid/plug-circle-xmark.svg": [
		"./src/collapse/svg/solid/plug-circle-xmark.svg",
		"svg-icons1611"
	],
	"./solid/plug.svg": [
		"./src/collapse/svg/solid/plug.svg",
		"svg-icons1612"
	],
	"./solid/plus-minus.svg": [
		"./src/collapse/svg/solid/plus-minus.svg",
		"svg-icons1613"
	],
	"./solid/plus.svg": [
		"./src/collapse/svg/solid/plus.svg",
		"svg-icons1614"
	],
	"./solid/podcast.svg": [
		"./src/collapse/svg/solid/podcast.svg",
		"svg-icons1615"
	],
	"./solid/poo-storm.svg": [
		"./src/collapse/svg/solid/poo-storm.svg",
		"svg-icons1616"
	],
	"./solid/poo.svg": [
		"./src/collapse/svg/solid/poo.svg",
		"svg-icons1617"
	],
	"./solid/poop.svg": [
		"./src/collapse/svg/solid/poop.svg",
		"svg-icons1618"
	],
	"./solid/power-off.svg": [
		"./src/collapse/svg/solid/power-off.svg",
		"svg-icons1619"
	],
	"./solid/prescription-bottle-medical.svg": [
		"./src/collapse/svg/solid/prescription-bottle-medical.svg",
		"svg-icons1620"
	],
	"./solid/prescription-bottle.svg": [
		"./src/collapse/svg/solid/prescription-bottle.svg",
		"svg-icons1621"
	],
	"./solid/prescription.svg": [
		"./src/collapse/svg/solid/prescription.svg",
		"svg-icons1622"
	],
	"./solid/print.svg": [
		"./src/collapse/svg/solid/print.svg",
		"svg-icons1623"
	],
	"./solid/pump-medical.svg": [
		"./src/collapse/svg/solid/pump-medical.svg",
		"svg-icons1624"
	],
	"./solid/pump-soap.svg": [
		"./src/collapse/svg/solid/pump-soap.svg",
		"svg-icons1625"
	],
	"./solid/puzzle-piece.svg": [
		"./src/collapse/svg/solid/puzzle-piece.svg",
		"svg-icons1626"
	],
	"./solid/q.svg": [
		"./src/collapse/svg/solid/q.svg",
		"svg-icons1627"
	],
	"./solid/qrcode.svg": [
		"./src/collapse/svg/solid/qrcode.svg",
		"svg-icons1628"
	],
	"./solid/question.svg": [
		"./src/collapse/svg/solid/question.svg",
		"svg-icons1629"
	],
	"./solid/quote-left.svg": [
		"./src/collapse/svg/solid/quote-left.svg",
		"svg-icons1630"
	],
	"./solid/quote-right.svg": [
		"./src/collapse/svg/solid/quote-right.svg",
		"svg-icons1631"
	],
	"./solid/r.svg": [
		"./src/collapse/svg/solid/r.svg",
		"svg-icons1632"
	],
	"./solid/radiation.svg": [
		"./src/collapse/svg/solid/radiation.svg",
		"svg-icons1633"
	],
	"./solid/radio.svg": [
		"./src/collapse/svg/solid/radio.svg",
		"svg-icons1634"
	],
	"./solid/rainbow.svg": [
		"./src/collapse/svg/solid/rainbow.svg",
		"svg-icons1635"
	],
	"./solid/ranking-star.svg": [
		"./src/collapse/svg/solid/ranking-star.svg",
		"svg-icons1636"
	],
	"./solid/receipt.svg": [
		"./src/collapse/svg/solid/receipt.svg",
		"svg-icons1637"
	],
	"./solid/record-vinyl.svg": [
		"./src/collapse/svg/solid/record-vinyl.svg",
		"svg-icons1638"
	],
	"./solid/rectangle-ad.svg": [
		"./src/collapse/svg/solid/rectangle-ad.svg",
		"svg-icons1639"
	],
	"./solid/rectangle-list.svg": [
		"./src/collapse/svg/solid/rectangle-list.svg",
		"svg-icons1640"
	],
	"./solid/rectangle-xmark.svg": [
		"./src/collapse/svg/solid/rectangle-xmark.svg",
		"svg-icons1641"
	],
	"./solid/recycle.svg": [
		"./src/collapse/svg/solid/recycle.svg",
		"svg-icons1642"
	],
	"./solid/registered.svg": [
		"./src/collapse/svg/solid/registered.svg",
		"svg-icons1643"
	],
	"./solid/repeat.svg": [
		"./src/collapse/svg/solid/repeat.svg",
		"svg-icons1644"
	],
	"./solid/reply-all.svg": [
		"./src/collapse/svg/solid/reply-all.svg",
		"svg-icons1645"
	],
	"./solid/reply.svg": [
		"./src/collapse/svg/solid/reply.svg",
		"svg-icons1646"
	],
	"./solid/republican.svg": [
		"./src/collapse/svg/solid/republican.svg",
		"svg-icons1647"
	],
	"./solid/restroom.svg": [
		"./src/collapse/svg/solid/restroom.svg",
		"svg-icons1648"
	],
	"./solid/retweet.svg": [
		"./src/collapse/svg/solid/retweet.svg",
		"svg-icons1649"
	],
	"./solid/ribbon.svg": [
		"./src/collapse/svg/solid/ribbon.svg",
		"svg-icons1650"
	],
	"./solid/right-from-bracket.svg": [
		"./src/collapse/svg/solid/right-from-bracket.svg",
		"svg-icons1651"
	],
	"./solid/right-left.svg": [
		"./src/collapse/svg/solid/right-left.svg",
		"svg-icons1652"
	],
	"./solid/right-long.svg": [
		"./src/collapse/svg/solid/right-long.svg",
		"svg-icons1653"
	],
	"./solid/right-to-bracket.svg": [
		"./src/collapse/svg/solid/right-to-bracket.svg",
		"svg-icons1654"
	],
	"./solid/ring.svg": [
		"./src/collapse/svg/solid/ring.svg",
		"svg-icons1655"
	],
	"./solid/road-barrier.svg": [
		"./src/collapse/svg/solid/road-barrier.svg",
		"svg-icons1656"
	],
	"./solid/road-bridge.svg": [
		"./src/collapse/svg/solid/road-bridge.svg",
		"svg-icons1657"
	],
	"./solid/road-circle-check.svg": [
		"./src/collapse/svg/solid/road-circle-check.svg",
		"svg-icons1658"
	],
	"./solid/road-circle-exclamation.svg": [
		"./src/collapse/svg/solid/road-circle-exclamation.svg",
		"svg-icons1659"
	],
	"./solid/road-circle-xmark.svg": [
		"./src/collapse/svg/solid/road-circle-xmark.svg",
		"svg-icons1660"
	],
	"./solid/road-lock.svg": [
		"./src/collapse/svg/solid/road-lock.svg",
		"svg-icons1661"
	],
	"./solid/road-spikes.svg": [
		"./src/collapse/svg/solid/road-spikes.svg",
		"svg-icons1662"
	],
	"./solid/road.svg": [
		"./src/collapse/svg/solid/road.svg",
		"svg-icons1663"
	],
	"./solid/robot.svg": [
		"./src/collapse/svg/solid/robot.svg",
		"svg-icons1664"
	],
	"./solid/rocket.svg": [
		"./src/collapse/svg/solid/rocket.svg",
		"svg-icons1665"
	],
	"./solid/rotate-left.svg": [
		"./src/collapse/svg/solid/rotate-left.svg",
		"svg-icons1666"
	],
	"./solid/rotate-right.svg": [
		"./src/collapse/svg/solid/rotate-right.svg",
		"svg-icons1667"
	],
	"./solid/rotate.svg": [
		"./src/collapse/svg/solid/rotate.svg",
		"svg-icons1668"
	],
	"./solid/route.svg": [
		"./src/collapse/svg/solid/route.svg",
		"svg-icons1669"
	],
	"./solid/rss.svg": [
		"./src/collapse/svg/solid/rss.svg",
		"svg-icons1670"
	],
	"./solid/ruble-sign.svg": [
		"./src/collapse/svg/solid/ruble-sign.svg",
		"svg-icons1671"
	],
	"./solid/rug.svg": [
		"./src/collapse/svg/solid/rug.svg",
		"svg-icons1672"
	],
	"./solid/ruler-combined.svg": [
		"./src/collapse/svg/solid/ruler-combined.svg",
		"svg-icons1673"
	],
	"./solid/ruler-horizontal.svg": [
		"./src/collapse/svg/solid/ruler-horizontal.svg",
		"svg-icons1674"
	],
	"./solid/ruler-vertical.svg": [
		"./src/collapse/svg/solid/ruler-vertical.svg",
		"svg-icons1675"
	],
	"./solid/ruler.svg": [
		"./src/collapse/svg/solid/ruler.svg",
		"svg-icons1676"
	],
	"./solid/rupee-sign.svg": [
		"./src/collapse/svg/solid/rupee-sign.svg",
		"svg-icons1677"
	],
	"./solid/rupiah-sign.svg": [
		"./src/collapse/svg/solid/rupiah-sign.svg",
		"svg-icons1678"
	],
	"./solid/s.svg": [
		"./src/collapse/svg/solid/s.svg",
		"svg-icons1679"
	],
	"./solid/sack-dollar.svg": [
		"./src/collapse/svg/solid/sack-dollar.svg",
		"svg-icons1680"
	],
	"./solid/sack-xmark.svg": [
		"./src/collapse/svg/solid/sack-xmark.svg",
		"svg-icons1681"
	],
	"./solid/sailboat.svg": [
		"./src/collapse/svg/solid/sailboat.svg",
		"svg-icons1682"
	],
	"./solid/satellite-dish.svg": [
		"./src/collapse/svg/solid/satellite-dish.svg",
		"svg-icons1683"
	],
	"./solid/satellite.svg": [
		"./src/collapse/svg/solid/satellite.svg",
		"svg-icons1684"
	],
	"./solid/scale-balanced.svg": [
		"./src/collapse/svg/solid/scale-balanced.svg",
		"svg-icons1685"
	],
	"./solid/scale-unbalanced-flip.svg": [
		"./src/collapse/svg/solid/scale-unbalanced-flip.svg",
		"svg-icons1686"
	],
	"./solid/scale-unbalanced.svg": [
		"./src/collapse/svg/solid/scale-unbalanced.svg",
		"svg-icons1687"
	],
	"./solid/school-circle-check.svg": [
		"./src/collapse/svg/solid/school-circle-check.svg",
		"svg-icons1688"
	],
	"./solid/school-circle-exclamation.svg": [
		"./src/collapse/svg/solid/school-circle-exclamation.svg",
		"svg-icons1689"
	],
	"./solid/school-circle-xmark.svg": [
		"./src/collapse/svg/solid/school-circle-xmark.svg",
		"svg-icons1690"
	],
	"./solid/school-flag.svg": [
		"./src/collapse/svg/solid/school-flag.svg",
		"svg-icons1691"
	],
	"./solid/school-lock.svg": [
		"./src/collapse/svg/solid/school-lock.svg",
		"svg-icons1692"
	],
	"./solid/school.svg": [
		"./src/collapse/svg/solid/school.svg",
		"svg-icons1693"
	],
	"./solid/scissors.svg": [
		"./src/collapse/svg/solid/scissors.svg",
		"svg-icons1694"
	],
	"./solid/screwdriver-wrench.svg": [
		"./src/collapse/svg/solid/screwdriver-wrench.svg",
		"svg-icons1695"
	],
	"./solid/screwdriver.svg": [
		"./src/collapse/svg/solid/screwdriver.svg",
		"svg-icons1696"
	],
	"./solid/scroll-torah.svg": [
		"./src/collapse/svg/solid/scroll-torah.svg",
		"svg-icons1697"
	],
	"./solid/scroll.svg": [
		"./src/collapse/svg/solid/scroll.svg",
		"svg-icons1698"
	],
	"./solid/sd-card.svg": [
		"./src/collapse/svg/solid/sd-card.svg",
		"svg-icons1699"
	],
	"./solid/section.svg": [
		"./src/collapse/svg/solid/section.svg",
		"svg-icons1700"
	],
	"./solid/seedling.svg": [
		"./src/collapse/svg/solid/seedling.svg",
		"svg-icons1701"
	],
	"./solid/server.svg": [
		"./src/collapse/svg/solid/server.svg",
		"svg-icons1702"
	],
	"./solid/shapes.svg": [
		"./src/collapse/svg/solid/shapes.svg",
		"svg-icons1703"
	],
	"./solid/share-from-square.svg": [
		"./src/collapse/svg/solid/share-from-square.svg",
		"svg-icons1704"
	],
	"./solid/share-nodes.svg": [
		"./src/collapse/svg/solid/share-nodes.svg",
		"svg-icons1705"
	],
	"./solid/share.svg": [
		"./src/collapse/svg/solid/share.svg",
		"svg-icons1706"
	],
	"./solid/sheet-plastic.svg": [
		"./src/collapse/svg/solid/sheet-plastic.svg",
		"svg-icons1707"
	],
	"./solid/shekel-sign.svg": [
		"./src/collapse/svg/solid/shekel-sign.svg",
		"svg-icons1708"
	],
	"./solid/shield-cat.svg": [
		"./src/collapse/svg/solid/shield-cat.svg",
		"svg-icons1709"
	],
	"./solid/shield-dog.svg": [
		"./src/collapse/svg/solid/shield-dog.svg",
		"svg-icons1710"
	],
	"./solid/shield-halved.svg": [
		"./src/collapse/svg/solid/shield-halved.svg",
		"svg-icons1711"
	],
	"./solid/shield-heart.svg": [
		"./src/collapse/svg/solid/shield-heart.svg",
		"svg-icons1712"
	],
	"./solid/shield-virus.svg": [
		"./src/collapse/svg/solid/shield-virus.svg",
		"svg-icons1713"
	],
	"./solid/shield.svg": [
		"./src/collapse/svg/solid/shield.svg",
		"svg-icons1714"
	],
	"./solid/ship.svg": [
		"./src/collapse/svg/solid/ship.svg",
		"svg-icons1715"
	],
	"./solid/shirt.svg": [
		"./src/collapse/svg/solid/shirt.svg",
		"svg-icons1716"
	],
	"./solid/shoe-prints.svg": [
		"./src/collapse/svg/solid/shoe-prints.svg",
		"svg-icons1717"
	],
	"./solid/shop-lock.svg": [
		"./src/collapse/svg/solid/shop-lock.svg",
		"svg-icons1718"
	],
	"./solid/shop-slash.svg": [
		"./src/collapse/svg/solid/shop-slash.svg",
		"svg-icons1719"
	],
	"./solid/shop.svg": [
		"./src/collapse/svg/solid/shop.svg",
		"svg-icons1720"
	],
	"./solid/shower.svg": [
		"./src/collapse/svg/solid/shower.svg",
		"svg-icons1721"
	],
	"./solid/shrimp.svg": [
		"./src/collapse/svg/solid/shrimp.svg",
		"svg-icons1722"
	],
	"./solid/shuffle.svg": [
		"./src/collapse/svg/solid/shuffle.svg",
		"svg-icons1723"
	],
	"./solid/shuttle-space.svg": [
		"./src/collapse/svg/solid/shuttle-space.svg",
		"svg-icons1724"
	],
	"./solid/sign-hanging.svg": [
		"./src/collapse/svg/solid/sign-hanging.svg",
		"svg-icons1725"
	],
	"./solid/signal.svg": [
		"./src/collapse/svg/solid/signal.svg",
		"svg-icons1726"
	],
	"./solid/signature.svg": [
		"./src/collapse/svg/solid/signature.svg",
		"svg-icons1727"
	],
	"./solid/signs-post.svg": [
		"./src/collapse/svg/solid/signs-post.svg",
		"svg-icons1728"
	],
	"./solid/sim-card.svg": [
		"./src/collapse/svg/solid/sim-card.svg",
		"svg-icons1729"
	],
	"./solid/sink.svg": [
		"./src/collapse/svg/solid/sink.svg",
		"svg-icons1730"
	],
	"./solid/sitemap.svg": [
		"./src/collapse/svg/solid/sitemap.svg",
		"svg-icons1731"
	],
	"./solid/skull-crossbones.svg": [
		"./src/collapse/svg/solid/skull-crossbones.svg",
		"svg-icons1732"
	],
	"./solid/skull.svg": [
		"./src/collapse/svg/solid/skull.svg",
		"svg-icons1733"
	],
	"./solid/slash.svg": [
		"./src/collapse/svg/solid/slash.svg",
		"svg-icons1734"
	],
	"./solid/sleigh.svg": [
		"./src/collapse/svg/solid/sleigh.svg",
		"svg-icons1735"
	],
	"./solid/sliders.svg": [
		"./src/collapse/svg/solid/sliders.svg",
		"svg-icons1736"
	],
	"./solid/smog.svg": [
		"./src/collapse/svg/solid/smog.svg",
		"svg-icons1737"
	],
	"./solid/smoking.svg": [
		"./src/collapse/svg/solid/smoking.svg",
		"svg-icons1738"
	],
	"./solid/snowflake.svg": [
		"./src/collapse/svg/solid/snowflake.svg",
		"svg-icons1739"
	],
	"./solid/snowman.svg": [
		"./src/collapse/svg/solid/snowman.svg",
		"svg-icons1740"
	],
	"./solid/snowplow.svg": [
		"./src/collapse/svg/solid/snowplow.svg",
		"svg-icons1741"
	],
	"./solid/soap.svg": [
		"./src/collapse/svg/solid/soap.svg",
		"svg-icons1742"
	],
	"./solid/socks.svg": [
		"./src/collapse/svg/solid/socks.svg",
		"svg-icons1743"
	],
	"./solid/solar-panel.svg": [
		"./src/collapse/svg/solid/solar-panel.svg",
		"svg-icons1744"
	],
	"./solid/sort-down.svg": [
		"./src/collapse/svg/solid/sort-down.svg",
		"svg-icons1745"
	],
	"./solid/sort-up.svg": [
		"./src/collapse/svg/solid/sort-up.svg",
		"svg-icons1746"
	],
	"./solid/sort.svg": [
		"./src/collapse/svg/solid/sort.svg",
		"svg-icons1747"
	],
	"./solid/spa.svg": [
		"./src/collapse/svg/solid/spa.svg",
		"svg-icons1748"
	],
	"./solid/spaghetti-monster-flying.svg": [
		"./src/collapse/svg/solid/spaghetti-monster-flying.svg",
		"svg-icons1749"
	],
	"./solid/spell-check.svg": [
		"./src/collapse/svg/solid/spell-check.svg",
		"svg-icons1750"
	],
	"./solid/spider.svg": [
		"./src/collapse/svg/solid/spider.svg",
		"svg-icons1751"
	],
	"./solid/spinner.svg": [
		"./src/collapse/svg/solid/spinner.svg",
		"svg-icons1752"
	],
	"./solid/splotch.svg": [
		"./src/collapse/svg/solid/splotch.svg",
		"svg-icons1753"
	],
	"./solid/spoon.svg": [
		"./src/collapse/svg/solid/spoon.svg",
		"svg-icons1754"
	],
	"./solid/spray-can-sparkles.svg": [
		"./src/collapse/svg/solid/spray-can-sparkles.svg",
		"svg-icons1755"
	],
	"./solid/spray-can.svg": [
		"./src/collapse/svg/solid/spray-can.svg",
		"svg-icons1756"
	],
	"./solid/square-arrow-up-right.svg": [
		"./src/collapse/svg/solid/square-arrow-up-right.svg",
		"svg-icons1757"
	],
	"./solid/square-caret-down.svg": [
		"./src/collapse/svg/solid/square-caret-down.svg",
		"svg-icons1758"
	],
	"./solid/square-caret-left.svg": [
		"./src/collapse/svg/solid/square-caret-left.svg",
		"svg-icons1759"
	],
	"./solid/square-caret-right.svg": [
		"./src/collapse/svg/solid/square-caret-right.svg",
		"svg-icons1760"
	],
	"./solid/square-caret-up.svg": [
		"./src/collapse/svg/solid/square-caret-up.svg",
		"svg-icons1761"
	],
	"./solid/square-check.svg": [
		"./src/collapse/svg/solid/square-check.svg",
		"svg-icons1762"
	],
	"./solid/square-envelope.svg": [
		"./src/collapse/svg/solid/square-envelope.svg",
		"svg-icons1763"
	],
	"./solid/square-full.svg": [
		"./src/collapse/svg/solid/square-full.svg",
		"svg-icons1764"
	],
	"./solid/square-h.svg": [
		"./src/collapse/svg/solid/square-h.svg",
		"svg-icons1765"
	],
	"./solid/square-minus.svg": [
		"./src/collapse/svg/solid/square-minus.svg",
		"svg-icons1766"
	],
	"./solid/square-nfi.svg": [
		"./src/collapse/svg/solid/square-nfi.svg",
		"svg-icons1767"
	],
	"./solid/square-parking.svg": [
		"./src/collapse/svg/solid/square-parking.svg",
		"svg-icons1768"
	],
	"./solid/square-pen.svg": [
		"./src/collapse/svg/solid/square-pen.svg",
		"svg-icons1769"
	],
	"./solid/square-person-confined.svg": [
		"./src/collapse/svg/solid/square-person-confined.svg",
		"svg-icons1770"
	],
	"./solid/square-phone-flip.svg": [
		"./src/collapse/svg/solid/square-phone-flip.svg",
		"svg-icons1771"
	],
	"./solid/square-phone.svg": [
		"./src/collapse/svg/solid/square-phone.svg",
		"svg-icons1772"
	],
	"./solid/square-plus.svg": [
		"./src/collapse/svg/solid/square-plus.svg",
		"svg-icons1773"
	],
	"./solid/square-poll-horizontal.svg": [
		"./src/collapse/svg/solid/square-poll-horizontal.svg",
		"svg-icons1774"
	],
	"./solid/square-poll-vertical.svg": [
		"./src/collapse/svg/solid/square-poll-vertical.svg",
		"svg-icons1775"
	],
	"./solid/square-root-variable.svg": [
		"./src/collapse/svg/solid/square-root-variable.svg",
		"svg-icons1776"
	],
	"./solid/square-rss.svg": [
		"./src/collapse/svg/solid/square-rss.svg",
		"svg-icons1777"
	],
	"./solid/square-share-nodes.svg": [
		"./src/collapse/svg/solid/square-share-nodes.svg",
		"svg-icons1778"
	],
	"./solid/square-up-right.svg": [
		"./src/collapse/svg/solid/square-up-right.svg",
		"svg-icons1779"
	],
	"./solid/square-virus.svg": [
		"./src/collapse/svg/solid/square-virus.svg",
		"svg-icons1780"
	],
	"./solid/square-xmark.svg": [
		"./src/collapse/svg/solid/square-xmark.svg",
		"svg-icons1781"
	],
	"./solid/square.svg": [
		"./src/collapse/svg/solid/square.svg",
		"svg-icons1782"
	],
	"./solid/staff-snake.svg": [
		"./src/collapse/svg/solid/staff-snake.svg",
		"svg-icons1783"
	],
	"./solid/stairs.svg": [
		"./src/collapse/svg/solid/stairs.svg",
		"svg-icons1784"
	],
	"./solid/stamp.svg": [
		"./src/collapse/svg/solid/stamp.svg",
		"svg-icons1785"
	],
	"./solid/stapler.svg": [
		"./src/collapse/svg/solid/stapler.svg",
		"svg-icons1786"
	],
	"./solid/star-and-crescent.svg": [
		"./src/collapse/svg/solid/star-and-crescent.svg",
		"svg-icons1787"
	],
	"./solid/star-half-stroke.svg": [
		"./src/collapse/svg/solid/star-half-stroke.svg",
		"svg-icons1788"
	],
	"./solid/star-half.svg": [
		"./src/collapse/svg/solid/star-half.svg",
		"svg-icons1789"
	],
	"./solid/star-of-david.svg": [
		"./src/collapse/svg/solid/star-of-david.svg",
		"svg-icons1790"
	],
	"./solid/star-of-life.svg": [
		"./src/collapse/svg/solid/star-of-life.svg",
		"svg-icons1791"
	],
	"./solid/star.svg": [
		"./src/collapse/svg/solid/star.svg",
		"svg-icons1792"
	],
	"./solid/sterling-sign.svg": [
		"./src/collapse/svg/solid/sterling-sign.svg",
		"svg-icons1793"
	],
	"./solid/stethoscope.svg": [
		"./src/collapse/svg/solid/stethoscope.svg",
		"svg-icons1794"
	],
	"./solid/stop.svg": [
		"./src/collapse/svg/solid/stop.svg",
		"svg-icons1795"
	],
	"./solid/stopwatch-20.svg": [
		"./src/collapse/svg/solid/stopwatch-20.svg",
		"svg-icons1796"
	],
	"./solid/stopwatch.svg": [
		"./src/collapse/svg/solid/stopwatch.svg",
		"svg-icons1797"
	],
	"./solid/store-slash.svg": [
		"./src/collapse/svg/solid/store-slash.svg",
		"svg-icons1798"
	],
	"./solid/store.svg": [
		"./src/collapse/svg/solid/store.svg",
		"svg-icons1799"
	],
	"./solid/street-view.svg": [
		"./src/collapse/svg/solid/street-view.svg",
		"svg-icons1800"
	],
	"./solid/strikethrough.svg": [
		"./src/collapse/svg/solid/strikethrough.svg",
		"svg-icons1801"
	],
	"./solid/stroopwafel.svg": [
		"./src/collapse/svg/solid/stroopwafel.svg",
		"svg-icons1802"
	],
	"./solid/subscript.svg": [
		"./src/collapse/svg/solid/subscript.svg",
		"svg-icons1803"
	],
	"./solid/suitcase-medical.svg": [
		"./src/collapse/svg/solid/suitcase-medical.svg",
		"svg-icons1804"
	],
	"./solid/suitcase-rolling.svg": [
		"./src/collapse/svg/solid/suitcase-rolling.svg",
		"svg-icons1805"
	],
	"./solid/suitcase.svg": [
		"./src/collapse/svg/solid/suitcase.svg",
		"svg-icons1806"
	],
	"./solid/sun-plant-wilt.svg": [
		"./src/collapse/svg/solid/sun-plant-wilt.svg",
		"svg-icons1807"
	],
	"./solid/sun.svg": [
		"./src/collapse/svg/solid/sun.svg",
		"svg-icons1808"
	],
	"./solid/superscript.svg": [
		"./src/collapse/svg/solid/superscript.svg",
		"svg-icons1809"
	],
	"./solid/swatchbook.svg": [
		"./src/collapse/svg/solid/swatchbook.svg",
		"svg-icons1810"
	],
	"./solid/synagogue.svg": [
		"./src/collapse/svg/solid/synagogue.svg",
		"svg-icons1811"
	],
	"./solid/syringe.svg": [
		"./src/collapse/svg/solid/syringe.svg",
		"svg-icons1812"
	],
	"./solid/t.svg": [
		"./src/collapse/svg/solid/t.svg",
		"svg-icons1813"
	],
	"./solid/table-cells-large.svg": [
		"./src/collapse/svg/solid/table-cells-large.svg",
		"svg-icons1814"
	],
	"./solid/table-cells.svg": [
		"./src/collapse/svg/solid/table-cells.svg",
		"svg-icons1815"
	],
	"./solid/table-columns.svg": [
		"./src/collapse/svg/solid/table-columns.svg",
		"svg-icons1816"
	],
	"./solid/table-list.svg": [
		"./src/collapse/svg/solid/table-list.svg",
		"svg-icons1817"
	],
	"./solid/table-tennis-paddle-ball.svg": [
		"./src/collapse/svg/solid/table-tennis-paddle-ball.svg",
		"svg-icons1818"
	],
	"./solid/table.svg": [
		"./src/collapse/svg/solid/table.svg",
		"svg-icons1819"
	],
	"./solid/tablet-button.svg": [
		"./src/collapse/svg/solid/tablet-button.svg",
		"svg-icons1820"
	],
	"./solid/tablet-screen-button.svg": [
		"./src/collapse/svg/solid/tablet-screen-button.svg",
		"svg-icons1821"
	],
	"./solid/tablet.svg": [
		"./src/collapse/svg/solid/tablet.svg",
		"svg-icons1822"
	],
	"./solid/tablets.svg": [
		"./src/collapse/svg/solid/tablets.svg",
		"svg-icons1823"
	],
	"./solid/tachograph-digital.svg": [
		"./src/collapse/svg/solid/tachograph-digital.svg",
		"svg-icons1824"
	],
	"./solid/tag.svg": [
		"./src/collapse/svg/solid/tag.svg",
		"svg-icons1825"
	],
	"./solid/tags.svg": [
		"./src/collapse/svg/solid/tags.svg",
		"svg-icons1826"
	],
	"./solid/tape.svg": [
		"./src/collapse/svg/solid/tape.svg",
		"svg-icons1827"
	],
	"./solid/tarp-droplet.svg": [
		"./src/collapse/svg/solid/tarp-droplet.svg",
		"svg-icons1828"
	],
	"./solid/tarp.svg": [
		"./src/collapse/svg/solid/tarp.svg",
		"svg-icons1829"
	],
	"./solid/taxi.svg": [
		"./src/collapse/svg/solid/taxi.svg",
		"svg-icons1830"
	],
	"./solid/teeth-open.svg": [
		"./src/collapse/svg/solid/teeth-open.svg",
		"svg-icons1831"
	],
	"./solid/teeth.svg": [
		"./src/collapse/svg/solid/teeth.svg",
		"svg-icons1832"
	],
	"./solid/temperature-arrow-down.svg": [
		"./src/collapse/svg/solid/temperature-arrow-down.svg",
		"svg-icons1833"
	],
	"./solid/temperature-arrow-up.svg": [
		"./src/collapse/svg/solid/temperature-arrow-up.svg",
		"svg-icons1834"
	],
	"./solid/temperature-empty.svg": [
		"./src/collapse/svg/solid/temperature-empty.svg",
		"svg-icons1835"
	],
	"./solid/temperature-full.svg": [
		"./src/collapse/svg/solid/temperature-full.svg",
		"svg-icons1836"
	],
	"./solid/temperature-half.svg": [
		"./src/collapse/svg/solid/temperature-half.svg",
		"svg-icons1837"
	],
	"./solid/temperature-high.svg": [
		"./src/collapse/svg/solid/temperature-high.svg",
		"svg-icons1838"
	],
	"./solid/temperature-low.svg": [
		"./src/collapse/svg/solid/temperature-low.svg",
		"svg-icons1839"
	],
	"./solid/temperature-quarter.svg": [
		"./src/collapse/svg/solid/temperature-quarter.svg",
		"svg-icons1840"
	],
	"./solid/temperature-three-quarters.svg": [
		"./src/collapse/svg/solid/temperature-three-quarters.svg",
		"svg-icons1841"
	],
	"./solid/tenge-sign.svg": [
		"./src/collapse/svg/solid/tenge-sign.svg",
		"svg-icons1842"
	],
	"./solid/tent-arrow-down-to-line.svg": [
		"./src/collapse/svg/solid/tent-arrow-down-to-line.svg",
		"svg-icons1843"
	],
	"./solid/tent-arrow-left-right.svg": [
		"./src/collapse/svg/solid/tent-arrow-left-right.svg",
		"svg-icons1844"
	],
	"./solid/tent-arrow-turn-left.svg": [
		"./src/collapse/svg/solid/tent-arrow-turn-left.svg",
		"svg-icons1845"
	],
	"./solid/tent-arrows-down.svg": [
		"./src/collapse/svg/solid/tent-arrows-down.svg",
		"svg-icons1846"
	],
	"./solid/tent.svg": [
		"./src/collapse/svg/solid/tent.svg",
		"svg-icons1847"
	],
	"./solid/tents.svg": [
		"./src/collapse/svg/solid/tents.svg",
		"svg-icons1848"
	],
	"./solid/terminal.svg": [
		"./src/collapse/svg/solid/terminal.svg",
		"svg-icons1849"
	],
	"./solid/text-height.svg": [
		"./src/collapse/svg/solid/text-height.svg",
		"svg-icons1850"
	],
	"./solid/text-slash.svg": [
		"./src/collapse/svg/solid/text-slash.svg",
		"svg-icons1851"
	],
	"./solid/text-width.svg": [
		"./src/collapse/svg/solid/text-width.svg",
		"svg-icons1852"
	],
	"./solid/thermometer.svg": [
		"./src/collapse/svg/solid/thermometer.svg",
		"svg-icons1853"
	],
	"./solid/thumbs-down.svg": [
		"./src/collapse/svg/solid/thumbs-down.svg",
		"svg-icons1854"
	],
	"./solid/thumbs-up.svg": [
		"./src/collapse/svg/solid/thumbs-up.svg",
		"svg-icons1855"
	],
	"./solid/thumbtack.svg": [
		"./src/collapse/svg/solid/thumbtack.svg",
		"svg-icons1856"
	],
	"./solid/ticket-simple.svg": [
		"./src/collapse/svg/solid/ticket-simple.svg",
		"svg-icons1857"
	],
	"./solid/ticket.svg": [
		"./src/collapse/svg/solid/ticket.svg",
		"svg-icons1858"
	],
	"./solid/timeline.svg": [
		"./src/collapse/svg/solid/timeline.svg",
		"svg-icons1859"
	],
	"./solid/toggle-off.svg": [
		"./src/collapse/svg/solid/toggle-off.svg",
		"svg-icons1860"
	],
	"./solid/toggle-on.svg": [
		"./src/collapse/svg/solid/toggle-on.svg",
		"svg-icons1861"
	],
	"./solid/toilet-paper-slash.svg": [
		"./src/collapse/svg/solid/toilet-paper-slash.svg",
		"svg-icons1862"
	],
	"./solid/toilet-paper.svg": [
		"./src/collapse/svg/solid/toilet-paper.svg",
		"svg-icons1863"
	],
	"./solid/toilet-portable.svg": [
		"./src/collapse/svg/solid/toilet-portable.svg",
		"svg-icons1864"
	],
	"./solid/toilet.svg": [
		"./src/collapse/svg/solid/toilet.svg",
		"svg-icons1865"
	],
	"./solid/toilets-portable.svg": [
		"./src/collapse/svg/solid/toilets-portable.svg",
		"svg-icons1866"
	],
	"./solid/toolbox.svg": [
		"./src/collapse/svg/solid/toolbox.svg",
		"svg-icons1867"
	],
	"./solid/tooth.svg": [
		"./src/collapse/svg/solid/tooth.svg",
		"svg-icons1868"
	],
	"./solid/torii-gate.svg": [
		"./src/collapse/svg/solid/torii-gate.svg",
		"svg-icons1869"
	],
	"./solid/tornado.svg": [
		"./src/collapse/svg/solid/tornado.svg",
		"svg-icons1870"
	],
	"./solid/tower-broadcast.svg": [
		"./src/collapse/svg/solid/tower-broadcast.svg",
		"svg-icons1871"
	],
	"./solid/tower-cell.svg": [
		"./src/collapse/svg/solid/tower-cell.svg",
		"svg-icons1872"
	],
	"./solid/tower-observation.svg": [
		"./src/collapse/svg/solid/tower-observation.svg",
		"svg-icons1873"
	],
	"./solid/tractor.svg": [
		"./src/collapse/svg/solid/tractor.svg",
		"svg-icons1874"
	],
	"./solid/trademark.svg": [
		"./src/collapse/svg/solid/trademark.svg",
		"svg-icons1875"
	],
	"./solid/traffic-light.svg": [
		"./src/collapse/svg/solid/traffic-light.svg",
		"svg-icons1876"
	],
	"./solid/trailer.svg": [
		"./src/collapse/svg/solid/trailer.svg",
		"svg-icons1877"
	],
	"./solid/train-subway.svg": [
		"./src/collapse/svg/solid/train-subway.svg",
		"svg-icons1878"
	],
	"./solid/train-tram.svg": [
		"./src/collapse/svg/solid/train-tram.svg",
		"svg-icons1879"
	],
	"./solid/train.svg": [
		"./src/collapse/svg/solid/train.svg",
		"svg-icons1880"
	],
	"./solid/transgender.svg": [
		"./src/collapse/svg/solid/transgender.svg",
		"svg-icons1881"
	],
	"./solid/trash-arrow-up.svg": [
		"./src/collapse/svg/solid/trash-arrow-up.svg",
		"svg-icons1882"
	],
	"./solid/trash-can-arrow-up.svg": [
		"./src/collapse/svg/solid/trash-can-arrow-up.svg",
		"svg-icons1883"
	],
	"./solid/trash-can.svg": [
		"./src/collapse/svg/solid/trash-can.svg",
		"svg-icons1884"
	],
	"./solid/trash.svg": [
		"./src/collapse/svg/solid/trash.svg",
		"svg-icons1885"
	],
	"./solid/tree-city.svg": [
		"./src/collapse/svg/solid/tree-city.svg",
		"svg-icons1886"
	],
	"./solid/tree.svg": [
		"./src/collapse/svg/solid/tree.svg",
		"svg-icons1887"
	],
	"./solid/triangle-exclamation.svg": [
		"./src/collapse/svg/solid/triangle-exclamation.svg",
		"svg-icons1888"
	],
	"./solid/trophy.svg": [
		"./src/collapse/svg/solid/trophy.svg",
		"svg-icons1889"
	],
	"./solid/trowel-bricks.svg": [
		"./src/collapse/svg/solid/trowel-bricks.svg",
		"svg-icons1890"
	],
	"./solid/trowel.svg": [
		"./src/collapse/svg/solid/trowel.svg",
		"svg-icons1891"
	],
	"./solid/truck-arrow-right.svg": [
		"./src/collapse/svg/solid/truck-arrow-right.svg",
		"svg-icons1892"
	],
	"./solid/truck-droplet.svg": [
		"./src/collapse/svg/solid/truck-droplet.svg",
		"svg-icons1893"
	],
	"./solid/truck-fast.svg": [
		"./src/collapse/svg/solid/truck-fast.svg",
		"svg-icons1894"
	],
	"./solid/truck-field-un.svg": [
		"./src/collapse/svg/solid/truck-field-un.svg",
		"svg-icons1895"
	],
	"./solid/truck-field.svg": [
		"./src/collapse/svg/solid/truck-field.svg",
		"svg-icons1896"
	],
	"./solid/truck-front.svg": [
		"./src/collapse/svg/solid/truck-front.svg",
		"svg-icons1897"
	],
	"./solid/truck-medical.svg": [
		"./src/collapse/svg/solid/truck-medical.svg",
		"svg-icons1898"
	],
	"./solid/truck-monster.svg": [
		"./src/collapse/svg/solid/truck-monster.svg",
		"svg-icons1899"
	],
	"./solid/truck-moving.svg": [
		"./src/collapse/svg/solid/truck-moving.svg",
		"svg-icons1900"
	],
	"./solid/truck-pickup.svg": [
		"./src/collapse/svg/solid/truck-pickup.svg",
		"svg-icons1901"
	],
	"./solid/truck-plane.svg": [
		"./src/collapse/svg/solid/truck-plane.svg",
		"svg-icons1902"
	],
	"./solid/truck-ramp-box.svg": [
		"./src/collapse/svg/solid/truck-ramp-box.svg",
		"svg-icons1903"
	],
	"./solid/truck.svg": [
		"./src/collapse/svg/solid/truck.svg",
		"svg-icons1904"
	],
	"./solid/tty.svg": [
		"./src/collapse/svg/solid/tty.svg",
		"svg-icons1905"
	],
	"./solid/turkish-lira-sign.svg": [
		"./src/collapse/svg/solid/turkish-lira-sign.svg",
		"svg-icons1906"
	],
	"./solid/turn-down.svg": [
		"./src/collapse/svg/solid/turn-down.svg",
		"svg-icons1907"
	],
	"./solid/turn-up.svg": [
		"./src/collapse/svg/solid/turn-up.svg",
		"svg-icons1908"
	],
	"./solid/tv.svg": [
		"./src/collapse/svg/solid/tv.svg",
		"svg-icons1909"
	],
	"./solid/u.svg": [
		"./src/collapse/svg/solid/u.svg",
		"svg-icons1910"
	],
	"./solid/umbrella-beach.svg": [
		"./src/collapse/svg/solid/umbrella-beach.svg",
		"svg-icons1911"
	],
	"./solid/umbrella.svg": [
		"./src/collapse/svg/solid/umbrella.svg",
		"svg-icons1912"
	],
	"./solid/underline.svg": [
		"./src/collapse/svg/solid/underline.svg",
		"svg-icons1913"
	],
	"./solid/universal-access.svg": [
		"./src/collapse/svg/solid/universal-access.svg",
		"svg-icons1914"
	],
	"./solid/unlock-keyhole.svg": [
		"./src/collapse/svg/solid/unlock-keyhole.svg",
		"svg-icons1915"
	],
	"./solid/unlock.svg": [
		"./src/collapse/svg/solid/unlock.svg",
		"svg-icons1916"
	],
	"./solid/up-down-left-right.svg": [
		"./src/collapse/svg/solid/up-down-left-right.svg",
		"svg-icons1917"
	],
	"./solid/up-down.svg": [
		"./src/collapse/svg/solid/up-down.svg",
		"svg-icons1918"
	],
	"./solid/up-long.svg": [
		"./src/collapse/svg/solid/up-long.svg",
		"svg-icons1919"
	],
	"./solid/up-right-and-down-left-from-center.svg": [
		"./src/collapse/svg/solid/up-right-and-down-left-from-center.svg",
		"svg-icons1920"
	],
	"./solid/up-right-from-square.svg": [
		"./src/collapse/svg/solid/up-right-from-square.svg",
		"svg-icons1921"
	],
	"./solid/upload.svg": [
		"./src/collapse/svg/solid/upload.svg",
		"svg-icons1922"
	],
	"./solid/user-astronaut.svg": [
		"./src/collapse/svg/solid/user-astronaut.svg",
		"svg-icons1923"
	],
	"./solid/user-check.svg": [
		"./src/collapse/svg/solid/user-check.svg",
		"svg-icons1924"
	],
	"./solid/user-clock.svg": [
		"./src/collapse/svg/solid/user-clock.svg",
		"svg-icons1925"
	],
	"./solid/user-doctor.svg": [
		"./src/collapse/svg/solid/user-doctor.svg",
		"svg-icons1926"
	],
	"./solid/user-gear.svg": [
		"./src/collapse/svg/solid/user-gear.svg",
		"svg-icons1927"
	],
	"./solid/user-graduate.svg": [
		"./src/collapse/svg/solid/user-graduate.svg",
		"svg-icons1928"
	],
	"./solid/user-group.svg": [
		"./src/collapse/svg/solid/user-group.svg",
		"svg-icons1929"
	],
	"./solid/user-injured.svg": [
		"./src/collapse/svg/solid/user-injured.svg",
		"svg-icons1930"
	],
	"./solid/user-large-slash.svg": [
		"./src/collapse/svg/solid/user-large-slash.svg",
		"svg-icons1931"
	],
	"./solid/user-large.svg": [
		"./src/collapse/svg/solid/user-large.svg",
		"svg-icons1932"
	],
	"./solid/user-lock.svg": [
		"./src/collapse/svg/solid/user-lock.svg",
		"svg-icons1933"
	],
	"./solid/user-minus.svg": [
		"./src/collapse/svg/solid/user-minus.svg",
		"svg-icons1934"
	],
	"./solid/user-ninja.svg": [
		"./src/collapse/svg/solid/user-ninja.svg",
		"svg-icons1935"
	],
	"./solid/user-nurse.svg": [
		"./src/collapse/svg/solid/user-nurse.svg",
		"svg-icons1936"
	],
	"./solid/user-pen.svg": [
		"./src/collapse/svg/solid/user-pen.svg",
		"svg-icons1937"
	],
	"./solid/user-plus.svg": [
		"./src/collapse/svg/solid/user-plus.svg",
		"svg-icons1938"
	],
	"./solid/user-secret.svg": [
		"./src/collapse/svg/solid/user-secret.svg",
		"svg-icons1939"
	],
	"./solid/user-shield.svg": [
		"./src/collapse/svg/solid/user-shield.svg",
		"svg-icons1940"
	],
	"./solid/user-slash.svg": [
		"./src/collapse/svg/solid/user-slash.svg",
		"svg-icons1941"
	],
	"./solid/user-tag.svg": [
		"./src/collapse/svg/solid/user-tag.svg",
		"svg-icons1942"
	],
	"./solid/user-tie.svg": [
		"./src/collapse/svg/solid/user-tie.svg",
		"svg-icons1943"
	],
	"./solid/user-xmark.svg": [
		"./src/collapse/svg/solid/user-xmark.svg",
		"svg-icons1944"
	],
	"./solid/user.svg": [
		"./src/collapse/svg/solid/user.svg",
		"svg-icons1945"
	],
	"./solid/users-between-lines.svg": [
		"./src/collapse/svg/solid/users-between-lines.svg",
		"svg-icons1946"
	],
	"./solid/users-gear.svg": [
		"./src/collapse/svg/solid/users-gear.svg",
		"svg-icons1947"
	],
	"./solid/users-line.svg": [
		"./src/collapse/svg/solid/users-line.svg",
		"svg-icons1948"
	],
	"./solid/users-rays.svg": [
		"./src/collapse/svg/solid/users-rays.svg",
		"svg-icons1949"
	],
	"./solid/users-rectangle.svg": [
		"./src/collapse/svg/solid/users-rectangle.svg",
		"svg-icons1950"
	],
	"./solid/users-slash.svg": [
		"./src/collapse/svg/solid/users-slash.svg",
		"svg-icons1951"
	],
	"./solid/users-viewfinder.svg": [
		"./src/collapse/svg/solid/users-viewfinder.svg",
		"svg-icons1952"
	],
	"./solid/users.svg": [
		"./src/collapse/svg/solid/users.svg",
		"svg-icons1953"
	],
	"./solid/utensils.svg": [
		"./src/collapse/svg/solid/utensils.svg",
		"svg-icons1954"
	],
	"./solid/v.svg": [
		"./src/collapse/svg/solid/v.svg",
		"svg-icons1955"
	],
	"./solid/van-shuttle.svg": [
		"./src/collapse/svg/solid/van-shuttle.svg",
		"svg-icons1956"
	],
	"./solid/vault.svg": [
		"./src/collapse/svg/solid/vault.svg",
		"svg-icons1957"
	],
	"./solid/vector-square.svg": [
		"./src/collapse/svg/solid/vector-square.svg",
		"svg-icons1958"
	],
	"./solid/venus-double.svg": [
		"./src/collapse/svg/solid/venus-double.svg",
		"svg-icons1959"
	],
	"./solid/venus-mars.svg": [
		"./src/collapse/svg/solid/venus-mars.svg",
		"svg-icons1960"
	],
	"./solid/venus.svg": [
		"./src/collapse/svg/solid/venus.svg",
		"svg-icons1961"
	],
	"./solid/vest-patches.svg": [
		"./src/collapse/svg/solid/vest-patches.svg",
		"svg-icons1962"
	],
	"./solid/vest.svg": [
		"./src/collapse/svg/solid/vest.svg",
		"svg-icons1963"
	],
	"./solid/vial-circle-check.svg": [
		"./src/collapse/svg/solid/vial-circle-check.svg",
		"svg-icons1964"
	],
	"./solid/vial-virus.svg": [
		"./src/collapse/svg/solid/vial-virus.svg",
		"svg-icons1965"
	],
	"./solid/vial.svg": [
		"./src/collapse/svg/solid/vial.svg",
		"svg-icons1966"
	],
	"./solid/vials.svg": [
		"./src/collapse/svg/solid/vials.svg",
		"svg-icons1967"
	],
	"./solid/video-slash.svg": [
		"./src/collapse/svg/solid/video-slash.svg",
		"svg-icons1968"
	],
	"./solid/video.svg": [
		"./src/collapse/svg/solid/video.svg",
		"svg-icons1969"
	],
	"./solid/vihara.svg": [
		"./src/collapse/svg/solid/vihara.svg",
		"svg-icons1970"
	],
	"./solid/virus-covid-slash.svg": [
		"./src/collapse/svg/solid/virus-covid-slash.svg",
		"svg-icons1971"
	],
	"./solid/virus-covid.svg": [
		"./src/collapse/svg/solid/virus-covid.svg",
		"svg-icons1972"
	],
	"./solid/virus-slash.svg": [
		"./src/collapse/svg/solid/virus-slash.svg",
		"svg-icons1973"
	],
	"./solid/virus.svg": [
		"./src/collapse/svg/solid/virus.svg",
		"svg-icons1974"
	],
	"./solid/viruses.svg": [
		"./src/collapse/svg/solid/viruses.svg",
		"svg-icons1975"
	],
	"./solid/voicemail.svg": [
		"./src/collapse/svg/solid/voicemail.svg",
		"svg-icons1976"
	],
	"./solid/volcano.svg": [
		"./src/collapse/svg/solid/volcano.svg",
		"svg-icons1977"
	],
	"./solid/volleyball.svg": [
		"./src/collapse/svg/solid/volleyball.svg",
		"svg-icons1978"
	],
	"./solid/volume-high.svg": [
		"./src/collapse/svg/solid/volume-high.svg",
		"svg-icons1979"
	],
	"./solid/volume-low.svg": [
		"./src/collapse/svg/solid/volume-low.svg",
		"svg-icons1980"
	],
	"./solid/volume-off.svg": [
		"./src/collapse/svg/solid/volume-off.svg",
		"svg-icons1981"
	],
	"./solid/volume-xmark.svg": [
		"./src/collapse/svg/solid/volume-xmark.svg",
		"svg-icons1982"
	],
	"./solid/vr-cardboard.svg": [
		"./src/collapse/svg/solid/vr-cardboard.svg",
		"svg-icons1983"
	],
	"./solid/w.svg": [
		"./src/collapse/svg/solid/w.svg",
		"svg-icons1984"
	],
	"./solid/walkie-talkie.svg": [
		"./src/collapse/svg/solid/walkie-talkie.svg",
		"svg-icons1985"
	],
	"./solid/wallet.svg": [
		"./src/collapse/svg/solid/wallet.svg",
		"svg-icons1986"
	],
	"./solid/wand-magic-sparkles.svg": [
		"./src/collapse/svg/solid/wand-magic-sparkles.svg",
		"svg-icons1987"
	],
	"./solid/wand-magic.svg": [
		"./src/collapse/svg/solid/wand-magic.svg",
		"svg-icons1988"
	],
	"./solid/wand-sparkles.svg": [
		"./src/collapse/svg/solid/wand-sparkles.svg",
		"svg-icons1989"
	],
	"./solid/warehouse.svg": [
		"./src/collapse/svg/solid/warehouse.svg",
		"svg-icons1990"
	],
	"./solid/water-ladder.svg": [
		"./src/collapse/svg/solid/water-ladder.svg",
		"svg-icons1991"
	],
	"./solid/water.svg": [
		"./src/collapse/svg/solid/water.svg",
		"svg-icons1992"
	],
	"./solid/wave-square.svg": [
		"./src/collapse/svg/solid/wave-square.svg",
		"svg-icons1993"
	],
	"./solid/weight-hanging.svg": [
		"./src/collapse/svg/solid/weight-hanging.svg",
		"svg-icons1994"
	],
	"./solid/weight-scale.svg": [
		"./src/collapse/svg/solid/weight-scale.svg",
		"svg-icons1995"
	],
	"./solid/wheat-awn-circle-exclamation.svg": [
		"./src/collapse/svg/solid/wheat-awn-circle-exclamation.svg",
		"svg-icons1996"
	],
	"./solid/wheat-awn.svg": [
		"./src/collapse/svg/solid/wheat-awn.svg",
		"svg-icons1997"
	],
	"./solid/wheelchair-move.svg": [
		"./src/collapse/svg/solid/wheelchair-move.svg",
		"svg-icons1998"
	],
	"./solid/wheelchair.svg": [
		"./src/collapse/svg/solid/wheelchair.svg",
		"svg-icons1999"
	],
	"./solid/whiskey-glass.svg": [
		"./src/collapse/svg/solid/whiskey-glass.svg",
		"svg-icons2000"
	],
	"./solid/wifi.svg": [
		"./src/collapse/svg/solid/wifi.svg",
		"svg-icons2001"
	],
	"./solid/wind.svg": [
		"./src/collapse/svg/solid/wind.svg",
		"svg-icons2002"
	],
	"./solid/window-maximize.svg": [
		"./src/collapse/svg/solid/window-maximize.svg",
		"svg-icons2003"
	],
	"./solid/window-minimize.svg": [
		"./src/collapse/svg/solid/window-minimize.svg",
		"svg-icons2004"
	],
	"./solid/window-restore.svg": [
		"./src/collapse/svg/solid/window-restore.svg",
		"svg-icons2005"
	],
	"./solid/wine-bottle.svg": [
		"./src/collapse/svg/solid/wine-bottle.svg",
		"svg-icons2006"
	],
	"./solid/wine-glass-empty.svg": [
		"./src/collapse/svg/solid/wine-glass-empty.svg",
		"svg-icons2007"
	],
	"./solid/wine-glass.svg": [
		"./src/collapse/svg/solid/wine-glass.svg",
		"svg-icons2008"
	],
	"./solid/won-sign.svg": [
		"./src/collapse/svg/solid/won-sign.svg",
		"svg-icons2009"
	],
	"./solid/worm.svg": [
		"./src/collapse/svg/solid/worm.svg",
		"svg-icons2010"
	],
	"./solid/wrench.svg": [
		"./src/collapse/svg/solid/wrench.svg",
		"svg-icons2011"
	],
	"./solid/x-ray.svg": [
		"./src/collapse/svg/solid/x-ray.svg",
		"svg-icons2012"
	],
	"./solid/x.svg": [
		"./src/collapse/svg/solid/x.svg",
		"svg-icons2013"
	],
	"./solid/xmark.svg": [
		"./src/collapse/svg/solid/xmark.svg",
		"svg-icons2014"
	],
	"./solid/xmarks-lines.svg": [
		"./src/collapse/svg/solid/xmarks-lines.svg",
		"svg-icons2015"
	],
	"./solid/y.svg": [
		"./src/collapse/svg/solid/y.svg",
		"svg-icons2016"
	],
	"./solid/yen-sign.svg": [
		"./src/collapse/svg/solid/yen-sign.svg",
		"svg-icons2017"
	],
	"./solid/yin-yang.svg": [
		"./src/collapse/svg/solid/yin-yang.svg",
		"svg-icons2018"
	],
	"./solid/z.svg": [
		"./src/collapse/svg/solid/z.svg",
		"svg-icons2019"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function() { return Object.keys(map); };
webpackAsyncContext.id = "./src/collapse/svg lazy recursive ^\\.\\/.*\\.svg$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ (function(module) {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/primitives":
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
/***/ (function(module) {

"use strict";
module.exports = window["wp"]["primitives"];

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayLikeToArray; }
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithHoles; }
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _arrayWithoutHoles; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _defineProperty; }
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArray; }
/* harmony export */ });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _iterableToArrayLimit; }
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableRest; }
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _nonIterableSpread; }
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutProperties; }
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _objectWithoutPropertiesLoose; }
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _slicedToArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toConsumableArray; }
/* harmony export */ });
/* harmony import */ var _arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArray.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableSpread.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js");




function _toConsumableArray(arr) {
  return (0,_arrayWithoutHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArray_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr) || (0,_nonIterableSpread_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toPrimitive; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _toPropertyKey; }
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _typeof; }
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ _unsupportedIterableToArray; }
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ }),

/***/ "./src/accordion/InspectorControls/fontawesomeIconNames.json":
/*!*******************************************************************!*\
  !*** ./src/accordion/InspectorControls/fontawesomeIconNames.json ***!
  \*******************************************************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"brands":["42-group","500px","accessible-icon","accusoft","adn","adversal","affiliatetheme","airbnb","algolia","alipay","amazon-pay","amazon","amilia","android","angellist","angrycreative","angular","app-store-ios","app-store","apper","apple-pay","apple","artstation","asymmetrik","atlassian","audible","autoprefixer","avianex","aviato","aws","bandcamp","battle-net","behance","bilibili","bimobject","bitbucket","bitcoin","bity","black-tie","blackberry","blogger-b","blogger","bluetooth-b","bluetooth","bootstrap","bots","btc","buffer","buromobelexperte","buy-n-large","buysellads","canadian-maple-leaf","cc-amazon-pay","cc-amex","cc-apple-pay","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","centercode","centos","chrome","chromecast","cloudflare","cloudscale","cloudsmith","cloudversify","cmplid","codepen","codiepie","confluence","connectdevelop","contao","cotton-bureau","cpanel","creative-commons-by","creative-commons-nc-eu","creative-commons-nc-jp","creative-commons-nc","creative-commons-nd","creative-commons-pd-alt","creative-commons-pd","creative-commons-remix","creative-commons-sa","creative-commons-sampling-plus","creative-commons-sampling","creative-commons-share","creative-commons-zero","creative-commons","critical-role","css3-alt","css3","cuttlefish","d-and-d-beyond","d-and-d","dailymotion","dashcube","deezer","delicious","deploydog","deskpro","dev","deviantart","dhl","diaspora","digg","digital-ocean","discord","discourse","dochub","docker","draft2digital","dribbble","dropbox","drupal","dyalog","earlybirds","ebay","edge-legacy","edge","elementor","ello","ember","empire","envira","erlang","ethereum","etsy","evernote","expeditedssl","facebook-f","facebook-messenger","facebook","fantasy-flight-games","fedex","fedora","figma","firefox-browser","firefox","first-order-alt","first-order","firstdraft","flickr","flipboard","fly","font-awesome","fonticons-fi","fonticons","fort-awesome-alt","fort-awesome","forumbee","foursquare","free-code-camp","freebsd","fulcrum","galactic-republic","galactic-senate","get-pocket","gg-circle","gg","git-alt","git","github-alt","github","gitkraken","gitlab","gitter","glide-g","glide","gofore","golang","goodreads-g","goodreads","google-drive","google-pay","google-play","google-plus-g","google-plus","google-wallet","google","gratipay","grav","gripfire","grunt","guilded","gulp","hacker-news","hackerrank","hashnode","hips","hire-a-helper","hive","hooli","hornbill","hotjar","houzz","html5","hubspot","ideal","imdb","instagram","instalod","intercom","internet-explorer","invision","ioxhost","itch-io","itunes-note","itunes","java","jedi-order","jenkins","jira","joget","joomla","js","jsfiddle","kaggle","keybase","keycdn","kickstarter-k","kickstarter","korvue","laravel","lastfm","leanpub","less","line","linkedin-in","linkedin","linode","linux","lyft","magento","mailchimp","mandalorian","markdown","mastodon","maxcdn","mdb","medapps","medium","medrt","meetup","megaport","mendeley","meta","microblog","microsoft","mix","mixcloud","mixer","mizuni","modx","monero","napster","neos","nfc-directional","nfc-symbol","nimblr","node-js","node","npm","ns8","nutritionix","octopus-deploy","odnoklassniki","old-republic","opencart","openid","opera","optin-monster","orcid","osi","padlet","page4","pagelines","palfed","patreon","paypal","perbyte","periscope","phabricator","phoenix-framework","phoenix-squadron","php","pied-piper-alt","pied-piper-hat","pied-piper-pp","pied-piper","pinterest-p","pinterest","pix","playstation","product-hunt","pushed","python","qq","quinscape","quora","r-project","raspberry-pi","ravelry","react","reacteurope","readme","rebel","red-river","reddit-alien","reddit","redhat","renren","replyd","researchgate","resolving","rev","rocketchat","rockrms","rust","safari","salesforce","sass","schlix","screenpal","scribd","searchengin","sellcast","sellsy","servicestack","shirtsinbulk","shopify","shopware","simplybuilt","sistrix","sith","sitrox","sketch","skyatlas","skype","slack","slideshare","snapchat","soundcloud","sourcetree","space-awesome","speakap","speaker-deck","spotify","square-behance","square-dribbble","square-facebook","square-font-awesome-stroke","square-font-awesome","square-git","square-github","square-gitlab","square-google-plus","square-hacker-news","square-instagram","square-js","square-lastfm","square-odnoklassniki","square-pied-piper","square-pinterest","square-reddit","square-snapchat","square-steam","square-tumblr","square-twitter","square-viadeo","square-vimeo","square-whatsapp","square-xing","square-youtube","squarespace","stack-exchange","stack-overflow","stackpath","staylinked","steam-symbol","steam","sticker-mule","strava","stripe-s","stripe","studiovinari","stumbleupon-circle","stumbleupon","superpowers","supple","suse","swift","symfony","teamspeak","telegram","tencent-weibo","the-red-yeti","themeco","themeisle","think-peaks","tiktok","trade-federation","trello","tumblr","twitch","twitter","typo3","uber","ubuntu","uikit","umbraco","uncharted","uniregistry","unity","unsplash","untappd","ups","usb","usps","ussunnah","vaadin","viacoin","viadeo","viber","vimeo-v","vimeo","vine","vk","vnv","vuejs","watchman-monitoring","waze","weebly","weibo","weixin","whatsapp","whmcs","wikipedia-w","windows","wirsindhandwerk","wix","wizards-of-the-coast","wodu","wolf-pack-battalion","wordpress-simple","wordpress","wpbeginner","wpexplorer","wpforms","wpressr","xbox","xing","y-combinator","yahoo","yammer","yandex-international","yandex","yarn","yelp","yoast","youtube","zhihu"],"regular":["address-book","address-card","bell-slash","bell","bookmark","building","calendar-check","calendar-days","calendar-minus","calendar-plus","calendar-xmark","calendar","chart-bar","chess-bishop","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","circle-check","circle-dot","circle-down","circle-left","circle-pause","circle-play","circle-question","circle-right","circle-stop","circle-up","circle-user","circle-xmark","circle","clipboard","clock","clone","closed-captioning","comment-dots","comment","comments","compass","copy","copyright","credit-card","envelope-open","envelope","eye-slash","eye","face-angry","face-dizzy","face-flushed","face-frown-open","face-frown","face-grimace","face-grin-beam-sweat","face-grin-beam","face-grin-hearts","face-grin-squint-tears","face-grin-squint","face-grin-stars","face-grin-tears","face-grin-tongue-squint","face-grin-tongue-wink","face-grin-tongue","face-grin-wide","face-grin-wink","face-grin","face-kiss-beam","face-kiss-wink-heart","face-kiss","face-laugh-beam","face-laugh-squint","face-laugh-wink","face-laugh","face-meh-blank","face-meh","face-rolling-eyes","face-sad-cry","face-sad-tear","face-smile-beam","face-smile-wink","face-smile","face-surprise","face-tired","file-audio","file-code","file-excel","file-image","file-lines","file-pdf","file-powerpoint","file-video","file-word","file-zipper","file","flag","floppy-disk","folder-closed","folder-open","folder","font-awesome","futbol","gem","hand-back-fist","hand-lizard","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-scissors","hand-spock","hand","handshake","hard-drive","heart","hospital","hourglass-half","hourglass","id-badge","id-card","image","images","keyboard","lemon","life-ring","lightbulb","map","message","money-bill-1","moon","newspaper","notdef","note-sticky","object-group","object-ungroup","paper-plane","paste","pen-to-square","rectangle-list","rectangle-xmark","registered","share-from-square","snowflake","square-caret-down","square-caret-left","square-caret-right","square-caret-up","square-check","square-full","square-minus","square-plus","square","star-half-stroke","star-half","star","sun","thumbs-down","thumbs-up","trash-can","user","window-maximize","window-minimize","window-restore"],"solid":["0","1","2","3","4","5","6","7","8","9","a","address-book","address-card","align-center","align-justify","align-left","align-right","anchor-circle-check","anchor-circle-exclamation","anchor-circle-xmark","anchor-lock","anchor","angle-down","angle-left","angle-right","angle-up","angles-down","angles-left","angles-right","angles-up","ankh","apple-whole","archway","arrow-down-1-9","arrow-down-9-1","arrow-down-a-z","arrow-down-long","arrow-down-short-wide","arrow-down-up-across-line","arrow-down-up-lock","arrow-down-wide-short","arrow-down-z-a","arrow-down","arrow-left-long","arrow-left","arrow-pointer","arrow-right-arrow-left","arrow-right-from-bracket","arrow-right-long","arrow-right-to-bracket","arrow-right-to-city","arrow-right","arrow-rotate-left","arrow-rotate-right","arrow-trend-down","arrow-trend-up","arrow-turn-down","arrow-turn-up","arrow-up-1-9","arrow-up-9-1","arrow-up-a-z","arrow-up-from-bracket","arrow-up-from-ground-water","arrow-up-from-water-pump","arrow-up-long","arrow-up-right-dots","arrow-up-right-from-square","arrow-up-short-wide","arrow-up-wide-short","arrow-up-z-a","arrow-up","arrows-down-to-line","arrows-down-to-people","arrows-left-right-to-line","arrows-left-right","arrows-rotate","arrows-spin","arrows-split-up-and-left","arrows-to-circle","arrows-to-dot","arrows-to-eye","arrows-turn-right","arrows-turn-to-dots","arrows-up-down-left-right","arrows-up-down","arrows-up-to-line","asterisk","at","atom","audio-description","austral-sign","award","b","baby-carriage","baby","backward-fast","backward-step","backward","bacon","bacteria","bacterium","bag-shopping","bahai","baht-sign","ban-smoking","ban","bandage","barcode","bars-progress","bars-staggered","bars","baseball-bat-ball","baseball","basket-shopping","basketball","bath","battery-empty","battery-full","battery-half","battery-quarter","battery-three-quarters","bed-pulse","bed","beer-mug-empty","bell-concierge","bell-slash","bell","bezier-curve","bicycle","binoculars","biohazard","bitcoin-sign","blender-phone","blender","blog","bold","bolt-lightning","bolt","bomb","bone","bong","book-atlas","book-bible","book-bookmark","book-journal-whills","book-medical","book-open-reader","book-open","book-quran","book-skull","book-tanakh","book","bookmark","border-all","border-none","border-top-left","bore-hole","bottle-droplet","bottle-water","bowl-food","bowl-rice","bowling-ball","box-archive","box-open","box-tissue","box","boxes-packing","boxes-stacked","braille","brain","brazilian-real-sign","bread-slice","bridge-circle-check","bridge-circle-exclamation","bridge-circle-xmark","bridge-lock","bridge-water","bridge","briefcase-medical","briefcase","broom-ball","broom","brush","bucket","bug-slash","bug","bugs","building-circle-arrow-right","building-circle-check","building-circle-exclamation","building-circle-xmark","building-columns","building-flag","building-lock","building-ngo","building-shield","building-un","building-user","building-wheat","building","bullhorn","bullseye","burger","burst","bus-simple","bus","business-time","c","cable-car","cake-candles","calculator","calendar-check","calendar-day","calendar-days","calendar-minus","calendar-plus","calendar-week","calendar-xmark","calendar","camera-retro","camera-rotate","camera","campground","candy-cane","cannabis","capsules","car-battery","car-burst","car-on","car-rear","car-side","car-tunnel","car","caravan","caret-down","caret-left","caret-right","caret-up","carrot","cart-arrow-down","cart-flatbed-suitcase","cart-flatbed","cart-plus","cart-shopping","cash-register","cat","cedi-sign","cent-sign","certificate","chair","chalkboard-user","chalkboard","champagne-glasses","charging-station","chart-area","chart-bar","chart-column","chart-gantt","chart-line","chart-pie","chart-simple","check-double","check-to-slot","check","cheese","chess-bishop","chess-board","chess-king","chess-knight","chess-pawn","chess-queen","chess-rook","chess","chevron-down","chevron-left","chevron-right","chevron-up","child-dress","child-reaching","child-rifle","child","children","church","circle-arrow-down","circle-arrow-left","circle-arrow-right","circle-arrow-up","circle-check","circle-chevron-down","circle-chevron-left","circle-chevron-right","circle-chevron-up","circle-dollar-to-slot","circle-dot","circle-down","circle-exclamation","circle-h","circle-half-stroke","circle-info","circle-left","circle-minus","circle-nodes","circle-notch","circle-pause","circle-play","circle-plus","circle-question","circle-radiation","circle-right","circle-stop","circle-up","circle-user","circle-xmark","circle","city","clapperboard","clipboard-check","clipboard-list","clipboard-question","clipboard-user","clipboard","clock-rotate-left","clock","clone","closed-captioning","cloud-arrow-down","cloud-arrow-up","cloud-bolt","cloud-meatball","cloud-moon-rain","cloud-moon","cloud-rain","cloud-showers-heavy","cloud-showers-water","cloud-sun-rain","cloud-sun","cloud","clover","code-branch","code-commit","code-compare","code-fork","code-merge","code-pull-request","code","coins","colon-sign","comment-dollar","comment-dots","comment-medical","comment-slash","comment-sms","comment","comments-dollar","comments","compact-disc","compass-drafting","compass","compress","computer-mouse","computer","cookie-bite","cookie","copy","copyright","couch","cow","credit-card","crop-simple","crop","cross","crosshairs","crow","crown","crutch","cruzeiro-sign","cube","cubes-stacked","cubes","d","database","delete-left","democrat","desktop","dharmachakra","diagram-next","diagram-predecessor","diagram-project","diagram-successor","diamond-turn-right","diamond","dice-d6","dice-d20","dice-five","dice-four","dice-one","dice-six","dice-three","dice-two","dice","disease","display","divide","dna","dog","dollar-sign","dolly","dong-sign","door-closed","door-open","dove","down-left-and-up-right-to-center","down-long","download","dragon","draw-polygon","droplet-slash","droplet","drum-steelpan","drum","drumstick-bite","dumbbell","dumpster-fire","dumpster","dungeon","e","ear-deaf","ear-listen","earth-africa","earth-americas","earth-asia","earth-europe","earth-oceania","egg","eject","elevator","ellipsis-vertical","ellipsis","envelope-circle-check","envelope-open-text","envelope-open","envelope","envelopes-bulk","equals","eraser","ethernet","euro-sign","exclamation","expand","explosion","eye-dropper","eye-low-vision","eye-slash","eye","f","face-angry","face-dizzy","face-flushed","face-frown-open","face-frown","face-grimace","face-grin-beam-sweat","face-grin-beam","face-grin-hearts","face-grin-squint-tears","face-grin-squint","face-grin-stars","face-grin-tears","face-grin-tongue-squint","face-grin-tongue-wink","face-grin-tongue","face-grin-wide","face-grin-wink","face-grin","face-kiss-beam","face-kiss-wink-heart","face-kiss","face-laugh-beam","face-laugh-squint","face-laugh-wink","face-laugh","face-meh-blank","face-meh","face-rolling-eyes","face-sad-cry","face-sad-tear","face-smile-beam","face-smile-wink","face-smile","face-surprise","face-tired","fan","faucet-drip","faucet","fax","feather-pointed","feather","ferry","file-arrow-down","file-arrow-up","file-audio","file-circle-check","file-circle-exclamation","file-circle-minus","file-circle-plus","file-circle-question","file-circle-xmark","file-code","file-contract","file-csv","file-excel","file-export","file-image","file-import","file-invoice-dollar","file-invoice","file-lines","file-medical","file-pdf","file-pen","file-powerpoint","file-prescription","file-shield","file-signature","file-video","file-waveform","file-word","file-zipper","file","fill-drip","fill","film","filter-circle-dollar","filter-circle-xmark","filter","fingerprint","fire-burner","fire-extinguisher","fire-flame-curved","fire-flame-simple","fire","fish-fins","fish","flag-checkered","flag-usa","flag","flask-vial","flask","floppy-disk","florin-sign","folder-closed","folder-minus","folder-open","folder-plus","folder-tree","folder","font-awesome","font","football","forward-fast","forward-step","forward","franc-sign","frog","futbol","g","gamepad","gas-pump","gauge-high","gauge-simple-high","gauge-simple","gauge","gavel","gear","gears","gem","genderless","ghost","gift","gifts","glass-water-droplet","glass-water","glasses","globe","golf-ball-tee","gopuram","graduation-cap","greater-than-equal","greater-than","grip-lines-vertical","grip-lines","grip-vertical","grip","group-arrows-rotate","guarani-sign","guitar","gun","h","hammer","hamsa","hand-back-fist","hand-dots","hand-fist","hand-holding-dollar","hand-holding-droplet","hand-holding-hand","hand-holding-heart","hand-holding-medical","hand-holding","hand-lizard","hand-middle-finger","hand-peace","hand-point-down","hand-point-left","hand-point-right","hand-point-up","hand-pointer","hand-scissors","hand-sparkles","hand-spock","hand","handcuffs","hands-asl-interpreting","hands-bound","hands-bubbles","hands-clapping","hands-holding-child","hands-holding-circle","hands-holding","hands-praying","hands","handshake-angle","handshake-simple-slash","handshake-simple","handshake-slash","handshake","hanukiah","hard-drive","hashtag","hat-cowboy-side","hat-cowboy","hat-wizard","head-side-cough-slash","head-side-cough","head-side-mask","head-side-virus","heading","headphones-simple","headphones","headset","heart-circle-bolt","heart-circle-check","heart-circle-exclamation","heart-circle-minus","heart-circle-plus","heart-circle-xmark","heart-crack","heart-pulse","heart","helicopter-symbol","helicopter","helmet-safety","helmet-un","highlighter","hill-avalanche","hill-rockslide","hippo","hockey-puck","holly-berry","horse-head","horse","hospital-user","hospital","hot-tub-person","hotdog","hotel","hourglass-end","hourglass-half","hourglass-start","hourglass","house-chimney-crack","house-chimney-medical","house-chimney-user","house-chimney-window","house-chimney","house-circle-check","house-circle-exclamation","house-circle-xmark","house-crack","house-fire","house-flag","house-flood-water-circle-arrow-right","house-flood-water","house-laptop","house-lock","house-medical-circle-check","house-medical-circle-exclamation","house-medical-circle-xmark","house-medical-flag","house-medical","house-signal","house-tsunami","house-user","house","hryvnia-sign","hurricane","i-cursor","i","ice-cream","icicles","icons","id-badge","id-card-clip","id-card","igloo","image-portrait","image","images","inbox","indent","indian-rupee-sign","industry","infinity","info","italic","j","jar-wheat","jar","jedi","jet-fighter-up","jet-fighter","joint","jug-detergent","k","kaaba","key","keyboard","khanda","kip-sign","kit-medical","kitchen-set","kiwi-bird","l","land-mine-on","landmark-dome","landmark-flag","landmark","language","laptop-code","laptop-file","laptop-medical","laptop","lari-sign","layer-group","leaf","left-long","left-right","lemon","less-than-equal","less-than","life-ring","lightbulb","lines-leaning","link-slash","link","lira-sign","list-check","list-ol","list-ul","list","litecoin-sign","location-arrow","location-crosshairs","location-dot","location-pin-lock","location-pin","lock-open","lock","locust","lungs-virus","lungs","m","magnet","magnifying-glass-arrow-right","magnifying-glass-chart","magnifying-glass-dollar","magnifying-glass-location","magnifying-glass-minus","magnifying-glass-plus","magnifying-glass","manat-sign","map-location-dot","map-location","map-pin","map","marker","mars-and-venus-burst","mars-and-venus","mars-double","mars-stroke-right","mars-stroke-up","mars-stroke","mars","martini-glass-citrus","martini-glass-empty","martini-glass","mask-face","mask-ventilator","mask","masks-theater","mattress-pillow","maximize","medal","memory","menorah","mercury","message","meteor","microchip","microphone-lines-slash","microphone-lines","microphone-slash","microphone","microscope","mill-sign","minimize","minus","mitten","mobile-button","mobile-retro","mobile-screen-button","mobile-screen","mobile","money-bill-1-wave","money-bill-1","money-bill-transfer","money-bill-trend-up","money-bill-wave","money-bill-wheat","money-bill","money-bills","money-check-dollar","money-check","monument","moon","mortar-pestle","mosque","mosquito-net","mosquito","motorcycle","mound","mountain-city","mountain-sun","mountain","mug-hot","mug-saucer","music","n","naira-sign","network-wired","neuter","newspaper","not-equal","notdef","note-sticky","notes-medical","o","object-group","object-ungroup","oil-can","oil-well","om","otter","outdent","p","pager","paint-roller","paintbrush","palette","pallet","panorama","paper-plane","paperclip","parachute-box","paragraph","passport","paste","pause","paw","peace","pen-clip","pen-fancy","pen-nib","pen-ruler","pen-to-square","pen","pencil","people-arrows","people-carry-box","people-group","people-line","people-pulling","people-robbery","people-roof","pepper-hot","percent","person-arrow-down-to-line","person-arrow-up-from-line","person-biking","person-booth","person-breastfeeding","person-burst","person-cane","person-chalkboard","person-circle-check","person-circle-exclamation","person-circle-minus","person-circle-plus","person-circle-question","person-circle-xmark","person-digging","person-dots-from-line","person-dress-burst","person-dress","person-drowning","person-falling-burst","person-falling","person-half-dress","person-harassing","person-hiking","person-military-pointing","person-military-rifle","person-military-to-person","person-praying","person-pregnant","person-rays","person-rifle","person-running","person-shelter","person-skating","person-skiing-nordic","person-skiing","person-snowboarding","person-swimming","person-through-window","person-walking-arrow-loop-left","person-walking-arrow-right","person-walking-dashed-line-arrow-right","person-walking-luggage","person-walking-with-cane","person-walking","person","peseta-sign","peso-sign","phone-flip","phone-slash","phone-volume","phone","photo-film","piggy-bank","pills","pizza-slice","place-of-worship","plane-arrival","plane-circle-check","plane-circle-exclamation","plane-circle-xmark","plane-departure","plane-lock","plane-slash","plane-up","plane","plant-wilt","plate-wheat","play","plug-circle-bolt","plug-circle-check","plug-circle-exclamation","plug-circle-minus","plug-circle-plus","plug-circle-xmark","plug","plus-minus","plus","podcast","poo-storm","poo","poop","power-off","prescription-bottle-medical","prescription-bottle","prescription","print","pump-medical","pump-soap","puzzle-piece","q","qrcode","question","quote-left","quote-right","r","radiation","radio","rainbow","ranking-star","receipt","record-vinyl","rectangle-ad","rectangle-list","rectangle-xmark","recycle","registered","repeat","reply-all","reply","republican","restroom","retweet","ribbon","right-from-bracket","right-left","right-long","right-to-bracket","ring","road-barrier","road-bridge","road-circle-check","road-circle-exclamation","road-circle-xmark","road-lock","road-spikes","road","robot","rocket","rotate-left","rotate-right","rotate","route","rss","ruble-sign","rug","ruler-combined","ruler-horizontal","ruler-vertical","ruler","rupee-sign","rupiah-sign","s","sack-dollar","sack-xmark","sailboat","satellite-dish","satellite","scale-balanced","scale-unbalanced-flip","scale-unbalanced","school-circle-check","school-circle-exclamation","school-circle-xmark","school-flag","school-lock","school","scissors","screwdriver-wrench","screwdriver","scroll-torah","scroll","sd-card","section","seedling","server","shapes","share-from-square","share-nodes","share","sheet-plastic","shekel-sign","shield-cat","shield-dog","shield-halved","shield-heart","shield-virus","shield","ship","shirt","shoe-prints","shop-lock","shop-slash","shop","shower","shrimp","shuffle","shuttle-space","sign-hanging","signal","signature","signs-post","sim-card","sink","sitemap","skull-crossbones","skull","slash","sleigh","sliders","smog","smoking","snowflake","snowman","snowplow","soap","socks","solar-panel","sort-down","sort-up","sort","spa","spaghetti-monster-flying","spell-check","spider","spinner","splotch","spoon","spray-can-sparkles","spray-can","square-arrow-up-right","square-caret-down","square-caret-left","square-caret-right","square-caret-up","square-check","square-envelope","square-full","square-h","square-minus","square-nfi","square-parking","square-pen","square-person-confined","square-phone-flip","square-phone","square-plus","square-poll-horizontal","square-poll-vertical","square-root-variable","square-rss","square-share-nodes","square-up-right","square-virus","square-xmark","square","staff-snake","stairs","stamp","stapler","star-and-crescent","star-half-stroke","star-half","star-of-david","star-of-life","star","sterling-sign","stethoscope","stop","stopwatch-20","stopwatch","store-slash","store","street-view","strikethrough","stroopwafel","subscript","suitcase-medical","suitcase-rolling","suitcase","sun-plant-wilt","sun","superscript","swatchbook","synagogue","syringe","t","table-cells-large","table-cells","table-columns","table-list","table-tennis-paddle-ball","table","tablet-button","tablet-screen-button","tablet","tablets","tachograph-digital","tag","tags","tape","tarp-droplet","tarp","taxi","teeth-open","teeth","temperature-arrow-down","temperature-arrow-up","temperature-empty","temperature-full","temperature-half","temperature-high","temperature-low","temperature-quarter","temperature-three-quarters","tenge-sign","tent-arrow-down-to-line","tent-arrow-left-right","tent-arrow-turn-left","tent-arrows-down","tent","tents","terminal","text-height","text-slash","text-width","thermometer","thumbs-down","thumbs-up","thumbtack","ticket-simple","ticket","timeline","toggle-off","toggle-on","toilet-paper-slash","toilet-paper","toilet-portable","toilet","toilets-portable","toolbox","tooth","torii-gate","tornado","tower-broadcast","tower-cell","tower-observation","tractor","trademark","traffic-light","trailer","train-subway","train-tram","train","transgender","trash-arrow-up","trash-can-arrow-up","trash-can","trash","tree-city","tree","triangle-exclamation","trophy","trowel-bricks","trowel","truck-arrow-right","truck-droplet","truck-fast","truck-field-un","truck-field","truck-front","truck-medical","truck-monster","truck-moving","truck-pickup","truck-plane","truck-ramp-box","truck","tty","turkish-lira-sign","turn-down","turn-up","tv","u","umbrella-beach","umbrella","underline","universal-access","unlock-keyhole","unlock","up-down-left-right","up-down","up-long","up-right-and-down-left-from-center","up-right-from-square","upload","user-astronaut","user-check","user-clock","user-doctor","user-gear","user-graduate","user-group","user-injured","user-large-slash","user-large","user-lock","user-minus","user-ninja","user-nurse","user-pen","user-plus","user-secret","user-shield","user-slash","user-tag","user-tie","user-xmark","user","users-between-lines","users-gear","users-line","users-rays","users-rectangle","users-slash","users-viewfinder","users","utensils","v","van-shuttle","vault","vector-square","venus-double","venus-mars","venus","vest-patches","vest","vial-circle-check","vial-virus","vial","vials","video-slash","video","vihara","virus-covid-slash","virus-covid","virus-slash","virus","viruses","voicemail","volcano","volleyball","volume-high","volume-low","volume-off","volume-xmark","vr-cardboard","w","walkie-talkie","wallet","wand-magic-sparkles","wand-magic","wand-sparkles","warehouse","water-ladder","water","wave-square","weight-hanging","weight-scale","wheat-awn-circle-exclamation","wheat-awn","wheelchair-move","wheelchair","whiskey-glass","wifi","wind","window-maximize","window-minimize","window-restore","wine-bottle","wine-glass-empty","wine-glass","won-sign","worm","wrench","x-ray","x","xmark","xmarks-lines","y","yen-sign","yin-yang","z"]}');

/***/ }),

/***/ "./src/accordion/block.json":
/*!**********************************!*\
  !*** ./src/accordion/block.json ***!
  \**********************************/
/***/ (function(module) {

"use strict";
module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"rrze-elements/accordion","version":"1.25.10","title":"Accordion item","category":"design","icon":"align-center","description":"Creates an inner accordion item","parent":["rrze-elements/accordions"],"keywords":["accordion","collapse","expand","toggle"],"usesContext":["rrze-elements/collapseSBlockCount","rrze-elements/collapseTotalChildrenCount","rrze-elements/collapseColor","rrze-elements/accordion-hstart"],"attributes":{"message":{"type":"string","source":"text","selector":"div"},"expandAllLink":{"type":"boolean","default":false},"hstart":{"type":"integer","default":3},"register":{"type":"boolean","default":false},"sameBlockCount":{"type":"integer","default":0},"title":{"type":"string","source":"html","selector":"button","default":"Enter your Title"},"color":{"type":"string","default":""},"totalChildrenCount":{"type":"integer","default":0},"ancestorCount":{"type":"integer","default":0},"icon":{"type":"string","default":""},"svgString":{"type":"string","default":""},"directory":{"type":"string","default":""}},"supports":{"html":false},"textdomain":"rrze-elements-b","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "rrze-elements:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl + "../";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"accordion/index": 0,
/******/ 			"accordion/style-index": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if("accordion/style-index" != chunkId) {
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkrrze_elements"] = self["webpackChunkrrze_elements"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["accordion/style-index"], function() { return __webpack_require__("./src/accordion/index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map