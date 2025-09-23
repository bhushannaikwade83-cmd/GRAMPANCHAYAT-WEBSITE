import React from "react";
import Layout from "../components/Layout";
import { Typography } from "@mui/material";

const GramsabhaNirnay = () => {
  return (
    <Layout>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        ग्रामसभा निर्णय
      </Typography>
      <Typography variant="body1">
        येथे आपल्या ग्रामसभेच्या निर्णयांची संपूर्ण माहिती दाखवली जाईल.
      </Typography>
    </Layout>
  );
};

export default GramsabhaNirnay; // ✅ default export
