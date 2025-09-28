import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramTantamuktGav = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          तंटामुक्त गाव
        </Typography>
        <Typography variant="body1" paragraph>
          येथे "तंटामुक्त गाव" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramTantamuktGav;
