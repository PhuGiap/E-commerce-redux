import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, showFooter = false, footer = null }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg text-black relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Title */}
        {title && <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>}

        {/* Content */}
        <div>{children}</div>

        {/* Optional footer */}
        {showFooter && <div className="pt-4 mt-4 border-t">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
