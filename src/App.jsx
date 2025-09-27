import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import DeviceManagement from './components/DeviceManagement';
import UserManagement from './components/UserManagement';
import TheftManagement from './components/TheftManagement';
import CommunicationManagement from './components/CommunicationManagement';


const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/devices" element={<DeviceManagement />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/theft-reports" element={<TheftManagement />} />
          <Route path="/communications" element={<CommunicationManagement />} />
          {/* <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;