import ExpenseApp from "./components/ExpenseApp";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

import { useState, useEffect } from "react";

export default function App() {
  const [user, setUser] = useState("");
  const [rememberUser, setRememberUser] = useState(false);
  const [currentForm, setCurrentForm] = useState("Login");
  const [refresh, setRefresh] = useState("");

  useEffect(() => {
    if (user.length > 0) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [rememberUser]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  const toggleRefresh = () => {
    setRefresh(!refresh);
  };

  function handleLogin(userData, stayLoggedIn) {
    setUser(userData);
    setRememberUser(stayLoggedIn);
  }

  function handleLogout() {
    setUser([]);
    localStorage.removeItem("user");
  }

  return (
    <>
      {user.length == 0 ? (
        currentForm === "Login" ? (
          <Login onFormSwitch={toggleForm} onLogin={handleLogin} />
        ) : (
          <Register onFormSwitch={toggleForm} />
        )
      ) : (
        <div className="bank-container">
          <ExpenseApp
            account_number={user[0].account_number}
            username={user[0].username}
            onLogout={handleLogout}
            refresh={refresh}
            onRefresh={toggleRefresh}
          />
        </div>
      )}
    </>
  );
}
