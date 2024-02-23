import PropTypes from "prop-types";

export default function Transaction(props) {
  const cleanAmount = props.amount.toString().replace(`-`, "");

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
        <span>{`£${cleanAmount}`}</span>
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
