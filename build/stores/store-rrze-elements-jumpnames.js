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

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/api-fetch */ \"@wordpress/api-fetch\");\n/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ \"@wordpress/data\");\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst DEFAULT_STATE = {\n  jumpNames: []\n};\nconst actions = {\n  getJumpNames() {\n    return {\n      type: \"GET_JUMP_NAMES\"\n    };\n  },\n  addJumpName(jumpName, clientId) {\n    return {\n      type: \"ADD_JUMP_NAME\",\n      jumpName,\n      clientId\n    };\n  },\n  removeJumpName(jumpName) {\n    return {\n      type: \"REMOVE_JUMP_NAME\",\n      jumpName\n    };\n  },\n  removeJumpNameByClientId(clientId) {\n    return {\n      type: \"REMOVE_JUMP_NAME_BY_CLIENT_ID\",\n      clientId\n    };\n  },\n  setJumpNames(jumpNames) {\n    return {\n      type: \"SET_JUMP_NAMES\",\n      jumpNames\n    };\n  }\n};\nconst selectors = {\n  jumpNameExists(state, jumpName) {\n    return state.jumpNames.some(entry => entry.jumpName === jumpName);\n  },\n  jumpNameDuplicateIDs(state, jumpName) {\n    const entry = state.jumpNames.find(entry => entry.jumpName === jumpName);\n    return entry ? entry.clientIds : [];\n  },\n  getJumpNames(state) {\n    return state.jumpNames;\n  }\n};\nconst resolvers = {\n  *getJumpNames() {\n    try {\n      const response = yield _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_0___default()({\n        path: '/rrze-elements-blocks/v1/jump-names'\n      });\n      const jumpNamesArray = Array.isArray(response) ? response.map(entry => {\n        if (entry.clientIds) return entry;\n        if (entry.clientId) return {\n          jumpName: entry.jumpName,\n          clientIds: [entry.clientId]\n        };\n        return null;\n      }).filter(entry => entry !== null && !!entry.jumpName && entry.clientIds.length > 0) : [];\n      yield actions.setJumpNames(jumpNamesArray);\n    } catch (error) {\n      console.error('Error fetching jump names:', error);\n      yield actions.setJumpNames([]);\n    }\n  }\n};\nconst store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.createReduxStore)(\"rrze/elements-blocks\", {\n  reducer(state = DEFAULT_STATE, action) {\n    switch (action.type) {\n      case 'ADD_JUMP_NAME':\n        {\n          if (!action.jumpName || !action.clientId) {\n            return state;\n          }\n          const existingIndex = state.jumpNames.findIndex(entry => entry.jumpName === action.jumpName);\n          if (existingIndex >= 0) {\n            const existingEntry = state.jumpNames[existingIndex];\n            if (existingEntry.clientIds.includes(action.clientId)) {\n              return state;\n            }\n            const updatedJumpNames = [...state.jumpNames];\n            updatedJumpNames[existingIndex] = Object.assign(Object.assign({}, existingEntry), {\n              clientIds: [...existingEntry.clientIds, action.clientId]\n            });\n            return Object.assign(Object.assign({}, state), {\n              jumpNames: updatedJumpNames\n            });\n          }\n          return Object.assign(Object.assign({}, state), {\n            jumpNames: [...state.jumpNames, {\n              jumpName: action.jumpName,\n              clientIds: [action.clientId]\n            }]\n          });\n        }\n      case 'REMOVE_JUMP_NAME':\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: state.jumpNames.filter(entry => entry.jumpName !== action.jumpName)\n        });\n      case 'REMOVE_JUMP_NAME_BY_CLIENT_ID':\n        {\n          const updatedJumpNames = state.jumpNames.map(entry => Object.assign(Object.assign({}, entry), {\n            clientIds: entry.clientIds.filter(id => id !== action.clientId)\n          })).filter(entry => entry.clientIds.length > 0);\n          return Object.assign(Object.assign({}, state), {\n            jumpNames: updatedJumpNames\n          });\n        }\n      case 'SET_JUMP_NAMES':\n        if (action.jumpNames.length === 0 && state.jumpNames.length > 0) {\n          return state;\n        }\n        return Object.assign(Object.assign({}, state), {\n          jumpNames: action.jumpNames\n        });\n      default:\n        return state;\n    }\n  },\n  actions,\n  selectors,\n  resolvers\n});\nif (!window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__) {\n  (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.register)(store);\n  window.__RRZE_ELEMENTS_BLOCKS_STORE_REGISTERED__ = true;\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qy9CO1FBQVM7TUFFL0I7UUFDRSxPQUFPWSxLQUFLO0lBQ2hCO0VBQ0YsQ0FBQztFQUNEWCxPQUFPO0VBQ1BTLFNBQVM7RUFDVFE7Q0FDRCxDQUFDO0FBRUYsSUFBSSxDQUFDc0IsTUFBTSxDQUFDQyx5Q0FBeUMsRUFBRTtFQUNyRDNDLHlEQUFRLENBQUMrQixLQUFLLENBQUM7RUFDZlcsTUFBTSxDQUFDQyx5Q0FBeUMsR0FBRyxJQUFJO0FBQ3pEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy1ibG9ja3MvLi9zcmMvc3RvcmVzL2p1bXBOYW1lU3RvcmUudHM/NzRhNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBpRmV0Y2ggZnJvbSBcIkB3b3JkcHJlc3MvYXBpLWZldGNoXCI7XG5pbXBvcnQge2NyZWF0ZVJlZHV4U3RvcmUsIHJlZ2lzdGVyfSBmcm9tIFwiQHdvcmRwcmVzcy9kYXRhXCI7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgX19SUlpFX0VMRU1FTlRTX0JMT0NLU19TVE9SRV9SRUdJU1RFUkVEX18/OiBib29sZWFuO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSnVtcE5hbWVFbnRyeSB7XG4gIGp1bXBOYW1lOiBzdHJpbmc7XG4gIGNsaWVudElkczogc3RyaW5nW107XG59XG5cbmludGVyZmFjZSBTdGF0ZSB7XG4gIGp1bXBOYW1lczogSnVtcE5hbWVFbnRyeVtdO1xufVxuXG5jb25zdCBERUZBVUxUX1NUQVRFOiBTdGF0ZSA9IHtcbiAganVtcE5hbWVzOiBbXVxufTtcblxuY29uc3QgYWN0aW9ucyA9IHtcbiAgZ2V0SnVtcE5hbWVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiBcIkdFVF9KVU1QX05BTUVTXCIgYXMgY29uc3RcbiAgICB9O1xuICB9LFxuICBhZGRKdW1wTmFtZShqdW1wTmFtZTogc3RyaW5nLCBjbGllbnRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiQUREX0pVTVBfTkFNRVwiIGFzIGNvbnN0LFxuICAgICAganVtcE5hbWUsXG4gICAgICBjbGllbnRJZFxuICAgIH07XG4gIH0sXG4gIHJlbW92ZUp1bXBOYW1lKGp1bXBOYW1lOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJSRU1PVkVfSlVNUF9OQU1FXCIgYXMgY29uc3QsXG4gICAgICBqdW1wTmFtZVxuICAgIH07XG4gIH0sXG4gIHJlbW92ZUp1bXBOYW1lQnlDbGllbnRJZChjbGllbnRJZDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiUkVNT1ZFX0pVTVBfTkFNRV9CWV9DTElFTlRfSURcIiBhcyBjb25zdCxcbiAgICAgIGNsaWVudElkXG4gICAgfTtcbiAgfSxcbiAgc2V0SnVtcE5hbWVzKGp1bXBOYW1lczogSnVtcE5hbWVFbnRyeVtdKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6IFwiU0VUX0pVTVBfTkFNRVNcIiBhcyBjb25zdCxcbiAgICAgIGp1bXBOYW1lc1xuICAgIH07XG4gIH1cbn07XG5cbnR5cGUgQWN0aW9uID0gUmV0dXJuVHlwZTx0eXBlb2YgYWN0aW9uc1trZXlvZiB0eXBlb2YgYWN0aW9uc10+O1xuXG5jb25zdCBzZWxlY3RvcnMgPSB7XG4gIGp1bXBOYW1lRXhpc3RzKHN0YXRlOiBTdGF0ZSwganVtcE5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBzdGF0ZS5qdW1wTmFtZXMuc29tZSgoZW50cnk6IEp1bXBOYW1lRW50cnkpID0+IGVudHJ5Lmp1bXBOYW1lID09PSBqdW1wTmFtZSk7XG4gIH0sXG4gIGp1bXBOYW1lRHVwbGljYXRlSURzKHN0YXRlOiBTdGF0ZSwganVtcE5hbWU6IHN0cmluZyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBlbnRyeSA9IHN0YXRlLmp1bXBOYW1lcy5maW5kKChlbnRyeTogSnVtcE5hbWVFbnRyeSkgPT4gZW50cnkuanVtcE5hbWUgPT09IGp1bXBOYW1lKTtcbiAgICByZXR1cm4gZW50cnkgPyBlbnRyeS5jbGllbnRJZHMgOiBbXTtcbiAgfSxcbiAgZ2V0SnVtcE5hbWVzKHN0YXRlOiBTdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZS5qdW1wTmFtZXM7XG4gIH1cbn07XG5cbmNvbnN0IHJlc29sdmVycyA9IHtcbiAgKiBnZXRKdW1wTmFtZXMoKTogR2VuZXJhdG9yPGFueSwgdm9pZCwgYW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0geWllbGQgYXBpRmV0Y2goe3BhdGg6ICcvcnJ6ZS1lbGVtZW50cy1ibG9ja3MvdjEvanVtcC1uYW1lcyd9KTtcblxuICAgICAgY29uc3QganVtcE5hbWVzQXJyYXk6IEp1bXBOYW1lRW50cnlbXSA9IEFycmF5LmlzQXJyYXkocmVzcG9uc2UpXG4gICAgICAgID8gcmVzcG9uc2UubWFwKChlbnRyeTogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKGVudHJ5LmNsaWVudElkcykgcmV0dXJuIGVudHJ5O1xuICAgICAgICAgIGlmIChlbnRyeS5jbGllbnRJZCkgcmV0dXJuIHtqdW1wTmFtZTogZW50cnkuanVtcE5hbWUsIGNsaWVudElkczogW2VudHJ5LmNsaWVudElkXX07XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH0pLmZpbHRlcigoZW50cnkpOiBlbnRyeSBpcyBKdW1wTmFtZUVudHJ5ID0+IGVudHJ5ICE9PSBudWxsICYmICEhZW50cnkuanVtcE5hbWUgJiYgZW50cnkuY2xpZW50SWRzLmxlbmd0aCA+IDApXG4gICAgICAgIDogW107XG5cbiAgICAgIHlpZWxkIGFjdGlvbnMuc2V0SnVtcE5hbWVzKGp1bXBOYW1lc0FycmF5KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcganVtcCBuYW1lczonLCBlcnJvcik7XG4gICAgICB5aWVsZCBhY3Rpb25zLnNldEp1bXBOYW1lcyhbXSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBzdG9yZSA9IGNyZWF0ZVJlZHV4U3RvcmU8U3RhdGUsIHR5cGVvZiBhY3Rpb25zLCB0eXBlb2Ygc2VsZWN0b3JzPihcInJyemUvZWxlbWVudHMtYmxvY2tzXCIsIHtcbiAgcmVkdWNlcihzdGF0ZSA9IERFRkFVTFRfU1RBVEUsIGFjdGlvbjogQWN0aW9uKTogU3RhdGUge1xuICAgIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICAgIGNhc2UgJ0FERF9KVU1QX05BTUUnOiB7XG4gICAgICAgIGlmICghYWN0aW9uLmp1bXBOYW1lIHx8ICFhY3Rpb24uY2xpZW50SWQpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gc3RhdGUuanVtcE5hbWVzLmZpbmRJbmRleCgoZW50cnk6IEp1bXBOYW1lRW50cnkpID0+IGVudHJ5Lmp1bXBOYW1lID09PSBhY3Rpb24uanVtcE5hbWUpO1xuXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID49IDApIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ0VudHJ5ID0gc3RhdGUuanVtcE5hbWVzW2V4aXN0aW5nSW5kZXhdO1xuICAgICAgICAgIGlmIChleGlzdGluZ0VudHJ5LmNsaWVudElkcy5pbmNsdWRlcyhhY3Rpb24uY2xpZW50SWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgdXBkYXRlZEp1bXBOYW1lcyA9IFsuLi5zdGF0ZS5qdW1wTmFtZXNdO1xuICAgICAgICAgIHVwZGF0ZWRKdW1wTmFtZXNbZXhpc3RpbmdJbmRleF0gPSB7XG4gICAgICAgICAgICAuLi5leGlzdGluZ0VudHJ5LFxuICAgICAgICAgICAgY2xpZW50SWRzOiBbLi4uZXhpc3RpbmdFbnRyeS5jbGllbnRJZHMsIGFjdGlvbi5jbGllbnRJZF1cbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiB7Li4uc3RhdGUsIGp1bXBOYW1lczogdXBkYXRlZEp1bXBOYW1lc307XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGp1bXBOYW1lczogWy4uLnN0YXRlLmp1bXBOYW1lcywge2p1bXBOYW1lOiBhY3Rpb24uanVtcE5hbWUsIGNsaWVudElkczogW2FjdGlvbi5jbGllbnRJZF19XVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgY2FzZSAnUkVNT1ZFX0pVTVBfTkFNRSc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAganVtcE5hbWVzOiBzdGF0ZS5qdW1wTmFtZXMuZmlsdGVyKChlbnRyeTogSnVtcE5hbWVFbnRyeSkgPT4gZW50cnkuanVtcE5hbWUgIT09IGFjdGlvbi5qdW1wTmFtZSlcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ1JFTU9WRV9KVU1QX05BTUVfQllfQ0xJRU5UX0lEJzoge1xuICAgICAgICBjb25zdCB1cGRhdGVkSnVtcE5hbWVzID0gc3RhdGUuanVtcE5hbWVzXG4gICAgICAgICAgLm1hcCgoZW50cnk6IEp1bXBOYW1lRW50cnkpID0+ICh7XG4gICAgICAgICAgICAuLi5lbnRyeSxcbiAgICAgICAgICAgIGNsaWVudElkczogZW50cnkuY2xpZW50SWRzLmZpbHRlcigoaWQ6IHN0cmluZykgPT4gaWQgIT09IGFjdGlvbi5jbGllbnRJZClcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAuZmlsdGVyKChlbnRyeTogSnVtcE5hbWVFbnRyeSkgPT4gZW50cnkuY2xpZW50SWRzLmxlbmd0aCA+IDApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAganVtcE5hbWVzOiB1cGRhdGVkSnVtcE5hbWVzXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBjYXNlICdTRVRfSlVNUF9OQU1FUyc6XG4gICAgICAgIGlmIChhY3Rpb24uanVtcE5hbWVzLmxlbmd0aCA9PT0gMCAmJiBzdGF0ZS5qdW1wTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGp1bXBOYW1lczogYWN0aW9uLmp1bXBOYW1lc1xuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgfSxcbiAgYWN0aW9ucyxcbiAgc2VsZWN0b3JzLFxuICByZXNvbHZlcnNcbn0pO1xuXG5pZiAoIXdpbmRvdy5fX1JSWkVfRUxFTUVOVFNfQkxPQ0tTX1NUT1JFX1JFR0lTVEVSRURfXykge1xuICByZWdpc3RlcihzdG9yZSk7XG4gIHdpbmRvdy5fX1JSWkVfRUxFTUVOVFNfQkxPQ0tTX1NUT1JFX1JFR0lTVEVSRURfXyA9IHRydWU7XG59XG4iXSwibmFtZXMiOlsiYXBpRmV0Y2giLCJjcmVhdGVSZWR1eFN0b3JlIiwicmVnaXN0ZXIiLCJERUZBVUxUX1NUQVRFIiwianVtcE5hbWVzIiwiYWN0aW9ucyIsImdldEp1bXBOYW1lcyIsInR5cGUiLCJhZGRKdW1wTmFtZSIsImp1bXBOYW1lIiwiY2xpZW50SWQiLCJyZW1vdmVKdW1wTmFtZSIsInJlbW92ZUp1bXBOYW1lQnlDbGllbnRJZCIsInNldEp1bXBOYW1lcyIsInNlbGVjdG9ycyIsImp1bXBOYW1lRXhpc3RzIiwic3RhdGUiLCJzb21lIiwiZW50cnkiLCJqdW1wTmFtZUR1cGxpY2F0ZUlEcyIsImZpbmQiLCJjbGllbnRJZHMiLCJyZXNvbHZlcnMiLCJyZXNwb25zZSIsInBhdGgiLCJqdW1wTmFtZXNBcnJheSIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsImZpbHRlciIsImxlbmd0aCIsImVycm9yIiwiY29uc29sZSIsInN0b3JlIiwicmVkdWNlciIsImFjdGlvbiIsImV4aXN0aW5nSW5kZXgiLCJmaW5kSW5kZXgiLCJleGlzdGluZ0VudHJ5IiwiaW5jbHVkZXMiLCJ1cGRhdGVkSnVtcE5hbWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiaWQiLCJ3aW5kb3ciLCJfX1JSWkVfRUxFTUVOVFNfQkxPQ0tTX1NUT1JFX1JFR0lTVEVSRURfXyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/stores/jumpNameStore.ts\n\n}");

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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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