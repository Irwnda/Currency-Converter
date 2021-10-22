import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./components/CurrencyRow/CurrencyRow";
import ExchangeResult from "./components/ExchangeResult/ExchangeResult";
// import rawData from "./components/data/rate.json";
// let rates = rawData[0].rates;

function App() {
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [currencyValue, setCurrencyValue] = useState(1);
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch("data/rate.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (myData) {
        setRates(myData[0].rates);
      });
    setFromCurrency("USD");
    setToCurrency("IDR");
  }, []);
  console.log(Object.keys(rates));

  let codes = [];
  for (let code in rates) {
    codes.push(
      <option value={code} key={code}>
        {code}
      </option>
    );
  }

  return (
    <>
      <header>Currency Converter</header>
      <form action="#">
        <div className="amount">
          <p>Enter Amount</p>
          <input
            type="number"
            value={currencyValue}
            onChange={(e) => setCurrencyValue(Math.abs(e.target.value))}
          />
        </div>
        <div className="drop-list">
          <div className="From">
            <p>From</p>
            <CurrencyRow
              currencyOptions={Object.keys(rates)}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </div>
          <div
            className="icon"
            onClick={() => {
              let temp = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(temp);
            }}
          >
            <i className="fas fa-exchange-alt"></i>
          </div>
          <div className="To">
            <p>To</p>
            <CurrencyRow
              currencyOptions={Object.keys(rates)}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <ExchangeResult
          currencyValue={currencyValue}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rates={rates}
        />
      </form>
    </>
  );
}

export default App;
