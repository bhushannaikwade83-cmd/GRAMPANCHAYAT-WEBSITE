import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const phoneNumbers = [
  "ग्रामपंचायत कार्यालय - ०२३४५-२२५५५५",
  "ग्रामसेवक - ९८७६५४३२१०",
  "सर्पंच - ९९९९९९९९९९",
  "आरोग्य केंद्र - ०२३४५-२२२२२२",
];

const GramDhurdhvani = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: "80vh" }}>
    

      {/* ध्वनिवाणी क्रमांक Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        ध्वनिवाणी क्रमांक
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          {phoneNumbers.map((num, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontSize: 18 }}>
                    {index + 1}. {num}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default GramDhurdhvani;
