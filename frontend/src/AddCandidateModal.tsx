import React, { useEffect, useRef } from 'react';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        // Trap focus inside modal
        const focusableEls = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableEls[0];
        const lastEl = focusableEls[focusableEls.length - 1];
        if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        } else if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="add-candidate-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-candidate-modal-title"
      tabIndex={-1}
      ref={modalRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
    >
      <div style={{ width: '100%', maxWidth: 480 }}>
        {children}
      </div>
    </div>
  );
};

export default AddCandidateModal;
