import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import MyProductCard from "./MyProductCard.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const myProducts = async () => {
        try {
            const response = await axios.get(
                "/myProducts",
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
    const handleDelete = (id) => {
        setSelectedId(id);
        setShowDeleteModal(true);
    };
    const confirmDelete = async () => {

        try {
            await axios.delete(`/deleteProduct/${selectedId}`);

            toast.success("Product deleted successfully");

            setProducts((prev) =>
                prev.filter((product) => product._id !== selectedId)
            );

        } catch (error) {

            console.error(error);
            toast.error(error.response?.data?.message || error.message);

        } finally {

            setShowDeleteModal(false);
            setSelectedId(null);

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
            {showDeleteModal && (
                <div
                    onClick={() => setShowDeleteModal(false)}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl p-6 w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold text-center">
                            Delete Product
                        </h2>

                        <p className="text-gray-500 text-center mt-3">
                            Are you sure you want to delete this product?
                        </p>

                        <div className="flex gap-4 mt-6">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 border border-gray-300 py-3 rounded-xl">
                                Cancel
                            </button>

                            <button
                                onClick={confirmDelete}
                                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default MyProducts;