import express from "express";
import cors from "cors";
import {
  getAccount,
  getAccountByAccountNumber,
  getAccountNames,
  addTransaction,
  getTransaction,
  getTransactions,
  getTransactionsFromUser,
  deleteTransaction,
} from "./database.js"; // Import database methods

const PORT = 8080;
const app = express();

// Other server-side code.
app.get("/api/account", async (req, res) => {
  const { username, password } = req.query;

  try {
    const account = await getAccount(username, password);
    res.json(account);
  } catch (error) {
    console.error("Error getting account:", error);
    res.status(500).json({ error: "Error getting account" });
  }
});

app.post("/api/account", async (req, res) => {
  const { username, password } = req.body;
  try {
    await createAccount(username, password);
    res.status(200).json();
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ error: "Error creating account" });
  }
});

app.get("/api/account_number", async (req, res) => {
  const account_number = req.query.account_number;
  try {
    const account = await getAccountByAccountNumber(account_number);
    res.status(200).json(account);
  } catch (error) {
    console.error("Failed to get account:", error);
    res.status(500).json({ error: "Error getting account" });
  }
});

app.get("/api/account_names", async (req, res) => {
  try {
    const account_names = await getAccountNames();
    res.json(account_names);
  } catch (error) {
    console.error("Error getting account names:", error);
    res.status(500).json({ error: "Error getting account names" });
  }
});

app.get("/api/transactions", async (req, res) => {
  const account_number = req.query.account_number;

  try {
    const transactions = await getTransactionsFromUser(account_number);
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Error fetching transactions" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
