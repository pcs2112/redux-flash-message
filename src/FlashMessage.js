import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from './utils';
import { clearFlashMessage } from './actions';

class FlashMessage extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['success', 'error']),
    message: PropTypes.string,
    hideTimeout: PropTypes.number,
    onClose: PropTypes.func.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    type: 'success',
    message: '',
    hideTimeout: 3000,
    className: 'flash-message'
  };

  constructor(props) {
    super(props);
    this.state = {
      status: 'hidden'
    };

    this.hideTimeoutInterval = null;
    this.hiddenTimeoutInterval = null;
    this.onHideClick = this.onHideClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.message) && this.props.message !== nextProps.message) {
      this.show();
    }
  }

  componentWillUnmount() {
    this.clearTimeout();
  }

  onHideClick(e) {
    e.preventDefault();
    this.hide(false);
  }

  show() {
    const _FlashMessage = this;
    _FlashMessage.setState({
      status: 'visible'
    }, () => {
      _FlashMessage.hide();
    });
  }

  hide(withDelay = true) {
    const _FlashMessage = this;

    _FlashMessage.clearTimeout();

    if (withDelay) {
      _FlashMessage.hideTimeoutInterval = setTimeout(() => {
        _FlashMessage.setState({
          status: 'hiding'
        }, () => {
          _FlashMessage.hideTimeoutInterval = setTimeout(() => {
            _FlashMessage.setState({
              status: 'hidden'
            }, () => {
              _FlashMessage.clearTimeout();
              _FlashMessage.props.onClose();
            });
          }, 500);
        });
      }, _FlashMessage.props.hideTimeout);
    } else {
      _FlashMessage.setState({
        status: 'hiding'
      }, () => {
        _FlashMessage.hideTimeoutInterval = setTimeout(() => {
          _FlashMessage.setState({
            status: 'hidden'
          }, () => {
            _FlashMessage.clearTimeout();
            _FlashMessage.props.onClose();
          });
        }, 500);
      });
    }
  }

  clearTimeout() {
    if (!isEmpty(this.hideTimeoutInterval)) {
      clearTimeout(this.hideTimeoutInterval);
      this.hideTimeoutInterval = null;
    }

    if (!isEmpty(this.hiddenTimeoutInterval)) {
      clearTimeout(this.hiddenTimeoutInterval);
      this.hiddenTimeoutInterval = null;
    }
  }

  render() {
    const { type, message, className } = this.props;
    const { status } = this.state;
    return (
      <div
        className={`${className} ${type} ${status}`}
        onClick={this.onHideClick}
      >
        <span>{message}</span>
      </div>
    );
  }
}

export default connect(
  (state) => {
    if (!isEmpty(state.flashMessage.type) && !isEmpty(state.flashMessage.message) && !state.flashMessage.isDelayed) {
      return {
        type: state.flashMessage.type,
        message: state.flashMessage.message
      };
    }

    return {};
  },
  (dispatch) => ({
    onClose: () => {
      dispatch(clearFlashMessage());
    }
  })
)(FlashMessage);
