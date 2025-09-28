import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramJalyuktShivar = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          जलयुक्त शिवार
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "जलयुक्त शिवार" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          शिवार जलसंधारण, पाणी व्यवस्थापन, आणि सहभागी शेतकऱ्यांसाठी उपयुक्त माहिती येथे समाविष्ट केली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramJalyuktShivar;
