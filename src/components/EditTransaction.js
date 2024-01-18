import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditTransaction = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTransactionById();
  }, []);

  const updateTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/transactions/${id}`, {
        name,
        quantity,
      
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getTransactionById = async () => {
    const response = await axios.get(`http://localhost:5000/transactions/${id}`);
    setName(response.data.name);
    setQuantity(response.data.quantity);
  };

  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={updateTransaction}>
          <div className="field">
            <label className="label">Name</label>
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
          
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransaction;
