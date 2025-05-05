import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button,Box, Switch, FormControlLabel, ThemeProvider, createTheme } from '@mui/material';

const Navbar = () => {
  // State to toggle the theme
  const [darkMode, setDarkMode] = useState(false);

  // Handle theme change
  const handleSwitchChange = (event) => {
    setDarkMode(event.target.checked);
  };

  // Light and Dark themes
  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#9c27b0',
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
    },
  });

   return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      
          <Typography variant="h6">
            Loan Calculator
          </Typography>

          {/* Right side buttons */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button sx={{px:2}} color="inherit">Home</Button>
            <Button sx={{px:2}} color="inherit">Exchange rate (Live)</Button>
            <Button sx={{px:2}} color="inherit">About</Button>
            <Button sx={{px:2}} color="inherit">Error Page</Button>


             {/* Changing Theme in Navbar*/}
          <FormControlLabel
            control={
              <Switch checked={darkMode} onChange={handleSwitchChange} />
            }
            sx={{ color: 'white', ml: 2 }}
          />
          </Box>

         
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
