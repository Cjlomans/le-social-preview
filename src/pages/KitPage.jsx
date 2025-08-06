import React from "react";
import { useParams, Link } from "react-router-dom";
import KitGallery from "../components/KitGallery";
import { getKitImages } from "../utils/kitImages";

const kits = {
  black: {
    name: "Black Kit",
    description: "Elegant and sophisticated styling perfect for formal events, corporate functions, and upscale celebrations.",
    features: [
      "Premium black linens and table runners",
      "Gold accent pieces and centerpieces",
      "Elegant candle arrangements",
      "Sophisticated signage options",
      "Black and gold balloon arrangements"
    ],
    idealFor: ["Corporate events", "Formal dinners", "Anniversary celebrations", "Graduation parties"]
  },
  floral: {
    name: "Floral Kit",
    description: "Beautiful botanical arrangements that bring nature's elegance to your celebration.",
    features: [
      "Fresh and artificial floral arrangements",
      "Botanical table runners and linens",
      "Garden-inspired centerpieces",
      "Floral signage and welcome boards",
      "Natural color palette decorations"
    ],
    idealFor: ["Garden parties", "Bridal showers", "Spring celebrations", "Outdoor weddings"]
  },
  white: {
    name: "White Kit",
    description: "Clean and minimalist design that creates a timeless, elegant atmosphere.",
    features: [
      "Crisp white linens and table settings",
      "Minimalist centerpieces",
      "Clean geometric decorations",
      "Modern signage options",
      "White and neutral balloon arrangements"
    ],
    idealFor: ["Modern weddings", "Baptisms", "Minimalist celebrations", "Corporate launches"]
  },
  "orange-pink": {
    name: "Orange & Pink Kit",
    description: "Vibrant and energetic colors that create a fun, lively celebration atmosphere.",
    features: [
      "Bright orange and pink linens",
      "Colorful centerpieces and arrangements",
      "Vibrant balloon displays",
      "Fun and playful signage",
      "Tropical-inspired decorations"
    ],
    idealFor: ["Summer parties", "Birthday celebrations", "Tropical themes", "Festival events"]
  },
  "red-pink": {
    name: "Red & Pink Kit",
    description: "Romantic and passionate tones perfect for love-themed celebrations.",
    features: [
      "Rich red and soft pink linens",
      "Romantic floral arrangements",
      "Heart-themed decorations",
      "Love-inspired signage options",
      "Romantic lighting elements"
    ],
    idealFor: ["Valentine's events", "Romantic dinners", "Engagement parties", "Anniversary celebrations"]
  },
  poolparty: {
    name: "Pool Party Kit",
    description: "Fun summer celebration vibes with tropical and aquatic themes.",
    features: [
      "Water-resistant decorations",
      "Tropical color schemes",
      "Pool-safe lighting options",
      "Summer-themed signage",
      "Inflatable and floating decorations"
    ],
    idealFor: ["Pool parties", "Summer birthdays", "Beach themes", "Outdoor celebrations"]
  }
};

export default function KitPage() {
  const { kitId } = useParams();
  const kit = kits[kitId];
  const kitImages = getKitImages(kitId);

  if (!kit) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Kit Not Found</h1>
        <p className="text-gray-600 mb-8">The kit you're looking for doesn't exist.</p>
        <Link to="/" className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors">
          Back to Home
        </Link>
      </div>
    );
  }

  // Get the first image for the main display
  const mainImage = kitImages.length > 0 ? kitImages[0] : null;
  // Get the next 3 images for the thumbnails
  const thumbnailImages = kitImages.slice(1, 4);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          {mainImage ? (
            <div className="h-96 rounded-lg mb-4 overflow-hidden">
              <img 
                src={mainImage} 
                alt={`${kit.name} - Main Image`} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500 text-lg">No Images Available</span>
            </div>
          )}
          
          <div className="grid grid-cols-3 gap-2">
            {thumbnailImages.map((image, index) => (
              <div key={index} className="h-24 rounded overflow-hidden">
                <img 
                  src={image} 
                  alt={`${kit.name} - Thumbnail ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Kit Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{kit.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{kit.description}</p>

          <h2 className="text-2xl font-semibold mb-4">What's Included</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            {kit.features.map((feature, index) => (
              <li key={index} className="text-gray-700">{feature}</li>
            ))}
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Ideal For</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {kit.idealFor.map((occasion, index) => (
              <span key={index} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">
                {occasion}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <Link 
              to="/booking" 
              className="block w-full bg-pink-600 text-white text-center px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Book This Kit
            </Link>
            <Link 
              to="/" 
              className="block w-full border border-gray-300 text-gray-700 text-center px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              View All Kits
            </Link>
          </div>
        </div>
      </div>

      {/* Full Gallery Section */}
      {kitImages.length > 0 && (
        <div className="mt-16">
          <KitGallery kitName={`${kit.name} Gallery`} images={kitImages} />
        </div>
      )}
    </div>
  );
}

