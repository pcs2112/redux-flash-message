'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withFlashMessage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _utils = require('./utils');

var _actions = require('./actions');

var _styles = require('./styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var flashMessage = function flashMessage(_ref) {
  var type = _ref.type,
      status = _ref.status,
      message = _ref.message,
      onHideClick = _ref.onHideClick;
  return _react2.default.createElement(
    'div',
    {
      style: Object.assign({}, _styles.styles.flashMessage, _styles.styles[type], _styles.styles[status]),
      onClick: onHideClick
    },
    _react2.default.createElement(
      'span',
      null,
      message
    )
  );
};

var withFlashMessage = exports.withFlashMessage = function withFlashMessage() {
  var WrappedComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : flashMessage;
  var stateName = arguments[1];

  var WithFlashMessage = function (_Component) {
    _inherits(WithFlashMessage, _Component);

    function WithFlashMessage(props) {
      _classCallCheck(this, WithFlashMessage);

      var _this = _possibleConstructorReturn(this, (WithFlashMessage.__proto__ || Object.getPrototypeOf(WithFlashMessage)).call(this, props));

      _this.state = {
        status: 'hidden'
      };

      _this.hideTimeoutInterval = null;
      _this.hiddenTimeoutInterval = null;
      _this.onHideClick = _this.onHideClick.bind(_this);
      return _this;
    }

    _createClass(WithFlashMessage, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (!(0, _utils.isEmpty)(nextProps.message) && this.props.message !== nextProps.message) {
          this.show();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.clearTimeout();
      }
    }, {
      key: 'onHideClick',
      value: function onHideClick(e) {
        e.preventDefault();
        this.hide(false);
      }
    }, {
      key: 'show',
      value: function show() {
        var _FlashMessage = this;
        _FlashMessage.setState({
          status: 'visible'
        }, function () {
          _FlashMessage.hide();
        });
      }
    }, {
      key: 'hide',
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
      key: 'clearTimeout',
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
      key: 'render',
      value: function render() {
        return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, { onHideClick: this.onHideClick }));
      }
    }]);

    return WithFlashMessage;
  }(_react.Component);

  WithFlashMessage.propTypes = {
    type: _propTypes2.default.oneOf(['success', 'error']),
    message: _propTypes2.default.string,
    hideTimeout: _propTypes2.default.number,
    onClose: _propTypes2.default.func.isRequired
  };
  WithFlashMessage.defaultProps = {
    type: 'success',
    message: '',
    hideTimeout: 3000
  };


  WithFlashMessage.displayName = 'WithFlashMessage(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';

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
  })(FlashMessage);
};