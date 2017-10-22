import React from 'react';
import PropTypes from 'prop-types';
import { styles } from './styles';

const FlashMessageTemplate = ({
  type, status, message, onHideClick
}) => (
  <div
    style={Object.assign({}, styles.flashMessage, styles[type], styles[status])}
    onClick={onHideClick}
    role="button"
    aria-hidden
  >
    <span>{message}</span>
  </div>
);

FlashMessageTemplate.propTypes = {
  type: PropTypes.oneOf(['success', 'error']),
  status: PropTypes.string.isRequired,
  message: PropTypes.string,
  onHideClick: PropTypes.func.isRequired
};

FlashMessageTemplate.defaultProps = {
  type: 'success',
  message: ''
};

export default FlashMessageTemplate;
