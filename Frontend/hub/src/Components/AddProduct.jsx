import { useState } from "react";
import axios from '../utils/axiosInstance.js';
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
                "https://swaphub-backend-855x.onrender.com/api/addProduct",
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
        <section className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2E7D32]">
                        Add Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        List your product and start exchanging with others.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Image */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Image
                        </label>
                        <div className="relative">
                            <label
                                htmlFor="productImage"
                                className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#2E7D32] text-white flex items-center justify-center cursor-pointer hover:bg-[#256728] transition shadow-lg"
                            >
                                <FaCamera className="text-lg" />
                            </label>
                            <input
                                id="productImage"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />

                            <label
                                htmlFor="productImage"
                                className="w-full h-44 md:h-56 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer flex flex-col items-center justify-center hover:bg-gray-50 transition"
                            >
                                {image ? (
                                    <>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Product"
                                            className="w-full h-full object-contain p-2 bg-white rounded-2xl"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <p className="text-5xl mb-2">📷</p>

                                        <p className="font-semibold">
                                            Upload Product Image
                                        </p>

                                        <p className="text-sm text-gray-500 mt-1">
                                            JPG, PNG, WEBP, AVIF (Max 5MB)
                                        </p>
                                    </>
                                )}
                            </label>
                            {image && (
                                <p className="mt-2 text-center text-sm text-gray-500 truncate">
                                    {image.name}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Product Name */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Name
                        </label>

                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter product name"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block font-medium mb-2">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20">
                            <option value="">Select Category</option>
                            <option value="Books">Books</option>
                            <option value="Mobiles">Mobiles</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Gaming">Gaming</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Home Items">Home Items</option>
                        </select>
                    </div>

                    {/* Exchange For */}
                    <div>
                        <label className="block font-medium mb-2">
                            Exchange For
                        </label>

                        <input
                            value={exchangeFor}
                            onChange={(e) => setExchangeFor(e.target.value)}
                            type="text"
                            placeholder="Example: Laptop, Books, Mobile"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block font-medium mb-2">
                            Location
                        </label>

                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            type="text"
                            placeholder="Enter your city"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-medium mb-2">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="5"
                            placeholder="Describe your product..."
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2E7D32] hover:bg-[#256728] disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all duration-300">
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Adding Product...
                            </span>
                        ) : (
                            "Add Product"
                        )}
                    </button>

                </form>
            </div>
            {showPreview && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">

                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

                        {/* Header */}
                        <div className="px-6 py-4 border-b flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Preview Image
                            </h2>

                            <button
                                onClick={handleCancel}
                                className="text-2xl text-gray-500 hover:text-red-500 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Image */}
                        <div className="bg-gray-100 flex justify-center items-center p-5">

                            <img
                                src={URL.createObjectURL(tempImage)}
                                alt="Preview"
                                className="max-h-[420px] w-full object-contain rounded-2xl bg-white"
                            />

                        </div>

                        {/* Footer */}
                        <div className="flex gap-4 p-5">

                            <button
                                onClick={handleCancel}
                                className="flex-1 border border-gray-300 rounded-xl py-3 font-medium hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDone}
                                className="flex-1 bg-[#2E7D32] text-white rounded-xl py-3 font-medium hover:bg-[#256728] transition"
                            >
                                Use Image
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </section>
    );
};

export default AddProduct;