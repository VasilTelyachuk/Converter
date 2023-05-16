import React, { Fragment, useState, useEffect, useCallback } from "react";
import ExchangeRatesList from "./components/ExchangeRatesList";
import ConverterInput from "./components/ConverterInput";

// import ErrorModal from '../UI/ErrorModal';
import "./App.css";

function App() {
  const [rates, setRates] = useState([]);
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("UAH");
  const [toCurrency, setToCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRates = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch("https://www.cbr-xml-daily.ru/latest.js");
      if (!response.ok) {
        throw new Error("Error. Something went wrong.");
      }
      const responseData = await response.json();
      // console.log(responseData);
      
      setRates(responseData.rates);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchRates();
    setInterval(() => {
      fetchRates();
    }, 9000000);
    return () => {
      clearInterval(fetchRates);
    };
  }, [fetchRates]);

  let onAmountChangeHandler = useCallback(
    (fromAmount) => {
      setToAmount(
        ((fromAmount * rates[toCurrency]) / rates[fromCurrency]).toFixed(2)
      );
      setFromAmount(fromAmount);
    },
    [toCurrency, fromCurrency, rates]
  );

  const toAmountChangeHandler = (toAmount) => {
    setFromAmount(
      ((toAmount * rates[fromCurrency]) / rates[toCurrency]).toFixed(2)
    );
    setToAmount(toAmount);
  };

  const onCurrencyChangeHandler = (fromCurrency) => {
    setToAmount(
      ((fromAmount * rates[toCurrency]) / rates[fromCurrency]).toFixed(2)
    );
    setFromCurrency(fromCurrency);
  };

  const toCurrencyChangeHandler = (toCurrency) => {
    setFromAmount(
      ((toAmount * rates[fromCurrency]) / rates[toCurrency]).toFixed(2)
    );
    setToCurrency(toCurrency);
  };

  useEffect(() => {
    if (rates) {
      onAmountChangeHandler(1);
    }
  }, [rates, onAmountChangeHandler]);

  let content = (
    <div>
      <header>
        <ExchangeRatesList currenciesList={rates} />
      </header>
      <main>
        <h2 className="main__title">Конвертер валют</h2>
        <ConverterInput
          currencies={Object.keys(rates)}
          amount={fromAmount}
          currency={fromCurrency}
          onAmountChange={onAmountChangeHandler}
          onCurrencyChange={onCurrencyChangeHandler}
        />
        <ConverterInput
          currencies={Object.keys(rates)}
          amount={toAmount}
          currency={toCurrency}
          onAmountChange={toAmountChangeHandler}
          onCurrencyChange={toCurrencyChangeHandler}
        />                 
      </main>
      ;
    </div>
  );

  if (error) {
    content = (
      <section className="main__info-window">
        <p>{error.message}</p>
      </section>
    );
  }

  if (isLoading) {
    content = (
      <section className="main__info-window">
        <p>Loading...</p>
      </section>
    );
  }

  // if (+fromAmount < 0 || +toAmount < 0) {
  //   setError({
  //     title: 'Invalid number',
  //     message: 'Please enter a valid number (> 0).',
  //   });
  //   return;
  // }

  return <Fragment>{content}</Fragment>;
}

export default App;
