export default function NewTransaction({ onNewTransaction }) {
  const handleNewTransaction = (e) => {
    e.preventDefault();

    const textInput = document.getElementById("text").value;
    const amountInput = document.getElementById("amount").value;

    const newTransaction = {
      text: textInput,
      amount: parseFloat(amountInput),
    };

    onNewTransaction(newTransaction);

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form className="form" onSubmit={handleNewTransaction}>
        <div>
          <label>Text</label>
          <input type="text" id="text" placeholder="Enter text..." />
        </div>
        <div>
          <label>Amount: (negative - expense, positive - income)</label>
          <input type="number" id="amount" placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </>
  );
}
