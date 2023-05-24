
Код модуля в изначальной конфигурации:

```
System.register([], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {


	return {

		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {
```

Код, генерящийся по умолчанию:

```
System.register([], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {


	return {

		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@vue/reactivity/dist/reactivity.esm-bundler.js ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EffectScope: function() { return /* binding */ EffectScope; },
/* harmony export */   ITERATE_KEY: function() { return /* binding */ ITERATE_KEY; },
/* harmony export */   ReactiveEffect: function() { return /* binding */ ReactiveEffect; },
/* harmony export */   computed: function() { return /* binding */ computed; },
/* harmony export */   customRef: function() { return /* binding */ customRef; },
/* harmony export */   deferredComputed: function() { return /* binding */ deferredComputed; },
/* harmony export */   effect: function() { return /* binding */ effect; },
/* harmony export */   effectScope: function() { return /* binding */ effectScope; },
```

Diff показал что различие есть только в названии модуля.
Простой смены имени файла на `app.ts` оказалось достаточно.

### Добавление lang="ts"

Добавляем в `tsconfig.json`:

```
  "composite": true,
  "baseUrl": ".",
  "paths": {
	"@/*": ["./src/*"]
  }
```