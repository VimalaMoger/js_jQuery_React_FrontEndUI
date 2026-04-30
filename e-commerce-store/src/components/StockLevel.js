import React, { useEffect, useContext } from "react";
import { CartContext } from "../contexts/cartContext";
 

const StockLevelUpdateComponent = ( {id, stock, sUpdate, setSUpdate} ) => {

    const { getCartItems } = useContext(CartContext);

    useEffect(() => {  
        const timer = setInterval(() => {
            if (getCartItems().length > 0) { 
                getCartItems().map((p) => ( 
                    (p.id === id) ? setSUpdate(p.stock): 0
                ));
            }
            console.log("stock level");
            return sUpdate; 
        }, 50);
        return () => clearInterval(timer);           
    }, [id, sUpdate, setSUpdate, getCartItems]); 

    const isMatch = sUpdate < stock;

    return (
        <>{isMatch ? sUpdate : stock}</>
    );

};

export default React.memo(StockLevelUpdateComponent);