import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import useExchangeRates from "../hooks/useExchangeRates"; 

const ExchangeRate = () => {
  const { currency,error } = useExchangeRates();

  

  if (error) {
    return <Typography color="error">Error in fetching data in ExchangeRate component: {error}</Typography>;
  }

  return (
    <TableContainer component={Paper} sx={{ px:3}}>
      <Table sx={{ minWidth: 300 }} aria-label="currency exchange rates">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">Rate (to USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(currency).map(([currencyCode, rate]) => (
            <TableRow key={currencyCode}>
              <TableCell>{currencyCode}</TableCell>
              <TableCell align="right">{rate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExchangeRate;
