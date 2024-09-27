// src/components/Blog.js
import React, { useState } from 'react';
import BlogList from './BlogList';
import BlogPostDetail from './BlogPostDetail';
import '../styling.css'; // Include CSS for sliding effect

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleBackClick = () => {
    setSelectedPost(null);
  };

  return (
    <div className="blog-container">
      <div className={`blog-content ${selectedPost ? 'slide-left' : ''}`}>
        {selectedPost ? (
          <BlogPostDetail post={selectedPost} onBackClick={handleBackClick} />
        ) : (
          <BlogList onPostClick={handlePostClick} />
        )}
      </div>
    </div>
  );
}
