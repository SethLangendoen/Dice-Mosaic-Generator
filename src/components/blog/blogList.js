import React, { useState, useEffect } from 'react';
import '../styling.css';  // Assuming you create this CSS file for styling

const BlogList = ({ blogs, setSelectedBlog, selectedBlog, searchTerm }) => {
  const [highlightedBlogs, setHighlightedBlogs] = useState([]);

  const highlightBlogs = (term) => {
    const matchedBlogs = blogs.filter((blog) =>
      blog.paragraphs.some((paragraph) => paragraph.toLowerCase().includes(term.toLowerCase()))
    );
    setHighlightedBlogs(matchedBlogs.map((blog) => blog.id));
  };

  useEffect(() => {
    if (searchTerm) {
      highlightBlogs(searchTerm);
    } else {
      setHighlightedBlogs([]);
    }
  }, [searchTerm]);

  return (
    <div className="blog-list">
      {/* <h3>Blog Posts</h3> */}
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className={`blog-item ${highlightedBlogs.includes(blog.id) ? 'highlight' : ''} ${selectedBlog?.id === blog.id ? 'selected' : ''}`}
            onClick={() => setSelectedBlog(blog)}
          >
            {blog.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;