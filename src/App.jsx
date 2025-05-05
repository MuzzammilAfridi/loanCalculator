import React from 'react';
import { Button, Typography, CssBaseline  } from '@mui/material';
import Navbar from './components/Navbar'
import  Home  from './components/Home';

const App = () => {
  return (
    <div>
      
      <CssBaseline /> 
      <Navbar/>
      <Home/>
    </div>
  );
};

export default App;
