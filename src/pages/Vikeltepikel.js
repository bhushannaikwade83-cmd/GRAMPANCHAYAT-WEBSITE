import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Vikeltepikel = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom align="center">
          विकल्पीकल्प
        </Typography>
        <Typography variant="body1" paragraph>
          येथे विकल्पीकल्प माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default Vikeltepikel;