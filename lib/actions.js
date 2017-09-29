'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ERROR_FLASH = exports.ERROR_FLASH = 'redux-flash-message/ERROR_FLASH';
var SUCCESS_FLASH = exports.SUCCESS_FLASH = 'redux-flash-message/SUCCESS_FLASH';
var CLEAR_FLASH = exports.CLEAR_FLASH = 'redux-flash-message/CLEAR_FLASH';
var SHOW_FLASH = exports.SHOW_FLASH = 'redux-flash-message/SHOW_FLASH';

/**
 * Action to trigger a success/error flash message.
 *
 * @param {String} type
 * @param {String} message
 * @param {Boolean} isDelayed
 */
var triggerFlashMessage = exports.triggerFlashMessage = function triggerFlashMessage(type, message) {
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
var triggerDelayedFlashMessage = exports.triggerDelayedFlashMessage = function triggerDelayedFlashMessage(type, message) {
  return triggerFlashMessage(type, message, true);
};

/**
 * Action to show a the flash message.
 */
var showFlashMessage = exports.showFlashMessage = function showFlashMessage() {
  return {
    type: SHOW_FLASH
  };
};

/**
 * Action to clear the flash message.
 */
var clearFlashMessage = exports.clearFlashMessage = function clearFlashMessage() {
  return {
    type: CLEAR_FLASH
  };
};