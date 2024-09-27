// src/components/BlogPostDetail.js
import React from 'react';

export default function BlogPostDetail({ post, onBackClick }) {
  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={onBackClick}>Back</button>
      <h1 style={styles.title}>{post.title}</h1>
      <p style={styles.date}>{post.date} | By {post.author}</p>
      <p style={styles.content}>{post.content}</p>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    transition: 'opacity 0.5s ease-in-out',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  title: {
    fontSize: '36px',
    margin: '0 0 10px 0',
  },
  date: {
    fontSize: '14px',
    color: '#888',
    marginBottom: '20px',
  },
  content: {
    fontSize: '18px',
  },
};
