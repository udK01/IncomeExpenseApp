import PropTypes from "prop-types";

export default function Transaction(props) {
  function displayAmount() {
    if (props.amount < 0) {
      return `-£${Math.abs(props.amount)}`;
    }
    return `+£${props.amount}`;
  }

  return (
    <>
      <li className={props.liClassName}>
        <button
          className="delete-btn"
          onClick={() => props.deleteTransaction(props.index)}
        >
          x
        </button>
        {props.text}
        <span>{displayAmount()}</span>
      </li>
    </>
  );
}
Transaction.propTypes = {
  index: PropTypes.number,
  liClassName: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.number,
  deleteTransaction: PropTypes.func,
};
Transaction.defaultProps = {
  index: `0`,
  liClassName: `moneyIn`,
  text: `Cash`,
  amount: `0.00`,
  deleteTransaction: () => {
    console.log(`Forgot Delete Method`);
  },
};
