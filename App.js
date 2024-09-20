import React from 'react';
import TryForFree from './Screens/TryForFree';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Screens/Login';
import Verification from './Screens/Verification'
import AdminPanel from './Screens/AdminPanel';
import VerificationFileDownload from './Screens/FilePage';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<TryForFree />} />
      <Route path="/verify" element={<Verification />} />
      <Route path='/verificationFile/download/' element={<VerificationFileDownload/>}/>
      </Routes>
    </Router>
  );
}

export default App;
