export default function DetailedTransaction(props) {
  return (
    <>
      <li className="inspect">
        <button
          className="delete-btn"
          onClick={() => props.deleteTransaction(props.transaction_id)}
        >
          x
        </button>
        {props.text}
        <span>{props.displayAmount()}</span>
        <img
          src="../../src/assets/down.svg"
          className="transaction-details"
          onClick={() => props.handleInspect(props.index, false)}
        />
      </li>
      <div className="transaction-details-box">
        <div>
          <div className="transaction-inspect-text">
            <div>Transaction Source:</div>
            <div>{props.source}</div>
          </div>
          <div className="transaction-inspect-text">
            <div>Transaction Type: </div>
            <div>{props.type}</div>
          </div>
          <div className="transaction-inspect-text">
            Transaction Date: {props.date}
          </div>
        </div>
      </div>
    </>
  );
}
