import React from 'react';

const IframeBanner = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <iframe 
        src="/banner.html" 
        title="Le Social Banner"
        className="absolute inset-0 w-full h-full border-0"
        style={{ zIndex: 1 }}
      ></iframe>
    </div>
  );
};

export default IframeBanner;

