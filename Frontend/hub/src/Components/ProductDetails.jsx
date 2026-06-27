import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const getSingleProduct = async () => {
        try {
            const response = await axios.get(
                `https://swaphub-backend-855x.onrender.com/api/getProduct/${id}`
            );

            setProduct(response.data);
        } catch (error) {
            console.log(error);
            console.log(error.response);
            alert(error.response?.data?.message || error.message);
            alert("Unable to fetch product");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    if (loading) {
        return (
            <h2 className="text-center text-2xl mt-10">
                Loading...
            </h2>
        );
    }

    return (
        <div>
            <h1>{product.productName}</h1>
        </div>
    );
};

export default ProductDetails;