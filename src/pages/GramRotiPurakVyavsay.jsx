import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramRotiPurakVyavsay = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          रोटी पूरक व्यवसाय
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "रोटी पूरक व्यवसाय" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          या व्यवसायासाठी लागणारी माहिती, प्रशिक्षण, मार्गदर्शन, आणि सहभागाबाबत माहिती येथे दिली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramRotiPurakVyavsay;
