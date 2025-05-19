// src/Gallery.js
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const deleteImage = async (imageId) => {
    try {
      await axios.delete(`http://localhost:5000/api/images/${imageId}`);
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div style={{backgroundColor: '#cbcbcb'}}>
    <Box sx={{ p: 4, pt: '200px' }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: "center" }}>
        Galerija Uskoro
      </Typography>
      <Grid container spacing={2}>
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card sx={{ maxWidth: "100%", position: "relative" }}>
              <CardMedia
                component="img"
                height="200"
                image={image.url}
                alt={image.title}
                sx={{ objectFit: "cover" }}
              />
              <Button
                onClick={() => deleteImage(image.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 0, 0, 0.7)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 0, 0, 0.9)",
                  },
                }}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
    </div>
  );
};

export default Gallery;
