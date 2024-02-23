import PropTypes from "prop-types";

export default function IncomeExpenseDisplay(props) {
  return (
    <>
      <div className="income-expense-display">
        <div>
          <h4>INCOME</h4>
          <p className="income-text">{`£${props.income}`}</p>
        </div>
        <span className="money-border"></span>
        <div>
          <h4>EXPENSE</h4>
          <p className="expense-text">{`£${props.expense}`}</p>
        </div>
      </div>
    </>
  );
}
IncomeExpenseDisplay.propTypes = {
  income: PropTypes.number,
  expense: PropTypes.number,
};
IncomeExpenseDisplay.defaultProps = {
  income: `0.00`,
  expense: `0.00`,
};
