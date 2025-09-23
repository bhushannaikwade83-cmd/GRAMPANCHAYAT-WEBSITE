
import React from "react";
import { Box, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";


const touristPlaces = [
  {
    name: "शिवाजी उद्यान",
    description: "A beautiful park in the heart of the village.",
    image: "https://placehold.co/300x200?text=Shivaji+Udyan",
  },
  {
    name: "गणेश मंदिर",
    description: "Historic Ganesh temple visited by locals and tourists.",
    image: "https://placehold.co/300x200?text=Ganesh+Mandir",
  },
  {
    name: "नदी किनारा",
    description: "Peaceful riverside spot perfect for picnics and relaxation.",
    image: "https://placehold.co/300x200?text=Nadi+Kinara",
  },
];

const Gramparyatansthale = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: "80vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        पर्यटन स्थळे
      </Typography>

      <Grid container spacing={3}>
        {touristPlaces.map((place, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image={place.image}
                alt={place.name}
              />
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {place.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {place.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Gramparyatansthale;
