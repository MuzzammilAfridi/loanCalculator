import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Switch,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >


<IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography sx={{ marginRight: 10 }} variant="h6">
          Loan Calculator
        </Typography>

       

        {/* Switch only for mobile */}
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleTheme} />}
          sx={{
            display: { xs: "block", md: "none" },
            color: "white",
            position: "relative",
            left: 20,
          }}
        />

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: darkMode ? "grey.900" : "white",
              width: "250px",
              minHeight: "90vh",
              overflowY: "auto",
              borderRadius: 0,
              mt: 1,
            },
          }}
        >
          <MenuItem component={Link} to="/" onClick={handleMenuClose}>
            Home
          </MenuItem>
          <MenuItem component={Link} to="/exchange-rate" onClick={handleMenuClose}>
            Exchange rate (Live)
          </MenuItem>
          <MenuItem component={Link} to="/about" onClick={handleMenuClose}>
            About
          </MenuItem>
          <MenuItem component={Link} to="/error_page" onClick={handleMenuClose}>
            Error Page
          </MenuItem>
        </Menu>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Button component={Link} to="/" sx={{ px: 2 }} color="inherit">
            Home
          </Button>
          <Button component={Link} to="/exchange-rate" sx={{ px: 2 }} color="inherit">
            Exchange rate (Live)
          </Button>
          <Button component={Link} to="/about" sx={{ px: 2 }} color="inherit">
            About
          </Button>
          <Button component={Link} to="/error_page" sx={{ px: 2 }} color="inherit">
            Error Page
          </Button>

          <FormControlLabel
            control={<Switch checked={darkMode} onChange={toggleTheme} />}
            sx={{ color: "white", ml: 2 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
