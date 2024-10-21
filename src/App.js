import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import TryForFree from './Pages/Registration/Registration';
import Navbar from './Components/Navbar/Navbar';
import Verification from './Pages/Verification';
import DownloadVerificationFile from './Pages/FilePage/FilePage';
import PersonReg from './Pages/PersonRegistration/PersonRegistration';
import AdminPanel from './Pages/AdminPanel/AdminPanel';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/verificationFile" element={<DownloadVerificationFile />} />
          <Route path="/PersonRegistration" element={<PersonReg />} />
          <Route path="/orginizationRegistration" element={<TryForFree />} />
          <Route path="/adminPage" element={<AdminPanel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
