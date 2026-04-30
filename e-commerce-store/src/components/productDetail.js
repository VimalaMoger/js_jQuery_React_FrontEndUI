import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../fetcher";
import styled from "styled-components";
import { CartContext } from "../contexts/cartContext";
import StockLevelUpdateComponent from "./StockLevel";


const ProductDetail = () => {

    const cartContext = useContext(CartContext);
    const { addProduct } = cartContext;
    const [product,  setProduct] = React.useState({errorMessage: '', data: {} });
    const params = useParams();
    const id = product.data.id;
    const title = product.data.title;
    const price = product.data.price;
    const description = product.data.description;
    const stock = product.data.stock;
    //const {productId} = useParams();    
    const [stockUpdate, setStockUpdate] = useState(stock);       
    const isOutOfStock = stockUpdate === 0;
    const backOrder = stock === 0;

    React.useEffect(() => {
        const fetchData = async () => {
            const responseObj = await getProductById(params.productId);
            setProduct(responseObj);
        }
        fetchData();
    }, [params.productId]);

    return (
        <ProductInfoArticle>
            <ProductTitle>{product.data.title}</ProductTitle>

            <figure>
                <ProductImageContainer>
                    <ProductImage
                        src={`/assets/${product.data.image}`}
                        alt={product.data.title}
                    />
                </ProductImageContainer>
            </figure>

            <aside>
                <ProductInfo>
                    <ProductInfoHeader>Dimensions</ProductInfoHeader>
                    <label>{product.data.specs?.dimensions}</label>
                </ProductInfo>

                {product.data.specs?.capacity && (
                    <ProductInfo>
                        <ProductInfoHeader>Capacity</ProductInfoHeader>
                        <label>{product.data.specs?.capacity}</label>
                    </ProductInfo>
                )}

                <ProductInfo>
                    <ProductInfoHeader>Features</ProductInfoHeader>
                    <ul>
                        {product.data.features?.map((res, i) => {
                            return (
                                <ProductInfoListItem key={`feature${i}`}>
                                    {res}
                                </ProductInfoListItem>
                            );
                        })}
                    </ul>
                </ProductInfo>
            </aside>

            <aside>
                <ProductInfoFinancePrice>
                    ${product.data.price}
                </ProductInfoFinancePrice>

                <ProductInfoStock>
                    <ProductInfoStockLabel>
                        Stock Level: 
                        <StockLevelUpdateComponent id={id} stock={stock} sUpdate={stockUpdate} setSUpdate={setStockUpdate} />                      
                    </ProductInfoStockLabel>
                    <ProductInfoStockLabel>FREE Delivery</ProductInfoStockLabel>
                </ProductInfoStock>

                <ProductInfoAction>
                    <ProductInfoActionButton disabled={isOutOfStock || backOrder} className= "bcolor" onClick={() => 
                        addProduct({id, title, price, stock})}>{isOutOfStock || backOrder ? "Out of Stock" : "Add to Basket"}
                    </ProductInfoActionButton>
                </ProductInfoAction>
            </aside>
            <br /> 
                     
            <ProductInfoDescription>
                <h3>Description: </h3> 
                {description}
            </ProductInfoDescription>
        </ProductInfoArticle>
    );
};

export default ProductDetail;


const ProductInfoArticle = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 0.25fr 1fr 0.55fr;
    column-gap: 20px;
`;

const ProductInfoDescription = styled.div`
    grid-column: 1 / span 3;
`;

const ProductTitle = styled.div`
    grid-column: 1 / span 3;
    color: darkslategray;
    font-weight: bold;
    font-size: 1.5em;
    padding-left: 10px;
`;

const ProductImageContainer = styled.div`
    padding: 10px;
    width: 60%;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoHeader = styled.h3`
    color: darkslategray;
    font-size: 1em;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
`;

const ProductInfoListItem = styled.li`
    padding-top: 5px;
`;

const ProductInfoStock = styled.div`
    padding-left: 10px;
    margin-top: 20px;
    padding-top: 10px;
    background-color: lightgrey;
    height: 35%;
    width: 60%;
    border-radius: 5px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
`;

const ProductInfoStockLabel = styled.label`
    padding-bottom: 5px;
`;

const ProductInfoAction = styled.div`
    display: flex;
    flex-direction: column;
`;

const ProductInfoActionButton = styled.button`
    border: 2px solid rgb(17, 58, 48);
    border-radius: 15%;
    margin-right: 20px;
    margin-top: 30px;
    width: 80px; 
    background-color:rgb(156, 138, 138);
    
    &:hover {
        background-color: blue;
    }

    &:focus {
        outline:2px solid white;
    }
`; 

const ProductInfoFinancePrice = styled.div`
    color: darkslategray;
    font-size: 2em;
    font-weight: bold;
    padding-top: 10px;
`;
