import Transaction from "./Transaction";
import { useState, useEffect } from "react";

export default function History(props) {
  const [transactions, setTransactions] = useState(props.transactions);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (selectedOption === "Ascending") {
      setTransactions(
        [...props.transactions].sort((a, b) => a.amount - b.amount)
      );
    } else if (selectedOption === "Descending") {
      setTransactions(
        [...props.transactions].sort((a, b) => b.amount - a.amount)
      );
    }
  }, [selectedOption, props.transactions]);

  function displayTransactions() {
    if (transactions.length !== 0) {
      return transactions.map((transaction, index) => (
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
      <div id="history-container" className="underline">
        <h3>History</h3>
        <select
          id="dropdown-filter"
          value={selectedOption}
          onChange={handleSelectChange}
          className="history-filter"
        >
          <option value={""}>-- Please Select --</option>
          <option value={"Ascending"}>Ascending</option>
          <option value={"Descending"}>Descending</option>
        </select>
      </div>
      <ul className="transactions-list">{displayTransactions()}</ul>
    </>
  );
}
