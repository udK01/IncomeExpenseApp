import ExpenseApp from "./components/ExpenseApp";

export default function App() {
  return (
    <>
      <div className="bank-container">
        <ExpenseApp user={"Sam"} />
        {/* <ExpenseApp user={"Corben"} />
        <ExpenseApp user={"Trafford"} /> */}
      </div>
    </>
  );
}
