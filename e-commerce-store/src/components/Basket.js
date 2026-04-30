import styled from "styled-components";
import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import { Link, useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import { TiMinus } from "react-icons/ti";
import { TiDelete } from "react-icons/ti";


const Basket = () => {
    
    const [items, setItems] = useState(JSON.parse(sessionStorage.getItem('cart')) || []);
    const navigate = useNavigate();
    const { getCartItems, removeProduct, increaseQty, decreaseQty, clearBasket} = useContext(CartContext);
      
    useEffect(() =>{
        setItems(items);     
    }, [items]);
   
    const errors = {
        items: getCartItems().length === 0
    };

    const disabled = Object.keys(errors).some((x) => errors[x]);    

    const renderCart = () => {
        if (getCartItems().length > 0) {
            return getCartItems().map((p) => (
                <React.Fragment key={p.id}>
                    <div>
                        <Link to={`/products/${p.id}`}>{p.title}</Link>
                    </div>
                    <BasketQty>
                        {p.quantity}
   
                        <TiPlus width={20} onClick={() => setItems(increaseQty({id: p.id}))} />
                        <TiMinus width={20} onClick={() => setItems(decreaseQty({id: p.id}))} />
                        <TiDelete width={20} onClick={() => setItems(removeProduct({ id: p.id }))} />
                    </BasketQty>
                    <BasketPrice>${p.price}</BasketPrice>
                </React.Fragment>
            ));
        } else {
            return <div>The basket is currently empty</div>;
        }
    };

    const renderTotal = () => {
        const cartItems = getCartItems();
        const total = cartItems.reduce(
            (total, item) => (total += item.price * item.quantity),
            0
        );
        return total;
    };

    return (
        <BasketContainer>
            <BasketTitle>Shopping Basket</BasketTitle>
            <div>                    
                <BasketButton  disabled={disabled} onClick={() => navigate('/checkout')} >Checkout</BasketButton>
            </div>
                
            <BasketTable>
                <BasketHeader>
                    <h4>Item</h4>
                    <h4>Quantity</h4>
                    <h4>Price</h4>
                </BasketHeader>
                <BasketHeaderLine />
                <BasketHeader>{renderCart()}</BasketHeader>
                <BasketHeaderLine />
            </BasketTable>
    
            <BasketButton onClick={() => setItems(clearBasket())}>Clear</BasketButton>
                <BasketTotal>Total: ${renderTotal()}</BasketTotal>
        </BasketContainer>
    );
};

export default Basket;

const BasketContainer = styled.div`
    display: grid;
    padding: 20px;
    grid-template-rows: 0.25fr 1fr 0.25fr;
    grid-template-columns: 0.1fr 1fr 0.1fr;
`;

const BasketTable =  styled.div`
    grid-column: 1 / span 3;
    grid-template-rows: 0.25fr 1fr 0.25fr 0.25fr;
    column-gap: 20px;
    padding-left: 10px;
`;

const BasketHeader = styled.div`
    display: grid;
    grid-template-columns: 0.85fr 1fr 0.5fr;
`;

const BasketHeaderLine =  styled.hr`
    margin-bottom: 20px;
    border: 1px solid gray;
`;

const BasketTitle = styled.h2`
    grid-column: 1 / span 2;
    padding-bottom: 20px;
`;

const BasketButton = styled.button`
    border-radius: 8px;
    height: 40px;
    width: 80px;

    &:hover {
        background-color: blue;
    }

    &:focus {
        outline:2px solid white;
    }
`;

const BasketTotal = styled.h2`
    justify-self: end;
`;

const BasketQty = styled.h3`
    font-size: 18px;
    font-weight: bold;
    display: grid;
    grid-template-columns: 0.05fr 0.05fr 0.1fr 0.05fr;
`;

const BasketPrice = styled.h3`
    font-size: 20px;
    font-weight: bold;
`;