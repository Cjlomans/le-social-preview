import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTiktok, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#b48a7a] text-white">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Le Social</h3>
            <p className="text-[#f5ede1] mb-4">
              Premium event styling kits for unforgettable celebrations across Australia.
            </p>
            <div className="text-[#f5ede1]">
              <p>📧 hello@lesocial.au</p>
              <p>📱 Available Australia-wide</p>
            </div>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://instagram.com/lesocial.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f5ede1] hover:text-white transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://facebook.com/lesocial.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f5ede1] hover:text-white transition-colors"
              >
                <FaFacebookF size={24} />
              </a>
              <a 
                href="https://tiktok.com/@lesocial.au" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f5ede1] hover:text-white transition-colors"
              >
                <FaTiktok size={24} />
              </a>
              <a 
                href="https://pinterest.com/lesocialau" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#f5ede1] hover:text-white transition-colors"
              >
                <FaPinterestP size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Home
              </Link>
              <Link to="/about" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                About Us
              </Link>
              <Link to="/faq" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                FAQ
              </Link>
              <Link to="/booking" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Book Now
              </Link>
            </div>
          </div>

          {/* Our Kits */}
          <div>
            <h4 className="font-semibold mb-4">Our Kits</h4>
            <div className="space-y-2">
              <Link to="/kits/black" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Black Kit
              </Link>
              <Link to="/kits/floral" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Floral Kit
              </Link>
              <Link to="/kits/white" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                White Kit
              </Link>
              <Link to="/kits/orange-pink" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Orange & Pink Kit
              </Link>
              <Link to="/kits/red-pink" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Red & Pink Kit
              </Link>
              <Link to="/kits/poolparty" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Pool Party Kit
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <div className="space-y-2">
              <a href="#" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="block text-[#f5ede1] hover:text-[#e6d6c9] transition-colors">
                Rental Agreement
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#e6d6c9]/30 mt-8 pt-8 text-center text-[#f5ede1]">
          <p>&copy; 2025 Le Social. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

