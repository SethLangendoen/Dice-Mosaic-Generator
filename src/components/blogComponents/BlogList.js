// src/components/BlogList.js
import React from 'react';
import BlogCard from './BlogCard';
import blogPosts from './data/blogPosts.json';

export default function BlogList({ onPostClick }) {
	return (
	  <div style={styles.container}>
		{blogPosts.map((post) => (
		  <BlogCard 
			key={post.id} 
			post={post} 
			onReadMore={onPostClick} 
		  />
		))}
	  </div>
	);
  }
  
  const styles = {
	container: {
	  display: 'flex',
	  flexDirection: 'column',
	  gap: '20px',
	  padding: '20px',
	},
  };