"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _actions = require("./actions");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {};

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _actions.SUCCESS_FLASH:
    case _actions.ERROR_FLASH:
      return {
        type: _actions.SUCCESS_FLASH ? 'success' : 'error',
        message: action.message,
        isDelayed: action.isDelayed
      };

    case _actions.CLEAR_FLASH:
      return initialState;

    case _actions.SHOW_FLASH:
      if (!state.message) {
        return state;
      }

      return _objectSpread({}, state, {
        isDelayed: false
      });

    default:
      return state;
  }
};

exports.default = _default;
module.exports = exports.default;