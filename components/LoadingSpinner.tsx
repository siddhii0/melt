
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-16 animate-fade-in">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin" style={{ borderColor: 'var(--accent-color)', borderTopColor: 'transparent' }}></div>
      <p className="text-lg font-semibold" style={{ color: 'var(--text-color)' }}>
        Consulting the culinary cosmos...
      </p>
    </div>
  );
};

export default LoadingSpinner;
