"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = require("./styles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FlashMessageTemplate = function FlashMessageTemplate(_ref) {
  var type = _ref.type,
      status = _ref.status,
      message = _ref.message,
      onHideClick = _ref.onHideClick;
  return _react.default.createElement("div", {
    style: Object.assign({}, _styles.styles.flashMessage, _styles.styles[type], _styles.styles[status]),
    onClick: onHideClick,
    role: "button",
    "aria-hidden": true
  }, _react.default.createElement("span", null, message));
};

FlashMessageTemplate.propTypes = {
  type: _propTypes.default.oneOf(['success', 'error']),
  status: _propTypes.default.string.isRequired,
  message: _propTypes.default.string,
  onHideClick: _propTypes.default.func.isRequired
};
FlashMessageTemplate.defaultProps = {
  type: 'success',
  message: ''
};
var _default = FlashMessageTemplate;
exports.default = _default;
module.exports = exports.default;