import React, { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [searchDate, setSearchDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchDate);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className="field mt-3">
        <label className="label">Search by Date:</label>
        <div className="control">
          <input
            className="input"
            type="date"
            name="searchDate"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
