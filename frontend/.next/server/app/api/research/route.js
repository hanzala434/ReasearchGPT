/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/research/route";
exports.ids = ["app/api/research/route"];
exports.modules = {

/***/ "(rsc)/./app/api/research/route.js":
/*!***********************************!*\
  !*** ./app/api/research/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/api/server.js\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nasync function POST(request) {\n    try {\n        const { query } = await request.json();\n        if (!query) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Query is required'\n            }, {\n                status: 400\n            });\n        }\n        // Call the FastAPI endpoint\n        const response = await fetch(process.env.RESEARCH_API_URL, {\n            method: 'POST',\n            headers: {\n                'Content-Type': 'application/json'\n            },\n            body: JSON.stringify({\n                query\n            })\n        });\n        if (!response.ok) {\n            const errorData = await response.json();\n            throw new Error(errorData.detail || 'Failed to generate research');\n        }\n        const data = await response.json();\n        // Generate a unique filename for the download\n        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');\n        const safeQuery = query.replace(/[^a-z0-9]/gi, '_').toLowerCase();\n        const filename = `research_${safeQuery}_${timestamp}.txt`;\n        // Create the downloads directory if it doesn't exist\n        const downloadsDir = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.cwd(), 'public', 'downloads');\n        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(downloadsDir)) {\n            fs__WEBPACK_IMPORTED_MODULE_1___default().mkdirSync(downloadsDir, {\n                recursive: true\n            });\n        }\n        // Save the research output to a file\n        const filePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(downloadsDir, filename);\n        const fileContent = `Research Topic: ${data.topic}\\n\\n` + `Summary:\\n${data.summary}\\n\\n` + `Key Points:\\n${data.key_points.map((point)=>`• ${point}`).join('\\n')}\\n\\n` + `Detailed Analysis:\\n${data.detailed_analysis}\\n\\n` + `Sources:\\n${data.sources.map((source)=>`- ${source}`).join('\\n')}\\n\\n` + `Tools Used:\\n${data.tools_used.map((tool)=>`- ${tool}`).join('\\n')}`;\n        fs__WEBPACK_IMPORTED_MODULE_1___default().writeFileSync(filePath, fileContent, 'utf-8');\n        // Add download information to the response\n        const result = {\n            ...data,\n            download: {\n                filename: filename,\n                url: `/api/download?filename=${filename}`\n            }\n        };\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (error) {\n        console.error('Research API error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message || 'An error occurred while generating research'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UTtRQUFJO0lBRXRCO0FBQ0oiLCJzb3VyY2VzIjpbIkU6XFxQcm9qZWN0c1xccmVzZWFyY2hncHRcXGZyb250ZW5kXFxhcHBcXGFwaVxccmVzZWFyY2hcXHJvdXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxdWVzdCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgcXVlcnkgfSA9IGF3YWl0IHJlcXVlc3QuanNvbigpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICAgICAgICAgIHsgZXJyb3I6ICdRdWVyeSBpcyByZXF1aXJlZCcgfSxcbiAgICAgICAgICAgICAgICB7IHN0YXR1czogNDAwIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxsIHRoZSBGYXN0QVBJIGVuZHBvaW50XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuUkVTRUFSQ0hfQVBJX1VSTCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5IH0pLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvckRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JEYXRhLmRldGFpbCB8fCAnRmFpbGVkIHRvIGdlbmVyYXRlIHJlc2VhcmNoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBcbiAgICAgICAgLy8gR2VuZXJhdGUgYSB1bmlxdWUgZmlsZW5hbWUgZm9yIHRoZSBkb3dubG9hZFxuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgvWzouXS9nLCAnLScpO1xuICAgICAgICBjb25zdCBzYWZlUXVlcnkgPSBxdWVyeS5yZXBsYWNlKC9bXmEtejAtOV0vZ2ksICdfJykudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgZmlsZW5hbWUgPSBgcmVzZWFyY2hfJHtzYWZlUXVlcnl9XyR7dGltZXN0YW1wfS50eHRgO1xuICAgICAgICBcbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBkb3dubG9hZHMgZGlyZWN0b3J5IGlmIGl0IGRvZXNuJ3QgZXhpc3RcbiAgICAgICAgY29uc3QgZG93bmxvYWRzRGlyID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdwdWJsaWMnLCAnZG93bmxvYWRzJyk7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhkb3dubG9hZHNEaXIpKSB7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZG93bmxvYWRzRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU2F2ZSB0aGUgcmVzZWFyY2ggb3V0cHV0IHRvIGEgZmlsZVxuICAgICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihkb3dubG9hZHNEaXIsIGZpbGVuYW1lKTtcbiAgICAgICAgY29uc3QgZmlsZUNvbnRlbnQgPSBgUmVzZWFyY2ggVG9waWM6ICR7ZGF0YS50b3BpY31cXG5cXG5gICtcbiAgICAgICAgICAgIGBTdW1tYXJ5OlxcbiR7ZGF0YS5zdW1tYXJ5fVxcblxcbmAgK1xuICAgICAgICAgICAgYEtleSBQb2ludHM6XFxuJHtkYXRhLmtleV9wb2ludHMubWFwKHBvaW50ID0+IGDigKIgJHtwb2ludH1gKS5qb2luKCdcXG4nKX1cXG5cXG5gICtcbiAgICAgICAgICAgIGBEZXRhaWxlZCBBbmFseXNpczpcXG4ke2RhdGEuZGV0YWlsZWRfYW5hbHlzaXN9XFxuXFxuYCArXG4gICAgICAgICAgICBgU291cmNlczpcXG4ke2RhdGEuc291cmNlcy5tYXAoc291cmNlID0+IGAtICR7c291cmNlfWApLmpvaW4oJ1xcbicpfVxcblxcbmAgK1xuICAgICAgICAgICAgYFRvb2xzIFVzZWQ6XFxuJHtkYXRhLnRvb2xzX3VzZWQubWFwKHRvb2wgPT4gYC0gJHt0b29sfWApLmpvaW4oJ1xcbicpfWA7XG4gICAgICAgIFxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBmaWxlQ29udGVudCwgJ3V0Zi04Jyk7XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgZG93bmxvYWQgaW5mb3JtYXRpb24gdG8gdGhlIHJlc3BvbnNlXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgICBkb3dubG9hZDoge1xuICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBmaWxlbmFtZSxcbiAgICAgICAgICAgICAgICB1cmw6IGAvYXBpL2Rvd25sb2FkP2ZpbGVuYW1lPSR7ZmlsZW5hbWV9YFxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdCk7XG4gICAgICAgIFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jlc2VhcmNoIEFQSSBlcnJvcjonLCBlcnJvcik7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihcbiAgICAgICAgICAgIHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfHwgJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIGdlbmVyYXRpbmcgcmVzZWFyY2gnIH0sXG4gICAgICAgICAgICB7IHN0YXR1czogNTAwIH1cbiAgICAgICAgKTtcbiAgICB9XG59Il0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImZzIiwicGF0aCIsIlBPU1QiLCJyZXF1ZXN0IiwicXVlcnkiLCJqc29uIiwiZXJyb3IiLCJzdGF0dXMiLCJyZXNwb25zZSIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIlJFU0VBUkNIX0FQSV9VUkwiLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJvayIsImVycm9yRGF0YSIsIkVycm9yIiwiZGV0YWlsIiwiZGF0YSIsInRpbWVzdGFtcCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInJlcGxhY2UiLCJzYWZlUXVlcnkiLCJ0b0xvd2VyQ2FzZSIsImZpbGVuYW1lIiwiZG93bmxvYWRzRGlyIiwiam9pbiIsImN3ZCIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJyZWN1cnNpdmUiLCJmaWxlUGF0aCIsImZpbGVDb250ZW50IiwidG9waWMiLCJzdW1tYXJ5Iiwia2V5X3BvaW50cyIsIm1hcCIsInBvaW50IiwiZGV0YWlsZWRfYW5hbHlzaXMiLCJzb3VyY2VzIiwic291cmNlIiwidG9vbHNfdXNlZCIsInRvb2wiLCJ3cml0ZUZpbGVTeW5jIiwicmVzdWx0IiwiZG93bmxvYWQiLCJ1cmwiLCJjb25zb2xlIiwibWVzc2FnZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/research/route.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fresearch%2Froute&page=%2Fapi%2Fresearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresearch%2Froute.js&appDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fresearch%2Froute&page=%2Fapi%2Fresearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresearch%2Froute.js&appDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var E_Projects_researchgpt_frontend_app_api_research_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/research/route.js */ \"(rsc)/./app/api/research/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/research/route\",\n        pathname: \"/api/research\",\n        filename: \"route\",\n        bundlePath: \"app/api/research/route\"\n    },\n    resolvedPagePath: \"E:\\\\Projects\\\\researchgpt\\\\frontend\\\\app\\\\api\\\\research\\\\route.js\",\n    nextConfigOutput,\n    userland: E_Projects_researchgpt_frontend_app_api_research_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vbmV4dEAxNS4zLjJfcmVhY3QtZG9tQDE5LjEuMF9yZWFjdEAxOS4xLjBfX3JlYWN0QDE5LjEuMC9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZyZXNlYXJjaCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcmVzZWFyY2glMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZyZXNlYXJjaCUyRnJvdXRlLmpzJmFwcERpcj1FJTNBJTVDUHJvamVjdHMlNUNyZXNlYXJjaGdwdCU1Q2Zyb250ZW5kJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1FJTNBJTVDUHJvamVjdHMlNUNyZXNlYXJjaGdwdCU1Q2Zyb250ZW5kJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNpQjtBQUM5RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiRTpcXFxcUHJvamVjdHNcXFxccmVzZWFyY2hncHRcXFxcZnJvbnRlbmRcXFxcYXBwXFxcXGFwaVxcXFxyZXNlYXJjaFxcXFxyb3V0ZS5qc1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcmVzZWFyY2gvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9yZXNlYXJjaFwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcmVzZWFyY2gvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJFOlxcXFxQcm9qZWN0c1xcXFxyZXNlYXJjaGdwdFxcXFxmcm9udGVuZFxcXFxhcHBcXFxcYXBpXFxcXHJlc2VhcmNoXFxcXHJvdXRlLmpzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fresearch%2Froute&page=%2Fapi%2Fresearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresearch%2Froute.js&appDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \*********************************************************************************************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0"], () => (__webpack_exec__("(rsc)/./node_modules/.pnpm/next@15.3.2_react-dom@19.1.0_react@19.1.0__react@19.1.0/node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fresearch%2Froute&page=%2Fapi%2Fresearch%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fresearch%2Froute.js&appDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=E%3A%5CProjects%5Cresearchgpt%5Cfrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();