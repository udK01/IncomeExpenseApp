import IncomeExpenseDisplay from "./components/IncomeExpenseDisplay";
import BalanceDisplay from "./components/BalanceDisplay";
import NewTransaction from "./components/NewTransaction";
import History from "./components/History";
import { useState } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  const handleNewTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <>
      <div className="expense-tracker-container">
        <h2 className="expense-tracker-header">Expense Tracker</h2>
        <div className="container">
          <BalanceDisplay />
          <IncomeExpenseDisplay />
          <History transactions={transactions} />
          <NewTransaction onNewTransaction={handleNewTransaction} />
        </div>
      </div>
    </>
  );
}
