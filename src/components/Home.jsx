import { Typography, TextField, Box, Button, Table,Select, MenuItem, InputLabel, FormControl, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const theme = useTheme();
  const [amt, setAmt] = useState(0); 
  const [intrest, setIntrest] = useState(0);
  const [term, setTerm] = useState(0); 
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [currency, setCurrency] = useState({})


  // useEffect(()=>{
    

    
  // })


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get("https://v6.exchangerate-api.com/v6/50d6802b0be655ec4437f800/latest/USD").then((res)=>setCurrency(res.data.conversion_rates)
    )


    const P = parseFloat(amt); 
    const annualRate = parseFloat(intrest);
    const N = parseFloat(term) * 12; // Convert years to months

    if (P <= 0 || annualRate <= 0 || N <= 0) {
      alert("Please enter valid positive values.");
      return;
    }

    const R = annualRate / 12 / 100; // let take R = 12 that is 12%  => 12/12 = 1%  that is monthly then convert into decimal

    // EMI Calculation in USD
    const emiCalc =
      (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);

    setEmi(emiCalc.toFixed(2));

    // Generate amortization schedule
    const amortizationSchedule = [];
    let balance = P;
    let month = 1;

    while (balance > 0) {
      const interestPayment = balance * R;
      const principalPayment = emiCalc - interestPayment;
      balance = balance - principalPayment;

      amortizationSchedule.push({
        month: month,
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        remainingBalance: balance.toFixed(2),
      });

      month++;
      if (balance < 0) balance = 0; 
    }

    setSchedule(amortizationSchedule);
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
            label="Loan Amount (USD)"
            variant="outlined"
            type="number"
            onChange={(e) => setAmt(e.target.value)}
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
            type="number"
            onChange={(e) => setIntrest(e.target.value)}
            sx={{
              width: 250,
              mt: 3,
              [theme.breakpoints.down("sm")]: { width: "80vw" },
            }}
          />
          <TextField
            required
            label="Loan Term (Years)"
            variant="outlined"
            type="number"
            onChange={(e) => setTerm(e.target.value)}
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

      {emi > 0 && <Typography sx={{fontSize:20, mt:2}}>Monthly EMI: ${emi}</Typography>}

      {Object.keys(currency).length > 0 && (
  <FormControl sx={{ mt: 3, width:100 }}>
    <InputLabel id="currency-label">Currency</InputLabel>
    <Select labelId="currency-label" label="Currency">
      {Object.entries(currency).map(([currencyName, currencyCode]) => (
        <MenuItem key={currencyCode} value={currencyCode}>
          {currencyName}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)}


      {emi > 0 && schedule.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="loan amortization schedule">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Principal (USD)</TableCell>
                <TableCell align="right">Interest (USD)</TableCell>
                <TableCell align="right">Remaining Balance (USD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{row.principal}</TableCell>
                  <TableCell align="right">{row.interest}</TableCell>
                  <TableCell align="right">{row.remainingBalance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Home;
