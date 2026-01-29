/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stores/jumpNameStore.ts":
/*!*************************************!*\
  !*** ./src/stores/jumpNameStore.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ \"@wordpress/api-fetch\");\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ \"@wordpress/data\");\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst DEFAULT_STATE = {\n  jumpNames: []\n};\nconst actions = {\n  getJumpNames() {\n    return {\n      type: \"GET_JUMP_NAMES\"\n    };\n  },\n  addJumpName(jumpName, clientId) {\n    return {\n      type: \"ADD_JUMP_NAME\",\n      jumpName,\n      clientId\n    };\n  },\n  removeJumpName(jumpName) {\n    return {\n      type: \"REMOVE_JUMP_NAME\",\n      jumpName\n    };\n  },\n  removeJumpNameByClientId(clientId) {\n    return {\n      type: \"REMOVE_JUMP_NAME_BY_CLIENT_ID\",\n      clientId\n    };\n  },\n  setJumpNames(jumpNames) {\n    return {\n      type: \"SET_JUMP_NAMES\",\n      jumpNames\n    };\n  }\n};\nconst selectors = {\n  jumpNameExists(state, jumpName) {\n    return state.jumpNames.some(entry => entry.jumpName === jumpName);\n  },\n  getJumpNames(state) {\n    return state.jumpNames;\n  }\n};\nconst resolvers = {\n  *getJumpNames() {\n    try {\n      const response = yield _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({\n        path: '/rrze-elements-blocks/v1/jump-names'\n      });\n      const jumpNamesArray = Array.isArray(response) ? response.filter(entry => entry && entry.jumpName && entry.clientId) : [];\n      yield actions.setJumpNames(jumpNamesArray);\n    } catch (error) {\n      console.error('Error fetching jump names:', error);\n      yield actions.setJumpNames([]); // Reset state to empty on error\n    }\n  }\n};\nconst store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)(\"rrze/elements-blocks\", {\n  reducer(state = DEFAULT_STATE, action) {\n    switch (action.type) {\n      case 'ADD_JUMP_NAME':\n        if (!action.jumpName || !action.clientId) {\n          return state;\n        }\n        if (state.jumpNames.some(entry => entry.jumpName === action.jumpName)) {\n          return state;\n        }\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: [...state.jumpNames, {\n            jumpName: action.jumpName,\n            clientId: action.clientId\n          }]\n        });\n      case 'REMOVE_JUMP_NAME':\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: state.jumpNames.filter(entry => entry.jumpName !== action.jumpName)\n        });\n      case 'REMOVE_JUMP_NAME_BY_CLIENT_ID':\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: state.jumpNames.filter(entry => entry.clientId !== action.clientId)\n        });\n      case 'SET_JUMP_NAMES':\n        if (action.jumpNames.length === 0 && state.jumpNames.length > 0) {\n          return state;\n        }\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: action.jumpNames\n        });\n      default:\n        return state;\n    }\n  },\n  actions,\n  selectors,\n  resolvers\n});\nif (!window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__) {\n  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);\n  window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__ = true;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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akcsS0FBSyxrQkFBa0I7UUFDbkIsT0FBQXFCLE1BQUEsQ0FBQUMsTUFBQSxDQUFBRCxNQUFBLENBQUFDLE1BQUEsS0FDT2hCLEtBQUs7VUFDUlosU0FBUyxFQUFFWSxLQUFLLENBQUNaLFNBQVMsQ0FBQ3FCLE1BQU0sQ0FBRVAsS0FBb0IsSUFBS0EsS0FBSyxDQUFDVCxRQUFRLEtBQUtxQixNQUFNLENBQUNyQixRQUFRO1FBQUM7TUFFbkcsS0FBSywrQkFBK0I7UUFDaEMsT0FBQXNCLE1BQUEsQ0FBQUMsTUFBQSxDQUFBRCxNQUFBLENBQUFDLE1BQUEsS0FDT2hCLEtBQUs7VUFDUlosU0FBUyxFQUFFWSxLQUFLLENBQUNaLFNBQVMsQ0FBQ3FCLE1BQU0sQ0FBRVAsS0FBb0IsSUFBS0EsS0FBSyxDQUFDUixRQUFRLEtBQUtvQixNQUFNLENBQUNwQixRQUFRO1FBQUM7TUFFM0csS0FBSyxnQkFBZ0I7UUFDakIsSUFBSW9CLE1BQU0sQ0FBQzFCLFNBQVMsQ0FBQzZCLE1BQU0sS0FBSyxDQUFDLElBQUlqQixLQUFLLENBQUNaLFNBQVMsQ0FBQzZCLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDN0QsT0FBT2pCLEtBQUs7UUFDaEI7UUFDQSxPQUFBZSxNQUFBLENBQUFDLE1BQUEsQ0FBQUQsTUFBQSxDQUFBQyxNQUFBLEtBQ09oQixLQUFLO1VBQ1JaLFNBQVMsRUFBRTBCLE1BQU0sQ0FBQzFCO1FBQVM7TUFFbkM7UUFDSSxPQUFPWSxLQUFLO0lBQ3BCO0VBQ0osQ0FBQztFQUNEWCxPQUFPO0VBQ1BTLFNBQVM7RUFDVEs7Q0FDSCxDQUFDO0FBRUYsSUFBSSxDQUFDZSxNQUFNLENBQUNDLHlDQUF5QyxFQUFFO0VBQ25EakMseURBQVEsQ0FBQzBCLEtBQUssQ0FBQztFQUNmTSxNQUFNLENBQUNDLHlDQUF5QyxHQUFHLElBQUk7QUFDM0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ycnplLWVsZW1lbnRzLWJsb2Nrcy8uL3NyYy9zdG9yZXMvanVtcE5hbWVTdG9yZS50cz83NGE2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhcGlGZXRjaCBmcm9tIFwiQHdvcmRwcmVzcy9hcGktZmV0Y2hcIjtcbmltcG9ydCB7IGNyZWF0ZVJlZHV4U3RvcmUsIHJlZ2lzdGVyIH0gZnJvbSBcIkB3b3JkcHJlc3MvZGF0YVwiO1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gICAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgICAgIF9fUlJaRV9FTEVNRU5UU19CTE9DS1NfU1RPUkVfUkVHSVNURVJFRF9fPzogYm9vbGVhbjtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnVtcE5hbWVFbnRyeSB7XG4gICAganVtcE5hbWU6IHN0cmluZztcbiAgICBjbGllbnRJZDogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgU3RhdGUge1xuICAgIGp1bXBOYW1lczogSnVtcE5hbWVFbnRyeVtdO1xufVxuXG5jb25zdCBERUZBVUxUX1NUQVRFOiBTdGF0ZSA9IHtcbiAgICBqdW1wTmFtZXM6IFtdXG59O1xuXG5jb25zdCBhY3Rpb25zID0ge1xuICAgIGdldEp1bXBOYW1lcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwiR0VUX0pVTVBfTkFNRVNcIiBhcyBjb25zdFxuICAgICAgICB9O1xuICAgIH0sXG4gICAgYWRkSnVtcE5hbWUoanVtcE5hbWU6IHN0cmluZywgY2xpZW50SWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJBRERfSlVNUF9OQU1FXCIgYXMgY29uc3QsXG4gICAgICAgICAgICBqdW1wTmFtZSxcbiAgICAgICAgICAgIGNsaWVudElkXG4gICAgICAgIH07XG4gICAgfSxcbiAgICByZW1vdmVKdW1wTmFtZShqdW1wTmFtZTogc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIlJFTU9WRV9KVU1QX05BTUVcIiBhcyBjb25zdCxcbiAgICAgICAgICAgIGp1bXBOYW1lXG4gICAgICAgIH07XG4gICAgfSxcbiAgICByZW1vdmVKdW1wTmFtZUJ5Q2xpZW50SWQoY2xpZW50SWQ6IHN0cmluZykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJSRU1PVkVfSlVNUF9OQU1FX0JZX0NMSUVOVF9JRFwiIGFzIGNvbnN0LFxuICAgICAgICAgICAgY2xpZW50SWRcbiAgICAgICAgfTtcbiAgICB9LFxuICAgIHNldEp1bXBOYW1lcyhqdW1wTmFtZXM6IEp1bXBOYW1lRW50cnlbXSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJTRVRfSlVNUF9OQU1FU1wiIGFzIGNvbnN0LFxuICAgICAgICAgICAganVtcE5hbWVzXG4gICAgICAgIH07XG4gICAgfVxufTtcblxudHlwZSBBY3Rpb24gPSBSZXR1cm5UeXBlPHR5cGVvZiBhY3Rpb25zW2tleW9mIHR5cGVvZiBhY3Rpb25zXT47XG5cbmNvbnN0IHNlbGVjdG9ycyA9IHtcbiAgICBqdW1wTmFtZUV4aXN0cyhzdGF0ZTogU3RhdGUsIGp1bXBOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmp1bXBOYW1lcy5zb21lKGVudHJ5ID0+IGVudHJ5Lmp1bXBOYW1lID09PSBqdW1wTmFtZSk7XG4gICAgfSxcbiAgICBnZXRKdW1wTmFtZXMoc3RhdGU6IFN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5qdW1wTmFtZXM7XG4gICAgfVxufTtcblxuY29uc3QgcmVzb2x2ZXJzID0ge1xuICAgICpnZXRKdW1wTmFtZXMoKTogR2VuZXJhdG9yPGFueSwgdm9pZCwgYW55PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHlpZWxkIGFwaUZldGNoKHsgcGF0aDogJy9ycnplLWVsZW1lbnRzLWJsb2Nrcy92MS9qdW1wLW5hbWVzJyB9KTtcbiAgICAgICAgICAgIGNvbnN0IGp1bXBOYW1lc0FycmF5OiBKdW1wTmFtZUVudHJ5W10gPSBBcnJheS5pc0FycmF5KHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgID8gcmVzcG9uc2UuZmlsdGVyKChlbnRyeSkgPT4gZW50cnkgJiYgZW50cnkuanVtcE5hbWUgJiYgZW50cnkuY2xpZW50SWQpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgIHlpZWxkIGFjdGlvbnMuc2V0SnVtcE5hbWVzKGp1bXBOYW1lc0FycmF5KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGp1bXAgbmFtZXM6JywgZXJyb3IpO1xuICAgICAgICAgICAgeWllbGQgYWN0aW9ucy5zZXRKdW1wTmFtZXMoW10pOyAvLyBSZXNldCBzdGF0ZSB0byBlbXB0eSBvbiBlcnJvclxuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3Qgc3RvcmUgPSBjcmVhdGVSZWR1eFN0b3JlPFN0YXRlLCB0eXBlb2YgYWN0aW9ucywgdHlwZW9mIHNlbGVjdG9ycz4oXCJycnplL2VsZW1lbnRzLWJsb2Nrc1wiLCB7XG4gICAgcmVkdWNlcihzdGF0ZSA9IERFRkFVTFRfU1RBVEUsIGFjdGlvbjogQWN0aW9uKTogU3RhdGUge1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdBRERfSlVNUF9OQU1FJzpcbiAgICAgICAgICAgICAgICBpZiAoIWFjdGlvbi5qdW1wTmFtZSB8fCAhYWN0aW9uLmNsaWVudElkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmp1bXBOYW1lcy5zb21lKChlbnRyeTogSnVtcE5hbWVFbnRyeSkgPT4gZW50cnkuanVtcE5hbWUgPT09IGFjdGlvbi5qdW1wTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAganVtcE5hbWVzOiBbLi4uc3RhdGUuanVtcE5hbWVzLCB7IGp1bXBOYW1lOiBhY3Rpb24uanVtcE5hbWUsIGNsaWVudElkOiBhY3Rpb24uY2xpZW50SWQgfV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgY2FzZSAnUkVNT1ZFX0pVTVBfTkFNRSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGp1bXBOYW1lczogc3RhdGUuanVtcE5hbWVzLmZpbHRlcigoZW50cnk6IEp1bXBOYW1lRW50cnkpID0+IGVudHJ5Lmp1bXBOYW1lICE9PSBhY3Rpb24uanVtcE5hbWUpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjYXNlICdSRU1PVkVfSlVNUF9OQU1FX0JZX0NMSUVOVF9JRCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGp1bXBOYW1lczogc3RhdGUuanVtcE5hbWVzLmZpbHRlcigoZW50cnk6IEp1bXBOYW1lRW50cnkpID0+IGVudHJ5LmNsaWVudElkICE9PSBhY3Rpb24uY2xpZW50SWQpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjYXNlICdTRVRfSlVNUF9OQU1FUyc6XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5qdW1wTmFtZXMubGVuZ3RoID09PSAwICYmIHN0YXRlLmp1bXBOYW1lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIGp1bXBOYW1lczogYWN0aW9uLmp1bXBOYW1lc1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBhY3Rpb25zLFxuICAgIHNlbGVjdG9ycyxcbiAgICByZXNvbHZlcnNcbn0pO1xuXG5pZiAoIXdpbmRvdy5fX1JSWkVfRUxFTUVOVFNfQkxPQ0tTX1NUT1JFX1JFR0lTVEVSRURfXykge1xuICAgIHJlZ2lzdGVyKHN0b3JlKTtcbiAgICB3aW5kb3cuX19SUlpFX0VMRU1FTlRTX0JMT0NLU19TVE9SRV9SRUdJU1RFUkVEX18gPSB0cnVlO1xufSJdLCJuYW1lcyI6WyJhcGlGZXRjaCIsImNyZWF0ZVJlZHV4U3RvcmUiLCJyZWdpc3RlciIsIkRFRkFVTFRfU1RBVEUiLCJqdW1wTmFtZXMiLCJhY3Rpb25zIiwiZ2V0SnVtcE5hbWVzIiwidHlwZSIsImFkZEp1bXBOYW1lIiwianVtcE5hbWUiLCJjbGllbnRJZCIsInJlbW92ZUp1bXBOYW1lIiwicmVtb3ZlSnVtcE5hbWVCeUNsaWVudElkIiwic2V0SnVtcE5hbWVzIiwic2VsZWN0b3JzIiwianVtcE5hbWVFeGlzdHMiLCJzdGF0ZSIsInNvbWUiLCJlbnRyeSIsInJlc29sdmVycyIsInJlc3BvbnNlIiwicGF0aCIsImp1bXBOYW1lc0FycmF5IiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiZXJyb3IiLCJjb25zb2xlIiwic3RvcmUiLCJyZWR1Y2VyIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwibGVuZ3RoIiwid2luZG93IiwiX19SUlpFX0VMRU1FTlRTX0JMT0NLU19TVE9SRV9SRUdJU1RFUkVEX18iXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/stores/jumpNameStore.ts\n\n}");

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

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
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/stores/jumpNameStore.ts");
/******/ 	
/******/ })()
;