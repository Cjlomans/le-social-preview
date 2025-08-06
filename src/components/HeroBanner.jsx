import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState([]);

  const bannerImages = [
    "/images/hero/black-mob-wife-table.webp",
    "/images/hero/orange-pink-photobooth.webp",
    "/images/hero/pool-party-flamingo-table.webp",
    "/images/hero/white-photobooth.webp"
  ];

  // Preload images
  useEffect(() => {
    console.log("Starting to preload images");
    const loadImages = async () => {
      try {
        const imagePromises = bannerImages.map((src) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              console.log(`Image loaded: ${src}`);
              resolve(src);
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`);
              reject(new Error(`Failed to load image: ${src}`));
            };
          });
        });

        const loadedSrcs = await Promise.all(imagePromises);
        console.log("All images loaded successfully:", loadedSrcs);
        setLoadedImages(loadedSrcs);
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        // Fallback to showing at least the content even if images fail
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

  // Rotate images
  useEffect(() => {
    if (!imagesLoaded || loadedImages.length === 0) return;

    console.log("Setting up image rotation interval");
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % loadedImages.length;
        console.log(`Rotating to image ${newIndex}: ${loadedImages[newIndex]}`);
        return newIndex;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [imagesLoaded, loadedImages]);

  const currentImage = imagesLoaded && loadedImages.length > 0 
    ? loadedImages[currentImageIndex] 
    : null;

  console.log("Current image:", currentImage);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background color as fallback */}
      <div className="absolute inset-0 bg-black"></div>
      
      {/* Banner Image */}
      {currentImage && (
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
      )}
      
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

export default HeroBanner;

