import React, { useState } from "react";
import { Routes, Route} from "react-router-dom";
import { CssBaseline,  } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar"; 
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import ExchangeRate from "./components/ExchangeRate";

const App = () => {
  

 

  return (
    <div style={{ overflowX: "hidden" }}> 
      <ThemeProvider>
      <CssBaseline />

     
      <Navbar /> 

     

     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/error_page" element={<ErrorPage />} />
        <Route path="/exchange_rate" element={<ExchangeRate/>} />
      </Routes>
      </ThemeProvider>
    </div>
  );
};

export default App;
