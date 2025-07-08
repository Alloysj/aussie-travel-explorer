import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TravelListPage from './pages/TravelListPage';
import TravelDetailPage from './pages/TravelDetailPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Main app container with router setup
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<TravelListPage />} />
        <Route path="/destinations/:id" element={<TravelDetailPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
