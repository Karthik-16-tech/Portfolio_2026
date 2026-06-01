import React from 'react';

const ViewCapabilitiesButton = () => {
  return (
    <button className="inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-gradient-to-br from-[rgba(15,15,20,0.95)] to-[rgba(10,10,15,0.98)] px-7 py-3.5 font-medium text-white/92 transition-all duration-350 ease-out hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95">
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
      </svg>
      <span>View Capabilities</span>
    </button>
  );
};

export default ViewCapabilitiesButton;
