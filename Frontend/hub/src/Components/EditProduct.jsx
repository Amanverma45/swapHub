import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [exchangeFor, setExchangeFor] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !productName.trim() ||
            !category.trim() ||
            !exchangeFor.trim() ||
            !location.trim() ||
            !description.trim()
        ) {
            toast.error("Please fill all required fields.");
            return;
        }

        if (image && image.size > 5 * 1024 * 1024) {
            toast.error("Image must be less than 5MB");
            return;
        }
        setUpdating(true);
        try {
            const formData = new FormData();

            formData.append("productName", productName);
            formData.append("category", category);
            formData.append("exchangeFor", exchangeFor);
            formData.append("location", location);
            formData.append("description", description);

            const response = await axios.put(`/updateProduct/${id}`, formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            console.error(response.data);
            toast.success("Product Updated Successfully");

            setImage(null);
            setProductName("");
            setCategory("");
            setExchangeFor("");
            setLocation("");
            setDescription("");
            navigate("/myProducts");

        } catch (error) {
            console.error(error);

            if (error.response?.status === 401) {
                toast.error("Session expired. Please login again.");

                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setUpdating(false);
        }
    };

    const getProduct = async () => {
        try {
            const response = await axios.get(`/getProduct/${id}`);

            setProductName(response.data.productName);
            setCategory(response.data.category);
            setExchangeFor(response.data.exchangeFor);
            setLocation(response.data.location);
            setDescription(response.data.description);

            setPreviewImage(response.data.image);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <div className="w-10 h-10 border-4 border-[#2E7D32] border-t-transparent rounded-full animate-spin"></div>

                <p className="mt-4 text-gray-600">
                    Loading Product...
                </p>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-[#2E7D32]">
                        Update Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your product details.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Image */}
                    <div>
                        <label className="block font-medium mb-2">
                            Product Image
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full border border-gray-300 rounded-xl p-3"
                        />

                        {(image || previewImage) && (
                            <div className="mt-4">

                                <p
                                    className={`text-xs mb-2 ${image
                                        ? "text-[#2E7D32] font-medium"
                                        : "text-gray-500"
                                        }`}
                                >
                                    {image ? "Selected Image" : "Current Image"}
                                </p>

                                <img
                                    src={image ? URL.createObjectURL(image) : previewImage}
                                    alt="Preview"
                                    className="w-64 h-44 rounded-2xl object-cover border border-gray-200 shadow-sm"
                                />

                            </div>
                        )}

                        <p className="text-sm text-gray-500 mt-2">
                            Select a new image only if you want to replace the current one.
                        </p>
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
                            onChange={(e) => setCategory(e.target.value)} className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20"
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
                        disabled={updating}
                        className="w-full bg-[#2E7D32] hover:bg-[#256728] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {updating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Updating...
                            </>
                        ) : (
                            "Update Product"
                        )}
                    </button>

                </form>
            </div>
        </section>
    );
}
export default EditProduct
