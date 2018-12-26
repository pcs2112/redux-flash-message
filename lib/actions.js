"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearFlashMessage = exports.showFlashMessage = exports.triggerDelayedFlashMessage = exports.triggerFlashMessage = exports.SHOW_FLASH = exports.CLEAR_FLASH = exports.SUCCESS_FLASH = exports.ERROR_FLASH = void 0;
var ERROR_FLASH = 'redux-flash-message/ERROR_FLASH';
exports.ERROR_FLASH = ERROR_FLASH;
var SUCCESS_FLASH = 'redux-flash-message/SUCCESS_FLASH';
exports.SUCCESS_FLASH = SUCCESS_FLASH;
var CLEAR_FLASH = 'redux-flash-message/CLEAR_FLASH';
exports.CLEAR_FLASH = CLEAR_FLASH;
var SHOW_FLASH = 'redux-flash-message/SHOW_FLASH';
/**
 * Action to trigger a success/error flash message.
 *
 * @param {String} type
 * @param {String} message
 * @param {Boolean} isDelayed
 */

exports.SHOW_FLASH = SHOW_FLASH;

var triggerFlashMessage = function triggerFlashMessage(type, message) {
  var isDelayed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return {
    type: type,
    message: message,
    isDelayed: isDelayed
  };
};
/**
 * Action to trigger a success/error delayed flash message.
 * Dispatch the showFlashMessage action to show a delayed flash message.
 * @param {String} type
 * @param {String} message
 */


exports.triggerFlashMessage = triggerFlashMessage;

var triggerDelayedFlashMessage = function triggerDelayedFlashMessage(type, message) {
  return triggerFlashMessage(type, message, true);
};
/**
 * Action to show a the flash message.
 */


exports.triggerDelayedFlashMessage = triggerDelayedFlashMessage;

var showFlashMessage = function showFlashMessage() {
  return {
    type: SHOW_FLASH
  };
};
/**
 * Action to clear the flash message.
 */


exports.showFlashMessage = showFlashMessage;

var clearFlashMessage = function clearFlashMessage() {
  return {
    type: CLEAR_FLASH
  };
};

exports.clearFlashMessage = clearFlashMessage;