import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const hospitalInfo = [
  "ग्राम आरोग्य केंद्र - वेळ: सकाळी ९ ते दुपारी २",
  "प्राथमिक आरोग्य उपकेंद्र - वेळ: सकाळी १० ते दुपारी १",
  "आपत्कालीन सेवा - २४x७ उपलब्ध",
  "लसीकरण केंद्र - आठवड्यातून दोनदा",
];

const GramRugnalay = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: "80vh" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        निर्देशिका
      </Typography>

      {/* रुग्णालय Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        ग्राम रुग्णालय
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          {hospitalInfo.map((info, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontSize: 18 }}>
                    {index + 1}. {info}
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

export default GramRugnalay;
