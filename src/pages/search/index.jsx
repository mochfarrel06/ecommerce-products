import React from "react";
import {useParams} from "react-router-dom";
import products from "../../utils/data.json";

function SearchPage() {
  const {keyword} = useParams();

  // Lakukan logika pencarian di sini (contoh: menggunakan filter)
  const searchResults = products.data.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div>
      <h2>Search Results for "{keyword}"</h2>
      {/* Tampilkan hasil pencarian */}
      <ul>
        {searchResults.map((result) => (
          <li key={result.product_id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchPage;
