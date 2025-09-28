import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramSarvaShikshaAbhiyan = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          सर्व शिक्षा अभियान
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "सर्व शिक्षा अभियान" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल.
          या उपक्रमामध्ये शाळा, शिक्षक, आणि विद्यार्थी यांच्यासाठी विविध उपक्रम आणि योजना समाविष्ट असतील.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramSarvaShikshaAbhiyan;
