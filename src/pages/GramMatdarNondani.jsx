import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramMatdarNondani = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          मतदार नोंदणी
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "मतदार नोंदणी" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          मतदार नोंदणी प्रक्रियेत आवश्यक कागदपत्रे, पात्रता, आणि प्रक्रियेची माहिती येथे दिली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramMatdarNondani;
