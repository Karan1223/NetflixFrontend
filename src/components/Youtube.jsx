import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId }) => {
  // Event handler for when the YouTube player is ready
  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  return (
    <YouTube
      videoId={videoId}
      opts={{
        playerVars: {
          autoplay: 1,
          controls: 1,
          loop: 1,
          mute: 1,
        },
      }}
      onReady={onPlayerReady}
    />
  );
};

export default YouTubeVideo;
