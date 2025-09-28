import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramBiogasNirmiti = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          बायोगॅस निर्मिती
        </Typography>
        <Typography variant="body1" paragraph>
          येथे बायोगॅस निर्मितीबाबत माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramBiogasNirmiti;
