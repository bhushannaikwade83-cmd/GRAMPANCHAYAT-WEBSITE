import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramGavadoli = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          गावदोली
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "गावदोली" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          गावदोलीची पारंपारिक प्रक्रिया, सहभाग, आणि इतर माहिती येथे समाविष्ट केली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramGavadoli;
