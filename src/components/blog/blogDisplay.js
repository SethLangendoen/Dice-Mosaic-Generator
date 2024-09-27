import React from 'react';
import '../styling.css'; // Assuming you create this CSS file for styling

const BlogDisplay = ({ blog, searchTerm }) => {
  if (!blog) {
    return <div className="blog-placeholder">Select a blog to display</div>;
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
	  {/* <img src = {diceSizes}></img> */}
      {blog.paragraphs.map((paragraph, index) => (
        <p key={index} className="blog-paragraph">
          {parseParagraphs(paragraph)}
        </p>
      ))}
    </div>
  );
};

export default BlogDisplay;
