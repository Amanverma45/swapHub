import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance.js';
import MyProductCard from "./MyProductCard.jsx";
import toast from "react-hot-toast";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)

    const myProducts = async () => {
        try {
            const response = await axios.get(
                "https://swaphub-backend-855x.onrender.com/api/myProducts",
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                }
            );

            setProducts(response.data)
        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this product?")) {
                return;
            }
            await axios.delete(`/deleteProduct/${id}`);

            toast.success("Product deleted successfully");

            setProducts(products.filter((product) => product._id !== id));

        } catch (error) {
            console.log(error.response);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        myProducts();
    }, []);
    console.log("handleDelete in parent:", handleDelete);
    return (
        <section className="w-[90%] max-w-7xl mx-auto py-16">

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">
                    My Products
                </h1>

                <p className="text-gray-600 mt-3">
                    Manage all your uploaded products.
                </p>
            </div>

            {loading ? (
                <h2 className="text-center text-xl">
                    Loading Products...
                </h2>
            ) : products.length === 0 ? (
                <h2 className="text-center text-xl">
                    No Products Found
                </h2>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <MyProductCard
                            key={product._id}
                            product={product}
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

        </section>
    );
};

export default MyProducts;