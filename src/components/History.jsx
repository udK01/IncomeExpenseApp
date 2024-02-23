import Transaction from "./Transaction";

export default function History({ transactions }) {
  function displayTransactions() {
    return transactions.map((transaction, index) => (
      <Transaction
        key={index}
        text={transaction.text}
        liClassName={IncomeOrExpense(transaction.amount)}
        amount={transaction.amount}
      />
    ));
  }

  function IncomeOrExpense(n) {
    return n.toString().charAt(0) === "-" ? "moneyOut" : "moneyIn";
  }

  return (
    <>
      <h3>History</h3>
      <ul className="transactions-list">
        {displayTransactions()}
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
    </>
  );
}
