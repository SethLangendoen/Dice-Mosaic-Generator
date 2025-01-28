import React, { useState, useEffect } from 'react';
import './styling.css';
import VideoPixelated from './VideoPixelated'; // Import the VideoPixelated component

const VideoUploader = ({videoProgress, currentStep, videoDuration, frames, diceX, diceY,contrast, selectedVideo, radio, trim, brightness, handleDiceSizeChange, diceSize }) => {
  const [numPixelsX, setNumPixelsX] = useState(50); // Default value, can be updated using props
  const [numPixelsY, setNumPixelsY] = useState(50); // Default value, can be updated using props

  useEffect(() => {
    if (diceX && diceY) { 
      setNumPixelsX(diceX);
      setNumPixelsY(diceY);
    }
  }, [diceX, diceY]);

  // useEffect(() => {
  //   if (selectedVideo) {
  //     const videoElement = document.createElement('video');
  //     videoElement.src = URL.createObjectURL(selectedVideo);
  //     videoElement.crossOrigin = "Anonymous";

  //     // Wait for metadata to load
  //     videoElement.onloadedmetadata = () => {
  //       const canvas = document.createElement('canvas');
  //       const ctx = canvas.getContext('2d', { willReadFrequently: true });

  //       const interval = 100; // ms between frame captures
  //       let frameIndex = 0; // Track frame count

  //       const captureFrame = () => {
  //         if (videoElement.paused || videoElement.ended) return;

  //         canvas.width = videoElement.videoWidth;
  //         canvas.height = videoElement.videoHeight;
  //         ctx.drawImage(videoElement, 0, 0, videoElement.videoWidth, videoElement.videoHeight);

  //         const frameDataURL = canvas.toDataURL();
  //         setFrames(prevFrames => [...prevFrames, frameDataURL]);
  //         frameIndex += 1;

  //         // Schedule next frame capture
  //         setTimeout(captureFrame, interval);
  //       };

  //       // Start capturing frames once the video starts playing
  //       videoElement.play().then(() => captureFrame());
  //     };
  //   }
  // }, [selectedVideo]);

  return (

    
    <div className="container">
      {currentStep === 1 && (
      <div>
      {console.log('This is the frame length ' + frames.length)}

      {frames !== [] && numPixelsX && numPixelsY && frames.length > 0 && (
        <div className="video-container">
          <VideoPixelated
            frames={frames}
            numPixelsX={numPixelsX}
            numPixelsY={numPixelsY}
            radio={radio}
            brightness={brightness}
            trim={trim}
            handleDiceSizeChange={handleDiceSizeChange}
            diceSize={diceSize}
            diceX={diceX}
            diceY={diceY}
            contrast={contrast}
            videoDuration={videoDuration}
            videoProgress={videoProgress}
          />
        </div>
      )}
      { videoProgress > 1 && (
        <div>
          <p>Loading Video: {((videoProgress / videoDuration)*100).toFixed(2)}%</p>

          <p>Version: Beta 1.0</p>
          <p>Tips: </p>
          <ul>
            <li>Shorter videos render faster.</li>
            <li>Smaller dice count improves quality </li>

          </ul>
        </div>
      )}
      </div>
      )}
    </div>
  );
};

export default VideoUploader;
