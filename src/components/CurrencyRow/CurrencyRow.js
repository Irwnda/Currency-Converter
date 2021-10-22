import React from "react";
import "./CurrencyRow.css";

const noncountry = [
  "BCH",
  "BTC",
  "BTG",
  "DASH",
  "EOS",
  "LTC",
  "XAF",
  "XAG",
  "XAU",
  "XCD",
  "XLM",
  "XOF",
  "XRP",
];
const img_src = [
  "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png",
  "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  "https://cryptologos.cc/logos/bitcoin-gold-btg-logo.png",
  "https://cryptologos.cc/logos/dash-dash-logo.png",
  "https://cryptologos.cc/logos/eos-eos-logo.png",
  "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  "/img/xaf.png", //https://www.beac.int
  "/img/xag.png", //https://www.kindpng.com/imgv/iJoRohh_custom-minted-round-one-troy-ounce-silver-src/
  "/img/xau.png", //https://id.aliexpress.com/item/32819041192.html
  "/img/xcd.png", //https://www.pngegg.com/en/png-eitiy
  "https://cryptologos.cc/logos/stellar-xlm-logo.png",
  "/img/xof.png", //https://www.bceao.int
  "https://cryptologos.cc/logos/xrp-xrp-logo.png",
];

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;
  let img = "";
  if (selectedCurrency && selectedCurrency.length) {
    let src;
    if (noncountry.includes(selectedCurrency))
      if (["XAF", "XAG", "XAU", "XCD", "XOF"].includes(selectedCurrency))
        src =
          process.env.PUBLIC_URL +
          img_src[noncountry.indexOf(selectedCurrency)];
      else src = img_src[noncountry.indexOf(selectedCurrency)];
    else
      src =
        "https://flagcdn.com/w20/" +
        selectedCurrency.slice(0, 2).toLowerCase() +
        ".png";
    img = <img src={src} alt={selectedCurrency} />;
  }
  return (
    <div className="select-box">
      {img}
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
