import React from "react";
import { Box, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const janganaPoints = [
  "गावातील एकूण लोकसंख्या मोजणे",
  "प्रत्येक कुटुंबाची माहिती नोंदविणे",
  "शिक्षण, व्यवसाय, शेती यांची माहिती गोळा करणे",
  "गावातील सुविधा व गरजा ओळखणे",
];

const Gramjanganna = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, minHeight: "80vh" }}>
     

      {/* जनगणना Section */}
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        जनगणना
      </Typography>

      <Paper sx={{ p: 3 }}>
        <List>
          {janganaPoints.map((point, index) => (
            <ListItem key={index} sx={{ mb: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontSize: 18 }}>
                    {index + 1}. {point}
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

export default Gramjanganna;
