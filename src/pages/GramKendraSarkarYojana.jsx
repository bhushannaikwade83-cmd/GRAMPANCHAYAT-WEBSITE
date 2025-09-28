import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramKendraSarkarYojana = () => {
  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          केंद्र सरकार योजना
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
          येथे "केंद्र सरकार योजना" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          या योजनेंतर्गत केंद्र सरकारद्वारे ग्रामस्थांसाठी उपलब्ध विविध लाभ, योजना, आणि सहभागी मार्गदर्शनाची माहिती येथे समाविष्ट केली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramKendraSarkarYojana;
