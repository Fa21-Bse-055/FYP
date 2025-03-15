import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Components/context/ThemeContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import OrganizationLogin from './Pages/LoginPages/OrginizationLogin/OrginizationLogin';
import Verification from './Pages/Verification';
import DownloadVerificationFile from './Pages/FilePage/FilePage';
import StudentRegistration from './Pages/RegistrationPages/StudentRegistration/StudentRegistration';
import OrganizationRegistration from './Pages/RegistrationPages/OrganizationRegistration/OrganizationRegistration';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import AdminRegistration from './Pages/RegistrationPages/SuperAdminRegistration/AdminRegistration';
import AdminLogin from './Pages/LoginPages/AdminLogin/AdminLogin';
import GenerateDocument from './Pages/Generate-Document/GenerateDocument';
import UploadDocument from './Pages/Upload-Document/UploadDocument';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
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
          <Route path="/adminRegistration" element={<AdminRegistration />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/generateDocument" element={<GenerateDocument />} />
          <Route path="/uploadDocument" element={<UploadDocument />} /> 
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App; 