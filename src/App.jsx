import React from "react";
import { Routes, Route } from "react-router-dom";
import { Button, Typography, CssBaseline } from "@mui/material";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

const App = () => {
  return (
    <div>
      <CssBaseline />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>}/>
      </Routes>
    </div>
  );
};

export default App;
