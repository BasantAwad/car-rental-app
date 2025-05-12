
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@/pages/HomePage.jsx';
import CarInfoPage from '@/pages/CarInfoPage.jsx';
import RentCarPage from '@/pages/RentCarPage.jsx';
import Layout from '@/components/Layout.jsx';
import { Toaster } from '@/components/ui/toaster.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/car/:id" element={<CarInfoPage />} />
          <Route path="/rent/:id" element={<RentCarPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
