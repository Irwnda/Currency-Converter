import React from "react";
import rawData from "./data/rate.json";

export default function rawRatesData(props) {
  let onChangeCurrency = props.onChangeCurrency;

  let rates = rawData[0].rates;
  // console.log(rates);
  let codes = [],
    selectedCurrency;

  if (props.id === "From") selectedCurrency = "USD";
  else selectedCurrency = "IDR";

  for (let code in rates) {
    // let selected;
    // if (props.id === "From") selected = code === "USD" ? "selected" : "";
    // else selected = code === "IDR" ? "selected" : "";
    codes.push(
      <option value={code} key={code}>
        {code}
      </option>
    );
  }
  return (
    <select value={selectedCurrency} onChange={onChangeCurrency}>
      {codes}
    </select>
  );
}
