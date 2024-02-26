import PropTypes from "prop-types";

export default function BalanceDisplay(props) {
  function displayBalance() {
    if (props.balance < 0) {
      return `-£${Math.abs(props.balance).toFixed(2)}`;
    }
    return `£${props.balance.toFixed(2)}`;
  }

  return (
    <>
      <div className="balance-container">
        <h4>your balance</h4>
        <h1 className="balance-display">{`${displayBalance()}`}</h1>
      </div>
    </>
  );
}
BalanceDisplay.propTypes = {
  balance: PropTypes.number,
};
BalanceDisplay.defaultProps = {
  balance: `0.00`,
};
