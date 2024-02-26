export default function NewTransaction({ onNewTransaction, user }) {
  const textName = `${user}Text`;
  const amountName = `${user}Amount`;

  const handleNewTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById(textName).value;
    const amountInput = validateAmount(
      document.getElementById(amountName).value
    );

    console.log(getDateAndTime());

    if (
      textInput !== "" &&
      amountInput !== null &&
      amountInput !== "" &&
      amountInput !== "0"
    ) {
      const newTransaction = {
        text: textInput,
        amount: parseFloat(amountInput),
      };

      onNewTransaction(newTransaction);

      document.getElementById(textName).value = "";
      document.getElementById(amountName).value = "";
    } else {
      console.error(`Invalid Input For Amount!`);
    }
  };

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

  function validateAmount(input) {
    if (!isNaN(input)) {
      const amount = parseFloat(input);
      if (!isNaN(amount) && isFinite(amount)) {
        return amount.toFixed(2);
      }
    }
    return null;
  }

  return (
    <>
      <h3 className="underline">Add new transaction</h3>
      <form className="form" onSubmit={handleNewTransaction}>
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
