import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const helplineNumbers = [
  "महिला हेल्पलाईन - १०९१",
  "बाल संरक्षण हेल्पलाईन - १०९८",
  "आपत्कालीन वैद्यकीय मदत - १०८",
  "पोलीस हेल्पलाईन - १००",
];

const GramHelpline = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: "80vh" }}>

      {/* हेल्पलाईन Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        ग्राम हेल्पलाईन
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          {helplineNumbers.map((num, index) => (
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

export default GramHelpline;
