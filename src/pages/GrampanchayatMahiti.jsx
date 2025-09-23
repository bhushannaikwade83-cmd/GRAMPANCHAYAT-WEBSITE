import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Layout from "../components/Layout";

const GrampanchayatMahiti = () => {
  return (
    <Layout>
      <Grid container spacing={4} alignItems="flex-start">
        {/* Left Side - Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://placehold.co/600x400/2196f3/ffffff?text=Grampanchayat+Photo"
            alt="Grampanchayat"
            sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
          />
        </Grid>

        {/* Right Side - Info */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            ग्रामपंचायत माहिती
          </Typography>
          <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
            येथे आपल्या ग्रामपंचायतीची संपूर्ण माहिती दाखवली जाईल.  
            उदाहरणार्थ : स्थापनेची तारीख, लोकसंख्या, क्षेत्रफळ, 
            प्रमुख कामे, सुविधा, सामाजिक उपक्रम इत्यादी.  
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default GrampanchayatMahiti;
