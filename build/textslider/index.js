/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/textslider/edit.tsx":
/*!*********************************!*\
  !*** ./src/textslider/edit.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Edit; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ \"@wordpress/data\");\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);\n\n// Imports from WordPress libraries\n\n\n/**\n * Edit component for the Text-Slider block.\n *\n * Provides controls for customizing the Text-Slider-block and renders the block inside the editor.\n *\n * @param {EditProps} props - The properties passed to the component.\n * @returns {JSX.Element} The JSX representation of the component.\n */\nfunction Edit(_ref) {\n  var blockProps = _ref.blockProps,\n    attributes = _ref.attributes,\n    setAttributes = _ref.setAttributes,\n    clientId = _ref.clientId;\n  var props = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();\n  // useEffects for syncing component state and attributes\n  var _useSelect =\n    // retrieve the inner client ids of the current block\n    /**\n     * Example: [Log] [{clientId: \"37afef0b-dae8-4dd8-9d65-85b3e591616b\", position: 0}, {clientId: \"11d208de-c4fd-4b8d-84f2-80a2ca3fc7d5\", position: 1}, {clientId: \"14320e50-38cc-4713-a4e2-7af4fd9b9ec3\", position: 2}] (3)\n     */\n    (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(function (select) {\n      var _select = select(\"core/block-editor\"),\n        getBlock = _select.getBlock,\n        getBlocks = _select.getBlocks,\n        getBlockIndex = _select.getBlockIndex;\n      var selectedBlockClientId = clientId;\n      var innerBlocks = getBlocks(selectedBlockClientId);\n      var counter = 0;\n      var innerClientIds = innerBlocks.map(function (block) {\n        return {\n          clientId: block === null || block === void 0 ? void 0 : block.clientId,\n          position: counter++\n        };\n      });\n      return {\n        innerClientIds: innerClientIds\n      };\n    }, [clientId]),\n    innerClientIds = _useSelect.innerClientIds;\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", Object.assign({}, props, {\n    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"section\", {\n      className: \"slider-wrapper\",\n      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"button\", {\n        className: \"slide-arrow\",\n        id: \"slide-arrow-prev\",\n        children: \"\\u2039\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"button\", {\n        className: \"slide-arrow\",\n        id: \"slide-arrow-next\",\n        children: \"\\u203A\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"ul\", {\n        className: \"slides-container\",\n        id: \"slides-container\",\n        children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {\n          template: [[\"rrze-elements/textslideritem\"], [\"rrze-elements/textslideritem\"], [\"rrze-elements/textslideritem\"]],\n          allowedBlocks: [\"rrze-elements/textslideritem\"]\n        })\n      })]\n    })\n  }));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dHNsaWRlci9lZGl0LnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBS2lDO0FBS3dCO0FBMkJ6RDs7Ozs7Ozs7QUFRYyxTQUFVRyxJQUFJQSxDQUFBQyxJQUFBLEVBS2hCO0VBQUEsSUFKVkMsVUFBVSxHQUFBRCxJQUFBLENBQVZDLFVBQVU7SUFDVkMsVUFBVSxHQUFBRixJQUFBLENBQVZFLFVBQVU7SUFDVkMsYUFBYSxHQUFBSCxJQUFBLENBQWJHLGFBQWE7SUFDYkMsUUFBUSxHQUFBSixJQUFBLENBQVJJLFFBQVE7RUFFUixJQUFNQyxLQUFLLEdBQUdULHNFQUFhLEVBQUU7RUFFN0I7RUFDQSxJQUFBVSxVQUFBO0lBQ0U7SUFDQTs7O0lBR0FSLDBEQUFTLENBQ1AsVUFBQ1MsTUFBTSxFQUFJO01BQ1QsSUFBQUMsT0FBQSxHQUErQ0QsTUFBTSxDQUNuRCxtQkFBbUIsQ0FLcEI7UUFOT0UsUUFBUSxHQUFBRCxPQUFBLENBQVJDLFFBQVE7UUFBRUMsU0FBUyxHQUFBRixPQUFBLENBQVRFLFNBQVM7UUFBRUMsYUFBYSxHQUFBSCxPQUFBLENBQWJHLGFBQWE7TUFPMUMsSUFBTUMscUJBQXFCLEdBQUdSLFFBQVE7TUFDdEMsSUFBTVMsV0FBVyxHQUFHSCxTQUFTLENBQUNFLHFCQUFxQixDQUFDO01BQ3BELElBQUlFLE9BQU8sR0FBRyxDQUFDO01BQ2YsSUFBTUMsY0FBYyxHQUFHRixXQUFXLENBQUNHLEdBQUcsQ0FBQyxVQUFDQyxLQUFjO1FBQUEsT0FBTTtVQUMxRGIsUUFBUSxFQUFFYSxLQUFLLGFBQUxBLEtBQUssdUJBQUxBLEtBQUssQ0FBRWIsUUFBUTtVQUN6QmMsUUFBUSxFQUFFSixPQUFPO1NBQ2xCO01BQUEsQ0FBQyxDQUFDO01BRUgsT0FBTztRQUNMQyxjQUFjLEVBQWRBO09BQ0Q7SUFDSCxDQUFDLEVBQ0QsQ0FBQ1gsUUFBUSxDQUFDLENBQ1g7SUEzQktXLGNBQWMsR0FBQVQsVUFBQSxDQUFkUyxjQUFjO0VBNkJ0QixPQUNFSSxzREFBQSxRQUFBQyxNQUFBLENBQUFDLE1BQUEsS0FBU2hCLEtBQUs7SUFBQWlCLFFBQUEsRUFDWkMsdURBQUE7TUFBU0MsU0FBUyxFQUFDLGdCQUFnQjtNQUFBRixRQUFBLEdBQ2pDSCxzREFBQTtRQUFRSyxTQUFTLEVBQUMsYUFBYTtRQUFDQyxFQUFFLEVBQUMsa0JBQWtCO1FBQUFILFFBQUE7TUFBQSxFQUU1QyxFQUNUSCxzREFBQTtRQUFRSyxTQUFTLEVBQUMsYUFBYTtRQUFDQyxFQUFFLEVBQUMsa0JBQWtCO1FBQUFILFFBQUE7TUFBQSxFQUU1QyxFQUNUSCxzREFBQTtRQUFJSyxTQUFTLEVBQUMsa0JBQWtCO1FBQUNDLEVBQUUsRUFBQyxrQkFBa0I7UUFBQUgsUUFBQSxFQUNwREgsc0RBQUEsQ0FBQ3RCLGdFQUFXO1VBQ1Y2QixRQUFRLEVBQUUsQ0FDUixDQUFDLDhCQUE4QixDQUFDLEVBQ2hDLENBQUMsOEJBQThCLENBQUMsRUFDaEMsQ0FBQyw4QkFBOEIsQ0FBQyxDQUNqQztVQUNEQyxhQUFhLEVBQUUsQ0FBQyw4QkFBOEI7UUFBQztNQUMvQyxFQUNDO0lBQUE7RUFDRyxHQUNOO0FBRVYiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ycnplLWVsZW1lbnRzLy4vc3JjL3RleHRzbGlkZXIvZWRpdC50c3g/MTlhMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJbXBvcnRzIGZyb20gV29yZFByZXNzIGxpYnJhcmllc1xuaW1wb3J0IHtcbiAgdXNlQmxvY2tQcm9wcyxcbiAgSW5uZXJCbG9ja3MsXG4gIEJsb2NrQ29udHJvbHMsXG59IGZyb20gXCJAd29yZHByZXNzL2Jsb2NrLWVkaXRvclwiO1xuXG5pbXBvcnQgeyBfXyB9IGZyb20gXCJAd29yZHByZXNzL2kxOG5cIjtcbmltcG9ydCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tIFwiQHdvcmRwcmVzcy9lbGVtZW50XCI7XG5pbXBvcnQgeyBzeW1ib2wgfSBmcm9tIFwiQHdvcmRwcmVzcy9pY29uc1wiO1xuaW1wb3J0IHsgdXNlU2VsZWN0LCB1c2VEaXNwYXRjaCB9IGZyb20gXCJAd29yZHByZXNzL2RhdGFcIjtcblxuLyoqXG4gKiBJbnRlcmZhY2UgcmVwcmVzZW50aW5nIHRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgRWRpdCBjb21wb25lbnQuXG4gKlxuICogQGludGVyZmFjZSBFZGl0UHJvcHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBhdHRyaWJ1dGVzIC0gVGhlIGJsb2NrIGF0dHJpYnV0ZXMuXG4gKi9cbmludGVyZmFjZSBFZGl0UHJvcHMge1xuICBibG9ja1Byb3BzOiBzdHJpbmdbXTtcbiAgYXR0cmlidXRlczoge307XG4gIHNldEF0dHJpYnV0ZXM6IChhdHRyaWJ1dGVzOiBQYXJ0aWFsPEVkaXRQcm9wc1tcImF0dHJpYnV0ZXNcIl0+KSA9PiB2b2lkO1xuICBjbGllbnRJZDogc3RyaW5nO1xufVxuXG50eXBlIFdQQmxvY2sgPSB7XG4gIGlubmVyQmxvY2tzOiBXUEJsb2NrW107XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGF0dHJpYnV0ZXM/OiB7XG4gICAgaWNvbjogYW55O1xuICAgIHN2Z1N0cmluZzogYW55O1xuICAgIGNoaWxkcmVuQ291bnQ/OiBudW1iZXI7XG4gICAgdGl0bGU/OiBzdHJpbmc7XG4gIH07XG4gIGNsaWVudElkPzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBFZGl0IGNvbXBvbmVudCBmb3IgdGhlIFRleHQtU2xpZGVyIGJsb2NrLlxuICpcbiAqIFByb3ZpZGVzIGNvbnRyb2xzIGZvciBjdXN0b21pemluZyB0aGUgVGV4dC1TbGlkZXItYmxvY2sgYW5kIHJlbmRlcnMgdGhlIGJsb2NrIGluc2lkZSB0aGUgZWRpdG9yLlxuICpcbiAqIEBwYXJhbSB7RWRpdFByb3BzfSBwcm9wcyAtIFRoZSBwcm9wZXJ0aWVzIHBhc3NlZCB0byB0aGUgY29tcG9uZW50LlxuICogQHJldHVybnMge0pTWC5FbGVtZW50fSBUaGUgSlNYIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBjb21wb25lbnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEVkaXQoe1xuICBibG9ja1Byb3BzLFxuICBhdHRyaWJ1dGVzLFxuICBzZXRBdHRyaWJ1dGVzLFxuICBjbGllbnRJZCxcbn06IEVkaXRQcm9wcykge1xuICBjb25zdCBwcm9wcyA9IHVzZUJsb2NrUHJvcHMoKTtcblxuICAvLyB1c2VFZmZlY3RzIGZvciBzeW5jaW5nIGNvbXBvbmVudCBzdGF0ZSBhbmQgYXR0cmlidXRlc1xuICBjb25zdCB7IGlubmVyQ2xpZW50SWRzIH0gPVxuICAgIC8vIHJldHJpZXZlIHRoZSBpbm5lciBjbGllbnQgaWRzIG9mIHRoZSBjdXJyZW50IGJsb2NrXG4gICAgLyoqXG4gICAgICogRXhhbXBsZTogW0xvZ10gW3tjbGllbnRJZDogXCIzN2FmZWYwYi1kYWU4LTRkZDgtOWQ2NS04NWIzZTU5MTYxNmJcIiwgcG9zaXRpb246IDB9LCB7Y2xpZW50SWQ6IFwiMTFkMjA4ZGUtYzRmZC00YjhkLTg0ZjItODBhMmNhM2ZjN2Q1XCIsIHBvc2l0aW9uOiAxfSwge2NsaWVudElkOiBcIjE0MzIwZTUwLTM4Y2MtNDcxMy1hNGUyLTdhZjRmZDliOWVjM1wiLCBwb3NpdGlvbjogMn1dICgzKVxuICAgICAqL1xuICAgIHVzZVNlbGVjdChcbiAgICAgIChzZWxlY3QpID0+IHtcbiAgICAgICAgY29uc3QgeyBnZXRCbG9jaywgZ2V0QmxvY2tzLCBnZXRCbG9ja0luZGV4IH0gPSBzZWxlY3QoXG4gICAgICAgICAgXCJjb3JlL2Jsb2NrLWVkaXRvclwiXG4gICAgICAgICkgYXMge1xuICAgICAgICAgIGdldEJsb2NrOiBGdW5jdGlvbjtcbiAgICAgICAgICBnZXRCbG9ja3M6IEZ1bmN0aW9uO1xuICAgICAgICAgIGdldEJsb2NrSW5kZXg6IEZ1bmN0aW9uO1xuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzZWxlY3RlZEJsb2NrQ2xpZW50SWQgPSBjbGllbnRJZDtcbiAgICAgICAgY29uc3QgaW5uZXJCbG9ja3MgPSBnZXRCbG9ja3Moc2VsZWN0ZWRCbG9ja0NsaWVudElkKTtcbiAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgICAgICBjb25zdCBpbm5lckNsaWVudElkcyA9IGlubmVyQmxvY2tzLm1hcCgoYmxvY2s6IFdQQmxvY2spID0+ICh7XG4gICAgICAgICAgY2xpZW50SWQ6IGJsb2NrPy5jbGllbnRJZCxcbiAgICAgICAgICBwb3NpdGlvbjogY291bnRlcisrLFxuICAgICAgICB9KSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbm5lckNsaWVudElkcyxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBbY2xpZW50SWRdXG4gICAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgey4uLnByb3BzfT5cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cInNsaWRlci13cmFwcGVyXCI+XG4gICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic2xpZGUtYXJyb3dcIiBpZD1cInNsaWRlLWFycm93LXByZXZcIj5cbiAgICAgICAgICAmIzgyNDk7XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNsaWRlLWFycm93XCIgaWQ9XCJzbGlkZS1hcnJvdy1uZXh0XCI+XG4gICAgICAgICAgJiM4MjUwO1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNsaWRlcy1jb250YWluZXJcIiBpZD1cInNsaWRlcy1jb250YWluZXJcIj5cbiAgICAgICAgICA8SW5uZXJCbG9ja3NcbiAgICAgICAgICAgIHRlbXBsYXRlPXtbXG4gICAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvdGV4dHNsaWRlcml0ZW1cIl0sXG4gICAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvdGV4dHNsaWRlcml0ZW1cIl0sXG4gICAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvdGV4dHNsaWRlcml0ZW1cIl0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgICAgYWxsb3dlZEJsb2Nrcz17W1wicnJ6ZS1lbGVtZW50cy90ZXh0c2xpZGVyaXRlbVwiXX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L3VsPlxuICAgICAgPC9zZWN0aW9uPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbInVzZUJsb2NrUHJvcHMiLCJJbm5lckJsb2NrcyIsInVzZVNlbGVjdCIsIkVkaXQiLCJfcmVmIiwiYmxvY2tQcm9wcyIsImF0dHJpYnV0ZXMiLCJzZXRBdHRyaWJ1dGVzIiwiY2xpZW50SWQiLCJwcm9wcyIsIl91c2VTZWxlY3QiLCJzZWxlY3QiLCJfc2VsZWN0IiwiZ2V0QmxvY2siLCJnZXRCbG9ja3MiLCJnZXRCbG9ja0luZGV4Iiwic2VsZWN0ZWRCbG9ja0NsaWVudElkIiwiaW5uZXJCbG9ja3MiLCJjb3VudGVyIiwiaW5uZXJDbGllbnRJZHMiLCJtYXAiLCJibG9jayIsInBvc2l0aW9uIiwiX2pzeCIsIk9iamVjdCIsImFzc2lnbiIsImNoaWxkcmVuIiwiX2pzeHMiLCJjbGFzc05hbWUiLCJpZCIsInRlbXBsYXRlIiwiYWxsb3dlZEJsb2NrcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/textslider/edit.tsx\n");

/***/ }),

/***/ "./src/textslider/index.tsx":
/*!**********************************!*\
  !*** ./src/textslider/index.tsx ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ \"@wordpress/blocks\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ \"./src/textslider/edit.tsx\");\n/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ \"./src/textslider/save.tsx\");\n/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ \"./src/textslider/block.json\");\n/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ \"./src/textslider/editor.scss\");\n\n/**\n * Registers a new block provided a unique name and an object defining its behavior.\n *\n * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block\n */\n\n/**\n * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.\n * All files containing `style` keyword are bundled together. The code used\n * gets applied both to the front of your site and to the editor. All other files\n * get applied to the editor only.\n *\n * @see https://www.npmjs.com/package/@wordpress/scripts#using-css\n */\n/**\n * Internal dependencies\n */\n\n\n\n\n/**\n * Every block starts by registering a new block type definition.\n *\n * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block\n */\n(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {\n  /**\n   * Used to construct a preview for the block to be shown in the block inserter.\n   */\n  icon: {\n    src: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"svg\", {\n      id: \"Ebene_1\",\n      xmlns: \"http://www.w3.org/2000/svg\",\n      viewBox: \"0 0 512 512\",\n      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"60.05\",\n        y: \"115.69\",\n        width: \"112.94\",\n        height: \"280.62\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"evenodd\",\n        strokeWidth: \"0\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"199.53\",\n        y: \"115.69\",\n        width: \"112.94\",\n        height: \"280.62\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"evenodd\",\n        strokeWidth: \"0\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"339.01\",\n        y: \"115.69\",\n        width: \"112.94\",\n        height: \"280.62\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"evenodd\",\n        strokeWidth: \"0\"\n      })]\n    })\n  },\n  __experimentalLabel: function __experimentalLabel(attributes, _ref) {\n    var context = _ref.context;\n    var title = attributes.title;\n    // In the list view, use the block's title as the label.\n    // If the title is empty, fall back to the default label.\n    if (context === 'list-view' && title) {\n      return title;\n    }\n  },\n  /**\n   * @see ./edit.js\n   */\n  edit: _edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  /**\n   * @see ./save.js\n   */\n  save: _save__WEBPACK_IMPORTED_MODULE_3__[\"default\"]\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dHNsaWRlci9pbmRleC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7OztBQUtzRDtBQUV0RDs7Ozs7Ozs7QUFTQTs7O0FBRzBCO0FBQ0E7QUFDVTtBQUNiO0FBR3ZCOzs7OztBQUtBQSxvRUFBaUIsQ0FBRUcsNkNBQW9CLEVBQUU7RUFDeEM7OztFQUdBRSxJQUFJLEVBQUU7SUFDTEMsR0FBRyxFQUFFQyx1REFBQTtNQUFLQyxFQUFFLEVBQUMsU0FBUztNQUFDQyxLQUFLLEVBQUMsNEJBQTRCO01BQUNDLE9BQU8sRUFBQyxhQUFhO01BQUFDLFFBQUEsR0FBQ0Msc0RBQUE7UUFBTUMsQ0FBQyxFQUFDLE9BQU87UUFBQ0MsQ0FBQyxFQUFDLFFBQVE7UUFBQ0MsS0FBSyxFQUFDLFFBQVE7UUFBQ0MsTUFBTSxFQUFDLFFBQVE7UUFBQ0MsRUFBRSxFQUFDLE1BQU07UUFBQ0MsRUFBRSxFQUFDLE1BQU07UUFBQ0MsSUFBSSxFQUFDLFNBQVM7UUFBQ0MsV0FBVyxFQUFDO01BQUcsRUFBRSxFQUFBUixzREFBQTtRQUFNQyxDQUFDLEVBQUMsUUFBUTtRQUFDQyxDQUFDLEVBQUMsUUFBUTtRQUFDQyxLQUFLLEVBQUMsUUFBUTtRQUFDQyxNQUFNLEVBQUMsUUFBUTtRQUFDQyxFQUFFLEVBQUMsTUFBTTtRQUFDQyxFQUFFLEVBQUMsTUFBTTtRQUFDQyxJQUFJLEVBQUMsU0FBUztRQUFDQyxXQUFXLEVBQUM7TUFBRyxFQUFFLEVBQUFSLHNEQUFBO1FBQU1DLENBQUMsRUFBQyxRQUFRO1FBQUNDLENBQUMsRUFBQyxRQUFRO1FBQUNDLEtBQUssRUFBQyxRQUFRO1FBQUNDLE1BQU0sRUFBQyxRQUFRO1FBQUNDLEVBQUUsRUFBQyxNQUFNO1FBQUNDLEVBQUUsRUFBQyxNQUFNO1FBQUNDLElBQUksRUFBQyxTQUFTO1FBQUNDLFdBQVcsRUFBQztNQUFHLEVBQUU7SUFBQTtHQUM1WjtFQUNEQyxtQkFBbUIsRUFBRSxTQUFyQkEsbUJBQW1CQSxDQUFHQyxVQUFlLEVBQUFDLElBQUEsRUFBc0I7SUFBQSxJQUFsQkMsT0FBTyxHQUFBRCxJQUFBLENBQVBDLE9BQU87SUFDL0MsSUFBUUMsS0FBSyxHQUFLSCxVQUFVLENBQXBCRyxLQUFLO0lBRWI7SUFDQTtJQUNBLElBQUlELE9BQU8sS0FBSyxXQUFXLElBQUlDLEtBQUssRUFBRTtNQUNyQyxPQUFPQSxLQUFLO0lBQ2I7RUFDRCxDQUFDO0VBQ0Q7OztFQUdBQyxJQUFJLEVBQUV6Qiw2Q0FBSTtFQUVWOzs7RUFHQUMsSUFBSSxFQUFKQSw2Q0FBSUE7Q0FDRyxDQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy8uL3NyYy90ZXh0c2xpZGVyL2luZGV4LnRzeD85ZjlhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVnaXN0ZXJzIGEgbmV3IGJsb2NrIHByb3ZpZGVkIGEgdW5pcXVlIG5hbWUgYW5kIGFuIG9iamVjdCBkZWZpbmluZyBpdHMgYmVoYXZpb3IuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL2Jsb2NrLWVkaXRvci9kZXZlbG9wZXJzL2Jsb2NrLWFwaS8jcmVnaXN0ZXJpbmctYS1ibG9ja1xuICovXG5pbXBvcnQgeyByZWdpc3RlckJsb2NrVHlwZSB9IGZyb20gJ0B3b3JkcHJlc3MvYmxvY2tzJztcblxuLyoqXG4gKiBMZXRzIHdlYnBhY2sgcHJvY2VzcyBDU1MsIFNBU1Mgb3IgU0NTUyBmaWxlcyByZWZlcmVuY2VkIGluIEphdmFTY3JpcHQgZmlsZXMuXG4gKiBBbGwgZmlsZXMgY29udGFpbmluZyBgc3R5bGVgIGtleXdvcmQgYXJlIGJ1bmRsZWQgdG9nZXRoZXIuIFRoZSBjb2RlIHVzZWRcbiAqIGdldHMgYXBwbGllZCBib3RoIHRvIHRoZSBmcm9udCBvZiB5b3VyIHNpdGUgYW5kIHRvIHRoZSBlZGl0b3IuIEFsbCBvdGhlciBmaWxlc1xuICogZ2V0IGFwcGxpZWQgdG8gdGhlIGVkaXRvciBvbmx5LlxuICpcbiAqIEBzZWUgaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvQHdvcmRwcmVzcy9zY3JpcHRzI3VzaW5nLWNzc1xuICovXG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBFZGl0IGZyb20gJy4vZWRpdCc7XG5pbXBvcnQgc2F2ZSBmcm9tICcuL3NhdmUnO1xuaW1wb3J0IG1ldGFkYXRhIGZyb20gJy4vYmxvY2suanNvbic7XG5pbXBvcnQgJy4vZWRpdG9yLnNjc3MnO1xuaW1wb3J0IHsgX18sIHNwcmludGYgfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xuXG4vKipcbiAqIEV2ZXJ5IGJsb2NrIHN0YXJ0cyBieSByZWdpc3RlcmluZyBhIG5ldyBibG9jayB0eXBlIGRlZmluaXRpb24uXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL2Jsb2NrLWVkaXRvci9kZXZlbG9wZXJzL2Jsb2NrLWFwaS8jcmVnaXN0ZXJpbmctYS1ibG9ja1xuICovXG5yZWdpc3RlckJsb2NrVHlwZSggbWV0YWRhdGEubmFtZSBhcyBhbnksIHtcblx0LyoqXG5cdCAqIFVzZWQgdG8gY29uc3RydWN0IGEgcHJldmlldyBmb3IgdGhlIGJsb2NrIHRvIGJlIHNob3duIGluIHRoZSBibG9jayBpbnNlcnRlci5cblx0ICovXG5cdGljb246IHtcblx0XHRzcmM6IDxzdmcgaWQ9XCJFYmVuZV8xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgNTEyIDUxMlwiPjxyZWN0IHg9XCI2MC4wNVwiIHk9XCIxMTUuNjlcIiB3aWR0aD1cIjExMi45NFwiIGhlaWdodD1cIjI4MC42MlwiIHJ4PVwiNS43M1wiIHJ5PVwiNS43M1wiIGZpbGw9XCJldmVub2RkXCIgc3Ryb2tlV2lkdGg9XCIwXCIvPjxyZWN0IHg9XCIxOTkuNTNcIiB5PVwiMTE1LjY5XCIgd2lkdGg9XCIxMTIuOTRcIiBoZWlnaHQ9XCIyODAuNjJcIiByeD1cIjUuNzNcIiByeT1cIjUuNzNcIiBmaWxsPVwiZXZlbm9kZFwiIHN0cm9rZVdpZHRoPVwiMFwiLz48cmVjdCB4PVwiMzM5LjAxXCIgeT1cIjExNS42OVwiIHdpZHRoPVwiMTEyLjk0XCIgaGVpZ2h0PVwiMjgwLjYyXCIgcng9XCI1LjczXCIgcnk9XCI1LjczXCIgZmlsbD1cImV2ZW5vZGRcIiBzdHJva2VXaWR0aD1cIjBcIi8+PC9zdmc+XG5cdH0sXG5cdF9fZXhwZXJpbWVudGFsTGFiZWw6IChhdHRyaWJ1dGVzOiBhbnksIHsgY29udGV4dCB9OiBhbnkpID0+IHtcblx0XHRjb25zdCB7IHRpdGxlIH0gPSBhdHRyaWJ1dGVzO1xuXG5cdFx0Ly8gSW4gdGhlIGxpc3QgdmlldywgdXNlIHRoZSBibG9jaydzIHRpdGxlIGFzIHRoZSBsYWJlbC5cblx0XHQvLyBJZiB0aGUgdGl0bGUgaXMgZW1wdHksIGZhbGwgYmFjayB0byB0aGUgZGVmYXVsdCBsYWJlbC5cblx0XHRpZiAoY29udGV4dCA9PT0gJ2xpc3QtdmlldycgJiYgdGl0bGUpIHtcblx0XHRcdHJldHVybiB0aXRsZTtcblx0XHR9XG5cdH0sXG5cdC8qKlxuXHQgKiBAc2VlIC4vZWRpdC5qc1xuXHQgKi9cblx0ZWRpdDogRWRpdCxcblxuXHQvKipcblx0ICogQHNlZSAuL3NhdmUuanNcblx0ICovXG5cdHNhdmUsXG59IGFzIGFueSApO1xuIl0sIm5hbWVzIjpbInJlZ2lzdGVyQmxvY2tUeXBlIiwiRWRpdCIsInNhdmUiLCJtZXRhZGF0YSIsIm5hbWUiLCJpY29uIiwic3JjIiwiX2pzeHMiLCJpZCIsInhtbG5zIiwidmlld0JveCIsImNoaWxkcmVuIiwiX2pzeCIsIngiLCJ5Iiwid2lkdGgiLCJoZWlnaHQiLCJyeCIsInJ5IiwiZmlsbCIsInN0cm9rZVdpZHRoIiwiX19leHBlcmltZW50YWxMYWJlbCIsImF0dHJpYnV0ZXMiLCJfcmVmIiwiY29udGV4dCIsInRpdGxlIiwiZWRpdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/textslider/index.tsx\n");

/***/ }),

/***/ "./src/textslider/save.tsx":
/*!*********************************!*\
  !*** ./src/textslider/save.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ save; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n\n\nvar liStyle = {\n  width: \"100%\",\n  float: \"left\",\n  marginRight: \"-100%\",\n  position: \"relative\",\n  opacity: 1,\n  display: \"block\",\n  zIndex: 2\n};\nvar liStyleInactive = {\n  width: \"100%\",\n  float: \"left\",\n  marginRight: \"-100%\",\n  position: \"relative\",\n  opacity: 0,\n  display: \"block\",\n  zIndex: 1\n};\nfunction save(_ref) {\n  var attributes = _ref.attributes;\n  var blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save();\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", Object.assign({}, blockProps, {\n      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"section\", {\n        className: \"slider-wrapper\",\n        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"button\", {\n          className: \"slide-arrow\",\n          id: \"slide-arrow-prev\",\n          children: \"\\u2039\"\n        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"button\", {\n          className: \"slide-arrow\",\n          id: \"slide-arrow-next\",\n          children: \"\\u203A\"\n        }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"ul\", {\n          className: \"slides-container\",\n          id: \"slides-container\",\n          children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"li\", {\n            className: \"slide\"\n          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"li\", {\n            className: \"slide\"\n          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"li\", {\n            className: \"slide\"\n          }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"li\", {\n            className: \"slide\"\n          })]\n        })]\n      })\n    }))\n  });\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dHNsaWRlci9zYXZlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBd0Q7QUFXeEQsSUFBTUMsT0FBTyxHQUF3QjtFQUNuQ0MsS0FBSyxFQUFFLE1BQU07RUFDYkMsS0FBSyxFQUFFLE1BQU07RUFDYkMsV0FBVyxFQUFFLE9BQU87RUFDcEJDLFFBQVEsRUFBRSxVQUFVO0VBQ3BCQyxPQUFPLEVBQUUsQ0FBQztFQUNWQyxPQUFPLEVBQUUsT0FBTztFQUNoQkMsTUFBTSxFQUFFO0NBQ1Q7QUFFRCxJQUFNQyxlQUFlLEdBQXdCO0VBQzNDUCxLQUFLLEVBQUUsTUFBTTtFQUNiQyxLQUFLLEVBQUUsTUFBTTtFQUNiQyxXQUFXLEVBQUUsT0FBTztFQUNwQkMsUUFBUSxFQUFFLFVBQVU7RUFDcEJDLE9BQU8sRUFBRSxDQUFDO0VBQ1ZDLE9BQU8sRUFBRSxPQUFPO0VBQ2hCQyxNQUFNLEVBQUU7Q0FDVDtBQUVhLFNBQVVFLElBQUlBLENBQUFDLElBQUEsRUFBMEI7RUFBQSxJQUF2QkMsVUFBVSxHQUFBRCxJQUFBLENBQVZDLFVBQVU7RUFDdkMsSUFBTUMsVUFBVSxHQUFHYixrRUFBYSxDQUFDVSxJQUFJLEVBQUU7RUFDdkMsT0FDRUksc0RBQUEsQ0FBQUMsdURBQUE7SUFBQUMsUUFBQSxFQUNFRixzREFBQSxRQUFBRyxNQUFBLENBQUFDLE1BQUEsS0FBU0wsVUFBVTtNQUFBRyxRQUFBLEVBQ2pCRyx1REFBQTtRQUFTQyxTQUFTLEVBQUMsZ0JBQWdCO1FBQUFKLFFBQUEsR0FDakNGLHNEQUFBO1VBQVFNLFNBQVMsRUFBQyxhQUFhO1VBQUNDLEVBQUUsRUFBQyxrQkFBa0I7VUFBQUwsUUFBQTtRQUFBLEVBRTVDLEVBQ1RGLHNEQUFBO1VBQVFNLFNBQVMsRUFBQyxhQUFhO1VBQUNDLEVBQUUsRUFBQyxrQkFBa0I7VUFBQUwsUUFBQTtRQUFBLEVBRTVDLEVBQ1RHLHVEQUFBO1VBQUlDLFNBQVMsRUFBQyxrQkFBa0I7VUFBQ0MsRUFBRSxFQUFDLGtCQUFrQjtVQUFBTCxRQUFBLEdBQ3BERixzREFBQTtZQUFJTSxTQUFTLEVBQUM7VUFBTyxFQUFNLEVBQzNCTixzREFBQTtZQUFJTSxTQUFTLEVBQUM7VUFBTyxFQUFNLEVBQzNCTixzREFBQTtZQUFJTSxTQUFTLEVBQUM7VUFBTyxFQUFNLEVBQzNCTixzREFBQTtZQUFJTSxTQUFTLEVBQUM7VUFBTyxFQUFNO1FBQUEsRUFDeEI7TUFBQTtJQUNHO0VBQ04sRUFDTDtBQUVQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy8uL3NyYy90ZXh0c2xpZGVyL3NhdmUudHN4PzU0ZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQmxvY2tQcm9wcyB9IGZyb20gXCJAd29yZHByZXNzL2Jsb2NrLWVkaXRvclwiO1xuXG5pbnRlcmZhY2UgU2F2ZVByb3BzIHtcbiAgYXR0cmlidXRlczoge1xuICAgIGNvbG9yOiBzdHJpbmc7XG4gICAgdGFic1VpZDogc3RyaW5nO1xuICAgIGJsb2NrSWQ6IHN0cmluZztcbiAgICB0aXRsZTogc3RyaW5nO1xuICB9O1xufVxuXG5jb25zdCBsaVN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0ge1xuICB3aWR0aDogXCIxMDAlXCIsXG4gIGZsb2F0OiBcImxlZnRcIixcbiAgbWFyZ2luUmlnaHQ6IFwiLTEwMCVcIixcbiAgcG9zaXRpb246IFwicmVsYXRpdmVcIixcbiAgb3BhY2l0eTogMSxcbiAgZGlzcGxheTogXCJibG9ja1wiLFxuICB6SW5kZXg6IDIsXG59O1xuXG5jb25zdCBsaVN0eWxlSW5hY3RpdmU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIHdpZHRoOiBcIjEwMCVcIixcbiAgZmxvYXQ6IFwibGVmdFwiLFxuICBtYXJnaW5SaWdodDogXCItMTAwJVwiLFxuICBwb3NpdGlvbjogXCJyZWxhdGl2ZVwiLFxuICBvcGFjaXR5OiAwLFxuICBkaXNwbGF5OiBcImJsb2NrXCIsXG4gIHpJbmRleDogMSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNhdmUoeyBhdHRyaWJ1dGVzIH06IFNhdmVQcm9wcykge1xuICBjb25zdCBibG9ja1Byb3BzID0gdXNlQmxvY2tQcm9wcy5zYXZlKCk7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgey4uLmJsb2NrUHJvcHN9PlxuICAgICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJzbGlkZXItd3JhcHBlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwic2xpZGUtYXJyb3dcIiBpZD1cInNsaWRlLWFycm93LXByZXZcIj5cbiAgICAgICAgICAgICYjODI0OTtcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInNsaWRlLWFycm93XCIgaWQ9XCJzbGlkZS1hcnJvdy1uZXh0XCI+XG4gICAgICAgICAgICAmIzgyNTA7XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNsaWRlcy1jb250YWluZXJcIiBpZD1cInNsaWRlcy1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJzbGlkZVwiPjwvbGk+XG4gICAgICAgICAgICA8bGkgY2xhc3NOYW1lPVwic2xpZGVcIj48L2xpPlxuICAgICAgICAgICAgPGxpIGNsYXNzTmFtZT1cInNsaWRlXCI+PC9saT5cbiAgICAgICAgICAgIDxsaSBjbGFzc05hbWU9XCJzbGlkZVwiPjwvbGk+XG4gICAgICAgICAgPC91bD5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlQmxvY2tQcm9wcyIsImxpU3R5bGUiLCJ3aWR0aCIsImZsb2F0IiwibWFyZ2luUmlnaHQiLCJwb3NpdGlvbiIsIm9wYWNpdHkiLCJkaXNwbGF5IiwiekluZGV4IiwibGlTdHlsZUluYWN0aXZlIiwic2F2ZSIsIl9yZWYiLCJhdHRyaWJ1dGVzIiwiYmxvY2tQcm9wcyIsIl9qc3giLCJfRnJhZ21lbnQiLCJjaGlsZHJlbiIsIk9iamVjdCIsImFzc2lnbiIsIl9qc3hzIiwiY2xhc3NOYW1lIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/textslider/save.tsx\n");

/***/ }),

/***/ "./src/textslider/editor.scss":
/*!************************************!*\
  !*** ./src/textslider/editor.scss ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvdGV4dHNsaWRlci9lZGl0b3Iuc2NzcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ycnplLWVsZW1lbnRzLy4vc3JjL3RleHRzbGlkZXIvZWRpdG9yLnNjc3M/NzE1YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/textslider/editor.scss\n");

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ (function(module) {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ (function(module) {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ (function(module) {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ (function(module) {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "./src/textslider/block.json":
/*!***********************************!*\
  !*** ./src/textslider/block.json ***!
  \***********************************/
/***/ (function(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"rrze-elements/textslider","version":"1.0.10","title":"Text-Slider","category":"design","description":"Creates a blueprint block.","supports":{"html":false},"attributes":{"title":{"type":"string","default":"Text-Slider"}},"textdomain":"rrze-elements-blocks","editorScript":"file:./index.ts","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

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
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/textslider/index.tsx");
/******/ 	
/******/ })()
;