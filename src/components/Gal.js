import React from "react";
import './css/gal.css'; // Make sure this CSS doesn't conflict with motion styles
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import m1 from '../images/mh1.jpg';
import m2 from '../images/mh2.jpg';
import m3 from '../images/mh3.jpg';
import ProductFeaturesD from "./ProductFeaturesD";
import { Link } from 'react-router-dom';

// Import framer-motion and react-intersection-observer
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Gal() {
  // Hook for the main section visibility
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.1,    // Trigger when 10% of the element is visible
  });

  // Animation variants for the image container (to stagger children)
  const imageContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animation of each card by 0.2s
      },
    },
  };

  // Animation variants for individual image cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Fade in and slide up
  };

  // Animation variants for individual text sections with significantly increased stagger time
  const textSectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8, // Increased from 0.3 to 0.8 for more distinct sequential appearance
        delayChildren: 0.7,   // Increased delay after images appear
      },
    },
  };

  // Animation variants for each text section - more pronounced movement
  const textItemVariants = {
    hidden: { opacity: 0, y: 40, x: -30 }, // Start invisible, down and to the left
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut"
      } 
    },
  };

  return (
    <motion.div
      className="gal-wrapper"
      ref={sectionRef}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
    >
      {/* Images container */}
      <motion.div
        className="container"
        variants={imageContainerVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        <motion.div className="card" variants={cardVariants}>
          <img src={m1} alt="1" />
        </motion.div>
        <motion.div className="card" variants={cardVariants}>
          <img src={m3} alt="2" />
        </motion.div>
        <motion.div className="card" variants={cardVariants}>
          <img src={m2} alt="3" />
        </motion.div>
      </motion.div>

      {/* Text section container */}
      <motion.div
        className="text-section"
        variants={textSectionVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
      >
        {/* Each text element is wrapped in its own motion.div for individual animation */}
        <motion.div variants={textItemVariants} className="text-item">
          <h1 style={{ fontSize: '3rem' }}>Čime se bavimo</h1>
        </motion.div>

        {/* ProductFeaturesD component wrapped in its own motion.div */}
        <motion.div variants={textItemVariants} className="text-item">
          <ProductFeaturesD />
        </motion.div>

        {/* Button wrapped in its own motion.div */}
        <motion.div id="about" variants={textItemVariants} className="text-item">
          <Button
            component={Link}
             to="/galerija"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: '5px',
              background: '#74653f',
              opacity: '90%',
              marginLeft: '20px',
              fontSize: { xs: '0.875rem', sm: '1rem', md: '1.2rem' },
              padding: { xs: '6px 16px', sm: '8px 20px', md: '10px 24px' },
              marginTop: { xs: '0', sm: '0', md: '3rem' },
              transition: 'background-color 0.6s ease',
              '&:hover': {
                backgroundColor: '#0f0c06',
              }
            }}
          >
            Galerija
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}