import React, { Fragment } from "react";
import ExchangeRateItem from "./ExchangeRateItem";
import "./ExchangeRatesList.css";

const ExchangeRatesList = (props) => {
  let currencies = [];
  for (let key in props.currenciesList) {
    currencies.push({ title: key, value: props.currenciesList[key] });
  }
  let primaryCurrencies = currencies.filter(
    (item) =>
      item.title === "USD" ||
      item.title === "EUR" ||
      item.title === "PLN" ||
      item.title === "GBP"
  );

  const rateFunction = (value) => {
    return (props.currenciesList["UAH"] / props.currenciesList[value]).toFixed(
      2
    );
  };

  return (
    <Fragment>
      <section className="header__conteiner">
        <span className="header__info">Курс Валют :</span>
        <ul className="header__list">
          {primaryCurrencies.map((primaryCurrency) => (
            <ExchangeRateItem
              key={Math.random().toString()}
              currencyList={props.currenciesList}
              title={primaryCurrency.title}
              value={rateFunction(String(primaryCurrency.title))}
            />
          ))}
        </ul>
      </section>
    </Fragment>
  );
};

export default ExchangeRatesList;
