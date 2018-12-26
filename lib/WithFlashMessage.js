"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _utils = require("./utils");

var _actions = require("./actions");

var _FlashMessageTemplate = _interopRequireDefault(require("./FlashMessageTemplate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withFlashMessage = function withFlashMessage() {
  var WrappedComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _FlashMessageTemplate.default;
  var stateName = arguments.length > 1 ? arguments[1] : undefined;

  var WithFlashMessage =
  /*#__PURE__*/
  function (_Component) {
    _inherits(WithFlashMessage, _Component);

    function WithFlashMessage(props) {
      var _this;

      _classCallCheck(this, WithFlashMessage);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(WithFlashMessage).call(this, props));
      _this.state = {
        status: 'hidden'
      };
      _this.hideTimeoutInterval = null;
      _this.hiddenTimeoutInterval = null;
      _this.onHideClick = _this.onHideClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      return _this;
    }

    _createClass(WithFlashMessage, [{
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(nextProps) {
        if (!(0, _utils.isEmpty)(nextProps.message) && this.props.message !== nextProps.message) {
          this.show();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.clearTimeout();
      }
    }, {
      key: "onHideClick",
      value: function onHideClick(e) {
        e.preventDefault();
        this.hide(false);
      }
    }, {
      key: "show",
      value: function show() {
        var _FlashMessage = this;

        _FlashMessage.setState({
          status: 'visible'
        }, function () {
          _FlashMessage.hide();
        });
      }
    }, {
      key: "hide",
      value: function hide() {
        var withDelay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        var _FlashMessage = this;

        _FlashMessage.clearTimeout();

        if (withDelay) {
          _FlashMessage.hideTimeoutInterval = setTimeout(function () {
            _FlashMessage.setState({
              status: 'hiding'
            }, function () {
              _FlashMessage.hideTimeoutInterval = setTimeout(function () {
                _FlashMessage.setState({
                  status: 'hidden'
                }, function () {
                  _FlashMessage.clearTimeout();

                  _FlashMessage.props.onClose();
                });
              }, 500);
            });
          }, _FlashMessage.props.hideTimeout);
        } else {
          _FlashMessage.setState({
            status: 'hiding'
          }, function () {
            _FlashMessage.hideTimeoutInterval = setTimeout(function () {
              _FlashMessage.setState({
                status: 'hidden'
              }, function () {
                _FlashMessage.clearTimeout();

                _FlashMessage.props.onClose();
              });
            }, 500);
          });
        }
      }
    }, {
      key: "clearTimeout",
      value: function (_clearTimeout) {
        function clearTimeout() {
          return _clearTimeout.apply(this, arguments);
        }

        clearTimeout.toString = function () {
          return _clearTimeout.toString();
        };

        return clearTimeout;
      }(function () {
        if (!(0, _utils.isEmpty)(this.hideTimeoutInterval)) {
          clearTimeout(this.hideTimeoutInterval);
          this.hideTimeoutInterval = null;
        }

        if (!(0, _utils.isEmpty)(this.hiddenTimeoutInterval)) {
          clearTimeout(this.hiddenTimeoutInterval);
          this.hiddenTimeoutInterval = null;
        }
      })
    }, {
      key: "render",
      value: function render() {
        return _react.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
          onHideClick: this.onHideClick
        }));
      }
    }]);

    return WithFlashMessage;
  }(_react.Component);

  _defineProperty(WithFlashMessage, "propTypes", {
    type: _propTypes.default.oneOf(['success', 'error']),
    message: _propTypes.default.string,
    hideTimeout: _propTypes.default.number,
    onClose: _propTypes.default.func.isRequired
  });

  _defineProperty(WithFlashMessage, "defaultProps", {
    type: 'success',
    message: '',
    hideTimeout: 3000
  });

  WithFlashMessage.displayName = "WithFlashMessage(".concat((0, _utils.getDisplayName)(WrappedComponent), ")");
  return (0, _reactRedux.connect)(function (state) {
    if (!(0, _utils.isEmpty)(state[stateName].type) && !(0, _utils.isEmpty)(state[stateName].message) && !state[stateName].isDelayed) {
      return {
        type: state[stateName].type,
        message: state[stateName].message
      };
    }

    return {};
  }, function (dispatch) {
    return {
      onClose: function onClose() {
        dispatch((0, _actions.clearFlashMessage)());
      }
    };
  })(WithFlashMessage);
};

var _default = withFlashMessage;
exports.default = _default;
module.exports = exports.default;