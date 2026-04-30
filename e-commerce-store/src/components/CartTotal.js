import React, { useEffect, useContext } from "react";
import { CartContext } from "../contexts/cartContext";


const CartCounter = ( {totalCount, setTotalCount} ) => {

  const { getCartCount } = useContext(CartContext);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalCount(getCartCount()); // Notify parent
      return totalCount;   
    }, 500);
    return () => clearInterval(timer);
  }, [totalCount, getCartCount, setTotalCount]); 
  
  return (
    <span className="subtotal">{totalCount}</span>
  );
    
};

export default React.memo(CartCounter);