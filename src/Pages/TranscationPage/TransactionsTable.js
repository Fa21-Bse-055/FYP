import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TransactionsTable.css"; // Import the CSS file
const ITEMS_PER_PAGE = 5;

function getRelativeTime(dateString) {
  const transactionDate = Date.parse(dateString);
  const currentDate = Date.now();
  const differenceInSeconds = Math.floor(
    (currentDate - transactionDate) / 1000
  );
  const intervals = [
    { label: "year", seconds: 32140800 },
    { label: "month", seconds: 2678400 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (const interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count > 0) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

function TransactionsTable({ address }) {
  const [transactions, setTransactions] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    async function getTransactions() {
      const response = await axios.get("http://localhost:3000/api/users/address/0x1743339b26051eeCCaD16d896e70964C2f941C6E");
      console.log(response.data.result);

      setTransactions(response.data.result);
    }
    getTransactions();
  }, []);
  useEffect(() => {
    const totalPages = Math.ceil(transactions.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = transactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
    setTotalPages(totalPages);
    setCurrentItems(currentItems);
  }, [transactions, currentPage]);
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  useEffect(() => {
    console.log("Hello from me");
  });
  return (
    <div className="table-container">
      <h2>Latest Transactions</h2>
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Transaction Hash</th>
            <th>Block</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Txn Fee</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((tx, index) => (
            <tr key={index}>
              <td className="hash">{tx.hash}</td>
              <td>{tx.block_number}</td>
              <td>{getRelativeTime(tx.block_timestamp)}</td>
              <td>{tx.from_address}</td>
              <td>{tx.to_address}</td>
              <td>{tx.value}</td>
              <td>{tx.transaction_fee}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        <button onClick={goToPrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          {" "}
          Page {currentPage} of {totalPages}{" "}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TransactionsTable;
