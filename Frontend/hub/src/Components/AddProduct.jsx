import { useState } from "react";
import axios from "../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [exchangeFor, setExchangeFor] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [showPreview, setShowPreview] = useState(false);
    const [tempImage, setTempImage] = useState(null);

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !productName || !category || !exchangeFor || !location || !description) {
            toast.error("Please fill all fields");
            return;
        }

        if (productName.trim().length < 3) {
            toast.error("Product name must be at least 3 characters");
            return;
        }

        if (productName.length > 50) {
            toast.error("Product name must be less than 50 characters");
            return;
        }

        if (location.trim().length > 50) {
            toast.error("Location must be less than 50 characters");
            return;
        }

        if (description.trim().length < 20) {
            toast.error("Description must be at least 20 characters");
            return;
        }

        if (description.length > 500) {
            toast.error("Description must be less than 500 characters");
            return;
        }
        if (exchangeFor.trim().length < 3) {
            toast.error("Exchange item must be at least 3 characters");
            return;
        }

        if (exchangeFor.trim().length > 50) {
            toast.error("Exchange item must be less than 50 characters");
            return;
        }
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("image", image);
            formData.append("productName", productName);
            formData.append("category", category);
            formData.append("exchangeFor", exchangeFor);
            formData.append("location", location);
            formData.append("description", description);

            await axios.post(
                "/addProduct",
                formData,
                {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Product Added Successfully");

            setImage(null);
            setTempImage(null);
            setShowPreview(false);
            setProductName("");
            setCategory("");
            setExchangeFor("");
            setLocation("");
            setDescription("");
            navigate("/products");

        } catch (error) {
            console.log(error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");

                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Size Validation
        if (file.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            e.target.value = "";
            return;
        }

        // Type Validation
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/avif",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Only JPG, PNG, WEBP and AVIF images are allowed");
            e.target.value = "";
            return;
        }

        setTempImage(file);
        setShowPreview(true);

        e.target.value = "";
    };

    const handleDone = () => {
        setImage(tempImage);
        setTempImage(null);
        setShowPreview(false);
    };

    const handleCancel = () => {
        setTempImage(null);
        setShowPreview(false);
    };
    return (
        <section className="relative min-h-screen py-10 sm:py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-50/60 via-slate-50 to-amber-50/50">
            {/* Decorative Background Gradient Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#F4A261]/25 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <div className="relative max-w-3xl mx-auto bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-emerald-950/10 border border-white/80 ring-1 ring-black/5 p-6 sm:p-10">

                <div className="text-center sm:text-left mb-8">
                    <span className="inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-[#2E7D32] border border-emerald-200/60 mb-3 shadow-xs">
                        Product Listing
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#2E7D32] via-[#236327] to-[#1E5621] bg-clip-text text-transparent tracking-tight">
                        Add New Product
                    </h1>

                    <p className="text-gray-500 text-sm mt-2 font-medium">
                        List your product and start exchanging with others in the community.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Image */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                                Product Image
                            </label>

                            {image && (
                                <span className="text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs bg-emerald-50 text-[#2E7D32] border-emerald-200">
                                    ✓ Image Selected
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <input
                                id="productImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            {image ? (
                                <div className="space-y-3">
                                    <div className="relative w-full h-52 md:h-64 rounded-3xl overflow-hidden border border-gray-200/80 shadow-md bg-gray-50 flex items-center justify-center p-2.5">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Product"
                                            className="w-full h-full object-contain rounded-2xl bg-white border border-gray-100 shadow-inner"
                                        />
                                    </div>

                                    {/* Change Image Button Below Card */}
                                    <div className="flex justify-center sm:justify-start">
                                        <label
                                            htmlFor="productImage"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-50/90 text-[#2E7D32] border border-emerald-200/80 hover:bg-[#2E7D32] hover:text-white transition-all duration-200 font-bold text-xs sm:text-sm cursor-pointer shadow-xs active:scale-95"
                                        >
                                            <FaCamera className="text-sm" />
                                            <span>Change Product Image</span>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <label
                                    htmlFor="productImage"
                                    className="w-full h-48 md:h-60 border-2 border-dashed border-emerald-300/80 hover:border-[#2E7D32] bg-emerald-50/40 hover:bg-emerald-50/80 rounded-3xl cursor-pointer flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shadow-inner p-4 text-center"
                                >
                                    <div className="w-14 h-14 mx-auto mb-2.5 rounded-2xl bg-emerald-100/80 text-[#2E7D32] flex items-center justify-center text-2xl shadow-xs">
                                        <FaCamera />
                                    </div>

                                    <p className="font-bold text-gray-800 text-sm sm:text-base">
                                        Upload Product Image
                                    </p>

                                    <p className="text-xs text-gray-500 mt-1 font-medium">
                                        JPG, PNG, WEBP, AVIF (Max 5MB)
                                    </p>
                                </label>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {/* Product Name */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Product Name
                            </label>

                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Enter product title"
                                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                            >
                                <option value="">Select Category</option>
                                <option value="Books">Books</option>
                                <option value="Mobiles">Mobiles</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Gaming">Gaming</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Home Items">Home Items</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {/* Exchange For */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                Looking To Swap With
                            </label>

                            <input
                                value={exchangeFor}
                                onChange={(e) => setExchangeFor(e.target.value)}
                                type="text"
                                placeholder="e.g. Laptop, Gaming Console, Books"
                                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                                City / Location
                            </label>

                            <input
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                type="text"
                                placeholder="Enter your city"
                                className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                            Product Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="4"
                            placeholder="Describe item condition, usage details and swap preferences..."
                            className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl px-4 py-3.5 text-gray-800 text-sm outline-none resize-none transition-all duration-200 focus:bg-white focus:border-[#2E7D32] focus:ring-4 focus:ring-[#2E7D32]/10"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#2E7D32] to-[#1E5621] hover:from-[#256728] hover:to-[#164219] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[#2E7D32]/25 hover:shadow-xl hover:shadow-[#2E7D32]/35 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-70 transition-all duration-200 text-sm sm:text-base mt-2"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Adding Product...
                            </span>
                        ) : (
                            "Publish Product Listing"
                        )}
                    </button>

                </form>
            </div>
            {showPreview && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 px-4">

                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white/80">

                        {/* Header */}
                        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">
                                Image Preview
                            </h2>

                            <button
                                onClick={handleCancel}
                                className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition font-bold"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Image */}
                        <div className="bg-gray-50/80 flex justify-center items-center p-5">

                            <img
                                src={URL.createObjectURL(tempImage)}
                                alt="Preview"
                                className="max-h-[400px] w-full object-contain rounded-2xl bg-white border shadow-xs"
                            />

                        </div>

                        {/* Footer */}
                        <div className="flex gap-3 p-5 border-t border-gray-100">

                            <button
                                onClick={handleCancel}
                                className="flex-1 border border-gray-200 rounded-2xl py-3 font-bold text-sm text-gray-700 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDone}
                                className="flex-1 bg-gradient-to-r from-[#2E7D32] to-[#1E5621] text-white rounded-2xl py-3 font-bold text-sm hover:from-[#256728] hover:to-[#164219] shadow-md transition"
                            >
                                Confirm Image
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </section>
    );
};

export default AddProduct;