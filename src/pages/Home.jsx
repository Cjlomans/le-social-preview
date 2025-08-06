import React from "react";
import { Link } from "react-router-dom";
import IframeBanner from "../components/IframeBanner";
import KitGallery from "../components/KitGallery";
import { getKitImages, getKitName } from "../utils/kitImages";

export default function Home() {
  const kits = [
    { 
      id: "black", 
      name: "Black Kit", 
      description: "Elegant and sophisticated styling",
      image: "/images/kits/black/Black Kit Image 1.webp",
      variants: ["Mob Wife", "RIP"]
    },
    { 
      id: "floral", 
      name: "Floral Kit", 
      description: "Beautiful botanical arrangements",
      image: "/images/kits/floral/Floral Kit Image 1.webp",
      variants: ["Classic Floral"]
    },
    { 
      id: "white", 
      name: "White Kit", 
      description: "Clean and minimalist design",
      image: "/images/kits/white/WhiteKitImage1.webp",
      variants: ["Blue", "Pink", "Pink & Blue", "Seashell"]
    },
    { 
      id: "orange-pink", 
      name: "Orange & Pink Kit", 
      description: "Vibrant and energetic colors",
      image: "/images/kits/sunset/Sunset Kit Image 1.webp",
      variants: ["Classic Orange & Pink"]
    },
    { 
      id: "red-pink", 
      name: "Red & Pink Kit", 
      description: "Romantic and passionate tones",
      image: "/images/kits/red/Red Kit Image 1.webp",
      variants: ["Classic Red & Pink"]
    },
    { 
      id: "poolparty", 
      name: "Pool Party Kit", 
      description: "Fun summer celebration vibes",
      image: "/images/kits/poolparty/Pool Party Kit Image 1.webp",
      variants: ["Flamingo", "Margarita", "Martini"]
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Auto-Fading Banner */}
      <IframeBanner />

      {/* Featured Kits */}
      <section className="py-16 bg-[#f5ede1]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 font-syne">Our Event Kits</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {kits.map((kit) => (
              <div key={kit.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={kit.image} 
                    alt={kit.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 font-syne">{kit.name}</h3>
                  <p className="text-gray-600 mb-2">{kit.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Variants: {kit.variants.join(", ")}
                  </p>
                  <Link 
                    to={`/kits/${kit.id}`}
                    className="text-[#b48a7a] hover:text-[#e6d6c9] font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kit Galleries */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          {kits.map((kit) => (
            <div key={kit.id} className="mb-16">
              <KitGallery kitName={kit.name} images={getKitImages(kit.id).slice(0, 6)} />
              <div className="text-center mt-4">
                <Link 
                  to={`/kits/${kit.id}`}
                  className="inline-block bg-[#b48a7a] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
                >
                  View All {kit.name} Images
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#f5ede1]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 font-syne">Ready to Create Your Perfect Event?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our professional styling kits include everything you need for a stunning celebration.
          </p>
          <Link 
            to="/booking" 
            className="bg-[#b48a7a] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
          >
            Start Booking
          </Link>
        </div>
      </section>
    </div>
  );
}

