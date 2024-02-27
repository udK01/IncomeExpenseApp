import ExpenseApp from "./components/ExpenseApp";

export default function App() {
  return (
    <>
      <div className="bank-container">
        <ExpenseApp id={65783561} user={"Sam"} />
        {/* <ExpenseApp id={36704960} user={"Corben"} /> */}
        <ExpenseApp id={33690320} user={"Trafford"} />
      </div>
    </>
  );
}
