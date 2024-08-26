import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './components/Pages/Landing/Landing';
import SignIn from './components/Pages/Login/Login';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Home from './components/Pages/Home/Home';
import Social from './components/Pages/Social/Social';
import MonthFilter from './components/Pages/Filters/MonthFilter';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Nested routes */}
        <Route path="home" element={<Home />} />
        <Route path="social" element={<Social />} />
        <Route path="current-month" element={<MonthFilter />} />
        <Route path="last-quarter" element={<MonthFilter />} />
        <Route path="year-end-sale" element={<MonthFilter />} />
      </Route>
      {/* Redirect or other routes can be added here if needed */}
    </Routes>
  );
};

export default App;
