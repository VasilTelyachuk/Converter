import React, { Fragment } from "react";
import "./ConverterInput.css";

const ConverterInput = (props) => {
  return (
    <Fragment>
      <div className="converter-box">
        <label htmlFor="number of units to convert"></label>
        <input
          className="converter-box__input"
          type="number"
          value={props.amount}
          onChange={(event) => props.onAmountChange(event.target.value)}
          placeholder="Кол-ство"
        ></input>
        <select
          className="converter-box__select"
          name="currency"
          value={props.currency}
          onChange={(event) => props.onCurrencyChange(event.target.value)}
        >
          {props.currencies.map((currency) => (
            <option key={Math.random().toString()} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

export default ConverterInput;
