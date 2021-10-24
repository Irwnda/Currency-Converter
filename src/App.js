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
    // Mendapatkan file dari rate.json yang ada di folder (public/)data
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
        // Menyimpan semua rate
        setRates(myData[0].rates);

        // Mendapatkan waktu kapan rate disimpan
        let date = new Date(myData[0].updated * 1000);
        setLastUpdate(date.toString());
      });

    // Secara default, Converter akan mengatur dari USD ke IDR
    setFromCurrency("USD");
    setToCurrency("IDR");
  }, []);
  // console.log(Object.keys(rates));

  // Mendapatkan semua mata uang yang tersedia pada file rate.json
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

        {/* Semua list mata uang yang tersedia */}
        <div className="drop-list">
          {/* Mata uang asal */}
          <div className="From">
            <p>From</p>
            <CurrencyRow
              currencyOptions={Object.keys(rates)}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
            />
          </div>

          {/* Icon untuk menukar dua mata uang */}
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

          {/* Mata uang tujuan */}
          <div className="To">
            <p>To</p>
            <CurrencyRow
              currencyOptions={Object.keys(rates)}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>

        {/* Hasil konversi */}
        <ExchangeResult
          currencyValue={currencyValue}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          rates={rates}
        />
      </form>

      {/* Informasi update rate */}
      <p style={{ color: "grey", fontSize: "12px" }}>Updated {lastUpdate}</p>
    </>
  );
}

export default App;
