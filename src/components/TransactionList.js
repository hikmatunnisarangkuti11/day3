import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm"; // Update the path based on your project structure

const TransactionList = () => {
  const [transactions, setTransaction] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/transactions");
      setTransaction(response.data);
      // Reset search results when fetching all transactions
      setSearchResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/transactions/${id}`);
        getTransactions();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const formatToRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const searchTransactions = (searchDate) => {
    const results = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const searchDateObj = new Date(searchDate);
      
      // Membandingkan tahun, bulan, dan tanggal
      return (
        transactionDate.getFullYear() === searchDateObj.getFullYear() &&
        transactionDate.getMonth() === searchDateObj.getMonth() &&
        transactionDate.getDate() === searchDateObj.getDate()
      );
    });

    setSearchResults(results);
  };

  const resetSearch = () => {
    // Reset search results to empty array
    setSearchResults([]);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <SearchForm onSearch={searchTransactions} />
        <br />
        <button onClick={resetSearch} className="button is-danger">
          Reset 
        </button>
        <Link to={`add`} className="button is-success">
          Add New
        </Link>
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : transactions).map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{index + 1}</td>
                <td>{transaction.name}</td>
                <td>{formatToRupiah(transaction.quantity)}</td>
                <td>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`edit/${transaction.id}`} className="button is-small is-info mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="button is-small is-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
