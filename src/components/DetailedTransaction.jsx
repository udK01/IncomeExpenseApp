export default function DetailedTransaction(props) {
  function padZero(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function getFormattedDate() {
    const savedDate = new Date(props.date);

    const year = padZero(savedDate.getFullYear());
    const month = padZero(savedDate.getMonth());
    const day = padZero(savedDate.getDate());

    const hours = padZero(savedDate.getHours());
    const minutes = padZero(savedDate.getMinutes());
    const seconds = padZero(savedDate.getSeconds());

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

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
            Transaction Date: {getFormattedDate()}
          </div>
        </div>
      </div>
    </>
  );
}
