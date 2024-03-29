import React from "react";
import "./ExchangeResult.css";

export default function exchangeResult(props) {
  const { currencyValue, fromCurrency, toCurrency, rates } = props;

  // Base currency dari currencyapi adalah USD, sehingga perlu untuk mengubah mata uang menjadi USD sebelum menjadi mata uang yang diinginkan
  let amount = (rates[toCurrency] * currencyValue) / rates[fromCurrency];

  // Fungsi untuk mendapatkan nilai yang dipisahkan oleh koma (,) sebagai ribuan
  function getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  return (
    <div className="exchange-rate">
      {getDisplayNumber(amount)} {toCurrency}
    </div>
  );
}
