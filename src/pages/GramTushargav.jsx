import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramTushargav = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          तुषारगावड
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "तुषारगावड" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          या उपक्रमातील प्रमुख कार्यक्रम, सहभाग, आणि उपयुक्त माहिती येथे समाविष्ट केली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramTushargav;
