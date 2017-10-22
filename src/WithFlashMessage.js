import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, getDisplayName } from './utils';
import { clearFlashMessage } from './actions';
import FlashMessageTemplate from './FlashMessageTemplate';

const withFlashMessage = (WrappedComponent = FlashMessageTemplate, stateName) => {
  class WithFlashMessage extends Component {
    static propTypes = {
      type: PropTypes.oneOf(['success', 'error']),
      message: PropTypes.string,
      hideTimeout: PropTypes.number,
      onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
      type: 'success',
      message: '',
      hideTimeout: 3000
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
      return (
        <WrappedComponent {...this.props} {...this.state} onHideClick={this.onHideClick} />
      );
    }
  }

  WithFlashMessage.displayName = `WithFlashMessage(${getDisplayName(WrappedComponent)})`;

  return connect(
    (state) => {
      if (!isEmpty(state[stateName].type) && !isEmpty(state[stateName].message) && !state[stateName].isDelayed) {
        return {
          type: state[stateName].type,
          message: state[stateName].message
        };
      }

      return {};
    },
    dispatch => ({
      onClose: () => {
        dispatch(clearFlashMessage());
      }
    })
  )(WithFlashMessage);
};

export default withFlashMessage;
