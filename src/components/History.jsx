import Transaction from "./Transaction";
import { useState, useEffect } from "react";

export default function History(props) {
  const [transactions, setTransactions] = useState(props.transactions);
  const [selectedOption, setSelectedOption] = useState("");
  const [historyFilter, setHistoryFilter] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  function handleHistoryFilterChange(e) {
    const clickedButton = e.target;
    setHistoryFilter(clickedButton.textContent);

    if (historyFilter !== clickedButton.textContent) {
      const otherButtonId =
        clickedButton.id === "incomeBtn" ? "expenseBtn" : "incomeBtn";
      document.getElementById(otherButtonId).classList.remove("btnPressed");
      clickedButton.classList.toggle("btnPressed");
      setSelectedOption("");
    } else {
      clickedButton.classList.remove("btnPressed");
      setHistoryFilter("");
      setSelectedOption("");
    }
  }

  useEffect(() => {
    switch (selectedOption) {
      case "Ascending":
        setTransactions((prevTransactions) =>
          [...prevTransactions].sort((a, b) => a.amount - b.amount)
        );
        break;
      case "Descending":
        setTransactions((prevTransactions) =>
          [...prevTransactions].sort((a, b) => b.amount - a.amount)
        );
        break;
      default:
        setTransactions(props.transactions);
    }
  }, [selectedOption, props.transactions]);

  useEffect(() => {
    switch (historyFilter) {
      case "Income":
        setTransactions(
          props.transactions.filter((transaction) => transaction.amount >= 0)
        );
        break;
      case "Expense":
        setTransactions(
          props.transactions.filter((transaction) => transaction.amount <= 0)
        );
        break;
      default:
        setTransactions(props.transactions);
    }
  }, [historyFilter, props.transactions]);

  function displayTransactions() {
    if (transactions.length !== 0) {
      return transactions.map((transaction, index) => (
        <Transaction
          key={index}
          index={index}
          text={transaction.text}
          liClassName={incomeOrExpense(transaction.amount)}
          amount={transaction.amount}
          deleteTransaction={props.onTransactionDelete}
        />
      ));
    } else {
      return <li className="centered-li">No Transactions Yet.</li>;
    }
  }

  function incomeOrExpense(n) {
    return n < 0 ? "moneyOut" : "moneyIn";
  }

  return (
    <>
      <div id="history-container" className="underline">
        <h3>History</h3>
        <button
          id="incomeBtn"
          className="income-filter-btn"
          onClick={handleHistoryFilterChange}
        >
          Income
        </button>
        <button
          id="expenseBtn"
          className="expense-filter-btn"
          onClick={handleHistoryFilterChange}
        >
          Expense
        </button>
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
