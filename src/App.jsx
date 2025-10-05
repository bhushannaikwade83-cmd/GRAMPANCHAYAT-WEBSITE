import React from "react";
import { Routes, Route } from "react-router-dom";
import { Grid, Box, useMediaQuery, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Public Components
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

// Public Pages
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
import TakrarNondani from "./pages/TakrarNondani";
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

// Admin Components
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import AdminLayout from "./admin/AdminLayout";
import GramPanchayatProfile from "./admin/Gram-panchayat-profile";

// Admin Pages (Management sections)
import ManageInfo from "./admin/pages/manage-gram-panchayat/ManageInfo";
import ManageMap from "./admin/pages/manage-gram-panchayat/ManageMap";
import ManageMembers from "./admin/pages/manage-gram-panchayat/ManageMembers";
const ManageDecisions = () => <Box p={4}><Typography variant="h4">निर्णय व्यवस्थापन पेज</Typography></Box>;
const ManageAwards = () => <Box p={4}><Typography variant="h4">पुरस्कार व्यवस्थापन पेज</Typography></Box>;
const ManageFestivals = () => <Box p={4}><Typography variant="h4">सण/उत्सव व्यवस्थापन पेज</Typography></Box>;
const ManageFacilities = () => <Box p={4}><Typography variant="h4">सुविधा व्यवस्थापन पेज</Typography></Box>;
const ManageESeva = () => <Box p={4}><Typography variant="h4">ई-सेवा व्यवस्थापन पेज</Typography></Box>;
const ManageTourism = () => <Box p={4}><Typography variant="h4">पर्यटन स्थळे व्यवस्थापन पेज</Typography></Box>;
const ManageComplaints = () => <Box p={4}><Typography variant="h4">तक्रार व्यवस्थापन पेज</Typography></Box>;


// This component wraps all the public-facing pages with Navbar and Footer
const MainLayout = ({ isMobile, navbarHeight }) => (
  <>
    <Navbar />
    <Box>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Welcome />
              <Photosection />
              <Box>
                <RajyaGeetSection />
                <Grid container spacing={isMobile ? 2 : 4} sx={{ width: "100%", m: 0, p: 0 }}>
                  <Grid item xs={12} md={6} lg={5}><MessagesSection /></Grid>
                  <Grid item xs={12} md={6} lg={7} sx={{ pr: { lg: 8 } }}><MembersSection /></Grid>
                </Grid>
                <GrampanchayatInfo />
                <DigitalSlogans />
                <GovLogosSection />
              </Box>
            </>
          }
        />
        
        {/* Routes for all public pages */}
        <Route path="/ग्रामपंचायत-माहिती" element={<GrampanchayatMahiti />} />
        <Route path="/ग्रामपंचायत-नकाशा" element={<GrampanchayatNaksha />} />
        <Route path="/ग्रामपंचायत-सदस्य" element={<GrampanchayatSadasya />} />
        <Route path="/ग्रामपंचायत-ग्रामसभेचे-निर्णय" element={<GramsabhaNirnay />} />
        <Route path="/ग्रामपंचायत-पुरस्कार" element={<GramPuraskar />} />
        <Route path="/ग्रामपंचायत-सण-उत्सव" element={<Festival />} />
        <Route path="/ग्रामपंचायत-सुविधा" element={<GramSuvidha />} />
        <Route path="/ग्रामपंचायत-पर्यटन-सथळे" element={<Gramparyatansthale />} />
        <Route path="/निर्देशिका-जनगणना" element={<Gramjanganna />} />
        <Route path="/निर्देशिका-दूरध्वनी-क्रमांक" element={<GramDhurdhvani />} />
        <Route path="/निर्देशिका-हेल्पलाईन" element={<GramHelpline />} />
        <Route path="/निर्देशिका-रुग्णालय" element={<GramRugnalay />} />
        <Route path="/उपक्रम-स्वच्छ-गाव" element={<SwachhGav />} />
        <Route path="/उपक्रम-विकेल-ते-पिकेल" element={<Vikeltepikel />} />
        <Route path="/उपक्रम-माझे-कुटुंब-माझी-जबाबदारी" element={<Grammajhikutumb />} />
        <Route path="/उपक्रम-तंटामुक्त-गाव" element={<GramTantamuktGav />} />
        <Route path="/उपक्रम-जलयुक्त-शिवार" element={<GramJalyuktShivar />} />
        <Route path="/उपक्रम-तुषारगावड" element={<GramTushargav />} />
        <Route path="/उपक्रम-रोती-पूरक-व्यवसाय" element={<GramRotiPurakVyavsay />} />
        <Route path="/उपक्रम-गादोली" element={<GramGavadoli />} />
        <Route path="/उपक्रम-मतदार-नोंदणी" element={<GramMatdarNondani />} />
        <Route path="/उपक्रम-सर्व-शिक्षा-अभियान" element={<GramSarvaShikshaAbhiyan />} />
        <Route path="/उपक्रम-क्रीडा-स्पर्धा" element={<GramKridaSpardha />} />
        <Route path="/उपक्रम-आरोग्य-शिबिर" element={<GramArogyaShibir />} />
        <Route path="/उपक्रम-कचऱ्याचे-नियोजन" element={<GramKachraNivaran />} />
        <Route path="/उपक्रम-बायोगॅस-निर्मिती" element={<GramBiogasNirmiti />} />
        <Route path="/उपक्रम-सेंद्रिय-खत-निर्मिती" element={<GramSendriyaKhat />} />
        <Route path="/योजना-राज्य-सरकार-योजना" element={<GramRajyaSarkarYojna />} />
        <Route path="/योजना-केंद्र-सरकार-योजना" element={<GramKendraSarkarYojana />} />
        <Route path="/तक्रार-नोंदणी" element={<TakrarNondani />} />
      </Routes>
    </Box>
    <Footer />
  </>
);

// Main App Component that handles all routing
function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navbarHeight = 64;

  return (
    <Routes>
      {/* Admin Section Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminPanel />} />
        <Route path="panel" element={<AdminPanel />} />
        <Route path="profile" element={<GramPanchayatProfile />} />
        
        {/* ✅ UPDATED: All management pages now use a consistent '/manage/' prefix */}
        <Route path="manage/info" element={<ManageInfo />} />
        <Route path="manage/map" element={<ManageMap />} />
        <Route path="manage/members" element={<ManageMembers />} />
        <Route path="manage/decisions" element={<ManageDecisions />} />
        <Route path="manage/awards" element={<ManageAwards />} />
        <Route path="manage/festivals" element={<ManageFestivals />} />
        <Route path="manage/facilities" element={<ManageFacilities />} />
        <Route path="manage/eseva" element={<ManageESeva />} />
        <Route path="manage/tourism" element={<ManageTourism />} />
        <Route path="manage/complaints" element={<ManageComplaints />} />
      </Route>

      {/* Main Public Website Routes */}
      <Route path="/*" element={<MainLayout isMobile={isMobile} navbarHeight={navbarHeight} />} />
    </Routes>
  );
}

export default App;
