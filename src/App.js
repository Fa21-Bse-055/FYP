import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Components/context/ThemeContext';
import { AuthProvider } from './Components/context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import OrganizationLogin from './Pages/LoginPages/OrginizationLogin/OrginizationLogin';
import Verification from './Pages/Verification';
import DownloadVerificationFile from './Pages/FilePage/FilePage';
// import StudentRegistration from './Pages/RegistrationPages/StudentRegistration/StudentRegistration';
import OrganizationRegistration from './Pages/RegistrationPages/OrganizationRegistration/OrganizationRegistration';
import AdminPanel from './Pages/AdminPanel/AdminPanel';
import AdminRegistration from './Pages/RegistrationPages/SuperAdminRegistration/AdminRegistration';
import AdminLogin from './Pages/LoginPages/AdminLogin/AdminLogin';
import GenerateDocument from './Pages/Generate-Document/GenerateDocument';
import UploadDocument from './Pages/Upload-Document/UploadDocument';
import Dashboard from './Pages/Dashboard/Dashboard';
import NotAuthorized from './Pages/NotAuthorized/NotAuthorized';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <div className="App">
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/organizationLogin" element={<OrganizationLogin />} />
              <Route path="/adminLogin" element={<AdminLogin />} />
              <Route path="/organizationRegistration" element={<OrganizationRegistration />} />
              <Route path="/verify" element={<Verification />} />
              <Route path="/not-authorized" element={<NotAuthorized />} />

              {/* Protected routes for organizations */}
              <Route element={<ProtectedRoute allowedRoles={["organization"]} redirectPath="/organizationLogin" />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/verificationFile" element={<DownloadVerificationFile />} />
                <Route path="/uploadDocument" element={<UploadDocument />} />
                <Route path="/generateDocument" element={<GenerateDocument />} />
              </Route>

              {/* Protected routes for admins */}
              <Route element={<ProtectedRoute allowedRoles={["admin", "super-admin"]} redirectPath="/adminLogin" />}>
                <Route path="/adminPage" element={<AdminPanel />} />
              </Route>

              {/* Protected routes for super-admins only */}
              <Route element={<ProtectedRoute allowedRoles={["super-admin"]} redirectPath="/not-authorized" />}>
                <Route path="/adminRegistration" element={<AdminRegistration />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App; 