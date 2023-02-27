import React from "react";
import "./ExchangeRateItem.css";

const ExchangeRateItem = (props) => {
  return (
    <li className="header__item">
      <span className="header__text">{`${props.title} : ${props.value}`}</span>
    </li>
  );
};

export default ExchangeRateItem;
