import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import * as data from '../db/db.json';
import CategoryProduct from "./categoryProduct";


const SearchResults = () => {
  
  const [searchTerm, setSearchTerm] = useState("");

  let [searchParams] = useSearchParams();
  let query = searchParams.get('s');
  
  useEffect(() => {
      setSearchTerm(query);
    }, [query]);

  const {products} = data;

  const filteredItems = products.filter(
    (product) => 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) //||
      // product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const renderProducts = () => {
  
    if (filteredItems.length > 0) {
      return filteredItems.map(p => (             
        <CategoryProduct key={p.id} {...p}>
          {p.title}
        </CategoryProduct>
      ));
    } else {
      return <div>No results found</div>
    }
  }; 

  return (
    <div>
      {renderProducts()}
    </div>
  );
};

export default SearchResults;
