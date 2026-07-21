import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import MyProductCard from "./MyProductCard.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlusCircle, FaBoxOpen, FaTrashAlt } from "react-icons/fa";

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
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

            setProducts(response.data);
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
        <section className="min-h-screen bg-gray-50/60 py-8 sm:py-12 px-4">
            <div className="w-[92%] max-w-6xl mx-auto space-y-8 sm:space-y-10">

                {/* Top Banner Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative overflow-hidden bg-gradient-to-r from-[#2E7D32] via-[#256728] to-[#1E5621] rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-[#2E7D32]/15 border border-emerald-600/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
                >
                    {/* Ambient Light Orb */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="relative z-10">
                        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-emerald-100 border border-white/20 mb-3 shadow-xs">
                            Inventory Management
                        </span>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                            My Products
                        </h1>
                        <p className="mt-2 sm:mt-3 text-sm sm:text-lg text-emerald-100/90 max-w-xl font-medium leading-relaxed">
                            Manage your listed items, update product info, or list new swap inventory.
                        </p>

                        <div className="mt-6 inline-flex items-center gap-2 bg-white text-[#2E7D32] px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-md">
                            <FaBoxOpen className="text-sm text-[#2E7D32]" />
                            <span>Active Listings: {products.length}</span>
                        </div>
                    </div>

                    <div className="relative z-10 shrink-0">
                        <Link
                            to="/addProduct"
                            className="inline-flex items-center gap-2 bg-white text-[#2E7D32] hover:bg-emerald-50 font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <FaPlusCircle className="text-base text-[#2E7D32]" />
                            <span>Add New Product</span>
                        </Link>
                    </div>
                </motion.div>

                {/* Content Section */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/80 backdrop-blur-md rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-12 h-12 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin shadow-md mb-4" />
                        <p className="text-gray-600 font-bold text-sm">
                            Loading your product listings...
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-3xl border border-gray-100 p-8 sm:p-14 text-center shadow-md max-w-xl mx-auto"
                    >
                        <div className="w-16 h-16 bg-emerald-50 text-[#2E7D32] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100">
                            <FaBoxOpen />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                            No Products Listed Yet
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm mt-2 max-w-md mx-auto leading-relaxed font-medium">
                            Start by adding your first product to exchange with other members in the community!
                        </p>
                        <Link
                            to="/addProduct"
                            className="mt-6 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold px-6 py-3.5 rounded-full text-xs sm:text-sm shadow-lg shadow-[#2E7D32]/25 hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                            <FaPlusCircle />
                            <span>Add Your First Product</span>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {products.map((product) => (
                            <MyProductCard
                                key={product._id}
                                product={product}
                                handleDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {/* Glassmorphic Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div
                        onClick={() => setShowDeleteModal(false)}
                        className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 w-full max-w-sm border border-white/80 shadow-2xl text-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-3xl mx-auto mb-4 border border-red-100 shadow-xs">
                                <FaTrashAlt />
                            </div>

                            <h2 className="text-xl font-extrabold text-gray-900">
                                Delete Product?
                            </h2>

                            <p className="text-gray-500 text-xs sm:text-sm mt-2 font-medium leading-relaxed">
                                Are you sure you want to delete this product? This action cannot be undone.
                            </p>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="flex-1 border border-gray-200 rounded-2xl py-3 text-xs sm:text-sm font-bold text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl py-3 text-xs sm:text-sm font-bold shadow-md shadow-red-500/25 hover:scale-105 active:scale-95 transition cursor-pointer"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyProducts;