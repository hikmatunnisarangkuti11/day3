import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTransaction = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [setAllTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/transactions");
        setAllTransactions(response.data);
        // Handle the fetched data if needed
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransactions();
  }, []);

  const saveTransaction = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending data:", { name, quantity });

      await axios.post("http://localhost:5000/transactions", {
        name,
        quantity,
      });

      // Assuming a successful response means the data is saved
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={saveTransaction}>
          {/* Form fields */}
          <div className="field">
            <label className="label">Nama</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Quantity</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>

          {/* Save button */}
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
