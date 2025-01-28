import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styling.css'; // Assuming you create this CSS file for styling

const BlogList = ({ blogs, setSelectedBlog, selectedBlog, searchTerm }) => {
  const [highlightedBlogs, setHighlightedBlogs] = useState([]);

  const highlightBlogs = useCallback((term) => {
    const matchedBlogs = blogs.filter((blog) =>
      blog.paragraphs.some((paragraph) => paragraph.toLowerCase().includes(term.toLowerCase()))
    );
    setHighlightedBlogs(matchedBlogs.map((blog) => blog.id));
  }, [blogs]); // Add blogs to dependencies

  useEffect(() => {
    if (searchTerm) {
      highlightBlogs(searchTerm);
    } else {
      setHighlightedBlogs([]);
    }
  }, [searchTerm, highlightBlogs]); // Use highlightBlogs in dependencies

  // Function to safely parse the blog title to be URL-friendly
  const getBlogTitleSlug = (title) => {
    return encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <div className="blog-list">
      <ul>
        {blogs.map((blog) => (
          <li
            key={blog.id}
            className={`blog-item ${highlightedBlogs.includes(blog.id) ? 'highlight' : ''} ${selectedBlog?.id === blog.id ? 'selected' : ''}`}
          >
            <Link
              to={`/blog/${getBlogTitleSlug(blog.title)}`}
              onClick={() => setSelectedBlog(blog)}
              className='blog-item-link'
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
