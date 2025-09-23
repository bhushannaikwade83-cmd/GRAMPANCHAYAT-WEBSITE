import React from "react";
import Slider from "react-slick";
import {
  Box,
  Paper,
  Typography,
  Container,
  Link,
  Grid,
  List,
  ListItem,
} from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Slider settings type removed for JS file

const GrampanchayatInfo = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
  };

  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ];

  return (
    <>
      {/* First Section - Pink Background */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "rgba(250, 0, 87, 1)",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* Column 1 - ग्रामपंचायत */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  दृष्टीक्षेपात ग्रामपंचायत
                </Typography>
                <List dense>
                  <ListItem disablePadding>क्षेत्र: ____ sq km</ListItem>
                  <ListItem disablePadding>लोकसंख्या: ______</ListItem>
                  <ListItem disablePadding>साक्षरतेचे प्रमाण: __</ListItem>
                  <ListItem disablePadding>शाळा: ______</ListItem>
                  <ListItem disablePadding>बँक: ______</ListItem>
                  <ListItem disablePadding>रुग्णालये: ______</ListItem>
                  <ListItem disablePadding>स्वच्छतागृहे: ______</ListItem>
                  <ListItem disablePadding>पोस्ट ऑफिस: ______</ListItem>
                </List>
              </Paper>
            </Grid>

            {/* Column 2 - बँक तपशील */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ग्रामपंचायत बँक तपशील
                </Typography>
                <List dense>
                  <ListItem disablePadding>बँकेचे नाव: ______</ListItem>
                  <ListItem disablePadding>
                    बँक खाते क्रमांक: ______
                  </ListItem>
                  <ListItem disablePadding>IFSC कोड: ______</ListItem>
                  <ListItem disablePadding>बँकेचा पत्ता: ______</ListItem>
                </List>
                <Typography mt={2} fontWeight="bold">
                  जिल्ह्याचे संकेतस्थळ
                </Typography>
              </Paper>
            </Grid>

            {/* Column 3 - ई-सेवा */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  ई-सेवा
                </Typography>
                <List dense>
                  {["पुरवठा", "न्यायालयीन", "महसूल", "देयक", "प्रमाणपत्रे"].map(
                    (item, index) => (
                      <ListItem key={index} disablePadding>
                        <Link
                          href="https://aaplesarkar.maharashtra.gov.in/en/"
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{ color: "white", textDecoration: "none" }}
                        >
                          {item}
                        </Link>
                      </ListItem>
                    )
                  )}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Second Section - Blue Background */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "rgba(30, 129, 175, 1)",
          color: "white",
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* आठवडे बाजार */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  आठवडे बाजार
                </Typography>
                <Typography>वार | पत्ता</Typography>
              </Paper>
            </Grid>

            {/* पर्यटन स्थळे */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  पर्यटन स्थळे
                </Typography>
                <List dense>
                  <ListItem disablePadding>१</ListItem>
                  <ListItem disablePadding>२</ListItem>
                  <ListItem disablePadding>३</ListItem>
                  <ListItem disablePadding>४</ListItem>
                </List>
              </Paper>
            </Grid>

            {/* कसे पोहोचाल ? */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  कसे पोहोचाल ?
                </Typography>
                <List dense>
                  <ListItem disablePadding>१) रस्त्याद्वारे</ListItem>
                  <ListItem disablePadding>२) रेल्वेने</ListItem>
                  <ListItem disablePadding>३) हवाई मार्ग</ListItem>
                </List>
              </Paper>
            </Grid>

            {/* निरोगी आरोग्य सवयी */}
            <Grid item xs={12} md={3}>
              <Paper
                sx={{
                  p: 2,
                  bgcolor: "rgba(255,255,255,0.05)",
                  color: "white",
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  निरोगी आरोग्य सवयी
                </Typography>
                <List dense>
                  <ListItem disablePadding>१</ListItem>
                  <ListItem disablePadding>२</ListItem>
                  <ListItem disablePadding>३</ListItem>
                  <ListItem disablePadding>४</ListItem>
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Gallery + Map Section - Below Blue */}
      <Box sx={{ width: "100%", bgcolor: "#f9f9f9", py: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {/* Slider */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  textAlign="center"
                >
                  छायाचित्र दालन
                </Typography>
                <Slider {...sliderSettings}>
                  {images.map((img, index) => (
                    <Box key={index} sx={{ height: 300 }}>
                      <img
                        src={img}
                        alt={`Kapadsingi view ${index + 1}`}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 8,
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              </Paper>
            </Grid>

            {/* Map */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2, borderRadius: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  textAlign="center"
                >
                  नकाशा
                </Typography>
                <Box sx={{ width: "100%", height: 300 }}>
                  <iframe
                    title="Kapadsingi Map"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: 8 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54341.629057809354!2d76.61788526233583!3d19.83610522179175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd08819f1637b71%3A0x6bf6293dc668def3!2sKapadsingi%2C%20Maharashtra%20431542!5e0!3m2!1sen!2sin!4v1757271708585!5m2!1sen!2sin"
                  ></iframe>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default GrampanchayatInfo;
