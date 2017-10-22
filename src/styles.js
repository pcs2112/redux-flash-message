export const styles = {
  flashMessage: {
    position: 'fixed',
    display: 'block',
    top: '0',
    left: '0',
    opacity: '0',
    visibility: 'hidden',
    width: '100%',
    zIndex: '999999',
    color: '#fff',
    fontSize: '17px',
    height: '55px',
    marginTop: '-55px',
    lineHeight: '55px',
    textAlign: 'center',
    transition: 'opacity 0.3s, margin-top 0.3s'
  },
  success: {
    backgroundColor: '#5cb85c'
  },
  error: {
    background: '#FC4349'
  },
  hiding: {
    visibility: 'visible',
    opacity: '0',
    marginTop: '-55px'
  },
  visible: {
    visibility: 'visible',
    opacity: '1',
    marginTop: '0'
  },
  hidden: {
    visibility: 'hidden'
  }
};
