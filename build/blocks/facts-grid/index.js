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

/***/ "./src/blocks/facts-grid/edit.tsx":
/*!****************************************!*\
  !*** ./src/blocks/facts-grid/edit.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Edit)\n/* harmony export */ });\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ \"@wordpress/data\");\n/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ \"@wordpress/i18n\");\n/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ \"@wordpress/components\");\n/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\n// @ts-ignore\n\nconst MAX_CHILDREN = 4;\nfunction Edit({\n  attributes,\n  setAttributes,\n  clientId\n}) {\n  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)();\n  const childCount = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(select => {\n    var _a, _b;\n    const {\n      getBlock\n    } = select(\"core/block-editor\");\n    return (_b = (_a = getBlock(clientId)) === null || _a === void 0 ? void 0 : _a.innerBlocks.length) !== null && _b !== void 0 ? _b : 0;\n  }, [clientId]);\n  /**\n   * Creates an SVG icon for the hideHeading feature.\n   * @param fillColor - The color to fill the SVG path with.\n   * @returns         - The SVG icon.\n   */\n  const createXrayIcon = (fillColor = \"none\") => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.SVG, {\n    xmlns: \"http://www.w3.org/2000/svg\",\n    height: \"24px\",\n    viewBox: \"0 -960 960 960\",\n    width: \"24px\",\n    children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Path, {\n      fill: fillColor,\n      d: \"M420-160v-520H200v-120h560v120H540v520H420Z\"\n    })\n  });\n  // Define inactive and active hideHeading icons\n  const inactiveHeadingIcon = createXrayIcon(\"#D3D3D3\");\n  const ActiveHeadingIcon = createXrayIcon(\"#000\");\n  const ConditionalAppender = props => childCount < MAX_CHILDREN ? (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks.ButtonBlockAppender, Object.assign({}, props)) : null;\n  // @ts-ignore\n  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"div\", Object.assign({}, blockProps, {\n    children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.BlockControls, {\n      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarGroup, {\n        children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarItem, {\n          children: () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.ToolbarDropdownMenu, {\n            icon: !attributes.hideHeading ? ActiveHeadingIcon : inactiveHeadingIcon,\n            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(\"Display options for the Title\", \"rrze-elements-blocks\"),\n            controls: [{\n              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(\"Add a Section Title for the Facts Grid.\", \"rrze-elements-blocks\"),\n              icon: ActiveHeadingIcon,\n              onClick: () => setAttributes({\n                hideHeading: false\n              })\n            }, {\n              title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(\"Hide the Section Title for the Facts Grid.\", \"rrze-elements-blocks\"),\n              icon: inactiveHeadingIcon,\n              onClick: () => setAttributes({\n                hideHeading: true\n              })\n            }]\n          })\n        }), !attributes.hideHeading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.HeadingLevelDropdown, {\n          onChange: headingLevel => {\n            setAttributes({\n              headingLevel\n            });\n          },\n          options: [2, 3, 4, 5, 6],\n          // @ts-ignore\n          value: attributes.headingLevel\n        })]\n      })\n    }), !attributes.hideHeading && (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"div\", {\n      className: \"wp-block-fau-elemental-fau-meta-headline\",\n      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.RichText, {\n        tagName: \"span\",\n        value: attributes.title,\n        onChange: title => setAttributes({\n          title\n        }),\n        allowedFormats: [],\n        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)(\"Section Heading\", \"rrze-elements-blocks\")\n      })\n    }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"ul\", {\n      className: \"facts\",\n      children: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.InnerBlocks, {\n        renderAppender: ConditionalAppender,\n        orientation: \"horizontal\",\n        template: [[\"rrze-elements/fact\"], [\"rrze-elements/fact\"], [\"rrze-elements/fact\"], [\"rrze-elements/fact\"]],\n        allowedBlocks: [\"rrze-elements/fact\"]\n      })\n    })]\n  }));\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YSxDQUFDO2NBQUNtQztZQUFZLENBQUMsQ0FBQztVQUMvQixDQUFDO1VBQ0RDLE9BQU8sRUFBRSxDQUNQLENBQUMsRUFDRCxDQUFDLEVBQ0QsQ0FBQyxFQUNELENBQUMsRUFDRCxDQUFDLENBQ0Y7VUFDRDtVQUNBQyxLQUFLLEVBQUV0QyxVQUFVLENBQUNvQztRQUFZLEVBRWpDO01BQUE7SUFDWSxFQUVELEVBQ2YsQ0FBQ3BDLFVBQVUsQ0FBQzhCLFdBQVcsSUFDdEJqQixzREFBQTtNQUFLMEIsU0FBUyxFQUFFLDBDQUEwQztNQUFBckIsUUFBQSxFQUN4REwsc0RBQUEsQ0FBQ3hCLDZEQUFRO1FBQ1BtRCxPQUFPLEVBQUMsTUFBTTtRQUNkRixLQUFLLEVBQUV0QyxVQUFVLENBQUNpQyxLQUFLO1FBQ3ZCRSxRQUFRLEVBQUdGLEtBQUssSUFBS2hDLGFBQWEsQ0FBQztVQUFDZ0M7UUFBSyxDQUFDLENBQUM7UUFDM0NRLGNBQWMsRUFBRSxFQUFFO1FBQ2xCQyxXQUFXLEVBQUVuRCxtREFBRSxDQUFDLGlCQUFpQixFQUFFLHNCQUFzQjtNQUFDO0lBQzFELEVBRUwsRUFDRHNCLHNEQUFBO01BQUkwQixTQUFTLEVBQUUsT0FBTztNQUFBckIsUUFBQSxFQUNwQkwsc0RBQUEsQ0FBQzFCLGdFQUFXO1FBQ1Z3RCxjQUFjLEVBQUVwQixtQkFBbUI7UUFDbkNxQixXQUFXLEVBQUMsWUFBWTtRQUN4QkMsUUFBUSxFQUFFLENBQ1IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN0QixDQUFDLG9CQUFvQixDQUFDLEVBQ3RCLENBQUMsb0JBQW9CLENBQUMsRUFDdEIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUN2QjtRQUNEQyxhQUFhLEVBQUUsQ0FBQyxvQkFBb0I7TUFBQztJQUNyQyxFQUNDO0VBQUEsR0FDRDtBQUVWIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy1ibG9ja3MvLi9zcmMvYmxvY2tzL2ZhY3RzLWdyaWQvZWRpdC50c3g/OGQxNCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICB1c2VCbG9ja1Byb3BzLFxuICBJbm5lckJsb2NrcywgQmxvY2tDb250cm9scywgUmljaFRleHQsXG59IGZyb20gXCJAd29yZHByZXNzL2Jsb2NrLWVkaXRvclwiO1xuaW1wb3J0IHt1c2VTZWxlY3R9IGZyb20gXCJAd29yZHByZXNzL2RhdGFcIjtcbmltcG9ydCB0eXBlIHtDb21wb25lbnRQcm9wc30gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge19ffSBmcm9tIFwiQHdvcmRwcmVzcy9pMThuXCI7XG5pbXBvcnQge1NWRywgUGF0aCwgVG9vbGJhckl0ZW0sIFRvb2xiYXJEcm9wZG93bk1lbnUsIFRvb2xiYXJHcm91cH0gZnJvbSBcIkB3b3JkcHJlc3MvY29tcG9uZW50c1wiO1xuXG4vLyBAdHMtaWdub3JlXG5pbXBvcnQge0hlYWRpbmdMZXZlbERyb3Bkb3dufSBmcm9tIFwiQHdvcmRwcmVzcy9ibG9jay1lZGl0b3JcIjtcblxudHlwZSBXUEJsb2NrID0ge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBpbm5lckJsb2NrczogV1BCbG9ja1tdO1xufTtcblxudHlwZSBCdXR0b25CbG9ja0FwcGVuZGVyUHJvcHMgPSBDb21wb25lbnRQcm9wczx0eXBlb2YgSW5uZXJCbG9ja3MuQnV0dG9uQmxvY2tBcHBlbmRlcj47XG5cbmludGVyZmFjZSBFZGl0UHJvcHMge1xuICBjbGllbnRJZDogc3RyaW5nO1xuICBhdHRyaWJ1dGVzOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBoZWFkaW5nTGV2ZWw6IG51bWJlcjtcbiAgICBoaWRlSGVhZGluZzogYm9vbGVhbjtcbiAgfTtcbiAgc2V0QXR0cmlidXRlczogKGE6IFJlY29yZDxzdHJpbmcsIHVua25vd24+KSA9PiB2b2lkO1xufVxuXG5jb25zdCBNQVhfQ0hJTERSRU4gPSA0O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBFZGl0KHthdHRyaWJ1dGVzLCBzZXRBdHRyaWJ1dGVzLCBjbGllbnRJZH06IEVkaXRQcm9wcykge1xuICBjb25zdCBibG9ja1Byb3BzID0gdXNlQmxvY2tQcm9wcygpO1xuXG4gIGNvbnN0IGNoaWxkQ291bnQgPSB1c2VTZWxlY3QoXG4gICAgKHNlbGVjdCkgPT4ge1xuICAgICAgY29uc3Qge2dldEJsb2NrfSA9IHNlbGVjdChcImNvcmUvYmxvY2stZWRpdG9yXCIpIGFzIHtcbiAgICAgICAgZ2V0QmxvY2s6IChpZDogc3RyaW5nKSA9PiBXUEJsb2NrIHwgdW5kZWZpbmVkO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBnZXRCbG9jayhjbGllbnRJZCk/LmlubmVyQmxvY2tzLmxlbmd0aCA/PyAwO1xuICAgIH0sXG4gICAgW2NsaWVudElkXVxuICApO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIFNWRyBpY29uIGZvciB0aGUgaGlkZUhlYWRpbmcgZmVhdHVyZS5cbiAgICogQHBhcmFtIGZpbGxDb2xvciAtIFRoZSBjb2xvciB0byBmaWxsIHRoZSBTVkcgcGF0aCB3aXRoLlxuICAgKiBAcmV0dXJucyAgICAgICAgIC0gVGhlIFNWRyBpY29uLlxuICAgKi9cbiAgY29uc3QgY3JlYXRlWHJheUljb24gPSAoZmlsbENvbG9yID0gXCJub25lXCIpID0+IChcbiAgICA8U1ZHIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBoZWlnaHQ9XCIyNHB4XCIgdmlld0JveD1cIjAgLTk2MCA5NjAgOTYwXCIgd2lkdGg9XCIyNHB4XCI+XG4gICAgICA8UGF0aCBmaWxsPXtmaWxsQ29sb3J9IGQ9XCJNNDIwLTE2MHYtNTIwSDIwMHYtMTIwaDU2MHYxMjBINTQwdjUyMEg0MjBaXCIvPlxuICAgIDwvU1ZHPlxuICApO1xuXG4gIC8vIERlZmluZSBpbmFjdGl2ZSBhbmQgYWN0aXZlIGhpZGVIZWFkaW5nIGljb25zXG4gIGNvbnN0IGluYWN0aXZlSGVhZGluZ0ljb24gPSBjcmVhdGVYcmF5SWNvbihcIiNEM0QzRDNcIik7XG4gIGNvbnN0IEFjdGl2ZUhlYWRpbmdJY29uID0gY3JlYXRlWHJheUljb24oXCIjMDAwXCIpO1xuXG4gIGNvbnN0IENvbmRpdGlvbmFsQXBwZW5kZXIgPSAocHJvcHM6IEJ1dHRvbkJsb2NrQXBwZW5kZXJQcm9wcykgPT5cbiAgICBjaGlsZENvdW50IDwgTUFYX0NISUxEUkVOID8gKFxuICAgICAgPElubmVyQmxvY2tzLkJ1dHRvbkJsb2NrQXBwZW5kZXIgey4uLnByb3BzfSAvPlxuICAgICkgOiBudWxsO1xuXG4gIC8vIEB0cy1pZ25vcmVcbiAgcmV0dXJuIChcbiAgICA8ZGl2IHsuLi5ibG9ja1Byb3BzfT5cbiAgICAgIDxCbG9ja0NvbnRyb2xzPlxuICAgICAgICA8VG9vbGJhckdyb3VwPlxuICAgICAgICAgIDxUb29sYmFySXRlbT5cbiAgICAgICAgICAgIHsoKSA9PiAoXG4gICAgICAgICAgICAgIDxUb29sYmFyRHJvcGRvd25NZW51XG4gICAgICAgICAgICAgICAgaWNvbj17IWF0dHJpYnV0ZXMuaGlkZUhlYWRpbmcgPyBBY3RpdmVIZWFkaW5nSWNvbiA6IGluYWN0aXZlSGVhZGluZ0ljb259XG4gICAgICAgICAgICAgICAgbGFiZWw9e19fKFwiRGlzcGxheSBvcHRpb25zIGZvciB0aGUgVGl0bGVcIiwgXCJycnplLWVsZW1lbnRzLWJsb2Nrc1wiKX1cbiAgICAgICAgICAgICAgICBjb250cm9scz17W1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogX18oXG4gICAgICAgICAgICAgICAgICAgICAgXCJBZGQgYSBTZWN0aW9uIFRpdGxlIGZvciB0aGUgRmFjdHMgR3JpZC5cIixcbiAgICAgICAgICAgICAgICAgICAgICBcInJyemUtZWxlbWVudHMtYmxvY2tzXCIsXG4gICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgIGljb246IEFjdGl2ZUhlYWRpbmdJY29uLFxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrOiAoKSA9PiBzZXRBdHRyaWJ1dGVzKHtoaWRlSGVhZGluZzogZmFsc2V9KSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfXyhcbiAgICAgICAgICAgICAgICAgICAgICBcIkhpZGUgdGhlIFNlY3Rpb24gVGl0bGUgZm9yIHRoZSBGYWN0cyBHcmlkLlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwicnJ6ZS1lbGVtZW50cy1ibG9ja3NcIixcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogaW5hY3RpdmVIZWFkaW5nSWNvbixcbiAgICAgICAgICAgICAgICAgICAgb25DbGljazogKCkgPT4gc2V0QXR0cmlidXRlcyh7aGlkZUhlYWRpbmc6IHRydWV9KSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9Ub29sYmFySXRlbT5cbiAgICAgICAgICB7IWF0dHJpYnV0ZXMuaGlkZUhlYWRpbmcgJiYgKFxuICAgICAgICAgICAgPEhlYWRpbmdMZXZlbERyb3Bkb3duXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoaGVhZGluZ0xldmVsOiBudW1iZXIpID0+IHtcbiAgICAgICAgICAgICAgICBzZXRBdHRyaWJ1dGVzKHtoZWFkaW5nTGV2ZWx9KVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBvcHRpb25zPXtbXG4gICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICAzLFxuICAgICAgICAgICAgICAgIDQsXG4gICAgICAgICAgICAgICAgNSxcbiAgICAgICAgICAgICAgICA2XG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgdmFsdWU9e2F0dHJpYnV0ZXMuaGVhZGluZ0xldmVsfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L1Rvb2xiYXJHcm91cD5cblxuICAgICAgPC9CbG9ja0NvbnRyb2xzPlxuICAgICAgeyFhdHRyaWJ1dGVzLmhpZGVIZWFkaW5nICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e1wid3AtYmxvY2stZmF1LWVsZW1lbnRhbC1mYXUtbWV0YS1oZWFkbGluZVwifT5cbiAgICAgICAgICA8UmljaFRleHRcbiAgICAgICAgICAgIHRhZ05hbWU9XCJzcGFuXCJcbiAgICAgICAgICAgIHZhbHVlPXthdHRyaWJ1dGVzLnRpdGxlfVxuICAgICAgICAgICAgb25DaGFuZ2U9eyh0aXRsZSkgPT4gc2V0QXR0cmlidXRlcyh7dGl0bGV9KX1cbiAgICAgICAgICAgIGFsbG93ZWRGb3JtYXRzPXtbXX1cbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPXtfXyhcIlNlY3Rpb24gSGVhZGluZ1wiLCBcInJyemUtZWxlbWVudHMtYmxvY2tzXCIpfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICAgIDx1bCBjbGFzc05hbWU9e1wiZmFjdHNcIn0+XG4gICAgICAgIDxJbm5lckJsb2Nrc1xuICAgICAgICAgIHJlbmRlckFwcGVuZGVyPXtDb25kaXRpb25hbEFwcGVuZGVyfVxuICAgICAgICAgIG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiXG4gICAgICAgICAgdGVtcGxhdGU9e1tcbiAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvZmFjdFwiXSxcbiAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvZmFjdFwiXSxcbiAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvZmFjdFwiXSxcbiAgICAgICAgICAgIFtcInJyemUtZWxlbWVudHMvZmFjdFwiXSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGFsbG93ZWRCbG9ja3M9e1tcInJyemUtZWxlbWVudHMvZmFjdFwiXX1cbiAgICAgICAgLz5cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsidXNlQmxvY2tQcm9wcyIsIklubmVyQmxvY2tzIiwiQmxvY2tDb250cm9scyIsIlJpY2hUZXh0IiwidXNlU2VsZWN0IiwiX18iLCJTVkciLCJQYXRoIiwiVG9vbGJhckl0ZW0iLCJUb29sYmFyRHJvcGRvd25NZW51IiwiVG9vbGJhckdyb3VwIiwiSGVhZGluZ0xldmVsRHJvcGRvd24iLCJNQVhfQ0hJTERSRU4iLCJFZGl0IiwiYXR0cmlidXRlcyIsInNldEF0dHJpYnV0ZXMiLCJjbGllbnRJZCIsImJsb2NrUHJvcHMiLCJjaGlsZENvdW50Iiwic2VsZWN0IiwiZ2V0QmxvY2siLCJfYiIsIl9hIiwiaW5uZXJCbG9ja3MiLCJsZW5ndGgiLCJjcmVhdGVYcmF5SWNvbiIsImZpbGxDb2xvciIsIl9qc3giLCJ4bWxucyIsImhlaWdodCIsInZpZXdCb3giLCJ3aWR0aCIsImNoaWxkcmVuIiwiZmlsbCIsImQiLCJpbmFjdGl2ZUhlYWRpbmdJY29uIiwiQWN0aXZlSGVhZGluZ0ljb24iLCJDb25kaXRpb25hbEFwcGVuZGVyIiwicHJvcHMiLCJCdXR0b25CbG9ja0FwcGVuZGVyIiwiT2JqZWN0IiwiYXNzaWduIiwiX2pzeHMiLCJpY29uIiwiaGlkZUhlYWRpbmciLCJsYWJlbCIsImNvbnRyb2xzIiwidGl0bGUiLCJvbkNsaWNrIiwib25DaGFuZ2UiLCJoZWFkaW5nTGV2ZWwiLCJvcHRpb25zIiwidmFsdWUiLCJjbGFzc05hbWUiLCJ0YWdOYW1lIiwiYWxsb3dlZEZvcm1hdHMiLCJwbGFjZWhvbGRlciIsInJlbmRlckFwcGVuZGVyIiwib3JpZW50YXRpb24iLCJ0ZW1wbGF0ZSIsImFsbG93ZWRCbG9ja3MiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/blocks/facts-grid/edit.tsx\n\n}");

/***/ }),

/***/ "./src/blocks/facts-grid/index.tsx":
/*!*****************************************!*\
  !*** ./src/blocks/facts-grid/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ \"@wordpress/blocks\");\n/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ \"./src/blocks/facts-grid/edit.tsx\");\n/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ \"./src/blocks/facts-grid/block.json\");\n/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ \"./src/blocks/facts-grid/editor.scss\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ \"@wordpress/block-editor\");\n/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\n(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {\n  icon: {\n    src: (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(\"svg\", {\n      id: \"a\",\n      xmlns: \"http://www.w3.org/2000/svg\",\n      width: \"512\",\n      height: \"512\",\n      viewBox: \"0 0 512 512\",\n      children: [(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"241.88\",\n        y: \"91.64\",\n        width: \"188.73\",\n        height: \"51.85\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"currentColor\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"241.88\",\n        y: \"232.78\",\n        width: \"188.73\",\n        height: \"51.85\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"currentColor\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"rect\", {\n        x: \"241.88\",\n        y: \"368.5\",\n        width: \"188.73\",\n        height: \"51.85\",\n        rx: \"5.73\",\n        ry: \"5.73\",\n        fill: \"currentColor\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"polyline\", {\n        points: \"95.11 114.2 123.93 143.02 174.82 92.12\",\n        fill: \"none\",\n        stroke: \"currentColor\",\n        strokeLinecap: \"round\",\n        strokeLinejoin: \"round\",\n        strokeWidth: \"20\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"polyline\", {\n        points: \"95.11 255.32 123.93 284.16 174.82 233.26\",\n        fill: \"none\",\n        stroke: \"currentColor\",\n        strokeLinecap: \"round\",\n        strokeLinejoin: \"round\",\n        strokeWidth: \"20\"\n      }), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(\"polyline\", {\n        points: \"95.11 391.06 123.93 419.88 174.82 368.98\",\n        fill: \"none\",\n        stroke: \"currentColor\",\n        strokeLinecap: \"round\",\n        strokeLinejoin: \"round\",\n        strokeWidth: \"20\"\n      })]\n    })\n  },\n  __experimentalLabel: (attributes, {\n    context\n  }) => {\n    const {\n      title\n    } = attributes;\n    if (context === 'list-view' && title) {\n      return title;\n    }\n  },\n  // @see ./edit.js\n  edit: _edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n  // @see ./save.js\n  save: () => (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InnerBlocks.Content, {})\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmxvY2tzL2ZhY3RzLWdyaWQvaW5kZXgudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQXNEO0FBRTVCO0FBQ1U7QUFDYjtBQUMrQjtBQUV0REEsb0VBQWlCLENBQUVFLDZDQUFvQixFQUFFO0VBQ3hDRyxJQUFJLEVBQUU7SUFDTEMsR0FBRyxFQUFFQyx1REFBQTtNQUFLQyxFQUFFLEVBQUMsR0FBRztNQUFDQyxLQUFLLEVBQUMsNEJBQTRCO01BQUNDLEtBQUssRUFBQyxLQUFLO01BQUNDLE1BQU0sRUFBQyxLQUFLO01BQUNDLE9BQU8sRUFBQyxhQUFhO01BQUFDLFFBQUEsR0FBQ0Msc0RBQUE7UUFBTUMsQ0FBQyxFQUFDLFFBQVE7UUFBQ0MsQ0FBQyxFQUFDLE9BQU87UUFBQ04sS0FBSyxFQUFDLFFBQVE7UUFBQ0MsTUFBTSxFQUFDLE9BQU87UUFBQ00sRUFBRSxFQUFDLE1BQU07UUFBQ0MsRUFBRSxFQUFDLE1BQU07UUFBQ0MsSUFBSSxFQUFDO01BQWMsRUFBRSxFQUFBTCxzREFBQTtRQUFNQyxDQUFDLEVBQUMsUUFBUTtRQUFDQyxDQUFDLEVBQUMsUUFBUTtRQUFDTixLQUFLLEVBQUMsUUFBUTtRQUFDQyxNQUFNLEVBQUMsT0FBTztRQUFDTSxFQUFFLEVBQUMsTUFBTTtRQUFDQyxFQUFFLEVBQUMsTUFBTTtRQUFDQyxJQUFJLEVBQUM7TUFBYyxFQUFHLEVBQUFMLHNEQUFBO1FBQU1DLENBQUMsRUFBQyxRQUFRO1FBQUNDLENBQUMsRUFBQyxPQUFPO1FBQUNOLEtBQUssRUFBQyxRQUFRO1FBQUNDLE1BQU0sRUFBQyxPQUFPO1FBQUNNLEVBQUUsRUFBQyxNQUFNO1FBQUNDLEVBQUUsRUFBQyxNQUFNO1FBQUNDLElBQUksRUFBQztNQUFjLEVBQUcsRUFBQUwsc0RBQUE7UUFBVU0sTUFBTSxFQUFDLHdDQUF3QztRQUFDRCxJQUFJLEVBQUMsTUFBTTtRQUFDRSxNQUFNLEVBQUMsY0FBYztRQUFDQyxhQUFhLEVBQUMsT0FBTztRQUFDQyxjQUFjLEVBQUMsT0FBTztRQUFDQyxXQUFXLEVBQUM7TUFBSSxFQUFFLEVBQUFWLHNEQUFBO1FBQVVNLE1BQU0sRUFBQywwQ0FBMEM7UUFBQ0QsSUFBSSxFQUFDLE1BQU07UUFBQ0UsTUFBTSxFQUFDLGNBQWM7UUFBQ0MsYUFBYSxFQUFDLE9BQU87UUFBQ0MsY0FBYyxFQUFDLE9BQU87UUFBQ0MsV0FBVyxFQUFDO01BQUksRUFBRSxFQUFBVixzREFBQTtRQUFVTSxNQUFNLEVBQUMsMENBQTBDO1FBQUNELElBQUksRUFBQyxNQUFNO1FBQUNFLE1BQU0sRUFBQyxjQUFjO1FBQUNDLGFBQWEsRUFBQyxPQUFPO1FBQUNDLGNBQWMsRUFBQyxPQUFPO1FBQUNDLFdBQVcsRUFBQztNQUFJLEVBQUU7SUFBQTtHQUNqMkI7RUFDREMsbUJBQW1CLEVBQUVBLENBQUNDLFVBQWUsRUFBRTtJQUFFQztFQUFPLENBQU8sS0FBSTtJQUMxRCxNQUFNO01BQUVDO0lBQUssQ0FBRSxHQUFHRixVQUFVO0lBRTVCLElBQUlDLE9BQU8sS0FBSyxXQUFXLElBQUlDLEtBQUssRUFBRTtNQUNyQyxPQUFPQSxLQUFLO0lBQ2I7RUFDRCxDQUFDO0VBQ0Q7RUFDQUMsSUFBSSxFQUFFNUIsNkNBQUk7RUFFVjtFQUNBNkIsSUFBSSxFQUFFQSxDQUFBLEtBQU1oQixzREFBQSxDQUFDWCxnRUFBVyxDQUFDNEIsT0FBTztDQUN6QixDQUFFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy1ibG9ja3MvLi9zcmMvYmxvY2tzL2ZhY3RzLWdyaWQvaW5kZXgudHN4P2M4NzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVnaXN0ZXJCbG9ja1R5cGUgfSBmcm9tICdAd29yZHByZXNzL2Jsb2Nrcyc7XG5cbmltcG9ydCBFZGl0IGZyb20gJy4vZWRpdCc7XG5pbXBvcnQgbWV0YWRhdGEgZnJvbSAnLi9ibG9jay5qc29uJztcbmltcG9ydCAnLi9lZGl0b3Iuc2Nzcyc7XG5pbXBvcnQgeyBJbm5lckJsb2NrcyB9IGZyb20gJ0B3b3JkcHJlc3MvYmxvY2stZWRpdG9yJztcblxucmVnaXN0ZXJCbG9ja1R5cGUoIG1ldGFkYXRhLm5hbWUgYXMgYW55LCB7XG5cdGljb246IHtcblx0XHRzcmM6IDxzdmcgaWQ9XCJhXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiNTEyXCIgaGVpZ2h0PVwiNTEyXCIgdmlld0JveD1cIjAgMCA1MTIgNTEyXCI+PHJlY3QgeD1cIjI0MS44OFwiIHk9XCI5MS42NFwiIHdpZHRoPVwiMTg4LjczXCIgaGVpZ2h0PVwiNTEuODVcIiByeD1cIjUuNzNcIiByeT1cIjUuNzNcIiBmaWxsPVwiY3VycmVudENvbG9yXCIvPjxyZWN0IHg9XCIyNDEuODhcIiB5PVwiMjMyLjc4XCIgd2lkdGg9XCIxODguNzNcIiBoZWlnaHQ9XCI1MS44NVwiIHJ4PVwiNS43M1wiIHJ5PVwiNS43M1wiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiAvPjxyZWN0IHg9XCIyNDEuODhcIiB5PVwiMzY4LjVcIiB3aWR0aD1cIjE4OC43M1wiIGhlaWdodD1cIjUxLjg1XCIgcng9XCI1LjczXCIgcnk9XCI1LjczXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIC8+PHBvbHlsaW5lIHBvaW50cz1cIjk1LjExIDExNC4yIDEyMy45MyAxNDMuMDIgMTc0LjgyIDkyLjEyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgc3Ryb2tlV2lkdGg9XCIyMFwiLz48cG9seWxpbmUgcG9pbnRzPVwiOTUuMTEgMjU1LjMyIDEyMy45MyAyODQuMTYgMTc0LjgyIDIzMy4yNlwiIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlTGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlTGluZWpvaW49XCJyb3VuZFwiIHN0cm9rZVdpZHRoPVwiMjBcIi8+PHBvbHlsaW5lIHBvaW50cz1cIjk1LjExIDM5MS4wNiAxMjMuOTMgNDE5Ljg4IDE3NC44MiAzNjguOThcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZUxpbmVqb2luPVwicm91bmRcIiBzdHJva2VXaWR0aD1cIjIwXCIvPjwvc3ZnPlxuXHR9LFxuXHRfX2V4cGVyaW1lbnRhbExhYmVsOiAoYXR0cmlidXRlczogYW55LCB7IGNvbnRleHQgfTogYW55KSA9PiB7XG5cdFx0Y29uc3QgeyB0aXRsZSB9ID0gYXR0cmlidXRlcztcblxuXHRcdGlmIChjb250ZXh0ID09PSAnbGlzdC12aWV3JyAmJiB0aXRsZSkge1xuXHRcdFx0cmV0dXJuIHRpdGxlO1xuXHRcdH1cblx0fSxcblx0Ly8gQHNlZSAuL2VkaXQuanNcblx0ZWRpdDogRWRpdCxcblxuXHQvLyBAc2VlIC4vc2F2ZS5qc1xuXHRzYXZlOiAoKSA9PiA8SW5uZXJCbG9ja3MuQ29udGVudCAvPixcbn0gYXMgYW55ICk7XG4iXSwibmFtZXMiOlsicmVnaXN0ZXJCbG9ja1R5cGUiLCJFZGl0IiwibWV0YWRhdGEiLCJJbm5lckJsb2NrcyIsIm5hbWUiLCJpY29uIiwic3JjIiwiX2pzeHMiLCJpZCIsInhtbG5zIiwid2lkdGgiLCJoZWlnaHQiLCJ2aWV3Qm94IiwiY2hpbGRyZW4iLCJfanN4IiwieCIsInkiLCJyeCIsInJ5IiwiZmlsbCIsInBvaW50cyIsInN0cm9rZSIsInN0cm9rZUxpbmVjYXAiLCJzdHJva2VMaW5lam9pbiIsInN0cm9rZVdpZHRoIiwiX19leHBlcmltZW50YWxMYWJlbCIsImF0dHJpYnV0ZXMiLCJjb250ZXh0IiwidGl0bGUiLCJlZGl0Iiwic2F2ZSIsIkNvbnRlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/blocks/facts-grid/index.tsx\n\n}");

/***/ }),

/***/ "./src/blocks/facts-grid/editor.scss":
/*!*******************************************!*\
  !*** ./src/blocks/facts-grid/editor.scss ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvYmxvY2tzL2ZhY3RzLWdyaWQvZWRpdG9yLnNjc3MiLCJtYXBwaW5ncyI6IjtBQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnJ6ZS1lbGVtZW50cy1ibG9ja3MvLi9zcmMvYmxvY2tzL2ZhY3RzLWdyaWQvZWRpdG9yLnNjc3M/NjA5YSJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/blocks/facts-grid/editor.scss\n\n}");

/***/ }),

/***/ "react/jsx-runtime":
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["ReactJSXRuntime"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/blocks/facts-grid/block.json":
/*!******************************************!*\
  !*** ./src/blocks/facts-grid/block.json ***!
  \******************************************/
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"rrze-elements/facts-grid","version":"1.2.1","title":"Facts Grid","category":"rrze_elements","description":"Creates a Facts Grid Block","supports":{"html":false},"attributes":{"title":{"type":"string","default":""},"materialSymbol":{"type":"string","default":""},"headingLevel":{"type":"number","default":3},"hideHeading":{"type":"boolean","default":false}},"textdomain":"rrze-elements-blocks","editorScript":"file:./index.ts","editorStyle":"file:./index.css","style":"file:./style-index.css","example":{"name":"rrze-elements/facts-grid","attributes":{"title":"Forschung im Überblick"},"innerBlocks":[{"name":"rrze-elements/fact","attributes":{"description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula","materialSymbol":"biotech","buttonText":"Mehr erfahren","buttonUrl":"www.fau.de"}},{"name":"rrze-elements/fact","attributes":{"description":"Hermatology – Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean","materialSymbol":"hematology","buttonText":"Mehr erfahren","buttonUrl":"www.fau.de"}},{"name":"rrze-elements/fact","attributes":{"description":"Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula","materialSymbol":"rib_cage","buttonText":"Mehr erfahren","buttonUrl":"www.fau.de"}},{"name":"rrze-elements/fact","attributes":{"description":"Virology - Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean com","materialSymbol":"coronavirus","buttonText":"Mehr erfahren","buttonUrl":"www.fau.de"}}]}}');

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
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/blocks/facts-grid/index.tsx");
/******/ 	
/******/ })()
;