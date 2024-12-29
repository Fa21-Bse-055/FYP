import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import OrganizationLogin from './Pages/LoginPages/OrginizationLogin/OrginizationLogin';
import OrganizationRegistration from './Pages/RegistrationPages/OrganizationRegistration/OrganizationRegistration';
import Navbar from './Components/Navbar/Navbar';
import Verification from './Pages/Verification';
import DownloadVerificationFile from './Pages/FilePage/FilePage';
import StudentRegistration from './Pages/RegistrationPages/StudentRegistration/StudentRegistration';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import AdiminRegistration from './Pages/RegistrationPages/SuperAdminRegistration/AdminRegistration';
import AdminLogin from './Pages/LoginPages/AdminLogin/AdminLogin';
import GenerateDocument from './Pages/Generate-Document/GenerateDocument';
import UploadDocument from './Pages/Upload-Document/UploadDocument';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/organizationLogin" element={<OrganizationLogin />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/verificationFile" element={<DownloadVerificationFile />} />
          <Route path="/studentRegistration" element={<StudentRegistration />} />
          <Route path="/organizationRegistration" element={<OrganizationRegistration />} />
          <Route path="/adminPage" element={<AdminPanel />} />
          <Route path="/adminRegistration" element={<AdiminRegistration />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/generateDocument" element={<GenerateDocument />} />
          <Route path="/uploadDocument" element={<UploadDocument />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
