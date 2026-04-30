import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const Checkout = () => {
    
    const[form, setForm] = useState({
        name: '', 
        email: '', 
        shippingAddress1: ''
    });
    const [fieldErrors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (ev) => {
        const { name, value } = ev.target;
        setForm((prevState) => {
            return { ...prevState, [name]: value 
        };
        });
    };

    const handleSubmit = (ev) => {
        const validationErrors = validateForm(form);
        if(Object.keys(validationErrors).length !== 0){
            setErrors(validationErrors);
            ev.preventDefault();
            return;
        }
        navigate('/orderConfirmation');
    };

    const validateForm = (data) => {
        let errors = {};
        if (!data.name) {
            errors.name = "Name is required";
        }
        if (!data.email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(data.email)) {
            errors.email = "Invalid email format";
        }
         if (!data.shippingAddress1) {
            errors.shippingAddress1 = "Address is required";
        }
        return errors;
    };

    const isValidEmail = (email) => {
   // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <CheckoutContainer>
                <CheckoutTitle>Shopping Checkout</CheckoutTitle>
                <CheckoutHeader>
                    <h4>Your Details</h4>
                </CheckoutHeader>
                <CheckoutHeaderLine />

                <CheckoutTable>
                    <CheckoutFormLabel>Name*</CheckoutFormLabel>
                        <div>
                            <CheckoutFormInput type="text" name ="name" onChange={handleChange} placeholder="Name required" invalid={fieldErrors["name"]} />
                        {fieldErrors.name && <div>{fieldErrors.name}</div>}
                        </div>    
                    <CheckoutFormLabel>Email*</CheckoutFormLabel>
                        <div>
                            <CheckoutFormInput type="text" name ="email" onChange={handleChange} placeholder = "Email required" invalid={fieldErrors["email"]}/>                
                        {fieldErrors.email && <div>{fieldErrors.email}</div>}
                        </div>
                </CheckoutTable>

                <CheckoutHeader>
                    <h4>Address Details</h4>
                </CheckoutHeader>
                
                <CheckoutHeaderLine />

                <CheckoutTable>
                    <CheckoutFormLabel>Copy to Shipping</CheckoutFormLabel>
                    <CheckoutFormCheckbox type="checkbox" />
                    <CheckoutFormLabel>Billing Address</CheckoutFormLabel>
                    <CheckoutAddress>
                        <input type="text" name ="billingAddress1" />
                        <input type="text" name ="billingAddress2" />
                        <input type="text" name ="billingCity" />
                    </CheckoutAddress>
                    <CheckoutFormLabel>Shipping Address*</CheckoutFormLabel>
                    <CheckoutAddress>
                        <div>
                            <CheckoutFormInput type="text" name ="shippingAddress1" onChange={handleChange} placeholder="Address required" invalid={fieldErrors["shippingAddress1"]} />
                        {fieldErrors.shippingAddress1 && <div>{fieldErrors.shippingAddress1}</div>}
                        </div>
                        <input type="text" name ="shippingAddress2" />
                        <input type="text" name ="shippingCity" />
                    </CheckoutAddress>
                </CheckoutTable>

                <CancelButton onClick={() => navigate("/basket") }>Cancel</CancelButton>
                <CheckoutButton>Confirm Order</CheckoutButton>
            </CheckoutContainer>
        </form>
        </>
    );
};

export default Checkout;

const CheckoutContainer = styled.div`
    display: grid;
    padding: 20px;
    gird-template-rows: 0.25fr 1fr 0.25fr 0.25fr 0.25fr 0.5fr;
    grid-templat-columns: 0.1fr 1fr 0.1fr;
`;

const CheckoutTable = styled.div`
    grid-column: 1 /span 3;
    display: grid;
    grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
    grid-template-columns: 0.1fr 0.4fr 0.1fr 0.4fr;
    column-gap: 20px;
    padding-left: 10px;
`;

const CheckoutHeader = styled.div`
    grid-column: 1 / span 3;
    margin-bottom: 20px;
    border: 1px solid gray;
`;

const CheckoutHeaderLine =  styled.hr`
    margin-bottom: 20px;
    border: 1px solid gray;
`;

const CheckoutTitle =  styled.h2`
    grid-column: 1 / span 2;
    padding-bottom: 20px;
`;

const CheckoutAddress = styled.div`
    display: grid;
    grid-template-rows: 0.25fr 0.25fr 0.25fr 0.25fr;
    grid-template-columns: 1fr;
    grid-row-gap: 10px;
`;

const CheckoutFormLabel = styled.label`
    justify-self: end;
`;

const CheckoutFormInput = styled.input`
    ${(props) => props.invalid && `
    border-color: maroon;
    border-width: 3px;
    `};
    border-style: solid;
`;

const CheckoutFormCheckbox = styled.input`
    grid-column: 2 / span 3;
    justify-self: start;
    margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column:3;
    
    &:hover {
        background-color: blue;
    }

    &:focus {
        outline:2px solid white;
    }
`;

const CancelButton = styled.button`
    border-radius: 8px;
    height: 40px;
    grid-column: 1;
    
    &:hover {
        background-color: blue;
    }

    &:focus {
        outline:2px solid white;
    }
`;