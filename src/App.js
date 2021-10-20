import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./CurrencyRow";
import rawData from "./data/rate.json";
let rates = rawData[0].rates;

function App() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [currencyOptions, setCurrencyOptions] = useState([]);

  let codes = [];
  for (let code in rates) {
    codes.push(
      <option value={code} key={code}>
        {code}
      </option>
    );
  }

  useEffect(() => {
    setCurrencyOptions([...Object.keys(rates)]);
    setFromCurrency("USD");
    setToCurrency("IDR");
  }, []);

  return (
    <>
      <header>Currency Converter</header>
      <form action="#">
        <div className="amount">
          <p>Enter Amount</p>
          <input type="text" />
        </div>
        <div className="drop-list">
          <div className="From">
            <p>From</p>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </div>
          <div className="icon">
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="To">
            <p>To</p>
            <CurrencyRow
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <div className="exchange-rate"></div>
        <button>Get Exchange Rate</button>
      </form>
    </>
  );
}

export default App;
