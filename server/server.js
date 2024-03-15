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

app.use(express.json());

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

app.post("/api/transaction", async (req, res) => {
  console.log(`Output: ${req.body.account_number}`);
  const {
    account_number,
    transaction_type,
    transaction_text,
    transaction_amount,
    transaction_date,
    transaction_source,
  } = req.body;

  console.log(account_number);
  console.log(transaction_type);
  console.log(transaction_text);
  console.log(transaction_amount);
  console.log(transaction_date);
  console.log(transaction_source);

  try {
    await addTransaction(
      account_number,
      transaction_type,
      transaction_text,
      transaction_amount,
      transaction_date,
      transaction_source
    );
    res.status(200).json(`Transaction Added Successfully!`);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({ error: "Error creating account" });
  }
});

app.delete("/api/transaction/:id", async (req, res) => {
  const transaction_id = req.params.id;

  try {
    await deleteTransaction(transaction_id);
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ error: "Error deleting transaction" });
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
