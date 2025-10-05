import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Paper } from "@mui/material";
import Layout from "../components/Layout";

// Firebase imports
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const GrampanchayatMahiti = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch details and photo from the 'mainInfo' document
        const mainInfoDocRef = doc(db, 'grampanchayat', 'mainInfo');
        const mainInfoSnap = await getDoc(mainInfoDocRef);
        const mainInfoData = mainInfoSnap.exists()
          ? mainInfoSnap.data()
          : { details: "माहिती उपलब्ध नाही. कृपया Admin Panel मधून माहिती अपडेट करा.", photo: "" };

        // Fetch the title from the 'profile' document
        const profileDocRef = doc(db, 'grampanchayat', 'profile');
        const profileSnap = await getDoc(profileDocRef);
        const profileData = profileSnap.exists()
          ? profileSnap.data()
          : { title: "ग्रामपंचायत" };

        // Combine data from both documents into a single state object
        setInfo({
          title: profileData.title,
          details: mainInfoData.details,
          photo: mainInfoData.photo,
        });

      } catch (error) {
        console.error("Error fetching Gram Panchayat data: ", error);
        setInfo({
          title: "माहिती लोड करण्यात अयशस्वी",
          details: "कृपया आपले इंटरनेट कनेक्शन तपासा आणि पेज रिफ्रेश करा.",
          photo: "https://placehold.co/600x400/ff0000/ffffff?text=Error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>माहिती लोड होत आहे...</Typography>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, overflow: 'hidden' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Image */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={info.photo || "https://placehold.co/600x400/cccccc/ffffff?text=Photo+Not+Available"}
              alt={info.title}
              sx={{ 
                width: "100%", 
                height: "auto",
                maxHeight: 400,
                objectFit: 'cover',
                borderRadius: 2, 
                boxShadow: 3 
              }}
            />
          </Grid>

          {/* Right Side - Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {info.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {info.details}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default GrampanchayatMahiti;