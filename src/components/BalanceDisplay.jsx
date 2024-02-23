import PropTypes from "prop-types";

export default function BalanceDisplay(props) {
  return (
    <>
      <div className="balance-container">
        <h4>your balance</h4>
        <h1 className="balance-display">{`£${props.balance}`}</h1>
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
