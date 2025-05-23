import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useExchangeRates from "../hooks/useExchangeRates";
import useEMICalculator from "../hooks/useEMICalculator";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Home = () => {
  const theme = useTheme();
  const [amt, setAmt] = useState(0);
  const [intrest, setIntrest] = useState(0);
  const [term, setTerm] = useState(0);
  const [emi, setEmi] = useState(0);
  const [schedule, setSchedule] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const { currency } = useExchangeRates();
  const { calculateEMI } = useEMICalculator();

  useEffect(() => {
    if (currency && selectedCurrency) {
      setEmi(0);
      setSchedule([]);
    }
  }, [currency, selectedCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { emi: calculatedEmi, schedule: amortizationSchedule } = calculateEMI(amt, intrest, term);
    setEmi(calculatedEmi);
    setSchedule(amortizationSchedule);
  };

  const convert = (amountUSD) => {
    const rate = currency[selectedCurrency] || 1;
    return (amountUSD * rate).toFixed(2);
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Loan EMI Schedule", 14, 20);

    doc.setFontSize(12);
    doc.text(`Loan Amount (USD): ${amt}`, 14, 30);
    doc.text(`Interest Rate: ${intrest}%`, 14, 37);
    doc.text(`Loan Term: ${term} years`, 14, 44);
    doc.text(`Monthly EMI: ${convert(emi)} ${selectedCurrency}`, 14, 51);

    const tableData = schedule.map((row) => [
      row.month,
      convert(row.principal),
      convert(row.interest),
      convert(row.remainingBalance),
    ]);

    autoTable(doc, {
      startY: 60,
      head: [["Month", "Principal", "Interest", "Remaining Balance"]],
      body: tableData,
      styles: { halign: "right" },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("Loan_Amortization_Schedule.pdf");
  };

  return (
    <Box sx={{ px: 3 }}>
      <Typography
        sx={{
          color: theme.palette.mode === "dark" ? "white" : "black",
          fontSize: 28,
          fontWeight: 500,
          mt: 10,
        }}
      >
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
            sx={{ width: 250, mt: 3 }}
          />
          <TextField
            required
            label="Interest Rate (%)"
            variant="outlined"
            type="number"
            onChange={(e) => setIntrest(e.target.value)}
            sx={{ width: 250, mt: 3 }}
          />
          <TextField
            required
            label="Loan Term (Years)"
            variant="outlined"
            type="number"
            onChange={(e) => setTerm(e.target.value)}
            sx={{ width: 250, mt: 3 }}
          />
        </Box>

        <Button type="submit" variant="contained" color="primary" sx={{ px: 2, mt: 3 }}>
          CALCULATE
        </Button>
      </form>

      {emi > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 3, flexWrap: "wrap" }}>
          <Typography sx={{ fontSize: 20 }}>
            Monthly EMI: {convert(emi)} {selectedCurrency}
          </Typography>

          {currency && Object.keys(currency).length > 0 && (
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
              >
                {Object.entries(currency).map(([currencyName]) => (
                  <MenuItem key={currencyName} value={currencyName}>
                    {currencyName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button variant="outlined" color="secondary" onClick={exportPDF}>
            Download PDF
          </Button>
        </Box>
      )}

      {emi > 0 && schedule.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table sx={{ minWidth: 500 }} aria-label="loan amortization schedule">
            <TableHead>
              <TableRow>
                <TableCell>Month</TableCell>
                <TableCell align="right">Principal ({selectedCurrency})</TableCell>
                <TableCell align="right">Interest ({selectedCurrency})</TableCell>
                <TableCell align="right">Remaining Balance ({selectedCurrency})</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedule.map((row) => (
                <TableRow key={row.month}>
                  <TableCell>{row.month}</TableCell>
                  <TableCell align="right">{convert(row.principal)}</TableCell>
                  <TableCell align="right">{convert(row.interest)}</TableCell>
                  <TableCell align="right">{convert(row.remainingBalance)}</TableCell>
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
