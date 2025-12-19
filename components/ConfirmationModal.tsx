import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title">
      <div className="bg-[var(--secondary-color)] text-[var(--text-color)] rounded-2xl shadow-xl p-8 w-full max-w-md m-4" onClick={e => e.stopPropagation()}>
        <h2 id="confirm-modal-title" className="text-2xl font-bold font-serif mb-2">{title}</h2>
        <p className="mb-6 opacity-90">{message}</p>
        <div className="flex justify-end space-x-4 mt-8">
          <button onClick={onClose} className="px-6 py-2 rounded-lg hover:bg-[var(--accent-color)]/10 transition-colors">Cancel</button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
