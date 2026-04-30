import React from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../fetcher";
import CategoryProduct from "./categoryProduct";


const Category = () => {
    const [product,  setProduct] = React.useState({errMessage: "", data: [] });
    const params = useParams();

    React.useEffect(() => {
            const fetchData = async () => {
                const responseObj = await getProducts(params.categoryId);
                setProduct(responseObj);
            }
            fetchData();
        }, [params.categoryId]);   

    const renderProducts = () => {
        return product.data.map( p =>(
        <CategoryProduct key = {p.id} {...p}>{p.title}</CategoryProduct>
        ));
    };      

    return (     
        <div>
            { product.errMessage && <div> Error: {product.errMessage}</div> }
            {
              product.data && renderProducts()          
            }
        </div>
    );
};

export default Category;