import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Paper } from "@mui/material";
import Layout from "../components/Layout";

// Firebase imports
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const GrampanchayatMahiti = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'grampanchayat', 'profile');
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          console.log("No such document!");
          // Set default data if no profile is found in DB
          setProfile({
            title: "ग्रामपंचायत माहिती उपलब्ध नाही",
            details: "कृपया Admin Panel मधून माहिती अपडेट करा.",
            photo: "https://placehold.co/600x400/ff0000/ffffff?text=Error",
          });
        }
      } catch (error) {
        console.error("Error fetching profile: ", error);
        // Set error state data
        setProfile({
            title: "माहिती लोड करण्यात अयशस्वी",
            details: "कृपया आपले इंटरनेट कनेक्शन तपासा.",
            photo: "https://placehold.co/600x400/ff0000/ffffff?text=Error",
          });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
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
              src={profile.photo || "https://placehold.co/600x400/cccccc/ffffff?text=Photo+Not+Available"}
              alt={profile.title}
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
              {profile.title}
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, whiteSpace: 'pre-line' }}>
              {profile.details}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default GrampanchayatMahiti;