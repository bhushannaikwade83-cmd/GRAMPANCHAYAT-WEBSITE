import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Grammajhikutumb = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          माझं कुटुंब, माझी जबाबदारी
        </Typography>
        <Typography variant="body1" paragraph>
          येथे "माझं कुटुंब, माझी जबाबदारी" या उपक्रमाची माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default Grammajhikutumb;
