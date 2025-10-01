import React from "react";
import { Routes, Route } from "react-router-dom";
import { Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import components
import Navbar from "./components/Navbar";
import Welcome from "./components/Welcome";
import Photosection from "./components/Photosection";
import RajyaGeetSection from "./components/RajyaGeetSection";
import MessagesSection from "./components/MessagesSection";
import MembersSection from "./components/MembersSection";
import GrampanchayatInfo from "./components/GrampanchayatInfo";
import DigitalSlogans from "./components/DigitalSlogans";
import GovLogosSection from "./components/GovLogosSection";
import Footer from "./components/Footer";

// Import pages
import GrampanchayatMahiti from "./pages/GrampanchayatMahiti";
import GrampanchayatNaksha from "./pages/GrampanchayatNaksha";
import GrampanchayatSadasya from "./pages/GrampanchayatSadasya";
import GramsabhaNirnay from "./pages/GramsabhaNirnay";
import GramPuraskar from "./pages/GramPuraskar";
import Festival from "./pages/Festival";
import GramSuvidha from "./pages/GramSuvidha";
import Gramparyatansthale from "./pages/Gramparyatansthale";
import Gramjanganna from "./pages/Gramjanganna";
import GramDhurdhvani from "./pages/GramDhurdhvani";
import GramHelpline from "./pages/GramHelpline";
import GramRugnalay from "./pages/GramRugnalay";

// उपक्रम pages
import SwachhGav from "./pages/SwachhGav";
import Vikeltepikel from "./pages/Vikeltepikel";
import Grammajhikutumb from "./pages/Grammajhikutumb";
import GramTantamuktGav from "./pages/GramTantamuktGav";
import GramJalyuktShivar from "./pages/GramJalyuktShivar";
import GramTushargav from "./pages/GramTushargav";
import GramRotiPurakVyavsay from "./pages/GramRotiPurakVyavsay";
import GramGavadoli from "./pages/GramGavadoli";
import GramMatdarNondani from "./pages/GramMatdarNondani";
import GramSarvaShikshaAbhiyan from "./pages/GramSarvaShikshaAbhiyan";
import GramKridaSpardha from "./pages/GramKridaSpardha";
import GramArogyaShibir from "./pages/GramArogyaShibir";
import GramKachraNivaran from "./pages/GramKachraNivaran";
import GramBiogasNirmiti from "./pages/GramBiogasNirmiti";
import GramSendriyaKhat from "./pages/GramSendriyaKhat";
import GramRajyaSarkarYojna from "./pages/GramRajyaSarkarYojna";
import GramKendraSarkarYojana from "./pages/GramKendraSarkarYojana";

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64; // Navbar height in px

  // Utility wrapper for non-home pages
  const withNavbarPadding = (Component) => (
    <Box sx={{ pt: `${navbarHeight}px` }}>
      <Component />
    </Box>
  );

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <Box>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* Welcome Section below Navbar */}
                <Welcome />

                {/* Photo/Hero Section after Welcome */}
                <Photosection />

                {/* Rest of homepage content */}
                <Box sx={{ pt: `${navbarHeight}px` }}>
                  <RajyaGeetSection />

                  {/* Grid layout for Messages + Members */}
                  <Grid container spacing={isMobile ? 2 : 4} sx={{ width: "100%", m: 0, p: 0, justifyContent: "center" }}>
                    <Grid item xs={12} md={6} lg={5} sx={{ 
                      display: "flex",
                      justifyContent: "center",
                      px: { xs: 3, sm: 4 } // Adjust padding for mobile centering (increase to shift left)
                    }}>
                      <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "none" } }}>
                        <MessagesSection />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={7} sx={{ 
                      pr: { lg: 8 }, // Desktop: Adjust this number to shift left (increase) or right (decrease)
                      px: { xs: 4, sm: 5 }, // Mobile: Adjust padding for mobile centering (increase to shift left)
                      display: "flex",
                      justifyContent: "center"
                    }}>
                      <Box sx={{ width: "100%", maxWidth: { xs: "100%", md: "none" } }}>
                        <MembersSection />
                      </Box>
                    </Grid>
                  </Grid>

                  <GrampanchayatInfo />
                  <DigitalSlogans />
                  <GovLogosSection />
                </Box>
              </>
            }
          />

          {/* Other routes */}
          <Route path="/ग्रामपंचायत-माहिती" element={withNavbarPadding(GrampanchayatMahiti)} />
          <Route path="/ग्रामपंचायत-नकाशा" element={withNavbarPadding(GrampanchayatNaksha)} />
          <Route path="/ग्रामपंचायत-सदस्य" element={withNavbarPadding(GrampanchayatSadasya)} />
          <Route path="/ग्रामपंचायत-ग्रामसभेचे निर्णय" element={withNavbarPadding(GramsabhaNirnay)} />
          <Route path="/ग्रामपंचायत-पुरस्कार" element={withNavbarPadding(GramPuraskar)} />
          <Route path="/ग्रामपंचायत-सण/उत्सव" element={withNavbarPadding(Festival)} />
          <Route path="/ग्रामपंचायत-सुविधा" element={withNavbarPadding(GramSuvidha)} />
          <Route path="/ग्रामपंचायत-पर्यटन स्थळे" element={withNavbarPadding(Gramparyatansthale)} />
          <Route path="/निर्देशिका-जनगणना" element={withNavbarPadding(Gramjanganna)} />
          <Route path="/निर्देशिका-दूरध्वनी क्रमांक" element={withNavbarPadding(GramDhurdhvani)} />
          <Route path="/निर्देशिका-हेल्पलाईन" element={withNavbarPadding(GramHelpline)} />
          <Route path="/निर्देशिका-रुग्णालय" element={withNavbarPadding(GramRugnalay)} />

          {/* उपक्रम */}
          <Route path="/उपक्रम-स्वच्छ गाव" element={withNavbarPadding(SwachhGav)} />
          <Route path="/उपक्रम-विकेल-ते-पिकेल" element={withNavbarPadding(Vikeltepikel)} />
          <Route path="/उपक्रम-माझं-कुटुंब माझी-जवाबदारी" element={withNavbarPadding(Grammajhikutumb)} />
          <Route path="/उपक्रम-तंटामुक्त गाव" element={withNavbarPadding(GramTantamuktGav)} />
          <Route path="/उपक्रम-जलयुक्त शिवार" element={withNavbarPadding(GramJalyuktShivar)} />
          <Route path="/उपक्रम-तुषारगाव" element={withNavbarPadding(GramTushargav)} />
          <Route path="/उपक्रम-रोती पूरक व्यवसाय" element={withNavbarPadding(GramRotiPurakVyavsay)} />
          <Route path="/उपक्रम-गादोली" element={withNavbarPadding(GramGavadoli)} />
          <Route path="/उपक्रम-मतदार नोंदणी" element={withNavbarPadding(GramMatdarNondani)} />
          <Route path="/उपक्रम-सर्व शिक्षा अभियान" element={withNavbarPadding(GramSarvaShikshaAbhiyan)} />
          <Route path="/उपक्रम-क्रीडा स्पर्धा" element={withNavbarPadding(GramKridaSpardha)} />
          <Route path="/उपक्रम-आरोग्य शिबिर" element={withNavbarPadding(GramArogyaShibir)} />
          <Route path="/उपक्रम-कचऱ्याचे नियोजन" element={withNavbarPadding(GramKachraNivaran)} />
          <Route path="/उपक्रम-बायोगॅस निर्मिती" element={withNavbarPadding(GramBiogasNirmiti)} />
          <Route path="/उपक्रम-सेंद्रिय खत निर्मिती" element={withNavbarPadding(GramSendriyaKhat)} />
          <Route path="/योजना-राज्य सरकार योजना" element={withNavbarPadding(GramRajyaSarkarYojna)} />
          <Route path="/योजना-केंद्र सरकार योजना" element={withNavbarPadding(GramKendraSarkarYojana)} />
        </Routes>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
