import React from "react";
import "./CurrencyRow.css";

// Mata uang perserikatan negara dan mata uang crypto
const noncountry = [
  "BCH",
  "BTC",
  "BTG",
  "DASH",
  "EOS",
  "ETH",
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
  "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  "/img/xaf.png", //https://www.beac.int
  "/img/xag.png", //https://www.kindpng.com/imgv/iJoRohh_custom-minted-round-one-troy-ounce-silver-src/
  "/img/xau.png", //https://id.aliexpress.com/item/32819041192.html
  "/img/xcd.png", //https://www.pngegg.com/en/png-eitiy
  "https://cryptologos.cc/logos/stellar-xlm-logo.png",
  "/img/xof.png", //https://www.bceao.int
  "https://cryptologos.cc/logos/xrp-xrp-logo.png",
];
// XAF, XAG, XAU, XCD, XOF bukan merupakan mata uang suatu negara sendiri, melainkan mata uang dari organisasi beberapa negara seperti halnya ASEAN, sehingga bendera tidak terdapat pada flagcdn.com

export default function CurrencyRow(props) {
  const { currencyOptions, selectedCurrency, onChangeCurrency } = props;

  let img = "";
  if (selectedCurrency && selectedCurrency.length) {
    let src;
    if (noncountry.includes(selectedCurrency))
      if (["XAF", "XAG", "XAU", "XCD", "XOF"].includes(selectedCurrency))
        // Karena gambar disimpan pada folder public
        src =
          process.env.PUBLIC_URL +
          img_src[noncountry.indexOf(selectedCurrency)];
      // Mata uang diambil dari cryptologos.cc karena merupakan mata uang crypto
      else src = img_src[noncountry.indexOf(selectedCurrency)];
    // Selain itu merupakan mata uang negara
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
          // Memetakan semua mata uang dari rate.json
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
