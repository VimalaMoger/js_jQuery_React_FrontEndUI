import React, { useEffect, useContext } from "react";
import { CartContext } from "../contexts/cartContext";


const CartTotalAmount = ( {totalAmount, setTotalAmount} ) => {

  const { getCartTotal } = useContext(CartContext);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTotalAmount(getCartTotal()); // Notify parent
      return totalAmount;   
    }, 500);
    return () => clearInterval(timer);
  }, [totalAmount, getCartTotal, setTotalAmount]); 
  
  return (
    <span className="sub-total">${totalAmount}</span>
  );
    
};

export default React.memo(CartTotalAmount);