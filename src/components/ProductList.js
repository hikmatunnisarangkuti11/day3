import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm"; // Update the path based on your project structure

const ProductList = () => {
  const [products, setProduct] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      setProduct(response.data);
      // Reset search results when fetching all products
      setSearchResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/products/${id}`);
        getProducts();
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

  const searchProducts = (searchDate) => {
    const results = products.filter((product) => {
      const productDate = new Date(product.createdAt);
      const searchDateObj = new Date(searchDate);
      
      // Membandingkan tahun, bulan, dan tanggal
      return (
        productDate.getFullYear() === searchDateObj.getFullYear() &&
        productDate.getMonth() === searchDateObj.getMonth() &&
        productDate.getDate() === searchDateObj.getDate()
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
        <SearchForm onSearch={searchProducts} />
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
              <th>Price</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(searchResults.length > 0 ? searchResults : products).map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{formatToRupiah(product.price)}</td>
                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                <td>
                  <Link to={`edit/${product.id}`} className="button is-small is-info mr-2">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteProduct(product.id)}
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

export default ProductList;
