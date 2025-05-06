const useEMICalculator = () => {
    const calculateEMI = (amount, interestRate, termYears) => {
      const P = parseFloat(amount);
      const annualRate = parseFloat(interestRate);
      const N = parseFloat(termYears) * 12;
      const R = annualRate / 12 / 100;
  
      if (P <= 0 || annualRate <= 0 || N <= 0) {
        return { emi: 0, schedule: [] };
      }
  
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const schedule = [];
      let balance = P;
      let month = 1;
  
      while (balance > 0 && month <= N) {
        const interestPayment = balance * R;
        const principalPayment = emi - interestPayment;
        balance -= principalPayment;
  
        schedule.push({
          month,
          principal: principalPayment.toFixed(2),
          interest: interestPayment.toFixed(2),
          remainingBalance: balance < 0 ? "0.00" : balance.toFixed(2),
        });
  
        month++;
      }
  
      return { emi: emi.toFixed(2), schedule };
    };
  
    return { calculateEMI };
  };
  
  export default useEMICalculator;
  