import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogData from './blogs.json';
import '../styling.css'; // Assuming you create this CSS file for styling

const BlogDisplay = () => {
  const { title } = useParams(); // Get the blog title from the URL
  const [blog, setBlog] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
  var searchTerm = ''; 

  useEffect(() => {
    // Normalize the title to match the format in the blogData
    const normalizedTitle = title.replace(/-/g, ' ').toLowerCase();  // Replace '-' with spaces

    // Find blog by title (slug format, lowercased and spaces replaced with hyphens)
    const selectedBlog = blogData.find(blog =>
      blog.title.toLowerCase() === normalizedTitle
    );

    setBlog(selectedBlog);
  }, [title]); // Re-run effect when title changes

  if (!blog) {
    return <div className="blog-placeholder">Blog not found!</div>;
  }

  // Function to highlight matching keywords in text
  const highlightText = (text) => {
    if (!searchTerm) return text; // Return original text if no search term

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi')); // Split text by search term
    return parts.map((part, index) => (
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <span key={index} className="matchingBlogText">{part}</span>
        : part
    ));
  };

  // Function to parse the blog paragraphs with embedded elements
  const parseParagraphs = (text) => {
    const parts = text.split(/(\[\[image\s+'[^']+'\]\]|\[\[highlight\]\]|\[\[break\]\]|\[\[subtitle\]\]|\[\[open-paragraph\]\]|\[\[close-paragraph\]\])/);
    const parsedParts = [];
  
    let highlightActive = false;
    let isSubtitle = false;
    let isOpenParagraph = false;
  
    parts.forEach((part, index) => {
      // Handle image embedding
      const imageMatch = part.match(/\[\[image\s+'([^']+)'\]\]/);
      if (imageMatch) {
        const imagePath = imageMatch[1];
        console.log(imagePath); // Assuming image path is correct
  
        // Assuming imagePath points to an image inside the src directory, use import:
        try {
          const imageSrc = require(`${imagePath}`);
          parsedParts.push(<img key={index} src={imageSrc} alt="Blog related" className="blog-image" />);
        } catch (error) {
          console.error("Image not found:", imagePath, error);
          parsedParts.push(<span key={index} className="image-error">Image not found</span>);
        }
      } else if (part === '[[highlight]]') {
        highlightActive = !highlightActive; // Toggle highlight state
      } else if (part === '[[break]]') {
        parsedParts.push(<br key={index} />);
      } else if (part === '[[subtitle]]') {
        isSubtitle = !isSubtitle;
      } else if (part === '[[open-paragraph]]') {
        isOpenParagraph = true; // Start paragraph section
      } else if (part === '[[close-paragraph]]') {
        isOpenParagraph = false; // End paragraph section
      } else {
        const highlightedPart = highlightText(part);
        if (isSubtitle) {
          parsedParts.push(<h4 key={index} className="blog-subtitle">{highlightedPart}</h4>);
          isSubtitle = false;
        } else if (highlightActive) {
          parsedParts.push(<span key={index} className="paragraphTitle">{highlightedPart}</span>);
        } else if (isOpenParagraph) {
          parsedParts.push(
            <span key={index} className="open-paragraph-style">{highlightedPart}</span> // Apply custom styling for open paragraph
          );
        } else {
          parsedParts.push(highlightedPart);
        }
      }
    });
  
    return parsedParts;
  };

  return (
    <div className="blog-display">
      <h1 className="blog-title">{blog.title}</h1>
      <h3 className="blog-subtitle">{blog.subtitle}</h3>
      {blog.paragraphs.map((paragraph, index) => (
        <p key={index} className="blog-paragraph">
          {parseParagraphs(paragraph)}
        </p>
      ))}
    </div>
  );
};

export default BlogDisplay;
