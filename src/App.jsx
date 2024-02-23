export default function App() {
  return (
    <>
      <div className="expense-tracker-container">
        <h2 className="expense-tracker-header">Expense Tracker</h2>

        <div className="container">
          <div className="balance-container">
            <h4>your balance</h4>
            <h1 className="balance-display">£5060.00</h1>
          </div>

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

          <h3>History</h3>
          <ul className="transactions-list">
            <li className="moneyIn">
              <button className="delete-btn">x</button>
              Cash
              <span>£400</span>
            </li>
            <li className="moneyOut">
              <button className="delete-btn">x</button>
              Cash
              <span>£100</span>
            </li>
          </ul>

          <h3>Add new transaction</h3>
          <form className="form">
            <div>
              <label for="text">Text</label>
              <input type="text" id="text" placeholder="Enter text..." />
            </div>
            <div>
              <label for="amount">
                Amount <br /> (negative - expense, positive-income)
              </label>
              <input type="number" id="amount" placeholder="Enter amount..." />
            </div>
            <button class="btn">Add transaction</button>
          </form>
        </div>
      </div>
    </>
  );
}
