import Transaction from "./Transaction";

export default function History(props) {
  function displayTransactions() {
    if (props.transactions.length !== 0) {
      return props.transactions.map((transaction, index) => (
        <Transaction
          key={index}
          index={index}
          text={transaction.text}
          liClassName={IncomeOrExpense(transaction.amount)}
          amount={transaction.amount}
          deleteTransaction={props.onTransactionDelete}
        />
      ));
    } else {
      return <li className="centered-li">No Transactions Yet.</li>;
    }
  }

  function IncomeOrExpense(n) {
    return n.toString().charAt(0) === "-" ? "moneyOut" : "moneyIn";
  }

  return (
    <>
      <h3>History</h3>
      <ul className="transactions-list">{displayTransactions()}</ul>
    </>
  );
}
