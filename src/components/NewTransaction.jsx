import { useState, useEffect } from "react";
import axios from "axios";

export default function NewTransaction({
  onNewTransaction,
  onNewTransfer,
  account_number,
  username,
}) {
  const [optionSelected, setOptionSelected] = useState("Add");
  const [displayAddTransaction, setDisplayAddTransaction] = useState(false);
  const [displayTransferTransaction, setDisplayTransferTransaction] =
    useState(false);
  const [displayWithdrawTransaction, setDisplayWithdrawTransaction] =
    useState(false);
  const textName = `${username}Text`;
  const amountName = `${username}Amount`;
  const accountName = `${username}-${account_number}`;

  useEffect(() => {
    switch (optionSelected) {
      case "Add":
        setDisplayAddTransaction(true);
        setDisplayWithdrawTransaction(false);
        setDisplayTransferTransaction(false);
        break;
      case "Transfer":
        setDisplayAddTransaction(false);
        setDisplayWithdrawTransaction(false);
        setDisplayTransferTransaction(true);
        break;
      case "Withdraw":
        setDisplayAddTransaction(false);
        setDisplayWithdrawTransaction(true);
        setDisplayTransferTransaction(false);
        break;
      default:
        setDisplayAddTransaction(true);
        setDisplayWithdrawTransaction(false);
        setDisplayTransferTransaction(false);
    }
  }, [optionSelected]);

  const handleNewAddTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById(textName).value;
    const amountInput = validateAmount(
      document.getElementById(amountName).value,
      true
    );

    if (validateFields(textInput, amountInput)) {
      const newTransaction = {
        account_number: account_number,
        type: `Add`,
        text: textInput,
        amount: parseFloat(amountInput),
        date: getDateAndTime(),
        source: username,
      };

      onNewTransaction(newTransaction);

      document.getElementById(textName).value = "";
      document.getElementById(amountName).value = "";
    } else {
      console.error(`Invalid Input For Amount!`);
    }
  };

  const handleNewWithdrawTransaction = (e) => {
    e.preventDefault();

    const amountInput = validateAmount(
      document.getElementById(amountName).value,
      true
    );

    if (validateFields(amountInput)) {
      const newTransaction = {
        account_number: account_number,
        type: `Withdraw`,
        text: "Withdrawn 💲",
        amount: parseFloat(amountInput) * -1,
        date: getDateAndTime(),
        source: username,
      };

      onNewTransaction(newTransaction);

      document.getElementById(amountName).value = "";
    } else {
      console.error(`Invalid Input For Amount!`);
    }
  };

  const handleNewTransferTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById(textName).value;
    const amountInput = validateAmount(
      document.getElementById(amountName).value,
      true
    );
    const accountNumber = document.getElementById(accountName).value;

    // Validate account number.
    if (getUserByAccountNumber(accountNumber)) {
      if (validateFields(textInput, amountInput)) {
        const newTransfer = {
          account_number: accountNumber,
          transaction_text: textInput,
          transaction_amount: parseFloat(amountInput),
          transaction_date: getDateAndTime(),
          transaction_type: `Transfer`,
          transaction_source: user,
        };

        onNewTransfer(newTransfer);

        const newTransaction = {
          ...newTransfer,
          amount: -amountInput,
        };

        onNewTransaction(newTransaction);

        document.getElementById(textName).value = "";
        document.getElementById(amountName).value = "";
        document.getElementById(accountName).value = "";
      } else {
        console.error(`Invalid Input For Amount!`);
      }
    } else {
      console.error(`No user found with the provided account number!`);
    }
  };

  function handleOptionSelected(e) {
    const clickedButton = e.target;
    const buttons = document.querySelectorAll(
      ".payment-options-container button"
    );

    buttons.forEach((button) => {
      if (button !== clickedButton) {
        button.classList.remove("btnPressed");
      }
    });

    setOptionSelected(clickedButton.textContent);
    clickedButton.classList.add("btnPressed");
  }

  function padZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function getDateAndTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
    const hours = padZero(date.getHours());
    const minutes = padZero(date.getMinutes());
    const seconds = padZero(date.getSeconds());
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  function validateAmount(input, positive = false) {
    if (!isNaN(input)) {
      const amount = parseFloat(input);
      if (!isNaN(amount) && isFinite(amount)) {
        if (positive) {
          if (amount > 0) {
            return amount;
          } else {
            return null;
          }
        } else {
          return amount.toFixed(2);
        }
      }
    }
    return null;
  }

  function validateFields(textInput = null, amountInput) {
    if (
      textInput !== "" &&
      amountInput !== null &&
      amountInput !== "" &&
      amountInput !== "0"
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getUserByAccountNumber(accountNumber) {
    const transfereeDetails = localStorage.getItem(accountNumber);
    return transfereeDetails !== null ? true : false;
  }

  function displayAdd() {
    return (
      <>
        <form className="form" onSubmit={handleNewAddTransaction}>
          <div>
            <label htmlFor={textName}>Text</label>
            <input type="text" id={textName} placeholder="Enter text..." />
          </div>
          <div>
            <label htmlFor={amountName}>Amount:</label>
            <input type="text" id={amountName} placeholder="Enter amount..." />
          </div>
          <button className="btn">Add</button>
        </form>
      </>
    );
  }

  function displayWithdraw() {
    return (
      <>
        <form className="form" onSubmit={handleNewWithdrawTransaction}>
          <div>
            <label htmlFor={amountName}>Amount:</label>
            <input type="text" id={amountName} placeholder="Enter amount..." />
          </div>
          <button className="btn">Withdraw</button>
        </form>
      </>
    );
  }

  function displayTransfer() {
    return (
      <>
        <form className="form" onSubmit={handleNewTransferTransaction}>
          <div>
            <label htmlFor={accountName}>Account Number</label>
            <input
              type="number"
              id={accountName}
              placeholder="Enter account number..."
            />
          </div>
          <div>
            <label htmlFor={textName}>Text</label>
            <input type="text" id={textName} placeholder="Enter text..." />
          </div>
          <div>
            <label htmlFor={amountName}>Amount:</label>
            <input type="text" id={amountName} placeholder="Enter amount..." />
          </div>
          <button className="btn">Transfer</button>
        </form>
      </>
    );
  }

  return (
    <>
      <div className="payment-options-container">
        <button id="Add" className="btnPressed" onClick={handleOptionSelected}>
          Add
        </button>
        <button id="Withdraw" onClick={handleOptionSelected}>
          Withdraw
        </button>
        <button id="Transer" onClick={handleOptionSelected}>
          Transfer
        </button>
      </div>
      {/* <h3 className="underline">Add new transaction</h3> */}
      <div className="payment-option-display">
        {displayAddTransaction && displayAdd()}
        {displayWithdrawTransaction && displayWithdraw()}
        {displayTransferTransaction && displayTransfer()}
      </div>
    </>
  );
}
