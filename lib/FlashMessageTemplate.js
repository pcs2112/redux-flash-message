'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlashMessageTemplate = function FlashMessageTemplate(_ref) {
  var type = _ref.type,
      status = _ref.status,
      message = _ref.message,
      onHideClick = _ref.onHideClick;
  return _react2.default.createElement(
    'div',
    {
      style: Object.assign({}, _styles.styles.flashMessage, _styles.styles[type], _styles.styles[status]),
      onClick: onHideClick,
      role: 'button',
      'aria-hidden': true
    },
    _react2.default.createElement(
      'span',
      null,
      message
    )
  );
};

FlashMessageTemplate.propTypes = {
  type: _propTypes2.default.oneOf(['success', 'error']),
  status: _propTypes2.default.string.isRequired,
  message: _propTypes2.default.string,
  onHideClick: _propTypes2.default.func.isRequired
};

FlashMessageTemplate.defaultProps = {
  type: 'success',
  message: ''
};

exports.default = FlashMessageTemplate;
module.exports = exports['default'];