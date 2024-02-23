export default function NewTransaction() {
  return (
    <>
      <h3>Add new transaction</h3>
      <form className="form">
        <div>
          <label for="text">Text</label>
          <input type="text" id="text" placeholder="Enter text..." />
        </div>
        <div>
          <label for="amount">
            Amount <br /> (negative - expense, positive-income)
          </label>
          <input type="number" id="amount" placeholder="Enter amount..." />
        </div>
        <button class="btn">Add transaction</button>
      </form>
    </>
  );
}
