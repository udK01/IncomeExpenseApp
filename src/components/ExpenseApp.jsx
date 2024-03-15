import IncomeExpenseDisplay from "./IncomeExpenseDisplay";
import BalanceDisplay from "./BalanceDisplay";
import NewTransaction from "./NewTransaction";
import History from "./History";
import axios from "axios";

import { useState, useEffect } from "react";

export default function ExpenseApp({ id, user, update, setUpdate }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/transactions?account_number=${id}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

  const { income, expense } = calculateIncomeAndExpense();

  const handleNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleNewTransfer = (newTransfer) => {
    const transfereeTransactionsStr = localStorage.getItem(newTransfer.id);

    let transfereeTransactions = [];
    if (transfereeTransactionsStr) {
      transfereeTransactions = JSON.parse(transfereeTransactionsStr);
    }

    transfereeTransactions.unshift(newTransfer);

    const updatedTransfereeTransactionsStr = JSON.stringify(
      transfereeTransactions
    );

    localStorage.setItem(newTransfer.id, updatedTransfereeTransactionsStr);

    setUpdate("true");
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
        <h2 className="expense-tracker-header">{`${user}'s Expense Tracker`}</h2>
        <p className="account-number">Account number: {id}</p>
        <div className="container">
          <BalanceDisplay balance={income - expense} />
          <IncomeExpenseDisplay income={income} expense={expense} />
          <History
            transactions={transactions}
            onTransactionDelete={handleTransactionDelete}
          />
          <NewTransaction
            onNewTransaction={handleNewTransaction}
            onNewTransfer={handleNewTransfer}
            user={user}
            id={id}
          />
        </div>
      </div>
    </>
  );
}
