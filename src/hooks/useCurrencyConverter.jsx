import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useCurrencyConverter = (price) => {
  const [localPrice, setLocalPrice] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocationAndCurrency = async () => {
      try {
        setLoading(true);
        const locationResponse = await axios.get("https://ipapi.co/json/");

        const userCountryCode = locationResponse.data.currency;

        const conversionResponse = await axios.get(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );

        const rate = conversionResponse.data.rates[userCountryCode];

        if (rate) {
          setCurrency(userCountryCode);
          setLocalPrice((price * rate).toFixed(2));
        } else {
          setLocalPrice(price);
        }
      } catch (error) {
        toast.error("Error fetching location or conversion rate:", error);

        setLocalPrice(price);
      } finally {
        setLoading(false);
      }
    };

    fetchLocationAndCurrency();
  }, [price]);

  return { localPrice, currency, loading };
};

export default useCurrencyConverter;