import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BlogList from './blogList';
import BlogDisplay from './blogDisplay';
import blogData from './blogs.json';
import '../styling.css'; // Assuming you create this CSS file for styling

const BlogComponent = () => {
  const { title } = useParams(); // Get the blog title from the URL
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setBlogs(blogData);
    
    // Compare URL title with blog title
    const normalizedTitle = title.replace(/-/g, ' ').toLowerCase();  // Replace '-' with spaces for comparison

    // Debugging to ensure titles match correctly
    console.log('URL Title:', title);
    console.log('Normalized Title:', normalizedTitle);

    // Find the blog with the normalized title
    const initialBlog = blogData.find(blog =>
      blog.title.toLowerCase() === normalizedTitle
    );

    if (initialBlog) {
      setSelectedBlog(initialBlog);
    } else {
      console.log('Blog not found:', normalizedTitle);
    }
  }, [title]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div id="blog" className="blog-container slide-in">
      <div className="blog-content">
        <div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <BlogList 
            blogs={blogs} 
            setSelectedBlog={setSelectedBlog} 
            selectedBlog={selectedBlog} 
            searchTerm={searchTerm} 
          />
        </div>
        <BlogDisplay blog={selectedBlog} />
      </div>
    </div>
  );
};

export default BlogComponent;
