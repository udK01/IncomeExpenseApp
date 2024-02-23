export default function History() {
  return (
    <>
      <h3>History</h3>
      <ul className="transactions-list">
        <li className="moneyIn">
          <button className="delete-btn">x</button>
          Cash
          <span>£400</span>
        </li>
        <li className="moneyOut">
          <button className="delete-btn">x</button>
          Cash
          <span>£100</span>
        </li>
      </ul>
    </>
  );
}
