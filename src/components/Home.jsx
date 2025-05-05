import { Typography, TextField, Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const Home = () => {
  const theme = useTheme();
  const [amt, setAmt] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [term, setTerm] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(amt, intrest, term);
  };

  return (
    <Box sx={{ px: 5 }}>
      <Typography sx={{ color: "black", fontSize: 30, mt: 3 }}>
        Loan Calculator Dashboard
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <TextField
            required
            label="Loan Amount"
            variant="outlined"
            sx={{
              width: 250,
              mt: 3,
              [theme.breakpoints.down("sm")]: { width: "80vw" },
            }}
          />
          <TextField
            required
            label="Interest Rate (%)"
            variant="outlined"
            sx={{
              width: 250,
              mt: 3,
              [theme.breakpoints.down("sm")]: { width: "80vw" },
            }}
          />
          <TextField
            required
            label="Term (Years)"
            variant="outlined"
            sx={{
              width: 250,
              mt: 3,
              [theme.breakpoints.down("sm")]: { width: "80vw" },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ px: 2, mt: 3 }}
        >
          CALCULATE
        </Button>
      </form>
    </Box>
  );
};

export default Home;
