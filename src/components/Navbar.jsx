import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-white">
            Le Social
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-[#e6d6c9] transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-white hover:text-[#e6d6c9] transition-colors">
              About
            </Link>
            <Link to="/faq" className="text-white hover:text-[#e6d6c9] transition-colors">
              FAQ
            </Link>
            <Link 
              to="/booking" 
              className="bg-[#b48a7a] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#e6d6c9]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 bg-black bg-opacity-80 rounded-lg">
            <div className="flex flex-col space-y-4 px-4">
              <Link 
                to="/" 
                className="text-white hover:text-[#e6d6c9] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-white hover:text-[#e6d6c9] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/faq" 
                className="text-white hover:text-[#e6d6c9] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/booking" 
                className="bg-[#b48a7a] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#e6d6c9] hover:text-[#b48a7a] transition-colors text-center"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

