import React from 'react';

const Video = () => {
  return (
    <video autoPlay loop>
      <source src="/videos/To_my.mp4" type="video/mp4" />
      <strong>Your browser does not support the video tag.</strong>
    </video>
  );
};

export default Video;
