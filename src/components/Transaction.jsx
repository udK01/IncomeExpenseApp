import PropTypes from "prop-types";

export default function Transaction(props) {
  const cleanAmount = props.amount.toString().replace(`-`, "");

  return (
    <>
      <li className={props.liClassName}>
        <button className="delete-btn">x</button>
        {props.text}
        <span>{`£${cleanAmount}`}</span>
      </li>
    </>
  );
}
Transaction.propTypes = {
  liClassName: PropTypes.string,
  text: PropTypes.string,
  amount: PropTypes.number,
};
Transaction.defaultProps = {
  liClassName: "moneyIn",
  text: "Cash",
  amount: `0.00`,
};
