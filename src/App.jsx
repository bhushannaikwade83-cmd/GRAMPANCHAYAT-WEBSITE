import React from "react";
import { Routes, Route } from "react-router-dom";
import { Grid, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Import components
import Navbar from "./components/Navbar";
import Photosection from "./components/Photosection";
import RajyaGeetSection from "./components/RajyaGeetSection";
import MessagesSection from "./components/MessagesSection";
import MembersSection from "./components/MembersSection";
import GrampanchayatInfo from "./components/GrampanchayatInfo";
import DigitalSlogans from "./components/DigitalSlogans";
import GovLogosSection from "./components/GovLogosSection";
import Footer from "./components/Footer";

// Import new pages
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

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Page Content with paddingTop to clear fixed Navbar */}
      <Box sx={{ pt: `${navbarHeight}px` }}>
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                {/* Full-width sections */}
                <Photosection />
                <RajyaGeetSection />

                {/* Grid layout for Messages + Members */}
                <Box sx={{ width: "100%", p: 0, m: 0 }}>
                  <Grid
                    container
                    spacing={isMobile ? 2 : 4}
                    sx={{ width: "100%", m: 0, p: 0 }}
                  >
                    <Grid item xs={12} md={6} lg={5}>
                      <MessagesSection />
                    </Grid>

                    <Grid item xs={12} md={6} lg={7}>
                      <MembersSection />
                    </Grid>
                  </Grid>
                </Box>

                {/* Full-width sections (outside Grid) */}
                <GrampanchayatInfo />
                <DigitalSlogans />

                {/* Enhanced Government Logos Section */}
                <Box
                  sx={{
                    width: "100%",
                    overflow: "hidden", // Prevent horizontal scroll
                    m: 0,
                    p: 0,
                  }}
                >
                  <GovLogosSection />
                </Box>
              </>
            }
          />

          {/* ग्रामपंचायत → माहिती */}
          <Route path="/ग्रामपंचायत-माहिती" element={<GrampanchayatMahiti />} />
          <Route path="/ग्रामपंचायत-नकाशा" element={<GrampanchayatNaksha />} />
          <Route path="/ग्रामपंचायत-सदस्य" element={<GrampanchayatSadasya />} />
          <Route path="/ग्रामपंचायत-ग्रामसभेचे-निर्णय" element={<GramsabhaNirnay />} />
          <Route path="/ग्रामपंचायत-पुरस्कार" element={<GramPuraskar />} />
          <Route path="/ग्रामपंचायत-सण-उत्सव" element={<Festival />} />
          <Route path="/ग्रामपंचायत-सुविधा" element={<GramSuvidha />} />
          <Route path="/ग्रामपंचायत-पर्यटन-स्थळे" element={<Gramparyatansthale />} />
          <Route path="/निर्देशिका-जनगणना" element={<Gramjanganna />} />
          <Route path="/निर्देशिका-दूरध्वनी-क्रमांक" element={<GramDhurdhvani />} />
          <Route path="/निर्देशिका-हेल्पलाईन" element={<GramHelpline />} />
          <Route path="/निर्देशिका-रुग्णालय" element={<GramRugnalay />} />

          {/* उपक्रम → All initiatives */}
          <Route path="/उपक्रम-स्वच्छ गाव" element={<SwachhGav />} />
          <Route path="/उपक्रम-विकेल-ते-पिकेल" element={<Vikeltepikel />} />
          <Route path="/उपक्रम-माझं-कुटुंब माझी-जवाबदारी" element={<Grammajhikutumb />} />
          <Route path="/उपक्रम-तंटामुक्त गाव" element={<GramTantamuktGav />} />
          <Route path="/उपक्रम-जलयुक्त शिवार" element={<GramJalyuktShivar />} />
          <Route path="/उपक्रम-तुषारगाव" element={<GramTushargav />} />
          <Route path="/उपक्रम-रोती पूरक व्यवसाय" element={<GramRotiPurakVyavsay />} />
          <Route path="/उपक्रम-गादोली" element={<GramGavadoli />} />
          <Route path="/उपक्रम-मतदार नोंदणी" element={<GramMatdarNondani />} />
          <Route path="/उपक्रम-सर्व शिक्षा अभियान" element={<GramSarvaShikshaAbhiyan />} />
          <Route path="/उपक्रम-क्रीडा स्पर्धा" element={<GramKridaSpardha />} />
          <Route path="/उपक्रम-आरोग्य शिबिर" element={<GramArogyaShibir />} />
          <Route path="/उपक्रम-कचऱ्याचे नियोजन" element={<GramKachraNivaran />} />
          <Route path="/उपक्रम-बायोगॅस निर्मिती" element={<GramBiogasNirmiti />} />
          <Route path="/उपक्रम-सेंद्रिय खत निर्मिती" element={<GramSendriyaKhat />} />
          <Route path="/योजना-राज्य सरकार योजना" element={<GramRajyaSarkarYojna />} />
          <Route path="/योजना-केंद्र सरकार योजना" element={<GramKendraSarkarYojana />} />

  
        </Routes>
      </Box>

      {/* Footer placed outside Routes */}
      <Footer />
    </>
  );
}

export default App;
