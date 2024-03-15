import DetailedTransaction from "./DetailedTransaction";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

export default function Transaction(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [inspect, setInspect] = useState(props.inspect);

  useEffect(() => {
    if (props.filterChanged) {
      setInspect(false);
      props.handleInspect(props.index, false);
    }
  }, [props.filterChanged]);

  function displayAmount() {
    if (props.amount < 0) {
      return `-£${Math.abs(props.amount)}`;
    }
    return `+£${props.amount}`;
  }

  function handleMouseOver() {
    setShowTooltip(true);
  }

  function handleMouseOut() {
    setShowTooltip(false);
  }

  function handleInspect(index, x) {
    setInspect(x);
    props.handleInspect(index, x);
    setShowTooltip(false);
  }

  if (inspect) {
    return (
      <DetailedTransaction
        {...props}
        displayAmount={displayAmount}
        handleInspect={handleInspect}
      />
    );
  }

  return (
    <>
      <li
        className={props.liClassName}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <button
          className="delete-btn"
          onClick={() => props.deleteTransaction(props.transaction_id)}
        >
          x
        </button>
        {props.text}
        <span>{displayAmount()}</span>
        {showTooltip && (
          <img
            src="../../src/assets/details.svg"
            className="transaction-details"
            onClick={() => handleInspect(props.index, true)}
          />
        )}
      </li>
    </>
  );
}
Transaction.propTypes = {
  index: PropTypes.number,
  transaction_id: PropTypes.number,
  liClassName: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.number,
  deleteTransaction: PropTypes.func,
  date: PropTypes.string,
  type: PropTypes.string,
  source: PropTypes.string,
  inspect: PropTypes.bool,
  handleInspect: PropTypes.func,
};
Transaction.defaultProps = {
  index: `0`,
  transaction_id: `0`,
  liClassName: `moneyIn`,
  text: `Cash`,
  amount: `0.00`,
  deleteTransaction: () => {
    console.log(`Forgot Delete Method`);
  },
  date: `12/12/2024 - 00:00:00`,
  type: `Add`,
  source: `Santa`,
  inspect: false,
  handleInspect: () => {},
};
