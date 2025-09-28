import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramKachraNivaran = () => {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          कचऱ्याचे नियोजन
        </Typography>
        <Typography variant="body1" paragraph>
          येथे "कचऱ्याचे नियोजन" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramKachraNivaran;
