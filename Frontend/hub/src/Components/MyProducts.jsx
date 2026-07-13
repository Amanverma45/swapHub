import { useState, useEffect } from "react";
import axios from '../utils/axiosInstance.js';
import MyProductCard from "./MyProductCard.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
            console.error(error);
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

            setProducts((prev) =>
                prev.filter((product) => product._id !== id)
            );

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        myProducts();
    }, []);
    return (
        <section className="w-[90%] max-w-7xl mx-auto py-16">

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold">
                    My Products
                </h1>

                <p className="text-gray-600 mt-3">
                    {products.length} {products.length === 1 ? "Product" : "Products"} Listed
                </p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>

                    <p className="mt-4 text-gray-600">
                        Loading Products...
                    </p>
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">

                    <div className="text-6xl">
                        📦
                    </div>

                    <h2 className="text-2xl font-bold mt-5">
                        No Products Yet
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Start by adding your first product.
                    </p>
                    <Link
                        to="/addProduct"
                        className="mt-6 bg-[#2E7D32] text-white px-6 py-3 rounded-xl hover:bg-[#256728] transition"
                    >
                        Add Product
                    </Link>

                </div>
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