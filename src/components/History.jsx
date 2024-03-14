import Transaction from "./Transaction";
import { useState, useEffect } from "react";

export default function History(props) {
  const [transactions, setTransactions] = useState(props.transactions);
  const [selectedOption, setSelectedOption] = useState("");
  const [historyFilter, setHistoryFilter] = useState("");
  const [filterChanged, setFilterChanged] = useState(false);

  useEffect(() => {
    setFilterChanged((prev) => !prev);
  }, [selectedOption, historyFilter]);

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
      console.log(transactions);
      return transactions.map((transaction, index) => (
        <Transaction
          key={index}
          index={index}
          text={transaction.transaction_text}
          liClassName={incomeOrExpense(transaction.transaction_amount)}
          amount={parseFloat(transaction.transaction_amount)}
          deleteTransaction={props.onTransactionDelete}
          date={transaction.transaction_date}
          type={transaction.transaction_type}
          source={transaction.transaction_source}
          inspect={props.inspect}
          handleInspect={handleInspect}
          filterChanged={filterChanged}
        />
      ));
    } else {
      return (
        <li>
          <div className="empty-list">No Transactions Yet</div>
        </li>
      );
    }
  }

  function incomeOrExpense(n) {
    return n < 0 ? "moneyOut" : "moneyIn";
  }

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

  function handleInspect(index, x) {
    setTransactions((prevTransactions) => {
      return prevTransactions.map((transaction, i) => {
        return index === i ? { ...transaction, inspect: x } : transaction;
      });
    });
    setFilterChanged(false);
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
