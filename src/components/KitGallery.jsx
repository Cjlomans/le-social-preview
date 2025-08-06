import React from 'react';

const KitGallery = ({ kitName, images }) => {
  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold mb-6 text-center font-syne">{kitName}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img 
              src={image} 
              alt={`${kitName} - Image ${index + 1}`} 
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KitGallery;

