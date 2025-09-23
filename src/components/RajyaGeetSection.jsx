import React from "react";
import { Grid, Card, CardContent, Typography, Avatar } from "@mui/material";

const RajyaGeetSection = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Typography
       variant="h5"
       gutterBottom
       sx={{ 
       fontWeight: "bold", 
       textAlign: "left",   
      ml: "300px"         
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
              height="315"
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
                }}
              >
                <Avatar
                  src="/tukdoji.jpeg" //from public folder
                  alt="Rashtrasant Tukdoji Maharaj"
                  sx={{ width: 60, height: 60, marginRight: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  राष्ट्रसंत तुकडोजी महाराज
                </Typography>
              </div>

              <Typography variant="body1" sx={{ fontStyle: "italic" }}>
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
