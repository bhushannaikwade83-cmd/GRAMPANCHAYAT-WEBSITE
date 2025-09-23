import React from "react";
import { Grid, Typography, Box, Avatar, Paper } from "@mui/material";
import Layout from "../components/Layout";

// Example data (you can replace with API or JSON)
const members = [
  { name: "रामराव पाटील", designation: "सरपंच", photo: "https://placehold.co/100x100/2196f3/ffffff?text=R" },
  { name: "सुरेश शिंदे", designation: "उपसरपंच", photo: "https://placehold.co/100x100/ff6ec7/ffffff?text=S" },
  { name: "गीता पाटील", designation: "सदस्य", photo: "https://placehold.co/100x100/ffc107/ffffff?text=G" },
  // Add more members here
];

const GrampanchayatSadasya = () => {
  return (
    <Layout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ग्रामपंचायत सदस्य
      </Typography>
      <Typography variant="body1" gutterBottom>
        येथे आपल्या ग्रामपंचायतीचे सर्व सदस्य दर्शविले आहेत.
      </Typography>

      <Grid container spacing={3} mt={2}>
        {members.map((member, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper elevation={3} sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar src={member.photo} alt={member.name} sx={{ width: 60, height: 60 }} />
              <Box>
                <Typography variant="h6">{member.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.designation}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default GrampanchayatSadasya;
