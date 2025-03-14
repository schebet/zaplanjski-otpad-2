import React from 'react';
import { Menu, Search, User, BookOpen } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 cursor-pointer md:hidden" />
            <div className="flex items-center ml-4 md:ml-0">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Revista</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Technology</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Culture</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Science</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Business</a>
          </div>

          <div className="flex items-center space-x-4">
            <Search className="h-6 w-6 text-gray-600 cursor-pointer" />
            <User className="h-6 w-6 text-gray-600 cursor-pointer" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;