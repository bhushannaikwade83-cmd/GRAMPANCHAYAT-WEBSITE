// pages/SwachhGav.js
import React from "react";
import { Box, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";

function SwachhGav() {
  // Example images (replace with your actual images in /public/images/swachhGav folder)
  const images = [
    { src: "/images/swachhGav/clean1.jpg", caption: "स्वच्छ रस्ता" },
    { src: "/images/swachhGav/clean2.jpg", caption: "गावातील स्वच्छता मोहीम" },
    { src: "/images/swachhGav/clean3.jpg", caption: "शाळेतील स्वच्छता" },
  ];

  return (
    <Box sx={{ p: 3 }}>
      

      <Grid container spacing={3}>
        {images.map((img, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={img.src}
                alt={img.caption}
                sx={{ height: 220, objectFit: "cover" }}
              />
              <CardContent>
                <Typography align="center" variant="subtitle1">
                  {img.caption}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SwachhGav;
