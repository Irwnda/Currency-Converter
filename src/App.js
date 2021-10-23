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
  const [lastUpdate, setLastUpdate] = useState("");

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

        let date = new Date(myData[0].updated * 1000);
        setLastUpdate(date.toString());
      });
    setFromCurrency("USD");
    setToCurrency("IDR");
  }, []);
  // console.log(Object.keys(rates));

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
            onChange={(e) => {
              e.target.value = parseFloat(e.target.value);
              if (e.target.value <= 0) setCurrencyValue(0);
              else setCurrencyValue(e.target.value);
            }}
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
      <p style={{ color: "grey", fontSize: "12px" }}>Updated {lastUpdate}</p>
    </>
  );
}

export default App;
