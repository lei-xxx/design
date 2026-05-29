
import React from 'react';
import { Link } from 'react-router-dom';
import {Mail, Phone, MapPin} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-transparent text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold mb-8">疯狂许师傅</h3>
            <p className="text-white/60 mb-8 max-w-md">
              Welcome to my portfolio website of design works, let's explore the stories of inspiration through creation together.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-[#FF5825] mr-3" />
                <span className="text-white/60">xuleixulei2021@qq.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-[#FF5825] mr-3" />
                <span className="text-white/60">18406593255</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-[#FF5825] mr-3" />
                <span className="text-white/60">China, Shenzhen</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-8">Quick Links</h4>
            <ul className="space-y-8">
              <li>
                <Link to="/" className="text-white/60 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-white/60 hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="hidden lg:block">
            <h4 className="text-lg font-semibold mb-8">Services</h4>
            <ul className="space-y-8">
              <li>
                <span className="text-white/60">Full-stack UI/UX design (app, web, data visualization)</span>
              </li>
              <li>
                <span className="text-white/60">B-end complex system design</span>
              </li>
              <li>
                <span className="text-white/60">Motion Effect Design</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col lg:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 lg:mb-0">
            © 2024 DevCraft. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
