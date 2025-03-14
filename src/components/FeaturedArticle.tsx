import React from 'react';

const FeaturedArticle = () => {
  return (
    <div className="relative h-[600px] rounded-xl overflow-hidden mb-12">
      <img
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80"
        alt="Featured Article"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent">
        <div className="absolute bottom-0 p-8 text-white">
          <span className="bg-blue-600 text-sm font-semibold px-3 py-1 rounded-full">Technology</span>
          <h1 className="text-4xl font-bold mt-4 mb-4">The Future of Artificial Intelligence in Modern Business</h1>
          <p className="text-lg text-gray-200 mb-4 max-w-3xl">Exploring how AI is revolutionizing industries and reshaping the way we work in the digital age.</p>
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80"
              alt="Author"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-4">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-300">March 15, 2024 · 8 min read</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;