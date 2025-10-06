import React from 'react';
import { Box, Typography } from '@mui/material';

const ManageHomeWelcome = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        वेलकम सेक्शन संपादन
      </Typography>
      <Typography variant="body1">
        येथे वेलकम सेक्शनची सामग्री संपादित करा.
      </Typography>
    </Box>
  );
};

export default ManageHomeWelcome;



