'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _actions = require('./actions');

var initialState = {};

exports.default = function () {
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
      return _extends({}, state, {
        isDelayed: false
      });
    default:
      return state;
  }
};

module.exports = exports['default'];