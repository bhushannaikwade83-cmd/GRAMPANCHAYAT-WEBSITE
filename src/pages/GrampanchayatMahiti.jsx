import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress, Paper, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import Layout from "../components/Layout";
// Firebase imports
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const GrampanchayatMahiti = () => {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto slideshow effect
  useEffect(() => {
    if (info?.photos && info.photos.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % info.photos.length);
      }, 4000); // Change slide every 4 seconds
      
      return () => clearInterval(interval);
    }
  }, [info?.photos]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch details and photos from the 'mainInfo' document
        const mainInfoDocRef = doc(db, 'grampanchayat', 'mainInfo');
        const mainInfoSnap = await getDoc(mainInfoDocRef);
        
        let mainInfoData;
        if (mainInfoSnap.exists()) {
          const data = mainInfoSnap.data();
          
          // Handle backward compatibility - convert old 'photo' to 'photos' array
          if (data.photo && !data.photos) {
            mainInfoData = {
              details: data.details || "माहिती उपलब्ध नाही. कृपया Admin Panel मधून माहिती अपडेट करा.",
              photos: [{ url: data.photo, name: "Photo 1" }]
            };
          } else {
            mainInfoData = {
              details: data.details || "माहिती उपलब्ध नाही. कृपया Admin Panel मधून माहिती अपडेट करा.",
              photos: data.photos || []
            };
          }
        } else {
          mainInfoData = {
            details: "माहिती उपलब्ध नाही. कृपया Admin Panel मधून माहिती अपडेट करा.",
            photos: []
          };
        }

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
          photos: mainInfoData.photos,
        });
      } catch (error) {
        console.error("Error fetching Gram Panchayat data: ", error);
        setInfo({
          title: "माहिती लोड करण्यात अयशस्वी",
          details: "कृपया आपले इंटरनेट कनेक्शन तपासा आणि पेज रिफ्रेश करा.",
          photos: [{ url: "https://placehold.co/600x400/ff0000/ffffff?text=Error", name: "Error" }],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const nextSlide = () => {
    if (info?.photos && info.photos.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % info.photos.length);
    }
  };

  const prevSlide = () => {
    if (info?.photos && info.photos.length > 0) {
      setCurrentSlide((prev) => (prev - 1 + info.photos.length) % info.photos.length);
    }
  };

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

  const hasPhotos = info?.photos && info.photos.length > 0;
  const currentPhoto = hasPhotos ? info.photos[currentSlide] : null;

  return (
    <Layout>
      <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, overflow: 'hidden' }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Slideshow */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', height: { xs: 300, md: 400 } }}>
              {hasPhotos ? (
                <>
                  <Box
                    component="img"
                    src={currentPhoto.url}
                    alt={currentPhoto.name}
                    sx={{ 
                      width: "100%", 
                      height: "100%",
                      objectFit: 'cover',
                      borderRadius: 2, 
                      boxShadow: 3 
                    }}
                  />

                  {/* Photo Name Overlay */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                      color: 'white',
                      p: 2,
                      borderRadius: '0 0 8px 8px',
                    }}
                  >
                    <Typography variant="h6" sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                      {currentPhoto.name}
                    </Typography>
                    <Typography variant="caption">
                      {currentSlide + 1} / {info.photos.length}
                    </Typography>
                  </Box>

                  {/* Navigation Arrows - Only show if more than 1 photo */}
                  {info.photos.length > 1 && (
                    <>
                      <IconButton
                        onClick={prevSlide}
                        sx={{
                          position: 'absolute',
                          left: 10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' },
                          boxShadow: 2,
                        }}
                      >
                        <ChevronLeft />
                      </IconButton>
                      <IconButton
                        onClick={nextSlide}
                        sx={{
                          position: 'absolute',
                          right: 10,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          bgcolor: 'rgba(255,255,255,0.9)',
                          '&:hover': { bgcolor: 'white' },
                          boxShadow: 2,
                        }}
                      >
                        <ChevronRight />
                      </IconButton>
                    </>
                  )}

                  {/* Slide Indicators - Only show if more than 1 photo */}
                  {info.photos.length > 1 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 70,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 1,
                        zIndex: 1,
                      }}
                    >
                      {info.photos.map((_, index) => (
                        <Box
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            boxShadow: currentSlide === index ? 2 : 0,
                            '&:hover': {
                              bgcolor: 'white',
                              transform: 'scale(1.2)',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </>
              ) : (
                <Box
                  component="img"
                  src="https://placehold.co/600x400/cccccc/ffffff?text=Photo+Not+Available"
                  alt="No photo available"
                  sx={{ 
                    width: "100%", 
                    height: "100%",
                    objectFit: 'cover',
                    borderRadius: 2, 
                    boxShadow: 3 
                  }}
                />
              )}
            </Box>
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
