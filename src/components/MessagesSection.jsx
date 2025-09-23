import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Link as MuiLink,
  Paper,
} from "@mui/material";

const MessagesSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: 350, // fixed small box width
        mt: 4,
        ml: 2, // push a little right
        boxShadow: 3,
        borderRadius: 2,
        background: "white",
      }}
    >
      {/* Tabs Header */}
      <Paper square>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": { fontWeight: "bold", fontSize: "14px" },
            "& .Mui-selected": {
              backgroundColor: "#d98c00", // orange selected tab
              color: "white !important",
            },
          }}
        >
          <Tab label="नवीन संदेश" />
          <Tab label="कार्यक्रम" />
          <Tab label="निविदा" />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <Box
        sx={{
          p: 2,
          height: 200, // 🔹 fixed height for content area
          overflowY: "auto", // scroll if content is too much
        }}
      >
        {value === 0 && (
          <>
            <Typography sx={{ mb: 1 }}>
              योजना नाव –{" "}
              <MuiLink href="#" color="primary">
                लाभार्थी यादी १
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              योजना नाव –{" "}
              <MuiLink href="#" color="primary">
                लाभार्थी यादी २
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              योजना नाव –{" "}
              <MuiLink href="#" color="primary">
                लाभार्थी यादी ३
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              योजना नाव –{" "}
              <MuiLink href="#" color="primary">
                लाभार्थी यादी ४
              </MuiLink>
            </Typography>
            <MuiLink href="#" color="primary" sx={{ fontWeight: "bold" }}>
              ग्राम सभेचे निर्णय
            </MuiLink>
          </>
        )}

        {value === 1 && (
          <>
            <Typography sx={{ mb: 1 }}>
              <MuiLink href="#" color="primary">
                कार्यक्रम-१
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <MuiLink href="#" color="primary">
                कार्यक्रम-२
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <MuiLink href="#" color="primary">
                कार्यक्रम-३
              </MuiLink>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              <MuiLink href="#" color="primary">
                कार्यक्रम-४
              </MuiLink>
            </Typography>
          </>
        )}

        {value === 2 && (
          <Typography> इथे निविदांची माहिती दिसेल...</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MessagesSection;
