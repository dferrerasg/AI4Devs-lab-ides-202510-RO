import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`toast toast-${type}`}
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: type === 'error' ? '#d32f2f' : '#ffdf6e',
        color: type === 'error' ? '#fff' : '#000',
        padding: '1rem 2rem',
        borderRadius: 8,
        boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
        zIndex: 2000,
        fontWeight: 600,
      }}
    >
      {message}
    </div>
  );
};

export default Toast;
