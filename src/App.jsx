import ExpenseApp from "./components/ExpenseApp";
// import Register from "./components/Register/Register";
// import Login from "./components/Login/Login";

import { useState } from "react";

export default function App() {
  const [update, setUpdate] = useState("");
  const [currentForm, setCurrentForm] = useState("Login");

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <>
      {/* {currentForm === "Login" ? (
        <Login onFormSwitch={toggleForm} />
      ) : (
        <Register onFormSwitch={toggleForm} />
      )} */}
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
        {/* <ExpenseApp
          id={33690320}
          user={"Trafford"}
          forceUpdateToggle={forceUpdateToggle}
        /> */}
      </div>
    </>
  );
}
