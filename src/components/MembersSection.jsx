import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PersonIcon from "@mui/icons-material/Person";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const MembersSection = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const socialIconMap = {
    facebook: <FacebookIcon sx={{ color: "#3b5998" }} />,
    twitter: <TwitterIcon sx={{ color: "#00acee" }} />,
    linkedin: <LinkedInIcon sx={{ color: "#0e76a8" }} />,
    instagram: <InstagramIcon sx={{ color: "#E1306C" }} />,
  };

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch members data (name, image, role)
        const membersQuery = query(collection(db, "members"), orderBy("order", "asc"));
        const membersSnapshot = await getDocs(membersQuery);
        const membersData = membersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch bio data (bio, social links)
        const bioQuery = query(collection(db, "members-bio"));
        const bioSnapshot = await getDocs(bioQuery);
        const bioData = bioSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Combine data by matching member IDs
        const combinedMembers = membersData.map((member) => {
          const bioInfo = bioData.find((bio) => bio.id === member.id);
          return {
            ...member,
            bio: bioInfo?.bio || "माहिती उपलब्ध नाही",
            social: {
              facebook: bioInfo?.facebook || "",
              twitter: bioInfo?.twitter || "",
              linkedin: bioInfo?.linkedin || "",
              instagram: bioInfo?.instagram || "",
            },
          };
        });

        setMembers(combinedMembers);
      } catch (err) {
        console.error("Error fetching members data:", err);
        setError("सदस्यांची माहिती आणण्यात त्रुटी आली");
      } finally {
        setLoading(false);
      }
    };

    fetchMembersData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Box
        sx={{
          padding: { xs: "20px 10px", md: "40px 20px" },
          backgroundColor: "#f5f7fa",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress size={60} sx={{ mb: 2 }} />
        <Typography variant="h6" color="text.secondary">
          सदस्यांची माहिती आणत आहे...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          padding: { xs: "20px 10px", md: "40px 20px" },
          backgroundColor: "#f5f7fa",
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: "20px 10px", md: "40px 20px" },
        backgroundColor: "#f5f7fa",
      }}
    >
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

      {members.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <PersonIcon sx={{ fontSize: 80, mb: 2, opacity: 0.5 }} />
          <Typography variant="h6" gutterBottom>
            अजून कोणतेही सदस्य जोडलेले नाहीत
          </Typography>
          <Typography variant="body2">
            कृपया प्रशासकांशी संपर्क साधा
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {members.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.id}>
              <Card
                sx={{
                  textAlign: "center",
                  padding: { xs: "20px 10px", sm: "30px 20px" },
                  borderRadius: "15px",
                  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease-in-out",
                  maxWidth: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    transform: "translateY(-10px)",
                  },
                }}
              >
                <Avatar
                  src={member.imageURL || member.photoURL}
                  alt={member.name}
                  sx={{
                    width: 120,
                    height: 120,
                    margin: "0 auto 20px",
                    border: "4px solid #fff",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  {!(member.imageURL || member.photoURL) && (
                    <PersonIcon sx={{ fontSize: 60 }} />
                  )}
                </Avatar>
                <CardContent sx={{ padding: 0, flexGrow: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#444", marginBottom: 1 }}
                  >
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
                    {member.designation || member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginBottom: 2, flexGrow: 1 }}
                  >
                    {member.bio}
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{
                      marginTop: 2,
                      flexWrap: "wrap",
                      "& .MuiIconButton-root:hover": {
                        transform: "scale(1.2)",
                        transition: "transform 0.2s",
                      },
                    }}
                  >
                    {Object.entries(member.social)
                      .filter(([_, link]) => link && link.trim() !== "")
                      .map(([platform, link]) => (
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
      )}
    </Box>
  );
};

export default MembersSection;
