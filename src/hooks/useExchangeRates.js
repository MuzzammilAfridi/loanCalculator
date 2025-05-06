import { useState, useEffect } from "react";
import axios from "axios";



const useExchangeRates = () => {
  const [currency, setCurrency] = useState({});  
  const [error, setError] = useState(null);
  

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const res = await axios.get("https://v6.exchangerate-api.com/v6/6859c7d213143cb1f96f9722/latest/USD");
        setCurrency(res.data.conversion_rates); 
       
      } catch (err) {
        setError("Data fetching failed in Exchange hook");
       
        console.error(err); 
      }
    };

    fetchRates();
  }, []);

  return { currency, error};  
};

export default useExchangeRates;
