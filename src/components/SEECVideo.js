import React from 'react';
import ReactPlayer from 'react-player';
import { motion } from 'framer-motion';

const SEECVideo = ({ prefersDarkScheme }) => {
  const sectionStyle = {
    backgroundColor: prefersDarkScheme ? '#1e1e1e' : '#f4f8fc',
    borderRadius: '16px',
    padding: '30px',
    margin: '30px auto',
    maxWidth: '900px',
    boxShadow: prefersDarkScheme
      ? '0 10px 25px rgba(255,255,255,0.1)'
      : '0 10px 25px rgba(0,0,0,0.1)',
  };

  const titleStyle = {
    color: '#ff6600',
    fontSize: '26px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const videoWrapperStyle = {
    position: 'relative',
    width: '100%',
    paddingTop: '56.25%',
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: '#000',
  };

  return (
    <motion.div
      style={sectionStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 style={titleStyle}>SEEC Guide</h3>

      <div style={videoWrapperStyle}>
        <ReactPlayer
          src="https://www.youtube.com/watch?v=FGzXwjHRfhs"
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          controls
        />
      </div>
    </motion.div>
  );
};

export default SEECVideo;
