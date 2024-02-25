import ExpenseApp from "./components/ExpenseApp";

export default function App() {
  return (
    <>
      <div className="bank-container">
        <ExpenseApp bankName={"Lloyds"} />
        <ExpenseApp bankName={"RBS"} />
      </div>
    </>
  );
}
