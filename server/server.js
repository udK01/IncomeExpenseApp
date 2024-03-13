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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ error: "Internal server error. Please try again later." });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}.`);
});
