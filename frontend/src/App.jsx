import React from 'react';
import AppRoutes from './routes';
import { Box } from '@mui/material';
import "./index.css";

const App = () => {
  return (
    <Box sx={{width: '100%', height: '100vh'}}
    >
      <AppRoutes />
    </Box>
  );
};

export default App;
