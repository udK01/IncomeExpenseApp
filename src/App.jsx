import ExpenseApp from "./components/ExpenseApp";
import { useState } from "react";

export default function App() {
  const [update, setUpdate] = useState("");

  return (
    <>
      <div className="bank-container">
        <ExpenseApp
          id={65783561}
          user={"Sam"}
          update={update}
          setUpdate={setUpdate}
        />
        <ExpenseApp
          id={36704960}
          user={"Corben"}
          update={update}
          setUpdate={setUpdate}
        />
        {/* <ExpenseApp id={33690320} user={"Trafford"} forceUpdateToggle={forceUpdateToggle} /> */}
      </div>
    </>
  );
}
