import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramArogyaShibir = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          आरोग्य शिबिर
        </Typography>
        <Typography variant="body1" paragraph>
          येथे "आरोग्य शिबिर" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramArogyaShibir;
