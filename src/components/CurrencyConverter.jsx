import React from "react";
import useCurrencyConverter from "../hooks/useCurrencyConverter";

const CurrencyConverter = ({ price, children }) => {
  const { localPrice, currency, loading, error } = useCurrencyConverter(price);

  if (loading) {
    return <div className="skeleton h-2 w-[20px] mx-auto my-2"></div>;
  }

  if (error) {
    return <span>{price}</span>;
  }

  return children({ localPrice, currency });
};

export default CurrencyConverter;