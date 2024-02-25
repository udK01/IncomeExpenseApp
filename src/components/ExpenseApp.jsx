import IncomeExpenseDisplay from "./IncomeExpenseDisplay";
import BalanceDisplay from "./BalanceDisplay";
import NewTransaction from "./NewTransaction";
import History from "./History";

import { useState, useEffect } from "react";

export default function ExpenseApp({ bankName }) {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(bankName);
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });

  useEffect(() => {
    localStorage.setItem(bankName, JSON.stringify(transactions));
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
          <NewTransaction
            onNewTransaction={handleNewTransaction}
            bankName={bankName}
          />
        </div>
      </div>
    </>
  );
}
