import React from 'react';

const articles = [
  {
    id: 1,
    title: "The Rise of Sustainable Technology",
    excerpt: "How green tech is shaping our future and helping combat climate change.",
    category: "Technology",
    author: "Sarah Johnson",
    date: "March 14, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Understanding Modern Art Movements",
    excerpt: "A deep dive into contemporary art trends and their cultural impact.",
    category: "Culture",
    author: "Michael Chen",
    date: "March 13, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Breakthrough in Quantum Computing",
    excerpt: "Scientists achieve new milestone in quantum supremacy.",
    category: "Science",
    author: "Dr. Emily Brown",
    date: "March 12, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "The Future of Remote Work",
    excerpt: "How companies are adapting to the new normal of distributed teams.",
    category: "Business",
    author: "Alex Rivera",
    date: "March 11, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1521898284481-a5ec348cb555?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];

const ArticleGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {articles.map((article) => (
        <article key={article.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <span className="text-sm font-semibold text-blue-600">{article.category}</span>
            <h2 className="text-xl font-bold mt-2 mb-3">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.excerpt}</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{article.author}</p>
                <p className="text-sm text-gray-500">{article.date} · {article.readTime}</p>
              </div>
              <button className="text-blue-600 font-semibold hover:text-blue-800">
                Read More →
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ArticleGrid;