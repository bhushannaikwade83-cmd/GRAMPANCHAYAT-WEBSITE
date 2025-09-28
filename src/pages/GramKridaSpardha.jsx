import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramKridaSpardha = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          क्रीडा स्पर्धा
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "क्रीडा स्पर्धा" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल.
          स्पर्धेतील विविध खेळ, नियम, व सहभागासाठी माहिती येथे दिली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramKridaSpardha;
