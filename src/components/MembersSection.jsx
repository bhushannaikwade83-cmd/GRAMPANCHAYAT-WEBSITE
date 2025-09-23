import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Stack,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const members = [
  {
    id: 1,
    name: "Rajesh Patil",
    role: "सरपंच (Sarpanch)",
    image: "/images/rajesh-patil.jpg",
    bio: "Passionate about community development and improving local infrastructure for a better tomorrow.",
    social: {
      facebook: "https://www.facebook.com/rajesh-patil",
      linkedin: "https://www.linkedin.com/in/rajesh-patil",
    },
  },
  {
    id: 2,
    name: "Smita Kulkarni",
    role: "ग्राम सेवक (Gram Sevak)",
    image: "/images/smita-kulkarni.jpg",
    bio: "Dedicated to serving the villagers and ensuring the smooth implementation of government schemes.",
    social: {
      twitter: "https://www.twitter.com/smita-kulkarni",
      instagram: "https://www.instagram.com/smita-kulkarni",
      linkedin: "https://www.linkedin.com/in/smita-kulkarni",
    },
  },
  {
    id: 3,
    name: "Arjun Singh",
    role: "उप-सरपंच (Up-Sarpanch)",
    image: "/images/arjun-singh.jpg",
    bio: "Working to foster unity and progress within our community, with a focus on education and youth programs.",
    social: {
      facebook: "https://www.facebook.com/arjun-singh",
    },
  },
];

const MembersSection = () => {
  const socialIconMap = {
    facebook: <FacebookIcon sx={{ color: "#3b5998" }} />,
    twitter: <TwitterIcon sx={{ color: "#00acee" }} />,
    linkedin: <LinkedInIcon sx={{ color: "#0e76a8" }} />,
    instagram: <InstagramIcon sx={{ color: "#E1306C" }} />,
  };

  return (
    <Box sx={{ padding: "40px 20px", backgroundColor: "#f5f7fa" }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{
          fontWeight: "bold",
          marginBottom: 5,
          color: "#333",
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        आमच्या ग्राम पंचायतीचे पदाधिकारी
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {members.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.id}>
            <Card
              sx={{
                textAlign: "center",
                padding: "30px 20px",
                borderRadius: "15px",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <Avatar
                src={member.image}
                alt={member.name}
                sx={{
                  width: 140,
                  height: 140,
                  margin: "0 auto 20px",
                  border: "4px solid #fff",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                }}
              />
              <CardContent sx={{ padding: 0 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "#444", marginBottom: 1 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary.main"
                  sx={{
                    fontStyle: "italic",
                    marginBottom: 2,
                    fontWeight: 600,
                  }}
                >
                  {member.role}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
                  {member.bio}
                </Typography>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  sx={{
                    marginTop: 2,
                    "& .MuiIconButton-root:hover": {
                      transform: "scale(1.2)",
                      transition: "transform 0.2s",
                    },
                  }}
                >
                  {Object.entries(member.social).map(([platform, link]) => (
                    <IconButton
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="large"
                    >
                      {socialIconMap[platform]}
                    </IconButton>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MembersSection;