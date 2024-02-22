export default function App() {
  let balance;
  let income;
  let expense;

  return (
    <>
      <div className="expense-tracker-container">
        <h2 className="expense-tracker-header">Expense Tracker</h2>

        <div className="balance-container">
          <h4>YOUR BALANCE</h4>
          <h4 className="balance-display">£0.00</h4>
        </div>

        <div className="income-expense-display">
          <div>
            <label>INCOME</label>
            <p className="income-text">£0.00</p>
          </div>
          <div>
            <label>EXPENSE</label>
            <p className="expense-text">£0.00</p>
          </div>
        </div>
      </div>
    </>
  );
}
