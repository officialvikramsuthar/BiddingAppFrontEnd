// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import HomePage from './screens/HomePage';
import AuctionPage from './screens/AuctionLPage';
import CreateAuctionPage from './screens/CreateAuctionPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auction" element={<AuctionPage />} />
        <Route path="/create-auction" element={<CreateAuctionPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
