import IncomeExpenseDisplay from "./IncomeExpenseDisplay";
import BalanceDisplay from "./BalanceDisplay";
import NewTransaction from "./NewTransaction";
import History from "./History";
import axios from "axios";

import { useState, useEffect } from "react";

export default function ExpenseApp(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/transactions?account_number=${props.account_number}`)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, [props.refresh]);

  const { income, expense } = calculateIncomeAndExpense();

  const handleNewTransaction = (newTransaction) => {
    axios
      .post(
        "/api/transaction",
        {
          account_number: newTransaction.account_number,
          transaction_type: newTransaction.type,
          transaction_text: newTransaction.text,
          transaction_amount: newTransaction.amount,
          transaction_date: newTransaction.date,
          transaction_source: newTransaction.source,
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then(() => {
        props.onRefresh();
      })
      .catch((error) => {
        console.error("Failed to add transaction:", error);
      });
  };

  function handleTransactionDelete(transaction_id) {
    axios
      .delete(`/api/transaction/${transaction_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        props.onRefresh();
      })
      .catch((error) => {
        console.error("Failed to delete transaction:", error);
      });
  }

  function calculateIncomeAndExpense() {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.transaction_amount >= 0) {
        income += parseFloat(transaction.transaction_amount);
      } else {
        expense += Math.abs(parseFloat(transaction.transaction_amount));
      }
    });

    return { income, expense };
  }

  return (
    <>
      <div className="expense-tracker-container">
        <div className="navigation-bar">
          <div className="header-content">
            <h2 className="expense-tracker-header">{`${props.username}'s Expense Tracker`}</h2>
            <p className="account-number">
              Account number: {props.account_number}
            </p>
          </div>
          <button className="logout-btn" onClick={props.onLogout}>
            Logout
          </button>
        </div>
        <div className="container">
          <BalanceDisplay balance={income - expense} />
          <IncomeExpenseDisplay income={income} expense={expense} />
          <History
            transactions={transactions}
            onTransactionDelete={handleTransactionDelete}
          />
          <NewTransaction
            onNewTransaction={handleNewTransaction}
            account_number={props.account_number}
            username={props.username}
          />
        </div>
      </div>
    </>
  );
}
