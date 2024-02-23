export default function IncomeExpenseDisplay() {
  return (
    <>
      <div className="income-expense-display">
        <div>
          <h4>INCOME</h4>
          <p className="income-text">£0.00</p>
        </div>
        <div className="money-border"></div>
        <div>
          <h4>EXPENSE</h4>
          <p className="expense-text">£0.00</p>
        </div>
      </div>
    </>
  );
}
