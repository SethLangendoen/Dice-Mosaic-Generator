import React, { useState, useEffect } from 'react';
import BlogList from './blogList';
import BlogDisplay from './blogDisplay';
import blogData from './blogs.json';
import '../styling.css';  // Assuming you create this CSS file for styling

const BlogComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setBlogs(blogData);
    // Set the initial selected blog to the one with ID 1
    const initialBlog = blogData.find(blog => blog.id === 1);
    setSelectedBlog(initialBlog);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div id = 'blog' className="blog-container">

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
				selectedBlog={selectedBlog} // Pass the selectedBlog here
				searchTerm={searchTerm} 
			/>

	  	</div>
        <BlogDisplay blog={selectedBlog} />
      </div>

    </div>
  );
};

export default BlogComponent;
