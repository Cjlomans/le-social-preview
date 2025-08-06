import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DirectImageBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState([false, false, false, false]);

  const bannerImages = [
    "/images/hero/black-mob-wife-table.webp",
    "/images/hero/orange-pink-photobooth.webp",
    "/images/hero/pool-party-flamingo-table.webp",
    "/images/hero/white-photobooth.webp"
  ];

  // Handle image load
  const handleImageLoad = (index) => {
    console.log(`Image ${index} loaded: ${bannerImages[index]}`);
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  // Handle image error
  const handleImageError = (index) => {
    console.error(`Failed to load image ${index}: ${bannerImages[index]}`);
  };

  // Rotate images
  useEffect(() => {
    console.log("Setting up image rotation interval");
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % bannerImages.length;
        console.log(`Rotating to image ${newIndex}: ${bannerImages[newIndex]}`);
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background color as fallback */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Banner Images */}
      {bannerImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Banner image ${index + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            opacity: index === currentImageIndex ? 1 : 0,
            zIndex: index === currentImageIndex ? 1 : 0
          }}
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageError(index)}
        />
      ))}
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-10">
        <div className="text-center text-white px-6 mt-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Your Creative Flair Starts Here</h1>
          <p className="text-xl md:text-2xl mb-8">Premium Event Styling Kits for Unforgettable Celebrations</p>
          <Link 
            to="/booking" 
            className="bg-[#b48a7a] text-white px-8 py-4 rounded-lg font-semibold shadow-md hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors text-lg"
          >
            Book Your Kit
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DirectImageBanner;

