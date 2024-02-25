export default function NewTransaction({ onNewTransaction, user }) {
  const textName = `${user}Text`;
  const amountName = `${user}Amount`;

  const handleNewTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById(textName).value;
    const amountInput = document.getElementById(amountName).value;

    if (
      textInput !== "" &&
      !isNaN(amountInput) &&
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
    }
  };

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
          <input type="number" id={amountName} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
}
