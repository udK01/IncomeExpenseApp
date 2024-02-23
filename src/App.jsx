import IncomeExpenseDisplay from "./components/IncomeExpenseDisplay";
import BalanceDisplay from "./components/BalanceDisplay";
import NewTransaction from "./components/NewTransaction";
import History from "./components/History";
import { useState, useEffect } from "react";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const { income, expense } = calculateIncomeAndExpense();

  const handleNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  function handleTransactionDelete(index) {
    setTransactions(transactions.filter((_, i) => i !== index));
  }

  function calculateIncomeAndExpense() {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.amount >= 0) {
        income += transaction.amount;
      } else {
        expense += Math.abs(transaction.amount);
      }
    });

    return { income, expense };
  }

  return (
    <>
      <div className="expense-tracker-container">
        <h2 className="expense-tracker-header">Expense Tracker</h2>
        <div className="container">
          <BalanceDisplay balance={income - expense} />
          <IncomeExpenseDisplay income={income} expense={expense} />
          <History
            transactions={transactions}
            onTransactionDelete={handleTransactionDelete}
          />
          <NewTransaction onNewTransaction={handleNewTransaction} />
        </div>
      </div>
    </>
  );
}
