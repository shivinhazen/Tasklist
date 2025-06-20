import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'exclamation-circle';
      case 'warning':
        return 'exclamation-triangle';
      case 'info':
        return 'info-circle';
      default:
        return 'info-circle';
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <FontAwesomeIcon icon={getIcon()} className="toast-icon" />
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose}>
        <FontAwesomeIcon icon="times" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning', 'info']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number
};

export default Toast; 