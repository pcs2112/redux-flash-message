'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _utils = require('./utils');

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlashMessage = function (_Component) {
  _inherits(FlashMessage, _Component);

  function FlashMessage(props) {
    _classCallCheck(this, FlashMessage);

    var _this = _possibleConstructorReturn(this, (FlashMessage.__proto__ || Object.getPrototypeOf(FlashMessage)).call(this, props));

    _this.state = {
      status: 'hidden'
    };

    _this.hideTimeoutInterval = null;
    _this.hiddenTimeoutInterval = null;
    _this.onHideClick = _this.onHideClick.bind(_this);
    return _this;
  }

  _createClass(FlashMessage, [{
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
      var _props = this.props,
          type = _props.type,
          message = _props.message,
          className = _props.className;
      var status = this.state.status;

      return _react2.default.createElement(
        'div',
        {
          className: className + ' ' + type + ' ' + status,
          onClick: this.onHideClick
        },
        _react2.default.createElement(
          'span',
          null,
          message
        )
      );
    }
  }]);

  return FlashMessage;
}(_react.Component);

FlashMessage.propTypes = {
  type: _propTypes2.default.oneOf(['success', 'error']),
  message: _propTypes2.default.string,
  hideTimeout: _propTypes2.default.number,
  onClose: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};
FlashMessage.defaultProps = {
  type: 'success',
  message: '',
  hideTimeout: 3000,
  className: 'flash-message'
};
exports.default = (0, _reactRedux.connect)(function (state) {
  if (!(0, _utils.isEmpty)(state.flashMessage.type) && !(0, _utils.isEmpty)(state.flashMessage.message) && !state.flashMessage.isDelayed) {
    return {
      type: state.flashMessage.type,
      message: state.flashMessage.message
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
module.exports = exports['default'];