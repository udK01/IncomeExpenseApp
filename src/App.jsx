import IncomeExpenseDisplay from "./components/IncomeExpenseDisplay";
import BalanceDisplay from "./components/BalanceDisplay";
import NewTransaction from "./components/NewTransaction";
import History from "./components/History";

export default function App() {
  return (
    <>
      <div className="expense-tracker-container">
        <h2 className="expense-tracker-header">Expense Tracker</h2>
        <div className="container">
          <BalanceDisplay />
          <IncomeExpenseDisplay />
          <History />
          <NewTransaction />
        </div>
      </div>
    </>
  );
}
