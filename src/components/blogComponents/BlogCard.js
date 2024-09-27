// src/components/BlogCard.js
import { visitWithTypeInfo } from 'graphql';
import React from 'react';

export default function BlogCard({ post, onReadMore }) {
  return (
    <div style={styles.card}>
      <img src={post.image} alt={post.title} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{post.title}</h2>
        <p style={styles.date}>{post.date} | By {post.author}</p>
        <p style={styles.excerpt}>{post.content.slice(0, 100)}...</p>
        <button 
          style={styles.button} 
          onClick={() => onReadMore(post)}
        >
          Read More
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'row',
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	color: "white",
	width: "100%",

  },
  image: {
    width: '200px',
    height: 'auto',
    objectFit: 'cover',
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
	width: '100%',
  },
  title: {
    fontSize: '24px',
    margin: '0 0 10px 0',
  },
  date: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '10px',
  },
  excerpt: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  button: {
    alignSelf: 'flex-start',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};
