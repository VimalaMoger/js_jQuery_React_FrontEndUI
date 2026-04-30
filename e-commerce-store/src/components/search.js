import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Search = () => {

    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState("");
        
    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                navigate("/search?s=" + searchTerm);
                setSearchTerm("");
            }
        }, 1000);

        return () => clearTimeout(delay);        
    }, [searchTerm, navigate]); 

    const handleChange = (ev) => {
        setSearchTerm(ev.target.value);
    };

    return (
        <div id="search">
            <label>Search</label>
            <input type="text" name="search" placeholder="Search products..." value={searchTerm} onChange={handleChange} />         
        </div>
    );
};

export default Search;