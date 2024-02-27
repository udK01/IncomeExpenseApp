import { useState, useEffect } from "react";

export default function NewTransaction({
  onNewTransaction,
  onNewTransfer,
  user,
  id,
}) {
  const [optionSelected, setOptionSelected] = useState("Add");
  const [displayAddTransaction, setDisplayAddTransaction] = useState(false);
  const [displayTransferTransaction, setDisplayTransferTransaction] =
    useState(false);
  const [displayRequestTransaction, setDisplayRequestTransaction] =
    useState(false);
  const textName = `${user}Text`;
  const amountName = `${user}Amount`;
  const accountName = `${user}-${id}`;

  useEffect(() => {
    switch (optionSelected) {
      case "Add":
        setDisplayAddTransaction(true);
        setDisplayTransferTransaction(false);
        setDisplayRequestTransaction(false);
        break;
      case "Transfer":
        setDisplayAddTransaction(false);
        setDisplayTransferTransaction(true);
        setDisplayRequestTransaction(false);
        break;
      case "Request":
        setDisplayAddTransaction(false);
        setDisplayTransferTransaction(false);
        setDisplayRequestTransaction(true);
        break;
      default:
        setDisplayAddTransaction(true);
        setDisplayTransferTransaction(false);
        setDisplayRequestTransaction(false);
    }
  }, [optionSelected]);

  const handleNewAddTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById(textName).value;
    const amountInput = validateAmount(
      document.getElementById(amountName).value
    );

    if (validateFields(textInput, amountInput)) {
      const newTransaction = {
        text: textInput,
        amount: parseFloat(amountInput),
        date: getDateAndTime(),
        type: `Add`,
        inspect: false,
        source: user,
      };

      onNewTransaction(newTransaction);

      document.getElementById(textName).value = "";
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
          id: accountNumber,
          text: textInput,
          amount: parseFloat(amountInput),
          date: getDateAndTime(),
          type: `Transfer`,
          inspect: false,
          source: user,
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
    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  }

  function validateAmount(input, transfer = false) {
    if (!isNaN(input)) {
      const amount = parseFloat(input);
      if (!isNaN(amount) && isFinite(amount)) {
        if (transfer) {
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

  function validateFields(textInput, amountInput) {
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
        <form onSubmit={handleNewAddTransaction}>
          <div>
            <label>Text</label>
            <input type="text" id={textName} placeholder="Enter text..." />
          </div>
          <div>
            <label>Amount: (negative - expense, positive - income)</label>
            <input type="text" id={amountName} placeholder="Enter amount..." />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </>
    );
  }

  function displayTransfer() {
    return (
      <>
        <form onSubmit={handleNewTransferTransaction}>
          <div>
            <label>Account Number</label>
            <input
              type="number"
              id={accountName}
              placeholder="Enter account number..."
            />
          </div>
          <div>
            <label>Text</label>
            <input type="text" id={textName} placeholder="Enter text..." />
          </div>
          <div>
            <label>Amount: (negative - expense, positive - income)</label>
            <input type="text" id={amountName} placeholder="Enter amount..." />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </>
    );
  }

  function displayRequest() {
    return (
      <>
        <div>Request</div>
      </>
    );
  }

  return (
    <>
      <div className="payment-options-container">
        <button id="Add" className="btnPressed" onClick={handleOptionSelected}>
          Add
        </button>
        <button id="Transer" onClick={handleOptionSelected}>
          Transfer
        </button>
        <button id="Request" onClick={handleOptionSelected}>
          Request
        </button>
      </div>
      {/* <h3 className="underline">Add new transaction</h3> */}
      <div className="payment-option-display">
        {displayAddTransaction && displayAdd()}
        {displayTransferTransaction && displayTransfer()}
        {displayRequestTransaction && displayRequest()}
      </div>
    </>
  );
}
