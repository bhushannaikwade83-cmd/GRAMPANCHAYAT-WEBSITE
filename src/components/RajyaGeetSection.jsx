import React from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";

const RajyaGeetSection = () => {
  return (
    <div style={{ padding: "40px 20px" }}>
      {/* Heading */}
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          textAlign: { xs: "center", md: "left" }, // center on mobile, left on desktop
          mb: 4
        }}
      >
        राज्य गीत
      </Typography>

      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Left side - YouTube video */}
        <Grid item xs={12} md={6}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <iframe
              width="100%"
              height={isMobile ? "200" : "315"} // optional, can be dynamic
              src="https://www.youtube.com/embed/zs-AYr99354"
              title="Rajya Geet"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </Grid>

        {/* Right side - Quote */}
        <Grid item xs={12} md={6}>
          <Card elevation={4} sx={{ p: 2 }}>
            <CardContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  flexDirection: { xs: "column", sm: "row" }, // avatar above text on mobile
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                <Avatar
                  src="/tukdoji.jpeg" // from public folder
                  alt="Rashtrasant Tukdoji Maharaj"
                  sx={{ width: 60, height: 60, marginRight: { xs: 0, sm: 2 }, mb: { xs: 1, sm: 0 } }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold" }}
                >
                  राष्ट्रसंत तुकडोजी महाराज
                </Typography>
              </div>

              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", textAlign: { xs: "center", md: "left" } }}
              >
                “ऐसें गाव होतां आदर्शपूर्ण <br />
                शहाराइनीहि नंदनवन <br />
                सर्वां करील आकर्षण <br />
                सुंदर जीवन तुकड्या म्हणे...”
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default RajyaGeetSection;
