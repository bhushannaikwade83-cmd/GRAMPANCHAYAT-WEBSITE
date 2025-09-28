import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const GramRajyaSarkarYojna = () => {
  return (
    <Box component="section" sx={{ py: 4, backgroundColor: '#f9f9f9' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom align="center">
          केंद्र सरकार योजना
        </Typography>

        {/* Image */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <img
            src="/images/kendra-yojna.jpg" // replace with your image path
            alt="केंद्र सरकार योजना"
            style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
          />
        </Box>

        <Typography variant="body1" paragraph sx={{ textAlign: 'justify', fontSize: '16px', lineHeight: 1.6 }}>
          येथे "केंद्र सरकार योजना" या उपक्रमाची सविस्तर माहिती दर्शविली जाईल. 
          या योजनेंतर्गत केंद्र सरकारद्वारे ग्रामस्थांसाठी उपलब्ध विविध लाभ, योजना, आणि मार्गदर्शनाची माहिती येथे समाविष्ट केली जाईल.
        </Typography>
      </Container>
    </Box>
  );
};

export default GramRajyaSarkarYojna;
