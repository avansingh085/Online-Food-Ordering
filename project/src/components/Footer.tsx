import React from 'react';
import { Pizza, MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Pizza className="h-8 w-8 text-orange-500 dark:text-yellow-400" />
              <span className="text-xl font-bold">Beks Pizza & Burger</span>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Serving delicious pizzas and burgers since 2019. Made with love, 
              delivered with care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 p-2 rounded-full hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 p-2 rounded-full hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 p-2 rounded-full hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Home</a></li>
              <li><a href="#menu" className="text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Menu</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Contact</a></li>
              <li><a href="#offers" className="text-gray-300 hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Offers</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-orange-500 dark:text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Food Street, Delhi, India 110001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-orange-500 dark:text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-orange-500 dark:text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@bekspizza.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-orange-500 dark:text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">Mon-Sun: 10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm mb-4">
              Subscribe to get special offers and updates!
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="bg-orange-500 dark:bg-yellow-400 text-white dark:text-gray-900 py-2 rounded-md hover:bg-orange-600 dark:hover:bg-yellow-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Beks Pizza & Burger. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 md:justify-end">
              <a href="#privacy" className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#cookies" className="hover:text-orange-500 dark:hover:text-yellow-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;