import styles from "./Register.module.css";
import { useState } from "react";

export default function Register(props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);
    console.log(username);
    console.log(password);
  };

  return (
    <>
      <form className={styles["register-form"]} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className={styles["input-container"]}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@gmail.com"
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your-username..."
          />
        </div>
        <div className={styles["input-container"]}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button
        className={styles["link-btn"]}
        onClick={() => props.onFormSwitch("Login")}
      >
        Already have an account? Login here.
      </button>
    </>
  );
}
